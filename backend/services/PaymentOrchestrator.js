import { v4 as uuidv4 } from 'uuid';
import Payment from '../models/paymentModel.js';
import Booking from '../models/bookingModel.js';
import { StripeStrategy } from './strategies/StripeStrategy.js';
import { BkashStrategy } from './strategies/BkashStrategy.js';

/**
 * Payment Orchestrator
 * Central service for multi-gateway payment processing
 * Implements Strategy Pattern to delegate to appropriate gateway
 */
export class PaymentOrchestrator {
    constructor() {
        this.strategies = {
            stripe: new StripeStrategy(),
            bkash: new BkashStrategy()
        };
    }

    /**
     * Get strategy for a gateway
     */
    getStrategy(gateway) {
        const strategy = this.strategies[gateway];
        if (!strategy) {
            throw new Error(`Unsupported payment gateway: ${gateway}`);
        }
        if (!strategy.isConfigured()) {
            throw new Error(`${gateway} gateway is not configured`);
        }
        return strategy;
    }

    /**
     * Get list of available (configured) gateways
     */
    getAvailableGateways() {
        return Object.entries(this.strategies)
            .filter(([_, strategy]) => strategy.isConfigured())
            .map(([name, strategy]) => ({
                id: name,
                name: this.getGatewayDisplayName(name),
                configured: true
            }));
    }

    getGatewayDisplayName(gateway) {
        const names = {
            stripe: 'Card Payment (Stripe)',
            bkash: 'bKash Mobile Banking',
            nagad: 'Nagad',
            rocket: 'Rocket'
        };
        return names[gateway] || gateway;
    }

    /**
     * Generate unique payment ID
     */
    generatePaymentId() {
        return `PAY-${uuidv4()}`;
    }

    /**
     * Generate idempotency key from request data
     */
    generateIdempotencyKey(userId, courseId, amount) {
        // Create a unique key based on user, course, and amount
        // This prevents duplicate payments for the same enrollment attempt
        return `${userId}-${courseId}-${amount}-${Date.now()}`;
    }

    /**
     * Initiate payment with selected gateway
     */
    async initiatePayment({
        gateway,
        userId,
        courseId,
        bookingId,
        courseName,
        teacherName,
        amount,
        currency = 'BDT',
        email,
        studentName,
        successUrl,
        cancelUrl,
        callbackUrl,
        idempotencyKey = null
    }) {
        const strategy = this.getStrategy(gateway);

        // Generate or use provided idempotency key
        const idemKey = idempotencyKey || this.generateIdempotencyKey(userId, courseId, amount);

        // Check for existing payment with same idempotency key
        const existingPayment = await Payment.findOne({ idempotencyKey: idemKey });
        if (existingPayment) {
            // Return existing payment if not failed/cancelled
            if (['CREATED', 'PENDING', 'SUCCESS'].includes(existingPayment.paymentStatus)) {
                return {
                    success: true,
                    existing: true,
                    payment: existingPayment,
                    checkoutUrl: existingPayment.checkoutUrl,
                    message: 'Using existing payment session'
                };
            }
        }

        // Generate payment ID
        const paymentId = this.generatePaymentId();

        // Create payment record with CREATED status
        const payment = new Payment({
            paymentId,
            userId,
            courseId,
            bookingId,
            gateway,
            amount,
            currency,
            paymentStatus: 'CREATED',
            idempotencyKey: idemKey,
            successUrl,
            cancelUrl
        });

        try {
            // Call gateway to create payment session
            const gatewayResponse = await strategy.createPayment({
                amount,
                currency,
                courseId,
                courseName,
                userId,
                email,
                successUrl,
                cancelUrl,
                callbackUrl,
                metadata: {
                    paymentId,
                    bookingId,
                    courseId,
                    userId,
                    studentName,
                    teacherName
                }
            });

            // Update payment record with gateway response
            payment.checkoutUrl = gatewayResponse.checkoutUrl;
            payment.paymentStatus = 'PENDING';
            payment.rawGatewayResponse = gatewayResponse.rawResponse;

            // Store gateway-specific IDs
            if (gateway === 'stripe') {
                payment.gatewaySessionId = gatewayResponse.sessionId;
                payment.paymentIntentId = gatewayResponse.paymentIntentId;
            } else if (gateway === 'bkash') {
                payment.bkashPaymentId = gatewayResponse.paymentId;
            }

            await payment.save();

            // Update booking with gateway info
            await Booking.findOneAndUpdate(
                { bookingId },
                {
                    gateway,
                    paymentLifecycleStatus: 'PENDING'
                }
            );

            return {
                success: true,
                payment,
                checkoutUrl: gatewayResponse.checkoutUrl,
                paymentId: payment.paymentId,
                gatewayPaymentId: gateway === 'bkash' ? gatewayResponse.paymentId : gatewayResponse.sessionId
            };

        } catch (error) {
            // Mark payment as failed
            payment.paymentStatus = 'FAILED';
            payment.failureReason = error.message;
            await payment.save();

            throw error;
        }
    }

    /**
     * Complete/verify payment after user returns from gateway
     */
    async completePayment({ gateway, paymentId, gatewayPaymentId, callbackData = {} }) {
        const strategy = this.getStrategy(gateway);

        // Find payment record
        let payment;
        if (paymentId) {
            payment = await Payment.findOne({ paymentId });
        } else if (gatewayPaymentId) {
            payment = await Payment.findOne({
                $or: [
                    { gatewaySessionId: gatewayPaymentId },
                    { bkashPaymentId: gatewayPaymentId }
                ]
            });
        }

        if (!payment) {
            throw new Error('Payment not found');
        }

        // If already successful, return early (idempotent)
        if (payment.paymentStatus === 'SUCCESS') {
            return {
                success: true,
                alreadyComplete: true,
                payment,
                message: 'Payment already completed'
            };
        }

        try {
            let verificationResult;

            if (gateway === 'bkash' && callbackData.status) {
                // bKash callback with status
                verificationResult = await strategy.handleCallback(callbackData);
            } else {
                // Direct verification
                const verifyId = gateway === 'bkash' ? payment.bkashPaymentId : payment.gatewaySessionId;
                verificationResult = await strategy.verifyPayment(verifyId);
            }

            // Update payment record
            payment.paymentStatus = verificationResult.paymentStatus ||
                (verificationResult.success ? 'SUCCESS' : 'FAILED');
            payment.transactionId = verificationResult.transactionId;
            payment.callbackVerified = true;
            payment.rawGatewayResponse = {
                ...payment.rawGatewayResponse,
                verification: verificationResult.rawResponse
            };

            if (verificationResult.success) {
                payment.paidAt = new Date();
            } else {
                payment.failureReason = verificationResult.failureReason;
            }

            await payment.save();

            // Update booking if payment successful
            if (verificationResult.success) {
                await Booking.findOneAndUpdate(
                    { bookingId: payment.bookingId },
                    {
                        paymentStatus: 'Paid',
                        orderStatus: 'Confirmed',
                        paymentLifecycleStatus: 'SUCCESS',
                        paidAt: new Date(),
                        paymentIntentId: payment.transactionId
                    }
                );
            } else {
                await Booking.findOneAndUpdate(
                    { bookingId: payment.bookingId },
                    {
                        paymentLifecycleStatus: payment.paymentStatus,
                        orderStatus: payment.paymentStatus === 'CANCELLED' ? 'Cancelled' : 'Failed'
                    }
                );
            }

            return {
                success: verificationResult.success,
                payment,
                booking: await Booking.findOne({ bookingId: payment.bookingId }),
                transactionId: verificationResult.transactionId
            };

        } catch (error) {
            payment.paymentStatus = 'FAILED';
            payment.failureReason = error.message;
            await payment.save();

            throw error;
        }
    }

    /**
     * Handle gateway callback (for redirect-based flows like bKash)
     */
    async handleCallback(gateway, callbackData) {
        const { paymentID, status } = callbackData;

        // Find payment by gateway payment ID
        const payment = await Payment.findOne({ bkashPaymentId: paymentID });

        if (!payment) {
            throw new Error(`Payment not found for gateway payment ID: ${paymentID}`);
        }

        return this.completePayment({
            gateway,
            paymentId: payment.paymentId,
            gatewayPaymentId: paymentID,
            callbackData
        });
    }

    /**
     * Handle gateway webhook (for server-to-server notifications)
     */
    async handleWebhook(gateway, webhookData, headers = {}) {
        const strategy = this.getStrategy(gateway);

        const result = await strategy.handleWebhook(webhookData, headers);

        if (result.sessionId || result.paymentIntentId) {
            // Find and update payment
            const payment = await Payment.findOne({
                $or: [
                    { gatewaySessionId: result.sessionId },
                    { paymentIntentId: result.paymentIntentId }
                ]
            });

            if (payment) {
                payment.webhookReceived = true;

                if (result.paymentStatus === 'SUCCESS' && payment.paymentStatus !== 'SUCCESS') {
                    payment.paymentStatus = 'SUCCESS';
                    payment.paidAt = new Date();
                    payment.transactionId = result.transactionId;
                    await payment.save();

                    // Update booking
                    await Booking.findOneAndUpdate(
                        { bookingId: payment.bookingId },
                        {
                            paymentStatus: 'Paid',
                            orderStatus: 'Confirmed',
                            paymentLifecycleStatus: 'SUCCESS',
                            paidAt: new Date()
                        }
                    );
                } else if (['FAILED', 'CANCELLED'].includes(result.paymentStatus)) {
                    payment.paymentStatus = result.paymentStatus;
                    payment.failureReason = result.failureReason;
                    await payment.save();

                    await Booking.findOneAndUpdate(
                        { bookingId: payment.bookingId },
                        {
                            paymentLifecycleStatus: result.paymentStatus,
                            orderStatus: result.paymentStatus === 'CANCELLED' ? 'Cancelled' : 'Failed'
                        }
                    );
                }
            }
        }

        return result;
    }

    /**
     * Get payment status
     */
    async getPaymentStatus(paymentId) {
        const payment = await Payment.findOne({ paymentId });
        if (!payment) {
            throw new Error('Payment not found');
        }

        return {
            paymentId: payment.paymentId,
            status: payment.paymentStatus,
            gateway: payment.gateway,
            amount: payment.amount,
            currency: payment.currency,
            transactionId: payment.transactionId,
            paidAt: payment.paidAt,
            createdAt: payment.createdAt
        };
    }
}

// Export singleton instance
export const paymentOrchestrator = new PaymentOrchestrator();
export default PaymentOrchestrator;
