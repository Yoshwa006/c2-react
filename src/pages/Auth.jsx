import React, { useState } from 'react';
import { login, register } from '../service/api';

function AuthPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isRegister) {
                await register({ email, password });
                setMessage('Registration successful! You can now log in.');
                setMessageType('success');
                setIsRegister(false);
                setEmail('');
                setPassword('');
            } else {
                const token = await login({ email, password });
                setMessage('Welcome back! Login successful.');
                setMessageType('success');
                // Store token in localStorage or context
                localStorage.setItem('token', token);
            }
        } catch (err) {
            setMessage(err.message || 'Something went wrong. Please try again.');
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };

    const switchMode = () => {
        setIsRegister(!isRegister);
        setMessage('');
        setMessageType('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">
                        {isRegister ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="auth-subtitle">
                        {isRegister
                            ? 'Join us today and get started'
                            : 'Sign in to your account to continue'
                        }
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="form-input"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="form-input"
                            required
                            disabled={isLoading}
                        />
                        {isRegister && (
                            <p className="form-hint">
                                Password should be at least 8 characters long
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`auth-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            isRegister ? 'Create Account' : 'Sign In'
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <button
                        type="button"
                        className="switch-mode-button"
                        onClick={switchMode}
                        disabled={isLoading}
                    >
                        {isRegister
                            ? 'Already have an account? Sign In'
                            : 'Don\'t have an account? Create one'
                        }
                    </button>
                </div>

                {message && (
                    <div className={`message ${messageType}`} role="alert">
                        <div className="message-icon">
                            {messageType === 'success' ? '✓' : '⚠'}
                        </div>
                        <div className="message-text">{message}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthPage;