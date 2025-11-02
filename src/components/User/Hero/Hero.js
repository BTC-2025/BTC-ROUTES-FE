import React from 'react';
import TypingEffect from '../TypingEffect/TypingEffect';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-shapes">
          <div className="hero-shape hero-shape--1"></div>
          <div className="hero-shape hero-shape--2"></div>
          <div className="hero-shape hero-shape--3"></div>
        </div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            🚀 Transforming Student Careers Since 2025
          </div>
          
          <h1 className="hero-title">
            <TypingEffect texts={["Empowering Students.", "Inspiring Innovation."]} />
          </h1>
          
          <p className="hero-subtitle">
            "The best way to learn technology is to <span className="hero-highlight">build it.</span>"
          </p>
          
          <div className="hero-actions">
            <button 
              className="hero-btn hero-btn--primary"
              onClick={() => scrollToSection('apply')}
            >
              <span className="hero-btn-icon">🚀</span>
              Apply for Internship
            </button>
            <button 
              className="hero-btn hero-btn--secondary"
              onClick={() => scrollToSection('internship')}
            >
              <span className="hero-btn-icon">🔍</span>
              Explore Domains
            </button>
          </div>
{/*           
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Students Trained</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">50+</div>
              <div className="hero-stat-label">Projects Completed</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">95%</div>
              <div className="hero-stat-label">Success Rate</div>
            </div>
          </div> */}
        </div>
        
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-content">
              <h3 className="hero-card-title">Start Your Tech Journey</h3>
              <p className="hero-card-text">Join 500+ students transforming their careers through hands-on learning</p>
              <div className="hero-card-features">
                <div className="hero-card-feature">
                  <span className="hero-card-feature-icon">✅</span>
                  Industry Mentors
                </div>
                <div className="hero-card-feature">
                  <span className="hero-card-feature-icon">✅</span>
                  Real Projects
                </div>
                <div className="hero-card-feature">
                  <span className="hero-card-feature-icon">✅</span>
                  Job Ready Skills
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;