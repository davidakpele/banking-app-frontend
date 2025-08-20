import { useState, useContext, useEffect, Suspense, lazy, } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { FiChevronDown, FiChevronUp, FiMenu, FiX, FiBell } from 'react-icons/fi';
import ReactSwitch from 'react-switch';
import './Navbar.css';
import './NotificationLoader.css';
import { Link } from 'react-router-dom';

const Loader = lazy(() => import('./Loader/Loader'));
const DepositConfirmation = lazy(() => import('./modal/DepositConfirmation'));

const Navbar = () => {
    const { theme, toggleTheme, themeLoaded } = useContext(ThemeContext);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false); // Add this state
    
    const [isLoading, setIsLoading] = useState(true); 
    const [isNotificationLoading, setINotificationLoading] = useState(false); 
    
    useEffect(() => {
        document.title = 'Dashboard | Default | Home';
      
        setTimeout(() => {
          if (themeLoaded) {
            setIsLoading(false); 
          }
          setINotificationLoading(false);
        }, 3000);
          
      }, [themeLoaded]);
      
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
            }, 2000);
        }
        setActiveDropdown(null); 
    };
    
    // Function to open deposit modal
    const handleDepositClick = () => {
        setShowDepositModal(true);
        setActiveDropdown(null); // Close any open dropdowns
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false); // Close mobile menu if open
        }
    };
    
    // Function to close deposit modal
    const handleCloseDepositModal = () => {
        setShowDepositModal(false);
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
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Wallets', path: '/wallets' },
        { name: 'Virtual Cards', path: '/virtual-cards' },
        { name: 'Giftcard', dropdown: true, path: '#', children: [
            { name: 'Option 1', path: '/giftcard/option1' },
            { name: 'Option 2', path: '/giftcard/option2' }
        ]},
        // Update Deposit item to trigger modal instead of navigation
        { name: 'Deposit', path: '#', onClick: handleDepositClick },
        { name: 'Withdraw', path: '/account/withdraw' },
        { name: 'Account', dropdown: true, path: '#', children: [
            { name: 'Profile', path: '/account/profile' },
            { name: 'Logout', path: '/auth/logout' }
        ]},
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
                                <div className="nav-brand">
                                    <Link to={'/dashboard'} style={{color: theme === 'dark'?'#fff':'#333'}}>MyApp</Link>
                                </div>

                                {/* Desktop Navigation */}
                                {!isMobile && (
                                    <>
                                        <div className="nav-left">
                                            {navItems.slice(0, 4).map((item) => (
                                                <div 
                                                    key={item.name} 
                                                    className="nav-item-container"
                                                    onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                                                    onMouseLeave={handleMouseLeave}>
                                                    <div className={`nav-item ${item.dropdown ? 'has-dropdown' : ''}`}>
                                                        {item.onClick ? (
                                                            <button 
                                                                onClick={item.onClick}
                                                                className={`nav-text ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}
                                                                style={{background: 'none', border: 'none', cursor: 'pointer'}}
                                                            >
                                                                {item.name}
                                                            </button>
                                                        ) : (
                                                            <Link to={item.path} className={`nav-text ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>{item.name}</Link>
                                                        )}
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
                                                            onMouseLeave={handleMouseLeave}>
                                                            <div className="dropdown-content">
                                                                {item.children.map(child => (
                                                                    <Link key={child.name} to={child.path} className={`dropdown-item ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
                                                                        <span className="dropdown-icon">→</span>
                                                                        <span>{child.name}</span>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="nav-right">
                                            {navItems.slice(4, 6).map((item) => (
                                                <div key={item.name} className="nav-item">
                                                    {item.onClick ? (
                                                        <button 
                                                            onClick={item.onClick}
                                                            className={`nav-text ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}
                                                            style={{background: 'none', border: 'none', cursor: 'pointer'}}
                                                        >
                                                            {item.name}
                                                        </button>
                                                    ) : (
                                                        <Link to={item.path} className={`nav-text ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>{item.name}</Link>
                                                    )}
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
                                                    <div 
                                                        className={`dropdown-menu ${theme === 'dark' ? 'dropdown-dark' : 'dropdown-light'}`}
                                                        onMouseEnter={() => handleMouseEnter('Account')}
                                                        onMouseLeave={handleMouseLeave}>
                                                        <div className="dropdown-content">
                                                            {navItems.find(i => i.name === 'Account').children.map(child => (
                                                                <Link key={child.name} to={child.path}  className={`dropdown-item ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
                                                                    <span className="dropdown-icon">{child.icon}</span>
                                                                    <span>{child.name}</span>
                                                                </Link>
                                                            ))}
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

                        {/* Mobile Menu */}
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
                                            {/* Main mobile nav item */}
                                            {!item.dropdown ? (
                                                item.onClick ? (
                                                    <button 
                                                        onClick={item.onClick}
                                                        className={`mobile-nav-item ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}
                                                        style={{background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left'}}
                                                    >
                                                        {item.icon}
                                                        <span className="mobile-nav-text">{item.name}</span>
                                                    </button>
                                                ) : (
                                                    <Link to={item.path} className={`mobile-nav-item ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
                                                        {item.icon}
                                                        <span className="mobile-nav-text">{item.name}</span>
                                                    </Link>
                                                )
                                            ) : (
                                                <div
                                                    className={`mobile-nav-item has-dropdown`}
                                                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                                                >
                                                    {item.icon}
                                                    <span className="mobile-nav-text">{item.name}</span>
                                                    <span className="mobile-dropdown-chevron">
                                                        {activeDropdown === item.name ? <FiChevronUp /> : <FiChevronDown />}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Dropdown children */}
                                            {item.dropdown && activeDropdown === item.name && item.children && (
                                                <div className={`mobile-dropdown-menu ${theme === 'dark' ? 'mobile-dropdown-dark' : 'mobile-dropdown-light'}`}>
                                                    <div className="mobile-dropdown-content">
                                                        {item.children.map(child => (
                                                            <Link key={child.name} to={child.path} className="mobile-dropdown-item">
                                                                <span className="dropdown-icon">{child.icon || '→'}</span>
                                                                <span>{child.name}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Mobile user info */}
                                    <div className="mobile-user-info">
                                        <div className="mobile-user-indicator">D</div>
                                        <span className="mobile-user-name">User Account</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </nav>
                    
                    {/* Deposit Confirmation Modal */}
                    {showDepositModal && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <DepositConfirmation 
                                isOpen={showDepositModal}
                                onClose={handleCloseDepositModal}
                                // You can pass additional props like deposit amount, currency, etc.
                            />
                        </Suspense>
                    )}
                </>
            )}
        </>
    );
};

export default Navbar;