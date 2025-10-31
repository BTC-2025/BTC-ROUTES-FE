import React from 'react';
import './Projects.css';

const Projects = () => {
  const projectFeatures = [
    {
      title: "One-on-one mentorship",
      description: "Personal guidance from industry experts",
      icon: "👨‍💼"
    },
    {
      title: "Real-world implementation",
      description: "Work on actual industry problems",
      icon: "🌍"
    },
    {
      title: "Documentation support",
      description: "Complete project documentation help",
      icon: "📄"
    },
    {
      title: "Deployment guidance",
      description: "Learn to deploy projects live",
      icon: "🚀"
    }
  ];

  const projectDomains = [
    "AI/ML Applications",
    "Web Applications", 
    "Mobile Apps",
    "Data Analytics",
    "Data Science",
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-content">
          <div className="projects-text" data-aos="fade-right">
            <h2 className="projects-title">Final Year Projects</h2>
            <p className="projects-description">
              Get expert guidance for your final year projects with industry-standard practices and technologies. 
              Build something remarkable that stands out in your portfolio.
            </p>
            
            <div className="projects-features">
              {projectFeatures.map((feature, index) => (
                <div key={index} className="projects-feature">
                  <div className="projects-feature-icon">{feature.icon}</div>
                  <div className="projects-feature-content">
                    <h4 className="projects-feature-title">{feature.title}</h4>
                    <p className="projects-feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="projects-quote">
              <div className="projects-quote-icon">💡</div>
              <blockquote className="projects-quote-text">
                "Your final-year project is the first chapter of your tech career."
              </blockquote>
            </div>
          </div>

          <div className="projects-visual" data-aos="fade-left">
            <div className="projects-card">
              <h3 className="projects-card-title">Project Domains Available</h3>
              <div className="projects-domains">
                {projectDomains.map((domain, index) => (
                  <div key={index} className="projects-domain">
                    <span className="projects-domain-icon">▶</span>
                    <span className="projects-domain-text">{domain}</span>
                  </div>
                ))}
              </div>
              
              {/* <div className="projects-stats">
                <div className="projects-stat">
                  <div className="projects-stat-number">200+</div>
                  <div className="projects-stat-label">Projects Completed</div>
                </div>
                <div className="projects-stat">
                  <div className="projects-stat-number">50+</div>
                  <div className="projects-stat-label">Colleges</div>
                </div>
                <div className="projects-stat">
                  <div className="projects-stat-number">4.8/5</div>
                  <div className="projects-stat-label">Student Rating</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;