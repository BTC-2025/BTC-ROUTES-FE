import React from 'react';
import './Benefits.css';

const Benefits = () => {
  const benefits = [
    {
      title: "Expert Mentorship",
      description: "Learn from industry professionals with 5+ years of experience in top tech companies",
      icon: "👨‍🏫",
      features: ["1:1 Sessions", "Code Reviews", "Career Guidance"]
    },
    {
      title: "Industry Certification",
      description: "Get certified upon completion with industry recognition and verified credentials",
      icon: "🏆",
      features: ["Verified Certificates", "LinkedIn Badges", "Portfolio Ready"]
    },
    {
      title: "Real-world Exposure",
      description: "Work on live projects and gain practical experience that employers value",
      icon: "💼",
      features: ["Live Projects", "Client Interaction", "Agile Methodology"]
    },
    {
      title: "Portfolio Projects",
      description: "Build impressive projects for your portfolio that showcase your skills",
      icon: "📁",
      features: ["GitHub Repository", "Live Demos", "Documentation"]
    }
  ];

  return (
    <section id="benefits" className="benefits-section">
      <div className="benefits-background">
        <div className="benefits-gradient"></div>
        <div className="benefits-shapes">
          <div className="benefits-shape benefits-shape--1"></div>
          <div className="benefits-shape benefits-shape--2"></div>
          <div className="benefits-shape benefits-shape--3"></div>
        </div>
      </div>
      
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="benefits-title">Why Choose Our Programs?</h2>
          <p className="benefits-subtitle">
            We provide comprehensive benefits to kickstart your tech career and ensure your success
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="benefits-card"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="benefits-card-icon">{benefit.icon}</div>
              <h3 className="benefits-card-title">{benefit.title}</h3>
              <p className="benefits-card-description">{benefit.description}</p>
              
              <div className="benefits-features">
                {benefit.features.map((feature, featureIndex) => (
                  <span key={featureIndex} className="benefits-feature">
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="benefits-card-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;