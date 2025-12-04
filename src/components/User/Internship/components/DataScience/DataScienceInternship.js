import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed from 'typed.js';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  MdShowChart,
  MdTrendingUp,
  MdDataArray,
  // MdAnalytics
} from "react-icons/md";
import {
  // BiBarChartAlt2,
  BiAnalyse,
  // BiStats
} from "react-icons/bi";
import {
  TbChartHistogram,
  TbDatabase,
  // TbChartLine
} from "react-icons/tb";
import {
  FaChartLine,
  FaDatabase,
  FaPython,
  FaUserTie,
  FaCertificate,
  FaGraduationCap,
  // FaCalendarAlt,
  // FaUsers,
  FaLaptopCode,
  // FaQuoteLeft,
  FaRocket,
  FaChartBar,
  // FaChartPie,
  FaSearch,
  FaLightbulb,
  FaChevronUp,
  FaBrain,
  FaChartArea,
  // FaTable,
  // FaFilter
} from 'react-icons/fa';
import {
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiPycharm,
  SiJupyter,
  SiTensorflow,
  SiTableau,
  SiPostgresql,
  SiGooglecolab
} from 'react-icons/si';
import NavbarComponent from '../Navbarcomponent';

// Color Palette
const colors = {
  parchment: '#edede9',
  dustGrey: '#d6ccc2',
  linen: '#f5ebe0',
  powderPetal: '#e3d5ca',
  almondSilk: '#d5bdaf'
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
    color: #3c3c3c;
    overflow-x: hidden;
    background: ${colors.linen};
  }

  html {
    scroll-padding-top: 80px;
    scroll-behavior: smooth;
  }

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.parchment};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, ${colors.almondSilk}, ${colors.powderPetal});
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, ${colors.powderPetal}, ${colors.almondSilk});
  }
`;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(3deg); }
`;

const dataStream = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const gentlePulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.02); }
`;

// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const slideIn = keyframes`
//   from { transform: translateX(-100%); opacity: 0; }
//   to { transform: translateX(0); opacity: 1; }
// `;

// const chartDraw = keyframes`
//   from { stroke-dashoffset: 1000; }
//   to { stroke-dashoffset: 0; }
// `;

// Main Container
const PageContainer = styled.div`
  position: relative;
`;

// Section Base Styles
const Section = styled.section`
  padding: 100px 0;
  position: relative;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  margin-bottom: 60px;
  text-align: ${props => props.center ? 'center' : 'left'};

  h2 {
    font-size: 3.5rem;
    font-weight: 600;
    background: linear-gradient(135deg, #8b7355, #a1887f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.5px;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: ${props => props.center ? '50%' : '0'};
      transform: ${props => props.center ? 'translateX(-50%)' : 'none'};
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, ${colors.almondSilk}, ${colors.powderPetal});
      border-radius: 2px;
    }
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.3rem;
  color: #6d4c41;
  margin-top: 2rem;
  opacity: 0.8;
  max-width: 600px;
  margin-left: ${props => props.center ? 'auto' : '0'};
  margin-right: ${props => props.center ? 'auto' : '0'};
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  font-weight: 400;
`;

// Hero Section
const HeroSection = styled(Section)`
  background: linear-gradient(135deg, ${colors.linen} 0%, ${colors.parchment} 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 80px;
  border-bottom: 1px solid ${colors.dustGrey};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 80%, ${colors.powderPetal}22 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${colors.almondSilk}22 0%, transparent 50%);
  }

  .container {
    position: relative;
    z-index: 2;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(135deg, #2c1810, #5d4037);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Roboto', sans-serif;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
`;

const HeroSubtitle = styled.div`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 500;
  min-height: 3rem;
  color: #3e2723;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TypedText = styled.span`
  color: #5d4037;
  font-weight: 600;
  position: relative;
  font-style: italic;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, ${colors.almondSilk}, ${colors.powderPetal});
    border-radius: 1px;
  }
`;

const HeroTagline = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: #4e342e;
  opacity: 1;
  font-weight: 400;
  max-width: 600px;
  font-family: 'Roboto', sans-serif;
  line-height: 1.8;
`;

// Buttons
const ButtonBase = styled.button`
  border: none;
  padding: ${props => props.large ? '20px 50px' : '16px 40px'};
  border-radius: 8px;
  font-weight: 500;
  font-size: ${props => props.large ? '1.3rem' : '1.1rem'};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none !important;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 115, 85, 0.2);
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background: linear-gradient(135deg, ${colors.almondSilk}, #8b7355);
  color: #5d4037;
  box-shadow: 0 4px 15px rgba(139, 115, 85, 0.3);
  border: 1px solid ${colors.dustGrey};

  &:hover {
    background: linear-gradient(135deg, #8b7355, ${colors.almondSilk});
    color: #5d4037;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background: transparent;
  color: #8d6e63;
  border: 2px solid ${colors.almondSilk};
  box-shadow: 0 4px 12px rgba(141, 110, 99, 0.1);

  &:hover {
    background: rgba(213, 189, 175, 0.1);
    border-color: #8b7355;
  }
`;

// Data Elements
const DataPoint = styled.div`
  position: absolute;
  width: ${props => props.size || '12px'};
  height: ${props => props.size || '12px'};
  background: ${props => props.color || colors.almondSilk};
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(139, 115, 85, 0.2);
  z-index: 1;
  border: 2px solid white;

  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  animation-delay: ${props => props.delay || '0s'};
`;

const DataStream = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${colors.almondSilk}, transparent);
    animation: ${dataStream} 15s linear infinite;
    top: ${props => props.top || '50%'};
    animation-delay: ${props => props.delay || '0s'};
  }
`;

// Hero Visual Components
const HeroVisualContainer = styled.div`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
`;

const CentralIcon = styled.div`
  font-size: 8rem;
  color: #5d4037;
  filter: drop-shadow(0 10px 20px rgba(93, 64, 55, 0.2));
  animation: ${float} 6s ease-in-out infinite;
  z-index: 2;
  background: white;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.dustGrey};
  box-shadow: 
    0 20px 40px rgba(0,0,0,0.05),
    inset 0 0 40px rgba(213, 189, 175, 0.2);
`;

const OrbitRing = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 1px dashed ${colors.almondSilk};
  border-radius: 50%;
  animation: ${props => keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `} ${props => props.duration}s linear infinite;
  animation-direction: ${props => props.reverse ? 'reverse' : 'normal'};
`;

const OrbitIcon = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #8b7355;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  border: 1px solid ${colors.dustGrey};
  animation: ${props => keyframes`
    from { transform: translateX(-50%) rotate(0deg); }
    to { transform: translateX(-50%) rotate(-360deg); }
  `} ${props => props.duration}s linear infinite;
  animation-direction: ${props => props.reverse ? 'reverse' : 'normal'};
`;

// About Section
const AboutSection = styled(Section)`
  background: ${colors.parchment};
  position: relative;
  border-top: 1px solid ${colors.dustGrey};
  border-bottom: 1px solid ${colors.dustGrey};
`;

const AboutCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid ${colors.dustGrey};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(139, 115, 85, 0.15);
    
    &::before {
      transform: translateX(100%);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(227, 213, 202, 0.1),
      transparent
    );
    transition: transform 0.8s ease;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem;
  background: linear-gradient(135deg, ${colors.linen}, white);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid ${colors.dustGrey};
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(139, 115, 85, 0.1);
    border-color: ${colors.almondSilk};

    &::after {
      transform: scaleX(1);
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, ${colors.almondSilk}, ${colors.powderPetal});
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

const FeatureIcon = styled.div`
  background: linear-gradient(135deg, ${colors.linen}, ${colors.parchment});
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #8b7355;
  font-size: 1.8rem;
  border: 1px solid ${colors.dustGrey};
`;

const FeatureContent = styled.div`
  h4 {
    color: #5d4037;
    font-weight: 500;
    margin-bottom: 10px;
    font-size: 1.3rem;
    font-family: 'Roboto', sans-serif;
  }

  p {
    color: #6d4c41;
    opacity: 0.9;
    line-height: 1.6;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
  }
`;

