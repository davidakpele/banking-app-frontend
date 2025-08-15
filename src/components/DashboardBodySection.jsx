import React, { useState } from "react";
import "./DashboardBodySection.css";
import { FaBitcoin, FaGift, FaCreditCard, FaPhoneAlt, FaChartBar, FaLightbulb } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function DashboardBodySection() {
  const services = [
    { name: "Crypto", icon: <FaBitcoin /> },
    { name: "Gift cards", icon: <FaGift /> },
    { name: "Virtual Card", icon: <FaCreditCard /> },
    { name: "Airtime", icon: <FaPhoneAlt /> },
    { name: "Data", icon: <FaChartBar /> },
    { name: "Electricity", icon: <FaLightbulb /> },
  ];

  const banners = [
    {
      img: "/banners/banner1.png",
      text: "Ni paste aza - Trade over 200+ categories of giftcards for instant cashout on SekiApp"
    },
    {
      img: "/banners/banner2.png",
      text: "Your Crypto wallets have been updated! Click HERE to copy your new wallet address."
    }
  ];

  const features = [
    {
      title: "Top Gift Cards",
      desc: "Trade gift card for Fast cash",
      btn: "See Top Gift Cards",
      colorClass: "orange"
    },
    {
      title: "Check Rates",
      desc: "Know your gift cards and crypto value at a glance",
      btn: "Check Rates",
      colorClass: "green"
    },
    {
      title: "Pay Bills",
      desc: "Pay your bills at a glance",
      btn: "Pay Bills",
      colorClass: "blue"
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="dashboard-body-section">
      
      {/* Services */}
      <div className="services-card">
        <div className="services-header">
          <h2>Services</h2>
          <button className="view-all">View all</button>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <div key={i} className="service-item">
              <div className="service-icon">{service.icon}</div>
              <span>{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Banners */}
      <div className="banner-section">
        <button className="banner-nav" onClick={prevBanner}>
          <IoIosArrowBack />
        </button>
        <div className="banner">
          <img src={banners[currentBanner].img} alt="banner" />
          <p>{banners[currentBanner].text}</p>
        </div>
        <button className="banner-nav" onClick={nextBanner}>
          <IoIosArrowForward />
        </button>
      </div>

      {/* Features */}
      <div className="features-grid">
        {features.map((feature, i) => (
          <div key={i} className={`feature-card ${feature.colorClass}`}>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
            <button>{feature.btn}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
