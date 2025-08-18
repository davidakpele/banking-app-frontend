import { useContext, useState, Suspense,} from 'react';
import { Link } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Typography, Dialog,DialogContentText, DialogActions, DialogTitle, DialogContent, Button, IconButton, MenuItem } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { FiUser } from "react-icons/fi";
import { ThemeContext } from './context/ThemeContext';
import "./WalletBoard.css"
import { ArrowForwardIosSharp, SendToMobile, SwapHorizontalCircleRounded } from '@mui/icons-material';
import { FaCreditCard } from 'react-icons/fa';

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
            <span className={`user-name-out ${theme === "dark" ? "color-light" : "color-dark"}`}> angelmike</span>
          </div>
          <div className={`card ${theme === 'dark' ? 'container-dark' : 'container-light'}`}>
            <div className="card-body">
                <div className="row">
                  <div className="pad">
                    <div className="balance mt-2">
                        <div className='eye-control'>
                          <IconButton onClick={handleAmountVisibility} className="balance-icon-btn">
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
                          <div className="balance-wrapper">
                            <Button type="button"  className="currency-button light">
                              USD
                              <span style={{ textTransform: "capitalize", marginLeft: "5px" }}></span>
                              <i className="fa fa-caret-down text-light" aria-hidden="true" style={{ color: "#000", fontSize: "15px", marginLeft: "5px" }} ></i>
                            </Button>
                            <div className="balance-display">
                              <Typography variant="h2" className="balance-row">
                                <span className="bal-amount">
                                  NGN{showAmount ? ' 5,000,000.00' : "*************"}
                                </span>
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <div className="text-right pull-right footer-right">
                            <div className="d-flex gap-5 itemContainer">
                              <div className="wallet-footer">
                                <div className="item">
                                    <Link to={"#"}>
                                        <div className={`icon-wrapper bg-danger ${theme === "dark" ? "color-dark" : "color-light"}`}>
                                          <SendToMobile />
                                        </div>
                                        <strong className={`${theme === "dark" ? "color-dark" : "color-light"}`}>Withdraw</strong>
                                    </Link>
                                </div>
                                <div className="item">
                                    <Link to={"#"}>
                                        <div className="icon-wrapper">
                                            <ArrowForwardIosSharp />
                                        </div>
                                        <br></br>
                                        <strong className={`${theme === "dark" ? "color-dark" : "color-light"}`}>Send</strong>
                                    </Link>
                                </div>
                                <div className="item">
                                    <Link to={"#"}>
                                        <div className="icon-wrapper bg-success">
                                            <FaCreditCard />
                                        </div><br></br>
                                        <strong className={`${theme === "dark" ? "color-dark" : "color-light"}`}>Cards</strong>
                                    </Link>
                                </div>
                                <div className="item">
                                    <Link to={"#"}data-bs-toggle="modal" data-bs-target="#exchangeActionSheet">
                                        <div className="icon-wrapper bg-warning">
                                            <SwapHorizontalCircleRounded />
                                        </div>
                                        <strong className={`${theme === "dark" ? "color-dark" : "color-light"}`}>Exchange</strong>
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
    </div>
    </>
  )
}

export default WalletBoard
