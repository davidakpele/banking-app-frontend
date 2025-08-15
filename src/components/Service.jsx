import './Services.css';
import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

const AllServices = lazy(() => import('./AllServices'));

const OurServices = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [visibleButtons, setVisibleButtons] = useState(4); // Initially show 4 buttons
  const [showAllServices, setShowAllServices] = useState(false); // Control visibility of all services

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const updateVisibleButtons = () => {
    const baseWidth = 450; // Base width from which we start adding buttons
    const increment = 45;
    const screenWidth = window.innerWidth;
    const additionalButtons = Math.max(0, Math.floor((screenWidth - baseWidth) / increment));
    const totalButtons = 3 + additionalButtons;
    setVisibleButtons(Math.min(totalButtons, 14)); // Max of 14 buttons because "More" button is considered separately
  };

  useEffect(() => {
    updateVisibleButtons();
    window.addEventListener('resize', updateVisibleButtons);
    return () => {
      window.removeEventListener('resize', updateVisibleButtons);
    };
  }, []);

  const serviceLabels = [
    'Buy Airtime', 'Buy Data', 'CableTv', 'Electricity', 'Buy Gift Card',
    'Sell Gift Card', 'Betting', 'Swap Crypto','Book Flight',
  ];

  const serviceLinks = [
    '/service/airtime', '/service/data', '/service/cabletv', '/service/electricity', '/service/buy-gift-card',
    '/service/sell-gift-card', '/service/betting', '/service/swap-crypto', '/service/book-flight',
  ];

  return (
    <>
      <div className="container">
         {!showAllServices ? (<>
        <div className="service-header">
          <div className="pull-left mb-2">
            <span className='quickAction'>Quick Actions</span>
          </div>
        </div>
        <div className="mini_container login_widget mb-5 service-action-container">
           <div className="mt-2 ">
          <div className="row d-flex QR5Jd justify-content-center mt-1 mb-1 ">
            <div className="action-container gap-5">
              <div className="left-section">
                <div className="d-flex gap-5 button-container">
                  {serviceLabels.slice(0, visibleButtons).map((label, index) => (
                    <Link to={serviceLinks[index]} key={index}>
                      <button
                        className={`service-btn ${activeButton === index ? 'active' : ''}`}
                        onClick={() => handleButtonClick(index)}>
                        <i className={`fa ${getIconClass(label)} icon`} aria-hidden="true"></i>
                        <span className="btn-text">{label}</span>
                      </button>
                    </Link>
                  ))}
                  {visibleButtons < serviceLabels.length && (
                    <button
                      className={`service-btn ${activeButton === visibleButtons ? 'active' : ''}`}
                      onClick={() => setShowAllServices(true)}>
                      <i className="fa fa-ellipsis-h icon" aria-hidden="true"></i>
                      <span className="btn-text">More</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
       
     </>):(<>
        <Suspense>
          <AllServices
            serviceLabels={serviceLabels}
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
            setShowAllServices={setShowAllServices}/>
        </Suspense>
        </>
      )}
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

export default OurServices;