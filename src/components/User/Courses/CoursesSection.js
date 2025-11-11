import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FaCode, 
  FaServer, 
  FaLaptopCode, 
  FaMobileAlt, 
  FaBrain, 
  FaChartLine, 
  FaRobot,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { SiKotlin } from 'react-icons/si';
import styled from 'styled-components';

// Styled Components
const SectionWrapper = styled.section`
  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap');
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 25%, #f5f5f5 50%, #f8f8ff 75%, #fafafa 100%);
  padding: 60px 0;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  @media (max-width: 576px) {
    padding: 60px 0;
    background: linear-gradient(135deg, #fafafa 0%, #ffffff 30%, #f5f5f5 70%, #f8f8ff 100%);
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: -10%;
  right: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 20%;
    left: 10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: 576px) {
    width: 200px;
    height: 200px;
    top: -5%;
    right: -10%;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  @media (max-width: 576px) {
    margin-bottom: 10px;
  }
`;

const Title = styled.h2`
  color: #1e293b;
  font-size: 3.5rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.5;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 576px) {
    font-size: 2rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 20px;
    line-height: 1.7;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
    padding: 0 15px;
    line-height: 1.6;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    gap: 8px;
    margin-bottom: 10px;
    padding: 0 10px;
  }
`;

const FilterTab = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : '#ffffff'};
  color: ${props => props.active ? '#ffffff' : '#64748b'};
  border: 1px solid ${props => props.active ? 'transparent' : '#e2e8f0'};
  border-radius: 25px;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 4px 15px rgba(14, 165, 233, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  font-family: 'Inter', sans-serif;
  
  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' 
      : 'linear-gradient(135deg, #f8fafc, #f1f5f9)'};
    border-color: ${props => props.active ? 'transparent' : '#cbd5e1'};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 576px) {
    padding: 10px 16px;
    font-size: 0.8rem;
    border-radius: 20px;
  }
`;

// Mobile-specific card styles
const MobileCourseCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const MobileCardHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background: ${props => props.isOpen ? '#f8fafc' : '#ffffff'};
  transition: background 0.3s ease;
`;

const MobileCardContent = styled.div`
  padding: ${props => props.isOpen ? '20px' : '0 20px'};
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.4s ease;
  border-top: ${props => props.isOpen ? '1px solid #e2e8f0' : 'none'};
  background: #fafafa;
`;

const MobileHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
`;

const MobileIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #bae6fd;
`;

const MobileCourseIcon = styled.div`
  font-size: 1.3rem;
  color: #0ea5e9;
`;

const MobileTitleSection = styled.div`
  flex: 1;
`;

const MobileCourseTitle = styled.h3`
  color: #1e293b;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 5px 0;
  font-family: 'Inter', sans-serif;
  line-height: 1.4;
`;

const MobileDifficultyBadge = styled.span`
  background: ${props => {
    switch(props.level) {
      case 'Beginner': return '#f0fdf4';
      case 'Intermediate': return '#fffbeb';
      case 'Advanced': return '#fef2f2';
      default: return '#f0f9ff';
    }
  }};
  color: ${props => {
    switch(props.level) {
      case 'Beginner': return '#16a34a';
      case 'Intermediate': return '#d97706';
      case 'Advanced': return '#dc2626';
      default: return '#0ea5e9';
    }
  }};
  border: 1px solid;
  border-color: ${props => {
    switch(props.level) {
      case 'Beginner': return '#bbf7d0';
      case 'Intermediate': return '#fed7aa';
      case 'Advanced': return '#fecaca';
      default: return '#bae6fd';
    }
  }};
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 0.7rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
`;

const MobileToggleButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f1f5f9;
    color: #0ea5e9;
  }
`;

// Desktop Course Card
const DesktopCourseCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.03) 0%, rgba(99, 102, 241, 0.03) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    border-color: #0ea5e9;
    box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15);
    
    &::before {
      opacity: 1;
    }
    
    .card-icon {
      transform: scale(1.1) rotate(5deg);
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
    }
    
    .course-title {
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 18px;
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid #bae6fd;

  @media (max-width: 576px) {
    width: 60px;
    height: 60px;
  }
`;

