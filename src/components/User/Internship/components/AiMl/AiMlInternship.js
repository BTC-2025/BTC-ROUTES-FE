import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed from 'typed.js';
import { RiBook2Line } from "react-icons/ri";
import { SiKeras } from "react-icons/si";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import {
  FaBrain,
  FaPython,
  FaRobot,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaUserTie,
  FaCertificate,
  FaGraduationCap,
  FaCalendarAlt,
  FaUsers,
  FaLaptopCode,
  FaQuoteLeft,
  FaRocket,
  FaNetworkWired,
  FaMicrochip
} from 'react-icons/fa';
import {
  SiTensorflow,
  SiPytorch,
  SiPandas,
  SiNumpy,
  SiFlask
} from 'react-icons/si';
import NavbarComponent from '../Navbarcomponent';

// Color Palette
const COLORS = {
  gunmetal: '#474448',
  shadowGrey: '#2d232e',
  bone: '#e0ddcf',
  taupeGrey: '#534b52',
  parchment: '#f1f0ea',
  accent: '#8a4fff', // Added accent color for highlights
  accent2: '#ff6b8b' // Secondary accent
};

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    color: ${COLORS.bone};
    overflow-x: hidden;
    background: ${COLORS.shadowGrey};
  }

  html {
    scroll-padding-top: 80px;
  }

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${COLORS.gunmetal};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(${COLORS.accent}, ${COLORS.accent2});
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(${COLORS.accent2}, ${COLORS.accent});
  }
`;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
`;

const neuralPulse = keyframes`
  0%, 100% { 
    opacity: 0.5;
    transform: scale(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.2);
  }
`;

const rippleAnimation = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

// const backgroundShimmer = keyframes`
//   0% { background-position: -200% center; }
//   100% { background-position: 200% center; }
// `;

// const glowPulse = keyframes`
//   0%, 100% { 
//     box-shadow: 0 0 15px ${COLORS.accent}66;
//   }
//   50% { 
//     box-shadow: 0 0 25px ${COLORS.accent2}66;
//   }
// `;

const circuitFlow = keyframes`
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
`;

const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

// Main Container
const PageContainer = styled.div`
  position: relative;
`;

// Section Base Styles
const Section = styled.section`
  padding: 100px 0;
  position: relative;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 60px;
  text-align: ${props => props.center ? 'center' : 'left'};

  h2 {
    font-size: 3rem;
    font-weight: 700;
    color: ${COLORS.parchment};
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2});
      border-radius: 2px;
      ${props => props.center && 'left: 50%; transform: translateX(-50%);'}
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2.2rem;
    }
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${COLORS.bone};
  margin-top: 1.5rem;
  opacity: 0.9;
  max-width: 600px;
  ${props => props.center && 'margin-left: auto; margin-right: auto;'}
`;

// Hero Section
const HeroSection = styled(Section)`
  background: linear-gradient(135deg, ${COLORS.shadowGrey}, ${COLORS.gunmetal});
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
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
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: ${COLORS.parchment};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 0;
    width: 6px;
    height: 100%;
    background: linear-gradient(${COLORS.accent}, ${COLORS.accent2});
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    
    &::before {
      left: -10px;
    }
  }
`;

const HeroSubtitle = styled.div`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 500;
  min-height: 3rem;
  color: ${COLORS.bone};

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TypedText = styled.span`
  color: ${COLORS.accent};
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${COLORS.accent2};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
`;

const HeroTagline = styled.p`
  font-size: 1.4rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  font-weight: 400;
  max-width: 600px;
  color: ${COLORS.bone};
  line-height: 1.8;
`;

// Buttons
const PrimaryButton = styled.button`
  background: linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2});
  border: none;
  padding: ${props => props.large ? '18px 50px' : '15px 40px'};
  border-radius: 8px;
  font-weight: 700;
  font-size: ${props => props.large ? '1.3rem' : '1.1rem'};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  color: ${COLORS.parchment};
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, ${COLORS.accent2}, ${COLORS.accent});
    transition: left 0.4s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(138, 79, 255, 0.3);

    &::before {
      left: 0;
    }
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

// Circuit Animation
const CircuitNode = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${COLORS.accent};
  border-radius: 50%;
  animation: ${neuralPulse} 2s ease-in-out infinite;
  box-shadow: 0 0 15px ${COLORS.accent};
  z-index: 1;

  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  animation-delay: ${props => props.delay || '0s'};
`;

const CircuitConnection = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  path {
    stroke: ${COLORS.taupeGrey};
    stroke-width: 1.5;
    fill: none;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${circuitFlow} 15s linear infinite;
  }
`;

// Hero Background
const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, ${COLORS.accent}11 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, ${COLORS.accent2}11 0%, transparent 50%);
  z-index: 1;
`;

const PatternOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(${COLORS.gunmetal} 1px, transparent 1px),
    linear-gradient(90deg, ${COLORS.gunmetal} 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.1;
  z-index: 1;
`;

// About Section
const AboutSection = styled(Section)`
  background: ${COLORS.gunmetal};
  position: relative;
  overflow: hidden;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: ${COLORS.bone};
  opacity: 0.9;
  line-height: 1.8;
`;

const AboutFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;

  li {
    padding: 0.8rem 0;
    padding-left: 2.5rem;
    position: relative;
    font-size: 1.1rem;
    color: ${COLORS.bone};
    border-bottom: 1px solid ${COLORS.taupeGrey}40;

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: ${COLORS.accent};
      font-size: 1.5rem;
      line-height: 1;
    }
  }
`;

const AIVisual = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrainIcon = styled.div`
  font-size: 8rem;
  color: ${COLORS.accent};
  animation: ${float} 6s ease-in-out infinite;
  text-shadow: 0 0 30px ${COLORS.accent}40;
  position: relative;
  z-index: 2;
`;

const CircuitGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(90deg, transparent 49%, ${COLORS.accent}20 50%, transparent 51%),
      linear-gradient(transparent 49%, ${COLORS.accent}20 50%, transparent 51%);
    background-size: 40px 40px;
  }
`;

// Skills Section
const SkillsSection = styled(Section)`
  background: linear-gradient(135deg, ${COLORS.shadowGrey}, ${COLORS.gunmetal});
  position: relative;
  overflow: hidden;
`;

const SkillCard = styled.div`
  background: ${COLORS.taupeGrey};
  padding: 2.5rem 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid ${COLORS.taupeGrey};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2});
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: ${COLORS.accent};

    &::before {
      transform: scaleX(1);
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.color || COLORS.accent};
`;

const SkillName = styled.h5`
  font-weight: 600;
  color: ${COLORS.parchment};
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const SkillDescription = styled.p`
  color: ${COLORS.bone};
  opacity: 0.8;
  font-size: 0.95rem;
  line-height: 1.6;
`;

// Curriculum Section
const CurriculumSection = styled(Section)`
  background: ${COLORS.gunmetal};
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
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.accent2});
    border-radius: 1px;

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
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${COLORS.parchment};
`;

const TimelineDesc = styled.div`
  color: ${COLORS.bone};
  opacity: 0.9;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const TimelineConnector = styled.div`
  position: absolute;
  top: 10px;
  width: 20px;
  height: 20px;
  background: ${COLORS.accent};
  border-radius: 50%;
  box-shadow: 0 0 15px ${COLORS.accent};
  right: ${props => props.even ? 'auto' : '-10px'};
  left: ${props => props.even ? '-10px' : 'auto'};

  @media (max-width: 768px) {
    left: 10px !important;
    right: auto !important;
  }
`;

// Tools Section
const ToolsSection = styled(Section)`
  background: linear-gradient(135deg, ${COLORS.shadowGrey}, ${COLORS.gunmetal});
  position: relative;
`;

const ToolCard = styled.div`
  text-align: center;
  padding: 2rem;
  transition: all 0.3s ease;
  border-radius: 12px;
  background: ${COLORS.taupeGrey};
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 180px;

  &:hover {
    transform: translateY(-5px);
    border-color: ${COLORS.accent};
    box-shadow: 0 10px 25px rgba(138, 79, 255, 0.2);
  }
`;

const ToolIcon = styled.div`
  font-size: 3rem;
  color: ${COLORS.accent};
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  ${ToolCard}:hover & {
    color: ${COLORS.accent2};
    transform: scale(1.1);
  }
`;

const ToolName = styled.span`
  font-weight: 400;
  color: ${COLORS.parchment};
  font-size: 0.95rem;
`;

// Mentorship Section
const MentorshipSection = styled(Section)`
  background: ${COLORS.gunmetal};
  position: relative;
`;

const MentorshipContent = styled.div`
  background: ${COLORS.taupeGrey};
  padding: 4rem 3rem;
  border-radius: 16px;
  border: 1px solid ${COLORS.accent}40;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const QuoteIcon = styled.div`
  font-size: 2.5rem;
  color: ${COLORS.accent};
  margin-bottom: 2rem;
`;

const MentorshipText = styled.p`
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 3rem;
  color: ${COLORS.bone};
  line-height: 1.8;
  text-align: center;
  position: relative;
  
  &::before,
  &::after {
    content: '"';
    font-size: 4rem;
    color: ${COLORS.accent}40;
    position: absolute;
    font-family: serif;
  }
  
  &::before {
    top: -20px;
    left: -20px;
  }
  
  &::after {
    bottom: -40px;
    right: -20px;
  }
`;

// Projects Section
const ProjectsSection = styled(Section)`
  background: ${COLORS.shadowGrey};
  position: relative;
`;

const ProjectCard = styled.div`
  background: ${COLORS.gunmetal};
  padding: 2.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid ${COLORS.accent}40;
  transition: all 0.3s ease;
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${COLORS.accent}10, ${COLORS.accent2}10);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: ${COLORS.accent};

    &::before {
      opacity: 1;
    }
  }
`;

const ProjectIcon = styled.div`
  font-size: 3rem;
  color: ${COLORS.accent};
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const ProjectTitle = styled.h5`
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${COLORS.parchment};
  font-size: 1.4rem;
  position: relative;
  z-index: 1;
`;

const ProjectDescription = styled.p`
  color: ${COLORS.bone};
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const ProjectTech = styled.div`
  font-size: 0.9rem;
  color: ${COLORS.accent2};
  font-weight: 400;
  padding: 0.5rem 1rem;
  background: ${COLORS.taupeGrey};
  border-radius: 20px;
  display: inline-block;
  position: relative;
  z-index: 1;
`;

// Eligibility Section
const EligibilitySection = styled(Section)`
  background: ${COLORS.gunmetal};
`;

const InfoCard = styled.div`
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: ${COLORS.taupeGrey};
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    border-color: ${COLORS.accent};
    box-shadow: 0 10px 25px rgba(138, 79, 255, 0.1);
  }
`;

const InfoIcon = styled.div`
  font-size: 2.5rem;
  color: ${COLORS.accent};
  margin-bottom: 1.5rem;
`;

const InfoTitle = styled.h5`
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${COLORS.parchment};
  font-size: 1.3rem;
`;

const InfoValue = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${COLORS.accent2};
  margin-bottom: 0.5rem;
`;

const InfoSubtext = styled.span`
  color: ${COLORS.bone};
  opacity: 0.8;
  font-size: 0.95rem;
`;

// Benefits Section
const BenefitsSection = styled(Section)`
  background: linear-gradient(135deg, ${COLORS.gunmetal}, ${COLORS.shadowGrey});
  position: relative;
`;

const BenefitCard = styled.div`
  background: ${COLORS.taupeGrey};
  padding: 3rem 2rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid ${COLORS.taupeGrey};
  transition: all 0.3s ease;
  height: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    border-color: ${COLORS.accent};
    box-shadow: 0 20px 40px rgba(138, 79, 255, 0.1);
  }
`;

