import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typed from 'typed.js';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BiLogoVisualStudio } from "react-icons/bi"
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
  // FaQuoteLeft,
  FaRocket,
  FaMobile,
  FaPalette,
  FaChevronUp
} from 'react-icons/fa';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGithub,
} from 'react-icons/si';
import NavbarComponent from '../Navbarcomponent';

// Color Palette
const colors = {
  aliceBlue: '#edf2fb',
  lavender: '#e2eafc',
  lavender2: '#d7e3fc',
  periwinkle: '#ccdbfd',
  periwinkle2: '#c1d3fe',
  periwinkle3: '#b6ccfe',
  babyBlueIce: '#abc4ff',
  darkBlue: '#1a237e',
  navyBlue: '#283593',
  royalBlue: '#303f9f'
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
    color: ${colors.darkBlue};
    overflow-x: hidden;
    background: linear-gradient(135deg, ${colors.aliceBlue} 0%, ${colors.lavender} 100%);
  }

  html {
    scroll-padding-top: 80px;
    scroll-behavior: smooth;
  }

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(3deg); }
`;

// const shimmer = keyframes`
//   0% { background-position: -1000px 0; }
//   100% { background-position: 1000px 0; }
// `;

// const pulse = keyframes`
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.7; }
// `;

// const wave = keyframes`
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// `;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
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
    font-size: 3.2rem;
    font-weight: 600;
    color: ${colors.navyBlue};
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    font-family: 'Roboto', sans-serif;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: ${props => props.center ? '50%' : '0'};
      transform: ${props => props.center ? 'translateX(-50%)' : 'none'};
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, ${colors.periwinkle3}, ${colors.babyBlueIce});
      border-radius: 2px;
    }
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${colors.navyBlue};
  margin-top: 2rem;
  opacity: 0.9;
  font-family: 'Roboto', sans-serif;
  max-width: 600px;
  margin-left: ${props => props.center ? 'auto' : '0'};
  margin-right: ${props => props.center ? 'auto' : '0'};
`;

// Hero Section
const HeroSection = styled(Section)`
  background: linear-gradient(135deg, ${colors.aliceBlue} 0%, ${colors.periwinkle2} 50%, ${colors.babyBlueIce} 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 80%, rgba(171, 196, 255, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(182, 204, 254, 0.3) 0%, transparent 50%);
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: ${colors.navyBlue};
  font-family: 'Roboto', sans-serif;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
`;

const HeroSubtitle = styled.div`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 500;
  min-height: 3rem;
  color: ${colors.navyBlue};
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TypedText = styled.span`
  color: ${colors.royalBlue};
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, ${colors.periwinkle3}, ${colors.babyBlueIce});
    border-radius: 2px;
  }
`;

const HeroTagline = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: ${colors.navyBlue};
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
  border-radius: 50px;
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

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background: linear-gradient(135deg, ${colors.periwinkle3}, ${colors.babyBlueIce});
  color: ${colors.royalBlue};
  box-shadow: 0 5px 20px rgba(171, 196, 255, 0.4);

  &:hover {
    background: linear-gradient(135deg, ${colors.babyBlueIce}, ${colors.periwinkle3});
    color: ${colors.royalBlue};
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background: ${colors.lavender};
  color: ${colors.royalBlue};
  border: 2px solid ${colors.babyBlueIce};
  box-shadow: 0 5px 15px rgba(171, 196, 255, 0.3);

  &:hover {
    background: ${colors.periwinkle};
    border-color: ${colors.periwinkle3};
  }
`;

// Floating Elements
const FloatingElement = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 2px solid rgba(171, 196, 255, 0.3);
  animation: ${float} 6s ease-in-out infinite;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05) translateY(-10px);
    box-shadow: 0 15px 40px rgba(171, 196, 255, 0.4);
  }

  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  animation-delay: ${props => props.delay || '0s'};
  width: ${props => props.width || 'auto'};
`;

const ElementIcon = styled.div`
  font-size: 2.5rem;
  color: ${colors.royalBlue};
  margin-bottom: 10px;
`;

const ElementText = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
  color: ${colors.navyBlue};
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;

// About Section
const AboutSection = styled(Section)`
  background: ${colors.lavender};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23abc4ff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
`;

const AboutCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(171, 196, 255, 0.3);
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(171, 196, 255, 0.3);
  }
`;

const AboutFeature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FeatureIcon = styled.div`
  background: linear-gradient(135deg, ${colors.periwinkle2}, ${colors.babyBlueIce});
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${colors.royalBlue};
  font-size: 1.5rem;
  box-shadow: 0 5px 15px rgba(171, 196, 255, 0.4);
`;

const FeatureText = styled.div`
  h4 {
    color: ${colors.navyBlue};
    font-weight: 500;
    margin-bottom: 5px;
    font-size: 1.2rem;
    font-family: 'Roboto', sans-serif;
  }

  p {
    color: ${colors.darkBlue};
    opacity: 0.9;
    line-height: 1.6;
    font-family: 'Roboto', sans-serif;
  }
`;

// Skills Section
const SkillsSection = styled(Section)`
  background: linear-gradient(135deg, ${colors.aliceBlue} 0%, ${colors.lavender2} 100%);
  position: relative;
  overflow: hidden;
`;

const SkillCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, ${colors.periwinkle3}, ${colors.babyBlueIce});
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(171, 196, 255, 0.3);
    border-color: ${colors.babyBlueIce};

    &::before {
      transform: scaleX(1);
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: ${props => props.color || colors.royalBlue};
  transition: all 0.3s ease;

  ${SkillCard}:hover & {
    animation: ${bounce} 0.5s ease;
  }
`;

const SkillName = styled.h4`
  font-weight: 600;
  color: ${colors.navyBlue};
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const SkillDescription = styled.p`
  color: ${colors.darkBlue};
  opacity: 0.9;
  line-height: 1.6;
  font-family: 'Roboto', sans-serif;
`;

// Curriculum Section
const CurriculumSection = styled(Section)`
  background: linear-gradient(135deg, ${colors.periwinkle} 0%, ${colors.periwinkle3} 100%);
  position: relative;
  clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%);
