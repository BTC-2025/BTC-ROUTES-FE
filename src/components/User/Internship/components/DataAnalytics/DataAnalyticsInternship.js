import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed from 'typed.js';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  // MdShowChart,
  MdTrendingUp,
  MdDataArray,
  // MdAnalytics,
  MdInsights
} from "react-icons/md";
import {
  BiBarChartAlt2,
  // BiAnalyse,
  // BiStats
} from "react-icons/bi";
import {
  // TbChartHistogram,
  // TbDatabase,
  // TbChartLine,
  TbChartArea
} from "react-icons/tb";
import {
  FaChartLine,
  // FaDatabase,
  // FaPython,
  FaUserTie,
  FaCertificate,
  FaGraduationCap,
  // FaCalendarAlt,
  // FaUsers,
  FaLaptopCode,
  // FaQuoteLeft,
  FaRocket,
  FaChartBar,
  FaChartPie,
  // FaSearch,
  // FaLightbulb,
  FaChevronUp,
  // FaTable,
  // FaFilter,
  // FaTableColumns
} from 'react-icons/fa';
import {
  SiMysql,
  SiPython,
  SiPycharm,
  SiGoogledatastudio,
  SiTableau,
  SiPostgresql,
  SiJupyter
} from 'react-icons/si';
// import { BiBarChartAlt2 } from "react-icons/bi";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import NavbarComponent from '../Navbarcomponent';

// Color Palette
const colors = {
  platinum: '#e7ecef',
  duskBlue: '#274c77',
  steelBlue: '#6096ba',
  icyBlue: '#a3cef1',
  greyOlive: '#8b8c89'
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
    color: #333;
    overflow-x: hidden;
    background: ${colors.platinum};
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
    background: ${colors.platinum};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, ${colors.steelBlue}, ${colors.duskBlue});
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, ${colors.duskBlue}, ${colors.steelBlue});
  }
`;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
`;

const dataFlow = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const gentlePulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.02); }
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
    font-weight: 400;
    background: linear-gradient(135deg, ${colors.duskBlue}, ${colors.steelBlue});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.3px;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: ${props => props.center ? '50%' : '0'};
      transform: ${props => props.center ? 'translateX(-50%)' : 'none'};
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, ${colors.steelBlue}, ${colors.icyBlue});
      border-radius: 2px;
    }
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${colors.duskBlue};
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
  background: linear-gradient(135deg, ${colors.platinum} 0%, ${colors.icyBlue} 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 80px;
  border-bottom: 1px solid ${colors.steelBlue}33;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 80%, ${colors.icyBlue}22 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${colors.steelBlue}22 0%, transparent 50%);
  }

  .container {
    position: relative;
    z-index: 2;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(135deg, ${colors.duskBlue}, ${colors.greyOlive});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Roboto', sans-serif;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
`;

const HeroSubtitle = styled.div`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 400;
  min-height: 3rem;
  color: ${colors.duskBlue};
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TypedText = styled.span`
  color: ${colors.steelBlue};
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, ${colors.steelBlue}, ${colors.icyBlue});
    border-radius: 2px;
  }
`;

const HeroTagline = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: ${colors.duskBlue};
  opacity: 0.9;
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
  font-weight: 400;
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
    box-shadow: 0 8px 25px rgba(39, 76, 119, 0.2);
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background: linear-gradient(135deg, ${colors.steelBlue}, ${colors.duskBlue});
  color: white;
  box-shadow: 0 4px 15px rgba(39, 76, 119, 0.3);
  border: 2px solid transparent;

  &:hover {
    background: linear-gradient(135deg, ${colors.duskBlue}, ${colors.steelBlue});
    color: white;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background: transparent;
  color: ${colors.duskBlue};
  border: 2px solid ${colors.steelBlue};
  box-shadow: 0 4px 12px rgba(39, 76, 119, 0.1);

  &:hover {
    background: rgba(96, 150, 186, 0.1);
    border-color: ${colors.duskBlue};
  }
`;

// Data Elements
const DataNode = styled.div`
  position: absolute;
  width: ${props => props.size || '14px'};
  height: ${props => props.size || '14px'};
  background: ${props => props.color || colors.steelBlue};
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(39, 76, 119, 0.2);
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
    height: 2px;
    background: linear-gradient(90deg, transparent, ${colors.steelBlue}, transparent);
    animation: ${dataFlow} 15s linear infinite;
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
  color: ${colors.duskBlue};
  filter: drop-shadow(0 10px 20px rgba(39, 76, 119, 0.2));
  animation: ${float} 6s ease-in-out infinite;
  z-index: 2;
  background: white;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.icyBlue};
  box-shadow: 
    0 20px 40px rgba(0,0,0,0.05),
    inset 0 0 40px rgba(163, 206, 241, 0.2);
`;

const OrbitRing = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 1px dashed ${colors.steelBlue};
  border-radius: 50%;
  animation: ${props => keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `} ${props => props.duration}s linear infinite;
  animation-direction: ${props => props.reverse ? 'reverse' : 'normal'};
  opacity: 0.6;
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
  color: ${colors.duskBlue};
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  border: 1px solid ${colors.icyBlue};
  animation: ${props => keyframes`
    from { transform: translateX(-50%) rotate(0deg); }
    to { transform: translateX(-50%) rotate(-360deg); }
  `} ${props => props.duration}s linear infinite;
  animation-direction: ${props => props.reverse ? 'reverse' : 'normal'};
