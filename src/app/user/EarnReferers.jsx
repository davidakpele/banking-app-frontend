import React, { useState, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  Button, 
  Paper, 
  Tabs,
Grid,
  Tab,
  IconButton,
  Tooltip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ThemeContext } from "../../components/context/ThemeContext";
import "./EarnReferers.css";

const EarnReferers = () => {
    const { theme } = useContext(ThemeContext);
    const [tabValue, setTabValue] = useState(0);
    const referralCode = "angelmike";
    const referralLink = "https://sekiapp.com/register?referral=angelmike";
    const earnings = "N1000";

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // Add toast notification here if needed
    };

  return (
    <Box className="box-widget">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }} className={`header-o ${theme === "dark" ? "color-light":"color-dark"}`}>
        Refer and Earn
      </Typography>

      <div className="container-grid">

      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="referral tabs">
          <Tab label="Code & Link" />
          <Tab label="Earnings" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ pt: 3 }}>
        <Typography paragraph sx={{ mb: 3 }} >
           <span className={`sub-title ${theme === "dark" ? "color-dark":"color-dark"}`}> When your friends join our app via your referral code <strong>{referralCode}</strong> you get 
            <strong> '{earnings}'</strong> on every heavy transaction they made from <strong>N 500,000.00</strong> above! And you enjoy ZERO CHARGES on transfers to them.</span>
        </Typography>
        {tabValue === 0 && (
          <>
          
            {/* Referral Code Section */}
            <div className="link-container">
            <Paper elevation={2} sx={{ p: 2, mb: 3 }} className="card-widget">
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                REFERRAL CODE
              </Typography>
              <Box className="d-flex flex-copy-item">
                <Typography variant="h6" component="div" className="copy-content"   style={{ width: "100%" }}>
                  {referralCode}
                </Typography>
                <Tooltip title="Copy code">
                  <IconButton 
                    onClick={() => handleCopy(referralCode)} 
                    color="primary"
                    sx={{ ml: 2, color: "black", }}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Button variant="contained" fullWidth
                sx={{mt: 4, bgcolor: "black", color: "white", py: 1.5, 
                    "&:hover": {bgcolor: "#333"}
                }}
                onClick={() => handleCopy(referralCode)}
                startIcon={<ContentCopyIcon />}>
                Copy Code
              </Button>
            </Paper>

            {/* Referral Link Section */}
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                REFERRAL LINK
              </Typography>
              <Box className="d-flex flex-copy-item">
                <Typography variant="h6" component="div" className="copy-content"   style={{ width: "100%" }}>
                  {referralLink}
                </Typography>
                <Tooltip title="Copy link">
                  <IconButton 
                    onClick={() => handleCopy(referralLink)} 
                    color="primary"
                    sx={{ ml: 2, color: "black", }}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Button variant="contained" fullWidth
                sx={{
                    mt: 4,
                    bgcolor: "black",
                    color: "white",
                    py: 1.5, 
                    "&:hover": {
                    bgcolor: "#333"      
                    }
                }}
                onClick={() => handleCopy(referralLink)}
                startIcon={<ContentCopyIcon />}>
                Copy Link
                </Button>

            </Paper>
            </div>
          </>
        )}

        {tabValue === 1 && (
  <Grid container spacing={2} sx={{ mt: 3 }}>
    <Grid item xs={6}>
      <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="subtitle2">Total Referrals</Typography>
        <Typography variant="h5">0</Typography>
      </Paper>
    </Grid>
    <Grid item xs={6}>
      <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="subtitle2">Total Earnings</Typography>
        <Typography variant="h5">₦0.00</Typography>
      </Paper>
    </Grid>
    
    {/* Referrals Table */}
    <Grid item xs={12}>
      <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>All Referrals</Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <table className="referrals-table" style={{ width: '100%' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Username</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Date Referred</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Paid</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample data - replace with your actual data */}
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px 16px' }}>user123</td>
                <td style={{ padding: '12px 16px' }}>2023-10-15</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ 
                    color: '#4caf50', 
                    fontWeight: 'bold',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}>
                    ✓ ₦1000
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px 16px' }}>investor22</td>
                <td style={{ padding: '12px 16px' }}>2023-10-10</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ 
                    color: '#f44336',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}>
                    ✗ Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px' }}>trader45</td>
                <td style={{ padding: '12px 16px' }}>2023-10-05</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ 
                    color: '#4caf50',
                    fontWeight: 'bold',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}>
                    ✓ ₦1000
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
        
        {/* Empty state */}
        {/* Uncomment if you want to show when no referrals exist
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          py: 4,
          color: 'text.secondary'
        }}>
          <Typography variant="body1" sx={{ mb: 1 }}>No referrals yet</Typography>
          <Typography variant="body2">Share your referral link to start earning</Typography>
        </Box>
        */}
      </Paper>
    </Grid>
  </Grid>
)}
      </Box>
      </div>
    </Box>
  );
};

export default EarnReferers;