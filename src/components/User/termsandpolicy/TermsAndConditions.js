import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled, { keyframes } from 'styled-components';
import { TbCertificate } from "react-icons/tb";
import { Helmet } from "react-helmet";
import { 
  AiOutlineGlobal, 
  AiOutlineUser, 
  AiOutlineBook, 
  AiOutlineDollar, 
  AiOutlineTeam, 
  AiOutlineRocket, 
  AiOutlineCopyright, 
  AiOutlineExclamation, 
  AiOutlineEdit, 
  AiOutlineContacts
} from 'react-icons/ai';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(1, 16, 150, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(1, 16, 150, 0.6);
  }
`;

// const pulse = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.05);
//   }
//   100% {
//     transform: scale(1);
//   }
// `;

// Styled Components
const Container = styled.div`
  background: linear-gradient(135deg, #f7f8ff 0%, #e6edff 100%);
  min-height: 100vh;
  font-family: 'Inter', 'Poppins', sans-serif;
  color: #1a1a1a;
`;

// Navigation
// const Navbar = styled.nav`
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(20px);
//   padding: 1rem 0;
//   position: fixed;
//   top: 0;
//   width: 100%;
//   z-index: 1000;
//   border-bottom: 1px solid rgba(1, 16, 150, 0.1);
//   transition: all 0.3s ease;

//   @media (max-width: 768px) {
//     padding: 0.8rem 0;
//   }
// `;

// const NavContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 2rem;

//   @media (max-width: 768px) {
//     padding: 0 1rem;
//   }
// `;

// const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-weight: 700;
//   font-size: 1.5rem;
//   color: #011096;
//   text-decoration: none;

//   &:hover {
//     animation: ${pulse} 0.6s ease;
//   }
// `;

// const LogoIcon = styled.span`
//   color: #0b47b0;
//   font-size: 1.8rem;
// `;

// const NavLinks = styled.div`
//   display: flex;
//   gap: 2rem;
//   align-items: center;

//   @media (max-width: 768px) {
//     position: fixed;
//     top: 0;
//     right: ${props => props.isOpen ? '0' : '-100%'};
//     width: 280px;
//     height: 100vh;
//     background: white;
//     flex-direction: column;
//     justify-content: flex-start;
//     padding-top: 5rem;
//     box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
//     transition: right 0.3s ease;
//     gap: 0;
//   }
// `;

// const NavLink = styled.a`
//   color: #1a1a1a;
//   text-decoration: none;
//   font-weight: 500;
//   transition: all 0.3s ease;
//   padding: 0.5rem 1rem;
//   border-radius: 8px;
//   position: relative;

//   &:hover {
//     color: #011096;
//     background: rgba(1, 16, 150, 0.05);
//   }

//   &.active {
//     color: #011096;
//     background: rgba(1, 16, 150, 0.1);
//   }

//   @media (max-width: 768px) {
//     padding: 1rem 2rem;
//     width: 100%;
//     text-align: left;
//     border-bottom: 1px solid rgba(1, 16, 150, 0.1);
//   }
// `;

// const MobileMenuButton = styled.button`
//   display: none;
//   background: none;
//   border: none;
//   font-size: 1.5rem;
//   color: #011096;
//   cursor: pointer;
//   padding: 0.5rem;

//   @media (max-width: 768px) {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
// `;

// Hero Section
const HeroSection = styled.section`
  background: linear-gradient(135deg, #011096 0%, #0b47b0 50%, #2f72e4 100%);
  color: white;
  padding: 140px 0 80px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: ${fadeInUp} 0.8s ease;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.95;
  font-weight: 400;
  position: relative;
  animation: ${fadeInUp} 0.8s ease 0.2s both;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
`;

const EffectiveDate = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  display: inline-block;
  margin-top: 2rem;
  font-weight: 500;
  animation: ${fadeInUp} 0.8s ease 0.4s both;
`;

// Main Content
const ContentSection = styled.section`
  padding: 80px 0;
`;

const SectionCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(1, 16, 150, 0.1);
  box-shadow: 0 8px 32px rgba(1, 16, 150, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease both;
  animation-delay: ${props => props.delay || '0ms'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #011096, #0b47b0, #2f72e4);
  }

  &:hover {
    transform: translateY(-5px);
    animation: ${glow} 2s ease-in-out infinite;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionIcon = styled.span`
  font-size: 2.2rem;
  color: #011096;
  margin-right: 1.2rem;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #011096, #0b47b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionTitle = styled.h3`
  color: #011096;
  font-weight: 700;
  margin: 0;
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const SectionContent = styled.p`
  color: #4a5568;
  line-height: 1.8;
  font-size: 1.05rem;
  margin: 0;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
  }
`;

