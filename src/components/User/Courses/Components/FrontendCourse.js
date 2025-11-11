import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled, { keyframes } from 'styled-components';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGitAlt, 
  FaCode, FaChrome, FaLaptopCode, FaUserGraduate, FaBriefcase, 
  FaUser,FaUserTie, FaCheckCircle, FaBars, FaTimes, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaTwitter, FaFacebook, FaLinkedin,
  FaInstagram, FaArrowRight, FaRocket, FaGraduationCap,
  FaPlay,
  FaCertificate,FaChartLine
} from 'react-icons/fa';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(250, 177, 47, 0.5); }
  50% { box-shadow: 0 0 20px rgba(250, 177, 47, 0.8); }
`;

// const slideIn = keyframes`
//   from { transform: translateX(-100%); opacity: 0; }
//   to { transform: translateX(0); opacity: 1; }
// `;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const CourseContainer = styled.div`
  font-family: 'Inter', 'Poppins', sans-serif;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.progress}%;
  height: 4px;
  background: linear-gradient(90deg, #FAB12F, #001BB7);
  z-index: 1001;
  transition: width 0.3s ease;
`;

const Navbar = styled.nav`
  background: ${props => props.scrolled ? 
    'rgba(13, 74, 124, 0.95)' : 
    'linear-gradient(135deg, #0D4A7C 0%, #001BB7 100%)'};
  padding: 1rem 0;
  position: fixed;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: ${props => props.scrolled ? '0 2px 30px rgba(0, 27, 183, 0.2)' : 'none'};
`;

const NavBrand = styled.a`
  color: #F7F1DE !important;
  font-size: 1.8rem;
  font-weight: 800;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &::before {
    content: '🚀';
    margin-right: 10px;
    font-size: 1.5rem;
  }
  
  &:hover {
    color: #FAB12F !important;
    transform: scale(1.05);
  }
`;

const NavLink = styled.a`
  color: #F7F1DE !important;
  font-weight: 600;
  margin: 0 1rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 8px 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #FAB12F;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #FAB12F !important;
    
    &::after {
      width: 100%;
    }
  }
`;

const NavButton = styled.button`
  background: linear-gradient(45deg, #FAB12F, #FEF3E2);
  color: #0D4A7C !important;
  border: none;
  border-radius: 25px;
  padding: 12px 28px;
  font-weight: 700;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(250, 177, 47, 0.4);
    
    &::before {
      left: 100%;
    }
  }
