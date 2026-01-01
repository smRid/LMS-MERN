import Stripe from 'stripe';
import { PaymentStrategy } from './PaymentStrategy.js';

/**
 * Stripe Payment Strategy
 * Implements PaymentStrategy for Stripe Checkout Sessions
 */
export class StripeStrategy extends PaymentStrategy {
    constructor() {
        super();
        this.stripeKey = process.env.STRIPE_SECRET_KEY;
        this.stripe = this.stripeKey
            ? new Stripe(this.stripeKey, { apiVersion: "2023-10-16" })
            : null;
        this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    }

    getGatewayName() {
        return 'stripe';
    }

    isConfigured() {
        return !!this.stripe;
    }

    /**
     * Create Stripe Checkout Session
     */
    async createPayment({
        amount,
        currency = 'bdt',
        courseId,
        courseName,
        userId,
        email,
        successUrl,
        cancelUrl,
        metadata = {}
    }) {
        if (!this.stripe) {
            throw new Error('Stripe is not configured');
        }

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: email || undefined,
            line_items: [
                {
                    price_data: {
                        currency: currency.toLowerCase(),
                        product_data: {
                            name: courseName,
                            description: `Course enrollment for ${courseName}`
                        },
                        unit_amount: Math.round(amount * 100), // Convert to smallest currency unit
                    },
                    quantity: 1,
                },
            ],
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                courseId,
                userId,
                gateway: 'stripe',
                ...metadata
            },
        });

        return {
            success: true,
            sessionId: session.id,
            checkoutUrl: session.url,
            paymentIntentId: session.payment_intent || null,
            rawResponse: session
        };
    }

    /**
     * Stripe doesn't need explicit execution - payment completes in checkout
     */
    async executePayment(sessionId) {
        // Stripe checkout handles execution automatically
        return this.verifyPayment(sessionId);
    }

    /**
     * Verify Stripe Checkout Session status
     */
    async verifyPayment(sessionId) {
        if (!this.stripe) {
            throw new Error('Stripe is not configured');
        }

        const session = await this.stripe.checkout.sessions.retrieve(sessionId);

        const isPaid = session.payment_status === 'paid';

        return {
            success: isPaid,
            transactionId: session.payment_intent,
            paymentStatus: isPaid ? 'SUCCESS' : 'PENDING',
            rawResponse: session,
            customerEmail: session.customer_email,
            amountTotal: session.amount_total / 100,
            currency: session.currency
        };
    }

    /**
     * Query payment status
     */
    async queryPayment(sessionId) {
        return this.verifyPayment(sessionId);
    }

    /**
     * Cancel is not directly supported for completed Stripe payments
     * Would need refund flow instead
     */
    async cancelPayment(sessionId) {
        if (!this.stripe) {
            throw new Error('Stripe is not configured');
        }

        // For Stripe, we can expire an incomplete session
        try {
            const session = await this.stripe.checkout.sessions.expire(sessionId);
            return {
                success: true,
                message: 'Session expired',
                rawResponse: session
            };
        } catch (error) {
            // Session may already be complete or expired
            return {
                success: false,
                message: error.message,
                rawResponse: error
            };
        }
    }

    /**
     * Handle Stripe redirect callback
     */
    async handleCallback(callbackData) {
        const { session_id } = callbackData;

        if (!session_id) {
            return {
                success: false,
                error: 'Missing session_id'
            };
        }

        return this.verifyPayment(session_id);
    }

    /**
     * Handle Stripe webhook events
     */
    async handleWebhook(payload, headers = {}) {
        if (!this.stripe) {
            throw new Error('Stripe is not configured');
        }

        const signature = headers['stripe-signature'];

        let event;

        if (this.webhookSecret && signature) {
            // Verify webhook signature
            try {
                event = this.stripe.webhooks.constructEvent(
                    payload,
                    signature,
                    this.webhookSecret
                );
            } catch (err) {
                throw new Error(`Webhook signature verification failed: ${err.message}`);
            }
        } else {
            // No webhook secret configured, parse directly (less secure)
            event = typeof payload === 'string' ? JSON.parse(payload) : payload;
        }

        // Handle different event types
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                return {
                    success: true,
                    eventType: event.type,
                    sessionId: session.id,
                    paymentStatus: session.payment_status === 'paid' ? 'SUCCESS' : 'PENDING',
                    transactionId: session.payment_intent,
                    metadata: session.metadata,
                    rawResponse: session
                };
            }

            case 'checkout.session.expired': {
                const session = event.data.object;
                return {
                    success: true,
                    eventType: event.type,
                    sessionId: session.id,
                    paymentStatus: 'CANCELLED',
                    metadata: session.metadata,
                    rawResponse: session
                };
            }

            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object;
                return {
                    success: true,
                    eventType: event.type,
                    paymentIntentId: paymentIntent.id,
                    paymentStatus: 'SUCCESS',
                    rawResponse: paymentIntent
                };
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object;
                return {
                    success: true,
                    eventType: event.type,
                    paymentIntentId: paymentIntent.id,
                    paymentStatus: 'FAILED',
                    failureReason: paymentIntent.last_payment_error?.message,
                    rawResponse: paymentIntent
                };
            }

            default:
                return {
                    success: true,
                    eventType: event.type,
                    message: 'Unhandled event type',
                    rawResponse: event
                };
        }
    }
}

export default StripeStrategy;
