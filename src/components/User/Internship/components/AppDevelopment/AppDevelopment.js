import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed  from 'typed.js';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { 
  FaAndroid,
  FaApple,
  FaMobile,
  FaFire,
  FaCode,
  FaPaintBrush,
  FaRocket,
  FaUserTie,
  FaCertificate,
  FaGraduationCap,
  FaCalendarAlt,
  FaUsers,
  FaLaptopCode,
  FaQuoteLeft,
  FaAppStoreIos,
  FaFigma,
  FaDatabase
} from 'react-icons/fa';
import { 
  SiKotlin,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiAndroidstudio,
  SiXcode,
  SiPostman
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
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #F5F7FF;
    overflow-x: hidden;
    background: #121212;
  }

  html {
    scroll-padding-top: 80px;
  }

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1E1E2F;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(#00C6FF, #0072FF);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(#0072FF, #00C6FF);
  }
`;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const floatReverse = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(-5deg); }
`;

const rippleAnimation = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

const backgroundShimmer = keyframes`
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px #00C6FF; }
  50% { box-shadow: 0 0 30px #0072FF, 0 0 40px #00C6FF; }
`;

const colorPulse = keyframes`
  0%, 100% { border-color: #FF6B6B; }
  50% { border-color: #00C6FF; }
`;

// const neonGlow = keyframes`
//   0%, 100% { 
//     text-shadow: 0 0 10px #00C6FF, 0 0 20px #00C6FF;
//   }
//   50% { 
//     text-shadow: 0 0 15px #0072FF, 0 0 30px #0072FF;
//   }
// `;

const quoteRotate = keyframes`
  0%, 25% { opacity: 1; transform: translateY(0); }
  30%, 100% { opacity: 0; transform: translateY(-20px); }
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
    background: linear-gradient(135deg, #00C6FF, #0072FF);
    // background:black;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(0, 198, 255, 0.3);
  }
`;

const SectionDivider = styled.div`
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #0072FF, #FF6B6B);
  border-radius: 2px;
  margin: ${props => props.center ? '0 auto' : '0'};
  box-shadow: 0 0 15px rgba(255, 107, 107, 0.3);
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #F5F7FF;
  margin-top: 1.5rem;
  opacity: 0.9;
`;

// Hero Section
const HeroSection = styled(Section)`
  background: linear-gradient(135deg, #00C6FF, #0072FF);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: #F5F7FF;
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
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-shadow: 0 0 30px rgba(0, 114, 255, 0.5);

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const HeroSubtitle = styled.div`
  font-size: 2.2rem;
  margin-bottom: 2rem;
  font-weight: 600;
  min-height: 3rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const TypedText = styled.span`
  color: #FF6B6B;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
`;

const HeroTagline = styled.p`
  font-size: 1.4rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  font-weight: 500;
`;

// Buttons
const PrimaryButton = styled.button`
  background: linear-gradient(90deg, #0072FF, #00C6FF);
  border: none;
  padding: ${props => props.large ? '18px 50px' : '15px 40px'};
  border-radius: 50px;
  font-weight: 600;
  font-size: ${props => props.large ? '1.3rem' : '1.1rem'};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 0 25px rgba(0, 114, 255, 0.4);
  color: white;
  animation: ${glowPulse} 2s ease-in-out infinite;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 35px rgba(0, 114, 255, 0.6);
    background: linear-gradient(90deg, #00C6FF, #0072FF);
  }
`;

const CoralButton = styled(PrimaryButton)`
  background: linear-gradient(90deg, #FF6B6B, #FF8E8E);
  animation: none;
  box-shadow: 0 0 25px rgba(255, 107, 107, 0.4);

  &:hover {
    background: linear-gradient(90deg, #00C6FF, #0072FF);
    box-shadow: 0 0 35px rgba(0, 198, 255, 0.6);
  }
`;

const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ${rippleAnimation} 0.6s linear;
  pointer-events: none;
`;

// Floating Phone Mockups
const PhoneMockup = styled.div`
  position: absolute;
  width: 250px;
  height: 500px;
  background: #1E1E2F;
  border-radius: 40px;
  border: 3px solid #00C6FF;
  box-shadow: 0 0 50px rgba(0, 198, 255, 0.4);
  overflow: hidden;
  animation: ${float} 6s ease-in-out infinite;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 6px;
    background: #00C6FF;
    border-radius: 3px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    background: #0072FF;
    border-radius: 50%;
    box-shadow: 0 0 20px #0072FF;
  }
`;

const AndroidPhone = styled(PhoneMockup)`
  top: 10%;
  right: 10%;
  animation-delay: 0s;
`;

const IOSPhone = styled(PhoneMockup)`
  bottom: 10%;
  left: 10%;
  animation: ${floatReverse} 7s ease-in-out infinite;
  border-color: #FF6B6B;
  box-shadow: 0 0 50px rgba(255, 107, 107, 0.4);

  &::after {
    background: #FF6B6B;
    box-shadow: 0 0 20px #FF6B6B;
  }
`;

const PhoneScreen = styled.div`
  position: absolute;
  top: 30px;
  left: 10px;
  right: 10px;
  bottom: 80px;
  background: linear-gradient(45deg, #0072FF, #00C6FF);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  padding: 20px;
`;

// Hero Background Animation
const HeroBackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 198, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(0, 114, 255, 0.1) 0%, transparent 50%);
  animation: ${backgroundShimmer} 8s ease-in-out infinite;
  z-index: 1;
`;

// About Section
const AboutSection = styled(Section)`
  background: #1E1E2F;
  position: relative;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #F5F7FF;
  opacity: 0.9;
  line-height: 1.8;
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
    color: #F5F7FF;

    &::before {
      content: '📱';
      position: absolute;
      left: 0;
      font-size: 1.2rem;
    }
  }
`;

const AppVisual = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppIconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
`;

const AppIcon = styled.div`
  background: linear-gradient(135deg, #00C6FF, #0072FF);
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  box-shadow: 0 0 30px rgba(0, 198, 255, 0.4);

  svg {
    font-size: 2rem;
    color: white;
  }
`;

// Skills Section
const SkillsSection = styled(Section)`
  position: relative;
  background: linear-gradient(135deg, rgba(0, 198, 255, 0.05), rgba(0, 114, 255, 0.05));
  overflow: hidden;
`;

const SkillCard = styled.div`
  background: rgba(30, 30, 47, 0.8);
  backdrop-filter: blur(10px);
  padding: 2.5rem 1.5rem;
  border-radius: 20px;
  text-align: center;
  border: 2px solid transparent;
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
    background: linear-gradient(90deg, transparent, rgba(0, 198, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: #00C6FF;
    box-shadow: 0 0 30px rgba(0, 198, 255, 0.3);

    &::before {
      left: 100%;
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.color || '#00C6FF'};
  text-shadow: 0 0 20px ${props => props.color || '#00C6FF'};
`;

const SkillName = styled.h5`
  font-weight: 700;
  color: #F5F7FF;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const SkillDescription = styled.p`
  color: #F5F7FF;
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
    radial-gradient(circle at 10% 20%, rgba(0, 198, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(255, 107, 107, 0.1) 0%, transparent 50%);
  z-index: -1;
`;

// Curriculum Section
const CurriculumSection = styled(Section)`
  // background: linear-gradient(135deg, #0072FF, #00C6FF);
  // background: linear-gradient(135deg, #56ab2f, #a8e063);
  // background: linear-gradient(135deg, #A8FF78, #78FFD6);
background: linear-gradient(135deg, #E0C3FC, #8EC5FC);


  color: #F5F7FF;
  color:black;
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
  color: #FF6B6B;
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
`;

const TimelineDesc = styled.div`
  opacity: 0.95;
  font-size: 1.1rem;
`;

const TimelineConnector = styled.div`
  position: absolute;
  top: 10px;
  width: 20px;
  height: 20px;
  background: #FF6B6B;
  border-radius: 50%;
  box-shadow: 0 0 20px #FF6B6B;
  right: ${props => props.even ? 'auto' : '-10px'};
  left: ${props => props.even ? '-10px' : 'auto'};

  @media (max-width: 768px) {
    left: 10px !important;
    right: auto !important;
  }
`;

// Tools Section
const ToolsSection = styled(Section)`
  background: #F5F7FF;
  color: #0A0A23;
`;

const ToolCard = styled.div`
  text-align: center;
  padding: 2.5rem 1rem;
  transition: all 0.3s ease;
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px #00C6FF;
  }
`;

const ToolIcon = styled.div`
  font-size: 3.5rem;
  color: #0072FF;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  ${ToolCard}:hover & {
    color: #00C6FF;
    filter: drop-shadow(0 0 10px #00C6FF);
  }
`;

const ToolName = styled.span`
  font-weight: 600;
  color: #0A0A23;
  font-size: 1.1rem;
`;

// Mentorship Section
const MentorshipSection = styled(Section)`
  background: linear-gradient(135deg, #1E1E2F, #121212);
  position: relative;
`;

const MentorshipContent = styled.div`
  background: rgba(30, 30, 47, 0.6);
  backdrop-filter: blur(10px);
  padding: 4rem 3rem;
  border-radius: 25px;
  border: 1px solid rgba(0, 198, 255, 0.2);
  position: relative;
  box-shadow: 0 0 50px rgba(0, 198, 255, 0.1);
`;

const QuoteIcon = styled.div`
  font-size: 2.5rem;
  color: #00C6FF;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px #00C6FF;
`;

const MentorshipText = styled.p`
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 3rem;
  color: #F5F7FF;
  line-height: 1.8;
  text-align: center;
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
//   color: #00C6FF;
//   margin-bottom: 0.5rem;
//   text-shadow: 0 0 20px #00C6FF;
// `;

const MentorshipBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><circle cx="200" cy="200" r="100" fill="%2300C6FF" fill-opacity="0.05"/><circle cx="800" cy="800" r="150" fill="%23FF6B6B" fill-opacity="0.05"/></svg>');
  z-index: -1;
`;

// Projects Section
const ProjectsSection = styled(Section)`
  background: #121212;
  position: relative;
`;

const ProjectCard = styled.div`
  background: rgba(30, 30, 47, 0.8);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  border: 2px solid #FF6B6B;
  transition: all 0.3s ease;
  height: 100%;
  animation: ${colorPulse} 3s ease-in-out infinite;

  &:hover {
    transform: translateY(-10px);
    border-color: #00C6FF;
    box-shadow: 0 0 40px rgba(0, 198, 255, 0.4);
    animation: none;
  }
`;

const ProjectIcon = styled.div`
  font-size: 3rem;
  color: #00C6FF;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px #00C6FF;
`;

const ProjectTitle = styled.h5`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #F5F7FF;
  font-size: 1.4rem;
`;

const ProjectDescription = styled.p`
  color: #F5F7FF;
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ProjectTech = styled.div`
  font-size: 0.9rem;
  color: #00C6FF;
  font-weight: 600;
  text-shadow: 0 0 10px #00C6FF;
`;

// Eligibility Section
const EligibilitySection = styled(Section)`
  background: #1E1E2F;
`;

const InfoCard = styled.div`
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: rgba(0, 198, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 198, 255, 0.3);

  &:hover {
    transform: translateY(-5px);
    background: rgba(0, 198, 255, 0.2);
    box-shadow: 0 0 30px rgba(0, 198, 255, 0.3);
  }
`;

const InfoIcon = styled.div`
  font-size: 2.5rem;
  color: #00C6FF;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px #00C6FF;
`;

const InfoTitle = styled.h5`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #F5F7FF;
  font-size: 1.3rem;
`;

const InfoValue = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #00C6FF;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px #00C6FF;
`;

const InfoSubtext = styled.span`
  color: #F5F7FF;
  opacity: 0.8;
  font-size: 0.95rem;
`;

// Benefits Section
const BenefitsSection = styled(Section)`
  // background: linear-gradient(135deg, #0072FF, #00C6FF);
  // background: linear-gradient(135deg, #D4FC79, #96E6A1);
  background: linear-gradient(135deg, #F6D8FF, #DCEBFF);
  color: #F5F7FF;
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
    border-color: #FF6B6B;
    box-shadow: 0 0 40px rgba(255, 107, 107, 0.4);

    &::before {
      transform: rotate(45deg) translate(50%, 50%);
    }
  }
`;

const BenefitIcon = styled.div`
  font-size: 3rem;
  color: #FF6B6B;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 20px #FF6B6B;
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
`;

// Quotes Section
const QuotesSection = styled(Section)`
  background: #121212;
  position: relative;
`;

const QuotesContent = styled.div`
  padding: 5rem 2rem;
  text-align: center;
`;

const QuoteText = styled.h3`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
  line-height: 1.4;
  color: #F5F7FF;
  text-shadow: 0 0 20px rgba(0, 198, 255, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const QuoteRotation = styled.div`
  font-size: 1.4rem;
  opacity: 0.9;
  min-height: 2rem;
`;

const RotatingQuote = styled.span`
  display: block;
  animation: ${quoteRotate} 12s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const QuotesBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(45deg, transparent 48%, rgba(0, 198, 255, 0.05) 50%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, rgba(255, 107, 107, 0.05) 50%, transparent 52%);
  background-size: 50px 50px;
  z-index: -1;
`;

// Apply Section
const ApplySection = styled(Section)`
  background: linear-gradient(135deg, #0072FF, #00C6FF);
  color: #F5F7FF;
  text-align: center;
  position: relative;
`;

const ApplyTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-shadow: 0 0 30px rgba(0, 114, 255, 0.5);

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
//   color: #FF6B6B;
//   text-shadow: 0 0 20px #FF6B6B;
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
  background: #1E1E2F;
  color: #F5F7FF;
  padding: 3rem 0;
  text-align: center;
  border-top: 1px solid rgba(0, 198, 255, 0.2);
`;

const FooterText = styled.p`
  margin: 0;
  opacity: 0.8;
  font-size: 1.1rem;
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
    color: #F5F7FF;
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      opacity: 1;
      color: #00C6FF;
      text-shadow: 0 0 10px #00C6FF;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #00C6FF, #0072FF);
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
  background: linear-gradient(135deg, #00C6FF, #0072FF);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 198, 255, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(0, 198, 255, 0.6);
  }
`;

const AppDevelopment = () => {
  const typedRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-out-cubic'
    });

    // Initialize Typed.js
    const typed = new Typed(typedRef.current, {
      strings: ['Android.', 'iOS.', 'Kotlin.', 'Flutter.', 'Dart.', 'Mobile Apps.'],
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
      icon: <SiKotlin />, 
      name: 'Kotlin & Android Studio', 
      desc: 'Native Android development with modern Kotlin',
      color: '#7F52FF'
    },
    { 
      icon: <SiFlutter />, 
      name: 'Flutter Framework', 
      desc: 'Cross-platform apps with Flutter SDK',
      color: '#02539A'
    },
    { 
      icon: <SiDart />, 
      name: 'Dart Programming', 
      desc: 'Master Dart for Flutter development',
      color: '#0175C2'
    },
    { 
      icon: <SiFirebase />, 
      name: 'Firebase Integration', 
      desc: 'Backend services and real-time databases',
      color: '#FFCA28'
    },
    { 
      icon: <FaCode />, 
      name: 'REST API Development', 
      desc: 'Connect apps with web services and APIs',
      color: '#00C6FF'
    },
    { 
      icon: <FaPaintBrush />, 
      name: 'UI/UX Design Principles', 
      desc: 'Create beautiful and intuitive interfaces',
      color: '#FF6B6B'
    }
  ];

  // Tools data
  const tools = [
    { icon: <SiAndroidstudio />, name: 'Android Studio' },
    { icon: <SiXcode />, name: 'Xcode' },
    { icon: <SiFlutter />, name: 'Flutter SDK' },
    { icon: <FaFigma />, name: 'Figma' },
    { icon: <SiFirebase />, name: 'Firebase' },
    { icon: <SiPostman />, name: 'Postman' }
  ];

  // Projects data
  const projects = [
    { 
      icon: <FaMobile />, 
      name: 'Chat Application', 
      desc: 'Real-time messaging app with Firebase',
      tech: 'Flutter, Firebase, Dart'
    },
    { 
      icon: <FaRocket />, 
      name: 'Food Delivery App', 
      desc: 'Complete food ordering and delivery system',
      tech: 'Kotlin, Retrofit, Room DB'
    },
    { 
      icon: <FaFire />, 
      name: 'Fitness Tracker', 
      desc: 'Workout tracking with health integration',
      tech: 'Flutter, Health APIs, SQLite'
    },
    { 
      icon: <FaDatabase />, 
      name: 'Expense Manager', 
      desc: 'Personal finance and budget tracking',
      tech: 'Kotlin, Room, MPAndroidChart'
    },
    { 
      icon: <FaAppStoreIos />, 
      name: 'E-Commerce App', 
      desc: 'Full-featured mobile shopping experience',
      tech: 'Flutter, Stripe, Node.js'
    }
  ];

  // Benefits data
  const benefits = [
    { 
      icon: <FaCertificate />, 
      name: 'Internship Certificate', 
      desc: 'Industry-recognized completion certificate'
    },
    { 
      icon: <FaLaptopCode />, 
      name: 'Real App Experience', 
      desc: 'Hands-on experience with production apps'
    },
    { 
      icon: <FaUserTie />, 
      name: 'Portfolio Boost', 
      desc: 'Enhance your professional portfolio'
    },
    { 
      icon: <FaGraduationCap />, 
      name: 'LOR', 
      desc: 'Letter of Recommendation from mentors'
    }
  ];

  // Quotes data
  const quotes = [
    "Every great app starts with a single line of code.",
    "Build experiences that fit in every hand.",
    "Your app could be the next big thing.",
    "Transform ideas into mobile reality.",
    "Code once, run everywhere with Flutter."
  ];

  // Timeline data
  const timelineData = [
    { phase: "App Dev Basics & Kotlin", desc: "Mobile fundamentals and Kotlin setup" },
    { phase: "Flutter & Dart UI", desc: "Cross-platform UI creation with Flutter" },
    { phase: "API Integration", desc: "REST APIs and backend connections" },
    { phase: "Firebase Services", desc: "Authentication, storage, and databases" },
    { phase: "Testing & Optimization", desc: "App testing, debugging, and performance" },
    { phase: "Live Deployment", desc: "Publish to Play Store and App Store" }
  ];

  return (
    <PageContainer>


      <Helmet>
        <title>App Development Internship | BTC Routes</title>
        <meta
          name="description"
          content="Join BTC Routes' App Development Internship and learn to build Android and iOS apps using React Native and Flutter with real-world projects and expert guidance."
        />
        <meta
          name="keywords"
          content="BTC Routes, app development internship, mobile app internship, React Native, Flutter, Android development, iOS development, mobile app training"
        />
        <meta name="author" content="BTC Routes" />
        <link
          rel="canonical"
          href="https://www.btcroutes.com/internship/app-development"
        />

        {/* ✅ Open Graph Meta Tags */}
        <meta property="og:title" content="App Development Internship | BTC Routes" />
        <meta
          property="og:description"
          content="Master React Native and Flutter in BTC Routes' App Development Internship. Build professional Android and iOS apps through hands-on projects."
        />
        <meta property="og:image" content="%PUBLIC_URL%/logo2.png" />
        <meta property="og:url" content="https://www.btcroutes.com/internship/app-development" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BTC Routes | App Development Internship" />
        <meta
          name="twitter:description"
          content="Learn mobile app development with BTC Routes. Create Android and iOS apps using React Native and Flutter with expert mentors."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/logo2.png" />

        {/* ✅ Structured Data (JSON-LD for Google Rich Results) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "App Development Internship",
              "description": "Join BTC Routes' App Development Internship and learn to build Android and iOS apps using React Native and Flutter with real-world projects and expert guidance.",
              "provider": {
                "@type": "Organization",
                "name": "BTC Routes",
                "url": "https://www.btcroutes.com",
                "logo": "https://www.btcroutes.com/logo2.png"
              },
              "courseMode": "Online",
              "educationalCredentialAwarded": "Internship Certificate",
              "teaches": ["React Native", "Flutter", "Android App Development", "iOS App Development"],
              "url": "https://www.btcroutes.com/internship/app-development"
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
                App Development <br />Internship
              </HeroTitle>
              <HeroSubtitle>
                Master <TypedText ref={typedRef}></TypedText>
              </HeroSubtitle>
              <HeroTagline>
                Turn your ideas into powerful mobile experiences.
              </HeroTagline>
              <CoralButton 
                onClick={(e) => {
                  createRipple(e);
                  navigate("/application")
                  // document.querySelector('#apply').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Apply Now
                <Ripple />
              </CoralButton>
            </div>
          </div>
        </div>

        {/* Floating Phone Mockups */}
        <AndroidPhone>
          <PhoneScreen>Android App</PhoneScreen>
        </AndroidPhone>
        <IOSPhone>
          <PhoneScreen>iOS App</PhoneScreen>
        </IOSPhone>

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
                Our App Development Internship is designed for BE/B.Tech students in 
                IT, CSE, AI, ML, and DS who want to master mobile app development. 
                This intensive program provides hands-on experience in building 
                real-world Android and iOS applications using modern technologies.
              </AboutText>
              <AboutText>
                You'll learn to create native Android apps with Kotlin and cross-platform 
                apps with Flutter & Dart. Work on live projects, collaborate with peers, 
                and receive mentorship from industry experts who've built production-grade apps.
              </AboutText>
              <AboutFeatures>
                <li>Kotlin for native Android development</li>
                <li>Flutter & Dart for cross-platform apps</li>
                <li>App UI/UX design and optimization</li>
                <li>Firebase integration and backend services</li>
                <li>App Store deployment and publishing</li>
              </AboutFeatures>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <AppVisual>
                <AppIconGrid>
                  <AppIcon delay="0s">
                    <FaAndroid />
                  </AppIcon>
                  <AppIcon delay="1s">
                    <FaApple />
                  </AppIcon>
                  <AppIcon delay="2s">
                    <SiFlutter />
                  </AppIcon>
                  <AppIcon delay="3s">
                    <SiKotlin />
                  </AppIcon>
                </AppIconGrid>
              </AppVisual>
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
              Master the essential technologies for modern app development
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
            <h2>Internship Structure</h2>
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
              <div key={index} className="col-6 col-md-4 col-lg-2" data-aos="flip-up" data-aos-delay={index * 100}>
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
                  "Learn app development directly from industry professionals who've built 
                  production-grade Android and iOS apps. Understand every stage — from 
                  wireframing to publishing on app stores."
                </MentorshipText>
                {/* <MentorStats>
                  <Stat>
                    <StatNumber>8+</StatNumber>
                    <span>Years Experience</span>
                  </Stat>
                  <Stat>
                    <StatNumber>100+</StatNumber>
                    <span>Apps Published</span>
                  </Stat>
                  <Stat>
                    <StatNumber>500+</StatNumber>
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
            <h2>Project Work</h2>
            <SectionDivider center />
            <SectionSubtitle>
              Build real-world applications that showcase your skills
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
                <InfoIcon><FaCode /></InfoIcon>
                <InfoTitle>Prerequisite</InfoTitle>
                <InfoValue>Basic Programming</InfoValue>
                <InfoSubtext>Required Knowledge</InfoSubtext>
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
                <BenefitCard className='text-dark'>
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
        <QuotesBackground />
      </QuotesSection>

      {/* Apply Section */}
      <ApplySection id="apply">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <ApplyTitle>Start Your App Journey</ApplyTitle>
              <ApplySubtitle>
                Begin your journey as an app innovator. Apply today to build real apps 
                that make an impact and transform your coding skills into mobile expertise.
              </ApplySubtitle>
              <CoralButton 
                large
                onClick={createRipple}
              >
              <Link to="/application" className='text-decoration-none'>
                Apply Now
              </Link>  
                <Ripple />
              </CoralButton>

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
                &copy; 2025 App Development Internship. All rights reserved.
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

export default AppDevelopment;