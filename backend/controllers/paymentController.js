import { getAuth } from '@clerk/express';
import { paymentOrchestrator } from '../services/PaymentOrchestrator.js';
import Booking from '../models/bookingModel.js';
import Payment from '../models/paymentModel.js';
import { v4 as uuidv4 } from 'uuid';

const FRONTEND_URL = process.env.FRONTEND_URL;

// Helper to build frontend base URL
function buildFrontendBase(req) {
    if (FRONTEND_URL) return FRONTEND_URL.replace(/\/$/, "");
    const origin = req.get("origin");
    if (origin) return origin.replace(/\/$/, "");
    const host = req.get("host");
    if (host) return `${req.protocol || "http"}://${host}`.replace(/\/$/, "");
    return null;
}

// Helper to generate booking ID
const genBookingId = () => `BK-${uuidv4()}`;

/**
 * Get available payment gateways
 */
export const getAvailableGateways = async (req, res) => {
    try {
        const gateways = paymentOrchestrator.getAvailableGateways();
        return res.json({
            success: true,
            gateways
        });
    } catch (error) {
        console.error('getAvailableGateways error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Initiate payment with selected gateway
 * Creates booking record and redirects to gateway checkout
 */
export const initiatePayment = async (req, res) => {
    try {
        const { userId } = getAuth(req) || {};
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const {
            gateway,
            courseId,
            courseName,
            teacherName = "",
            price,
            email,
            studentName
        } = req.body;

        // Validate required fields
        if (!gateway) {
            return res.status(400).json({
                success: false,
                message: "Payment gateway is required"
            });
        }

        if (!courseId || !courseName) {
            return res.status(400).json({
                success: false,
                message: "courseId and courseName are required"
            });
        }

        const numericPrice = Number(price);
        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid price"
            });
        }

        // For free courses, skip payment gateway
        if (numericPrice === 0) {
            const bookingId = genBookingId();
            const booking = await Booking.create({
                bookingId,
                clerkUserId: userId,
                studentName: studentName || email || `User-${userId.slice(0, 8)}`,
                course: courseId,
                courseName,
                teacherName,
                price: 0,
                paymentMethod: "Online",
                paymentStatus: "Paid",
                orderStatus: "Confirmed",
                gateway: 'free',
                paymentLifecycleStatus: 'SUCCESS',
                paidAt: new Date()
            });

            return res.status(201).json({
                success: true,
                booking,
                message: "Enrolled successfully (free course)"
            });
        }

        // Check for existing active booking
        const existingBooking = await Booking.findOne({
            course: courseId,
            clerkUserId: userId,
            $or: [
                { paymentStatus: 'Paid' },
                { orderStatus: 'Confirmed' }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: "You are already enrolled in this course",
                booking: existingBooking
            });
        }

        // Build URLs
        const base = buildFrontendBase(req);
        if (!base) {
            return res.status(500).json({
                success: false,
                message: "Frontend URL not configured"
            });
        }

        const bookingId = genBookingId();
        const resolvedStudentName = studentName || email || `User-${userId.slice(0, 8)}`;

        // Create booking record first
        const booking = await Booking.create({
            bookingId,
            clerkUserId: userId,
            studentName: resolvedStudentName,
            course: courseId,
            courseName,
            teacherName,
            price: numericPrice,
            paymentMethod: "Online",
            paymentStatus: "Unpaid",
            orderStatus: "Pending",
            gateway,
            paymentLifecycleStatus: 'CREATED'
        });

        // Build success/cancel/callback URLs based on gateway
        let successUrl, cancelUrl, callbackUrl;

        if (gateway === 'stripe') {
            successUrl = `${base}/booking/success?session_id={CHECKOUT_SESSION_ID}`;
            cancelUrl = `${base}/booking/cancel`;
        } else if (gateway === 'bkash') {
            // bKash callback URL - same endpoint handles success/failure/cancel
            callbackUrl = `${base}/payment/bkash/callback`;
            successUrl = `${base}/my-courses`;
            cancelUrl = `${base}/booking/cancel`;
        }

        // Initiate payment through orchestrator
        const paymentResult = await paymentOrchestrator.initiatePayment({
            gateway,
            userId,
            courseId,
            bookingId,
            courseName,
            teacherName,
            amount: numericPrice,
            currency: 'BDT',
            email,
            studentName: resolvedStudentName,
            successUrl,
            cancelUrl,
            callbackUrl
        });

        // Update booking with payment ID
        await Booking.findOneAndUpdate(
            { bookingId },
            {
                sessionId: paymentResult.gatewayPaymentId,
                paymentLifecycleStatus: 'PENDING'
            }
        );

        return res.status(201).json({
            success: true,
            booking,
            payment: paymentResult.payment,
            checkoutUrl: paymentResult.checkoutUrl,
            gateway,
            message: `Redirecting to ${gateway} payment`
        });

    } catch (error) {
        console.error('initiatePayment error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to initiate payment'
        });
    }
};

