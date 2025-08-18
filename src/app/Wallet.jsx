import React from "react";
import "./Wallet.css";
import Navbar from "../components/Navbar";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useState, useEffect, useContext} from 'react'
import { ThemeContext } from "../components/context/ThemeContext"
import { Button, IconButton } from '@mui/material';
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
const Wallet = () => {
  const [activeFilterButton, setActiveFilterButton] = useState('AllButton');
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(false);


  const tabs = ["All", "Swaps", "Withdrawals", "Deposits", "Transfer"];


  const handleFilterButtonClick = (button) => {
    setActiveFilterButton(button);
  }

  useEffect(() => {
         
  }, []);
 
   
    const [showAmount, setShowAmount] = useState(true);
  
    const handleAmountVisibility = () => {
      setShowAmount(!showAmount);
    };
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setLoading(true);

    // simulate API fetch with 3s delay
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };  


  return (
    <>
    <Navbar/>
     <div className="wallet-container" style={{marginTop:"70px"}}>
      {/* Left Sidebar */}
      <aside className="wallet-sidebar" style={{marginTop:"20px"}}>
        <div className="wallet-banner">
          <img src="banner.png" alt="Promo Banner" />
        </div>

        <div className="search-box">
          <FaSearch className="search-icon"/>
          <input type="text" placeholder="Search Wallet" />
        </div>
      
        <div className="filter-btn-container">
          <div className="filter-tabs">
            <Button type="button" onClick={()=>handleFilterButtonClick('AllButton')} className={activeFilterButton ==='AllButton'?'active-btn':'no-active'}>All</Button>
            <Button type="button" onClick={()=>handleFilterButtonClick('Fiat')} className={activeFilterButton ==='Fiat'?'active-btn':'no-active'}>Fiat</Button>
          </div>
        </div>
        

        <div className="balance-card">
          <span>Total Balance</span>
          <span>Approx. USD 0.00</span>
        </div>

        <ul className="coin-list">
          <li className="coin-item active">
            <span className="coint-name color-dark">Naira</span>
            <span className="coin-usd">≈ USD 0.00</span>
          </li>
          <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            <span className="coin-usd">≈ USD 0.00</span>
            </li>
            <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            
            <span className="coin-usd">≈ USD 0.00</span>
            </li>
            <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            
            <span className="coin-usd">≈ USD 0.00</span>
            </li>
            
            <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            
            <span className="coin-usd">≈ USD 0.00</span>
          </li>
          <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            
            <span className="coin-usd">≈ USD 0.00</span>
            </li>
            
            <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            
            <span className="coin-usd">≈ USD 0.00</span>
            </li>
            <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            
            <span className="coin-usd">≈ USD 0.00</span>
            </li>
            <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            
            <span className="coin-usd">≈ USD 0.00</span>
            </li>
            <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            
            <span className="coin-usd">≈ USD 0.00</span>
            </li>
            
            <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            
            <span className="coin-usd">≈ USD 0.00</span>
          </li>
          <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            
            <span className="coin-usd">≈ USD 0.00</span>
            </li>
            
            <li className="coin-item">
            <span className="coint-name color-dark">Bitcoin</span>
            
            <span className="coin-usd">≈ USD 0.00</span>
          </li>
          {/* Repeat for Ethereum, Solana, etc. */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="wallet-main">
        <div  className={`${theme === 'dark' ? 'balance-section' : 'balance-container-dark'}`}>
            <div className="balance-info">
              <div className="balance-text-eye">
                <span  className={`${theme === "dark" ? "color-dark" : "color-light"}`} style={{fontSize:"15px"}}>Available balances</span>
                  <IconButton onClick={handleAmountVisibility} className="hide-amount">
                      {showAmount ? (
                        <VisibilityIcon
                          className={`${theme === "dark" ? "color-dark" : "color-light"} balance-icon`}
                        />
                      ) : (
                        <VisibilityOffIcon
                          style={{ fontSize: "20px", marginBottom: "10px" }}
                          className={`${theme === "dark" ? "color-dark" : "color-light"} balance-icon`}
                        />
                      )}
                  </IconButton>
                
            </div>
            <span>NGN {showAmount ? '5,000,000.00' : <span className='close-amount'>*************</span>}</span>
          </div>
          <div className="balance-actions">
            <button className="action-btn">Deposit</button>
            <button className="action-btn">Withdraw</button>
          </div>
        </div>

        <div className="transaction-history">
          <div className="transaction-tabs">
            {tabs.map((tab) => (
              <Button
                key={tab}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={activeTab === tab ? "active" : ""}>
                {tab}
              </Button>
            ))}
          </div>
          <div className="transaction-content">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <p>No transactions for {activeTab}</p>
            )}
          </div>
        </div>

        <div className="news-section">
          <h3>In The News</h3>
          <div className="news-card">
            <img src="news.png" alt="News" />
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default Wallet;
