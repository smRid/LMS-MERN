import mongoose from "mongoose";

/**
 * Payment Model - Multi-Gateway Payment Tracking
 * Stores payment lifecycle states for all gateways (Stripe, bKash, Nagad, Rocket)
 */
const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    userId: {
        type: String,
        required: true,
        index: true
    },

    courseId: {
        type: String,
        required: true
    },

    bookingId: {
        type: String,
        required: true,
        index: true
    },

    // Gateway identifier
    gateway: {
        type: String,
        enum: ['stripe', 'bkash', 'nagad', 'rocket'],
        required: true
    },

    // Payment amounts
    amount: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        default: 'BDT'
    },

    // Gateway-specific identifiers
    transactionId: {
        type: String,
        index: true,
        sparse: true
    },

    gatewaySessionId: {
        type: String,
        sparse: true
    },

    // Stripe-specific
    paymentIntentId: {
        type: String,
        sparse: true
    },

    // bKash-specific
    bkashPaymentId: {
        type: String,
        sparse: true
    },

    bkashTrxId: {
        type: String,
        sparse: true
    },

    // Payment lifecycle status
    paymentStatus: {
        type: String,
        enum: ['CREATED', 'PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'REFUNDED'],
        default: 'CREATED'
    },

    // Idempotency key for preventing double charges
    idempotencyKey: {
        type: String,
        unique: true,
        sparse: true
    },

    // Raw response from gateway for debugging
    rawGatewayResponse: {
        type: mongoose.Schema.Types.Mixed
    },

    // Verification flags
    callbackVerified: {
        type: Boolean,
        default: false
    },

    webhookReceived: {
        type: Boolean,
        default: false
    },

    // Failure tracking
    failureReason: {
        type: String
    },

    // Payment completion timestamp
    paidAt: {
        type: Date
    },

    // Checkout/redirect URLs (for reference)
    checkoutUrl: {
        type: String
    },

    successUrl: {
        type: String
    },

    cancelUrl: {
        type: String
    }
}, {
    timestamps: true
});

// Compound indexes for efficient queries
paymentSchema.index({ userId: 1, courseId: 1 });
paymentSchema.index({ bookingId: 1, gateway: 1 });
paymentSchema.index({ paymentStatus: 1, createdAt: -1 });

const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

export default Payment;
