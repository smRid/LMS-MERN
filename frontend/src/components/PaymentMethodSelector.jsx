import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, Loader2, CheckCircle, ChevronRight } from 'lucide-react';

// Payment gateway configurations
const GATEWAYS = [
    {
        id: 'stripe',
        name: 'Card Payment',
        description: 'Visa, Mastercard, American Express',
        icon: CreditCard,
        color: '#635BFF',
        bgGradient: 'linear-gradient(135deg, #635BFF 0%, #7C3AED 100%)',
    },
    {
        id: 'bkash',
        name: 'bKash',
        description: 'Pay with bKash Mobile Banking',
        icon: Smartphone,
        color: '#E2136E',
        bgGradient: 'linear-gradient(135deg, #E2136E 0%, #C11A5E 100%)',
        logo: 'https://www.bkash.com/sites/all/themes/flavor/logo.png'
    }
];

// Styles
const styles = {
    overlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        width: '100%',
        maxWidth: '28rem',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'slideUp 0.3s ease-out'
    },
    header: {
        padding: '1.5rem 1.5rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: '0.25rem'
    },
    subtitle: {
        fontSize: '0.875rem',
        color: '#6B7280'
    },
    closeButton: {
        padding: '0.5rem',
        borderRadius: '0.5rem',
        border: 'none',
        backgroundColor: '#F3F4F6',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    priceSection: {
        padding: '1.5rem',
        margin: '1rem 1.5rem',
        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
        borderRadius: '1rem',
        textAlign: 'center'
    },
    priceLabel: {
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#6366F1',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '0.25rem'
    },
    priceValue: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: '#312E81'
    },
    priceCurrency: {
        fontSize: '1.25rem',
        fontWeight: '600'
    },
    gatewayList: {
        padding: '0 1.5rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    },
    gatewayButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        padding: '1rem 1.25rem',
        border: '2px solid #E5E7EB',
        borderRadius: '1rem',
        backgroundColor: 'white',
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden'
    },
    gatewayButtonHover: {
        borderColor: '#6366F1',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)'
    },
    gatewayButtonDisabled: {
        opacity: 0.6,
        cursor: 'not-allowed'
    },
    gatewayIcon: {
        width: '3rem',
        height: '3rem',
        borderRadius: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    },
    gatewayInfo: {
        flex: 1,
        textAlign: 'left'
    },
    gatewayName: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: '0.125rem'
    },
    gatewayDescription: {
        fontSize: '0.875rem',
        color: '#6B7280'
    },
    gatewayArrow: {
        color: '#9CA3AF',
        transition: 'transform 0.2s'
    },
    secureNote: {
        padding: '0 1.5rem 1.5rem',
        textAlign: 'center'
    },
    secureText: {
        fontSize: '0.75rem',
        color: '#9CA3AF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25rem'
    }
};

// CSS animations (inject once)
if (typeof document !== 'undefined' && !document.getElementById('payment-selector-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'payment-selector-styles';
    styleSheet.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .payment-gateway-btn:hover {
      border-color: #6366F1 !important;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15) !important;
    }
    .payment-gateway-btn:hover .gateway-arrow {
      transform: translateX(4px);
    }
    .payment-close-btn:hover {
      background-color: #E5E7EB !important;
    }
  `;
    document.head.appendChild(styleSheet);
}

/**
 * PaymentMethodSelector Component
 * Modal for selecting payment gateway before checkout
 */
const PaymentMethodSelector = ({
    isOpen,
    onClose,
    onSelect,
    amount,
    currency = 'BDT',
    courseName = '',
    isLoading = false,
    availableGateways = null // null = show all, array = filter to these
}) => {
    const [selectedGateway, setSelectedGateway] = useState(null);
    const [hoveredGateway, setHoveredGateway] = useState(null);

    // Filter gateways if specific ones are available
    const gateways = availableGateways
        ? GATEWAYS.filter(g => availableGateways.includes(g.id))
        : GATEWAYS;

    // Format currency
    const formatPrice = (amt) => {
        if (currency === 'BDT') return `৳${amt.toLocaleString()}`;
        if (currency === 'INR') return `₹${amt.toLocaleString()}`;
        return `${currency} ${amt.toLocaleString()}`;
    };

    const handleSelect = (gatewayId) => {
        if (isLoading) return;
        setSelectedGateway(gatewayId);
        onSelect(gatewayId);
    };

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && !isLoading) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, isLoading, onClose]);

    if (!isOpen) return null;

    return (
        <div
            style={styles.overlay}
            onClick={(e) => {
                if (e.target === e.currentTarget && !isLoading) {
                    onClose();
                }
            }}
        >
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div>
                        <h2 style={styles.title}>Select Payment Method</h2>
                        <p style={styles.subtitle}>Choose how you'd like to pay</p>
                    </div>
                    <button
                        style={styles.closeButton}
                        className="payment-close-btn"
                        onClick={onClose}
                        disabled={isLoading}
                        aria-label="Close"
                    >
                        <X size={20} color="#6B7280" />
                    </button>
                </div>

                {/* Price Display */}
                <div style={styles.priceSection}>
                    <div style={styles.priceLabel}>Total Amount</div>
                    <div style={styles.priceValue}>
                        {formatPrice(amount)}
                    </div>
                    {courseName && (
                        <div style={{ fontSize: '0.875rem', color: '#4338CA', marginTop: '0.5rem' }}>
                            {courseName}
                        </div>
                    )}
                </div>

                {/* Gateway Options */}
                <div style={styles.gatewayList}>
                    {gateways.map((gateway) => {
                        const Icon = gateway.icon;
                        const isSelected = selectedGateway === gateway.id;
                        const isHovered = hoveredGateway === gateway.id;

                        return (
                            <button
                                key={gateway.id}
                                className="payment-gateway-btn"
                                style={{
                                    ...styles.gatewayButton,
                                    ...(isLoading ? styles.gatewayButtonDisabled : {}),
                                    borderColor: isSelected ? gateway.color : (isHovered ? '#6366F1' : '#E5E7EB'),
                                    backgroundColor: isSelected ? `${gateway.color}08` : 'white'
                                }}
                                onClick={() => handleSelect(gateway.id)}
                                onMouseEnter={() => setHoveredGateway(gateway.id)}
                                onMouseLeave={() => setHoveredGateway(null)}
                                disabled={isLoading}
                            >
                                <div
                                    style={{
                                        ...styles.gatewayIcon,
                                        background: gateway.bgGradient
                                    }}
                                >
                                    <Icon size={24} color="white" />
                                </div>

                                <div style={styles.gatewayInfo}>
                                    <div style={styles.gatewayName}>{gateway.name}</div>
                                    <div style={styles.gatewayDescription}>{gateway.description}</div>
                                </div>

                                {isLoading && isSelected ? (
                                    <Loader2 size={20} color={gateway.color} style={{ animation: 'spin 1s linear infinite' }} />
                                ) : (
                                    <ChevronRight
                                        className="gateway-arrow"
                                        size={20}
                                        style={styles.gatewayArrow}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Security Note */}
                <div style={styles.secureNote}>
                    <div style={styles.secureText}>
                        <CheckCircle size={14} color="#22C55E" />
                        <span>Secure payment powered by SSL encryption</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodSelector;