const CourseIcon = styled.div`
  font-size: 1.8rem;
  color: #0ea5e9;
  transition: all 0.3s ease;

  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`;

const DifficultyBadge = styled.span`
  background: ${props => {
    switch(props.level) {
      case 'Beginner': return '#f0fdf4';
      case 'Intermediate': return '#fffbeb';
      case 'Advanced': return '#fef2f2';
      default: return '#f0f9ff';
    }
  }};
  color: ${props => {
    switch(props.level) {
      case 'Beginner': return '#16a34a';
      case 'Intermediate': return '#d97706';
      case 'Advanced': return '#dc2626';
      default: return '#0ea5e9';
    }
  }};
  border: 1px solid;
  border-color: ${props => {
    switch(props.level) {
      case 'Beginner': return '#bbf7d0';
      case 'Intermediate': return '#fed7aa';
      case 'Advanced': return '#fecaca';
      default: return '#bae6fd';
    }
  }};
  border-radius: 12px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
`;

const CourseTitle = styled.h3`
  color: #1e293b;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  line-height: 1.4;

  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

const CourseDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  flex-grow: 1;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
`;

// const CourseMeta = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;
//   padding-top: 1rem;
//   border-top: 1px solid #e2e8f0;
// `;

// const MetaItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   color: #64748b;
//   font-size: 0.85rem;
//   font-weight: 400;
//   font-family: 'Inter', sans-serif;
// `;

// const PriceSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-bottom: 1.5rem;
// `;

// const OriginalPrice = styled.span`
//   color: #94a3b8;
//   font-size: 1rem;
//   text-decoration: line-through;
//   font-family: 'Inter', sans-serif;
// `;

// const CurrentPrice = styled.span`
//   color: #1e293b;
//   font-size: 1.4rem;
//   font-weight: 600;
//   font-family: 'Inter', sans-serif;
// `;

// const DiscountBadge = styled.span`
//   background: linear-gradient(135deg, #10b981, #22c55e);
//   color: #ffffff;
//   padding: 4px 8px;
//   border-radius: 6px;
//   font-size: 0.75rem;
//   font-weight: 600;
//   font-family: 'Inter', sans-serif;
// `;

const LearnMoreButton = styled.button`
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(14, 165, 233, 0.4);
  }
`;

// See More Button
const SeeMoreButton = styled.button`
  background: transparent;
  color: #0ea5e9;
  border: 2px solid #0ea5e9;
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 40px auto 0;
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  
  &:hover {
    background: #0ea5e9;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

// Mobile-specific components
// const MobileMetaGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 15px;
//   margin: 20px 0;
// `;

// const MobileMetaItem = styled.div`
//   text-align: center;
//   padding: 10px;
//   background: #ffffff;
//   border-radius: 10px;
//   border: 1px solid #e2e8f0;
// `;

// const MobileMetaValue = styled.div`
//   font-size: 1rem;
//   font-weight: 600;
//   color: #1e293b;
//   margin-bottom: 4px;
//   font-family: 'Inter', sans-serif;
// `;

// const MobileMetaLabel = styled.div`
//   font-size: 0.7rem;
//   color: #64748b;
//   font-weight: 400;
//   font-family: 'Inter', sans-serif;
// `;

// const MobilePriceSection = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin: 20px 0;
//   padding: 15px;
//   background: linear-gradient(135deg, #f8fafc, #f1f5f9);
//   border-radius: 12px;
// `;

// const MobilePriceLeft = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const MobileOriginalPrice = styled.span`
//   color: #94a3b8;
//   font-size: 0.9rem;
//   text-decoration: line-through;
//   font-family: 'Inter', sans-serif;
// `;

