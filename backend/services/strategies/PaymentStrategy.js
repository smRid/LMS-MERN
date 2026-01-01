/**
 * PaymentStrategy Interface
 * Base class for all payment gateway implementations
 * Implements Strategy Pattern for extensible payment processing
 */
export class PaymentStrategy {
    /**
     * Create a new payment session with the gateway
     * @param {Object} paymentData - Payment details
     * @param {number} paymentData.amount - Amount to charge
     * @param {string} paymentData.currency - Currency code (BDT, INR, USD)
     * @param {string} paymentData.courseId - Course identifier
     * @param {string} paymentData.courseName - Course name for display
     * @param {string} paymentData.userId - User identifier
     * @param {string} paymentData.email - User email
     * @param {string} paymentData.successUrl - Redirect URL on success
     * @param {string} paymentData.cancelUrl - Redirect URL on cancel
     * @param {string} paymentData.callbackUrl - Webhook/callback URL
     * @param {Object} paymentData.metadata - Additional metadata
     * @returns {Promise<Object>} Gateway response with sessionId/paymentId and checkout URL
     */
    async createPayment(paymentData) {
        throw new Error('createPayment must be implemented by subclass');
    }

    /**
     * Execute/confirm a payment (mainly for bKash which requires explicit execution)
     * @param {string} paymentId - Gateway payment ID
     * @param {Object} additionalData - Additional data required for execution
     * @returns {Promise<Object>} Execution result
     */
    async executePayment(paymentId, additionalData = {}) {
        throw new Error('executePayment must be implemented by subclass');
    }

    /**
     * Verify payment status with the gateway
     * @param {string} paymentId - Gateway payment/session ID
     * @returns {Promise<Object>} Verification result with success status
     */
    async verifyPayment(paymentId) {
        throw new Error('verifyPayment must be implemented by subclass');
    }

    /**
     * Query payment status from gateway
     * @param {string} paymentId - Gateway payment ID
     * @returns {Promise<Object>} Current payment status
     */
    async queryPayment(paymentId) {
        throw new Error('queryPayment must be implemented by subclass');
    }

    /**
     * Cancel/void a payment
     * @param {string} paymentId - Gateway payment ID
     * @returns {Promise<Object>} Cancellation result
     */
    async cancelPayment(paymentId) {
        throw new Error('cancelPayment must be implemented by subclass');
    }

    /**
     * Handle callback from gateway (redirects)
     * @param {Object} callbackData - Data from gateway callback
     * @returns {Promise<Object>} Processed callback result
     */
    async handleCallback(callbackData) {
        throw new Error('handleCallback must be implemented by subclass');
    }

    /**
     * Handle webhook from gateway (server-to-server)
     * @param {Object} webhookData - Webhook payload
     * @param {Object} headers - Request headers for signature verification
     * @returns {Promise<Object>} Processed webhook result
     */
    async handleWebhook(webhookData, headers = {}) {
        throw new Error('handleWebhook must be implemented by subclass');
    }

    /**
     * Get the gateway identifier
     * @returns {string} Gateway name (stripe, bkash, etc.)
     */
    getGatewayName() {
        throw new Error('getGatewayName must be implemented by subclass');
    }

    /**
     * Check if gateway is properly configured
     * @returns {boolean} True if gateway credentials are set
     */
    isConfigured() {
        return false;
    }
}

export default PaymentStrategy;