`;

const PhaseCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateX(10px);
    border-color: ${colors.babyBlueIce};
    box-shadow: 0 20px 40px rgba(171, 196, 255, 0.3);
  }

  &::before {
    content: '${props => props.number}';
    position: absolute;
    top: -20px;
    left: 30px;
    background: linear-gradient(135deg, ${colors.royalBlue}, ${colors.babyBlueIce});
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const PhaseTitle = styled.h4`
  color: ${colors.navyBlue};
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
`;

const PhaseDescription = styled.p`
  color: ${colors.darkBlue};
  line-height: 1.7;
  margin-bottom: 0;
  font-family: 'Roboto', sans-serif;
`;

// Tools Section
const ToolsSection = styled(Section)`
  background: ${colors.lavender};
  position: relative;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const ToolItem = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem 1rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-10px) scale(1.05);
    border-color: ${colors.babyBlueIce};
    box-shadow: 0 20px 40px rgba(171, 196, 255, 0.3);
  }
`;

const ToolIcon = styled.div`
  font-size: 3.5rem;
  color: ${colors.royalBlue};
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  ${ToolItem}:hover & {
    color: ${colors.babyBlueIce};
    animation: ${rotate} 2s linear infinite;
  }
`;

const ToolName = styled.span`
  font-weight: 500;
  color: ${colors.navyBlue};
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
`;

// Projects Section
const ProjectsSection = styled(Section)`
  background: linear-gradient(135deg, ${colors.aliceBlue} 0%, ${colors.lavender2} 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 10% 10%, rgba(171, 196, 255, 0.2) 0%, transparent 20%),
      radial-gradient(circle at 90% 90%, rgba(182, 204, 254, 0.2) 0%, transparent 20%);
  }
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 25px;
  padding: 2.5rem;
  height: 100%;
  border: 2px solid transparent;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-15px);
    border-color: ${colors.babyBlueIce};
    box-shadow: 0 30px 60px rgba(171, 196, 255, 0.4);

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
      rgba(171, 196, 255, 0.2),
      transparent
    );
    transition: transform 0.6s ease;
  }
