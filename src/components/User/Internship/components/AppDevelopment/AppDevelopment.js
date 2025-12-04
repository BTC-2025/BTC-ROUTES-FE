import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed from 'typed.js';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  MdPhoneIphone,
  MdAppShortcut
} from "react-icons/md";
import {
  BiMobileAlt
} from "react-icons/bi";
import {
  TbDeviceMobile
} from "react-icons/tb";
import {

  FaUserTie,
  FaCertificate,
  FaGraduationCap,
  // FaCalendarAlt,
  // FaUsers,
  FaLaptopCode,
  // FaQuoteLeft,
  FaRocket,
  // FaChartBar,
  // FaChartPie,
  // FaSearch,
  // FaLightbulb,
  FaChevronUp,
  // FaTable,
  // FaFilter,
  // FaTableColumns,
  FaAndroid,
  FaApple,
  FaMobile,
  // FaCode,
  FaPaintBrush,
  FaFire,
  FaAppStoreIos,
  FaFigma
} from 'react-icons/fa';
import {
  // SiMysql,
  // SiPython,
  // SiPycharm,
  // SiGoogledatastudio,
  // SiMicrosoftpowerbi,
  // SiMicrosoftexcel,
  // SiTableau,
  // SiPostgresql,
  // SiJupyter,
  SiKotlin,
  SiFlutter,
  // SiDart,
  SiFirebase,
  SiAndroidstudio,
  SiXcode,
  SiPostman,
  SiReact,
  SiSwift
} from 'react-icons/si';
import NavbarComponent from '../Navbarcomponent';

// Color Palette
const colors = {
  jungleTeal: '#2E8B57', // Darker teal for better contrast
  mutedTeal: '#5F9EA0',  // Adjusted muted teal
  frozenWater: '#cce3de',
  azureMist: '#eaf4f4',
  mintCream: '#f6fff8'
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
    color: #2c3e50;
    overflow-x: hidden;
    background: ${colors.mintCream};
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
    background: ${colors.azureMist};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, ${colors.jungleTeal}, ${colors.mutedTeal});
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, ${colors.mutedTeal}, ${colors.jungleTeal});
  }
`;

// Animations
// const float = keyframes`
//   0%, 100% { transform: translateY(0px) rotate(0deg); }
//   50% { transform: translateY(-12px) rotate(2deg); }
// `;

const pulse = keyframes`
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

const phoneFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(3deg); }
`;

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
    font-weight: 800;
    background: linear-gradient(135deg, ${colors.jungleTeal}, #4a6b5b);
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
      background: linear-gradient(90deg, ${colors.jungleTeal}, ${colors.mutedTeal});
      border-radius: 2px;
    }
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.3rem;
  color: #4a6b5b;
  margin-top: 2rem;
  opacity: 0.8;
  max-width: 600px;
  margin-left: ${props => props.center ? 'auto' : '0'};
  margin-right: ${props => props.center ? 'auto' : '0'};
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  font-weight: 500;
`;

// Hero Section
const HeroSection = styled(Section)`
  background: linear-gradient(135deg, ${colors.azureMist} 0%, ${colors.frozenWater} 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 80px;
  border-bottom: 2px solid ${colors.mutedTeal}33;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 80%, ${colors.frozenWater}22 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${colors.mutedTeal}22 0%, transparent 50%);
  }

  .container {
    position: relative;
    z-index: 2;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(135deg, #4a6b5b, ${colors.jungleTeal});
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
  font-weight: 700;
  min-height: 3rem;
  color: #4a6b5b;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TypedText = styled.span`
  color: ${colors.jungleTeal};
  font-weight: 800;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, ${colors.jungleTeal}, ${colors.mutedTeal});
    border-radius: 2px;
  }
`;

const HeroTagline = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: #4a6b5b;
  opacity: 0.9;
  font-weight: 500;
  max-width: 600px;
  font-family: 'Roboto', sans-serif;
  line-height: 1.8;
`;

