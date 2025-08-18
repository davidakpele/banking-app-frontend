import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Grid, Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { ThemeContext } from "../../components/context/ThemeContext";
import './PersonalInfoForm.css';

const PersonalInfoForm = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    firstName: 'Angel',
    lastName: 'Mike',
    gender: '',
    phoneNumber: '',
    dob: '',
    email: 'angellamicheal.asc@gmail.com'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
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
                <input type="text" name='firstName' className="form-control firstName-input" placeholder="First Name" value={formData.firstName} onChange={handleChange} style={{ height: '3.2rem' }} />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="mb-3">
                <label htmlFor="lastName" className={`form-label required ${theme === "dark" ? "color-light":"color-dark"}`}>Last Name</label>
                <input type="text" name='lastName' className="form-control lastName-input" placeholder="Last Name" value={formData.lastName} onChange={handleChange} style={{ height: '3.2rem' }} />
              </div>
            </Grid>
        </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className="mb-3">
                <label htmlFor="gender" className={`form-label required ${theme === "dark" ? "color-light":"color-dark"}`}>Gender</label>
                <Form.Select size="lg" style={{ height: '43px', backgroundColor:'#fff' }} name='gender' className="gender-input" value={formData.gender} onChange={handleChange} >
                  <option value="">-select-</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  </Form.Select>
              </div>
          </Grid>
            <Grid item xs={12} md={6}>
              <div className="mb-3">
                <label htmlFor="dob" className={`form-label required ${theme === "dark" ? "color-light":"color-dark"}`}>Date of Birth</label>
                <input type="date" name='dob' className="form-control dob-input"
                  placeholder="Date of Birth" value={formData.dob} onChange={handleChange} style={{ height: '3.2rem' }} />
              </div>
          </Grid>
        </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className="mb-3">
                <label htmlFor="telephoneInput" className={`form-label required ${theme === "dark" ? "color-light":"color-dark"}`}>Telephone</label>
                <input type="tel" name='phoneNumber' className="form-control telephone-input" placeholder="+234-919-xxxx-xxx" value={formData.phoneNumber} onChange={handleChange} style={{ height: '3.2rem',maxWidth:'100%' }} />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <label htmlFor="emailInput" className={`form-label resize-widget required ${theme === "dark" ? "color-light":"color-dark"}`}>Email</label>
                <input type="email" name='email' className="form-control email-input" placeholder="Email" value={formData.email} onChange={handleChange} style={{ height: '3.2rem', maxWidth: '100%' }} />
            </Grid>
          </Grid>
          
        </div>
        <button type="submit" className={`mt-3 submit-button ${theme === "dark" ? "submit-button-light":"submit-button-dark"}`}>Save</button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;