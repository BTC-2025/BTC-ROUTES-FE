import React from 'react';
import './Footer.css';
import logo from '../../assests/logo2.png'
import { Link } from 'react-router-dom';
import { FaLinkedin,FaInstagramSquare,FaWhatsappSquare } from "react-icons/fa";
import { FaSquareXTwitter,FaSquareYoutube } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { name: "Home", section: "home" },
    { name: "About", section: "about" },
    { name: "Internships", section: "internship" },
    { name: "Projects", section: "projects" },
    { name: "Apply", navi: "/application" },
    { name: "Contact", navi: "/contact" }
  ];

  const social = [
    {name:"LinkedIn", icon:<FaLinkedin /> , link:"https://www.linkedin.com/company/btc-routes/?viewAsMember=true"},
    {name:"Whatsapp", icon:<FaWhatsappSquare />, link:"https://wa.me/919962454596"},
    {name:"Twitter", icon:<FaSquareXTwitter />, link:"#"},
    {name:"Instagram", icon:<FaInstagramSquare />, link:"#"},
    {name:"YouTube", icon:<FaSquareYoutube />, link:"#" }
  ]
 
  const navigate = useNavigate()

  const handleClick = (link) => {
    if (link.section) {
      scrollToSection(link.section);
    } else if (link.navi) {
      navigate(link.navi);
    }
  };

  const programs = [
    {name:"Full Stack Development", link:"/internship/full-stack-development"},
    {name:"App Development", link:"/internship/app-development"},
    {name:"AI & ML", link:"/internship/aiml-development"},
    {name:"Data Science", link:"/internship/data-science"},
    {name:"Data Analytics", link:"/internship/data-analytics"}
  ];

  const company = [
    {name:"About Us", link:"https://www.btcglobal.info/about"},
    {name:"Careers", link:"https://www.btcglobal.info/careers"},
    {name:"Contact", link:"https://www.btcglobal.info/contact"},
    {name:"Services", link:"https://www.btcglobal.info/#services"}

  ];

  return (
    <footer className="footer">
      <div className="footer-quote">
        <div className="footer-quote-container">
          <div className="footer-quote-icon">💻</div>
          <blockquote className="footer-quote-text">
            "Your journey in tech starts with one line of code."
          </blockquote>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-dot footer-logo-dot--1"></div>
                <div className="footer-logo-dot footer-logo-dot--2"></div>
                <div className="footer-logo-dot footer-logo-dot--3"></div>
              </div>
              <div className="footer-brand-info">
                <h3 className="footer-brand-name">
                  {/* <span className="footer-brand-accent">Tech</span>Innovate */}
                  <img src={logo} alt='logo' width={150} className='mb-3' />
                </h3>
                <p className="footer-brand-description">
                  Empowering students with industry-relevant skills and practical experience 
                  through comprehensive internship programs and project guidance.
                </p>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-link-group">
                <h4 className="footer-link-title">Quick Links</h4>
                <ul className="footer-link-list">
                  {quickLinks.map((link, index) => (
                    <li key={index} className="footer-link-item">
                      <button
                        className="footer-link"
                        onClick={() => handleClick(link)}
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-link-group">
                <h4 className="footer-link-title">Programs</h4>
                <ul className="footer-link-list">
                  {programs.map((program, index) => (
                    <Link to={program.link} key={index} className="text-decoration-none">
                      <li className="footer-link-item">
                        <span className="footer-link">{program.name}</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>

              <div className="footer-link-group">
                <h4 className="footer-link-title">Company</h4>
                <ul className="footer-link-list">
                  {company.map((item, index) => (
                    <Link to={item.link} key={index} className='text-decoration-none'>
                      <li key={index} className="footer-link-item">
                        <span className="footer-link">{item.name}</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>

              <div className="footer-link-group">
                <h4 className="footer-link-title">Connect With Us</h4>
                <div className="footer-social">
                  {/* {['LinkedIn', 'Twitter', 'Instagram', 'YouTube'].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="footer-social-link"
                    >
                      <span className="footer-social-icon">{social === 'LinkedIn' ? <FaLinkedin /> : 
                        social === 'Twitter' ? <FaSquareXTwitter /> : 
                        social === 'Instagram' ? <FaInstagramSquare /> : <FaSquareYoutube /> }</span>
                      <span className="footer-social-name">{social}</span>
                    </a>
                  ))} */}
                  {social.map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      className='footer-social-link'
                    >
                      <span className="footer-social-icon">{item.icon}</span>
                      <span className="footer-social-name">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="footer-legal">
              <p className="footer-copyright">
                © 2025 BTC Routes. All rights reserved.
              </p>
              {/* <p className="footer-cin">
                CIN: U72900KA2025PTC123456
              </p> */}
            </div>
            
            <div className="footer-made-with">
              <p className="footer-made-with-text">
                Made with <span className="footer-heart">❤️</span> for aspiring tech students
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;