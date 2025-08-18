import './AllServices.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Suspense, useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

const AllServices = ({ serviceLabels, activeButton, handleButtonClick, setShowAllServices }) => {
  const serviceLinks = [
    '/service/buy-airtime', '/service/buy-data-bundle', '/service/subscribe-cabletv', '/service/pay-electricity', '/service/request-virtual-card',
    '/service/pay-hospital-bill', '/service/load-betting-wallet', '/service/swap', '/service/book-flight', '/service/pay-shopping'
  ];
   const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="cancle-container mt-3">
        <div className="all-services-header">
          <span className={`quickAction ${theme === "dark" ? "color-light" : "color-dark"}`}>Services</span>
          <button className={`close-btn ${theme === "dark" ? "color-light" : "color-dark"}`} onClick={() => setShowAllServices(false)} >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="all-services-header">
          <span className="text-center">Explore our range of services designed to simplify your life.</span>
        </div>
      </div> 
      <div className="row d-flex widget-container justify-content-center mt-1 mb-1 pb-4">
        <div className="action-container gap-5">
          <div className="left-section">
            <div className="d-flex gap-5 button-container">
              <div className="all-services-container">
                <div className="all-services-buttons">
                  {serviceLabels.map((label, index) => (
                    <Link to={serviceLinks[index]} key={index}>
                      <button
                        className={`service-btn ${activeButton === index ? 'active' : ''}`}
                        onClick={() => handleButtonClick(index)}>
                        <i className={`fa ${getIconClass(label)} icon`} aria-hidden="true"></i>
                        <span className="btn-text">{label}</span>
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

AllServices.propTypes = {
  serviceLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeButton: PropTypes.number,
  handleButtonClick: PropTypes.func.isRequired,
  setShowAllServices: PropTypes.func.isRequired,
};

export default AllServices;