`;

// About Section
const AboutSection = styled(Section)`
  background: white;
  position: relative;
  border-top: 1px solid ${colors.icyBlue};
  border-bottom: 1px solid ${colors.icyBlue};
`;

const AboutCard = styled.div`
  background: ${colors.platinum};
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 2px solid ${colors.icyBlue};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(96, 150, 186, 0.15);
    
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
      rgba(163, 206, 241, 0.1),
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
  background: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid ${colors.icyBlue};
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(96, 150, 186, 0.1);
    border-color: ${colors.steelBlue};

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
    background: linear-gradient(90deg, ${colors.steelBlue}, ${colors.icyBlue});
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

const FeatureIcon = styled.div`
  background: linear-gradient(135deg, ${colors.icyBlue}, ${colors.platinum});
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${colors.duskBlue};
  font-size: 1.8rem;
  border: 2px solid ${colors.steelBlue};
`;

const FeatureContent = styled.div`
  h4 {
    color: ${colors.duskBlue};
    font-weight: 400;
    margin-bottom: 10px;
    font-size: 1.3rem;
    font-family: 'Roboto', sans-serif;
  }

  p {
    color: ${colors.greyOlive};
    line-height: 1.6;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
  }
`;

// Skills Section
const SkillsSection = styled(Section)`
  background: ${colors.platinum};
  position: relative;
  border-top: 1px solid ${colors.icyBlue};
`;

const SkillCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  border: 2px solid ${colors.icyBlue};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    border-color: ${colors.steelBlue};
    box-shadow: 0 15px 35px rgba(39, 76, 119, 0.15);

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
    background: linear-gradient(90deg, ${colors.steelBlue}, ${colors.icyBlue});
    transform: translateY(-100%);
    transition: transform 0.4s ease;
  }
`;

const SkillIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: ${colors.duskBlue};
  transition: all 0.3s ease;

  ${SkillCard}:hover & {
    animation: ${gentlePulse} 0.5s ease;
  }
`;

const SkillName = styled.h4`
  font-weight: 600;
  color: ${colors.duskBlue};
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const SkillDescription = styled.p`
  color: ${colors.greyOlive};
  line-height: 1.6;
  font-family: 'Roboto', sans-serif;
  font-size: 0.95rem;
`;

// Curriculum Section
const CurriculumSection = styled(Section)`
  background: linear-gradient(135deg, ${colors.icyBlue} 0%, ${colors.steelBlue} 100%);
  position: relative;
  border-top: 1px solid ${colors.steelBlue};
  border-bottom: 1px solid ${colors.steelBlue};
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
  border: 2px solid white;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    border-color: ${colors.duskBlue};
    box-shadow: 0 15px 35px rgba(39, 76, 119, 0.2);
  }

  &::before {
    content: '${props => props.number}';
    position: absolute;
    top: -12px;
    left: 30px;
    background: linear-gradient(135deg, ${colors.steelBlue}, ${colors.duskBlue});
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 1.2rem;
    font-family: 'Roboto', sans-serif;
    box-shadow: 0 4px 12px rgba(39, 76, 119, 0.2);
    border: 2px solid white;
  }
`;

const PhaseTitle = styled.h4`
  color: ${colors.duskBlue};
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
`;

const PhaseDescription = styled.p`
  color: ${colors.greyOlive};
  line-height: 1.7;
  margin-bottom: 0;
  font-family: 'Roboto', sans-serif;
