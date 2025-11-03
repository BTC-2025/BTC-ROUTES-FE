import React, { useState, useEffect } from 'react';
import logo from '../../../assests/logo2.png';
import './Header.css';
import { useNavigate,Link } from 'react-router-dom'; // ✅ import for navigation

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // ✅ initialize navigation

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (item) => {
    if (item === 'home') {
      navigate('/'); // ✅ redirect to /
    } else {
      scrollToSection(item);
    }
    setIsOpen(false);
  };

  return (
    <nav className={`header-nav ${scrolled ? 'header-nav--scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand */}
        <div className="header-brand">
          <div className="header-logo">
            <div className="header-logo-dot header-logo-dot--1"></div>
            <div className="header-logo-dot header-logo-dot--2"></div>
            <div className="header-logo-dot header-logo-dot--3"></div>
          </div>
          <span className="header-brand-text">
            <Link to="/" >
              <img src={logo} alt="Logo" width={120} />
            </Link>
          </span>
        </div>

        {/* Toggler (only for small screens) */}
        <button
          className={`header-toggler ${isOpen ? 'active' : ''}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="header-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`header-collapse ${isOpen ? 'show' : ''}`} id="headerNav">
          <ul className="header-nav-list">
            {['home', 'about', 'internship', 'projects', 'benefits', 'apply', 'contact'].map((item) => (
              <li key={item} className="header-nav-item">
                <button
                  className="header-nav-link"
                  onClick={() => handleNavClick(item)} // ✅ unified click handler
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