const BenefitIcon = styled.div`
  font-size: 3rem;
  color: ${COLORS.accent};
  margin-bottom: 1.5rem;
`;

const BenefitTitle = styled.h5`
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${COLORS.parchment};
  font-size: 1.4rem;
`;

const BenefitDescription = styled.p`
  color: ${COLORS.bone};
  opacity: 0.9;
  line-height: 1.6;
`;

// Quotes Section
const QuotesSection = styled(Section)`
  background: ${COLORS.shadowGrey};
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
  font-weight: 400;
  margin-bottom: 3rem;
  line-height: 1.4;
  color: ${COLORS.parchment};
  position: relative;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Apply Section
const ApplySection = styled(Section)`
  background: linear-gradient(135deg, ${COLORS.gunmetal}, ${COLORS.shadowGrey});
  color: ${COLORS.bone};
  text-align: center;
  position: relative;
`;

const ApplyTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: ${COLORS.parchment};
  position: relative;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ApplySubtitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: ${COLORS.bone};
`;

const ApplyBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    ${COLORS.accent}10 50%,
    transparent 70%
  );
  background-size: 200% 200%;
  animation: ${gradientShift} 6s ease-in-out infinite;
  z-index: -1;
`;

// Footer
const Footer = styled.footer`
  background: ${COLORS.gunmetal};
  color: ${COLORS.bone};
  padding: 3rem 0;
  text-align: center;
  border-top: 1px solid ${COLORS.taupeGrey};
`;

const FooterText = styled.p`
  margin: 0;
  opacity: 0.8;
  font-size: 1rem;
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
    color: ${COLORS.bone};
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      opacity: 1;
      color: ${COLORS.accent};
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: ${COLORS.accent};
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
  background: ${COLORS.accent};
  border: none;
  border-radius: 8px;
  color: ${COLORS.parchment};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(138, 79, 255, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-3px);
    background: ${COLORS.accent2};
    box-shadow: 0 8px 20px rgba(255, 107, 139, 0.3);
  }