`;

// Tools Section
const ToolsSection = styled(Section)`
  background: white;
  position: relative;
  border-top: 1px solid ${colors.icyBlue};
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ToolItem = styled.div`
  background: ${colors.platinum};
  border-radius: 16px;
  padding: 1.5rem 1rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid ${colors.icyBlue};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px) scale(1.05);
    border-color: ${colors.steelBlue};
    box-shadow: 0 12px 30px rgba(39, 76, 119, 0.15);
  }
`;

const ToolIcon = styled.div`
  font-size: 3rem;
  color: ${colors.duskBlue};
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  ${ToolItem}:hover & {
    color: ${colors.steelBlue};
    animation: ${gentlePulse} 0.5s ease;
  }
`;

const ToolName = styled.span`
  font-weight: 400;
  color: ${colors.duskBlue};
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
`;

// Projects Section
const ProjectsSection = styled(Section)`
  background: ${colors.platinum};
  position: relative;
  border-top: 1px solid ${colors.icyBlue};
  border-bottom: 1px solid ${colors.icyBlue};
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  height: 100%;
  border: 2px solid ${colors.icyBlue};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-10px);
    border-color: ${colors.steelBlue};
    box-shadow: 0 20px 40px rgba(39, 76, 119, 0.15);

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
      rgba(163, 206, 241, 0.1),
      transparent
    );
    transition: transform 0.6s ease;
  }
`;

const ProjectIcon = styled.div`
  font-size: 3.5rem;
  color: ${colors.duskBlue};
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${colors.icyBlue}, ${colors.platinum});
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${colors.steelBlue};
`;

const ProjectTitle = styled.h4`
  color: ${colors.duskBlue};
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const ProjectDescription = styled.p`
  color: ${colors.greyOlive};
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
  background: linear-gradient(135deg, ${colors.icyBlue}, white);
  color: ${colors.duskBlue};
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  border: 1px solid ${colors.steelBlue};
`;

// Benefits Section
const BenefitsSection = styled(Section)`
  background: linear-gradient(135deg, white 0%, ${colors.platinum} 100%);
  position: relative;
  border-top: 1px solid ${colors.icyBlue};
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
  border: 2px solid ${colors.icyBlue};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    border-color: ${colors.steelBlue};
    box-shadow: 0 15px 35px rgba(39, 76, 119, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${colors.steelBlue}, ${colors.icyBlue});
  }
`;

const BenefitIcon = styled.div`
  font-size: 3.5rem;
  color: ${colors.steelBlue};
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
`;

const BenefitTitle = styled.h4`
  color: ${colors.duskBlue};
  font-weight: 600;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const BenefitDescription = styled.p`
  color: ${colors.greyOlive};
  position: relative;
  z-index: 2;
  line-height: 1.6;
  font-family: 'Roboto', sans-serif;
`;

// Apply Section
const ApplySection = styled(Section)`
  background: linear-gradient(135deg, ${colors.duskBlue} 0%, ${colors.steelBlue} 100%);
  color: white;
  text-align: center;
  position: relative;
  border-top: 1px solid ${colors.steelBlue};
`;

const ApplyTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  font-family: 'Roboto', sans-serif;
  letter-spacing: -0.3px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

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
  color: white;
  font-weight: 400;
`;

const ApplyButton = styled(PrimaryButton)`
  background: white;
  color: ${colors.duskBlue};
  font-size: 1.3rem;
  padding: 20px 60px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);

  &:hover {
    background: ${colors.platinum};
    color: ${colors.duskBlue};
    border-color: white;
  }
`;

// Footer
const Footer = styled.footer`
  background: ${colors.duskBlue};
  color: white;
  padding: 4rem 0 2rem;
  position: relative;
  border-top: 1px solid ${colors.steelBlue};
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const FooterText = styled.p`
  margin: 0;
  opacity: 0.9;
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
    color: ${colors.icyBlue};
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    position: relative;

    &:hover {
      opacity: 1;
      color: white;

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
      background: ${colors.icyBlue};
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
  background: linear-gradient(135deg, ${colors.steelBlue}, ${colors.duskBlue});
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(39, 76, 119, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  border: 2px solid white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(39, 76, 119, 0.4);
  }

  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transform: translateY(${props => props.show ? 0 : '20px'});
`;