`;

const Section = styled.section`
  padding: 100px 0;
  background: ${props => {
    switch(props.bgVariant) {
      case 'hero': return 'linear-gradient(135deg, #F5F6F9 0%, #F7F1DE 50%, #FFFFFF 100%)';
      case 'light': return 'linear-gradient(135deg, #FFFFFF 0%, #F5F6F9 100%)';
      case 'cream': return 'linear-gradient(135deg, #FEF3E2 0%, #F7F1DE 100%)';
      case 'gradient-blue': return 'linear-gradient(135deg, #E8F4FF 0%, #F0F7FF 100%)';
      case 'gradient-gold': return 'linear-gradient(135deg, #FFF9E6 0%, #FEF3E2 100%)';
      case 'gradient-purple': return 'linear-gradient(135deg, #F8F7FF 0%, #F0EEFF 100%)';
      case 'pattern': return 'linear-gradient(135deg, #FFFFFF 0%, #F5F6F9 50%, #E8F4FF 100%)';
      case 'dark': return 'linear-gradient(135deg, #001BB7 0%, #3C467B 100%)';
      default: return '#F5F6F9';
    }
  }};
  color: #908083;
  position: relative;
  ${props => props.hasPattern && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(circle at 10% 20%, rgba(250, 177, 47, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 90% 80%, rgba(0, 27, 183, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }
  `}
`;

const SectionTitle = styled.h2`
  color: ${props => props.color || '#001BB7'};
  font-weight: 800;
  margin-bottom: 30px;
  text-align: center;
  font-size: 3rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 5px;
    background: linear-gradient(90deg, #FAB12F, #001BB7);
    border-radius: 3px;
  }
`;

const Subtitle = styled.p`
  color: #3C467B;
  font-size: 1.2rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
  line-height: 1.7;
  font-weight: 500;
  opacity: 0.9;
`;

const CourseCard = styled.div`
  background: ${props => {
    switch(props.cardVariant) {
      case 'gradient-gold': return 'linear-gradient(135deg, #FEF3E2, #F7F1DE)';
      case 'gradient-blue': return 'linear-gradient(135deg, #E8F4FF, #F0F7FF)';
      case 'gradient-white': return 'linear-gradient(135deg, #FFFFFF, #F5F6F9)';
      case 'accent': return 'linear-gradient(135deg, #FAB12F, #FFD166)';
      default: return 'linear-gradient(135deg, #FFFFFF, #F8F9FA)';
    }
  }};
  border: 2px solid ${props => props.borderColor || 'rgba(159, 191, 206, 0.3)'};
  border-radius: 20px;
  padding: 35px 30px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  height: 100%;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(250, 177, 47, 0.1), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    border-color: #FAB12F;
    box-shadow: 0 25px 50px rgba(13, 74, 124, 0.15);
    
    &::before {
      left: 100%;
    }
  }
`;

const ButtonPrimary = styled.button`
  background: linear-gradient(45deg, #0D4A7C, #001BB7);
  color: #F7F1DE;
  border: none;
  border-radius: 15px;
  padding: 16px 40px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  margin: 0 12px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(247, 241, 222, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: linear-gradient(45deg, #001BB7, #3C467B);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 27, 183, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
`;

const ButtonSecondary = styled(ButtonPrimary)`
  background: transparent;
  border: 3px solid #FAB12F;
  color: #0D4A7C;
  
  &:hover {
    background: #FAB12F;
    color: #0D4A7C;
    border-color: #FAB12F;
  }
`;

const TechIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 25px;
  background: linear-gradient(135deg, #F7F1DE, #FEF3E2);
  border: 3px solid #9FBFCE;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #001BB7;
  font-size: 2.5rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(250, 177, 47, 0.1) 0%, transparent 70%);
    transform: scale(0);
    transition: transform 0.4s ease;
  }
  
  &:hover {
    transform: scale(1.2) rotate(10deg);
    border-color: #FAB12F;
    box-shadow: 0 15px 30px rgba(250, 177, 47, 0.3);
    animation: none;
    
    &::before {
      transform: scale(1);
    }
  }
`;

const HeroSection = styled(Section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(250, 177, 47, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0, 27, 183, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 8s ease-in-out infinite reverse;
  }
`;

const HeroContent = styled.div`
  text-align: left;
  position: relative;
  z-index: 2;
  
  h1 {
    color: #001BB7;
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 30px;
    line-height: 1.1;
    
    span {
      background: linear-gradient(45deg, #001BB7, #FAB12F);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #FAB12F, #001BB7);
        border-radius: 2px;
      }
    }
  }
  
  p {
    color: #3C467B;
    font-size: 1.4rem;
    margin-bottom: 50px;
    max-width: 600px;
    line-height: 1.7;
    font-weight: 500;
  }
`;

const InteractiveDemo = styled.div`
  background: linear-gradient(135deg, #9FBFCE, #001BB7);
  border-radius: 25px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #F7F1DE;
  box-shadow: 0 25px 60px rgba(0, 27, 183, 0.3);
  position: relative;
  overflow: hidden;
  
  .code-editor {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    padding: 20px;
    width: 80%;
    margin-bottom: 30px;
    
    .code-line {
      font-family: 'Courier New', monospace;
      margin: 8px 0;
      opacity: 0.9;
      
      &.highlight {
        color: #FAB12F;
        font-weight: bold;
      }
    }
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 18px 25px;
  border: 2px solid rgba(159, 191, 206, 0.5);
  border-radius: 12px;
  margin-bottom: 25px;
  background: rgba(255, 255, 255, 0.9);
  color: #3C467B;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    border-color: #FAB12F;
    box-shadow: 0 0 0 4px rgba(250, 177, 47, 0.2);
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 1);
  }
  
  &::placeholder {
    color: #9AA5AF;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 18px 25px;
  border: 2px solid rgba(159, 191, 206, 0.5);
  border-radius: 12px;
  margin-bottom: 25px;
  background: rgba(255, 255, 255, 0.9);
  color: #3C467B;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    border-color: #FAB12F;
    box-shadow: 0 0 0 4px rgba(250, 177, 47, 0.2);
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 1);
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(45deg, #0D4A7C, #001BB7);
  color: #F7F1DE;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  margin-top: 20px;
  border: 3px solid #FAB12F;
  animation: ${pulse} 2s ease-in-out infinite;
  
  svg {
    margin-right: 15px;
  }
`;

const CareerCard = styled(CourseCard)`
  text-align: center;
  padding: 40px 30px;
  
  h5 {
    color: #001BB7;
    margin: 25px 0 20px;
    font-weight: 800;
    font-size: 1.3rem;
  }
  
  p {
    color: #3C467B;
    line-height: 1.7;
    font-size: 1.1rem;
  }
`;

const FinalCTA = styled(Section)`
  color: #F7F1DE;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(250, 177, 47, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${float} 10s ease-in-out infinite;
  }
  
  h3 {
    color: #F7F1DE;
    margin-bottom: 25px;
    font-weight: 800;
    font-size: 2.5rem;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(45deg, #FAB12F, #FEF3E2);
  color: #001BB7;
  border: none;
  border-radius: 15px;
  padding: 18px 45px;
  font-weight: 800;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${glow} 2s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 35px rgba(250, 177, 47, 0.5);
    animation: none;
    
    &::before {
      left: 100%;
    }
  }
`;

const DurationTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(13, 74, 124, 0.15);
  
  th, td {
    padding: 25px;
    text-align: center;
    border: none;
    transition: all 0.3s ease;
  }
  
  th {
    background: linear-gradient(45deg, #001BB7, #3C467B);
    color: #F7F1DE;
    font-weight: 700;
    font-size: 1.1rem;
  }
  
  td {
    background: linear-gradient(135deg, #F7F1DE, #FEF3E2);
    color: #3C467B;
    font-weight: 600;
    border-bottom: 3px solid #FAB12F;
    
    &:first-child {
      font-weight: 800;
      color: #001BB7;
    }
    
    &:hover {
      background: linear-gradient(135deg, #FEF3E2, #F7F1DE);
      transform: scale(1.02);
    }
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding: 20px;
  border-radius: 15px;
  background: rgba(247, 241, 222, 0.7);
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(250, 177, 47, 0.15);
    transform: translateX(15px) scale(1.02);
    box-shadow: 0 10px 25px rgba(250, 177, 47, 0.2);
  }
  
  svg {
    color: #FAB12F;
    margin-right: 25px;
    font-size: 1.8rem;
    flex-shrink: 0;
  }
  
  span {
    color: #3C467B;
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const Footer = styled.footer`
  background: linear-gradient(135deg, #0D4A7C 0%, #001BB7 100%);
  color: #F7F1DE;
  padding: 80px 0 30px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #FAB12F, #001BB7);
  }
`;

const FooterSection = styled.div`
  margin-bottom: 40px;
  
  h5 {
    color: #FAB12F;
    margin-bottom: 25px;
    font-weight: 800;
    font-size: 1.3rem;
  }
  
  p, a {
    color: #F7F1DE;
    line-height: 1.8;
    text-decoration: none;
    transition: all 0.3s ease;
    margin-bottom: 12px;
    display: block;
    
    &:hover {
      color: #FAB12F;
      transform: translateX(8px);
    }
  }
`;

const SocialIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(247, 241, 222, 0.1);
  border-radius: 15px;
  color: #F7F1DE;
  margin-right: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #FAB12F;
    color: #001BB7;
    transform: translateY(-5px) rotate(5deg);
    box-shadow: 0 10px 20px rgba(250, 177, 47, 0.3);
  }
`;

const FeatureHighlight = styled.div`
  text-align: center;
  padding: 30px 20px;
  transition: all 0.3s ease;
  
  .icon-wrapper {
    width: 100px;
    height: 100px;
    border-radius: 25px;
    background: linear-gradient(135deg, #FAB12F, #FFD166);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 25px;
    color: #001BB7;
    font-size: 2.5rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
      transform: scale(0);
      transition: transform 0.3s ease;
    }
  }
  
  &:hover {
    transform: translateY(-10px);
    
    .icon-wrapper {
      transform: scale(1.1) rotate(5deg);
      
      &::before {
        transform: scale(1);
      }
    }
  }
  
  h5 {
    color: #001BB7;
    margin-bottom: 15px;
    font-weight: 800;
    font-size: 1.3rem;
  }
  
  p {
    color: #3C467B;
    line-height: 1.6;
  }
`;

const ScrollToTop = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #FAB12F, #001BB7);
  border: none;
  border-radius: 50%;
  color: #F7F1DE;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 5px 20px rgba(0, 27, 183, 0.3);
  
  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 30px rgba(250, 177, 47, 0.4);
  }
`;

// Main Component
const FrontendCourse = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    duration: '',
    mode: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        duration: '',
        mode: ''
      });
    }, 5000);
  };

  const skills = [
    'HTML5 & CSS3 fundamentals',
    'JavaScript ES6+ syntax',
    'Responsive Web Design',
    'Bootstrap 5 styling',
    'React.js fundamentals',
    'DOM Manipulation & APIs',
    'Git & GitHub version control',
    'Deployment (Netlify / Render)'
  ];

  const technologies = [
    { icon: FaHtml5, name: 'HTML5' },
    { icon: FaCss3Alt, name: 'CSS3' },
    { icon: FaJs, name: 'JavaScript' },
    { icon: FaReact, name: 'React.js' },
    { icon: FaBootstrap, name: 'Bootstrap' },
    { icon: FaGitAlt, name: 'Git' },
    { icon: FaCode, name: 'VS Code' },
    { icon: FaChrome, name: 'DevTools' }
  ];

  const enrollOptions = [
    {
      icon: FaUserGraduate,
      title: 'Students & Freshers',
      description: 'Looking to enter web development with comprehensive training'
    },
    {
      icon: FaBriefcase,
      title: 'Career Changers',
      description: 'Professionals seeking transition into tech industry'
    },
    {
      icon: FaUser,
      title: 'Self-learners',
      description: 'Interested in mastering frontend development fundamentals'
    }
  ];

  const careerOpportunities = [
    'Frontend Developer',
    'UI/UX Developer',
    'Web Designer',
    'React.js Developer'
  ];

  const features = [
    { icon: FaRocket, title: 'Project Based', description: 'Hands-on real world projects' },
    { icon: FaGraduationCap, title: 'Expert Mentors', description: 'Industry professionals' },
    { icon: FaCertificate, title: 'Certification', description: 'Industry recognized certificate' },
    { icon: FaChartLine, title: 'Career Growth', description: 'Job placement assistance' }
  ];

  return (
    <CourseContainer>
      {/* Progress Bar */}
      <ProgressBar progress={scrollProgress} />

      {/* Scroll to Top Button */}
      <ScrollToTop onClick={scrollToTop}>
        ↑
      </ScrollToTop>

      {/* Navigation */}
      <Navbar className="navbar navbar-expand-lg fixed-top sticky-top" scrolled={scrolled}>
        <div className="container">
          <NavBrand className="navbar-brand" href="#">
            BTC Routes
          </NavBrand>
          
          <button 
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <FaTimes color="#F7F1DE" /> : <FaBars color="#F7F1DE" />}
          </button>

          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" href="#home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" href="#about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" href="#curriculum">Curriculum</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" href="#careers">Careers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" href="#contact">Contact</NavLink>
              </li>
              <li className="nav-item ms-2">
                <NavButton className="btn">Apply Now</NavButton>
              </li>
            </ul>
          </div>
        </div>
      </Navbar>

      {/* Hero Section */}
      <HeroSection bgVariant="hero" id="home" hasPattern>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <HeroContent>
                <h1>
                  Frontend <span>Development</span> Mastery
                </h1>
                <p>
                  Transform your career with our immersive frontend development course. 
                  Learn modern technologies, build real projects, and join the next 
                  generation of web developers.
                </p>
                <div>
                  <ButtonPrimary>
                    <FaPlay style={{ marginRight: '10px' }} />
                    Watch Demo
                  </ButtonPrimary>
                  <ButtonSecondary>Start Learning</ButtonSecondary>
                </div>
              </HeroContent>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <InteractiveDemo>
                <div className="code-editor">
                  <div className="code-line highlight">Build Amazing Websites</div>
                  <div className="code-line">function createWebsite() {'{'}</div>
                  <div className="code-line">  return {'<'}div{'>'}</div>
                  <div className="code-line">    {'<'}h1{'>'}Hello World{'<'}/h1{'>'}</div>
                  <div className="code-line">    {'<'}p{'>'}Start your journey today!{'<'}/p{'>'}</div>
                  <div className="code-line">  {'<'}/div{'>'}</div>
                  <div className="code-line">{'}'}</div>
                </div>
                <FaLaptopCode size={80} color="#FAB12F" />
                <p style={{ marginTop: '20px', fontSize: '1.1rem' }}>
                  Interactive Learning Environment
                </p>
              </InteractiveDemo>
            </div>
          </div>
        </div>
      </HeroSection>

      {/* Features Highlight */}
      <Section bgVariant="light" hasPattern>
        <div className="container">
          <div className="row">
            {features.map((feature, index) => (
              <div className="col-lg-3 col-md-6 mb-4" key={index} data-aos="fade-up">
                <FeatureHighlight>
                  <div className="icon-wrapper">
                    <feature.icon />
                  </div>
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </FeatureHighlight>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* About the Course */}
      <Section bgVariant="gradient-blue" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto" data-aos="fade-right">
              <SectionTitle color="#001BB7">Why Choose Our Course?</SectionTitle>
              <p style={{ 
                fontSize: '1.3rem', 
                lineHeight: '1.8', 
                textAlign: 'center',
                color: '#3C467B'
              }}>
                Our Frontend Development course is designed by industry experts to provide 
                you with the most relevant and up-to-date skills. With hands-on projects, 
                personalized mentorship, and career support, we ensure your success in the 
                competitive tech industry.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* What You'll Learn */}
      <Section bgVariant="pattern" id="curriculum" hasPattern>
        <div className="container">
          <SectionTitle color="#001BB7">Curriculum Overview</SectionTitle>
          <Subtitle>Comprehensive learning path designed for career success</Subtitle>
          <div className="row">
            {skills.map((skill, index) => (
              <div className="col-md-6 mb-4" key={index} data-aos="zoom-in-up">
                <SkillItem>
                  <FaCheckCircle />
                  <span>{skill}</span>
                </SkillItem>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Tools & Technologies */}
      <Section bgVariant="gradient-gold">
        <div className="container">
          <SectionTitle color="#001BB7">Tech Stack Mastery</SectionTitle>
          <Subtitle>Learn the tools that power modern web development</Subtitle>
          <div className="row">
            {technologies.map((tech, index) => (
              <div className="col-6 col-md-3 mb-4" key={index} data-aos="fade-up">
                <div className="text-center">
                  <TechIcon delay={`${index * 0.2}s`}>
                    <tech.icon />
                  </TechIcon>
                  <p style={{ color: '#001BB7', fontWeight: '800', fontSize: '1.2rem' }}>
                    {tech.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Who Can Enroll */}
      <Section bgVariant="gradient-purple">
        <div className="container">
          <SectionTitle color="#001BB7">Ideal Candidates</SectionTitle>
          <Subtitle>This course is perfect for various backgrounds and career goals</Subtitle>
          <div className="row">
            {enrollOptions.map((option, index) => (
              <div className="col-md-4 mb-4" key={index} data-aos="fade-left">
                <CareerCard cardVariant="gradient-white" borderColor="#FAB12F">
                  <option.icon size={60} color="#001BB7" />
                  <h5>{option.title}</h5>
                  <p>{option.description}</p>
                </CareerCard>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Duration & Mode */}
      <Section bgVariant="" style={{backgroundColor:'white'}}>
        <div className="container">
          <SectionTitle color="#001BB7">Flexible Learning Options</SectionTitle>
          <Subtitle>Choose the plan that fits your schedule and goals</Subtitle>
          <div className="row justify-content-center">
            <div className="col-lg-8" data-aos="fade-up">
              <DurationTable>
                <thead>
                  <tr>
                    <th>Duration</th>
                    <th>Mode</th>
                    <th>Schedule</th>
                    <th>Support</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 Month</td>
                    <td>Online</td>
                    <td>Flexible</td>
                    <td>Basic</td>
                  </tr>
                  <tr>
                    <td>3 Months</td>
                    <td>Hybrid</td>
                    <td>Weekends</td>
                    <td>Standard</td>
                  </tr>
                  <tr>
                    <td>6 Months</td>
                    <td>Offline/Advanced</td>
                    <td>Weekdays</td>
                    <td>Premium</td>
                  </tr>
                </tbody>
              </DurationTable>
            </div>
          </div>
        </div>
      </Section>

      {/* Get Syllabus & Fee Details Form */}
      <Section bgVariant="gradient-blue" hasPattern>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <SectionTitle color="#001BB7">Get Course Details</SectionTitle>
              <Subtitle>
                Receive complete syllabus, fee structure, and career guidance from our experts
              </Subtitle>
              
              {formSubmitted ? (
                <SuccessMessage>
                  <FaCheckCircle size={28} style={{ marginRight: '15px' }} />
                  Course details will be sent to your email shortly!
                </SuccessMessage>
              ) : (
                <CourseCard cardVariant="gradient-white" borderColor="#FAB12F">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <FormInput
                          type="text"
                          name="fullName"
                          placeholder="👤 Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <FormInput
                          type="email"
                          name="email"
                          placeholder="📧 Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <FormInput
                      type="tel"
                      name="mobile"
                      placeholder="📱 Mobile Number"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="row">
                      <div className="col-md-6">
                        <FormSelect
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">⏰ Select Duration</option>
                          <option value="1 Month">1 Month (Online)</option>
                          <option value="3 Months">3 Months (Hybrid)</option>
                          <option value="6 Months">6 Months (Offline)</option>
                        </FormSelect>
                      </div>
                      <div className="col-md-6">
                        <FormSelect
                          name="mode"
                          value={formData.mode}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">💻 Select Mode</option>
                          <option value="Online">Online</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Offline">Offline</option>
                        </FormSelect>
                      </div>
                    </div>
                    <div className="text-center">
                      <ButtonPrimary type="submit" style={{ width: '250px' }}>
                        <FaArrowRight style={{ marginRight: '10px' }} />
                        Get Course Details
                      </ButtonPrimary>
                    </div>
                  </form>
                </CourseCard>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Career Opportunities */}
      <Section bgVariant="light" id="careers">
        <div className="container">
          <SectionTitle color="#001BB7">Career Paths</SectionTitle>
          <Subtitle>Unlock exciting opportunities in the tech industry</Subtitle>
          <div className="row">
            {careerOpportunities.map((career, index) => (
              <div className="col-md-3 col-6 mb-4" key={index} data-aos="fade-right">
                <CareerCard cardVariant="gradient-blue" borderColor="#FAB12F">
                  <FaUserTie size={40} color="#001BB7" />
                  <h5 style={{ fontSize: '1.3rem', marginTop: '20px' }}>{career}</h5>
                  <p style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.8 }}>
                    Average Salary: ${(index + 6) * 10000}
                  </p>
                </CareerCard>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <FinalCTA bgVariant="" style={{backgroundColor:"rgb(222, 222, 209)"}} data-aos="fade-up">
        <div className="container text-dark">
          <h3 className='text-dark'>Ready to Launch Your Tech Career?</h3>
          <p style={{ fontSize: '1.4rem', marginBottom: '35px', opacity: 0.9 }}>
            Join thousands of successful graduates and transform your future today!
          </p>
          <CTAButton>
            <FaRocket style={{ marginRight: '12px' }} />
            Start Your Journey
          </CTAButton>
        </div>
      </FinalCTA>

      {/* Footer */}
      <Footer id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <FooterSection>
                <h5>🚀 BTC Routes</h5>
                <p>
                  Empowering aspiring developers with cutting-edge skills and 
                  industry-ready expertise. Your journey to tech excellence starts here.
                </p>
                <div className="d-flex mt-4">
                  <SocialIcon href="#">
                    <FaFacebook />
                  </SocialIcon>
                  <SocialIcon href="#">
                    <FaTwitter />
                  </SocialIcon>
                  <SocialIcon href="#">
                    <FaLinkedin />
                  </SocialIcon>
                  <SocialIcon href="#">
                    <FaInstagram />
                  </SocialIcon>
                </div>
              </FooterSection>
            </div>
            
            <div className="col-lg-2 col-md-6">
              <FooterSection>
                <h5>Quick Links</h5>
                <p><a href="#home">🏠 Home</a></p>
                <p><a href="#about">📚 About</a></p>
                <p><a href="#curriculum">🎯 Curriculum</a></p>
                <p><a href="#careers">💼 Careers</a></p>
              </FooterSection>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <FooterSection>
                <h5>Contact Info</h5>
                <p><FaEnvelope style={{ marginRight: '12px' }} /> hello@btcroutes.com</p>
                <p><FaPhone style={{ marginRight: '12px' }} /> +1 (555) 123-4567</p>
                <p><FaMapMarkerAlt style={{ marginRight: '12px' }} /> Tech Valley, CA 94025</p>
              </FooterSection>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <FooterSection>
                <h5>Program Details</h5>
                <p>🎓 Frontend Development</p>
                <p>⏱️ 1-6 Months Duration</p>
                <p>💻 Online/Hybrid/Offline</p>
                <p>📜 Certification Included</p>
              </FooterSection>
            </div>
          </div>
          
          <div className="text-center mt-5 pt-4" style={{ borderTop: '1px solid rgba(247, 241, 222, 0.3)' }}>
            <p style={{ color: '#FAB12F', margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>
              © 2024 BTC Routes. Crafting Future Developers. 🚀
            </p>
          </div>
        </div>
      </Footer>
    </CourseContainer>
  );
};

export default FrontendCourse;