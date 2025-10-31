import React, { useState, useEffect } from 'react';
import './Batches.css';

const Batches = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-11-01T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const batches = [
    {
      name: "November 2025 Batch",
      status: "Applications Open",
      domains: "All Domains Available",
      lastDate: "October 25, 2025",
      seats: "15/30 Seats Filled",
      priority: "batches-batch--priority"
    },
    {
      name: "December 2025 Batch",
      status: "Coming Soon",
      domains: "Web & App Development",
      lastDate: "November 25, 2025",
      seats: "Pre-registrations Open",
      priority: ""
    },
    {
      name: "January 2026 Batch",
      status: "Planning Phase",
      domains: "AI/ML & Data Science",
      lastDate: "December 25, 2025",
      seats: "Notify Me",
      priority: ""
    }
  ];

  return (
    <section id="batches" className="batches-section">
      <div className="batches-container">
        <div className="batches-header">
          <h2 className="batches-title">Upcoming Batches</h2>
          <p className="batches-subtitle">
            Don't miss out on our upcoming internship batches. Limited seats available!
          </p>
        </div>

        <div className="batches-countdown">
          <div className="batches-countdown-card" data-aos="zoom-in">
            <h3 className="batches-countdown-title">Next Batch Starts In</h3>
            <div className="batches-timer">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="batches-time-unit">
                  <div className="batches-time-value">{value.toString().padStart(2, '0')}</div>
                  <div className="batches-time-label">{unit.toUpperCase()}</div>
                </div>
              ))}
            </div>
            <p className="batches-countdown-text">November 2025 Batch - Applications Open</p>
            <div className="batches-progress">
              <div className="batches-progress-bar">
                <div 
                  className="batches-progress-fill"
                  style={{ width: '50%' }}
                ></div>
              </div>
              <div className="batches-progress-text">50% Seats Filled</div>
            </div>
          </div>
        </div>

        <div className="batches-grid">
          {batches.map((batch, index) => (
            <div 
              key={index} 
              className={`batches-batch ${batch.priority}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="batches-batch-header">
                <div className={`batches-status batches-status--${batch.status.toLowerCase().replace(' ', '-')}`}>
                  {batch.status}
                </div>
                <div className="batches-batch-name">{batch.name}</div>
              </div>
              
              <div className="batches-batch-details">
                <div className="batches-detail">
                  <span className="batches-detail-icon">🎯</span>
                  <span className="batches-detail-text">{batch.domains}</span>
                </div>
                <div className="batches-detail">
                  <span className="batches-detail-icon">📅</span>
                  <span className="batches-detail-text">Last Date: {batch.lastDate}</span>
                </div>
                <div className="batches-detail">
                  <span className="batches-detail-icon">👥</span>
                  <span className="batches-detail-text">{batch.seats}</span>
                </div>
              </div>

              {batch.status === 'Applications Open' && (
                <button className="batches-apply-btn">
                  <span className="batches-apply-icon">🚀</span>
                  Apply Now
                </button>
              )}
              
              {batch.status === 'Coming Soon' && (
                <button className="batches-notify-btn">
                  <span className="batches-notify-icon">🔔</span>
                  Notify Me
                </button>
              )}
              
              {batch.status === 'Planning Phase' && (
                <button className="batches-info-btn">
                  <span className="batches-info-icon">ℹ️</span>
                  More Info
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Batches;