// Buttons
const ButtonBase = styled.button`
  border: none;
  padding: ${props => props.large ? '20px 50px' : '16px 40px'};
  border-radius: 12px;
  font-weight: 700;
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
    box-shadow: 0 8px 25px rgba(107, 144, 128, 0.2);
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background: linear-gradient(135deg, ${colors.jungleTeal}, ${colors.mutedTeal});
  color: white;
  box-shadow: 0 4px 15px rgba(107, 144, 128, 0.3);
  border: 2px solid ${colors.jungleTeal};

  &:hover {
    background: linear-gradient(135deg, ${colors.mutedTeal}, ${colors.jungleTeal});
    color: white;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background: transparent;
  color: ${colors.jungleTeal};
  border: 2px solid ${colors.mutedTeal};
  box-shadow: 0 4px 12px rgba(107, 144, 128, 0.1);

  &:hover {
    background: rgba(164, 195, 178, 0.1);
    border-color: ${colors.jungleTeal};
  }
`;

// Phone Mockups
const PhoneMockup = styled.div`
  position: absolute;
  width: 200px;
  height: 400px;
  background: white;
  border-radius: 30px;
  border: 4px solid ${colors.jungleTeal};
  box-shadow: 0 15px 35px rgba(107, 144, 128, 0.2);
  overflow: hidden;
  animation: ${phoneFloat} 6s ease-in-out infinite;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 4px;
    background: ${colors.jungleTeal};
    border-radius: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: ${colors.mutedTeal};
    border-radius: 50%;
  }
`;

const AndroidPhone = styled(PhoneMockup)`
  top: 15%;
  right: 15%;
  animation-delay: 0s;
`;

const IOSPhone = styled(PhoneMockup)`
  bottom: 15%;
  left: 15%;
  animation-delay: 2s;
  border-color: ${colors.mutedTeal};

  &::after {
    background: ${colors.jungleTeal};
  }
`;

const PhoneScreen = styled.div`
  width: 85%;
  height: 75%;
  background: linear-gradient(135deg, ${colors.frozenWater}, ${colors.azureMist});
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  color: ${colors.jungleTeal};
  font-weight: 600;
  font-size: 1.1rem;
  font-family: 'Roboto', sans-serif;
`;

// About Section
const AboutSection = styled(Section)`
  background: white;
  position: relative;
  border-top: 2px solid ${colors.frozenWater};
  border-bottom: 2px solid ${colors.frozenWater};
`;

const AboutCard = styled.div`
  background: ${colors.mintCream};
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 2px solid ${colors.frozenWater};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(107, 144, 128, 0.15);
    
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
      rgba(204, 227, 222, 0.1),
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
  border: 2px solid ${colors.frozenWater};
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(107, 144, 128, 0.1);
    border-color: ${colors.mutedTeal};

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
    background: linear-gradient(90deg, ${colors.jungleTeal}, ${colors.mutedTeal});
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

const FeatureIcon = styled.div`
  background: linear-gradient(135deg, ${colors.frozenWater}, ${colors.azureMist});
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${colors.jungleTeal};
  font-size: 1.8rem;
  border: 2px solid ${colors.mutedTeal};
`;

const FeatureContent = styled.div`
  h4 {
    color: ${colors.jungleTeal};
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 1.3rem;
    font-family: 'Roboto', sans-serif;
  }

  p {
    color: #4a6b5b;
    line-height: 1.6;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
  }
`;

// Skills Section
const SkillsSection = styled(Section)`
  background: ${colors.azureMist};
  position: relative;
  border-top: 2px solid ${colors.frozenWater};
`;

const SkillCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  border: 2px solid ${colors.frozenWater};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    border-color: ${colors.mutedTeal};
    box-shadow: 0 15px 35px rgba(107, 144, 128, 0.15);

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
    background: linear-gradient(90deg, ${colors.jungleTeal}, ${colors.mutedTeal});
    transform: translateY(-100%);
    transition: transform 0.4s ease;
  }
`;

const SkillIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: ${colors.jungleTeal};
  transition: all 0.3s ease;

  ${SkillCard}:hover & {
    animation: ${pulse} 0.5s ease;
  }
`;

const SkillName = styled.h4`
  font-weight: 800;
  color: ${colors.jungleTeal};
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const SkillDescription = styled.p`
  color: #4a6b5b;
  line-height: 1.6;
  font-family: 'Roboto', sans-serif;
  font-size: 0.95rem;
`;

// Curriculum Section
const CurriculumSection = styled(Section)`
  background: linear-gradient(135deg, ${colors.frozenWater} 0%, ${colors.mutedTeal} 100%);
  position: relative;
  border-top: 2px solid ${colors.mutedTeal};
  border-bottom: 2px solid ${colors.mutedTeal};
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
    border-color: ${colors.jungleTeal};
    box-shadow: 0 15px 35px rgba(107, 144, 128, 0.2);
  }

  &::before {
    content: '${props => props.number}';
    position: absolute;
    top: -12px;
    left: 30px;
    background: linear-gradient(135deg, ${colors.mutedTeal}, ${colors.jungleTeal});
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.2rem;
    font-family: 'Roboto', sans-serif;
    box-shadow: 0 4px 12px rgba(107, 144, 128, 0.2);
    border: 2px solid white;
  }
`;

const PhaseTitle = styled.h4`
  color: ${colors.jungleTeal};
  font-weight: 800;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
`;

const PhaseDescription = styled.p`
  color: #4a6b5b;
  line-height: 1.7;
  margin-bottom: 0;
  font-family: 'Roboto', sans-serif;
`;

// Tools Section
const ToolsSection = styled(Section)`
  background: ${colors.mintCream};
  position: relative;
  border-top: 2px solid ${colors.frozenWater};
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
  border: 2px solid ${colors.frozenWater};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px) scale(1.05);
    border-color: ${colors.mutedTeal};
    box-shadow: 0 12px 30px rgba(107, 144, 128, 0.15);
  }
`;

const ToolIcon = styled.div`
  font-size: 3rem;
  color: ${colors.jungleTeal};
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  ${ToolItem}:hover & {
    color: ${colors.mutedTeal};
    animation: ${pulse} 0.5s ease;
  }
`;

const ToolName = styled.span`
  font-weight: 600;
  color: ${colors.jungleTeal};
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
`;

// Projects Section
const ProjectsSection = styled(Section)`
  background: ${colors.azureMist};
  position: relative;
  border-top: 2px solid ${colors.frozenWater};
  border-bottom: 2px solid ${colors.frozenWater};
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  height: 100%;
  border: 2px solid ${colors.frozenWater};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-10px);
    border-color: ${colors.mutedTeal};
    box-shadow: 0 20px 40px rgba(107, 144, 128, 0.15);

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
      rgba(204, 227, 222, 0.1),
      transparent
    );
    transition: transform 0.6s ease;
  }
`;

const ProjectIcon = styled.div`
  font-size: 3.5rem;
  color: ${colors.jungleTeal};
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${colors.frozenWater}, ${colors.azureMist});
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${colors.mutedTeal};
`;

const ProjectTitle = styled.h4`
  color: ${colors.jungleTeal};
  font-weight: 800;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const ProjectDescription = styled.p`
  color: #4a6b5b;
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
  background: linear-gradient(135deg, ${colors.frozenWater}, white);
  color: ${colors.jungleTeal};
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  border: 1px solid ${colors.mutedTeal};
`;

// Benefits Section
const BenefitsSection = styled(Section)`
  background: linear-gradient(135deg, white 0%, ${colors.mintCream} 100%);
  position: relative;
  border-top: 2px solid ${colors.frozenWater};
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
  border: 2px solid ${colors.frozenWater};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    border-color: ${colors.mutedTeal};
    box-shadow: 0 15px 35px rgba(107, 144, 128, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${colors.jungleTeal}, ${colors.mutedTeal});
  }
`;

const BenefitIcon = styled.div`
  font-size: 3.5rem;
  color: ${colors.mutedTeal};
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
`;

const BenefitTitle = styled.h4`
  color: ${colors.jungleTeal};
  font-weight: 800;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const BenefitDescription = styled.p`
  color: #4a6b5b;
  position: relative;
  z-index: 2;
  line-height: 1.6;
  font-family: 'Roboto', sans-serif;
`;

// Apply Section
const ApplySection = styled(Section)`
  background: linear-gradient(135deg, ${colors.jungleTeal} 0%, #4a6b5b 100%);
  color: white;
  text-align: center;
  position: relative;
  border-top: 2px solid ${colors.mutedTeal};
`;

const ApplyTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 900;
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
  font-weight: 500;
`;

const ApplyButton = styled(PrimaryButton)`
  background: white;
  color: ${colors.jungleTeal};
  font-size: 1.3rem;
  padding: 20px 60px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);

  &:hover {
    background: ${colors.mintCream};
    color: ${colors.jungleTeal};
    border-color: white;
  }
`;

// Footer
const Footer = styled.footer`
  background: ${colors.jungleTeal};
  color: white;
  padding: 4rem 0 2rem;
  position: relative;
  border-top: 2px solid ${colors.mutedTeal};
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
    color: ${colors.azureMist};
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
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
      background: ${colors.azureMist};
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
  background: linear-gradient(135deg, ${colors.mutedTeal}, ${colors.jungleTeal});
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(107, 144, 128, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  border: 2px solid white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(107, 144, 128, 0.4);
  }

  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transform: translateY(${props => props.show ? 0 : '20px'});
`;

const AppDevelopment = () => {
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
      strings: ['Mobile App Development.', 'Android.', 'iOS.', 'Flutter.', 'React Native.', 'Kotlin.', 'Swift.'],
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
      icon: <SiKotlin />,
      name: 'Kotlin Development',
      desc: 'Native Android development with modern Kotlin and Jetpack'
    },
    {
      icon: <SiFlutter />,
      name: 'Flutter Framework',
      desc: 'Cross-platform apps with Flutter SDK and Dart'
    },
    {
      icon: <SiReact />,
      name: 'React Native',
      desc: 'Build native apps using React and JavaScript'
    },
    {
      icon: <SiSwift />,
      name: 'Swift & iOS',
      desc: 'Native iOS development with Swift and SwiftUI'
    },
    {
      icon: <SiFirebase />,
      name: 'Backend Integration',
      desc: 'Firebase, APIs, and database integration'
    },
    {
      icon: <FaPaintBrush />,
      name: 'UI/UX Design',
      desc: 'Mobile interface design and user experience'
    }
  ];

  // Tools data
  const tools = [
    { icon: <SiAndroidstudio />, name: 'Android Studio' },
    { icon: <SiXcode />, name: 'Xcode' },
    { icon: <SiFlutter />, name: 'Flutter' },
    { icon: <FaFigma />, name: 'Figma' },
    { icon: <SiFirebase />, name: 'Firebase' },
    { icon: <SiPostman />, name: 'Postman' },
    { icon: <SiReact />, name: 'React Native' },
    { icon: <FaAppStoreIos />, name: 'App Store' }
  ];

  // Projects data
  const projects = [
    {
      icon: <FaMobile />,
      name: 'Chat Application',
      desc: 'Real-time messaging app with user authentication and media sharing',
      tech: ['Flutter', 'Firebase', 'Dart']
    },
    {
      icon: <MdAppShortcut />,
      name: 'Food Delivery App',
      desc: 'Complete food ordering system with payment integration and tracking',
      tech: ['React Native', 'Node.js', 'MongoDB']
    },
    {
      icon: <TbDeviceMobile />,
      name: 'Fitness Tracker',
      desc: 'Workout tracking app with progress analytics and health integration',
      tech: ['Kotlin', 'Room DB', 'Health APIs']
    },
    {
      icon: <FaAppStoreIos />,
      name: 'E-Commerce App',
      desc: 'Full-featured mobile shopping experience with AR product preview',
      tech: ['Swift', 'Firebase', 'Stripe']
    },
    {
      icon: <MdPhoneIphone />,
      name: 'Expense Manager',
      desc: 'Personal finance tracker with budget planning and insights',
      tech: ['Flutter', 'SQLite', 'Charts']
    },
    {
      icon: <BiMobileAlt />,
      name: 'Travel Planner',
      desc: 'Trip planning app with itinerary management and recommendations',
      tech: ['React Native', 'Google APIs', 'Maps']
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: <FaCertificate />,
      name: 'Internship Certificate',
      desc: 'Industry-recognized certificate upon successful completion'
    },
    {
      icon: <FaLaptopCode />,
      name: 'Real App Experience',
      desc: 'Hands-on experience building production-ready mobile applications'
    },
    {
      icon: <FaGraduationCap />,
      name: 'Portfolio Development',
      desc: 'Build a professional portfolio showcasing your app development skills'
    },
    {
      icon: <FaUserTie />,
      name: 'Letter of Recommendation',
      desc: 'LOR from experienced mobile app developers and mentors'
    }
  ];

  // Curriculum data
  const curriculum = [
    {
      number: '01',
      title: 'Mobile Development Basics',
      desc: 'Introduction to mobile platforms, tools, and development environment setup'
    },
    {
      number: '02',
      title: 'Programming Fundamentals',
      desc: 'Kotlin, Dart, or Swift programming depending on chosen platform'
    },
    {
      number: '03',
      title: 'UI/UX Design Principles',
      desc: 'Mobile interface design, user experience, and responsive layouts'
    },
    {
      number: '04',
      title: 'App Architecture',
      desc: 'MVC, MVVM, and clean architecture patterns for mobile apps'
    },
    {
      number: '05',
      title: 'Backend Integration',
      desc: 'API integration, authentication, and database management'
    },
    {
      number: '06',
      title: 'Deployment & Publishing',
      desc: 'App store submission, testing, and production deployment'
    }
  ];

  // Features data
  const features = [
    {
      icon: <FaAndroid />,
      title: 'Android Development',
      desc: 'Native Android apps with Kotlin and Android Studio'
    },
    {
      icon: <FaApple />,
      title: 'iOS Development',
      desc: 'Native iOS apps with Swift and Xcode'
    },
    {
      icon: <SiFlutter />,
      title: 'Cross-Platform',
      desc: 'Build once, deploy everywhere with Flutter'
    },
    {
      icon: <SiReact />,
      title: 'React Native',
      desc: 'JavaScript-based native app development'
    },
    {
      icon: <FaFire />,
      title: 'Backend Services',
      desc: 'Firebase, APIs, and cloud integration'
    },
    {
      icon: <FaPaintBrush />,
      title: 'Mobile UI/UX',
      desc: 'Design beautiful, intuitive mobile interfaces'
    }
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
        <meta property="og:title" content="App Development Internship | BTC Routes" />
        <meta
          property="og:description"
          content="Master React Native and Flutter in BTC Routes' App Development Internship. Build professional Android and iOS apps through hands-on projects."
        />
        <meta property="og:image" content="%PUBLIC_URL%/logo2.png" />
        <meta property="og:url" content="https://www.btcroutes.com/internship/app-development" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BTC Routes | App Development Internship" />
        <meta
          name="twitter:description"
          content="Learn mobile app development with BTC Routes. Create Android and iOS apps using React Native and Flutter with expert mentors."
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
                Mobile App <br />Development Internship
              </HeroTitle>
              <HeroSubtitle>
                Master <TypedText ref={typedRef}></TypedText>
              </HeroSubtitle>
              <HeroTagline>
                Transform your ideas into powerful mobile experiences. Learn cutting-edge
                app development technologies through hands-on projects and expert guidance.
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
          </div>
        </div>

        {/* Phone Mockups */}
        <AndroidPhone>
          <PhoneScreen>
            <FaAndroid size={40} />
            <div style={{ marginTop: '10px' }}>Android App</div>
          </PhoneScreen>
        </AndroidPhone>
        <IOSPhone>
          <PhoneScreen>
            <FaApple size={40} />
            <div style={{ marginTop: '10px' }}>iOS App</div>
          </PhoneScreen>
        </IOSPhone>
      </HeroSection>

      {/* About Section */}
      <AboutSection id="about">
        <div className="container">
          <SectionHeader center>
            <h2>About the Internship</h2>
            <SectionSubtitle center>
              Comprehensive training in mobile app development from fundamentals to advanced applications
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
              Comprehensive curriculum covering modern mobile development technologies
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
              Structured curriculum designed for progressive learning in mobile development
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
              Industry-standard tools used in modern mobile app development
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
              Build practical mobile applications that showcase your expertise
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
              What you'll gain from this comprehensive app development internship
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
              <ApplyTitle>Build Apps That Matter</ApplyTitle>
              <ApplySubtitle>
                Join aspiring mobile developers and create innovative apps that reach millions.
                Build a career in one of the fastest-growing fields in technology today.
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
              &copy; {new Date().getFullYear()} BTC Routes Mobile App Development Internship. All rights reserved.
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

export default AppDevelopment;