const DataAnalyticsInternship = () => {
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
      strings: ['Data Analytics.', 'Business Intelligence.', 'Dashboard Design.', 'SQL.', 'Excel.', 'Power BI.'],
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
      icon: <PiMicrosoftExcelLogoBold />,
      name: 'Microsoft Excel',
      desc: 'Advanced formulas, pivot tables, and data analysis techniques'
    },
    {
      icon: <BiBarChartAlt2 />,
      name: 'Power BI',
      desc: 'Interactive dashboard creation and business intelligence'
    },
    {
      icon: <SiMysql />,
      name: 'SQL Queries',
      desc: 'Database queries, joins, and data extraction techniques'
    },
    {
      icon: <SiPython />,
      name: 'Python for Analytics',
      desc: 'Pandas, NumPy, and data manipulation libraries'
    },
    {
      icon: <SiTableau />,
      name: 'Data Visualization',
      desc: 'Advanced charting, dashboards, and storytelling'
    },
    {
      icon: <MdInsights />,
      name: 'Business Insights',
      desc: 'Analytical thinking and strategic decision-making'
    }
  ];

  // Tools data
  const tools = [
    { icon: <PiMicrosoftExcelLogoBold />, name: 'Excel' },
    { icon: <BiBarChartAlt2 />, name: 'Power BI' },
    { icon: <SiTableau />, name: 'Tableau' },
    { icon: <SiMysql />, name: 'SQL' },
    { icon: <SiPython />, name: 'Python' },
    { icon: <SiPostgresql />, name: 'PostgreSQL' },
    { icon: <SiGoogledatastudio />, name: 'Data Studio' },
    { icon: <SiPycharm />, name: 'PyCharm' },
    { icon: <SiJupyter />, name: 'Jupyter' }
  ];

  // Projects data
  const projects = [
    {
      icon: <FaChartLine />,
      name: 'Sales Performance Dashboard',
      desc: 'Real-time sales tracking and performance metrics visualization',
      tech: ['Power BI', 'Excel', 'SQL']
    },
    {
      icon: <FaUserTie />,
      name: 'Customer Analytics',
      desc: 'Customer segmentation and purchase pattern analysis',
      tech: ['Python', 'Pandas', 'Scikit-learn']
    },
    {
      icon: <TbChartArea />,
      name: 'Financial Dashboard',
      desc: 'Interactive financial metrics and KPI tracking system',
      tech: ['Tableau', 'SQL', 'Excel']
    },
    {
      icon: <FaRocket />,
      name: 'Marketing Analytics',
      desc: 'Campaign performance and ROI analysis',
      tech: ['Google Data Studio', 'SQL', 'Python']
    },
    {
      icon: <MdTrendingUp />,
      name: 'Operational Analytics',
      desc: 'Business operations efficiency and performance analysis',
      tech: ['Power BI', 'Excel', 'VBA']
    },
    {
      icon: <MdDataArray />,
      name: 'HR Analytics',
      desc: 'Employee performance and workforce analytics',
      tech: ['Python', 'Pandas', 'Matplotlib']
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: <FaCertificate />,
      name: 'Internship Certificate',
      desc: 'Industry-recognized analytics certification upon completion'
    },
    {
      icon: <FaLaptopCode />,
      name: 'Live Dashboard Projects',
      desc: 'Hands-on experience with real business datasets and problems'
    },
    {
      icon: <FaGraduationCap />,
      name: 'Portfolio Development',
      desc: 'Build a professional portfolio showcasing your analytics skills'
    },
    {
      icon: <FaUserTie />,
      name: 'Letter of Recommendation',
      desc: 'LOR from experienced analytics professionals and mentors'
    }
  ];

  // Curriculum data
  const curriculum = [
    {
      number: '01',
      title: 'Analytics Fundamentals',
      desc: 'Introduction to data analytics, business intelligence, and tools'
    },
    {
      number: '02',
      title: 'Excel Mastery',
      desc: 'Advanced Excel functions, pivot tables, and data analysis'
    },
    {
      number: '03',
      title: 'SQL & Databases',
      desc: 'Database queries, data extraction, and manipulation techniques'
    },
    {
      number: '04',
      title: 'Data Visualization',
      desc: 'Dashboard design, charting, and visual storytelling'
    },
    {
      number: '05',
      title: 'Business Intelligence',
      desc: 'BI tools, reporting, and analytical techniques'
    },
    {
      number: '06',
      title: 'Capstone Project',
      desc: 'End-to-end analytics solution for real business problems'
    }
  ];

  // Features data
  const features = [
    {
      icon: <PiMicrosoftExcelLogoBold />,
      title: 'Excel Expertise',
      desc: 'Master advanced Excel functions, pivot tables, and data analysis'
    },
    {
      icon: <BiBarChartAlt2 />,
      title: 'Power BI & Tableau',
      desc: 'Create interactive dashboards and business intelligence reports'
    },
    {
      icon: <SiMysql />,
      title: 'SQL Mastery',
      desc: 'Learn database queries, joins, and data extraction techniques'
    },
    {
      icon: <SiPython />,
      title: 'Python Analytics',
      desc: 'Data manipulation, analysis, and visualization with Python'
    },
    {
      icon: <MdInsights />,
      title: 'Business Insights',
      desc: 'Transform data into actionable business intelligence'
    },
    {
      icon: <FaChartBar />,
      title: 'Dashboard Design',
      desc: 'Design professional, interactive data visualization dashboards'
    }
  ];

  return (
    <PageContainer>
      <Helmet>
        <title>Data Analytics Internship | BTC Routes</title>
        <meta
          name="description"
          content="Join BTC Routes' Data Analytics Internship to master Excel, SQL, Power BI, and data visualization. Analyze real datasets and gain practical business insights."
        />
        <meta
          name="keywords"
          content="BTC Routes, Data Analytics internship, Excel, SQL, Power BI, Tableau, data visualization, business intelligence, analytics projects"
        />
        <meta name="author" content="BTC Routes" />
        <link rel="canonical" href="https://www.btcroutes.com/internship/data-analytics" />
        <meta property="og:title" content="Data Analytics Internship | BTC Routes" />
        <meta
          property="og:description"
          content="Learn data analytics with BTC Routes' internship program. Work on real-world datasets using Excel, SQL, and Power BI to gain valuable insights."
        />
        <meta property="og:image" content="%PUBLIC_URL%/logo2.png" />
        <meta property="og:url" content="https://www.btcroutes.com/internship/data-analytics" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BTC Routes | Data Analytics Internship" />
        <meta
          name="twitter:description"
          content="Master Data Analytics through BTC Routes' internship. Learn Excel, SQL, and Power BI with live business-oriented projects."
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
                Data Analytics <br />Internship
              </HeroTitle>
              <HeroSubtitle>
                Master <TypedText ref={typedRef}></TypedText>
              </HeroSubtitle>
              <HeroTagline>
                Transform raw data into actionable business intelligence. Learn cutting-edge
                analytics techniques that drive strategic decisions and organizational growth.
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
                  <MdInsights />
                </CentralIcon>

                <OrbitRing size={300} duration={20}>
                  <OrbitIcon duration={20}>
                    <FaChartBar />
                  </OrbitIcon>
                </OrbitRing>

                <OrbitRing size={450} duration={25} reverse>
                  <OrbitIcon duration={25} reverse>
                    <FaChartPie />
                  </OrbitIcon>
                </OrbitRing>

                <OrbitRing size={380} duration={30}>
                  <OrbitIcon duration={30} style={{ top: 'auto', bottom: '-20px' }}>
                    <BiBarChartAlt2 />
                  </OrbitIcon>
                </OrbitRing>
              </HeroVisualContainer>
            </div>
          </div>
        </div>

        {/* Data Nodes */}
        <DataNode top="20%" left="10%" delay="0s" color={colors.steelBlue} />
        <DataNode top="30%" right="15%" delay="0.5s" color={colors.duskBlue} />
        <DataNode top="60%" left="20%" delay="1s" color={colors.steelBlue} />
        <DataNode bottom="25%" right="25%" delay="1.5s" color={colors.duskBlue} />

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
              Comprehensive training in data analytics from fundamentals to advanced applications
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
              Comprehensive curriculum covering modern data analytics technologies
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
              Structured curriculum designed for progressive learning in data analytics
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
              Industry-standard tools used in modern data analytics workflows
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
              Build practical analytics solutions that showcase your expertise
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
              What you'll gain from this comprehensive data analytics internship
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
                Join aspiring data analysts and learn to uncover insights that power business success.
                Build a career in one of the most in-demand fields in modern business.
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
              &copy; {new Date().getFullYear()} BTC Routes Data Analytics Internship. All rights reserved.
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

export default DataAnalyticsInternship;