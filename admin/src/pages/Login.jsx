import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        const result = login(username, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
        setIsLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginCard}>
                <div style={styles.logoContainer}>
                    <div style={styles.logo}>
                        <span style={styles.logoText}>SK</span>
                    </div>
                    <h1 style={styles.title}>Admin Panel</h1>
                    <p style={styles.subtitle}>Sign in to manage your courses</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && (
                        <div style={styles.errorBox}>
                            <svg style={styles.errorIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            ...styles.button,
                            opacity: isLoading ? 0.7 : 1,
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span style={styles.loadingText}>Signing in...</span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <p style={styles.footer}>
                    ShikhoHub Learning Management System
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
    },
    loginCard: {
        background: 'white',
        borderRadius: '24px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    logoContainer: {
        textAlign: 'center',
        marginBottom: '32px',
    },
    logo: {
        width: '64px',
        height: '64px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        boxShadow: '0 10px 30px -10px rgba(102, 126, 234, 0.5)',
    },
    logoText: {
        color: 'white',
        fontSize: '24px',
        fontWeight: '700',
    },
    title: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 8px',
    },
    subtitle: {
        fontSize: '14px',
        color: '#6b7280',
        margin: 0,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
    },
    input: {
        padding: '14px 16px',
        fontSize: '15px',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        outline: 'none',
        transition: 'all 0.2s',
    },
    errorBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '12px',
        color: '#dc2626',
        fontSize: '14px',
    },
    errorIcon: {
        width: '20px',
        height: '20px',
        flexShrink: 0,
    },
    button: {
        padding: '16px',
        fontSize: '16px',
        fontWeight: '600',
        color: 'white',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.4)',
        marginTop: '8px',
    },
    loadingText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
    },
    footer: {
        textAlign: 'center',
        marginTop: '32px',
        fontSize: '12px',
        color: '#9ca3af',
    },
};

export default Login;