`;

const AiMlInternship = () => {
  const typedRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });

    // Initialize Typed.js
    const typed = new Typed(typedRef.current, {
      strings: ['Intelligence.', 'Prediction.', 'Innovation.', 'Data.', 'Future.'],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '▌'
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
      icon: <FaPython />,
      name: 'Python for AI/ML',
      desc: 'Master Python programming for machine learning and data science applications',
      color: '#3776AB'
    },
    {
      icon: <SiTensorflow />,
      name: 'TensorFlow & PyTorch',
      desc: 'Deep learning frameworks for building advanced neural networks',
      color: '#FF6F00'
    },
    {
      icon: <SiPandas />,
      name: 'Data Science Stack',
      desc: 'Pandas, NumPy for data manipulation and analysis',
      color: '#150458'
    },
    {
      icon: <FaBrain />,
      name: 'Neural Networks',
      desc: 'Deep learning architectures and neural network design',
      color: COLORS.accent
    },
    {
      icon: <FaChartLine />,
      name: 'Data Visualization',
      desc: 'Creating meaningful insights through data visualization',
      color: COLORS.accent2
    },
    {
      icon: <FaCode />,
      name: 'Model Deployment',
      desc: 'Deploying ML models using Flask and Streamlit',
      color: '#8a4fff'
    }
  ];

  // Tools data
  const tools = [
    { icon: <SiTensorflow />, name: 'TensorFlow' },
    { icon: <SiPytorch />, name: 'PyTorch' },
    { icon: <FaPython />, name: 'Python' },
    { icon: <SiKeras />, name: 'Keras' },
    { icon: <SiNumpy />, name: 'NumPy' },
    { icon: <SiPandas />, name: 'Pandas' },
    { icon: <RiBook2Line />, name: 'Scikit-learn' },
    { icon: <SiFlask />, name: 'Flask' }
  ];

  // Projects data
  const projects = [
    {
      icon: <FaChartLine />,
      name: 'Stock Price Prediction',
      desc: 'Predict stock market trends using LSTM networks and time series analysis',
      tech: 'TensorFlow · LSTM · Pandas'
    },
    {
      icon: <FaRobot />,
      name: 'AI Chatbot',
      desc: 'Intelligent chatbot using NLP techniques and neural networks',
      tech: 'NLTK · TensorFlow · Flask'
    },
    {
      icon: <FaMicrochip />,
      name: 'Image Classification',
      desc: 'CNN model for image recognition and computer vision tasks',
      tech: 'PyTorch · CNN · OpenCV'
    },
    {
      icon: <FaNetworkWired />,
      name: 'Fake News Detection',
      desc: 'Machine learning model to identify fake news articles',
      tech: 'Scikit-learn · NLP · TF-IDF'
    },
    {
      icon: <FaRocket />,
      name: 'Recommender System',
      desc: 'Collaborative filtering system for personalized recommendations',
      tech: 'Surprise · Pandas · NumPy'
    },
    {
      icon: <FaDatabase />,
      name: 'Handwriting Recognition',
      desc: 'Neural network for digit classification from handwritten images',
      tech: 'TensorFlow · CNN · MNIST'
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: <FaCertificate />,
      name: 'Internship Certificate',
      desc: 'Industry-recognized certification in AI and Machine Learning'
    },
    {
      icon: <FaLaptopCode />,
      name: 'Real Projects',
      desc: 'Hands-on experience with production-ready machine learning models'
    },
    {
      icon: <FaUserTie />,
      name: 'Career Boost',
      desc: 'Enhance your professional portfolio with AI expertise'
    },
    {
      icon: <FaGraduationCap />,
      name: 'LOR & Guidance',
      desc: 'Letter of Recommendation and mentorship from AI experts'
    }
  ];

  // Timeline data
  const timelineData = [
    { phase: "AI/ML & Data Science Intro", desc: "Fundamentals of artificial intelligence and machine learning concepts" },
    { phase: "Python & Data Handling", desc: "Programming fundamentals and data manipulation techniques" },
    { phase: "Supervised & Unsupervised Learning", desc: "Machine learning algorithms and model training" },
    { phase: "Deep Learning & Neural Networks", desc: "Advanced AI models and neural architectures" },
    { phase: "Model Evaluation & Optimization", desc: "Performance tuning, validation, and optimization" },
    { phase: "Final Project & Presentation", desc: "End-to-end AI solution development and deployment" }
  ];

  return (
    <PageContainer>
      <Helmet>
        <title>AI & ML Development Internship | BTC Routes</title>
        <meta
          name="description"
          content="Join BTC Routes' AI & ML Internship and gain real-world experience in Artificial Intelligence and Machine Learning using Python, TensorFlow, and data-driven projects."
        />
        <meta
          name="keywords"
          content="BTC Routes, AI internship, ML internship, Artificial Intelligence, Machine Learning, Python, TensorFlow, data science, neural networks"
        />
        <meta name="author" content="BTC Routes" />
        <link
          rel="canonical"
          href="https://www.btcroutes.com/internship/aiml-development"
        />

        <meta property="og:title" content="AI & ML Development Internship | BTC Routes" />
        <meta
          property="og:description"
          content="Master Artificial Intelligence and Machine Learning with BTC Routes. Work on live AI/ML projects and gain hands-on training in Python, TensorFlow, and data modeling."
        />
        <meta property="og:image" content="%PUBLIC_URL%/logo2.png" />
        <meta property="og:url" content="https://www.btcroutes.com/internship/aiml-development" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BTC Routes | AI & ML Development Internship" />
        <meta
          name="twitter:description"
          content="Learn AI and ML through BTC Routes' internship. Build real-world machine learning and deep learning projects using Python and TensorFlow."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/logo2.png" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "AI & ML Development Internship",
              "description": "Join BTC Routes' AI & ML Internship and gain real-world experience in Artificial Intelligence and Machine Learning using Python, TensorFlow, and data-driven projects.",
              "provider": {
                "@type": "Organization",
                "name": "BTC Routes",
                "url": "https://www.btcroutes.com",
                "logo": "https://www.btcroutes.com/logo2.png"
              },
              "courseMode": "Online",
              "educationalCredentialAwarded": "Internship Certificate",
              "teaches": [
                "Artificial Intelligence",
                "Machine Learning",
                "Deep Learning",
                "Python Programming",
                "TensorFlow",
                "Data Modeling"
              ],
              "url": "https://www.btcroutes.com/internship/aiml-development"
            }
          `}
        </script>
      </Helmet>

      <GlobalStyle />

      <NavbarComponent />

      {/* Hero Section */}
      <HeroSection id="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8" data-aos="fade-up">
              <HeroTitle>
                AI & Machine Learning <br />Development Internship
              </HeroTitle>
              <HeroSubtitle>
                Master Artificial <TypedText ref={typedRef}></TypedText>
              </HeroSubtitle>
              <HeroTagline>
                Transform data into intelligent systems. Build, train, and deploy machine learning models
                that solve real-world problems. Join our comprehensive internship program designed for
                aspiring AI/ML engineers.
              </HeroTagline>
              <PrimaryButton
                large
                onClick={(e) => {
                  createRipple(e);
                  navigate('/application')
                }}
              >
                Start Your AI Journey
                <Ripple />
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Circuit Animation */}
        <CircuitConnection delay="0s">
          <path d="M100,100 C200,50 300,150 400,100 C500,50 600,150 700,100" />
          <path d="M150,200 C250,250 350,100 450,200 C550,250 650,100 750,200" />
          <path d="M200,300 C300,150 400,250 500,300 C600,350 700,250 800,300" />
        </CircuitConnection>

        {/* Circuit Nodes */}
        <CircuitNode top="20%" left="10%" delay="0s" />
        <CircuitNode top="30%" right="15%" delay="0.5s" />
        <CircuitNode top="70%" left="20%" delay="1s" />
        <CircuitNode bottom="25%" right="25%" delay="1.5s" />
        <CircuitNode top="45%" left="30%" delay="2s" />
        <CircuitNode bottom="35%" right="35%" delay="2.5s" />

        <HeroBackground />
        <PatternOverlay />
      </HeroSection>

      {/* About Section */}
      <AboutSection id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <SectionHeader>
                <h2>About the Internship</h2>
              </SectionHeader>
              <AboutText>
                Dive deep into the world of Artificial Intelligence and Machine Learning
                through our immersive internship program. We provide a structured learning
                path that takes you from foundational concepts to advanced model deployment.
              </AboutText>
              <AboutText>
                Designed specifically for BE/B.Tech students in Computer Science,
                Information Technology, AI/ML, and Data Science, this program focuses
                on practical implementation and industry-relevant skills.
              </AboutText>
              <AboutFeatures>
                <li>Comprehensive Machine Learning Algorithms</li>
                <li>Deep Learning with TensorFlow & PyTorch</li>
                <li>Data Science & Predictive Analytics</li>
                <li>Neural Networks & Computer Vision</li>
                <li>Natural Language Processing (NLP)</li>
                <li>Model Deployment & Cloud Integration</li>
              </AboutFeatures>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <AIVisual>
                <BrainIcon>
                  <FaBrain />
                </BrainIcon>
                <CircuitGrid />
              </AIVisual>
            </div>
          </div>
        </div>
      </AboutSection>

      {/* Skills Section */}
      <SkillsSection id="skills">
        <div className="container">
          <SectionHeader center>
            <h2>Skills You'll Master</h2>
            <SectionSubtitle center>
              Develop industry-relevant skills that are in high demand
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
      </SkillsSection>

      {/* Curriculum Section */}
      <CurriculumSection id="curriculum">
        <div className="container">
          <SectionHeader center>
            <h2>Learning Journey</h2>
            <SectionSubtitle center>
              Structured path from fundamentals to advanced concepts
            </SectionSubtitle>
          </SectionHeader>
          <Timeline>
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                even={index % 2 !== 0}
                data-aos="fade-up"
                data-aos-delay={index * 150}
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
            <h2>Industry Tools & Tech</h2>
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
            <div className="col-lg-10 text-center" data-aos="fade-up">
              <MentorshipContent>
                <QuoteIcon><FaQuoteLeft /></QuoteIcon>
                <MentorshipText>
                  "Our mentors are industry professionals who have built, trained, and deployed
                  AI solutions across various domains. Get personalized guidance from experts
                  who understand both the theoretical foundations and practical implementations
                  of artificial intelligence."
                </MentorshipText>
              </MentorshipContent>
            </div>
          </div>
        </div>
      </MentorshipSection>

      {/* Projects Section */}
      <ProjectsSection id="projects">
        <div className="container">
          <SectionHeader center>
            <h2>Hands-on Projects</h2>
            <SectionSubtitle center>
              Build real-world applications that showcase your expertise
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
            <h2>Program Details</h2>
          </SectionHeader>
          <div className="row g-4" data-aos="zoom-in">
            <div className="col-md-6 col-lg-3">
              <InfoCard>
                <InfoIcon><FaCalendarAlt /></InfoIcon>
                <InfoTitle>Duration</InfoTitle>
                <InfoValue>1-3 Months</InfoValue>
                <InfoSubtext>Flexible timeline</InfoSubtext>
              </InfoCard>
            </div>
            <div className="col-md-6 col-lg-3">
              <InfoCard>
                <InfoIcon><FaLaptopCode /></InfoIcon>
                <InfoTitle>Mode</InfoTitle>
                <InfoValue>Online/Hybrid</InfoValue>
                <InfoSubtext>Remote learning available</InfoSubtext>
              </InfoCard>
            </div>
            <div className="col-md-6 col-lg-3">
              <InfoCard>
                <InfoIcon><FaUsers /></InfoIcon>
                <InfoTitle>Eligibility</InfoTitle>
                <InfoValue>IT/CSE/AI/ML/DS</InfoValue>
                <InfoSubtext>BE/B.Tech/B.Sc students</InfoSubtext>
              </InfoCard>
            </div>
            <div className="col-md-6 col-lg-3">
              <InfoCard>
                <InfoIcon><FaPython /></InfoIcon>
                <InfoTitle>Prerequisite</InfoTitle>
                <InfoValue>Python Basics</InfoValue>
                <InfoSubtext>Fundamental knowledge</InfoSubtext>
              </InfoCard>
            </div>
          </div>
        </div>
      </EligibilitySection>

      {/* Benefits Section */}
      <BenefitsSection>
        <div className="container">
          <SectionHeader center>
            <h2>Program Benefits</h2>
          </SectionHeader>
          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay={index * 100}>
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
                  "Machines learn from data, but innovators learn from challenges."
                </QuoteText>
                <PrimaryButton
                  onClick={(e) => {
                    createRipple(e);
                    navigate('/application')
                  }}
                >
                  Apply Now
                  <Ripple />
                </PrimaryButton>
              </QuotesContent>
            </div>
          </div>
        </div>
      </QuotesSection>

      {/* Apply Section */}
      <ApplySection id="apply">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <ApplyTitle>Begin Your AI Journey</ApplyTitle>
              <ApplySubtitle>
                Step into the future of technology with our AI & ML Internship.
                Join a community of innovators and build the intelligent systems
                that will shape tomorrow.
              </ApplySubtitle>
              <PrimaryButton
                large
                onClick={createRipple}
              >
                <Link to="/application" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Start Application
                </Link>
                <Ripple />
              </PrimaryButton>
            </div>
          </div>
        </div>
        <ApplyBackground />
      </ApplySection>

      {/* Footer */}
      <Footer>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <FooterText>
                © 2025 AI & Machine Learning Internship. All rights reserved.
              </FooterText>
            </div>
            <div className="col-md-6">
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

export default AiMlInternship;