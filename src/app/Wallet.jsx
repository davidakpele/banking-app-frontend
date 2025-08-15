import React from "react";
import "./Wallet.css";
import Navbar from "../components/Navbar";

const Wallet = () => {
  return (
    <>
    <Navbar/>
     <div className="wallet-container" style={{marginTop:"70px"}}>
      {/* Left Sidebar */}
      <aside className="wallet-sidebar">
        <div className="wallet-banner">
          <img src="banner.png" alt="Promo Banner" />
        </div>

        <div className="search-box">
          <input type="text" placeholder="Search Coin" />
        </div>

        <div className="filter-tabs">
          <button className="active">All</button>
          <button>Crypto</button>
          <button>Fiat</button>
        </div>

        <div className="balance-card">
          <span>Total Balance</span>
          <span>Approx. USD 0.00</span>
        </div>

        <ul className="coin-list">
          <li className="coin-item active">
            <span className="coin-name">Naira</span>
            <span className="coin-value">0.00 NGN</span>
            <span className="coin-usd">≈ USD 0.00</span>
          </li>
          <li className="coin-item">
            <span className="coin-name">Bitcoin</span>
            <span className="coin-value">0.00 BTC</span>
            <span className="coin-usd">≈ USD 0.00</span>
          </li>
          {/* Repeat for Ethereum, Solana, etc. */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="wallet-main">
        <div className="balance-section">
          <div className="balance-info">
            <h4>Available balances</h4>
            <h2>NGN 0.00</h2>
            <p>0.00 USD</p>
          </div>
          <div className="balance-actions">
            <button className="action-btn">Deposit</button>
            <button className="action-btn">Withdraw</button>
          </div>
        </div>

        <div className="quick-actions">
          <button>Buy Crypto</button>
          <button>Sell Crypto</button>
          <button>Swap</button>
          <button>Pay Bills</button>
        </div>

        <div className="transaction-history">
          <div className="transaction-tabs">
            <button className="active">All</button>
            <button>Pending</button>
            <button>Orders</button>
            <button>Bills</button>
            <button>Swaps</button>
            <button>Withdrawals</button>
            <button>Deposits</button>
            <button>Transfer</button>
          </div>
          <div className="transaction-content">
            <p>No transactions</p>
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