// Quick Navigation
// const QuickNav = styled.div`
//   background: white;
//   border-radius: 15px;
//   padding: 2rem;
//   margin-bottom: 3rem;
//   box-shadow: 0 8px 32px rgba(1, 16, 150, 0.08);
//   border: 1px solid rgba(1, 16, 150, 0.1);
// `;

// const QuickNavTitle = styled.h4`
//   color: #011096;
//   font-weight: 700;
//   margin-bottom: 1.5rem;
//   text-align: center;
//   font-size: 1.3rem;
// `;

// const QuickNavGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 1rem;
// `;

// const QuickNavItem = styled.a`
//   display: flex;
//   align-items: center;
//   gap: 0.8rem;
//   padding: 1rem;
//   background: rgba(1, 16, 150, 0.05);
//   border-radius: 10px;
//   text-decoration: none;
//   color: #4a5568;
//   font-weight: 500;
//   transition: all 0.3s ease;
//   border: 1px solid transparent;

//   &:hover {
//     background: rgba(1, 16, 150, 0.1);
//     color: #011096;
//     border-color: rgba(1, 16, 150, 0.2);
//     transform: translateY(-2px);
//   }
// `;

// Footer Section
const FooterSection = styled.footer`
  background: linear-gradient(135deg, #011096 0%, #0b47b0 100%);
  color: white;
  padding: 4rem 0 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
`;

const FooterContent = styled.div`
  position: relative;
  z-index: 2;
`;

const FooterText = styled.p`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 500;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    text-decoration: none;
  }
`;

const Copyright = styled.p`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.9rem;
  opacity: 0.7;
`;

