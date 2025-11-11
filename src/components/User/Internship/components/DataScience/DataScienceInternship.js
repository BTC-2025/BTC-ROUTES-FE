import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed from 'typed.js';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { MdShowChart } from "react-icons/md";
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { BiBarChartAlt2 } from "react-icons/bi";   
import { TbChartHistogram } from "react-icons/tb"; 
import { 
  FaChartLine,
  FaDatabase,
  FaPython,
  FaUserTie,
  FaCertificate,
  FaGraduationCap,
  FaCalendarAlt,
  FaUsers,
  FaLaptopCode,
  FaQuoteLeft,
  FaRocket,
  FaChartBar,
  FaChartPie,
  FaSearch,
  FaLightbulb
} from 'react-icons/fa';
import { 
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiPycharm
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
    color: #E8F1FF;
    overflow-x: hidden;
    background: #0A1A2F;
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
    background: #122C4A;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(#00B8A9, #1E90FF);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(#1E90FF, #00B8A9);
  }
`;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
`;

const dataPulse = keyframes`
  0%, 100% { 
    opacity: 0.6;
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
    box-shadow: 0 0 20px #00B8A9, 0 0 40px rgba(0, 184, 169, 0.3);
  }
  50% { 
    box-shadow: 0 0 30px #1E90FF, 0 0 60px rgba(30, 144, 255, 0.4);
  }
`;

// const chartGlow = keyframes`
//   0%, 100% { 
//     text-shadow: 0 0 10px #00B8A9, 0 0 20px #00B8A9;
//   }
//   50% { 
//     text-shadow: 0 0 15px #1E90FF, 0 0 30px #1E90FF;
//   }
// `;

const quoteRotate = keyframes`
  0%, 25% { opacity: 1; transform: translateY(0); }
  30%, 100% { opacity: 0; transform: translateY(-20px); }
`;

const chartLine = keyframes`
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
    // background: linear-gradient(90deg, #1E90FF, #FFD460);
    background:white;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(30, 144, 255, 0.3);
  }
`;

const SectionDivider = styled.div`
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #1E90FF, #FFD460);
  border-radius: 2px;
  margin: ${props => props.center ? '0 auto' : '0'};
  box-shadow: 0 0 15px rgba(255, 212, 96, 0.3);
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #E8F1FF;
  margin-top: 1.5rem;
  opacity: 0.9;
`;

// Hero Section
const HeroSection = styled(Section)`
  background: linear-gradient(135deg, #00B8A9, #1E90FF);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: #E8F1FF;
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
  text-shadow: 0 0 30px rgba(30, 144, 255, 0.5);
  background: linear-gradient(135deg, #E8F1FF, #FFD460);
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
  color: #FFD460;
  font-weight: 800;
  text-shadow: 0 0 20px rgba(255, 212, 96, 0.5);
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
  background: linear-gradient(90deg, #00B8A9, #1E90FF);
  border: none;
  padding: ${props => props.large ? '18px 50px' : '15px 40px'};
  border-radius: 50px;
  font-weight: 700;
  font-size: ${props => props.large ? '1.3rem' : '1.1rem'};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 0 25px rgba(0, 184, 169, 0.4);
  color: white;
  animation: ${glowPulse} 2s ease-in-out infinite;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 35px rgba(30, 144, 255, 0.6);
    background: linear-gradient(90deg, #1E90FF, #00B8A9);
  }
`;

const GoldButton = styled(PrimaryButton)`
  background: linear-gradient(90deg, #FFD460, #FFE082);
  animation: none;
  box-shadow: 0 0 25px rgba(255, 212, 96, 0.4);

  &:hover {
    background: linear-gradient(90deg, #00B8A9, #1E90FF);
    box-shadow: 0 0 35px rgba(0, 184, 169, 0.6);
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

// Data Visualization Elements
const DataNode = styled.div`
  position: absolute;
  width: ${props => props.size || '12px'};
  height: ${props => props.size || '12px'};
  background: ${props => props.color || '#00B8A9'};
  border-radius: 50%;
  animation: ${dataPulse} 3s ease-in-out infinite;
  box-shadow: 0 0 20px ${props => props.color || '#00B8A9'};
  z-index: 1;

  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  animation-delay: ${props => props.delay || '0s'};
`;

const ChartLine = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  path {
    stroke: url(#chartGradient);
    stroke-width: 3;
    fill: none;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${chartLine} 8s ease-in-out infinite;
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
    radial-gradient(circle at 20% 80%, rgba(0, 184, 169, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(30, 144, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 212, 96, 0.1) 0%, transparent 50%);
  animation: ${backgroundShimmer} 8s ease-in-out infinite;
  z-index: 1;
`;

// About Section
const AboutSection = styled(Section)`
  background: #122C4A;
  position: relative;
  overflow: hidden;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #E8F1FF;
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
    color: #E8F1FF;

    &::before {
      content: '📊';
      position: absolute;
      left: 0;
      font-size: 1.2rem;
    }
  }
`;

const DataVisual = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartIcon = styled.div`
  font-size: 8rem;
  color: #00B8A9;
  animation: ${float} 6s ease-in-out infinite;
  text-shadow: 0 0 50px rgba(0, 184, 169, 0.5);
  position: relative;
  z-index: 2;
`;

const DataGrid = styled.div`
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
      linear-gradient(90deg, transparent 49%, #00B8A9 50%, transparent 51%),
      linear-gradient(transparent 49%, #00B8A9 50%, transparent 51%);
    background-size: 50px 50px;
  }
`;

// Skills Section
const SkillsSection = styled(Section)`
  position: relative;
  background: linear-gradient(135deg, rgba(0, 184, 169, 0.05), rgba(30, 144, 255, 0.05));
  overflow: hidden;
`;

const SkillCard = styled.div`
  background: rgba(18, 44, 74, 0.8);
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
    background: linear-gradient(90deg, transparent, rgba(0, 184, 169, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: #FFD460;
    box-shadow: 0 0 30px rgba(255, 212, 96, 0.3);

    &::before {
      left: 100%;
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.color || '#FFD460'};
  text-shadow: 0 0 20px ${props => props.color || '#FFD460'};
`;

