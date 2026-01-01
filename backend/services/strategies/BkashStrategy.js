import { PaymentStrategy } from './PaymentStrategy.js';

/**
 * bKash Payment Strategy
 * Implements PaymentStrategy for bKash Tokenized Checkout
 * 
 * Flow:
 * 1. Grant Token - Get authentication token
 * 2. Create Payment - Initialize payment, get bkashURL
 * 3. User completes payment on bKash page
 * 4. Execute Payment - Confirm the payment after callback
 * 5. Query Payment - Verify payment status
 */
export class BkashStrategy extends PaymentStrategy {
    constructor() {
        super();
        this.baseUrl = process.env.BKASH_BASE_URL;
        this.appKey = process.env.BKASH_APP_KEY;
        this.appSecret = process.env.BKASH_APP_SECRET;
        this.username = process.env.BKASH_USERNAME;
        this.password = process.env.BKASH_PASSWORD;

        // Token cache
        this.token = null;
        this.tokenExpiry = null;
    }

    getGatewayName() {
        return 'bkash';
    }

    isConfigured() {
        return !!(this.baseUrl && this.appKey && this.appSecret && this.username && this.password);
    }

    /**
     * Get or refresh bKash authentication token
     */
    async getToken() {
        // Return cached token if still valid (with 1 minute buffer)
        if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry - 60000) {
            return this.token;
        }

        const url = `${this.baseUrl}/tokenized/checkout/token/grant`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'username': this.username,
                'password': this.password
            },
            body: JSON.stringify({
                app_key: this.appKey,
                app_secret: this.appSecret
            })
        });

        const data = await response.json();

        if (data.statusCode === '0000' && data.id_token) {
            this.token = data.id_token;
            // Token expires in 3600 seconds (1 hour)
            this.tokenExpiry = Date.now() + (data.expires_in || 3600) * 1000;
            return this.token;
        }

        throw new Error(data.statusMessage || 'Failed to get bKash token');
    }

    /**
     * Refresh token explicitly
     */
    async refreshToken() {
        if (!this.token) {
            return this.getToken();
        }

        const url = `${this.baseUrl}/tokenized/checkout/token/refresh`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': this.token,
                'x-app-key': this.appKey
            },
            body: JSON.stringify({
                app_key: this.appKey,
                app_secret: this.appSecret,
                refresh_token: this.token
            })
        });

        const data = await response.json();

        if (data.statusCode === '0000' && data.id_token) {
            this.token = data.id_token;
            this.tokenExpiry = Date.now() + (data.expires_in || 3600) * 1000;
            return this.token;
        }

        // If refresh fails, try getting new token
        this.token = null;
        this.tokenExpiry = null;
        return this.getToken();
    }

    /**
     * Create bKash payment
     */
    async createPayment({
        amount,
        currency = 'BDT',
        courseId,
        courseName,
        userId,
        email,
        successUrl,
        cancelUrl,
        callbackUrl,
        metadata = {}
    }) {
        if (!this.isConfigured()) {
            throw new Error('bKash is not configured');
        }

        const token = await this.getToken();
        const url = `${this.baseUrl}/tokenized/checkout/create`;

        // Generate unique invoice number
        const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const requestBody = {
            mode: '0011', // Checkout URL mode
            payerReference: userId,
            callbackURL: callbackUrl,
            amount: String(amount),
            currency: 'BDT', // bKash only supports BDT
            intent: 'sale',
            merchantInvoiceNumber: invoiceNumber
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': token,
                'x-app-key': this.appKey
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data.statusCode === '0000' && data.paymentID) {
            return {
                success: true,
                paymentId: data.paymentID,
                checkoutUrl: data.bkashURL,
                invoiceNumber,
                createTime: data.paymentCreateTime,
                rawResponse: data,
                // Store metadata for later reference
                metadata: {
                    courseId,
                    courseName,
                    userId,
                    email,
                    successUrl,
                    cancelUrl,
                    ...metadata
                }
            };
        }

        throw new Error(data.statusMessage || 'Failed to create bKash payment');
    }

    /**
     * Execute bKash payment after user completes checkout
     */
    async executePayment(paymentID) {
        if (!this.isConfigured()) {
            throw new Error('bKash is not configured');
        }

        const token = await this.getToken();
        const url = `${this.baseUrl}/tokenized/checkout/execute`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': token,
                'x-app-key': this.appKey
            },
            body: JSON.stringify({ paymentID })
        });

        const data = await response.json();

        if (data.statusCode === '0000' && data.trxID) {
            return {
                success: true,
                transactionId: data.trxID,
                paymentId: data.paymentID,
                paymentStatus: 'SUCCESS',
                amount: parseFloat(data.amount),
                currency: data.currency,
                payerReference: data.payerReference,
                merchantInvoiceNumber: data.merchantInvoiceNumber,
                transactionTime: data.paymentExecuteTime,
                rawResponse: data
            };
        }

        // Handle specific error cases
        if (data.statusCode === '2062') {
            // Payment already executed
            return {
                success: false,
                alreadyExecuted: true,
                paymentStatus: 'SUCCESS',
                message: 'Payment already executed',
                rawResponse: data
            };
        }

        return {
            success: false,
            paymentStatus: 'FAILED',
            failureReason: data.statusMessage || 'Payment execution failed',
            rawResponse: data
        };
    }

    /**
     * Verify payment by querying status
     */
    async verifyPayment(paymentID) {
        return this.queryPayment(paymentID);
    }

    /**
     * Query payment status from bKash
     */
    async queryPayment(paymentID) {
        if (!this.isConfigured()) {
            throw new Error('bKash is not configured');
        }

        const token = await this.getToken();
        const url = `${this.baseUrl}/tokenized/checkout/payment/status`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': token,
                'x-app-key': this.appKey
            },
            body: JSON.stringify({ paymentID })
        });

        const data = await response.json();

        if (data.statusCode === '0000') {
            const transactionStatus = data.transactionStatus;
            let paymentStatus = 'PENDING';

            if (transactionStatus === 'Completed') {
                paymentStatus = 'SUCCESS';
            } else if (transactionStatus === 'Initiated') {
                paymentStatus = 'PENDING';
            } else if (transactionStatus === 'Cancelled') {
                paymentStatus = 'CANCELLED';
            }

            return {
                success: transactionStatus === 'Completed',
                transactionId: data.trxID,
                paymentId: data.paymentID,
                paymentStatus,
                transactionStatus,
                amount: parseFloat(data.amount),
                currency: data.currency,
                rawResponse: data
            };
        }

        throw new Error(data.statusMessage || 'Failed to query bKash payment');
    }

    /**
     * Cancel/void a bKash payment (only works for authorized, not captured payments)
     */
    async cancelPayment(paymentID) {
        // bKash doesn't have a direct cancel for Sale mode
        // This would be used for Authorize mode with void capability
        return {
            success: false,
            message: 'Cancel not supported for Sale mode payments',
            paymentId: paymentID
        };
    }

    /**
     * Handle bKash callback (redirect from bKash checkout page)
     * 
     * Callback URL receives parameters:
     * - paymentID: bKash payment ID
     * - status: success, failure, or cancel
     */
    async handleCallback(callbackData) {
        const { paymentID, status } = callbackData;

        if (!paymentID) {
            return {
                success: false,
                error: 'Missing paymentID in callback'
            };
        }

        if (status === 'success') {
            // Execute the payment to complete it
            const executeResult = await this.executePayment(paymentID);

            if (executeResult.success || executeResult.alreadyExecuted) {
                // Verify the payment one more time
                const verifyResult = await this.queryPayment(paymentID);
                return {
                    ...verifyResult,
                    callbackStatus: status
                };
            }

            return {
                ...executeResult,
                callbackStatus: status
            };
        }

        if (status === 'failure') {
            return {
                success: false,
                paymentStatus: 'FAILED',
                paymentId: paymentID,
                callbackStatus: status,
                failureReason: 'Payment failed on bKash'
            };
        }

        if (status === 'cancel') {
            return {
                success: false,
                paymentStatus: 'CANCELLED',
                paymentId: paymentID,
                callbackStatus: status,
                failureReason: 'Payment cancelled by user'
            };
        }

        return {
            success: false,
            error: `Unknown callback status: ${status}`,
            paymentId: paymentID,
            callbackStatus: status
        };
    }

    /**
     * bKash doesn't use webhooks in the same way as Stripe
     * IPN (Instant Payment Notification) would be handled here if configured
     */
    async handleWebhook(webhookData, headers = {}) {
        // bKash IPN handling would go here
        // For now, we rely on callback + server-side verification
        return {
            success: true,
            message: 'bKash webhook/IPN handling not configured',
            rawData: webhookData
        };
    }

    /**
     * Search transactions by invoice number or date range
     */
    async searchTransaction(invoiceNumber) {
        if (!this.isConfigured()) {
            throw new Error('bKash is not configured');
        }

        const token = await this.getToken();
        const url = `${this.baseUrl}/tokenized/checkout/general/searchTransaction`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': token,
                'x-app-key': this.appKey
            },
            body: JSON.stringify({ trxID: invoiceNumber })
        });

        return response.json();
    }
}

export default BkashStrategy;
