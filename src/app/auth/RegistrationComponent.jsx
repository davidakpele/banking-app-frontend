import { useEffect, useState, useRef } from 'react';
import { Grid } from "@mui/material";
import './RegistrationComponent.css';
import { Link } from 'react-router-dom';

const RegistrationComponent = () => {
    const firstNameRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        telephone: '',
        gender: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        telephone: '',
        gender: '',
        password: '',
        confirmPassword: '',
        acceptTerms: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = 'Create New Account';
    }, []);
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: fieldValue
        }));

        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validate = () => {
        let tempErrors = { 
            firstName: '', 
            lastName: '', 
            username: '', 
            email: '', 
            telephone: '', 
            gender: '', 
            password: '', 
            confirmPassword: '',
            acceptTerms: ''
        };
        let isValid = true;
        
        if (!formData.firstName.trim()) {
            tempErrors.firstName = 'First name is required';
            if (isValid) firstNameRef.current.focus();
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            tempErrors.lastName = 'Last name is required';
            if (isValid) isValid = false;
        }

        if (!formData.username.trim()) {
            tempErrors.username = 'Username is required';
            if (isValid) isValid = false;
        }

        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
            if (isValid) isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
            if (isValid) isValid = false;
        }

        if (!formData.telephone.trim()) {
            tempErrors.telephone = 'Telephone is required';
            if (isValid) isValid = false;
        }

        if (!formData.gender) {
            tempErrors.gender = 'Please select your gender';
            if (isValid) isValid = false;
        }

        if (!formData.password.trim()) {
            tempErrors.password = 'Password is required';
            if (isValid) isValid = false;
        } else if (formData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters';
            if (isValid) isValid = false;
        }

        if (!formData.confirmPassword.trim()) {
            tempErrors.confirmPassword = 'Please confirm your password';
            if (isValid) isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = 'Passwords do not match';
            if (isValid) isValid = false;
        }

        if (!formData.acceptTerms) {
            tempErrors.acceptTerms = 'You must accept the terms and conditions';
            if (isValid) isValid = false;
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
                console.log('Registration attempted with:', formData);
                setIsLoading(false);
                // Here you would typically redirect or show success message
            }, 1500);
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <div className="registration-header">
                    <div className="bank-logo">
                        <span className="logo-icon">$</span>
                        <h2>SecureBank</h2>
                    </div>
                    <h1>Create Account</h1>
                    <p>Sign up to start banking with us</p>
                </div>

                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="form-section">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <div className="mb-3">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        ref={firstNameRef}
                                        type="text"
                                        name="firstName"
                                        className={`form-input ${errors.firstName ? 'is-invalid' : ''}`}
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your username"
                                    />
                                    {errors.firstName  && <div className="error-message">{errors.firstName }</div>}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="mb-3">
                                    
                                        <label htmlFor="lastName">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className={`form-input ${errors.lastName ? 'is-invalid' : ''}`}
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your last name"
                                        />
                                        {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                                    
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="mb-3">
                                    <label htmlFor="username">Username *</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className={`form-input ${errors.username ? 'is-invalid' : ''}`}
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Choose a username"
                                    />
                                    {errors.username && <div className="error-message">{errors.username}</div>}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="mb-3">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && <div className="error-message">{errors.email}</div>}
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="mb-3">
                                    <label htmlFor="telephone">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        className={`form-input ${errors.telephone ? 'is-invalid' : ''}`}
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                        placeholder="+1 234 567 8900"
                                    />
                                    {errors.telephone && <div className="error-message">{errors.telephone}</div>}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="mb-3">
                                    <label htmlFor="gender">Gender *</label>
                                    <select
                                        name="gender"
                                        className={`form-input ${errors.gender ? 'is-invalid' : ''}`}
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="prefer-not-to-say">Prefer not to say</option>
                                    </select>
                                    {errors.gender && <div className="error-message">{errors.gender}</div>}
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} style={{marginTop:'-5px'}}>
                            <Grid item xs={12} md={12}>
                                <div className="mb-3">
                                    <label htmlFor="password">Password *</label>
                                    <div className="password-input-container">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className={`form-input ${errors.password ? 'is-invalid' : ''}`}
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Create a password"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    {errors.password && <div className="error-message">{errors.password}</div>}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="input-group">
                                    <label htmlFor="confirmPassword">Confirm Password *</label>
                                    <div className="password-input-container">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            className={`form-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                                </div>
                            </Grid>
                        </Grid>

                        <div className="input-group terms-container">
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleInputChange}
                                />
                                <span>I accept the <a href="#terms">Terms and Conditions</a></span>
                            </label>
                            {errors.acceptTerms && <div className="error-message">{errors.acceptTerms}</div>}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className={`registration-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="spinner"></div>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <div className="registration-footer">
                    <p>Already have an account? <Link to={"/auth/login"}>Sign in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationComponent;