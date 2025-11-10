import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Internship.css';

const Internship = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllCards, setShowAllCards] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const domains = [
    {
      title: "Web Development",
      duration: "1-3 Months",
      mode: "Online/Offline",
      description: "Master modern web technologies including React, Node.js, and full-stack development with hands-on projects and real-world applications.",
      icon: "🌐",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "development",
      color: "internship-card--web",
      link: "/internship/web-development",
    },
    {
      title: "Mobile Development",
      duration: "1-3 Months",
      mode: "Online/Offline",
      description: "Build cross-platform mobile applications using React Native and Flutter with comprehensive app deployment guidance.",
      icon: "📱",
      technologies: ["React Native", "Flutter", "Firebase"],
      category: "development",
      color: "internship-card--app",
      link: '/internship/app-development',
    },
    {
      title: "AI & Machine Learning",
      duration: "1-3 Months",
      mode: "Online/Offline",
      description: "Explore machine learning algorithms and AI applications with Python, TensorFlow, and real-world AI projects.",
      icon: "🤖",
      technologies: ["Python", "TensorFlow", "PyTorch"],
      category: "ai-ml",
      color: "internship-card--ai",
      link: '/internship/aiml-development',
    },
    {
      title: "Data Science",
      duration: "1-3 Months",
      mode: "Online/Offline",
      description: "Master data analysis, visualization, and predictive modeling techniques with industry-standard tools and methodologies.",
      icon: "📊",
      technologies: ["Python", "Pandas", "SQL"],
      category: "data",
      color: "internship-card--data",
      link: '/internship/data-science',
    },
    {
      title: "Data Analytics",
      duration: "1-3 Months",
      mode: "Online/Offline",
      description: "Learn data processing, visualization tools, and business intelligence techniques for data-driven decision making.",
      icon: "🔍",
      technologies: ["Excel", "Power BI", "Tableau"],
      category: "data",
      color: "internship-card--cloud",
      link: '/internship/data-analytics',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Programs', count: domains.length },
    { id: 'development', label: 'Development', count: domains.filter(d => d.category === 'development').length },
    { id: 'ai-ml', label: 'AI & ML', count: domains.filter(d => d.category === 'ai-ml').length },
    { id: 'data', label: 'Data Science', count: domains.filter(d => d.category === 'data').length }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredDomains = activeCategory === 'all' 
    ? domains 
    : domains.filter(domain => domain.category === activeCategory);

  const displayedDomains = showAllCards ? filteredDomains : filteredDomains.slice(0, 3);

  const toggleShowAllCards = () => {
    setShowAllCards(!showAllCards);
  };

  // Mobile-specific card render
  const renderMobileCard = (domain, index) => (
    <Link to={domain.link} style={{textDecoration:"none"}} key={index}>
      <div className={`mobile-internship-card ${domain.color}`}>
        {/* Card Header with Icon and Title */}
        <div className="mobile-card-header">
          <div className="mobile-card-icon">{domain.icon}</div>
          <div className="mobile-card-title-section">
            <h3 className="mobile-card-title">{domain.title}</h3>
            <div className="mobile-card-meta">
              <span className="mobile-duration">{domain.duration}</span>
              <span className="mobile-mode">
                <span className="mobile-mode-dot"></span>
                {domain.mode}
              </span>
            </div>
          </div>
          <div className="mobile-arrow">→</div>
        </div>

        {/* Description */}
        <p className="mobile-card-description">{domain.description}</p>

        {/* Technologies */}
        <div className="mobile-tech-tags">
          {domain.technologies.map((tech, idx) => (
            <span key={idx} className="mobile-tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </Link>
  );

  // Desktop card render
  const renderDesktopCard = (domain, index) => (
    <Link to={domain.link} style={{textDecoration:"none"}} key={index}>
      <div className={`internship-card ${domain.color}`}>
        <div className="card-header">
          <div className="card-icon-wrapper">
            <span className="card-icon">{domain.icon}</span>
          </div>
          <div className="card-title-section">
            <h3 className="card-title">{domain.title}</h3>
            <div className="card-meta">
              <span className="duration-badge">{domain.duration}</span>
              <span className="mode-indicator">
                <span className="mode-dot"></span>
                {domain.mode}
              </span>
            </div>
          </div>
        </div>

        <p className="card-description">{domain.description}</p>

        <div className="technologies-section">
          <div className="tech-tags">
            {domain.technologies.map((tech, idx) => (
              <span key={idx} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>

        <div className="card-footer">
          <button className="enroll-button">
            Explore Program
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.333 8h9.334M8 3.333L12.667 8 8 12.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );

  return (
    <section id="internship" className="internship-section">
      <div className="internship-container">
        {/* Header Section */}
        <div className="internship-header">
          <div className="header-badge">Internship Programs</div>
          <h2 className="internship-title">Launch Your Tech Career</h2>
          <p className="internship-subtitle">
            Hands-on internship programs with real-world projects and industry mentorship to accelerate your career growth
          </p>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setShowAllCards(false);
              }}
            >
              <span className="filter-label">{category.label}</span>
              <span className="filter-count">{category.count}</span>
            </button>
          ))}
        </div>

        {/* Cards Grid - Using Flexbox instead of Grid */}
        {!isMobile ? (
          <div className="internship-flex-container">
            <div className="internship-flex-grid">
              {displayedDomains.map((domain, index) => renderDesktopCard(domain, index))}
            </div>
          </div>
        ) : (
          <div className="mobile-internship-list">
            {displayedDomains.map((domain, index) => renderMobileCard(domain, index))}
          </div>
        )}

        {/* Load More Button */}
        {filteredDomains.length > 3 && (
          <div className="load-more-container">
            <button 
              className="load-more-button"
              onClick={toggleShowAllCards}
            >
              {showAllCards ? 'Show Less Programs' : `Explore More +${filteredDomains.length - 3}`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Internship;