// Skills Section
const SkillsSection = styled(Section)`
  background: ${colors.linen};
  position: relative;
  border-top: 1px solid ${colors.dustGrey};
`;

const SkillCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  border: 1px solid ${colors.dustGrey};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    border-color: ${colors.almondSilk};
    box-shadow: 0 15px 35px rgba(139, 115, 85, 0.15);

    &::before {
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${colors.almondSilk}, ${colors.powderPetal});
    transform: translateY(-100%);
    transition: transform 0.4s ease;
  }
`;

const SkillIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: #8b7355;
  transition: all 0.3s ease;

  ${SkillCard}:hover & {
    animation: ${gentlePulse} 0.5s ease;
  }
`;

const SkillName = styled.h4`
  font-weight: 600;
  color: #5d4037;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const SkillDescription = styled.p`
  color: #6d4c41;
  opacity: 0.9;
  line-height: 1.6;
  font-family: 'Roboto', sans-serif;
  font-size: 0.95rem;
`;

// Curriculum Section
const CurriculumSection = styled(Section)`
  background: ${colors.parchment};
  position: relative;
  border-top: 1px solid ${colors.dustGrey};
  border-bottom: 1px solid ${colors.dustGrey};
`;

const PhaseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PhaseCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid ${colors.dustGrey};
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    border-color: ${colors.almondSilk};
    box-shadow: 0 15px 35px rgba(139, 115, 85, 0.15);
  }

  &::before {
    content: '${props => props.number}';
    position: absolute;
    top: -12px;
    left: 30px;
    background: linear-gradient(135deg, ${colors.almondSilk}, ${colors.powderPetal});
    color: #5d4037;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;
    font-family: 'Roboto', sans-serif;
    box-shadow: 0 4px 12px rgba(139, 115, 85, 0.2);
    border: 2px solid white;
  }
`;

const PhaseTitle = styled.h4`
  color: #5d4037;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
`;

const PhaseDescription = styled.p`
  color: #6d4c41;
  line-height: 1.7;
  margin-bottom: 0;
  font-family: 'Roboto', sans-serif;
  opacity: 0.9;
`;

// Tools Section
const ToolsSection = styled(Section)`
  background: ${colors.linen};
  position: relative;
  border-top: 1px solid ${colors.dustGrey};
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ToolItem = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem 1rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid ${colors.dustGrey};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px) scale(1.05);
    border-color: ${colors.almondSilk};
    box-shadow: 0 12px 30px rgba(139, 115, 85, 0.15);
  }
`;

const ToolIcon = styled.div`
  font-size: 3rem;
  color: #8b7355;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  ${ToolItem}:hover & {
    color: #5d4037;
    animation: ${gentlePulse} 0.5s ease;
  }
`;

const ToolName = styled.span`
  font-weight: 400;
  color: #5d4037;
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
`;

// Projects Section
const ProjectsSection = styled(Section)`
  background: ${colors.parchment};
  position: relative;
  border-top: 1px solid ${colors.dustGrey};
  border-bottom: 1px solid ${colors.dustGrey};
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  height: 100%;
  border: 1px solid ${colors.dustGrey};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-10px);
    border-color: ${colors.almondSilk};
    box-shadow: 0 20px 40px rgba(139, 115, 85, 0.15);

    &::after {
      transform: translateX(100%);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(227, 213, 202, 0.1),
      transparent
    );
    transition: transform 0.6s ease;
  }
`;

const ProjectIcon = styled.div`
  font-size: 3.5rem;
  color: #8b7355;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${colors.linen}, ${colors.parchment});
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.dustGrey};
`;

const ProjectTitle = styled.h4`
  color: #5d4037;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const ProjectDescription = styled.p`
  color: #6d4c41;
  opacity: 0.9;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-family: 'Roboto', sans-serif;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: linear-gradient(135deg, ${colors.linen}, white);
  color: #8b7355;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  border: 1px solid ${colors.dustGrey};
`;

// Benefits Section
const BenefitsSection = styled(Section)`
  background: linear-gradient(135deg, ${colors.parchment} 0%, ${colors.linen} 100%);
  position: relative;
  border-top: 1px solid ${colors.dustGrey};
