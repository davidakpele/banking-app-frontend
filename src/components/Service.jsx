import React, {useContext} from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { ThemeContext } from './context/ThemeContext';
import './Services.css';

const Service = () => {
  const { theme } = useContext(ThemeContext);
  const services = [
    { label: 'Buy Airtime' },
    { label: 'Buy Data' },
    { label: 'CableTv' },
    { label: 'Electricity' },
    { label: 'Virtual Card' },
    { label: 'Hospital' },
    { label: 'Betting' },
    { label: 'Swap' },
    { label: 'Book Flight' },
    { label: 'Shopping' }
  ];

  const getIconClass = (label) => {
    switch (label) {
      case 'Buy Airtime':
        return 'fa-phone';
      case 'Buy Data':
        return 'fa-wifi';
      case 'CableTv':
        return 'fa-tv';
      case 'Electricity':
        return 'fa-lightbulb';
      case 'Virtual Card':
        return 'fa-credit-card';
      case 'Hospital':
        return 'fa-medkit';
      case 'Betting':
        return 'fa-trophy';
      case 'Swap':
        return 'fa-exchange';
      case 'Book Flight':
        return 'fa-plane';
      case 'Shopping':
        return 'fa-shopping-cart';
      default:
        return '';
    }
  };

  return (
    <div className="service-container">
      <Grid container spacing={2}>
        {services.map((service, index) => (
          <Grid item xs={4} sm={3} md={2} key={index}>
            <Button
              className={`service-button ${theme === "dark" ? "service-label-light" : "service-label-dark"}`}
              variant="outlined"
              fullWidth
              sx={{
                flexDirection: 'column',
                height: '100%',
                minHeight: '100px',
                padding: '16px 8px',
                borderRadius: '12px',
                background:"#000",
                border: '2px solid #e0e0e0',
      
              }}>
              <div className="service-icon">
                <i className={`fa  ${theme === "dark" ? "color-dark" : "color-light"} ${getIconClass(service.label)}`} aria-hidden="true"></i>
              </div>
              <Typography
                variant="caption"
                component="div"
                className={`service-label ${theme === "dark" ? "color-dark" : "color-light"}`}
                sx={{
                  mt: 1,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  textAlign: 'center',
                  color: 'text.primary'
                }}
              >
                {service.label}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Service;