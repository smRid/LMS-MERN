import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

/**
 * BkashCallback Component
 * Handles the redirect callback from bKash payment page
 * 
 * URL Parameters:
 * - paymentID: bKash payment ID
 * - status: success | failure | cancel
 */
const BkashCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [status, setStatus] = useState('processing'); // processing | success | error | cancelled
    const [message, setMessage] = useState('Verifying your payment...');
    const [transactionId, setTransactionId] = useState(null);

    useEffect(() => {
        const paymentID = searchParams.get('paymentID');
        const callbackStatus = searchParams.get('status');
        const error = searchParams.get('error');

        // Handle error redirects from backend
        if (error) {
            setStatus('error');
            setMessage(decodeURIComponent(error));
            return;
        }

        // Handle direct status from URL (when backend redirects with success)
        if (callbackStatus === 'success' || searchParams.has('payment') && searchParams.get('payment') === 'success') {
            const txn = searchParams.get('txn');
            setStatus('success');
            setMessage('Payment successful! You are now enrolled.');
            if (txn) setTransactionId(txn);

            // Auto-redirect after 3 seconds
            setTimeout(() => {
                navigate('/my-courses');
            }, 3000);
            return;
        }

        if (callbackStatus === 'cancel') {
            setStatus('cancelled');
            setMessage('Payment was cancelled. You can try again.');
            return;
        }

        if (callbackStatus === 'failure') {
            setStatus('error');
            setMessage('Payment failed. Please try again or choose a different payment method.');
            return;
        }

        // If we have paymentID and status, call backend to process
        if (paymentID && callbackStatus) {
            processCallback(paymentID, callbackStatus);
        } else if (!paymentID && !callbackStatus) {
            // No parameters - redirect to home
            setStatus('error');
            setMessage('Invalid callback. Redirecting to home...');
            setTimeout(() => navigate('/'), 2000);
        }
    }, [searchParams, navigate]);

    const processCallback = async (paymentID, callbackStatus) => {
        try {
            const response = await fetch(
                `${API_BASE}/api/payment/bkash/callback?paymentID=${paymentID}&status=${callbackStatus}`,
                {
                    method: 'GET',
                    credentials: 'include'
                }
            );

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setMessage('Payment successful! You are now enrolled.');
                if (data.transactionId) setTransactionId(data.transactionId);

                // Auto-redirect after 3 seconds
                setTimeout(() => {
                    navigate('/my-courses');
                }, 3000);
            } else {
                setStatus('error');
                setMessage(data.message || 'Payment verification failed.');
            }
        } catch (error) {
            console.error('Callback processing error:', error);
            setStatus('error');
            setMessage('Failed to verify payment. Please check your enrollment status.');
        }
    };

    const getIcon = () => {
        switch (status) {
            case 'processing':
                return <Loader2 size={64} className="animate-spin text-indigo-500" />;
            case 'success':
                return <CheckCircle size={64} className="text-green-500" />;
            case 'error':
                return <XCircle size={64} className="text-red-500" />;
            case 'cancelled':
                return <AlertCircle size={64} className="text-yellow-500" />;
            default:
                return <Loader2 size={64} className="animate-spin text-indigo-500" />;
        }
    };

    const getBackgroundColor = () => {
        switch (status) {
            case 'success':
                return 'bg-gradient-to-br from-green-50 to-emerald-100';
            case 'error':
                return 'bg-gradient-to-br from-red-50 to-rose-100';
            case 'cancelled':
                return 'bg-gradient-to-br from-yellow-50 to-amber-100';
            default:
                return 'bg-gradient-to-br from-indigo-50 to-purple-100';
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${getBackgroundColor()}`}>
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    {getIcon()}
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {status === 'processing' && 'Processing Payment'}
                    {status === 'success' && 'Payment Successful!'}
                    {status === 'error' && 'Payment Failed'}
                    {status === 'cancelled' && 'Payment Cancelled'}
                </h1>

                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                {transactionId && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500">Transaction ID</p>
                        <p className="font-mono font-semibold text-gray-800">{transactionId}</p>
                    </div>
                )}

                <div className="space-y-3">
                    {status === 'success' && (
                        <button
                            onClick={() => navigate('/my-courses')}
                            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                        >
                            Go to My Courses
                        </button>
                    )}

                    {(status === 'error' || status === 'cancelled') && (
                        <>
                            <button
                                onClick={() => navigate(-1)}
                                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => navigate('/courses')}
                                className="w-full px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                            >
                                Browse Courses
                            </button>
                        </>
                    )}

                    {status === 'processing' && (
                        <p className="text-sm text-gray-400">
                            Please do not close this page...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BkashCallback;
