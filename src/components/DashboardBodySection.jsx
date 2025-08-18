import React, { useState, useEffect } from "react";
import "./DashboardBodySection.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import OurServices from './Service';
export default function DashboardBodySection() {
  
  // Left banner slides
  const leftBanners = [
    { img: "/banners/banner1.png", title: "Ni paste aza", text: "Trade over 200+ categories of giftcards for instant cashout on SekiApp" },
    { img: "/banners/banner3.png", title: "Giftcard Special", text: "Get higher rates on selected cards this week only!" }
  ];

  // Right banner slides
  const rightBanners = [
    { img: "/banners/banner2.png", title: "Wallet Update", text: "Your Crypto wallets have been updated! Click HERE to copy your new wallet address." },
    { img: "/banners/banner4.png", title: "New Feature", text: "You can now buy data directly from your wallet." }
  ];

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  const nextLeft = () => setLeftIndex((prev) => (prev + 1) % leftBanners.length);
  const prevLeft = () => setLeftIndex((prev) => (prev - 1 + leftBanners.length) % leftBanners.length);

  const nextRight = () => setRightIndex((prev) => (prev + 1) % rightBanners.length);
  const prevRight = () => setRightIndex((prev) => (prev - 1 + rightBanners.length) % rightBanners.length);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % leftBanners.length);
      setRightIndex((prev) => (prev + 1) % rightBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [leftBanners.length, rightBanners.length]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 


  const features = [
    { title: "Buy Airtime", desc: "Trade gift card for Fast cash", btn: "See Top Gift Cards", colorClass: "orange" },
    { title: "Check Rates", desc: "Know your gift cards and crypto value at a glance", btn: "Check Rates", colorClass: "green" },
    { title: "Pay Bills", desc: "Pay your bills at a glance", btn: "Pay Bills", colorClass: "blue" }
  ];

    return (
        <>
        <div className="container">
            <div className="dashboard-body-section">
      {/* Services Section */}
        <OurServices />
      {/* Banners */}
    <div className="banner-section">
      {isMobile ? (
        // Mobile: Show one banner slider
        <>
          <div className="banner-card green-banner">
            <button className="banner-nav" onClick={prevLeft}><IoIosArrowBack /></button>
            <img src={leftBanners[leftIndex].img} alt={leftBanners[leftIndex].title} />
            <div className="banner-text">
              <h4>{leftBanners[leftIndex].title}</h4>
              <p>{leftBanners[leftIndex].text}</p>
            </div>
            <button className="banner-nav" onClick={nextLeft}><IoIosArrowForward /></button>
          </div>
        </>
      ) : (
        // Desktop: Show both banners
        <>
          <div className="banner-card green-banner">
            <button className="banner-nav" onClick={prevLeft}><IoIosArrowBack /></button>
            <img src={leftBanners[leftIndex].img} alt={leftBanners[leftIndex].title} />
            <div className="banner-text">
              <h4>{leftBanners[leftIndex].title}</h4>
              <p>{leftBanners[leftIndex].text}</p>
            </div>
            <button className="banner-nav" onClick={nextLeft}><IoIosArrowForward /></button>
          </div>

          <div className="banner-card purple-banner">
            <button className="banner-nav" onClick={prevRight}><IoIosArrowBack /></button>
            <img src={rightBanners[rightIndex].img} alt={rightBanners[rightIndex].title} />
            <div className="banner-text">
              <h4>{rightBanners[rightIndex].title}</h4>
              <p>{rightBanners[rightIndex].text}</p>
            </div>
            <button className="banner-nav" onClick={nextRight}><IoIosArrowForward /></button>
          </div>
        </>
      )}
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
        </div>
        </>
   
    
  );
}
