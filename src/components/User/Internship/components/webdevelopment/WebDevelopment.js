import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed from 'typed.js';
// import logo from '../../../../assests/logo2.png'
import { BiLogoVisualStudio } from "react-icons/bi";
import {Link, useNavigate} from 'react-router-dom'
// import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { 
  FaCode,
  FaLaptopCode,
  FaServer,
  FaCloud,
  FaCertificate,
  FaGraduationCap,
  FaCalendarAlt,
  FaUsers,
  FaQuoteLeft,
  FaRocket,
  FaMobile,
  FaPalette
} from 'react-icons/fa';
import { 
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGithub
} from 'react-icons/si';
import NavbarComponent from '../Navbarcomponent';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', 'Fira Code', monospace;
    line-height: 1.6;
    color: #E5E7EB;
    overflow-x: hidden;
    background: #0A0F1F;
  }

  html {
    scroll-padding-top: 80px;
  }

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #111827;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(#00FFC6, #4F46E5);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(#4F46E5, #00FFC6);
  }
`;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
`;

// const codePulse = keyframes`
//   0%, 100% { 
//     opacity: 0.6;
//     transform: scale(1);
//   }
//   50% { 
//     opacity: 1;
//     transform: scale(1.05);
//   }
// `;

const rippleAnimation = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

const backgroundShimmer = keyframes`
  0%, 100% { transform: translateX(-100%) rotate(0deg); }
  50% { transform: translateX(100%) rotate(180deg); }
`;

const glowPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px #00FFC6, 0 0 40px rgba(0, 255, 198, 0.3);
  }
  50% { 
    box-shadow: 0 0 30px #4F46E5, 0 0 60px rgba(79, 70, 229, 0.4);
  }
`;

// const terminalGlow = keyframes`
//   0%, 100% { 
//     text-shadow: 0 0 10px #00FFC6, 0 0 20px #00FFC6;
//   }
//   50% { 
//     text-shadow: 0 0 15px #4F46E5, 0 0 30px #4F46E5;
//   }
// `;

const quoteRotate = keyframes`
  0%, 25% { opacity: 1; transform: translateY(0); }
  30%, 100% { opacity: 0; transform: translateY(-20px); }
`;

const cursorBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const codeLine = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

// Main Container
const PageContainer = styled.div`
  position: relative;
`;


// Section Base Styles
const Section = styled.section`
  padding: 100px 0;
  position: relative;
`;

const SectionHeader = styled.div`
  margin-bottom: 60px;
  text-align: ${props => props.center ? 'center' : 'left'};

  h2 {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(90deg, #00FFC6, #FFD700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(0, 255, 198, 0.3);
    font-family: 'Fira Code', monospace;
  }
`;

const SectionDivider = styled.div`
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #00FFC6, #FFD700);
  border-radius: 2px;
  margin: ${props => props.center ? '0 auto' : '0'};
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #E5E7EB;
  margin-top: 1.5rem;
  opacity: 0.9;
  font-family: 'Inter', sans-serif;
`;

// Hero Section
const HeroSection = styled(Section)`
  background: linear-gradient(135deg, #00FFC6, #4F46E5);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: #E5E7EB;
  margin: 0;
  padding-top: 80px;

  .container {
    position: relative;
    z-index: 2;
  }

  .row {
    min-height: calc(100vh - 80px);
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-shadow: 0 0 30px rgba(79, 70, 229, 0.5);
  background: linear-gradient(135deg, #E5E7EB, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Fira Code', monospace;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.div`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
  min-height: 3rem;
  font-family: 'Fira Code', monospace;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TypedText = styled.span`
  color: #FFD700;
  font-weight: 800;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
`;

const HeroTagline = styled.p`
  font-size: 1.4rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  font-weight: 500;
  max-width: 600px;
  font-family: 'Inter', sans-serif;
`;

// Buttons
const PrimaryButton = styled.button`
  background: linear-gradient(90deg, #4F46E5, #00FFC6);
  border: none;
  padding: ${props => props.large ? '18px 50px' : '15px 40px'};
  border-radius: 50px;
  font-weight: 700;
  font-size: ${props => props.large ? '1.3rem' : '1.1rem'};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 0 25px rgba(79, 70, 229, 0.4);
  color: #0A0F1F;
  animation: ${glowPulse} 2s ease-in-out infinite;
  font-family: 'Fira Code', monospace;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 35px rgba(0, 255, 198, 0.6);
    background: linear-gradient(90deg, #00FFC6, #4F46E5);
  }
`;

const GoldButton = styled(PrimaryButton)`
  background: linear-gradient(90deg, #FFD700, #FFE44D);
  animation: none;
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.4);

  &:hover {
    background: linear-gradient(90deg, #00FFC6, #4F46E5);
    box-shadow: 0 0 35px rgba(0, 255, 198, 0.6);
  }
`;

const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  background: rgba(10, 15, 31, 0.6);
  transform: scale(0);
  animation: ${rippleAnimation} 0.6s linear;
  pointer-events: none;
`;

// Code Elements
const CodeElement = styled.div`
  position: absolute;
  background: rgba(0, 255, 198, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 198, 0.3);
  animation: ${float} 6s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(0, 255, 198, 0.2);
  z-index: 1;
  font-family: 'Fira Code', monospace;
  padding: 10px;
  font-size: 0.8rem;
  color: #00FFC6;

  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  animation-delay: ${props => props.delay || '0s'};
`;

const Cursor = styled.div`
  position: absolute;
  width: 2px;
  height: 30px;
  background: #00FFC6;
  animation: ${cursorBlink} 1s infinite;
  box-shadow: 0 0 10px #00FFC6;
  z-index: 1;

  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
`;

const CodeLine = styled.div`
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, #00FFC6, #4F46E5);
  animation: ${codeLine} 3s ease-in-out infinite;
  box-shadow: 0 0 10px #00FFC6;
  z-index: 1;

  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  animation-delay: ${props => props.delay || '0s'};
`;

// Hero Background Animation
const HeroBackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 255, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.1) 0%, transparent 50%);
  animation: ${backgroundShimmer} 8s ease-in-out infinite;
  z-index: 1;
`;

// About Section
const AboutSection = styled(Section)`
  background: #111827;
  position: relative;
  overflow: hidden;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #E5E7EB;
  opacity: 0.9;
  line-height: 1.8;
  font-family: 'Inter', sans-serif;
`;

const AboutFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;

  li {
    padding: 0.8rem 0;
    padding-left: 2rem;
    position: relative;
    font-size: 1.1rem;
    color: #E5E7EB;
    font-family: 'Inter', sans-serif;

    &::before {
      content: '⚡';
      position: absolute;
      left: 0;
      font-size: 1.2rem;
      color: #00FFC6;
    }
  }
`;

const CodeVisual = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CodeIcon = styled.div`
  font-size: 8rem;
  color: #00FFC6;
  animation: ${float} 6s ease-in-out infinite;
  text-shadow: 0 0 50px rgba(0, 255, 198, 0.5);
  position: relative;
  z-index: 2;
`;

const CodeGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(90deg, transparent 49%, #00FFC6 50%, transparent 51%),
      linear-gradient(transparent 49%, #00FFC6 50%, transparent 51%);
    background-size: 50px 50px;
  }
`;

// Skills Section
const SkillsSection = styled(Section)`
  position: relative;
  background: linear-gradient(135deg, rgba(0, 255, 198, 0.05), rgba(79, 70, 229, 0.05));
  overflow: hidden;
`;

const SkillCard = styled.div`
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(10px);
  padding: 2.5rem 1.5rem;
  border-radius: 20px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 198, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: #FFD700;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);

    &::before {
      left: 100%;
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.color || '#FFD700'};
  text-shadow: 0 0 20px ${props => props.color || '#FFD700'};
`;

const SkillName = styled.h5`
  font-weight: 700;
  color: #E5E7EB;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const SkillDescription = styled.p`
  color: #E5E7EB;
  opacity: 0.8;
  font-size: 0.95rem;
`;

const SkillsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 10% 20%, rgba(0, 255, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%);
  z-index: -1;
`;

// Curriculum Section
const CurriculumSection = styled(Section)`
  background: linear-gradient(135deg, #00FFC6, #4F46E5);
  color: #E5E7EB;
  position: relative;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 3rem;
  width: 45%;
  left: ${props => props.even ? '55%' : '0'};
  text-align: ${props => props.even ? 'left' : 'right'};
  padding: ${props => props.even ? '0 0 0 3rem' : '0 3rem 0 0'};

  @media (max-width: 768px) {
    width: 100%;
    left: 0 !important;
    padding-left: 3rem !important;
    padding-right: 1rem !important;
    text-align: left !important;
  }
`;

const TimelinePhase = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #FFD700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  font-family: 'Fira Code', monospace;
`;

const TimelineDesc = styled.div`
  opacity: 0.95;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
`;

const TimelineConnector = styled.div`
  position: absolute;
  top: 10px;
  width: 20px;
  height: 20px;
  background: #FFD700;
  border-radius: 50%;
  box-shadow: 0 0 20px #FFD700;
  right: ${props => props.even ? 'auto' : '-10px'};
  left: ${props => props.even ? '-10px' : 'auto'};

  @media (max-width: 768px) {
    left: 10px !important;
    right: auto !important;
  }
`;

// Tools Section
const ToolsSection = styled(Section)`
  background: #0A0F1F;
  color: #E5E7EB;
`;

const ToolCard = styled.div`
  text-align: center;
  padding: 2.5rem 1rem;
  transition: all 0.3s ease;
  border-radius: 50%;
  background: rgba(17, 24, 39, 0.6);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px #00FFC6;
  }
`;

const ToolIcon = styled.div`
  font-size: 3rem;
  color: #4F46E5;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  ${ToolCard}:hover & {
    color: #00FFC6;
    filter: drop-shadow(0 0 10px #00FFC6);
  }
`;

const ToolName = styled.span`
  font-weight: 600;
  color: #E5E7EB;
  font-size: 0.9rem;
  font-family: 'Fira Code', monospace;
`;

// Mentorship Section
const MentorshipSection = styled(Section)`
  background: linear-gradient(135deg, #111827, #0A0F1F);
  position: relative;
`;

const MentorshipContent = styled.div`
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(10px);
  padding: 4rem 3rem;
  border-radius: 25px;
  border: 1px solid rgba(0, 255, 198, 0.3);
  position: relative;
  box-shadow: 0 0 50px rgba(0, 255, 198, 0.2);
`;

const QuoteIcon = styled.div`
  font-size: 2.5rem;
  color: #00FFC6;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px #00FFC6;
`;

const MentorshipText = styled.p`
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 3rem;
  color: #E5E7EB;
  line-height: 1.8;
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

// const MentorStats = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-top: 3rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 2rem;
//   }
// `;

// const Stat = styled.div`
//   text-align: center;
// `;

// const StatNumber = styled.h4`
//   font-size: 2.5rem;
//   color: #FFD700;
//   margin-bottom: 0.5rem;
//   text-shadow: 0 0 20px #FFD700;
//   font-family: 'Fira Code', monospace;
// `;

const MentorshipBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><circle cx="200" cy="200" r="100" fill="%2300FFC6" fill-opacity="0.05"/><circle cx="800" cy="800" r="150" fill="%234F46E5" fill-opacity="0.05"/></svg>');
  z-index: -1;
`;

// Projects Section
const ProjectsSection = styled(Section)`
  background: #0A0F1F;
  position: relative;
`;

const ProjectCard = styled.div`
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  border: 2px solid #4F46E5;
  transition: all 0.3s ease;
  height: 100%;
  animation: ${glowPulse} 4s ease-in-out infinite;
  font-family: 'Inter', sans-serif;

  &:hover {
    transform: translateY(-10px);
    border-color: #FFD700;
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.4);
    animation: none;
  }
`;

const ProjectIcon = styled.div`
  font-size: 3rem;
  color: #FFD700;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px #FFD700;
`;

const ProjectTitle = styled.h5`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #E5E7EB;
  font-size: 1.4rem;
`;

const ProjectDescription = styled.p`
  color: #E5E7EB;
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ProjectTech = styled.div`
  font-size: 0.9rem;
  color: #00FFC6;
  font-weight: 600;
  text-shadow: 0 0 10px #00FFC6;
  font-family: 'Fira Code', monospace;
`;

// Eligibility Section
const EligibilitySection = styled(Section)`
  background: #111827;
`;

const InfoCard = styled.div`
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: rgba(0, 255, 198, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 255, 198, 0.3);

  &:hover {
    transform: translateY(-5px);
    background: rgba(0, 255, 198, 0.2);
    box-shadow: 0 0 30px rgba(0, 255, 198, 0.3);
  }
`;

const InfoIcon = styled.div`
  font-size: 2.5rem;
  color: #4F46E5;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px #4F46E5;
`;

const InfoTitle = styled.h5`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #E5E7EB;
  font-size: 1.3rem;
  font-family: 'Fira Code', monospace;
`;

const InfoValue = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #FFD700;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px #FFD700;
`;

const InfoSubtext = styled.span`
  color: #E5E7EB;
  opacity: 0.8;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
`;

// Benefits Section
const BenefitsSection = styled(Section)`
  background: linear-gradient(135deg, #4F46E5, #00FFC6);
  color: #E5E7EB;
  position: relative;
`;

const BenefitCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: rotate(45deg);
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: #FFD700;
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.4);

    &::before {
      transform: rotate(45deg) translate(50%, 50%);
    }
  }
`;

const BenefitIcon = styled.div`
  font-size: 3rem;
  color: #FFD700;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 20px #FFD700;
`;

const BenefitTitle = styled.h5`
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  font-size: 1.4rem;
`;

const BenefitDescription = styled.p`
  opacity: 0.95;
  position: relative;
  z-index: 2;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
`;

// Quotes Section
const QuotesSection = styled(Section)`
  background: #0A0F1F;
  position: relative;
  overflow: hidden;
`;

const QuotesContent = styled.div`
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const QuoteText = styled.h3`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
  line-height: 1.4;
  color: #E5E7EB;
  text-shadow: 0 0 20px rgba(0, 255, 198, 0.5);
  font-family: 'Fira Code', monospace;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const QuoteRotation = styled.div`
  font-size: 1.4rem;
  opacity: 0.9;
  min-height: 2rem;
  font-family: 'Inter', sans-serif;
`;

const RotatingQuote = styled.span`
  display: block;
  animation: ${quoteRotate} 12s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const CodeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at center, #00FFC6 1px, transparent 1px),
      radial-gradient(circle at center, #4F46E5 1px, transparent 1px);
    background-size: 50px 50px, 30px 30px;
    background-position: 0 0, 25px 25px;
  }
`;

// Apply Section
const ApplySection = styled(Section)`
  background: linear-gradient(135deg, #4F46E5, #00FFC6);
  color: #E5E7EB;
  text-align: center;
  position: relative;
`;

const ApplyTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-shadow: 0 0 30px rgba(79, 70, 229, 0.5);
  font-family: 'Fira Code', monospace;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ApplySubtitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Inter', sans-serif;
`;

// const ApplyStats = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 4rem;
//   margin-top: 4rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 2rem;
//   }
// `;

// const ApplyStat = styled.div`
//   text-align: center;
// `;

// const ApplyStatNumber = styled.h4`
//   font-size: 3rem;
//   font-weight: 800;
//   margin-bottom: 0.5rem;
//   color: #FFD700;
//   text-shadow: 0 0 20px #FFD700;
//   font-family: 'Fira Code', monospace;
// `;

const ApplyBackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%);
  animation: ${backgroundShimmer} 6s ease-in-out infinite;
  z-index: -1;
`;

// Footer
const Footer = styled.footer`
  background: #111827;
  color: #E5E7EB;
  padding: 3rem 0;
  text-align: center;
  border-top: 1px solid rgba(0, 255, 198, 0.3);