const TermsAndConditions = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    AOS.init({ 
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const sections = [
    {
      id: 'general',
      icon: <AiOutlineGlobal />,
      title: "General Overview",
      content: "BTC Routes provides training, projects, and internships in technology domains such as Artificial Intelligence, Machine Learning, Data Science, Web Development, and related fields. Participation in our programs indicates that you understand and accept these terms."
    },
    {
      id: 'eligibility',
      icon: <AiOutlineUser />,
      title: "Eligibility",
      content: "Participants must be at least 16 years of age and enrolled in, or graduated from, a recognized academic institution. Proof of identity or enrolment may be requested."
    },
    {
      id: 'enrollment',
      icon: <AiOutlineBook />,
      title: "Course Enrolment and Access",
      content: "Enrolment is confirmed only after full or partial payment as per the program plan. Access to online or offline materials is provided only for the duration of the course. Sharing, distributing, or reselling BTC Routes' materials, code, or recorded sessions is strictly prohibited."
    },
    {
      id: 'fees',
      icon: <AiOutlineDollar />,
      title: "Fees and Payments",
      content: "All fees are listed in Indian Rupees (INR). Payments can be made via UPI, bank transfer, or other approved methods. Fees once paid are non-refundable, except in cases of program cancellation by BTC Routes. Any instalment plan must be completed before certificate issuance."
    },
    {
      id: 'certification',
      icon: <TbCertificate />,
      title: "Certification",
      content: "Certificates are awarded only upon successful completion of all assignments and projects. BTC Routes reserves the right to withhold certificates in case of misconduct or plagiarism."
    },
    {
      id: 'conduct',
      icon: <AiOutlineTeam />,
      title: "Code of Conduct",
      content: "Participants are expected to: Maintain respectful communication with mentors and peers. Avoid plagiarism in assignments or projects. Not misuse BTC Routes' branding or intellectual property. Violation of these policies may lead to termination of access without refund."
    },
    {
      id: 'internship',
      icon: <AiOutlineRocket />,
      title: "Internship and Placement Support",
      content: "BTC Routes may assist students in securing internships or placements through its partner network. Placement support does not guarantee employment. BTC Routes acts only as a facilitator."
    },
    {
      id: 'ip',
      icon: <AiOutlineCopyright />,
      title: "Intellectual Property",
      content: "All course materials, codebases, and designs shared during the program remain the intellectual property of BTC Routes. Students may use project work in their portfolios but cannot redistribute proprietary content."
    },
    {
      id: 'liability',
      icon: <AiOutlineExclamation />,
      title: "Limitation of Liability",
      content: "BTC Routes will not be liable for: Any indirect, incidental, or consequential damages. Service interruptions due to third-party APIs or online platforms (e.g., Zoom, Twilio, Hugging Face)."
    },
    {
      id: 'modifications',
      icon: <AiOutlineEdit />,
      title: "Modifications",
      content: "BTC Routes reserves the right to update, modify, or replace these Terms & Conditions at any time. Changes will be posted on the official website."
    },
    {
      id: 'contact',
      icon: <AiOutlineContacts />,
      title: "Contact Information",
      content: "For questions, concerns, or clarifications: 📧 Email: info.btcroutes@gmail.com 🌐 Website: www.btcroutes.com 🏢 Registered Office: BURJ Tech Consultancy (OPC) Pvt. Ltd., India"
    }
  ];

  // const scrollToSection = (sectionId) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     const offset = 100;
  //     const elementPosition = element.getBoundingClientRect().top;
  //     const offsetPosition = elementPosition + window.pageYOffset - offset;

  //     window.scrollTo({
  //       top: offsetPosition,
  //       behavior: 'smooth'
  //     });
  //   }
  //   setIsMenuOpen(false);
  // };

  return (
    <>
      <Helmet>
        <title>Terms & Conditions | BTC Routes</title>
        <meta
          name="description"
          content="Read BTC Routes Terms & Conditions to understand our policies regarding training, projects, internships, certification, and intellectual property."
        />
        <meta name="keywords" content="BTC Routes, Terms and Conditions, Internship Policy, Certification, AI, ML, Web Development, Data Science" />
        <meta name="author" content="BTC Routes" />
        <meta property="og:title" content="BTC Routes | Terms & Conditions" />
        <meta property="og:description" content="Comprehensive guidelines governing your relationship with BTC Routes and participation in our programs." />
        <meta property="og:image" content="https://www.btcroutes.com/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.btcroutes.com/terms-and-condition" />
        <link rel="canonical" href="https://www.btcroutes.com/terms-and-condition" />
      </Helmet>

      <Container>


        {/* Hero Section */}
        <HeroSection data-aos="fade-up">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-10">
                <HeroTitle>Terms & Conditions</HeroTitle>
                <HeroSubtitle>
                  Comprehensive guidelines governing your relationship with BTC Routes and participation in our programs
                </HeroSubtitle>
                <EffectiveDate>
                  Effective from November 2025 — BTC Routes (BURJ Tech Consultancy Pvt. Ltd.)
                </EffectiveDate>
              </div>
            </div>
          </div>
        </HeroSection>

        {/* Main Content */}
        <ContentSection>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">

                {/* Terms Sections */}
                {sections.map((section, index) => (
                  <SectionCard 
                    key={section.id}
                    id={section.id}
                    delay={`${index * 100}ms`}
                    data-aos="fade-up"
                  >
                    <CardHeader>
                      <SectionIcon>{section.icon}</SectionIcon>
                      <SectionTitle>{section.title}</SectionTitle>
                    </CardHeader>
                    <SectionContent>{section.content}</SectionContent>
                  </SectionCard>
                ))}
              </div>
            </div>
          </div>
        </ContentSection>

        {/* Footer Section */}
        <FooterSection data-aos="fade-up">
          <FooterContent>
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-8">
                  <FooterText>
                    Empowering the next generation of tech professionals
                  </FooterText>
                  <FooterLinks>
                    <FooterLink href="/">Home</FooterLink>
                    <FooterLink href="">Programs</FooterLink>
                    <FooterLink href="/terms-and-condition">Terms & Conditions</FooterLink>
                    <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                    <FooterLink href="/contact">Contact Us</FooterLink>
                  </FooterLinks>
                  <FooterText>
                    📧 info.btcroutes@gmail.com | 🌐 www.btcroutes.com
                  </FooterText>
                  <Copyright>
                    © 2025 BTC Routes — A division of BURJ Tech Consultancy (OPC) Pvt. Ltd.
                    <br />
                    All rights reserved.
                  </Copyright>
                </div>
              </div>
            </div>
          </FooterContent>
        </FooterSection>
      </Container>
    </>
  );
};

export default TermsAndConditions;