
import React from 'react';
import TypingEffect from '../TypingEffect/TypingEffect';
import './Hero.css';
import { FiSend } from "react-icons/fi";
import { FaBookOpen} from "react-icons/fa";
import { RiTeamLine, RiStarSFill } from "react-icons/ri";
import { BsPuzzle, BsCheckCircle } from "react-icons/bs";
import { MdExplore} from "react-icons/md";
import { AiOutlineTrophy } from "react-icons/ai";
import { GiRocket } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = useNavigate()

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
            <RiStarSFill className="badge-icon" />
            Transforming Student Careers Since 2025
          </div>
          
          <h1 className="hero-title">
            Launch your <span className="hero-title-gradient">tech career</span>
            <br />
            <TypingEffect texts={["Expert training.", "Real projects.","Industry mentorship.","Guided placement."]} />
          </h1>
          
          <p className="hero-subtitle">
            "The fastest way to master technology is to <span className="hero-highlight">build it yourself.</span> Join thousands of students who transformed their careers with hands-on experience."
          </p>

          {/* Key Features */}
          <div className="hero-features">
            <div className="hero-feature">
              <BsCheckCircle className="feature-icon" />
              <span>Industry-Ready Skills</span>
            </div>
            <div className="hero-feature">
              <BsCheckCircle className="feature-icon" />
              <span>Real Project Experience</span>
            </div>
            <div className="hero-feature">
              <BsCheckCircle className="feature-icon" />
              <span>1:1 Mentorship</span>
            </div>
            <div className="hero-feature">
              <BsCheckCircle className="feature-icon" />
              <span>Placement Assistance</span>
            </div>
          </div>
          
          <div className="hero-actions">
            <button 
              className="hero-btn hero-btn--primary"
              onClick={() => scrollToSection('apply')}
            >
              <span className="hero-btn-icon"><FiSend /></span>
              Start Free Trial
            </button>
            <button 
              className="hero-btn hero-btn--secondary"
              onClick={() => scrollToSection('courses')}
            >
              <span className="hero-btn-icon"><MdExplore /></span>
              View Programs
            </button>
          </div>

          {/* Stats Section */}
          {/* <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">2,000+</div>
              <div className="hero-stat-label">Students Trained</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">95%</div>
              <div className="hero-stat-label">Placement Rate</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Projects Completed</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">50+</div>
              <div className="hero-stat-label">Partner Companies</div>
            </div>
          </div> */}
        </div>

        {/* Right Side Visual - Keep your existing visual section */}
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
            {/* Main Center Element */}
            <div className="tech-element tech-element--main">
              <div className="tech-element__glow"></div>
              <div className="tech-element__content">
                <div className="tech-element__icon"><GiRocket /></div>
                <h3 className="tech-element__title">Your Complete Tech Journey</h3>
                <p className="tech-element__desc">
                  Learn, build, and get placed with real industry experience.
                </p>
                <div className="tech-element__features">
                  <span className="tech-feature">📚 Expert-Led Courses</span>
                  <span className="tech-feature">💼 Real Internships</span>
                  <span className="tech-feature">🧠 Project Experience</span>
                  <span className="tech-feature">🎯 100% Placement Focus</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="tech-element tech-element--floating tech-element--1" role='button' onClick={()=>{scrollToSection('courses')}} style={{cursor:"pointer"}}>
              <div className="tech-element__content">
                <div className="tech-element__icon"><FaBookOpen /></div>
                <h4>Courses</h4>
                <p>Master in-demand skills from industry experts</p>
              </div>
            </div>

            <div className="tech-element tech-element--floating tech-element--2" role='button' onClick={() =>{scrollToSection('internship')}} style={{cursor:"pointer"}}>
              <div className="tech-element__content">
                <div className="tech-element__icon"><RiTeamLine /></div>
                <h4>Internships</h4>
                <p>Gain hands-on experience with real projects</p>
              </div>
            </div>

            <div className="tech-element tech-element--floating tech-element--3" role='button' onClick={() =>{scrollToSection('projects')}} style={{cursor:"pointer"}}>
              <div className="tech-element__content">
                <div className="tech-element__icon"><BsPuzzle /></div>
                <h4>Projects</h4>
                <p>Build real-world solutions to strengthen your portfolio</p>
              </div>
            </div>

            <div className="tech-element tech-element--floating tech-element--4">
              <div className="tech-element__content">
                <div className="tech-element__icon"><AiOutlineTrophy /></div>
                <h4>Placement</h4>
                <p>Get guided to your dream job with expert mentorship</p>
              </div>
            </div>
          </div>

          <div className="cta-panel">
            <div className="cta-panel__content">
              <h3>Ready to Begin?</h3>
              <p>Start your journey from learning to placement</p>
              <button 
                className="cta-panel__btn"
                onClick={() => navigate('/application')}
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
        <span className="hero-scroll-text">Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;