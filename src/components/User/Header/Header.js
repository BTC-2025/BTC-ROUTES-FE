import React, { useState, useEffect } from 'react';
import logo from '../../../assests/logo2.png';
import './Header.css';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll and escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.classList.add('no-scroll');
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleNavClick = (item) => {
    if (item === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Close mobile menu first, then scroll after a brief delay
      setIsOpen(false);
      setTimeout(() => {
        scrollToSection(item);
      }, 400);
      return;
    }
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeOffcanvas = () => {
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
            <Link to="/" onClick={closeOffcanvas}>
              <img src={logo} alt="Logo" width={120} />
            </Link>
          </span>
        </div>

        {/* Enhanced Toggler */}
        <button
          className={`header-toggler ${isOpen ? 'active' : ''}`}
          type="button"
          onClick={handleToggle}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <span className="header-toggler-icon"></span>
        </button>

        {/* Enhanced Navigation Links with Offcanvas */}
        <div className={`header-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="header-nav-list">
            {['Home', 'Courses', 'About', 'Internship', 'Projects', 'Placement', 'Apply', 'Contact'].map((item) => (
              <li key={item} className="header-nav-item">
                <button
                  className="header-nav-link"
                  onClick={() => handleNavClick(item)}
                  aria-label={`Navigate to ${item}`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Enhanced Overlay */}
        {isOpen && (
          <div 
            className="header-overlay show" 
            onClick={closeOffcanvas}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  );
};

export default Header;