`;

const ProjectIcon = styled.div`
  font-size: 3.5rem;
  color: ${colors.royalBlue};
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${colors.periwinkle2}, ${colors.babyBlueIce});
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(171, 196, 255, 0.4);
`;

const ProjectTitle = styled.h4`
  color: ${colors.navyBlue};
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
`;

const ProjectDescription = styled.p`
  color: ${colors.darkBlue};
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
  background: ${colors.lavender};
  color: ${colors.royalBlue};
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  border: 1px solid ${colors.periwinkle};
`;

// Benefits Section
const BenefitsSection = styled(Section)`
  background: linear-gradient(135deg, ${colors.periwinkle3} 0%, ${colors.babyBlueIce} 100%);
  clip-path: polygon(0 5%, 100% 0, 100% 95%, 0 100%);
`;

const BenefitCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.4s ease;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, ${colors.royalBlue}, ${colors.babyBlueIce});
  }
`;

const BenefitIcon = styled.div`
  font-size: 3.5rem;
  color: ${colors.royalBlue};
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
`;

const BenefitTitle = styled.h4`
  color: ${colors.navyBlue};
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  position: relative;
  z-index: 2;
  font-family: 'Roboto', sans-serif;
`;

const BenefitDescription = styled.p`
  color: ${colors.darkBlue};
  opacity: 0.9;
  line-height: 1.6;
  position: relative;
  z-index: 2;
  font-family: 'Roboto', sans-serif;
`;

// Apply Section
const ApplySection = styled(Section)`
  background: linear-gradient(135deg, ${colors.royalBlue} 0%, ${colors.navyBlue} 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
`;

const ApplyTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-family: 'Roboto', sans-serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

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
`;

const ApplyButton = styled(PrimaryButton)`
  background: white;
  color: ${colors.royalBlue};
  font-size: 1.3rem;
  padding: 20px 60px;
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);

  &:hover {
    background: ${colors.lavender};
    color: ${colors.royalBlue};
  }
`;

// Footer
const Footer = styled.footer`
  background: ${colors.darkBlue};
  color: white;
  padding: 4rem 0 2rem;
  position: relative;
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
    color: white;
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    position: relative;

    &:hover {
      opacity: 1;
      color: ${colors.babyBlueIce};

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
      background: ${colors.babyBlueIce};
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
  background: linear-gradient(135deg, ${colors.royalBlue}, ${colors.babyBlueIce});
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(171, 196, 255, 0.4);
  }

  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transform: translateY(${props => props.show ? 0 : '20px'});
`;

const WebDevelopmentInternship = () => {
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
      strings: ['Frontend.', 'Backend.', 'Full Stack.', 'React.', 'Node.js.', 'MongoDB.'],
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
      icon: <SiHtml5 />,
      name: 'HTML5 & CSS3',
      desc: 'Modern semantic markup, responsive design, and CSS animations',
      color: colors.royalBlue
    },
    {
      icon: <SiJavascript />,
      name: 'JavaScript ES6+',
      desc: 'Advanced JavaScript, async programming, and modern features',
      color: colors.navyBlue
    },
    {
      icon: <SiReact />,
      name: 'React & State Management',
      desc: 'Component-based architecture, hooks, and state management',
      color: colors.babyBlueIce
    },
    {
      icon: <SiNodedotjs />,
      name: 'Node.js & Express',
      desc: 'Server-side JavaScript, REST APIs, and middleware',
      color: colors.periwinkle3
    },
    {
      icon: <SiMongodb />,
      name: 'MongoDB & Databases',
      desc: 'NoSQL databases, data modeling, and aggregation',
      color: colors.periwinkle2
    },
    {
      icon: <FaCloud />,
      name: 'API & Deployment',
      desc: 'Cloud deployment, CI/CD, and performance optimization',
      color: colors.lavender2
    }
  ];

  // Tools data
  const tools = [
    { icon: <SiHtml5 />, name: 'HTML5' },
    { icon: <SiCss3 />, name: 'CSS3' },
    { icon: <SiJavascript />, name: 'JavaScript' },
    { icon: <SiReact />, name: 'React' },
    { icon: <SiNodedotjs />, name: 'Node.js' },
    { icon: <SiExpress />, name: 'Express' },
    { icon: <SiMongodb />, name: 'MongoDB' },
    { icon: <SiGithub />, name: 'GitHub' },
    { icon: <BiLogoVisualStudio />, name: 'VS Code' }
  ];

  // Projects data
  const projects = [
    {
      icon: <FaCode />,
      name: 'Portfolio Website',
      desc: 'Modern portfolio with animations and responsive design',
      tech: ['React', 'Styled Components', 'Framer Motion']
    },
    {
      icon: <FaLaptopCode />,
      name: 'E-commerce Platform',
      desc: 'Full-featured online store with cart and payment system',
      tech: ['MERN Stack', 'Stripe', 'Redux']
    },
    {
      icon: <FaMobile />,
      name: 'Chat Application',
      desc: 'Real-time messaging app with user authentication',
      tech: ['Socket.io', 'JWT', 'MongoDB']
    },
    {
      icon: <FaPalette />,
      name: 'Blog CMS',
      desc: 'Content management system with rich text editor',
      tech: ['React', 'Node.js', 'PostgreSQL']
    },
    {
      icon: <FaServer />,
      name: 'Task Manager API',
      desc: 'RESTful API for task management with user roles',
      tech: ['Express', 'JWT', 'MongoDB']
    },
    {
      icon: <FaRocket />,
      name: 'Weather Dashboard',
      desc: 'Interactive weather app with charts and forecasts',
      tech: ['React', 'Chart.js', 'Weather API']
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: <FaCertificate />,
      name: 'Internship Certificate',
      desc: 'Industry-recognized certification upon completion'
    },
    {
      icon: <SiGithub />,
      name: 'GitHub Portfolio',
      desc: 'Professional portfolio showcasing your projects'
    },
    {
      icon: <FaLaptopCode />,
      name: 'Live Project Experience',
      desc: 'Hands-on experience with real web applications'
    },
    {
      icon: <FaGraduationCap />,
      name: 'Letter of Recommendation',
      desc: 'LOR from experienced developers and mentors'
    }
  ];

  // Curriculum data
  const curriculum = [
    {
      number: '01',
      title: 'Frontend Foundations',
      desc: 'Master HTML5, CSS3, and modern JavaScript fundamentals with responsive design principles and accessibility standards.'
    },
    {
      number: '02',
      title: 'React Development',
      desc: 'Learn component-based architecture, state management, hooks, and routing in React applications.'
    },
    {
      number: '03',
      title: 'Backend with Node.js',
      desc: 'Build server-side applications with Express, middleware, and RESTful API development.'
    },
    {
      number: '04',
      title: 'Database Integration',
      desc: 'Work with MongoDB for data modeling, queries, and database architecture patterns.'
    },
    {
      number: '05',
      title: 'REST APIs & Authentication',
      desc: 'Implement secure authentication systems and build robust REST APIs with error handling.'
    },
    {
      number: '06',
      title: 'Deployment & DevOps',
      desc: 'Deploy applications to cloud platforms and implement CI/CD pipelines for production.'
    }
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
        <meta property="og:title" content="Web Development Internship | BTC Routes" />
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BTC Routes | Web Development Internship" />
        <meta
          name="twitter:description"
          content="Build a strong web development foundation with BTC Routes' live internship program using React, Node.js, and MongoDB."
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
                Web Development <br />Internship
              </HeroTitle>
              <HeroSubtitle>
                Master <TypedText ref={typedRef}></TypedText>
              </HeroSubtitle>
              <HeroTagline>
                Transform your ideas into reality. Learn to build modern, scalable web applications
                with industry-standard tools and best practices.
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
              {/* Floating elements will be positioned here */}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        {/* <FloatingElement top="20%" left="5%" delay="0s" width="140px">
          <ElementIcon><FaCode /></ElementIcon>
          <ElementText>Hands-on Coding</ElementText>
        </FloatingElement> */}

        <FloatingElement top="15%" right="10%" delay="1s" width="140px">
          <ElementIcon><FaLaptopCode /></ElementIcon>
          <ElementText>Live Projects</ElementText>
        </FloatingElement>

        {/* <FloatingElement bottom="25%" left="15%" delay="2s" width="140px">
          <ElementIcon><FaCertificate /></ElementIcon>
          <ElementText>Certification</ElementText>
        </FloatingElement> */}

        <FloatingElement bottom="20%" right="8%" delay="3s" width="140px">
          <ElementIcon><FaGraduationCap /></ElementIcon>
          <ElementText>Mentorship</ElementText>
        </FloatingElement>
      </HeroSection>

      {/* About Section */}
      <AboutSection id="about">
        <div className="container">
          <SectionHeader center>
            <h2>About the Internship</h2>
          </SectionHeader>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <AboutCard data-aos="zoom-in">
                <div className="row">
                  <div className="col-lg-6">
                    <AboutFeature>
                      <FeatureIcon><FaLaptopCode /></FeatureIcon>
                      <FeatureText>
                        <h4>Real-World Projects</h4>
                        <p>Work on live projects that solve actual problems and add value to your portfolio.</p>
                      </FeatureText>
                    </AboutFeature>
                    <AboutFeature>
                      <FeatureIcon><FaUsers /></FeatureIcon>
                      <FeatureText>
                        <h4>Expert Mentorship</h4>
                        <p>Learn from experienced developers who guide you through complex concepts.</p>
                      </FeatureText>
                    </AboutFeature>
                    <AboutFeature>
                      <FeatureIcon><FaCalendarAlt /></FeatureIcon>
                      <FeatureText>
                        <h4>Flexible Duration</h4>
                        <p>Choose between 1-3 months based on your learning pace and goals.</p>
                      </FeatureText>
                    </AboutFeature>
                  </div>
                  <div className="col-lg-6">
                    <AboutFeature>
                      <FeatureIcon><FaServer /></FeatureIcon>
                      <FeatureText>
                        <h4>Full-Stack Development</h4>
                        <p>Master both frontend and backend technologies in the MERN stack.</p>
                      </FeatureText>
                    </AboutFeature>
                    <AboutFeature>
                      <FeatureIcon><SiGithub /></FeatureIcon>
                      <FeatureText>
                        <h4>Git & Collaboration</h4>
                        <p>Learn professional version control and team collaboration workflows.</p>
                      </FeatureText>
                    </AboutFeature>
                    <AboutFeature>
                      <FeatureIcon><FaCloud /></FeatureIcon>
                      <FeatureText>
                        <h4>Cloud Deployment</h4>
                        <p>Deploy your applications to cloud platforms like Vercel and AWS.</p>
                      </FeatureText>
                    </AboutFeature>
                  </div>
                </div>
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
              Comprehensive curriculum covering modern web development technologies
            </SectionSubtitle>
          </SectionHeader>
          <div className="row g-4">
            {skills.map((skill, index) => (
              <div key={index} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
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
              Structured curriculum designed for progressive learning
            </SectionSubtitle>
          </SectionHeader>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {curriculum.map((phase, index) => (
                <PhaseCard
                  key={index}
                  number={phase.number}
                  data-aos="fade-right"
                  data-aos-delay={index * 150}
                >
                  <PhaseTitle>{phase.title}</PhaseTitle>
                  <PhaseDescription>{phase.desc}</PhaseDescription>
                </PhaseCard>
              ))}
            </div>
          </div>
        </div>
      </CurriculumSection>

      {/* Tools Section */}
      <ToolsSection id="tools">
        <div className="container">
          <SectionHeader center>
            <h2>Tools & Technologies</h2>
            <SectionSubtitle center>
              Industry-standard tools used in modern web development
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
            <h2>Live Projects</h2>
            <SectionSubtitle center>
              Build real applications that showcase your full-stack skills
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
              What you'll gain from this internship program
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
              <ApplyTitle>Start Your Development Journey</ApplyTitle>
              <ApplySubtitle>
                Join aspiring developers and build the future of web applications.
                Gain practical experience, industry recognition, and launch your career.
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
              &copy; {new Date().getFullYear()} BTC Routes Web Development Internship. All rights reserved.
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

export default WebDevelopmentInternship;