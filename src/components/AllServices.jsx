import './AllServices.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AllServices = ({ serviceLabels, activeButton, handleButtonClick, setShowAllServices }) => {
  const serviceLinks = [
    '/service/airtime', '/service/data', '/service/cabletv', '/service/electricity', '/service/buy-gift-card',
    '/service/sell-gift-card', '/service/betting', '/service/swap-crypto', '/service/book-flight',
  ];

  return (
    <>
      <div className="cancle-container mt-3">
        <div className="all-services-header">
          <span className='quickAction'>Services</span>
          <button className="close-btn" onClick={() => setShowAllServices(false)}>
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
      return 'fa-bolt';
    case 'Buy Gift Card':
      return 'fa-credit-card';
    case 'Sell Gift Card':
      return 'fa-credit-card';
    case 'Betting':
      return 'fa-train';
    case 'Swap Crypto':
      return 'fa-credit-card';
    case 'Book Flight':
      return 'fa-plane';
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