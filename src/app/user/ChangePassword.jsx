import React, { useState, useContext, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { Grid } from "@mui/material";
import { ThemeContext } from "../../components/context/ThemeContext";
import Button from "@mui/material/Button/Button";
import './ChangePassword.css';

const ChangePassword = () => {
    const { theme } = useContext(ThemeContext);
    const passwordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [showPasswords, setShowPasswords] = useState({
        password: false,
        new_password: false,
        confirm_password: false
    });
    const [progressext, setProgressext] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
        confirm_password: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        new_password: '',
        confirm_password: '',
        password: '',
    });

    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false
    });

    const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: '',
        });

        // Validate new password requirements in real-time
        if (name === 'new_password') {
            const newPassword = value;
            setPasswordRequirements({
                length: newPassword.length >= 8,
                lowercase: /[a-z]/.test(newPassword),
                uppercase: /[A-Z]/.test(newPassword),
                number: /[0-9]/.test(newPassword),
                specialChar: /[#*]/.test(newPassword)
            });
        }

        // Check if confirm password matches new password
        if (name === 'confirm_password' || name === 'new_password') {
            setConfirmPasswordMatch(
                formData.new_password === (name === 'confirm_password' ? value : formData.confirm_password) && 
                formData.new_password !== ''
            );
        }
    };

    const validate = () => {
        setProgressext(false);

        let tempErrors = { password: '', new_password: '', confirm_password: '' };
        let isValid = true;

        // validate current password
        if (!formData.password.trim()) {
            tempErrors.password = 'Current password is required';
            passwordRef.current.focus();
            isValid = false;
        }

        // validate new password
        if (!formData.new_password.trim()) {
            tempErrors.new_password = 'New password is required';
            newPasswordRef.current.focus();
            isValid = false;
        } else {
            // Check all password requirements
            const reqs = passwordRequirements;
            if (!reqs.length || !reqs.lowercase || !reqs.uppercase || !reqs.number || !reqs.specialChar) {
                tempErrors.new_password = 'Password does not meet all requirements';
                newPasswordRef.current.focus();
                isValid = false;
            }
        }

        // validate confirm password
        if (!formData.confirm_password.trim()) {
            tempErrors.confirm_password = 'Please confirm your new password';
            confirmPasswordRef.current.focus();
            isValid = false;
        } else if (formData.new_password.trim() !== formData.confirm_password.trim()) {
            tempErrors.confirm_password = 'Passwords do not match';
            confirmPasswordRef.current.focus();
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setProgressext(true);
            console.log('Form submitted:', formData);
            setFormData({
                password: "",
                confirm_password: "",
                new_password: ""
            });
            setErrors({
                password: "",
                confirm_password: "",
                new_password: ""
            });
            setProgressext(false);
        }
    };

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <h1 className={`form-title ${theme === "dark" ? "color-light" : "color-dark"}`}>Change Password</h1>
                    <div className="form-section">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="mb-3 position-relative">
                                    <label className={`form-label required ${theme === "dark" ? "color-light":"color-dark"}`}>Current Password</label>
                                    <input
                                        ref={passwordRef}
                                        type={showPasswords.password ? "text" : "password"}
                                        name="password"
                                        className={`form-control password-input ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Type Your Current Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        style={{ height: '3.2rem' }}
                                    />
                                    <i
                                        className={`fa ${showPasswords.password ? 'fa-eye' : 'fa-eye-slash'} Icon`}
                                        aria-hidden="true"
                                        onClick={() => togglePasswordVisibility('password')}
                                    />
                                    {errors.password && <div className="password-error">{errors.password}</div>}
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="mb-3 position-relative">
                                    <label className={`form-label required ${theme === "dark" ? "color-light":"color-dark"}`}>New Password</label>
                                    <input
                                        ref={newPasswordRef}
                                        type={showPasswords.new_password ? "text" : "password"}
                                        name="new_password"
                                        className={`form-control new-password-input ${errors.new_password ? 'is-invalid' : ''}`}
                                        placeholder="Type New Password"
                                        value={formData.new_password}
                                        onChange={handleChange}
                                        style={{ height: '3.2rem' }}
                                    />
                                    <i
                                        className={`fa ${showPasswords.new_password ? 'fa-eye' : 'fa-eye-slash'} Icon`}
                                        aria-hidden="true"
                                        onClick={() => togglePasswordVisibility('new_password')}
                                    />
                                    {errors.new_password && <div className="password-error">{errors.new_password}</div>}
                                    
                                    {/* Password Requirements Checklist */}
                                    <div className="password-requirements">
                                        <div className="requirements-grid">
                                            {/* First row with 2 items */}
                                            <div className="requirement-row">
                                            <div className={`requirement ${passwordRequirements.length ? 'valid' : ''}`}>
                                                {passwordRequirements.length ? '✓' : '⚠'} At least 8 characters
                                            </div>
                                            <div className={`requirement ${passwordRequirements.lowercase ? 'valid' : ''}`}>
                                                {passwordRequirements.lowercase ? '✓' : '⚠'} Lowercase letter (a-z)
                                            </div>
                                            </div>
                                            
                                            {/* Second row with 3 items */}
                                            <div className="requirement-row">
                                            <div className={`requirement ${passwordRequirements.uppercase ? 'valid' : ''}`}>
                                                {passwordRequirements.uppercase ? '✓' : '⚠'} Uppercase letter (A-Z)
                                            </div>
                                            <div className={`requirement ${passwordRequirements.number ? 'valid' : ''}`}>
                                                {passwordRequirements.number ? '✓' : '⚠'} Number (0-9)
                                            </div>
                                            <div className={`requirement ${passwordRequirements.specialChar ? 'valid' : ''}`}>
                                                {passwordRequirements.specialChar ? '✓' : '⚠'} Special character (#,*)
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="mb-3 position-relative">
                                    <label className={`form-label required ${theme === "dark" ? "color-light":"color-dark"}`}>Confirm New Password</label>
                                    <input
                                        ref={confirmPasswordRef}
                                        type={showPasswords.confirm_password ? "text" : "password"}
                                        name="confirm_password"
                                        className={`form-control confirm-password-input ${errors.confirm_password ? 'is-invalid' : ''}`}
                                        placeholder="Confirm New Password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        style={{ height: '3.2rem' }}
                                    />
                                    <i
                                        className={`fa ${showPasswords.confirm_password ? 'fa-eye' : 'fa-eye-slash'} Icon`}
                                        aria-hidden="true"
                                        onClick={() => togglePasswordVisibility('confirm_password')}
                                    />
                                    {errors.confirm_password && <div className="password-error">{errors.confirm_password}</div>}
                                    
                                    {/* Confirm Password Match Check */}
                                    <div className={`requirement ${confirmPasswordMatch ? 'valid' : ''}`}>
                                        {confirmPasswordMatch ? '✓' : '⚠'} Confirm new password
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <button type="submit" className={`mt-3 submit-button ${theme === "dark" ? "submit-button-light" : "submit-button-dark"}`}>
                        <div className="auth-custom-loader"></div><span className='text'>{progressext ? "Processing..." : "Change Password"}</span>
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChangePassword;