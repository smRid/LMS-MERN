import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is already logged in on mount
    useEffect(() => {
        const authStatus = localStorage.getItem('admin_authenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (username, password) => {
        const validUsername = import.meta.env.VITE_ADMIN_USERNAME;
        const validPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (username === validUsername && password === validPassword) {
            setIsAuthenticated(true);
            localStorage.setItem('admin_authenticated', 'true');
            return { success: true };
        }
        return { success: false, error: 'Invalid username or password' };
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_authenticated');
    };

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
                <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
