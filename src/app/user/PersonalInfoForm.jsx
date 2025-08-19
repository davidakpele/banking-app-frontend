import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Grid, Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { ThemeContext } from "../../components/context/ThemeContext";
import './PersonalInfoForm.css';

const PersonalInfoForm = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    telephone: '',
    dob: '',
    email: ''
  });

  const [errors, setErrors] = useState({
      firstName: '',
      lastName: '',
      gender: '',
      telephone: '',
      dob: '',
      email: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

   const validate = () => {
    let tempErrors = { firstName:'', lastName:'' ,  telephone:'', gender:'', email: '', phoneNumber: '', dob:''};
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!formData.firstName.trim()) {
      tempErrors.firstName = 'First Name is required'; 
      setErrors(tempErrors);
      return false;
    }
    if (!formData.lastName.trim()) {
      tempErrors.lastName = 'Last Name is required';
      setErrors(tempErrors);
      return false;
    }
  
    if (!formData.gender.trim()) {
      tempErrors.gender = 'Gender is required';
      setErrors(tempErrors);
      return false;
    }
    
    if (!formData.dob.trim()) {
      tempErrors.dob = 'Date of birth is required';
      setErrors(tempErrors);
      return false;
    }
    
    if (!formData.telephone.trim()) {
      tempErrors.telephone = 'Telephone number is required';
      setErrors(tempErrors);
      return false;
    }
     
    if (!formData.email.trim()) {
      tempErrors.email = 'Email Address is required';
      setErrors(tempErrors);
      return false;
    } else if (!emailRegex.test(formData.email.trim())) { 
      tempErrors.email = 'Email Address is invalid';
      setErrors(tempErrors);
      return false;
    }
  
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) { 
      console.log("");
    
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} autoComplete='off'>
        <h1 className={`form-title ${theme === "dark" ? "color-light":"color-dark"}`}>Personal Information</h1>
        <div className="form-section">
         <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className="mb-3">
                <label htmlFor="firstName" className={`form-label required ${theme === "dark" ? "color-light":"color-dark"}`}>First Name</label>
                <input type="text" name='firstName' className={`form-control firstName-input ${errors.firstName ? 'is-invalid' : ''}`} placeholder="First Name" value={formData.firstName} onChange={handleChange} style={{ height: '3.2rem' }} />
                {errors.firstName && <div className="firstname-error">{errors.firstName}</div>}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="mb-3">
                <label htmlFor="lastName" className={`form-label required ${theme === "dark" ? "color-light":"color-dark"}`}>Last Name</label>
                <input type="text" name='lastName' className={`form-control lastName-input ${errors.lastName ? 'is-invalid' : ''}`} placeholder="Last Name" value={formData.lastName} onChange={handleChange} style={{ height: '3.2rem' }} />
                {errors.lastName && <div className="firstname-error">{errors.lastName}</div>}
              </div>
            </Grid>
        </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className="mb-3">
                <label htmlFor="gender" className={`form-label required  ${theme === "dark" ? "color-light":"color-dark"}`}>Gender</label>
                <Form.Select size="lg" style={{ height: '43px', backgroundColor:'#fff' }}  name='gender' className={`gender-input ${errors.gender ? 'is-invalid' : ''}`} value={formData.gender} onChange={handleChange} >
                  <option value="">-select-</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  </Form.Select>
                 {errors.gender && <div className="gender-error">{errors.gender}</div>}
              </div>
          </Grid>
            <Grid item xs={12} md={6}>
              <div className="mb-3">
                <label htmlFor="dob" className={`form-label required ${theme === "dark" ? "color-light":"color-dark"}`}>Date of Birth</label>
                <input type="date" name='dob' className={`form-control dob-input ${errors.dob ? 'is-invalid' : ''}`}
                  placeholder="Date of Birth" value={formData.dob} onChange={handleChange} style={{ height: '3.2rem' }} />
                 {errors.dob && <div className="firstname-error">{errors.dob}</div>}
              </div>
          </Grid>
        </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className="mb-3">
                <label htmlFor="telephoneInput" className={`form-label required ${theme === "dark" ? "color-light":"color-dark"}`}>Telephone</label>
                <input type="tel" name='telephone' className={`form-control telephone-input ${errors.telephone ? 'is-invalid' : ''}`} placeholder="+234-919-xxxx-xxx" value={formData.phoneNumber} onChange={handleChange} style={{ height: '3.2rem',maxWidth:'100%' }} />
                 {errors.telephone && <div className="telephone-error">{errors.telephone}</div>}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <label htmlFor="emailInput" className={`form-label resize-widget required ${theme === "dark" ? "color-light":"color-dark"}`}>Email</label>
                <input type="email" name='email' className={`form-control email-input ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" value={formData.email} onChange={handleChange} style={{ height: '3.2rem', maxWidth: '100%' }} />
                {errors.email && <div className="email-error">{errors.email}</div>}
            </Grid>
          </Grid>
          
        </div>
        <button type="submit" className={`mt-3 submit-button ${theme === "dark" ? "submit-button-light":"submit-button-dark"}`} onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;