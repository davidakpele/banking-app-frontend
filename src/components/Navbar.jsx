import { useState, useContext, useEffect, Suspense, lazy, } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { FiChevronDown, FiChevronUp, FiMenu, FiX, FiBell } from 'react-icons/fi';
import { FaWallet, FaHome, FaUser, FaCreditCard, FaGift } from 'react-icons/fa';
import { RiExchangeDollarFill } from 'react-icons/ri';
import { MdAccountBalanceWallet } from 'react-icons/md';
import ReactSwitch from 'react-switch';
import './Navbar.css';
import './NotificationLoader.css';

const Loader = lazy(() => import('./Loader/Loader'));

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    
    const [isLoading, setIsLoading] = useState(true); 
    const [isNotificationLoading, setINotificationLoading] = useState(false); 
    
    useEffect(() => {
        document.title = 'Dashboard | Default | Home';
      
        setTimeout(() => {
          setIsLoading(false);
          setINotificationLoading(false);
        }, 3000);
          
      }, []);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1200);
            if (window.innerWidth >= 1200) {
                setIsMobileMenuOpen(false);
            }
        };

        handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
    }, );

    // Close notifications when mobile menu opens
    useEffect(() => {
        if (isMobileMenuOpen) {
            setShowNotifications(false);
        }
    }, [isMobileMenuOpen]);

    // Close mobile menu when notifications are shown
    useEffect(() => {
        if (showNotifications) {
            setIsMobileMenuOpen(false);
        }
    }, [showNotifications]);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
            setINotificationLoading(true);
            setTimeout(() => {
                setINotificationLoading(false);
            }, 2000); // Simulate loading time
        }
        setActiveDropdown(null); 
    };
    
    const handleMouseEnter = (menu) => {
        if (!isMobile) {
            setActiveDropdown(menu);
        }
    };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  


  const navItems = [
    { name: 'Dashboard'},
    { name: 'Wallets'},
    { name: 'Virtual Cards'},
    { name: 'Giftcard', dropdown: true },
    { name: 'Deposit' },
    { name: 'Withdraw' },
    { name: 'Account', dropdown: true },
  ];

    return (
      <>
      {isLoading ? (
                  <Suspense>
                    <Loader isLoading={isLoading} containerClass="#root" />
                  </Suspense>
                ) : (
                  <>
                  <nav className={`navbar ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="nav-container">
        <div className="nav-content">
          {/* Logo/Brand */}
          <div className="nav-brand">MyApp</div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <div className="nav-left">
                {navItems.slice(0, 4).map((item) => (
                  <div 
                    key={item.name} 
                    className="nav-item-container"
                    onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={`nav-item ${item.dropdown ? 'has-dropdown' : ''}`}>
                      <span className="nav-text">{item.name}</span>
                      {item.dropdown && (
                        <span className="dropdown-chevron">
                          {activeDropdown === item.name ? <FiChevronUp /> : <FiChevronDown />}
                        </span>
                      )}
                    </div>

                    {item.dropdown && activeDropdown === item.name && (
                      <div 
                        className={`dropdown-menu ${theme === 'dark' ? 'dropdown-dark' : 'dropdown-light'}`}
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="dropdown-content">
                          <a href="#" className="dropdown-item">
                            <span className="dropdown-icon">→</span>
                            <span>Option 1</span>
                          </a>
                          <a href="#" className="dropdown-item">
                            <span className="dropdown-icon">→</span>
                            <span>Option 2</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="nav-right">
                {navItems.slice(4, 6).map((item) => (
                  <div key={item.name} className="nav-item">
                    <span className="nav-text">{item.name}</span>
                  </div>
                ))}
                <div className="nav-item-container"onMouseEnter={() => handleMouseEnter('Account')}onMouseLeave={handleMouseLeave}>
                  <div className="nav-item has-dropdown">
                    <span className="nav-text">Account</span>
                    <span className="dropdown-chevron">
                      {activeDropdown === 'Account' ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                  </div>
                  
                  {activeDropdown === 'Account' && (
                    <div className={`dropdown-menu ${theme === 'dark' ? 'dropdown-dark' : 'dropdown-light'}`} onMouseEnter={() => handleMouseEnter('Account')}onMouseLeave={handleMouseLeave}>
                      <div className="dropdown-content">
                        <a href="#" className="dropdown-item">
                          <span className="dropdown-icon">👤</span>
                          <span>Profile</span>
                        </a>
                        <a href="#" className="dropdown-item">
                          <span className="dropdown-icon">⚙️</span>
                          <span>Settings</span>
                        </a>
                        <a href="#" className="dropdown-item">
                          <span className="dropdown-icon">🚪</span>
                          <span>Logout</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <div className="theme-switch-container">
                  <ReactSwitch
                    onChange={toggleTheme}
                    checked={theme === 'dark'}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    offColor="#bbb"
                    onColor="#2563eb"
                    height={20}
                    width={40}
                    handleDiameter={16}
                    className="theme-switch"
                  />
                </div>
                  <button 
                    className="notification-icon"
                    onClick={toggleNotifications}
                    aria-label="Notifications">
                    <FiBell size={24} />
                    <span className="notification-badge">3</span> 
                </button>
                <div className="user-indicator">T</div>
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
            {isMobile && (
            <div className="mobile-controls">
                <div className="mobile-theme-switch-container">
                <ReactSwitch
                    onChange={toggleTheme}
                    checked={theme === 'dark'}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    offColor="#bbb"
                    onColor="#2563eb"
                    height={20}
                    width={40}
                    handleDiameter={16}
                    className="mobile-theme-switch"
                />
                </div>
                <button 
                className="mobile-menu-button"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu">
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                
                <button 
                    className="notification-icon"
                    onClick={toggleNotifications}
                    aria-label="Notifications">
                    <FiBell size={24} />
                    <span className="notification-badge">3</span> 
                </button>
            </div>
            )}

            {/* Notification Drawer */}
            {showNotifications && (
                <>
                
                <div className={`notification-overlay ${showNotifications ? 'show' : ''}`} onClick={toggleNotifications}/>
                
                <div className={`notification-drawer ${theme === 'dark' ? 'notification-drawer-dark' : 'notification-drawer-light'} ${showNotifications ? 'show' : ''}`}>
                {/* Header */}
                { isNotificationLoading ?( 
                    <>
                    <div className="sms-loader-container">
                        <div className='loader-notification-sm'/>
                        </div>
                    </>
                ):(
                    <>
                    <div className="notification-header">
                        <div className="notification-header-content">
                            <div className="notification-header-left">
                                <FiBell size={20} className="notification-header-icon" />
                                <span className="notification-title">Notifications</span>
                            </div>
                            <button 
                            onClick={toggleNotifications}
                            className="close-notifications"
                            aria-label="Close notifications">
                            <FiX size={20} />
                            </button>
                        </div>
                    </div>
                    {/* Notification List */}
                    {/* Divider */}
                <div className="notification-divider"></div>
                
                {/* Body with Filter */}
                <div className="notification-body">
                    <div className="notification-filter">
                    <select className="filter-select">
                            <option value="all">All</option>
                            <option value="messages">Messages</option>
                            <option value="payments">Payments</option>
                            <option value="system">System</option>
                    </select>
                    </div>
                    
                    {/* Notification List */}
                    <div className="notification-list">
                    <div className="notification-item">
                        <div className="notification-icon">🔔</div>
                        <div className="notification-text">
                        <p>New message received</p>
                        <small>2 minutes ago</small>
                        </div>
                    </div>
                    <div className="notification-item">
                        <div className="notification-icon">💰</div>
                        <div className="notification-text">
                        <p>Payment processed</p>
                        <small>1 hour ago</small>
                        </div>
                    </div>
                    <div className="notification-item">
                        <div className="notification-icon">🔄</div>
                        <div className="notification-text">
                        <p>System update available</p>
                        <small>3 hours ago</small>
                        </div>
                    </div>
                    </div>
                </div>
                
                {/* Divider */}
                <div className="notification-divider"></div>
                
                {/* Footer */}
                <div className="notification-footer">
                    <button 
                    className="clear-all-btn"
                    onClick={() => console.log('Clearing all notifications')}>
                    Clear All Notifications
                    </button>
                </div>
                    </>                   
                )}
               
             
                
                </div>
            </>
            )}
        </div>
    </div>

    {/* Mobile Menu - Wizard Effect */}
    {isMobile && (
        <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''} ${
            theme === 'dark' ? 'mobile-menu-dark' : 'mobile-menu-light'
        }`}>
            <div className="mobile-menu-content">
            {navItems.map((item) => (
                <div 
                key={item.name} 
                className={`mobile-nav-item-container ${activeDropdown === item.name ? 'active' : ''}`}
                >
                <div
                    className={`mobile-nav-item ${item.dropdown ? 'has-dropdown' : ''}`}
                    onClick={() => item.dropdown && setActiveDropdown(activeDropdown === item.name ? null : item.name)}>
                    {item.icon}
                    <span className="mobile-nav-text">{item.name}</span>
                    {item.dropdown && (
                    <span className="mobile-dropdown-chevron">
                        {activeDropdown === item.name ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    )}
                </div>

                {item.dropdown && (
                    <div className={`mobile-dropdown-menu ${theme === 'dark' ? 'mobile-dropdown-dark' : 'mobile-dropdown-light'}`}>
                    <div className="mobile-dropdown-content">
                        <a href="#" className="mobile-dropdown-item">
                        <span className="dropdown-icon">→</span>
                        <span>Option 1</span>
                        </a>
                        <a href="#" className="mobile-dropdown-item">
                        <span className="dropdown-icon">→</span>
                        <span>Option 2</span>
                        </a>
                    </div>
                    </div>
                )}
                </div>
            ))}

                <div className="mobile-user-info">
                <div className="mobile-user-indicator">D</div>
                <span className="mobile-user-name">User Account</span>
                </div>
            </div>
            </div>
        )}
        </nav>
                  </>
          )}
      </>
        
    );
    };

export default Navbar;