`;

const BenefitCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.4s ease;
  height: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid ${colors.dustGrey};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    border-color: ${colors.almondSilk};
    box-shadow: 0 15px 35px rgba(139, 115, 85, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${colors.almondSilk}, ${colors.powderPetal});
  }
`;

const BenefitIcon = styled.div`
  font-size: 3.5rem;
  color: #8b7355;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
`;

const BenefitTitle = styled.h4`
  color: #5d4037;
  font-weight: 600;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const BenefitDescription = styled.p`
  color: #6d4c41;
  opacity: 0.9;
  position: relative;
  z-index: 2;
  line-height: 1.6;
  font-family: 'Roboto', sans-serif;
`;

// Apply Section
const ApplySection = styled(Section)`
  background: linear-gradient(135deg, ${colors.almondSilk} 0%, ${colors.powderPetal} 100%);
  color: #5d4037;
  text-align: center;
  position: relative;
  border-top: 1px solid ${colors.dustGrey};
`;

const ApplyTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-family: 'Roboto', sans-serif;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const ApplySubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Roboto', sans-serif;
  color: #5d4037;
  font-weight: 400;
`;

const ApplyButton = styled(PrimaryButton)`
  background: white;
  color: #5d4037;
  font-size: 1.3rem;
  padding: 20px 60px;
  border: 2px solid rgba(93, 64, 55, 0.2);
  box-shadow: 0 8px 25px rgba(93, 64, 55, 0.15);

  &:hover {
    background: ${colors.parchment};
    color: #5d4037;
    border-color: #5d4037;
  }
`;

// Footer
const Footer = styled.footer`
  background: ${colors.parchment};
  color: #5d4037;
  padding: 4rem 0 2rem;
  position: relative;
  border-top: 1px solid ${colors.dustGrey};
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const FooterText = styled.p`
  margin: 0;
  opacity: 0.8;
  font-size: 1.1rem;
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  margin: 1rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  a {
    color: #8b7355;
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    position: relative;

    &:hover {
      opacity: 1;
      color: #5d4037;

      &::after {
        width: 100%;
      }
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: ${colors.almondSilk};
      transition: width 0.3s ease;
    }
  }
`;

// Scroll to Top Button
const ScrollToTop = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${colors.almondSilk}, ${colors.powderPetal});
  border: none;
  border-radius: 12px;
  color: #5d4037;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 115, 85, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  border: 2px solid white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(139, 115, 85, 0.4);
  }

  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transform: translateY(${props => props.show ? 0 : '20px'});
`;

const DataScienceInternship = () => {
  const typedRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-out-cubic'
    });

    // Initialize Typed.js
    const typed = new Typed(typedRef.current, {
      strings: ['Data Science.', 'Machine Learning.', 'Analytics.', 'Visualization.', 'Insights.'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
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
      name: 'Python Programming',
      desc: 'Master Python for data manipulation, analysis, and machine learning applications'
    },
    {
      icon: <SiPandas />,
      name: 'Data Analysis',
      desc: 'Pandas and NumPy for cleaning, transforming, and analyzing complex datasets'
    },
    {
      icon: <FaChartBar />,
      name: 'Data Visualization',
      desc: 'Create compelling visualizations with Matplotlib, Seaborn, and Plotly'
    },
    {
      icon: <FaBrain />,
      name: 'Machine Learning',
      desc: 'Build predictive models using Scikit-learn, TensorFlow, and deep learning'
    },
    {
      icon: <TbDatabase />,
      name: 'Database Management',
      desc: 'SQL for efficient data querying and database operations'
    },
    {
      icon: <BiAnalyse />,
      name: 'Statistical Analysis',
      desc: 'Probability, statistics, and hypothesis testing for data-driven insights'
    }
  ];

  // Tools data
  const tools = [
    { icon: <FaPython />, name: 'Python' },
    { icon: <SiPandas />, name: 'Pandas' },
    { icon: <SiNumpy />, name: 'NumPy' },
    { icon: <SiScikitlearn />, name: 'Scikit-learn' },
    { icon: <MdShowChart />, name: 'Matplotlib' },
    { icon: <TbChartHistogram />, name: 'Seaborn' },
    { icon: <SiTensorflow />, name: 'TensorFlow' },
    { icon: <SiJupyter />, name: 'Jupyter' },
    { icon: <SiTableau />, name: 'Tableau' },
    { icon: <SiPycharm />, name: 'PyCharm' },
    { icon: <SiPostgresql />, name: 'PostgreSQL' },
    { icon: <SiGooglecolab />, name: 'Colab' }
  ];

  // Projects data
  const projects = [
    {
      icon: <FaChartLine />,
      name: 'Sales Forecasting',
      desc: 'Predict future sales using advanced time series analysis and forecasting models',
      tech: ['Python', 'Prophet', 'ARIMA', 'Statsmodels']
    },
    {
      icon: <FaUserTie />,
      name: 'Customer Analytics',
      desc: 'Customer segmentation and churn prediction using clustering algorithms',
      tech: ['Scikit-learn', 'XGBoost', 'Pandas', 'Plotly']
    },
    {
      icon: <FaChartArea />,
      name: 'Financial Dashboard',
      desc: 'Interactive financial dashboard with real-time data visualization',
      tech: ['Plotly Dash', 'Pandas', 'Plotly', 'Flask']
    },
    {
      icon: <FaRocket />,
      name: 'Recommendation Engine',
      desc: 'Content-based filtering system for personalized recommendations',
      tech: ['Cosine Similarity', 'TF-IDF', 'Pandas', 'NLTK']
    },
    {
      icon: <MdTrendingUp />,
      name: 'Stock Analysis',
      desc: 'Technical analysis and trend prediction using historical market data',
      tech: ['yFinance', 'NumPy', 'Matplotlib', 'Ta-Lib']
    },
    {
      icon: <MdDataArray />,
      name: 'Employee Analytics',
      desc: 'Comprehensive analysis of employee performance and engagement metrics',
      tech: ['Random Forest', 'Feature Engineering', 'Scikit-learn', 'SHAP']
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: <FaCertificate />,
      name: 'Internship Certificate',
      desc: 'Industry-recognized certification upon successful completion'
    },
    {
      icon: <FaLaptopCode />,
      name: 'Real Data Projects',
      desc: 'Hands-on experience with real-world datasets and business problems'
    },
    {
      icon: <FaGraduationCap />,
      name: 'Portfolio Development',
      desc: 'Build a professional portfolio showcasing your data science skills'
    },
    {
      icon: <FaUserTie />,
      name: 'Letter of Recommendation',
      desc: 'LOR from experienced data scientists and industry mentors'
    }
  ];

  // Curriculum data
  const curriculum = [
    {
      number: '01',
      title: 'Data Science Fundamentals',
      desc: 'Introduction to data science ecosystem, tools, and best practices'
    },
    {
      number: '02',
      title: 'Python for Data Science',
      desc: 'Master Python programming for data manipulation and analysis workflows'
    },
    {
      number: '03',
      title: 'Data Wrangling',
      desc: 'Techniques for preprocessing, cleaning, and preparing datasets'
    },
    {
      number: '04',
      title: 'Exploratory Analysis',
      desc: 'Discover insights and patterns through statistical analysis'
    },
    {
      number: '05',
      title: 'Data Visualization',
      desc: 'Create compelling visualizations and dashboards for storytelling'
    },
    {
      number: '06',
      title: 'Machine Learning',
      desc: 'Build and evaluate predictive models using various algorithms'
    }
  ];

  // Features data
  const features = [
    {
      icon: <FaPython />,
      title: 'Python Mastery',
      desc: 'Comprehensive Python training focused on data science applications'
    },
    {
      icon: <FaDatabase />,
      title: 'Data Processing',
      desc: 'Learn to clean, transform, and prepare data for analysis using Pandas'
    },
    {
      icon: <FaChartBar />,
      title: 'Visual Storytelling',
      desc: 'Create compelling visualizations that communicate insights effectively'
    },
    {
      icon: <FaBrain />,
      title: 'ML Algorithms',
      desc: 'Understand and implement machine learning algorithms for predictions'
    },
    {
      icon: <FaSearch />,
      title: 'Statistical Methods',
      desc: 'Apply statistical techniques for hypothesis testing and analysis'
    },
    {
      icon: <FaLightbulb />,
      title: 'Business Insights',
      desc: 'Transform complex data into actionable business intelligence'
    }
  ];

  return (
    <PageContainer>
      <Helmet>
        <title>Data Science Internship | BTC Routes</title>
        <meta
          name="description"
          content="Gain hands-on experience with BTC Routes' Data Science Internship. Learn Python, Pandas, NumPy, Machine Learning, and data visualization through real-world projects."
        />
        <meta
          name="keywords"
          content="BTC Routes, Data Science internship, Python, Pandas, NumPy, Machine Learning, data visualization, data analysis, BTC projects"
        />
        <meta name="author" content="BTC Routes" />
        <link rel="canonical" href="https://www.btcroutes.com/internship/data-science" />
        <meta property="og:title" content="Data Science Internship | BTC Routes" />
        <meta
          property="og:description"
          content="Join BTC Routes' Data Science Internship to master Python, data analysis, and machine learning. Work on live projects and build your career in data science."
        />
        <meta property="og:image" content="%PUBLIC_URL%/logo2.png" />
        <meta property="og:url" content="https://www.btcroutes.com/internship/data-science" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BTC Routes | Data Science Internship" />
        <meta
          name="twitter:description"
          content="Master data science with BTC Routes through hands-on projects. Learn Python, ML, and data visualization for your professional growth."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/logo2.png" />
      </Helmet>

      <GlobalStyle />

      {/* Navigation */}
      <NavbarComponent />

      {/* Hero Section */}
      <HeroSection id="hero">
        <div className="container">
          <div className="row align-items-center min-vh-80">
            <div className="col-lg-7" data-aos="fade-right">
              <HeroTitle>
                Data Science <br />Internship
              </HeroTitle>
              <HeroSubtitle>
                Master <TypedText ref={typedRef}></TypedText>
              </HeroSubtitle>
              <HeroTagline>
                Transform raw data into meaningful insights. Learn cutting-edge data science
                techniques through hands-on projects and real-world applications.
              </HeroTagline>
              <div className="d-flex gap-3">
                <PrimaryButton
                  onClick={() => navigate('/application')}
                  large
                >
                  Apply Now
                  <FaRocket />
                </PrimaryButton>
                <SecondaryButton
                  onClick={() => document.querySelector('#curriculum').scrollIntoView({ behavior: 'smooth' })}
                >
                  View Curriculum
                </SecondaryButton>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <HeroVisualContainer>
                <CentralIcon>
                  <FaBrain />
                </CentralIcon>

                <OrbitRing size={300} duration={20}>
                  <OrbitIcon duration={20}>
                    <FaPython />
                  </OrbitIcon>
                </OrbitRing>

                <OrbitRing size={450} duration={25} reverse>
                  <OrbitIcon duration={25} reverse>
                    <FaDatabase />
                  </OrbitIcon>
                </OrbitRing>

                <OrbitRing size={380} duration={30}>
                  <OrbitIcon duration={30} style={{ top: 'auto', bottom: '-20px' }}>
                    <FaChartLine />
                  </OrbitIcon>
                </OrbitRing>
              </HeroVisualContainer>
            </div>
          </div>
        </div>

        {/* Data Points */}
        <DataPoint top="20%" left="10%" delay="0s" color={colors.almondSilk} />
        <DataPoint top="30%" right="15%" delay="0.5s" color={colors.powderPetal} />
        <DataPoint top="60%" left="20%" delay="1s" color={colors.almondSilk} />
        <DataPoint bottom="25%" right="25%" delay="1.5s" color={colors.powderPetal} />

        {/* Data Streams */}
        <DataStream top="40%" delay="0s" />
        <DataStream top="60%" delay="3s" />
        <DataStream top="80%" delay="6s" />
      </HeroSection>

      {/* About Section */}
      <AboutSection id="about">
        <div className="container">
          <SectionHeader center>
            <h2>About the Internship</h2>
            <SectionSubtitle center>
              Comprehensive training in data science from fundamentals to advanced applications
            </SectionSubtitle>
          </SectionHeader>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <AboutCard data-aos="zoom-in">
                <FeatureGrid>
                  {features.map((feature, index) => (
                    <FeatureItem key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                      <FeatureIcon>
                        {feature.icon}
                      </FeatureIcon>
                      <FeatureContent>
                        <h4>{feature.title}</h4>
                        <p>{feature.desc}</p>
                      </FeatureContent>
                    </FeatureItem>
                  ))}
                </FeatureGrid>
              </AboutCard>
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
              Comprehensive curriculum covering modern data science technologies
            </SectionSubtitle>
          </SectionHeader>
          <div className="row g-4">
            {skills.map((skill, index) => (
              <div key={index} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <SkillCard>
                  <SkillIcon>
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
              Structured curriculum designed for progressive learning in data science
            </SectionSubtitle>
          </SectionHeader>
          <PhaseContainer>
            {curriculum.map((phase, index) => (
              <PhaseCard
                key={index}
                number={phase.number}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <PhaseTitle>{phase.title}</PhaseTitle>
                <PhaseDescription>{phase.desc}</PhaseDescription>
              </PhaseCard>
            ))}
          </PhaseContainer>
        </div>
      </CurriculumSection>

      {/* Tools Section */}
      <ToolsSection id="tools">
        <div className="container">
          <SectionHeader center>
            <h2>Tools & Technologies</h2>
            <SectionSubtitle center>
              Industry-standard tools used in modern data science workflows
            </SectionSubtitle>
          </SectionHeader>
          <ToolsGrid>
            {tools.map((tool, index) => (
              <ToolItem key={index} data-aos="zoom-in" data-aos-delay={index * 50}>
                <ToolIcon>
                  {tool.icon}
                </ToolIcon>
                <ToolName>{tool.name}</ToolName>
              </ToolItem>
            ))}
          </ToolsGrid>
        </div>
      </ToolsSection>

      {/* Projects Section */}
      <ProjectsSection id="projects">
        <div className="container">
          <SectionHeader center>
            <h2>Real-World Projects</h2>
            <SectionSubtitle center>
              Build practical data science applications that showcase your expertise
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
                  <ProjectTech>
                    {project.tech.map((tech, techIndex) => (
                      <TechTag key={techIndex}>{tech}</TechTag>
                    ))}
                  </ProjectTech>
                </ProjectCard>
              </div>
            ))}
          </div>
        </div>
      </ProjectsSection>

      {/* Benefits Section */}
      <BenefitsSection id="benefits">
        <div className="container">
          <SectionHeader center>
            <h2>Certification & Benefits</h2>
            <SectionSubtitle center>
              What you'll gain from this comprehensive data science internship
            </SectionSubtitle>
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

      {/* Apply Section */}
      <ApplySection id="apply">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <ApplyTitle>Transform Data into Decisions</ApplyTitle>
              <ApplySubtitle>
                Join aspiring data scientists and learn to uncover insights that drive innovation.
                Build a career in one of the most in-demand fields in technology today.
              </ApplySubtitle>
              <ApplyButton onClick={() => navigate('/application')}>
                Apply Now
                <FaRocket />
              </ApplyButton>
            </div>
          </div>
        </div>
      </ApplySection>

      {/* Footer */}
      <Footer>
        <div className="container">
          <FooterContent>
            <FooterText>
              &copy; {new Date().getFullYear()} BTC Routes Data Science Internship. All rights reserved.
            </FooterText>
            <FooterLinks>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-and-condition">Terms of Service</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/faq">FAQ</Link>
            </FooterLinks>
          </FooterContent>
        </div>
      </Footer>

      {/* Scroll to Top Button */}
      <ScrollToTop onClick={scrollToTop} show={showScrollTop}>
        <FaChevronUp />
      </ScrollToTop>
    </PageContainer>
  );
};

export default DataScienceInternship;