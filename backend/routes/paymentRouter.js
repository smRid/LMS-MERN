import express from 'express';
import {
    getAvailableGateways,
    initiatePayment,
    verifyPayment,
    handleBkashCallback,
    handleBkashCallbackPost,
    handleStripeWebhook,
    getPaymentStatus,
    executeBkashPayment
} from '../controllers/paymentController.js';

const paymentRouter = express.Router();

// Get available payment gateways
paymentRouter.get('/gateways', getAvailableGateways);

// Initiate payment with selected gateway
paymentRouter.post('/initiate', initiatePayment);

// Verify Stripe payment (success callback)
paymentRouter.get('/verify', verifyPayment);

// bKash callback endpoints (redirect from bKash)
paymentRouter.get('/bkash/callback', handleBkashCallback);
paymentRouter.post('/bkash/callback', handleBkashCallbackPost);

// Execute bKash payment (for SPA flow)
paymentRouter.post('/bkash/execute', executeBkashPayment);

// Stripe webhook (raw body required for signature verification)
paymentRouter.post(
    '/stripe/webhook',
    express.raw({ type: 'application/json' }),
    handleStripeWebhook
);

// Get payment status
paymentRouter.get('/status/:paymentId', getPaymentStatus);

export default paymentRouter;
