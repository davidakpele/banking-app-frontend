import { useContext, useState, Suspense,} from 'react';
import { Link } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Typography, Dialog,DialogContentText, DialogActions, DialogTitle, DialogContent, Button, IconButton, MenuItem } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { FiUser } from "react-icons/fi";
import { ThemeContext } from './context/ThemeContext';
import "./WalletBoard.css"
import style from './WalletBoard.module.css';

const WalletBoard = () => {
  const { theme } = useContext(ThemeContext);
  const [showAmount, setShowAmount] = useState(true);

  const handleAmountVisibility = () => {
    setShowAmount(!showAmount);
  };
  
  return (
    <>
      <div className="wallet_board_container">
        <div className="container">
          <div className="welcome-message">
            <div className="user-avatar">
              <FiUser />
            </div>
            Welcome back, &nbsp;
            <span className={`user-name-out ${theme === "dark" ? "color-dark" : "color-light"}`}> angelmike</span>
          </div>
          <div className={`${style.card} ${theme === 'dark' ? 'container-dark' : 'container-light'}`}>
            <div className="card-body">
                <div className="row">
                    <div className={`${style.pad}`}>
                        <div className="balance mt-2">
                          <div className="balance-wrapper">
                            <Button type="button"  className={`currency-button ${theme === "dark" ? "dark" : "light"}`}>
                              USD
                              <span style={{ textTransform: "capitalize", marginLeft: "5px" }}></span>
                              <i className={`fa fa-caret-down ${theme === "dark" ? "text-dark" : "text-light"}`} aria-hidden="true" style={{ color: "#000", fontSize: "15px", marginLeft: "5px" }} ></i>
                            </Button>
                            <div className="balance-display">
                              <Typography variant="h5" className="balance-row">
                                <span className={`bal-amount ${theme === "dark" ? "color-light" : "color-dark"}`}>
                                  {showAmount ? 500 : "*******"}
                                </span>
                                <IconButton onClick={handleAmountVisibility} className="balance-icon-btn">
                                  {showAmount ? (
                                    <VisibilityIcon
                                      className={`${theme === "dark" ? "color-light" : "color-dark"} balance-icon`}
                                    />
                                  ) : (
                                    <VisibilityOffIcon
                                      style={{ fontSize: "20px", marginBottom: "10px" }}
                                      className={`${theme === "dark" ? "color-light" : "color-dark"} balance-icon`}
                                    />
                                  )}
                                </IconButton>
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 text-right pull-right footer-right">
                            <div className="d-flex gap-5 itemContainer">
                            <div className="deposit_container items list_icon deposit-button">
                                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 64" width="35" height="35" style={{ marginRight: "10px" }}>
                                <rect width="40" height="22" x="31" y="31" fill="#ffe773" transform="rotate(90 51 42)" className="colorffe773 svgShape"></rect>
                                <path fill="#0ead69" d="M48,62c0-3.32-3.58-6-8-6v6Z" className="color0ead69 svgShape"></path>
                                <path fill="#0ead69" d="M48 62c0-3.32-3.58-6-8-6v6zM54 62c0-3.32 3.58-6 8-6v6z" className="color0ead69 svgShape"></path>
                                <path fill="#0ead69" d="M54 62c0-3.32 3.58-6 8-6v6zM54 22c0 3.32 3.58 6 8 6V22z" className="color0ead69 svgShape"></path>
                                <path fill="#0ead69" d="M54 22c0 3.32 3.58 6 8 6V22zM48 22c0 3.32-3.58 6-8 6V22z" className="color0ead69 svgShape"></path>
                                <rect width="20" height="40" x="2" y="2" fill="#424752" rx="5" className="color424752 svgShape"></rect>
                                <rect width="20" height="28" x="2" y="8" fill="#497da6" className="color497da6 svgShape"></rect>
                                <path fill="#8c791c" d="M52,41V38c1.08,0,2,.69,2,1.5h2A3.78,3.78,0,0,0,52,36V34H50v2a3.78,3.78,0,0,0-4,3.5A3.78,3.78,0,0,0,50,43v3c-1.08,0-2-.69-2-1.5H46A3.78,3.78,0,0,0,50,48v2h2V48a3.78,3.78,0,0,0,4-3.5A3.78,3.78,0,0,0,52,41Zm-4-1.5c0-.81.92-1.5,2-1.5v3C48.92,41,48,40.31,48,39.5ZM52,46V43c1.08,0,2,.69,2,1.5S53.08,46,52,46Z" className="color8c791c svgShape"></path>
                                <rect width="8" height="2" x="8" y="5" fill="#faf3dd" className="colorfaf3dd svgShape"></rect>
                                <rect width="2" height="2" x="11" y="38" fill="#faf3dd" className="colorfaf3dd svgShape"></rect>
                                <path fill="#ffe773" d="M13,21V17a2,2,0,0,1,2,2h2a4,4,0,0,0-4-4V13H11v2a4,4,0,0,0,0,8v4a2,2,0,0,1-2-2H7a4,4,0,0,0,4,4v2h2V29a4,4,0,0,0,0-8ZM9,19a2,2,0,0,1,2-2v4A2,2,0,0,1,9,19Zm4,8V23a2,2,0,0,1,0,4Z" className="colorffe773 svgShape"></path>
                                <path fill="#424752" d="M13 56V53h2a1 1 0 0 0 .89-1.45l-3-6a1 1 0 0 0-1.78 0l-3 6A1 1 0 0 0 9 53h2v3a5 5 0 0 0 5 5H35V59H16A3 3 0 0 1 13 56zM54.85 11.47A1 1 0 0 0 54 11H52V8a5 5 0 0 0-5-5H28V5H47a3 3 0 0 1 3 3v3H48a1 1 0 0 0-.89 1.45l3 6a1 1 0 0 0 1.78 0l3-6A1 1 0 0 0 54.85 11.47z" className="color424752 svgShape"></path>
                                </svg>
                                <span className={`withdraw_text mb-1 ${theme === 'dark' ? 'color-light' : 'color-dark'}`}>Deposit</span>
                            </div>
                                <div className="trade_container items">
                                <Link className="list_icon swap_coins" to={"/swap/coins"}>
                                    <i className={`fa fa-exchange ${theme === 'dark' ? 'color-light' : 'color-dark'}`} aria-hidden="true" style={{fontSize:'20px', marginBottom:'10px'}}></i>
                                    <span className={`withdraw_text mb-1 ${theme === 'dark' ? 'color-light' : 'color-dark'}`}>Swap</span>
                                </Link>
                            </div>
                                <div className="withdraw_container items">
                                    <Link className="list_icon" to={"/user/withdraw"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32">
                                        <rect width="58" height="22" x="3" y="3" fill="#414042" rx="2" className="color414042 svgShape"></rect>
                                        <path fill="#a7a9ac" d="M7 7h50v14H7z" className="colora7a9ac svgShape"></path>
                                        <rect width="42" height="4" x="11" y="12" fill="#414042" rx="2" className="color414042 svgShape"></rect>
                                        <path fill="#5eac24" d="M49 17v-5H15v49h34V17z" className="color5eac24 svgShape"></path>
                                        <path fill="#91dc5a" d="M45 12v41a4 4 0 0 0-4 4H23a4 4 0 0 0-4-4V12Z" className="color91dc5a svgShape"></path>
                                        <circle cx="32" cy="32" r="12" fill="#f1f2f2" className="colorf1f2f2 svgShape"></circle>
                                        <path fill="#ff9811" d="M30 31.86a2.124 2.124 0 0 1-1.747 2.121 2 2 0 0 1-1.173-3.761 1.5 1.5 0 1 0-1.347-2.679A5.057 5.057 0 0 0 23.42 30h-.92a1.5 1.5 0 0 0 0 3h.6c0 .138 0 .063.969 1.726a4.428 4.428 0 0 0 2.873 2.174A5.013 5.013 0 0 0 33 32.163a2.145 2.145 0 0 1 1.468-2.089 2 2 0 0 1 1.452 3.706 1.5 1.5 0 1 0 1.313 2.7A5.057 5.057 0 0 0 39.9 33h.6a1.5 1.5 0 0 0 0-3h-.91A5 5 0 0 0 30 31.86Z"className="colorff9811 svgShape"></path>
                                        <path fill="#5eac24" d="M19 12h26v3H19z" className="color5eac24 svgShape"></path>
                                        <path fill="#4e901e" d="M45 12h4v3h-4zM15 12h4v3h-4z" className="color4e901e svgShape"></path>
                                        <path d="M32 54a1 1 0 0 0 1-1v-5a1 1 0 0 0-2 0v5a1 1 0 0 0 1 1Z"></path>
                                        <path d="M59 2H5a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h9v35a1 1 0 0 0 1 1h34a1 1 0 0 0 1-1V26h9a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm-8 11a1 1 0 0 1 0 2h-1v-2Zm-1 4h1a3 3 0 0 0 0-6H13a3 3 0 0 0 0 6h1v3H8V8h48v12h-6Zm-7 15a10.993 10.993 0 0 1-21.872 1.585 2.479 2.479 0 0 0 1.351.415l.028.047c.142.238.361.605.7 1.182a5.419 5.419 0 0 0 3.537 2.646 6.156 6.156 0 0 0 1.239.125A6 6 0 0 0 34 32.2a1.19 1.19 0 0 1 .725-1.155 1 1 0 0 1 .749 1.844 2.52 2.52 0 0 0-1.357 3.025 2.467 2.467 0 0 0 1.39 1.539 2.584 2.584 0 0 0 2.175-.078 6.085 6.085 0 0 0 2.975-3.376 2.5 2.5 0 0 0 2.327-2.324c.003.106.016.214.016.325Zm-16.982 2.253a2.994 2.994 0 0 0 2.362.72A3.1 3.1 0 0 0 31 31.888a4.012 4.012 0 0 1 4.753-3.824 3.993 3.993 0 0 1 2.919 2.336 1 1 0 0 0 .918.6h.91a.5.5 0 0 1 0 1h-.6a1 1 0 0 0-.979.8 4.067 4.067 0 0 1-2.136 2.788.6.6 0 0 1-.5.025.456.456 0 0 1-.264-.294.558.558 0 0 1 .352-.645A3.026 3.026 0 0 0 38 32a3 3 0 0 0-3.788-2.893A3.127 3.127 0 0 0 32 32.13a4.014 4.014 0 0 1-4.858 3.786 3.429 3.429 0 0 1-2.209-1.693c-.342-.587-.564-.959-.708-1.2l-.152-.253A1 1 0 0 0 23.1 32h-.6a.5.5 0 0 1 0-1h.92a1 1 0 0 0 .914-.595 4.069 4.069 0 0 1 1.854-1.974.627.627 0 0 1 .528-.039.442.442 0 0 1 .258.293.556.556 0 0 1-.352.646 3 3 0 0 0-.6 4.922ZM40.5 29h-.3A6.006 6.006 0 0 0 29 31.832a1.144 1.144 0 0 1-.874 1.157.982.982 0 0 1-.786-.238 1 1 0 0 1 .187-1.637 2.516 2.516 0 0 0 1.355-3.028 2.457 2.457 0 0 0-1.393-1.539 2.625 2.625 0 0 0-2.212.1A6.061 6.061 0 0 0 22.809 29H22.5a2.468 2.468 0 0 0-1.149.293A10.989 10.989 0 0 1 42.949 31a2.5 2.5 0 0 0-2.449-2ZM20 36.992a13 13 0 0 0 24 0V52.1a5.013 5.013 0 0 0-3.9 3.9H23.9a5.013 5.013 0 0 0-3.9-3.9Zm24-9.984a13 13 0 0 0-24 0V13h11v3a1 1 0 0 0 2 0v-3h11ZM14 15h-1a1 1 0 0 1 0-2h1Zm34 45H16V13h2v40a1 1 0 0 0 1 1 3 3 0 0 1 3 3 1 1 0 0 0 1 1h18a1 1 0 0 0 1-1 3 3 0 0 1 3-3 1 1 0 0 0 1-1V13h2Zm12-37a1 1 0 0 1-1 1h-9v-2h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7v2H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h54a1 1 0 0 1 1 1Z"></path>
                                        </svg>
                                         <span className={`withdraw_text mb-1 ${theme === 'dark' ? 'color-light' : 'color-dark'}`}>Withdraw</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default WalletBoard
