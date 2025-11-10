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
            Transforming Student Careers Since 2025
          </div>
          
          <h1 className="hero-title">
            <TypingEffect texts={["Software Training.", "Mentorship.","Project & Delivery.","IT Staffing."]} />
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
        </div>
        
        <div className="hero-visual">
          <div className="tech-orb">
            <div className="orb-core"></div>
            <div className="orb-ring orb-ring--1"></div>
            <div className="orb-ring orb-ring--2"></div>
            <div className="orb-ring orb-ring--3"></div>
            <div className="orb-particle orb-particle--1"></div>
            <div className="orb-particle orb-particle--2"></div>
            <div className="orb-particle orb-particle--3"></div>
          </div>

          <div className="floating-elements">
            <div className="tech-element tech-element--main">
              <div className="tech-element__glow"></div>
              <div className="tech-element__content">
                <div className="tech-element__icon">🚀</div>
                <h3 className="tech-element__title">Launch Your Career</h3>
                <p className="tech-element__desc">Begin your journey into cutting-edge technology</p>
                <div className="tech-element__features">
                  <span className="tech-feature">💡 Project-Based</span>
                  <span className="tech-feature">👨‍💻 Real Experience</span>
                  <span className="tech-feature">🎯 Career Focused</span>
                </div>
              </div>
            </div>

            <div className="tech-element tech-element--floating tech-element--1">
              <div className="tech-element__content">
                <div className="tech-element__icon">🤖</div>
                <h4>AI & ML</h4>
                <p>Build intelligent systems</p>
              </div>
            </div>

            <div className="tech-element tech-element--floating tech-element--2">
              <div className="tech-element__content">
                <div className="tech-element__icon">🌐</div>
                <h4>Web Development</h4>
                <p>Create modern web apps</p>
              </div>
            </div>

            <div className="tech-element tech-element--floating tech-element--3">
              <div className="tech-element__content">
                <div className="tech-element__icon">📱</div>
                <h4>Mobile Apps</h4>
                <p>Develop for iOS & Android</p>
              </div>
            </div>
            <div className="tech-element tech-element--floating tech-element--4">
              <div className="tech-element__content">
                <div className="tech-element__icon">📱</div>
                <h4>Data Science</h4>
                <p>Develop for iOS & Android</p>
              </div>
            </div>      
            <div className="tech-element tech-element--floating tech-element--5">
              <div className="tech-element__content">
                <div className="tech-element__icon">📱</div>
                <h4>Data Analytics</h4>
                <p>Develop for iOS & Android</p>
              </div>
            </div>           
          </div>


          <div className="cta-panel">
            <div className="cta-panel__content">
              <h3>Ready to Begin?</h3>
              <p>Start your tech journey today</p>
              <button 
                className="cta-panel__btn"
                onClick={() => scrollToSection('apply')}
              >
                Join Now ›
              </button>
            </div>
            <div className="cta-panel__glow"></div>
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