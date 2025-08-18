import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../components/context/ThemeContext";
import "./DepositContainer.css"
import { FaPlus } from "react-icons/fa";

function DepositContainer() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
      setTimeout(() => {
          setIsLoading(false); 
        
      }, 3000);
  });
  
  const handleRedirect = () => {
    navigate("/account/add-bank");
  };
  return (
    <>
        <div className="deposit-container">
          <h2 className={`deposit-header ${theme === "dark" ? "color-light":"color-dark"}`} >Deposit Bank Account</h2>
          <span className="sub-info-note">Deposit your funds into your bank account.</span>
          <p className='info-inst'><strong className="strong-note">Note: </strong>You are only allowed to add a total of 5 banks per currency</p>
          <div className="deposit-details-container">
            {/* show loading first for 3 seconds*/}
          {isLoading ? (<div className="sms-bank-container-loader">
            <div className='loader-notification-sm' />
          </div>
          ) : (
              <>
               {/* Show this container after loader */}
              <div className="add-bank-container" onClick={handleRedirect}>
                <FaPlus className="add-icon" />
                <span>Add New Bank Account</span>
              </div>
              </>
          )}
                  
           
          </div>
      </div>
    </>
  )
}

export default DepositContainer
