import React, { useState, useContext, Suspense } from "react";
import "./Profile.css";
import Navbar from "./../../components/Navbar";
import { ThemeContext } from "../../components/context/ThemeContext";
import { FaRegArrowAltCircleRight, FaUniversity, FaLock, FaUser, FaWallet } from 'react-icons/fa';
import { Button } from '@mui/material';
import { Grid, Card, Typography, Box, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";


const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("verify-identity");

  const tabs = [
    { id: "verify-identity", title: "Verify Identity", desc: "Complete your account details", icon: <FaUser /> },
    { id: "profile", title: "Profile", desc: "View and update your details", icon: <FaUser /> },
    { id: "deposit", title: "Deposit Banks", desc: "Fund your wallet", icon: <FaUniversity/> },
    { id: "security", title: "Security", desc: "Manage your password & PIN", icon: <FaLock /> },
    { id: "refer", title: "Refer and Earn", desc: "Refer other people to earn credit score.", icon: <FaWallet />  },
    { id: "account-statement", title: "Account Statement", desc: "Generate your statements", icon: "📄" },
  ];

  const tabComponents = {
    "verify-identity":React.lazy(() => import("./VerifyIdentity")),
    profile: React.lazy(() => import("./PersonalInfoForm")),
    security: React.lazy(() => import("./ChangePassword")),
    deposit: React.lazy(() => import("./DepositContainer")),
    refer: React.lazy(() => import("./EarnReferers")),
    "account-statement": React.lazy(() => import("./AccountStatement")),
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        {/* User Header */}
        <div className={`profile-header ${theme === "dark" ? "profile-header-light-bg" : "profile-header-dark-bg"}`}>
          <div className="user-info">
            <div className={`avatar ${theme === "dark" ? "avatar-bg-dark":"avatar-bg-light"}`}><span className="user-profile-image color-dark"><FaUser/></span></div>
              <div className="user-details">
                <span className="user-name-display">Angel Mike</span>
                <p>@angelmike</p>
              </div>
            </div>
          <span className={`status-badge ${theme === "dark" ? "color-dark" : "color-dark"}`}>Not verified</span>
        </div>

        {/* Desktop Tabs */}
        <div className="profile-tabs desktop-only">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab.id)}>
              
              <div className="tab-content">
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-title">{tab.title}</span>
              </div>
            </button>
          ))}
        </div>


        {/* Mobile Menu */}
        <div className="mobile-only profile-menu">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="menu-item"
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="menu-icon">{tab.icon}</span>
              <div className="menu-info">
                <h4>{tab.title}</h4>
                <p>{tab.desc}</p>
              </div>
              <span className="menu-arrow"><FaRegArrowAltCircleRight /></span>
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          {activeTab === "verify-identity" && (
            <>
               <Grid container spacing={2}>

                  {/* Email Verified */}
                  <Grid item xs={12} md={6}>
                    <Card sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <EmailIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6">Verify Email</Typography>
                          <Typography variant="body2" color="text.secondary">
                            You have successfully verified your email address
                          </Typography>
                        </Box>
                      </Box>
                      <Avatar sx={{ bgcolor: "success.main" }}>
                        <CheckCircleIcon />
                      </Avatar>
                    </Card>
                  </Grid>

                  {/* PIN Created */}
                  <Grid item xs={12} md={6}>
                    <Card sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: "secondary.main" }}>
                          <LockIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6">Create PIN</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Your PIN is used to authorise transactions.
                          </Typography>
                        </Box>
                      </Box>
                      <Avatar sx={{ bgcolor: "success.main" }}>
                        <CheckCircleIcon />
                      </Avatar>
                    </Card>
                  </Grid>

                  {/* Phone Verification Pending */}
                  <Grid item xs={12} md={6}>
                    <Card sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: "warning.main" }}>
                          <WarningAmberIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6">Verify Phone Number</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Add and verify your phone number
                          </Typography>
                        </Box>
                      </Box>
                      <Avatar sx={{ bgcolor: "warning.main" }}>!</Avatar>
                    </Card>
                  </Grid>

                </Grid>
                  {/* Info Banner */}
                  <div className="info-banner">
                    ⚠ Please add the required info to complete your account set up
                  </div>

                  {/* User Verification Card */}
                  <div className="user-verification">
                    <div className="line"></div>
                    <div className="verification-details">
                      <h4 className={`${theme === "dark" ? "color-light" : "color-dark"}`}>User verification</h4>
                      <span className="status-unverified">Status: Unverified</span>
                      <Button type="button" className={`verify-btn ${theme === "dark" ? "verify-btn-gb-dark" : "verify-btn-gb-light"}`}>Proceed to Verify Me</Button>
                    </div>
                  </div>
                </>
              )}

                <Suspense fallback={<div>Loading...</div>}>
                  {activeTab && React.createElement(tabComponents[activeTab], { key: activeTab })}
                </Suspense>
        </div>
      </div>
    </>
  );
};

export default Profile;