const SkillName = styled.h5`
  font-weight: 700;
  color: #E8F1FF;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const SkillDescription = styled.p`
  color: #E8F1FF;
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
    radial-gradient(circle at 10% 20%, rgba(0, 184, 169, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(30, 144, 255, 0.1) 0%, transparent 50%);
  z-index: -1;
`;

// Curriculum Section
const CurriculumSection = styled(Section)`
  background: linear-gradient(135deg, #00B8A9, #1E90FF);
  color: #E8F1FF;
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
  color: #FFD460;
  text-shadow: 0 0 10px rgba(255, 212, 96, 0.5);
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
  background: #FFD460;
  border-radius: 50%;
  box-shadow: 0 0 20px #FFD460;
  right: ${props => props.even ? 'auto' : '-10px'};
  left: ${props => props.even ? '-10px' : 'auto'};

  @media (max-width: 768px) {
    left: 10px !important;
    right: auto !important;
  }
`;

// Tools Section
const ToolsSection = styled(Section)`
  background: #0A1A2F;
  color: #E8F1FF;
`;

const ToolCard = styled.div`
  text-align: center;
  padding: 2.5rem 1rem;
  transition: all 0.3s ease;
  border-radius: 50%;
  background: rgba(18, 44, 74, 0.6);
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
    box-shadow: 0 0 30px #00B8A9;
  }
`;

const ToolIcon = styled.div`
  font-size: 3rem;
  color: #1E90FF;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  ${ToolCard}:hover & {
    color: #00B8A9;
    filter: drop-shadow(0 0 10px #00B8A9);
  }
`;

const ToolName = styled.span`
  font-weight: 600;
  color: #E8F1FF;
  font-size: 0.9rem;
`;

// Mentorship Section
const MentorshipSection = styled(Section)`
  background: linear-gradient(135deg, #122C4A, #0A1A2F);
  position: relative;
`;

const MentorshipContent = styled.div`
  background: rgba(18, 44, 74, 0.6);
  backdrop-filter: blur(10px);
  padding: 4rem 3rem;
  border-radius: 25px;
  border: 1px solid rgba(0, 184, 169, 0.3);
  position: relative;
  box-shadow: 0 0 50px rgba(0, 184, 169, 0.2);
`;

const QuoteIcon = styled.div`
  font-size: 2.5rem;
  color: #1E90FF;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px #1E90FF;
`;

const MentorshipText = styled.p`
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 3rem;
  color: #E8F1FF;
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
//   color: #FFD460;
//   margin-bottom: 0.5rem;
//   text-shadow: 0 0 20px #FFD460;
// `;

const MentorshipBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><circle cx="200" cy="200" r="100" fill="%2300B8A9" fill-opacity="0.05"/><circle cx="800" cy="800" r="150" fill="%231E90FF" fill-opacity="0.05"/></svg>');
  z-index: -1;
`;

// Projects Section
const ProjectsSection = styled(Section)`
  background: #0A1A2F;
  position: relative;
`;

const ProjectCard = styled.div`
  background: rgba(18, 44, 74, 0.8);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  border: 2px solid #1E90FF;
  transition: all 0.3s ease;
  height: 100%;
  animation: ${glowPulse} 4s ease-in-out infinite;

  &:hover {
    transform: translateY(-10px);
    border-color: #FFD460;
    box-shadow: 0 0 40px rgba(255, 212, 96, 0.4);
    animation: none;
  }
`;

const ProjectIcon = styled.div`
  font-size: 3rem;
  color: #FFD460;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px #FFD460;
`;

const ProjectTitle = styled.h5`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #E8F1FF;
  font-size: 1.4rem;
`;

const ProjectDescription = styled.p`
  color: #E8F1FF;
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ProjectTech = styled.div`
  font-size: 0.9rem;
  color: #00B8A9;
  font-weight: 600;
  text-shadow: 0 0 10px #00B8A9;
`;

// Eligibility Section
const EligibilitySection = styled(Section)`
  background: #122C4A;
`;

const InfoCard = styled.div`
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: rgba(0, 184, 169, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 184, 169, 0.3);

  &:hover {
    transform: translateY(-5px);
    background: rgba(0, 184, 169, 0.2);
    box-shadow: 0 0 30px rgba(0, 184, 169, 0.3);
  }
`;

const InfoIcon = styled.div`
  font-size: 2.5rem;
  color: #1E90FF;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px #1E90FF;
`;

const InfoTitle = styled.h5`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #E8F1FF;
  font-size: 1.3rem;
`;

const InfoValue = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #FFD460;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px #FFD460;
`;

const InfoSubtext = styled.span`
  color: #E8F1FF;
  opacity: 0.8;
  font-size: 0.95rem;
`;

// Benefits Section
const BenefitsSection = styled(Section)`
  background: linear-gradient(135deg, #00B8A9, #1E90FF);
  color: #E8F1FF;
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
    border-color: #FFD460;
    box-shadow: 0 0 40px rgba(255, 212, 96, 0.4);

    &::before {
      transform: rotate(45deg) translate(50%, 50%);
    }
  }
`;

const BenefitIcon = styled.div`
  font-size: 3rem;
  color: #FFD460;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 20px #FFD460;
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
  background: #0A1A2F;
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
  color: #E8F1FF;
  text-shadow: 0 0 20px rgba(30, 144, 255, 0.5);

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

const DataParticles = styled.div`
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
      radial-gradient(circle at center, #00B8A9 1px, transparent 1px),
      radial-gradient(circle at center, #1E90FF 1px, transparent 1px);
    background-size: 50px 50px, 30px 30px;
    background-position: 0 0, 25px 25px;
  }
`;

// Apply Section
const ApplySection = styled(Section)`
  background: linear-gradient(135deg, #00B8A9, #1E90FF);
  color: #E8F1FF;
  text-align: center;
  position: relative;
`;

const ApplyTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-shadow: 0 0 30px rgba(0, 184, 169, 0.5);

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
//   color: #FFD460;
//   text-shadow: 0 0 20px #FFD460;
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
  background: #122C4A;
  color: #E8F1FF;
  padding: 3rem 0;
  text-align: center;
  border-top: 1px solid rgba(0, 184, 169, 0.3);
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
    color: #E8F1FF;
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      opacity: 1;
      color: #1E90FF;
      text-shadow: 0 0 10px #1E90FF;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #00B8A9, #1E90FF);
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
  background: linear-gradient(135deg, #00B8A9, #1E90FF);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 184, 169, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(30, 144, 255, 0.6);
  }
`;

const DataScienceInternship = () => {
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
      strings: ['Data.', 'Analytics.', 'Insights.', 'Prediction.', 'Visualization.'],
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
      name: 'Python, NumPy, Pandas', 
      desc: 'Data manipulation and analysis with Python',
      color: '#3776AB'
    },
    { 
      icon: <FaDatabase />, 
      name: 'Data Cleaning & Wrangling', 
      desc: 'Preprocess and clean datasets for analysis',
      color: '#00B8A9'
    },
    { 
      icon: <FaSearch />, 
      name: 'Exploratory Data Analysis', 
      desc: 'Discover patterns and insights in data',
      color: '#1E90FF'
    },
    { 
      icon: <FaChartBar />, 
      name: 'Data Visualization', 
      desc: 'Create visualizations using PowerBI & SQL',
      color: '#FFD460'
    },
    { 
      icon: <FaLightbulb />, 
      name: 'Predictive Analytics', 
      desc: 'Build ML models for predictions and insights',
      color: '#00B8A9'
    },
    { 
      icon: <FaChartBar />, 
      name: 'Probability & Statistics', 
      desc: 'Data distribution, correlation, and inference analysis',
      color: '#0EA5E9'
    }

  ];

  // Tools data
  const tools = [
    { icon: <FaPython />, name: 'Python' },
    { icon: <SiPandas />, name: 'Pandas' },
    { icon: <SiNumpy />, name: 'NumPy' },
    { icon: <SiScikitlearn />, name: 'Scikit-learn' },
    { icon: <MdShowChart />, name: 'Matplotlib' },
    { icon: <TbChartHistogram/>, name: 'Seaborn' },
    { icon: <BiBarChartAlt2/>, name: 'Power BI' },
    { icon: <SiPycharm />, name: 'Pycharm' }
  ];

  // Projects data
  const projects = [
    { 
      icon: <FaChartLine />, 
      name: 'Sales Forecasting', 
      desc: 'Predict future sales using time series analysis',
      tech: 'Python, ARIMA, Prophet'
    },
    { 
      icon: <FaUserTie />, 
      name: 'Customer Churn Prediction', 
      desc: 'Identify customers likely to leave using ML',
      tech: 'Scikit-learn, XGBoost, Pandas'
    },
    { 
      icon: <FaChartBar />, 
      name: 'COVID-19 Dashboard', 
      desc: 'Interactive visualization of pandemic data',
      tech: 'Plotly, Dash, Pandas'
    },
    { 
      icon: <FaRocket />, 
      name: 'Movie Recommendation', 
      desc: 'Content-based filtering for movie suggestions',
      tech: 'Cosine Similarity, Pandas'
    },
    { 
      icon: <FaChartPie />, 
      name: 'Stock Market Analysis', 
      desc: 'Technical analysis and trend prediction',
      tech: 'yFinance, Matplotlib, NumPy'
    },
    { 
      icon: <FaLightbulb />, 
      name: 'Employee Performance', 
      desc: 'Analyze and predict employee performance',
      tech: 'Random Forest, Feature Engineering'
    }
  ];

  // Benefits data
  const benefits = [
    { 
      icon: <FaCertificate />, 
      name: 'Internship Certificate', 
      desc: 'Industry-recognized data science certification'
    },
    { 
      icon: <FaLaptopCode />, 
      name: 'Real Data Projects', 
      desc: 'Hands-on experience with real datasets'
    },
    { 
      icon: <FaUserTie />, 
      name: 'Portfolio Enhancement', 
      desc: 'Build a strong data science portfolio'
    },
    { 
      icon: <FaGraduationCap />, 
      name: 'LOR', 
      desc: 'Letter of Recommendation from data experts'
    }
  ];

  // Quotes data
  const quotes = [
    "Data is the new oil — and you're about to refine it.",
    "The goal is to turn data into information, and information into insight.",
    "Analyze. Predict. Decide. Lead.",
    "In God we trust, all others must bring data.",
    "Without data, you're just another person with an opinion."
  ];

  // Timeline data
  const timelineData = [
    { phase: "Data Science & Tools Intro", desc: "Fundamentals of data science ecosystem" },
    { phase: "Python for Analytics", desc: "Programming and data manipulation skills" },
    { phase: "Data Cleaning & Preprocessing", desc: "Prepare datasets for analysis" },
    { phase: "EDA & Visualization", desc: "Discover insights and create visual stories" },
    { phase: "Machine Learning", desc: "Build predictive models and algorithms" },
    { phase: "Capstone Data Project", desc: "End-to-end data science solution" }
  ];

  const navigate = useNavigate()

  return (
    <PageContainer>

      <Helmet>
        <title>Data Science Internship | BTC Routes</title>
        <meta
          name="description"
          content="Gain hands-on experience with BTC Routes’ Data Science Internship. Learn Python, Pandas, NumPy, Machine Learning, and data visualization through real-world projects."
        />
        <meta
          name="keywords"
          content="BTC Routes, Data Science internship, Python, Pandas, NumPy, Machine Learning, data visualization, data analysis, BTC projects"
        />
        <meta name="author" content="BTC Routes" />
        <link rel="canonical" href="https://www.btcroutes.com/internship/data-science" />

        {/* ✅ Open Graph Meta Tags */}
        <meta property="og:title" content="Data Science Internship | BTC Routes" />
        <meta
          property="og:description"
          content="Join BTC Routes’ Data Science Internship to master Python, data analysis, and machine learning. Work on live projects and build your career in data science."
        />
        <meta property="og:image" content="%PUBLIC_URL%/logo2.png" />
        <meta property="og:url" content="https://www.btcroutes.com/internship/data-science" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BTC Routes | Data Science Internship" />
        <meta
          name="twitter:description"
          content="Master data science with BTC Routes through hands-on projects. Learn Python, ML, and data visualization for your professional growth."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/logo2.png" />

        {/* ✅ Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "Data Science Internship",
              "description": "Gain hands-on experience with BTC Routes’ Data Science Internship. Learn Python, Pandas, NumPy, Machine Learning, and data visualization through real-world projects.",
              "provider": {
                "@type": "Organization",
                "name": "BTC Routes",
                "url": "https://www.btcroutes.com",
                "logo": "https://www.btcroutes.com/logo2.png"
              },
              "courseMode": "Online",
              "educationalCredentialAwarded": "Internship Certificate",
              "teaches": [
                "Python",
                "Pandas",
                "NumPy",
                "Data Analysis",
                "Machine Learning",
                "Data Visualization"
              ],
              "url": "https://www.btcroutes.com/internship/data-science"
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
                Data Science <br />Internship
              </HeroTitle>
              <HeroSubtitle>
                Master <TypedText ref={typedRef}></TypedText>
              </HeroSubtitle>
              <HeroTagline>
                Turn raw data into real-world decisions.
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

        {/* Chart Animation */}
        <ChartLine delay="0s">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00B8A9" />
              <stop offset="50%" stopColor="#1E90FF" />
              <stop offset="100%" stopColor="#FFD460" />
            </linearGradient>
          </defs>
          <path d="M100,300 C200,200 300,400 400,300 C500,200 600,400 700,300" />
          <path d="M150,350 C250,250 350,450 450,350 C550,250 650,450 750,350" />
        </ChartLine>

        {/* Data Nodes */}
        <DataNode top="25%" left="15%" delay="0s" color="#00B8A9" />
        <DataNode top="35%" right="20%" delay="0.5s" color="#1E90FF" />
        <DataNode top="65%" left="25%" delay="1s" color="#FFD460" />
        <DataNode bottom="30%" right="30%" delay="1.5s" color="#00B8A9" />
        <DataNode top="50%" left="35%" delay="2s" color="#1E90FF" />
        <DataNode bottom="40%" right="40%" delay="2.5s" color="#FFD460" />

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
                Understand data from collection to insight. Gain the ability to clean, 
                analyze, visualize, and predict outcomes with confidence through our 
                comprehensive Data Science Internship.
              </AboutText>
              <AboutText>
                Designed for BE/B.Tech students in IT, CSE, AI, ML, and DS, this program 
                takes you through the complete data science lifecycle using industry-standard 
                tools and real-world datasets.
              </AboutText>
              <AboutFeatures>
                <li>Python Programming for Data Science</li>
                <li>Statistical Analysis & Hypothesis Testing</li>
                <li>Data Visualization & Dashboard Reporting</li>
                <li>Machine Learning Integration & Model Building</li>
                <li>SQL Database Queries & Management</li>
                <li>Business Intelligence & Insights Generation</li>
              </AboutFeatures>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <DataVisual>
                <ChartIcon>
                  <FaChartLine />
                </ChartIcon>
                <DataGrid />
              </DataVisual>
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
              Master the essential technologies for modern data science
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
                  "Learn directly from experts who've built predictive models, visual dashboards, 
                  and data-driven decision systems for real businesses. Get personalized guidance 
                  from professionals who understand both the technical and business aspects of data science."
                </MentorshipText>
                {/* <MentorStats>
                  <Stat>
                    <StatNumber>8+</StatNumber>
                    <span>Years Experience</span>
                  </Stat>
                  <Stat>
                    <StatNumber>100+</StatNumber>
                    <span>Data Projects</span>
                  </Stat>
                  <Stat>
                    <StatNumber>500+</StatNumber>
                    <span>Models Deployed</span>
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
              Build real-world data applications that demonstrate your expertise
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
                <InfoSubtext>Recommended</InfoSubtext>
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
        <DataParticles />
      </QuotesSection>

      {/* Apply Section */}
      <ApplySection id="apply">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <ApplyTitle>Shape the Future with Data</ApplyTitle>
              <ApplySubtitle>
                Shape the future with data. Join our Data Science Internship and learn 
                to uncover insights that power innovation and drive business decisions.
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
                &copy; 2025 Data Science Internship. All rights reserved.
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

export default DataScienceInternship;