`;

const FooterText = styled.p`
  margin: 0;
  opacity: 0.8;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  a {
    color: #E5E7EB;
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;
    position: relative;
    font-family: 'Fira Code', monospace;

    &:hover {
      opacity: 1;
      color: #00FFC6;
      text-shadow: 0 0 10px #00FFC6;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #00FFC6, #4F46E5);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

// Scroll to Top Button
const ScrollToTop = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #4F46E5, #00FFC6);
  border: none;
  border-radius: 50%;
  color: #0A0F1F;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 255, 198, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fira Code', monospace;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(79, 70, 229, 0.6);
  }
`;

const WebDevelopmentInternship = () => {
  const typedRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-out-cubic'
    });

    // Initialize Typed.js
    const typed = new Typed(typedRef.current, {
      strings: ['Frontend.', 'Backend.', 'Full Stack.', 'React.', 'Node.js.', 'MongoDB.'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });

    // Smooth scroll function
    const smoothScroll = (target) => {
      const element = document.querySelector(target);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    };

    // Add smooth scroll to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);
      });
    });

    // Scroll to top visibility
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 400);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      typed.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigate = useNavigate()

  // Ripple effect function
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Skills data
  const skills = [
    { 
      icon: <SiHtml5 />, 
      name: 'HTML5 & CSS3', 
      desc: 'Modern semantic markup and responsive design',
      color: '#E34F26'
    },
    { 
      icon: <SiJavascript />, 
      name: 'JavaScript ES6+', 
      desc: 'Advanced JavaScript and modern features',
      color: '#F7DF1E'
    },
    { 
      icon: <SiReact />, 
      name: 'React & Bootstrap', 
      desc: 'Component-based UI and responsive frameworks',
      color: '#61DAFB'
    },
    { 
      icon: <SiNodedotjs />, 
      name: 'Node.js & Express', 
      desc: 'Server-side JavaScript and API development',
      color: '#339933'
    },
    { 
      icon: <SiMongodb />, 
      name: 'MongoDB Database', 
      desc: 'NoSQL database and data modeling',
      color: '#47A248'
    },
    { 
      icon: <FaCloud />, 
      name: 'API & Deployment', 
      desc: 'REST APIs and cloud deployment strategies',
      color: '#00FFC6'
    }
  ];

  // Tools data
  const tools = [
    { icon: <SiHtml5 />, name: 'HTML' },
    { icon: <SiCss3 />, name: 'CSS' },
    { icon: <SiJavascript />, name: 'JavaScript' },
    { icon: <SiReact />, name: 'React' },
    { icon: <SiNodedotjs />, name: 'Node.js' },
    { icon: <SiExpress />, name: 'Express' },
    { icon: <SiMongodb />, name: 'MongoDB' },
    { icon: <SiGithub />, name: 'GitHub' }
  ];

  // Projects data
  const projects = [
    { 
      icon: <FaCode />, 
      name: 'Portfolio Website', 
      desc: 'Personal portfolio with modern design and animations',
      tech: 'React, CSS3, Framer Motion'
    },
    { 
      icon: <FaLaptopCode />, 
      name: 'E-commerce Platform', 
      desc: 'Full-stack online shopping with payment integration',
      tech: 'MERN Stack, Stripe, JWT'
    },
    { 
      icon: <FaMobile />, 
      name: 'Chat Application', 
      desc: 'Real-time messaging with Socket.io and React',
      tech: 'Socket.io, Node.js, MongoDB'
    },
    { 
      icon: <FaPalette />, 
      name: 'Blog Management', 
      desc: 'Content management system with admin dashboard',
      tech: 'React, Node.js, PostgreSQL'
    },
    { 
      icon: <FaServer />, 
      name: 'Task Tracker API', 
      desc: 'REST API for task management with authentication',
      tech: 'Express.js, JWT, MongoDB'
    },
    { 
      icon: <FaRocket />, 
      name: 'Weather Dashboard', 
      desc: 'Real-time weather data with interactive charts',
      tech: 'React, Chart.js, Weather API'
    }
  ];

  // Benefits data
  const benefits = [
    { 
      icon: <FaCertificate />, 
      name: 'Internship Certificate', 
      desc: 'Industry-recognized web development certification'
    },
    { 
      icon: <SiGithub />, 
      name: 'GitHub Portfolio', 
      desc: 'Professional GitHub profile with live projects'
    },
    { 
      icon: <FaLaptopCode />, 
      name: 'Live Project Experience', 
      desc: 'Hands-on experience with real web applications'
    },
    { 
      icon: <FaGraduationCap />, 
      name: 'LOR', 
      desc: 'Letter of Recommendation from senior developers'
    }
  ];

  // Quotes data
  const quotes = [
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "Web is the new world — start building it.",
    "The best error message is the one that never shows up.",
    "Any code of your own that you haven't looked at for six months might as well have been written by someone else."
  ];

  // Timeline data
  const timelineData = [
    { phase: "Frontend Foundations", desc: "HTML5, CSS3, JavaScript fundamentals" },
    { phase: "React Development", desc: "Component-based design and state management" },
    { phase: "Backend with Node.js", desc: "Server-side JavaScript and Express framework" },
    { phase: "Database Integration", desc: "MongoDB and database modeling" },
    { phase: "REST APIs & Auth", desc: "API development and authentication systems" },
    { phase: "Deployment", desc: "Cloud deployment on Vercel, Render, AWS" }
  ];

  return (
    <PageContainer>

      <Helmet>
        <title>Web Development Internship | BTC Routes</title>
        <meta
          name="description"
          content="Join BTC Routes' Web Development Internship and learn to build modern, responsive websites using HTML, CSS, JavaScript, and React. Get hands-on project experience with real-world applications."
        />
        <meta
          name="keywords"
          content="web development internship, BTC Routes web development, HTML CSS JavaScript training, React internship, frontend development, website projects, MERN stack internship"
        />
        <meta name="author" content="BTC Routes" />
        <link
          rel="canonical"
          href="https://www.btcroutes.com/internship/web-development"
        />

        {/* ✅ Open Graph Meta Tags (for social sharing) */}
        <meta
          property="og:title"
          content="Web Development Internship | BTC Routes"
        />
        <meta
          property="og:description"
          content="Master modern web development with BTC Routes. Learn React, JavaScript, and full-stack web technologies through live projects."
        />
        <meta property="og:image" content="%PUBLIC_URL%/logo2.png" />
        <meta
          property="og:url"
          content="https://www.btcroutes.com/internship/web-development"
        />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="BTC Routes | Web Development Internship"
        />
        <meta
          name="twitter:description"
          content="Build a strong web development foundation with BTC Routes’ live internship program using React, Node.js, and MongoDB."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/logo2.png" />

        {/* ✅ Structured Data (JSON-LD for SEO Rich Snippets) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "EducationalOccupationalProgram",
              "name": "Full-Stack Web Development Internship",
              "description": "Join BTC Routes' Web Development Internship to learn modern web technologies such as React, Node.js, and MongoDB through live hands-on projects.",
              "provider": {
                "@type": "Organization",
                "name": "BTC Routes",
                "url": "https://www.btcroutes.com",
                "logo": "https://www.btcroutes.com/logo2.png"
              },
              "educationalCredentialAwarded": "Certificate of Completion",
              "occupationalCategory": "Web Developer",
              "programPrerequisites": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Bachelor's degree or pursuing"
              },
              "timeToComplete": "P1M",
              "hasCourse": [
                {
                  "@type": "Course",
                  "name": "Frontend Development with React",
                  "description": "Learn HTML, CSS, JavaScript, and React to build responsive user interfaces."
                },
                {
                  "@type": "Course",
                  "name": "Backend Development with Node.js and MongoDB",
                  "description": "Understand server-side logic, RESTful APIs, and database integration using the MERN stack."
                }
              ],
              "url": "https://www.btcroutes.com/internship/web-development"
            }
          `}
        </script>
      </Helmet>

      <GlobalStyle />
      
      {/* Navigation */}
      <NavbarComponent />

      {/* Hero Section */}
      <HeroSection id="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8" data-aos="fade-up">
              <HeroTitle>
                Web Development <br />Internship
                {/* <img src={logo} alt='web development' width={120} /> */}
              </HeroTitle>
              <HeroSubtitle>
                Master <TypedText ref={typedRef}></TypedText>
              </HeroSubtitle>
              <HeroTagline>
                Build fast, scalable, and beautiful web applications.
              </HeroTagline>
              <GoldButton 
                onClick={(e) => {
                  createRipple(e);
                  navigate("/application")
                  // document.querySelector('#apply').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Apply Now
                <Ripple />
              </GoldButton>
            </div>
          </div>
        </div>

        {/* Code Elements */}
        <CodeElement top="20%" left="10%" delay="0s">{"<Code />"}</CodeElement>
        <CodeElement top="30%" right="15%" delay="1s">{"function dev()"}</CodeElement>
        <CodeElement bottom="25%" left="20%" delay="2s">{"const innovation = true;"}</CodeElement>

        {/* Cursor and Lines */}
        <Cursor top="40%" left="25%" />
        <CodeLine top="45%" left="15%" delay="0.5s" style={{width: '200px'}} />
        <CodeLine top="55%" right="20%" delay="1.5s" style={{width: '150px'}} />

        <HeroBackgroundAnimation />
      </HeroSection>

      {/* About Section */}
      <AboutSection id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <SectionHeader>
                <h2>About the Internship</h2>
                <SectionDivider />
              </SectionHeader>
              <AboutText>
                Join our full stack web development internship to learn how to design, 
                develop, and deploy modern web applications from scratch using the latest 
                technologies and best practices.
              </AboutText>
              <AboutText>
                Designed for BE/B.Tech students in IT, CSE, AI, ML, and DS, this program 
                provides hands-on experience with real-world projects and industry-standard 
                development workflows.
              </AboutText>
              <AboutFeatures>
                <li>Real-world website & API development</li>
                <li>Modern frameworks (React, Express, Node.js)</li>
                <li>Database design and integration</li>
                <li>Deployment on cloud platforms</li>
                <li>Team-based live projects</li>
                <li>Git version control and collaboration</li>
              </AboutFeatures>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <CodeVisual>
                <CodeIcon>
                  <FaCode />
                </CodeIcon>
                <CodeGrid />
              </CodeVisual>
            </div>
          </div>
        </div>
      </AboutSection>

      {/* Skills Section */}
      <SkillsSection id="skills">
        <div className="container">
          <SectionHeader center>
            <h2>Skills You'll Learn</h2>
            <SectionDivider center />
            <SectionSubtitle>
              Master the full stack development technologies used by modern companies
            </SectionSubtitle>
          </SectionHeader>
          <div className="row g-4">
            {skills.map((skill, index) => (
              <div key={index} className="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay={index * 100}>
                <SkillCard>
                  <SkillIcon color={skill.color}>
                    {skill.icon}
                  </SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                  <SkillDescription>{skill.desc}</SkillDescription>
                </SkillCard>
              </div>
            ))}
          </div>
        </div>
        <SkillsBackground />
      </SkillsSection>

      {/* Curriculum Section */}
      <CurriculumSection id="curriculum">
        <div className="container">
          <SectionHeader center>
            <h2>Learning Roadmap</h2>
            <SectionDivider center />
          </SectionHeader>
          <Timeline>
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index} 
                even={index % 2 !== 0}
                data-aos="fade-up" 
                data-aos-delay={index * 200}
              >
                <TimelinePhase>{item.phase}</TimelinePhase>
                <TimelineDesc>{item.desc}</TimelineDesc>
                <TimelineConnector even={index % 2 !== 0} />
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </CurriculumSection>

      {/* Tools Section */}
      <ToolsSection id="tools">
        <div className="container">
          <SectionHeader center>
            <h2>Tools & Technologies</h2>
            <SectionDivider center />
          </SectionHeader>
          <div className="row g-4 justify-content-center">
            {tools.map((tool, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3" data-aos="flip-up" data-aos-delay={index * 100}>
                <ToolCard>
                  <ToolIcon>
                    {tool.icon}
                  </ToolIcon>
                  <ToolName>{tool.name}</ToolName>
                </ToolCard>
              </div>
            ))}
          </div>
        </div>
      </ToolsSection>

      {/* Mentorship Section */}
      <MentorshipSection>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center" data-aos="fade-up-right">
              <MentorshipContent>
                <QuoteIcon><FaQuoteLeft /></QuoteIcon>
                <MentorshipText>
                  "Learn under mentors who build real-world applications using MERN stack 
                  and modern cloud tools. Get personalized code reviews and career guidance 
                  from experienced full-stack developers."
                </MentorshipText>
                {/* <MentorStats>
                  <Stat>
                    <StatNumber>8+</StatNumber>
                    <span>Years Experience</span>
                  </Stat>
                  <Stat>
                    <StatNumber>50+</StatNumber>
                    <span>Websites Built</span>
                  </Stat>
                  <Stat>
                    <StatNumber>100+</StatNumber>
                    <span>Students Mentored</span>
                  </Stat>
                </MentorStats> */}
              </MentorshipContent>
            </div>
          </div>
        </div>
        <MentorshipBackground />
      </MentorshipSection>

      {/* Projects Section */}
      <ProjectsSection id="projects">
        <div className="container">
          <SectionHeader center>
            <h2>Live Projects</h2>
            <SectionDivider center />
            <SectionSubtitle>
              Build real-world web applications that showcase your full-stack skills
            </SectionSubtitle>
          </SectionHeader>
          <div className="row g-4">
            {projects.map((project, index) => (
              <div key={index} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <ProjectCard>
                  <ProjectIcon>
                    {project.icon}
                  </ProjectIcon>
                  <ProjectTitle>{project.name}</ProjectTitle>
                  <ProjectDescription>{project.desc}</ProjectDescription>
                  <ProjectTech>{project.tech}</ProjectTech>
                </ProjectCard>
              </div>
            ))}
          </div>
        </div>
      </ProjectsSection>

      {/* Eligibility Section */}
      <EligibilitySection>
        <div className="container">
          <SectionHeader center>
            <h2>Duration, Mode & Eligibility</h2>
            <SectionDivider center />
          </SectionHeader>
          <div className="row g-4" data-aos="zoom-in">
            <div className="col-md-6 col-lg-3">
              <InfoCard>
                <InfoIcon><FaCalendarAlt /></InfoIcon>
                <InfoTitle>Duration</InfoTitle>
                <InfoValue>1-3 Months</InfoValue>
                <InfoSubtext>Flexible Program</InfoSubtext>
              </InfoCard>
            </div>
            <div className="col-md-6 col-lg-3">
              <InfoCard>
                <InfoIcon><FaLaptopCode /></InfoIcon>
                <InfoTitle>Mode</InfoTitle>
                <InfoValue>Online/Hybrid/Offline</InfoValue>
                <InfoSubtext>Remote Learning</InfoSubtext>
              </InfoCard>
            </div>
            <div className="col-md-6 col-lg-3">
              <InfoCard>
                <InfoIcon><FaUsers /></InfoIcon>
                <InfoTitle>Eligibility</InfoTitle>
                <InfoValue>IT/CSE/AI/ML/DS</InfoValue>
                <InfoSubtext>BE/B.Tech/B.Sc Students</InfoSubtext>
              </InfoCard>
            </div>
            <div className="col-md-6 col-lg-3">
              <InfoCard>
                <InfoIcon><BiLogoVisualStudio /></InfoIcon>
                <InfoTitle>Tools</InfoTitle>
                <InfoValue>VS Code, GitHub</InfoValue>
                <InfoSubtext>Node.js, React</InfoSubtext>
              </InfoCard>
            </div>
          </div>
        </div>
      </EligibilitySection>

      {/* Benefits Section */}
      <BenefitsSection>
        <div className="container">
          <SectionHeader center>
            <h2>Certification & Benefits</h2>
            <SectionDivider center />
          </SectionHeader>
          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="col-md-6 col-lg-3" data-aos="fade-right" data-aos-delay={index * 100}>
                <BenefitCard>
                  <BenefitIcon>
                    {benefit.icon}
                  </BenefitIcon>
                  <BenefitTitle>{benefit.name}</BenefitTitle>
                  <BenefitDescription>{benefit.desc}</BenefitDescription>
                </BenefitCard>
              </div>
            ))}
          </div>
        </div>
      </BenefitsSection>

      {/* Quotes Section */}
      <QuotesSection>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center" data-aos="fade-in">
              <QuotesContent>
                <QuoteText>
                  {quotes[0]}
                </QuoteText>
                <QuoteRotation>
                  {quotes.slice(1).map((quote, index) => (
                    <RotatingQuote key={index} delay={`${(index + 1) * 3}s`}>
                      {quote}
                    </RotatingQuote>
                  ))}
                </QuoteRotation>
              </QuotesContent>
            </div>
          </div>
        </div>
        <CodeBackground />
      </QuotesSection>

      {/* Apply Section */}
      <ApplySection id="apply">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <ApplyTitle>Join the Web Revolution</ApplyTitle>
              <ApplySubtitle>
                Join the web revolution. Build, deploy, and transform your ideas 
                into production-ready applications that solve real-world problems.
              </ApplySubtitle>
              <GoldButton 
                large
                onClick={createRipple}
              >
              <Link to="/application" className='text-decoration-none'>
                Apply Now
              </Link>  
                <Ripple />
              </GoldButton>
            </div>
          </div>
        </div>
        <ApplyBackgroundAnimation />
      </ApplySection>

      {/* Footer */}
      <Footer>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <FooterText>
                &copy; 2025 Web Development Internship. All rights reserved.
              </FooterText>
            </div>
            <div className="col-md-6 text-md-end">
              <FooterLinks>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-and-condition">Terms of Service</Link>
                <Link to="/contact">Contact Us</Link>
              </FooterLinks>
            </div>
          </div>
        </div>
      </Footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <ScrollToTop onClick={scrollToTop}>
          ↑
        </ScrollToTop>
      )}
    </PageContainer>
  );
};

export default WebDevelopmentInternship;