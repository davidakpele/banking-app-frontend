import './Services.css';
import { useState, useEffect, lazy, Suspense, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';

const AllServices = lazy(() => import('./AllServices'));

const OurServices = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [visibleButtons, setVisibleButtons] = useState(3); 
  const [showAllServices, setShowAllServices] = useState(false);
  const { theme } = useContext(ThemeContext);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const updateVisibleButtons = () => {
    const screenWidth = window.innerWidth;
    let buttonsToShow;

    if (screenWidth < 500) {
      buttonsToShow = 3;
    } else if (screenWidth >= 500 && screenWidth < 650) {
      buttonsToShow = 4;
    } else if (screenWidth >= 650 && screenWidth < 800) {
      buttonsToShow = 6;
    }else if (screenWidth >= 800 && screenWidth < 1000) {
      buttonsToShow = 7;
    } 
    else if (screenWidth >= 1000 && screenWidth < 1300) {
      buttonsToShow = 8;
    } else {
      buttonsToShow = serviceLabels.length; // Show all on screens >= 1000px
    }
    if (screenWidth >= 1000 && showAllServices) {
      setShowAllServices(false);
    }
    setVisibleButtons(buttonsToShow);
  };

  useEffect(() => {
    updateVisibleButtons();
    window.addEventListener('resize', updateVisibleButtons);
    return () => {
      window.removeEventListener('resize', updateVisibleButtons);
    };
  });

  const serviceLabels = [
    'Buy Airtime', 'Buy Data', 'CableTv', 'Electricity', 'Virtual Card',
    'Hospital', 'Betting', 'Swap', 'Book Flight', 'Shopping'
  ];

  const serviceLinks = [
    '/service/buy-airtime', '/service/buy-data-bundle', '/service/subscribe-cabletv', '/service/pay-electricity', '/service/request-virtual-card',
    '/service/pay-hospital-bill', '/service/load-betting-wallet', '/service/swap', '/service/book-flight', '/service/pay-shopping'
  ];

  // Hide "More" button when all services are visible or on large screens
  const shouldShowMoreButton = 
    !showAllServices && 
    visibleButtons < serviceLabels.length &&
    window.innerWidth < 1000;

  return (
    <>
      {!showAllServices ? (
        <div className="service-action-container">
           <div className="services-header">
            <h4 className={`${theme === "dark" ? "color-light" : "color-dark"}`}>Services</h4>
          </div>
          <div className="row QR5Jd d-flex justify-content-center mt-1 mb-1">
            <div className="action-container gap-5">
              <div className="left-section">
                <div className="d-flex gap-5 button-container">
                  {serviceLabels.slice(0, visibleButtons).map((label, index) => (
                    <div className="service-widget" key={index}>
                      <Link to={serviceLinks[index]}>
                        <button
                          className={`service-btn ${activeButton === index ? 'active' : ''}`}
                          onClick={() => handleButtonClick(index)}>
                          <i className={`fa ${getIconClass(label)} icon`} aria-hidden="true"></i>
                          <span className="btn-text">{label}</span>
                        </button>
                      </Link>
                    </div>
                  ))}
                  {shouldShowMoreButton && (
                    <div className="service-widget">
                      <button
                        className={`service-btn ${activeButton === visibleButtons ? 'active' : ''}`}
                        onClick={() => setShowAllServices(true)}
                      >
                        <i className="fa fa-ellipsis-h icon" aria-hidden="true"></i>
                        <span className="btn-text">More</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <AllServices
            serviceLabels={serviceLabels}
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
            setShowAllServices={setShowAllServices}
          />
        </Suspense>
      )}
    </>
  );
};

const getIconClass = (label) => {
  switch (label) {
    case 'Buy Airtime':
      return 'fa-phone';
    case 'Buy Data':
      return 'fa-wifi';
    case 'CableTv':
      return 'fa-tv';
    case 'Electricity':
      return 'fa-lightbulb';
    case 'Virtual Card':
      return 'fa-credit-card';
    case 'Hospital':
      return 'fa-medkit';
    case 'Betting':
      return 'fa-train';
    case 'Swap':
      return 'fa-exchange';
    case 'Book Flight':
      return 'fa-plane';
    case 'Shopping':
      return 'fa-shopping-cart';
    default:
      return '';
  }
};

export default OurServices;