// const MobileCurrentPrice = styled.span`
//   color: #1e293b;
//   font-size: 1.3rem;
//   font-weight: 600;
//   font-family: 'Inter', sans-serif;
// `;

// const MobileDiscountBadge = styled.span`
//   background: linear-gradient(135deg, #10b981, #22c55e);
//   color: #ffffff;
//   padding: 4px 8px;
//   border-radius: 6px;
//   font-size: 0.7rem;
//   font-weight: 600;
//   font-family: 'Inter', sans-serif;
// `;

// Courses Data
const coursesData = [
  {
    id: 1,
    name: "Frontend Development",
    icon: <FaCode />,
    description: "Master modern frontend technologies including React, and advanced CSS. Build responsive, accessible web applications with hands-on projects and real-world scenarios.",
    category: "web",
    level: "Beginner",
    animation: "fade-up"
  },
  {
    id: 2,
    name: "Backend Development",
    icon: <FaServer />,
    description: "Learn to build scalable APIs and server architecture with Node.js, Express, and cloud deployment. Focus on security, performance, and best practices.",
    category: "web",
    level: "Intermediate",
    animation: "fade-up"
  },
  {
    id: 3,
    name: "Full Stack (MERN)",
    icon: <FaLaptopCode />,
    description: "Complete full-stack development with MongoDB, Express, React, and Node.js. End-to-end project experience with deployment and DevOps basics.",
    category: "web",
    level: "Intermediate",
    animation: "fade-up"
  },
  {
    id: 4,
    name: "Flutter App Development",
    icon: <FaMobileAlt />,
    description: "Build beautiful, high-performance cross-platform mobile applications with Flutter and Dart. Learn state management, APIs, and publishing.",
    category: "mobile",
    level: "Beginner",
    animation: "fade-up"
  },
  {
    id: 5,
    name: "Kotlin App Development",
    icon: <SiKotlin />,
    description: "Create modern native Android applications using Kotlin and Jetpack Compose with best practices. Focus on modern Android development patterns.",
    category: "mobile",
    level: "Intermediate",
    animation: "fade-up"
  },
  {
    id: 6,
    name: "AI & Data Science",
    icon: <FaBrain />,
    description: "Comprehensive AI and data science training with Python, TensorFlow, and real-world ML projects. Covering from basics to advanced algorithms.",
    category: "ai",
    level: "Advanced",
    animation: "fade-up"
  },
  {
    id: 7,
    name: "ML & Data Analytics",
    icon: <FaChartLine />,
    description: "Master machine learning algorithms and data analytics techniques for business intelligence. Learn visualization and data-driven decision making.",
    category: "ai",
    level: "Intermediate",
    animation: "fade-up"
  },
  {
    id: 8,
    name: "AI & Machine Learning",
    icon: <FaRobot />,
    description: "Advanced AI concepts including neural networks, NLP, and computer vision with PyTorch. Deep dive into cutting-edge AI technologies.",
    category: "ai",
    level: "Advanced",
    animation: "fade-up"
  }
];

const CoursesSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [openMobileCard, setOpenMobileCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredCourses(coursesData);
    } else {
      setFilteredCourses(coursesData.filter(course => course.category === activeFilter));
    }
    setShowAllCourses(false);
  }, [activeFilter]);

  const handleLearnMore = (courseName) => {
    console.log(`Learn more about ${courseName}`);
    // Implement navigation logic here
  };

  const toggleMobileCard = (courseId) => {
    setOpenMobileCard(openMobileCard === courseId ? null : courseId);
  };

  const toggleShowAllCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  const filters = [
    { key: 'all', label: 'All Courses' },
    { key: 'web', label: 'Web Development' },
    { key: 'mobile', label: 'Mobile Development' },
    { key: 'ai', label: 'AI & Data Science' }
  ];

  // Determine which courses to display
  const displayedCourses = showAllCourses 
    ? filteredCourses 
    : filteredCourses.slice(0, 4);

  const renderDesktopCard = (course) => (
    <Col 
      key={course.id}
      xl={3}
      lg={4}
      md={6}
      sm={12}
      data-aos={course.animation}
      className="mb-4"
    >
      <DesktopCourseCard>
        <CardHeader>
          <IconWrapper className="card-icon">
            <CourseIcon>
              {course.icon}
            </CourseIcon>
          </IconWrapper>
          <DifficultyBadge level={course.level}>
            {course.level}
          </DifficultyBadge>
        </CardHeader>
        
        <CourseTitle className="course-title">
          {course.name}
        </CourseTitle>
        
        <CourseDescription>
          {course.description}
        </CourseDescription>

        <LearnMoreButton
          onClick={() => handleLearnMore(course.name)}
        >
          Enroll Now <FaArrowRight size={14} />
        </LearnMoreButton>
      </DesktopCourseCard>
    </Col>
  );

  const renderMobileCard = (course) => (
    <div key={course.id} data-aos={course.animation}>
      <MobileCourseCard>
        <MobileCardHeader 
          onClick={() => toggleMobileCard(course.id)}
          isOpen={openMobileCard === course.id}
        >
          <MobileHeaderLeft>
            <MobileIconWrapper>
              <MobileCourseIcon>
                {course.icon}
              </MobileCourseIcon>
            </MobileIconWrapper>
            <MobileTitleSection>
              <MobileCourseTitle>
                {course.name}
              </MobileCourseTitle>
              <MobileDifficultyBadge level={course.level}>
                {course.level}
              </MobileDifficultyBadge>
            </MobileTitleSection>
          </MobileHeaderLeft>
          <MobileToggleButton>
            {openMobileCard === course.id ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
          </MobileToggleButton>
        </MobileCardHeader>

        <MobileCardContent isOpen={openMobileCard === course.id}>
          <CourseDescription>
            {course.description}
          </CourseDescription>

          <LearnMoreButton
            onClick={() => handleLearnMore(course.name)}
          >
            Enroll Now <FaArrowRight size={14} />
          </LearnMoreButton>
        </MobileCardContent>
      </MobileCourseCard>
    </div>
  );

  return (
    <SectionWrapper id="courses">
      <BackgroundDecoration />
      <Container>
        <SectionHeader>
          <Title 
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Master In-Demand Tech Skills
          </Title>
          <Subtitle 
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Transform your career with industry-relevant courses, hands-on projects, and expert mentorship designed for real-world success
          </Subtitle>
        </SectionHeader>

        <FilterTabs>
          {filters.map((filter, index) => (
            <FilterTab
              key={filter.key}
              active={activeFilter === filter.key}
              onClick={() => setActiveFilter(filter.key)}
              data-aos="fade-up"
              data-aos-delay={400 + index * 100}
            >
              {filter.label}
            </FilterTab>
          ))}
        </FilterTabs>

        {!isMobile ? (
          <>
            <Row style={{display:'flex',justifyContent:'center'}}>
              {displayedCourses.map((course) => renderDesktopCard(course))}
            </Row>
            
            {filteredCourses.length > 4 && (
              <ButtonWrapper data-aos="fade-up">
                <SeeMoreButton onClick={toggleShowAllCourses}>
                  {showAllCourses ? 'Show Less Courses' : 'Explore All Courses'} 
                  {showAllCourses ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                </SeeMoreButton>
              </ButtonWrapper>
            )}
          </>
        ) : (
          <div className="mobile-courses-container">
            {displayedCourses.map((course) => renderMobileCard(course))}
            
            {filteredCourses.length > 4 && (
              <ButtonWrapper data-aos="fade-up">
                <SeeMoreButton onClick={toggleShowAllCourses}>
                  {showAllCourses ? 'Show Less Courses' : 'Explore All Courses'} 
                  {showAllCourses ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                </SeeMoreButton>
              </ButtonWrapper>
            )}
          </div>
        )}
      </Container>
    </SectionWrapper>
  );
};

export default CoursesSection;