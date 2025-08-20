import { useEffect, useState, useRef } from 'react';
import { Grid } from "@mui/material";
import './LoginComponent.css';
import { Link } from 'react-router-dom';

const LoginComponent = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

     useEffect(() => {
        document.title = 'Sign In to Your Account';
     }, []);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validate = () => {
        let tempErrors = { username: '', password: '' };
        let isValid = true;
        
        if (!credentials.username.trim()) {
            tempErrors.username = 'Username is required';
            usernameRef.current.focus(); 
            isValid = false;
        }

        if (!credentials.password.trim()) {
            tempErrors.password = 'Password is required';
            if (isValid) passwordRef.current.focus();
            isValid = false;
        }
        
        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                console.log('Login attempted with:', credentials);
                setIsLoading(false);
            }, 1500);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="bank-logo">
                        <span className="logo-icon">$</span>
                        <h2>SecureBank</h2>
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Sign in to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-section">
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={12}>
                        <div className="mb-3">
                          <label htmlFor="username">Username</label>
                              <input
                                  ref={usernameRef}
                                  type="text"
                                  name="username"
                                  className={`form-input username-input ${errors.username ? 'is-invalid' : ''}`}
                                  value={credentials.username}
                                  onChange={handleInputChange}
                                  placeholder="Enter your username"
                              />
                              {errors.username && <div className="error-message">{errors.username}</div>}
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={12}>
                        <div className="mb-3">
                          <label htmlFor="password">Password</label>
                          <div className="password-input-container">
                            <input
                                ref={passwordRef}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`form-input ${errors.password ? 'is-invalid' : ''}`}
                                value={credentials.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"/>
                            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                    <div className="login-options">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <span>Remember me</span>
                        </label>
                        <a href="#forgot" className="forgot-password">Forgot Password?</a>
                    </div>

                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="spinner"></div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="login-footer">
            <p>Don't have an account? <Link to={"/auth/register"}>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;