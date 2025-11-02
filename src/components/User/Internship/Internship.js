import React from 'react';
import './Internship.css';
import {Link} from 'react-router-dom'

const Internship = () => {
  const domains = [
    {
      title: "Web Development",
      duration: "1 & 3 Months",
      mode: "Online/Offline",
      description: "Learn modern web technologies including React, Node.js, and full-stack development with real projects.",
      icon: "🌐",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      color: "internship-card--web",
      link:"/internship/web-development"
    },
    {
      title: "Mobile App Development",
      duration: "1 & 3 Months",
      mode: "Online/Offline",
      description: "Build cross-platform mobile applications using React Native and Flutter with native features.",
      icon: "📱",
      technologies: ["React Native", "Flutter", "Firebase", "REST APIs"],
      color: "internship-card--app",
      link:'/internship/app-development'
    },
    {
      title: "AI & ML",
      duration: "1 & 3 Months",
      mode: "Online/Offline",
      description: "Explore machine learning algorithms, neural networks, and AI applications with Python.",
      icon: "🤖",
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV"],
      color: "internship-card--ai",
      link:'/internship/aiml-development'
    },
    {
      title: "Data Science",
      duration: "1 & 3 Months",
      mode: "Online/Offline",
      description: "Master data analysis, visualization, and predictive modeling techniques with real datasets.",
      icon: "📊",
      technologies: ["Python", "Pandas", "SQL", "Tableau"],
      color: "internship-card--data",
      link:'/internship/data-science'
    },
    {
      title: "Data Analytics",
      duration: "1 & 3 Months",
      mode: "Online/Offline",
      description: "Learn data processing, business intelligence, and analytics tools for data-driven decisions.",
      icon: "🔍",
      technologies: ["Excel", "Power BI", "SQL", "Statistics"],
      color: "internship-card--analytics",
      link:'/internship/data-analytics'
    },
    // {
    //   title: "Cloud Computing",
    //   duration: "8 Weeks",
    //   mode: "Online",
    //   description: "Get hands-on with AWS, Azure, and cloud infrastructure management with real scenarios.",
    //   icon: "☁️",
    //   technologies: ["AWS", "Azure", "Docker", "Kubernetes"],
    //   color: "internship-card--cloud"
    // }
  ];

  return (
    <section id="internship" className="internship-section">
      <div className="internship-container">
        <div className="internship-header">
          <h2 className="internship-title">Internship Programs</h2>
          <p className="internship-subtitle">
            Choose from our comprehensive internship domains designed for modern tech careers. 
            Gain hands-on experience with industry-relevant technologies.
          </p>
        </div>

        <div className="internship-grid">
          {domains.map((domain, index) => (
            <Link to={domain.link} style={{textDecoration:"none"}} key={index}>
              <div 
                key={index} 
                className={`internship-card ${domain.color}`}
                data-aos="flip-left"
                data-aos-delay={index * 100}
              >
                <div className="internship-card-header">
                  <div className="internship-card-icon">{domain.icon}</div>
                  <div className="internship-card-badges">
                    <span className="internship-badge internship-badge--duration">{domain.duration}</span>
                    <span className="internship-badge internship-badge--mode">{domain.mode}</span>
                  </div>
                </div>
                
                <h3 className="internship-card-title">{domain.title}</h3>
                <p className="internship-card-description">{domain.description}</p>
                
                <div className="internship-technologies">
                  <h4 className="internship-technologies-title">Technologies:</h4>
                  <div className="internship-tech-tags">
                    {domain.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="internship-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <button className="internship-card-btn">
                  <span className="internship-card-btn-text">Learn More</span>
                  <span className="internship-card-btn-icon">→</span>
                </button>
                
                <div className="internship-card-hover"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Internship;