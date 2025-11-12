
import React, { useState, useEffect } from 'react';
import logo from '../../../assests/logo2.png';
import './Header.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    domain: '',
    numofstudents: '',
    experienceLevel:'',
    message:''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Domain options for dropdown
  const domainOptions = [
    'Full Stack Development',
    'Frontend Development',
    'Backend Development',
    'Mobile App Development',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Cloud Computing',
    'DevOps',
    'Cyber Security',
    'UI/UX Design',
    'Digital Marketing',
    'Other'
  ];

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
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false);
        if (showHireModal) setShowHireModal(false);
        if (showSuccessModal) setShowSuccessModal(false);
      }
    };

    if (isOpen || showHireModal || showSuccessModal) {
      document.body.classList.add('no-scroll');
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, showHireModal, showSuccessModal]);

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
    } else if (item === 'hire with us') {
      setShowHireModal(true);
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData)

    try {
      // Send data to backend
      const res = await axios.post('https://testing12-3ebu.onrender.com/api/hire/wanthiring', formData);
      
      if(res.status === 200 || res.status === 201){
        // Close hire modal and show success modal
        setShowHireModal(false);
        setShowSuccessModal(true);
        
        // Reset form data
        setFormData({
          companyName: '',
          companyEmail: '',
          companyPhone: '',
          domain: '',
          numofstudents: '',
          experienceLevel:'',
          message:''
        });
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modals
  const closeHireModal = () => {
    setShowHireModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <nav className={`header-nav ${scrolled ? 'header-nav--scrolled' : ''}`}>
        <div className="header-container">
          {/* Brand */}
          <div className="header-brand">
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
              {['home','about', 'courses', 'internship', 'projects', 'hire with us', 'apply', 'contact'].map((item) => (
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

      {/* Hire with Us Modal */}
      {showHireModal && (
        <div className="modal-overlay" onClick={closeHireModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Hire Our Students</h2>
              <button 
                className="modal-close" 
                onClick={closeHireModal}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-description">
                Connect with our talented students and graduates. Fill out the form below and we'll help you find the perfect candidates for your organization.
              </p>

              <form onSubmit={handleSubmit} className="hire-form">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name *</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your company name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="domain">Domain Required *</label>
                  <select
                    id="domain"
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a domain</option>
                    {domainOptions.map((domain, index) => (
                      <option key={index} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="studentCount">Number of Students Needed *</label>
                  <input
                    type="number"
                    id="studentCount"
                    name="numofstudents"
                    value={formData.numofstudents}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="How many students are you looking for?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experienceLevel">Experience</label>
                  <input
                    type="text"
                    id="experienceLevel"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    required
                    placeholder="Experience level required"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter additional details or requirements"
                    rows="4"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={closeHireModal}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={closeSuccessModal}>
          <div className="modal-content successs-modal" onClick={(e) => e.stopPropagation()}>
            <div className="successs-modal-content">
              <div className="successs-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="32" fill="#10B981" fillOpacity="0.1"/>
                  <path 
                    d="M28 32L31 35L36 29" 
                    stroke="#10B981" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <circle cx="32" cy="32" r="30" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"/>
                </svg>
              </div>
              
              <h2 className="successs-title">Request Submitted Successfully!</h2>
              
              <p className="successs-message">
                Thank you for your interest in hiring our students. Our team will contact you within 24 hours to discuss your requirements and match you with the perfect candidates.
              </p>

              <div className="successs-details">
                <div className="successs-detail">
                  <span className="detail-label">What happens next?</span>
                  <ul className="detail-list">
                    <li>Our team will review your requirements</li>
                    <li>We'll shortlist matching candidates</li>
                    <li>Schedule interviews at your convenience</li>
                    <li>Provide ongoing support throughout the process</li>
                  </ul>
                </div>
              </div>

              <div className="successs-actions">
                <button
                  className="btn-primary successs-btn"
                  onClick={closeSuccessModal}
                >
                  Got It
                </button>
              </div>

              <p className="successs-note">
                Need immediate assistance? <a href="tel:+1234567890">Call us at 9444369625</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;