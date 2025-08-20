import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Avatar } from "@mui/material";
import "./FiatModal.css"
import "./DepositConfirmation.css"
import {ThemeContext} from "../context/ThemeContext"

const DepositConfirmation = ({ show, isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();  
  const isVisible = show || isOpen;
   
const handelProcessCompleteProfile = () => {
    navigate('/account/profile-complete');
  }
  
  if (!isVisible) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()} >
            <div className="modal-header">
                <button className="close-btn" onClick={onClose}>✖</button>
            </div>
            <div className="d-flex">
              <Avatar sx={{ bgcolor: "warning.main" }} style={{height:'15px', width:'15px', marginTop:'4px', marginRight:'10px', fontSize:'1rem'}}>!</Avatar>  <h4 className="text-header">Account unverified</h4>
            </div>

        <div className="modal-body">
          <p className={`${theme === "dark" ? "color-dark" : "color-dark"}`}>You are required to verify your account before you can deposit money.</p>
        </div>
        <div className="modal-footer">
         <Button type='submit'onClick={handelProcessCompleteProfile} className="custom-btn" style={{alignSelf: 'flex-start', marginTop: 'auto'}}>
            Proceed to Verify Me
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DepositConfirmation;