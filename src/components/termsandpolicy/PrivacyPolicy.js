import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled, { keyframes } from 'styled-components';
import { 
  AiOutlineInfoCircle, 
  AiOutlineEye, 
  AiOutlineDatabase, 
  AiOutlineShareAlt, 
  AiOutlinePieChart, 
  AiOutlineDelete, 
  AiOutlineSecurityScan, 
  AiOutlineLink, 
  AiOutlineSync,
  AiOutlineContacts,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineArrowUp
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

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled Components
const Container = styled.div`
  background: linear-gradient(135deg, #f7f8ff 0%, #e6edff 100%);
  min-height: 100vh;
  font-family: 'Inter', 'Poppins', sans-serif;
  color: #1a1a1a;
`;

// Navigation
const Navbar = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid rgba(1, 16, 150, 0.1);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.8rem 0;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: #011096;
  text-decoration: none;

  &:hover {
    animation: ${pulse} 0.6s ease;
  }
`;

const LogoIcon = styled.span`
  color: #0b47b0;
  font-size: 1.8rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 280px;
    height: 100vh;
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 5rem;
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    gap: 0;
  }
`;

const NavLink = styled.a`
  color: #1a1a1a;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  position: relative;

  &:hover {
    color: #011096;
    background: rgba(1, 16, 150, 0.05);
  }

  &.active {
    color: #011096;
    background: rgba(1, 16, 150, 0.1);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid rgba(1, 16, 150, 0.1);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #011096;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

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

// Quick Access Section
const QuickAccessSection = styled.section`
  padding: 4rem 0 2rem;
  background: rgba(255, 255, 255, 0.5);
`;

const QuickAccessContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.25rem 1.5rem 1.25rem 3.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 15px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  &:focus {
    outline: none;
    border-color: #0b47b0;
    box-shadow: 0 4px 30px rgba(11, 71, 176, 0.15);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1.2rem;
`;

const QuickNavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const QuickNavCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    animation: ${pulse} 0.6s ease;
  }
`;

const QuickNavIcon = styled.div`
  font-size: 2.5rem;
  color: #0b47b0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuickNavTitle = styled.h3`
  color: #1a1a1a;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const QuickNavDescription = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
`;

// Main Content
const ContentSection = styled.section`
  padding: 4rem 0;
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

  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 1.5rem;
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

// Scroll to Top Button
const ScrollToTop = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #011096, #0b47b0);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(1, 16, 150, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(1, 16, 150, 0.4);
  }

  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`;

const PrivacyPolicy = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    AOS.init({ 
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const sections = [
    {
      id: 'information-collected',
      icon: <AiOutlineInfoCircle />,
      title: "Information We Collect",
      content: "We may collect the following data: Personal details: name, email address, phone number, college name, and academic status. Payment information (via secure third-party gateways). Usage data such as browser type, IP address, and session activity on our website."
    },
    {
      id: 'information-use',
      icon: <AiOutlineEye />,
      title: "How We Use Your Information",
      content: "We use your data to: Register and manage course or internship participation. Send learning materials, certificates, and updates. Provide internship and placement support. Improve our website and learning experience. Send occasional informational or promotional emails (you can unsubscribe anytime)."
    },
    {
      id: 'data-storage',
      icon: <AiOutlineDatabase />,
      title: "Data Storage and Security",
      content: "Data is stored on secure cloud platforms (e.g., Google Workspace, Notion, Airtable). Access is restricted to authorized BTC Routes staff only. Payment data is processed through secure, PCI-compliant gateways; BTC Routes never stores full payment credentials."
    },
    {
      id: 'data-sharing',
      icon: <AiOutlineShareAlt />,
      title: "Data Sharing",
      content: "BTC Routes does not sell or trade user data. Limited information (such as name, course, and project summary) may be shared with: Verified internship partners for placement purposes. Accrediting or certification authorities (if applicable)."
    },
    {
      id: 'cookies-analytics',
      icon: <AiOutlinePieChart />,
      title: "Cookies and Analytics",
      content: "Our website may use cookies and analytics tools to enhance user experience and monitor website performance. Users can disable cookies in their browser settings."
    },
    {
      id: 'data-retention',
      icon: <AiOutlineDelete />,
      title: "Data Retention and Deletion",
      content: "Student data is retained for up to 24 months after course completion for verification and certificate reissue. You may request deletion of your data by emailing info.btcroutes@gmail.com."
    },
    {
      id: 'your-rights',
      icon: <AiOutlineSecurityScan />,
      title: "Your Rights",
      content: "You have the right to: Access your stored information. Request correction of inaccurate data. Withdraw consent or delete data at any time."
    },
    {
      id: 'third-party-links',
      icon: <AiOutlineLink />,
      title: "Third-Party Links",
      content: "BTC Routes' website may contain links to external websites (e.g., GitHub, LinkedIn). We are not responsible for the privacy practices or content of those websites."
    },
    {
      id: 'policy-updates',
      icon: <AiOutlineSync />,
      title: "Updates to This Policy",
      content: "BTC Routes may update this Privacy Policy periodically. Updates will be posted on our official website, and major changes will be notified via email."
    },
    {
      id: 'contact',
      icon: <AiOutlineContacts />,
      title: "Contact",
      content: "For privacy concerns, please contact: 📧 info.btcroutes@gmail.com 🌐 www.btcroutes.in 🏢 BURJ Tech Consultancy (OPC) Pvt. Ltd., India"
    }
  ];

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quickAccessItems = sections.slice(0, 6);

  return (
    <Container>
      {/* Navigation */}
      {/* <Navbar>
        <NavContainer>
          <Logo href="/">
            <LogoIcon>
              <AiOutlineHome />
            </LogoIcon>
            BTC Routes
          </Logo>

          <NavLinks isOpen={isMenuOpen}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/programs">Programs</NavLink>
            <NavLink href="/internships">Internships</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </NavLinks>

          <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </MobileMenuButton>
        </NavContainer>
      </Navbar> */}

      {/* Hero Section */}
      <HeroSection data-aos="fade-up">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <HeroTitle>Privacy Policy</HeroTitle>
              <HeroSubtitle>
                Your data, your trust — Comprehensive guidelines on how we protect and handle your personal information
              </HeroSubtitle>
              <EffectiveDate>
                Effective from November 2025 — BTC Routes (BURJ Tech Consultancy Pvt. Ltd.)
              </EffectiveDate>
            </div>
          </div>
        </div>
      </HeroSection>

      {/* Quick Access Section */}
      {/* <QuickAccessSection>
        <QuickAccessContent>
          <SearchContainer data-aos="fade-up">
            <SearchIcon>
              <AiOutlineSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search privacy policy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <QuickNavGrid data-aos="fade-up" data-aos-delay="200">
            {quickAccessItems.map((item, index) => (
              <QuickNavCard 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <QuickNavIcon>
                  {item.icon}
                </QuickNavIcon>
                <QuickNavTitle>
                  {item.title}
                </QuickNavTitle>
                <QuickNavDescription>
                  {item.content.substring(0, 100)}...
                </QuickNavDescription>
              </QuickNavCard>
            ))}
          </QuickNavGrid>
        </QuickAccessContent>
      </QuickAccessSection> */}

      {/* Main Content */}
      <ContentSection>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {filteredSections.map((section, index) => (
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
                  We respect your privacy and are committed to protecting your personal data
                </FooterText>
                <FooterLinks>
                  <FooterLink href="/">Home</FooterLink>
                  <FooterLink href="">Programs</FooterLink>
                  <FooterLink href="/terms-and-condition">Terms & Conditions</FooterLink>
                  <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                  <FooterLink href="/contact">Contact Us</FooterLink>
                </FooterLinks>
                <FooterText>
                  📧 info.btcroutes@gmail.com | 🌐 www.btcroutes.in
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

      {/* Scroll to Top Button */}
      <ScrollToTop 
        visible={showScrollTop} 
        onClick={scrollToTop}
      >
        <AiOutlineArrowUp />
      </ScrollToTop>
    </Container>
  );
};

export default PrivacyPolicy;