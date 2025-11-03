import React from 'react';
import './About.css';

const About = () => {
  const cards = [
    {
      title: "Our Vision",
      description: "To create a bridge between academic learning and industry requirements, empowering students with real-world skills.",
      icon: "🎯",
      color: "about-card--vision"
    },
    {
      title: "Our Mission",
      description: "Provide comprehensive training and mentorship to help students build innovative projects and kickstart their careers.",
      icon: "🚀",
      color: "about-card--mission"
    },
    {
      title: "Our Goal",
      description: "Transform students into industry-ready professionals through hands-on training and project experience.",
      icon: "⭐",
      color: "about-card--goal"
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">About Us</h2>
          <p className="about-subtitle">
            We are a dynamic IT services company committed to nurturing the next generation of tech talent. 
            Through our structured learning paths and hands-on training, we help students upgrade their skills, 
            gain confidence, and advance toward successful tech careers. Our goal is to move learners from 
            fundamentals to professional excellence.
          </p>
        </div>

        <div className="about-cards">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className={`about-card ${card.color}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="about-card-icon">{card.icon}</div>
              <h3 className="about-card-title">{card.title}</h3>
              <p className="about-card-description">{card.description}</p>
              <div className="about-card-decoration"></div>
            </div>
          ))}
        </div>

        <div className="about-quote" data-aos="zoom-in">
          <div className="about-quote-content">
            <div className="about-quote-icon">❝</div>
            <blockquote className="about-quote-text">
              We turn classroom learners into industry-ready creators.
            </blockquote>
            <div className="about-quote-author">— BTC Routes Team</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;