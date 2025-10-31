import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed from 'typed.js';
import { RiBook2Line } from "react-icons/ri";
import logo from '../../../../assests/logo2.png'
import { SiKeras } from "react-icons/si";
import {Link} from 'react-router-dom'
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
  SiPycharm,
  SiPandas,
  SiNumpy,
  ScikitLearn,
  SiStreamlit,
  SiFlask
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
    color: #EAEAFB;
    overflow-x: hidden;
    background: #0B0B1E;
  }

  html {
    scroll-padding-top: 80px;
  }

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #141432;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(#6A00FF, #00E5FF);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(#00E5FF, #6A00FF);
  }
`;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const neuralPulse = keyframes`
  0%, 100% { 
    opacity: 0.3;
    transform: scale(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.1);
  }
`;

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
    box-shadow: 0 0 20px #6A00FF, 0 0 40px rgba(106, 0, 255, 0.3);
  }
  50% { 
    box-shadow: 0 0 30px #00E5FF, 0 0 60px rgba(0, 229, 255, 0.4);
  }
`;

const neuralGlow = keyframes`
  0%, 100% { 
    text-shadow: 0 0 10px #6A00FF, 0 0 20px #6A00FF;
  }
  50% { 
    text-shadow: 0 0 15px #00E5FF, 0 0 30px #00E5FF;
  }
`;

const quoteRotate = keyframes`
  0%, 25% { opacity: 1; transform: translateY(0); }
  30%, 100% { opacity: 0; transform: translateY(-20px); }
`;

const neuralConnection = keyframes`
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
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
    background: linear-gradient(90deg, #FF00C8, #6A00FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(106, 0, 255, 0.3);
  }
`;

const SectionDivider = styled.div`
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #FF00C8, #6A00FF);
  border-radius: 2px;
  margin: ${props => props.center ? '0 auto' : '0'};
  box-shadow: 0 0 15px rgba(255, 0, 200, 0.3);
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #EAEAFB;
  margin-top: 1.5rem;
  opacity: 0.9;
`;

// Hero Section
const HeroSection = styled(Section)`
  background: linear-gradient(135deg, #6A00FF, #00E5FF, #FF00C8);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: #EAEAFB;
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
  text-shadow: 0 0 30px rgba(0, 229, 255, 0.5);
  background: linear-gradient(135deg, #EAEAFB, #00E5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.div`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
  min-height: 3rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TypedText = styled.span`
  color: #FF00C8;
  font-weight: 800;
  text-shadow: 0 0 20px rgba(255, 0, 200, 0.5);
`;

const HeroTagline = styled.p`
  font-size: 1.4rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  font-weight: 500;
  max-width: 600px;
`;

// Buttons
const PrimaryButton = styled.button`
  background: linear-gradient(90deg, #6A00FF, #00E5FF);
  border: none;
  padding: ${props => props.large ? '18px 50px' : '15px 40px'};
  border-radius: 50px;
  font-weight: 700;
  font-size: ${props => props.large ? '1.3rem' : '1.1rem'};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 0 25px rgba(106, 0, 255, 0.4);
  color: white;
  animation: ${glowPulse} 2s ease-in-out infinite;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 35px rgba(0, 229, 255, 0.6);
    background: linear-gradient(90deg, #00E5FF, #6A00FF);
  }
`;

const MagentaButton = styled(PrimaryButton)`
  background: linear-gradient(90deg, #FF00C8, #FF4DD8);
  animation: none;
  box-shadow: 0 0 25px rgba(255, 0, 200, 0.4);

  &:hover {
    background: linear-gradient(90deg, #00E5FF, #6A00FF);
    box-shadow: 0 0 35px rgba(0, 229, 255, 0.6);
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

// Neural Network Animation
const NeuralNode = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: #00E5FF;
  border-radius: 50%;
  animation: ${neuralPulse} 2s ease-in-out infinite;
  box-shadow: 0 0 20px #00E5FF;
  z-index: 1;

  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  animation-delay: ${props => props.delay || '0s'};
`;

const NeuralConnection = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  path {
    stroke: url(#neuralGradient);
    stroke-width: 2;
    fill: none;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${neuralConnection} 10s ease-in-out infinite;
    animation-delay: ${props => props.delay || '0s'};
  }
`;

// Hero Background Animation
const HeroBackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(106, 0, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(0, 229, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 0, 200, 0.1) 0%, transparent 50%);
  animation: ${backgroundShimmer} 8s ease-in-out infinite;
  z-index: 1;
`;

// About Section
const AboutSection = styled(Section)`
  background: #141432;
  position: relative;
  overflow: hidden;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #EAEAFB;
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
    color: #EAEAFB;

    &::before {
      content: '🧠';
      position: absolute;
      left: 0;
      font-size: 1.2rem;
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
  color: #6A00FF;
  animation: ${float} 6s ease-in-out infinite;
  text-shadow: 0 0 50px rgba(106, 0, 255, 0.5);
  position: relative;
  z-index: 2;
`;

const NeuralGrid = styled.div`
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
      linear-gradient(90deg, transparent 49%, #6A00FF 50%, transparent 51%),
      linear-gradient(transparent 49%, #6A00FF 50%, transparent 51%);
    background-size: 50px 50px;
  }
`;

// Skills Section
const SkillsSection = styled(Section)`
  position: relative;
  background: linear-gradient(135deg, rgba(106, 0, 255, 0.05), rgba(0, 229, 255, 0.05));
  overflow: hidden;
`;

const SkillCard = styled.div`
  background: rgba(20, 20, 50, 0.8);
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
    background: linear-gradient(90deg, transparent, rgba(106, 0, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: #00E5FF;
    box-shadow: 0 0 30px rgba(0, 229, 255, 0.3);

    &::before {
      left: 100%;
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.color || '#00E5FF'};
  text-shadow: 0 0 20px ${props => props.color || '#00E5FF'};
`;

const SkillName = styled.h5`
  font-weight: 700;
  color: #EAEAFB;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const SkillDescription = styled.p`
  color: #EAEAFB;
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
    radial-gradient(circle at 10% 20%, rgba(106, 0, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(255, 0, 200, 0.1) 0%, transparent 50%);
  z-index: -1;
`;

// Curriculum Section
const CurriculumSection = styled(Section)`
  background: linear-gradient(135deg, #6A00FF, #00E5FF);
  color: #EAEAFB;
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
  color: #FF00C8;
  text-shadow: 0 0 10px rgba(255, 0, 200, 0.5);
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
  background: #FF00C8;
  border-radius: 50%;
  box-shadow: 0 0 20px #FF00C8;
  right: ${props => props.even ? 'auto' : '-10px'};
  left: ${props => props.even ? '-10px' : 'auto'};

  @media (max-width: 768px) {
    left: 10px !important;
    right: auto !important;
  }
`;

// Tools Section
const ToolsSection = styled(Section)`
  background: #0B0B1E;
  color: #EAEAFB;
`;

const ToolCard = styled.div`
  text-align: center;
  padding: 2.5rem 1rem;
  transition: all 0.3s ease;
  border-radius: 50%;
  background: rgba(20, 20, 50, 0.6);
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
    box-shadow: 0 0 30px #00E5FF;
  }
`;

const ToolIcon = styled.div`
  font-size: 3rem;
  color: #6A00FF;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  ${ToolCard}:hover & {
    color: #00E5FF;
    filter: drop-shadow(0 0 10px #00E5FF);
  }
`;

const ToolName = styled.span`
  font-weight: 600;
  color: #EAEAFB;
  font-size: 0.9rem;
`;

// Mentorship Section
const MentorshipSection = styled(Section)`
  background: linear-gradient(135deg, #141432, #0B0B1E);
  position: relative;
`;

const MentorshipContent = styled.div`
  background: rgba(20, 20, 50, 0.6);
  backdrop-filter: blur(10px);
  padding: 4rem 3rem;
  border-radius: 25px;
  border: 1px solid rgba(106, 0, 255, 0.3);
  position: relative;
  box-shadow: 0 0 50px rgba(106, 0, 255, 0.2);
`;

const QuoteIcon = styled.div`
  font-size: 2.5rem;
  color: #00E5FF;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px #00E5FF;
`;

const MentorshipText = styled.p`
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 3rem;
  color: #EAEAFB;
  line-height: 1.8;
  text-align: center;
`;

const MentorStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.h4`
  font-size: 2.5rem;
  color: #FF00C8;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px #FF00C8;
`;

const MentorshipBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><circle cx="200" cy="200" r="100" fill="%236A00FF" fill-opacity="0.05"/><circle cx="800" cy="800" r="150" fill="%2300E5FF" fill-opacity="0.05"/></svg>');
  z-index: -1;
`;

// Projects Section
const ProjectsSection = styled(Section)`
  background: #0B0B1E;
  position: relative;
`;

const ProjectCard = styled.div`
  background: rgba(20, 20, 50, 0.8);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  border: 2px solid #6A00FF;
  transition: all 0.3s ease;
  height: 100%;
  animation: ${glowPulse} 4s ease-in-out infinite;

  &:hover {
    transform: translateY(-10px);
    border-color: #00E5FF;
    box-shadow: 0 0 40px rgba(0, 229, 255, 0.4);
    animation: none;
  }
`;

const ProjectIcon = styled.div`
  font-size: 3rem;
  color: #00E5FF;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px #00E5FF;
`;

const ProjectTitle = styled.h5`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #EAEAFB;
  font-size: 1.4rem;
`;

const ProjectDescription = styled.p`
  color: #EAEAFB;
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ProjectTech = styled.div`
  font-size: 0.9rem;
  color: #FF00C8;
  font-weight: 600;
  text-shadow: 0 0 10px #FF00C8;
`;

// Eligibility Section
const EligibilitySection = styled(Section)`
  background: #141432;
`;

const InfoCard = styled.div`
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: rgba(106, 0, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(106, 0, 255, 0.3);

  &:hover {
    transform: translateY(-5px);
    background: rgba(106, 0, 255, 0.2);
    box-shadow: 0 0 30px rgba(106, 0, 255, 0.3);
  }
`;

const InfoIcon = styled.div`
  font-size: 2.5rem;
  color: #00E5FF;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px #00E5FF;
`;

const InfoTitle = styled.h5`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #EAEAFB;
  font-size: 1.3rem;
`;

const InfoValue = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #FF00C8;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px #FF00C8;
`;

const InfoSubtext = styled.span`
  color: #EAEAFB;
  opacity: 0.8;
  font-size: 0.95rem;
`;

// Benefits Section
const BenefitsSection = styled(Section)`
  background: linear-gradient(135deg, #6A00FF, #00E5FF);
  color: #EAEAFB;
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
    border-color: #FF00C8;
    box-shadow: 0 0 40px rgba(255, 0, 200, 0.4);

    &::before {
      transform: rotate(45deg) translate(50%, 50%);
    }
  }
`;

const BenefitIcon = styled.div`
  font-size: 3rem;
  color: #FF00C8;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 20px #FF00C8;
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
  background: #0B0B1E;
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
  color: #EAEAFB;
  text-shadow: 0 0 20px rgba(0, 229, 255, 0.5);

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

const NeuralWeb = styled.div`
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
      radial-gradient(circle at center, #6A00FF 1px, transparent 1px),
      radial-gradient(circle at center, #00E5FF 1px, transparent 1px);
    background-size: 50px 50px, 30px 30px;
    background-position: 0 0, 25px 25px;
  }
`;

// Apply Section
const ApplySection = styled(Section)`
  background: linear-gradient(135deg, #6A00FF, #00E5FF);
  color: #EAEAFB;
  text-align: center;
  position: relative;
`;

const ApplyTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-shadow: 0 0 30px rgba(0, 229, 255, 0.5);

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

const ApplyStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ApplyStat = styled.div`
  text-align: center;
`;

const ApplyStatNumber = styled.h4`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #FF00C8;
  text-shadow: 0 0 20px #FF00C8;
`;

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
  background: #141432;
  color: #EAEAFB;
  padding: 3rem 0;
  text-align: center;
  border-top: 1px solid rgba(106, 0, 255, 0.3);
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
    color: #EAEAFB;
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      opacity: 1;
      color: #00E5FF;
      text-shadow: 0 0 10px #00E5FF;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #6A00FF, #00E5FF);
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
  background: linear-gradient(135deg, #6A00FF, #00E5FF);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(106, 0, 255, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(0, 229, 255, 0.6);
  }
`;

const AiMlInternship = () => {
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
      strings: ['Neural Networks.', 'Deep Learning.', 'Data Science.', 'Innovation.', 'AI Models.'],
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
      icon: <FaPython />, 
      name: 'Python for AI/ML', 
      desc: 'Master Python programming for machine learning',
      color: '#3776AB'
    },
    { 
      icon: <SiTensorflow />, 
      name: 'TensorFlow & PyTorch', 
      desc: 'Deep learning frameworks and neural networks',
      color: '#FF6F00'
    },
    { 
      icon: <SiPandas />, 
      name: 'Pandas, NumPy', 
      desc: 'Data manipulation and numerical computing',
      color: '#150458'
    },
    { 
      icon: <FaBrain />, 
      name: 'Neural Networks', 
      desc: 'Deep learning and neural architecture',
      color: '#00E5FF'
    },
    { 
      icon: <FaChartLine />, 
      name: 'Data Visualization', 
      desc: 'Matplotlib, Seaborn for data insights',
      color: '#FF00C8'
    },
    { 
      icon: <FaCode />, 
      name: 'Model Deployment', 
      desc: 'Flask/Streamlit for deploying ML models',
      color: '#6A00FF'
    }
  ];

  // Tools data
  const tools = [
    { icon: <SiTensorflow />, name: 'TensorFlow' },
    { icon: <SiPytorch />, name: 'PyTorch' },
    { icon: <FaPython />, name: 'Python' },
    { icon: <SiKeras />, name: 'Neural Networks' },
    { icon: <SiNumpy />, name: 'NumPy' },
    { icon: <SiPandas />, name: 'Pandas' },
    { icon: <RiBook2Line />, name: 'RAG' },
    { icon: <SiFlask />, name: 'Flask' }
  ];

  // Projects data
  const projects = [
    { 
      icon: <FaChartLine />, 
      name: 'Stock Price Prediction', 
      desc: 'Predict stock trends using LSTM networks',
      tech: 'TensorFlow, LSTM, Pandas'
    },
    { 
      icon: <FaRobot />, 
      name: 'AI Chatbot', 
      desc: 'Intelligent chatbot using NLP techniques',
      tech: 'NLTK, TensorFlow, Flask'
    },
    { 
      icon: <FaMicrochip />, 
      name: 'Image Classification', 
      desc: 'CNN model for image recognition',
      tech: 'PyTorch, CNN, OpenCV'
    },
    { 
      icon: <FaNetworkWired />, 
      name: 'Fake News Detection', 
      desc: 'ML model to identify fake news articles',
      tech: 'Scikit-learn, NLP, TF-IDF'
    },
    { 
      icon: <FaRocket />, 
      name: 'Recommender System', 
      desc: 'Collaborative filtering for recommendations',
      tech: 'Surprise, Pandas, NumPy'
    },
    { 
      icon: <FaDatabase />, 
      name: 'Handwriting Recognition', 
      desc: 'Neural network for digit classification',
      tech: 'TensorFlow, CNN, MNIST'
    }
  ];

  // Benefits data
  const benefits = [
    { 
      icon: <FaCertificate />, 
      name: 'Internship Certificate', 
      desc: 'Industry-recognized AI/ML certification'
    },
    { 
      icon: <FaLaptopCode />, 
      name: 'Real ML Projects', 
      desc: 'Hands-on experience with production models'
    },
    { 
      icon: <FaUserTie />, 
      name: 'Resume Enhancement', 
      desc: 'Boost your professional AI portfolio'
    },
    { 
      icon: <FaGraduationCap />, 
      name: 'LOR', 
      desc: 'Letter of Recommendation from AI experts'
    }
  ];

  // Quotes data
  const quotes = [
    "Machines learn from data, but innovators learn from challenges.",
    "AI is not the future — it's today.",
    "You don't just code models, you build intelligence.",
    "Transform data into predictions, predictions into actions.",
    "The neural network of today is the foundation of tomorrow."
  ];

  // Timeline data
  const timelineData = [
    { phase: "AI/ML & Data Science Intro", desc: "Fundamentals of artificial intelligence" },
    { phase: "Python & Data Handling", desc: "Programming and data manipulation" },
    { phase: "Supervised & Unsupervised Learning", desc: "Machine learning algorithms" },
    { phase: "Deep Learning & Neural Networks", desc: "Advanced AI models and architectures" },
    { phase: "Model Evaluation & Optimization", desc: "Performance tuning and validation" },
    { phase: "Final Project & Presentation", desc: "End-to-end AI solution development" }
  ];

  return (
    <PageContainer>
      <GlobalStyle />
      
      {/* Navigation */}
      <NavbarComponent />

      {/* Hero Section */}
      <HeroSection id="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8" data-aos="fade-up">
              <HeroTitle>
                AI & Machine Learning <br />Internship
              </HeroTitle>
              <HeroSubtitle>
                Master <TypedText ref={typedRef}></TypedText>
              </HeroSubtitle>
              <HeroTagline>
                Transform data into intelligence. Code the future.
              </HeroTagline>
              <MagentaButton 
                onClick={(e) => {
                  createRipple(e);
                  navigate('/application')
                  // document.querySelector('#apply').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Apply Now
                <Ripple />
              </MagentaButton>
            </div>
          </div>
        </div>

        {/* Neural Network Animation */}
        <NeuralConnection delay="0s">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6A00FF" />
              <stop offset="50%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#FF00C8" />
            </linearGradient>
          </defs>
          <path d="M100,100 C200,50 300,150 400,100 C500,50 600,150 700,100" />
          <path d="M150,200 C250,250 350,100 450,200 C550,250 650,100 750,200" />
        </NeuralConnection>

        {/* Neural Nodes */}
        <NeuralNode top="20%" left="10%" delay="0s" />
        <NeuralNode top="30%" right="15%" delay="0.5s" />
        <NeuralNode top="70%" left="20%" delay="1s" />
        <NeuralNode bottom="25%" right="25%" delay="1.5s" />
        <NeuralNode top="45%" left="30%" delay="2s" />
        <NeuralNode bottom="35%" right="35%" delay="2.5s" />

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
                Explore how machines think, learn, and predict. Build intelligent systems 
                with real-world impact through our comprehensive AI & Machine Learning Internship.
              </AboutText>
              <AboutText>
                Designed for BE/B.Tech students in IT, CSE, AI, ML, and DS, this program 
                takes you from fundamental concepts to advanced AI model development using 
                industry-standard tools and methodologies.
              </AboutText>
              <AboutFeatures>
                <li>Machine Learning Algorithms & Techniques</li>
                <li>Deep Learning with TensorFlow & PyTorch</li>
                <li>Data Science & Predictive Modeling</li>
                <li>Neural Networks & Computer Vision</li>
                <li>Natural Language Processing (NLP)</li>
                <li>Model Deployment & Production</li>
              </AboutFeatures>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <AIVisual>
                <BrainIcon>
                  <FaBrain />
                </BrainIcon>
                <NeuralGrid />
              </AIVisual>
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
              Master the essential technologies for AI and machine learning
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
            <h2>Learning Path</h2>
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
                  "Learn under professionals who've trained models, analyzed massive datasets, 
                  and deployed AI solutions across industries. Get personalized guidance from 
                  experts who understand both the theory and practice of artificial intelligence."
                </MentorshipText>
                {/* <MentorStats>
                  <Stat>
                    <StatNumber>10+</StatNumber>
                    <span>Years Experience</span>
                  </Stat>
                  <Stat>
                    <StatNumber>50+</StatNumber>
                    <span>AI Projects</span>
                  </Stat>
                  <Stat>
                    <StatNumber>1000+</StatNumber>
                    <span>Models Trained</span>
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
              Build real-world AI applications that demonstrate your expertise
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
                <InfoIcon><FaPython /></InfoIcon>
                <InfoTitle>Prerequisite</InfoTitle>
                <InfoValue>Python Basics</InfoValue>
                <InfoSubtext>Preferred Knowledge</InfoSubtext>
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
        <NeuralWeb />
      </QuotesSection>

      {/* Apply Section */}
      <ApplySection id="apply">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <ApplyTitle>Step Into AI Future</ApplyTitle>
              <ApplySubtitle>
                Step into the world of Artificial Intelligence. Join our AI & ML Internship 
                and code the next generation of smart systems that learn, predict, and innovate.
              </ApplySubtitle>
              <MagentaButton 
                large
                onClick={createRipple}
              >
              <Link to="/application" className='text-decoration-none'>
                Apply Now
              </Link>  
                <Ripple />
              </MagentaButton>
            </div>
          </div>
        </div>
        <ApplyBackgroundAnimation />
      </ApplySection>

      {/* Footer */}
      <Footer>
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-6">
              <FooterText>
                &copy; 2025 AI & Machine Learning Internship. All rights reserved.
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

export default AiMlInternship;