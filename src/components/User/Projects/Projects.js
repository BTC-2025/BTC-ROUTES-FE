import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Projects.css';

const Projects = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  const services = [
    {
      icon: "🎯",
      title: "Project Planning",
      description: "Strategic project roadmap and requirement analysis"
    },
    {
      icon: "💻",
      title: "Development",
      description: "Hands-on coding with modern technologies and best practices"
    },
    {
      icon: "📊",
      title: "Documentation",
      description: "Professional reports, presentations, and documentation"
    },
    {
      icon: "🚀",
      title: "Deployment",
      description: "Live deployment with proper hosting and domain setup"
    }
  ];

  // const features = [
  //   {
  //     number: "200+",
  //     title: "Projects Completed"
  //   },
  //   {
  //     number: "50+",
  //     title: "Colleges"
  //   },
  //   {
  //     number: "4.9/5",
  //     title: "Student Rating"
  //   },
  //   {
  //     number: "100%",
  //     title: "Satisfaction"
  //   }
  // ];

  const technologies = [
    { name: "React", color: "#61DAFB" },
    { name: "Node.js", color: "#339933" },
    { name: "Python", color: "#3776AB" },
    { name: "Flutter", color: "#02569B" },
    { name: "MongoDB", color: "#47A248" },
    { name: "AWS", color: "#FF9900" },
    { name: "TensorFlow", color: "#FF6F00" },
    { name: "Docker", color: "#2496ED" }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="tag" data-aos="fade-up">
            Projects
          </div>
          <h1 data-aos="fade-up" data-aos-delay="100">
            Professional Project 
            <span className="accent"> Development</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            We specialize in guiding students through their final year projects with 
            industry expertise, modern technologies, and comprehensive support.
          </p>
        </div>

        {/* Features */}
        {/* <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="feature-number">{feature.number}</div>
              <div className="feature-title">{feature.title}</div>
            </div>
          ))}
        </div> */}

        {/* Services */}
        <div className="services-section">
          <h2 data-aos="fade-up">Our Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={index}
                className="service-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="tech-section">
          <h2 data-aos="fade-up">Technologies</h2>
          <div className="tech-grid">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="tech-card"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div 
                  className="tech-dot" 
                  style={{ backgroundColor: tech.color }}
                ></div>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section" data-aos="fade-up">
          <div className="cta-content">
            <h2>Start Your Project Today</h2>
            <p>Get expert guidance and build an impressive final year project</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">
                Get Started
              </button>
              {/* <button className="cta-btn secondary">
                View Projects
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;