/**
 * Verify payment (Stripe success callback)
 */
export const verifyPayment = async (req, res) => {
    try {
        const { userId } = getAuth(req) || {};
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const { session_id, payment_id } = req.query;

        if (!session_id && !payment_id) {
            return res.status(400).json({
                success: false,
                message: "session_id or payment_id is required"
            });
        }

        const result = await paymentOrchestrator.completePayment({
            gateway: 'stripe',
            gatewayPaymentId: session_id,
            paymentId: payment_id
        });

        return res.json({
            success: result.success,
            booking: result.booking,
            payment: result.payment,
            message: result.success ? 'Payment verified successfully' : 'Payment verification failed'
        });

    } catch (error) {
        console.error('verifyPayment error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Handle bKash callback (redirect from bKash checkout)
 */
export const handleBkashCallback = async (req, res) => {
    try {
        // bKash sends these as query params on redirect
        const { paymentID, status } = req.query;

        if (!paymentID) {
            // Redirect to error page
            const base = buildFrontendBase(req) || '';
            return res.redirect(`${base}/booking/cancel?error=missing_payment_id`);
        }

        const result = await paymentOrchestrator.handleCallback('bkash', {
            paymentID,
            status
        });

        const base = buildFrontendBase(req) || '';

        if (result.success) {
            // Redirect to success page
            return res.redirect(`${base}/my-courses?payment=success&txn=${result.transactionId || ''}`);
        } else {
            // Redirect to cancel/error page
            const reason = encodeURIComponent(result.failureReason || 'Payment failed');
            return res.redirect(`${base}/booking/cancel?error=${reason}&status=${status}`);
        }

    } catch (error) {
        console.error('handleBkashCallback error:', error);
        const base = buildFrontendBase(req) || '';
        return res.redirect(`${base}/booking/cancel?error=${encodeURIComponent(error.message)}`);
    }
};

/**
 * Handle bKash callback via POST (for API calls)
 */
export const handleBkashCallbackPost = async (req, res) => {
    try {
        const { paymentID, status } = req.body;

        if (!paymentID) {
            return res.status(400).json({
                success: false,
                message: "paymentID is required"
            });
        }

        const result = await paymentOrchestrator.handleCallback('bkash', {
            paymentID,
            status
        });

        return res.json({
            success: result.success,
            payment: result.payment,
            booking: result.booking,
            transactionId: result.transactionId,
            message: result.success ? 'Payment completed' : result.failureReason
        });

    } catch (error) {
        console.error('handleBkashCallbackPost error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Handle Stripe webhook
 */
export const handleStripeWebhook = async (req, res) => {
    try {
        const result = await paymentOrchestrator.handleWebhook(
            'stripe',
            req.body,
            req.headers
        );

        return res.json({ received: true, result });

    } catch (error) {
        console.error('handleStripeWebhook error:', error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get payment status
 */
export const getPaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;

        if (!paymentId) {
            return res.status(400).json({
                success: false,
                message: "paymentId is required"
            });
        }

        const status = await paymentOrchestrator.getPaymentStatus(paymentId);

        return res.json({
            success: true,
            ...status
        });

    } catch (error) {
        console.error('getPaymentStatus error:', error);
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Execute bKash payment (for SPA flow without redirect)
 */
export const executeBkashPayment = async (req, res) => {
    try {
        const { userId } = getAuth(req) || {};
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const { paymentID } = req.body;

        if (!paymentID) {
            return res.status(400).json({
                success: false,
                message: "paymentID is required"
            });
        }

        const result = await paymentOrchestrator.completePayment({
            gateway: 'bkash',
            gatewayPaymentId: paymentID,
            callbackData: { paymentID, status: 'success' }
        });

        return res.json({
            success: result.success,
            payment: result.payment,
            booking: result.booking,
            transactionId: result.transactionId
        });

    } catch (error) {
        console.error('executeBkashPayment error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
