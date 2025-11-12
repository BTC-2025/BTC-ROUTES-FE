
// import React, { useState, useEffect } from 'react';
// import logo from '../../../assests/logo2.png';
// import './Header.css';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Header = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [showHireModal, setShowHireModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [formData, setFormData] = useState({
//     companyName: '',
//     companyEmail: '',
//     companyPhone: '',
//     domain: '',
//     numofstudents: '',
//     experienceLevel:'',
//     message:''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   // Domain options for dropdown
//   const domainOptions = [
//     'Full Stack Development',
//     'Frontend Development',
//     'Backend Development',
//     'Mobile App Development',
//     'Data Science',
//     'Machine Learning',
//     'Artificial Intelligence',
//     'Cloud Computing',
//     'DevOps',
//     'Cyber Security',
//     'UI/UX Design',
//     'Digital Marketing',
//     'Other'
//   ];

//   // Detect scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Handle body scroll and escape key
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         if (isOpen) setIsOpen(false);
//         if (showHireModal) setShowHireModal(false);
//         if (showSuccessModal) setShowSuccessModal(false);
//       }
//     };

//     if (isOpen || showHireModal || showSuccessModal) {
//       document.body.classList.add('no-scroll');
//       document.addEventListener('keydown', handleEscape);
//     } else {
//       document.body.classList.remove('no-scroll');
//     }

//     return () => {
//       document.body.classList.remove('no-scroll');
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, [isOpen, showHireModal, showSuccessModal]);

//   const scrollToSection = (sectionId) => {
//     document.getElementById(sectionId)?.scrollIntoView({ 
//       behavior: 'smooth',
//       block: 'start'
//     });
//   };

//   const handleNavClick = (item) => {
//     if (item === 'home') {
//       navigate('/');
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else if (item === 'hire with us') {
//       setShowHireModal(true);
//     } else {
//       // Close mobile menu first, then scroll after a brief delay
//       setIsOpen(false);
//       setTimeout(() => {
//         scrollToSection(item);
//       }, 400);
//       return;
//     }
//     setIsOpen(false);
//   };

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeOffcanvas = () => {
//     setIsOpen(false);
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     console.log(formData)

//     try {
//       // Send data to backend
//       const res = await axios.post('https://testing12-3ebu.onrender.com/api/hire/wanthiring', formData);
      
//       if(res.status === 200 || res.status === 201){
//         // Close hire modal and show success modal
//         setShowHireModal(false);
//         setShowSuccessModal(true);
        
//         // Reset form data
//         setFormData({
//           companyName: '',
//           companyEmail: '',
//           companyPhone: '',
//           domain: '',
//           numofstudents: '',
//           experienceLevel:'',
//           message:''
//         });
//       }
      
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('There was an error submitting your form. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Close modals
//   const closeHireModal = () => {
//     setShowHireModal(false);
//   };

//   const closeSuccessModal = () => {
//     setShowSuccessModal(false);
//   };

//   return (
//     <>
//       <nav className={`header-nav ${scrolled ? 'header-nav--scrolled' : ''}`}>
//         <div className="header-container">
//           {/* Brand */}
//           <div className="header-brand">
//             <span className="header-brand-text">
//               <Link to="/" onClick={closeOffcanvas}>
//                 <img src={logo} alt="Logo" width={120} />
//               </Link>
//             </span>
//           </div>

//           {/* Enhanced Toggler */}
//           <button
//             className={`header-toggler ${isOpen ? 'active' : ''}`}
//             type="button"
//             onClick={handleToggle}
//             aria-label="Toggle navigation"
//             aria-expanded={isOpen}
//           >
//             <span className="header-toggler-icon"></span>
//           </button>

//           {/* Enhanced Navigation Links with Offcanvas */}
//           <div className={`header-collapse ${isOpen ? 'show' : ''}`}>
//             <ul className="header-nav-list">
//               {['home','about', 'courses', 'internship', 'projects', 'hire with us', 'apply', 'contact'].map((item) => (
//                 <li key={item} className="header-nav-item">
//                   <button
//                     className="header-nav-link"
//                     onClick={() => handleNavClick(item)}
//                     aria-label={`Navigate to ${item}`}
//                   >
//                     {item}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Enhanced Overlay */}
//           {isOpen && (
//             <div 
//               className="header-overlay show" 
//               onClick={closeOffcanvas}
//               aria-hidden="true"
//             />
//           )}
//         </div>
//       </nav>

//       {/* Hire with Us Modal */}
//       {showHireModal && (
//         <div className="modal-overlay" onClick={closeHireModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>Hire Our Students</h2>
//               <button 
//                 className="modal-close" 
//                 onClick={closeHireModal}
//                 aria-label="Close modal"
//               >
//                 &times;
//               </button>
//             </div>

//             <div className="modal-body">
//               <p className="modal-description">
//                 Connect with our talented students and graduates. Fill out the form below and we'll help you find the perfect candidates for your organization.
//               </p>

//               <form onSubmit={handleSubmit} className="hire-form">
//                 <div className="form-group">
//                   <label htmlFor="companyName">Company Name *</label>
//                   <input
//                     type="text"
//                     id="companyName"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your company name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email Address *</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="companyEmail"
//                     value={formData.companyEmail}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your email address"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number *</label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="companyPhone"
//                     value={formData.companyPhone}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your phone number"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="domain">Domain Required *</label>
//                   <select
//                     id="domain"
//                     name="domain"
//                     value={formData.domain}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">Select a domain</option>
//                     {domainOptions.map((domain, index) => (
//                       <option key={index} value={domain}>
//                         {domain}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="studentCount">Number of Students Needed *</label>
//                   <input
//                     type="number"
//                     id="studentCount"
//                     name="numofstudents"
//                     value={formData.numofstudents}
//                     onChange={handleInputChange}
//                     required
//                     min="1"
//                     placeholder="How many students are you looking for?"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="experienceLevel">Experience</label>
//                   <input
//                     type="text"
//                     id="experienceLevel"
//                     name="experienceLevel"
//                     value={formData.experienceLevel}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Experience level required"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="message">Message (Optional)</label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     placeholder="Enter additional details or requirements"
//                     rows="4"
//                   />
//                 </div>

//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     className="btn-secondary"
//                     onClick={closeHireModal}
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn-primary"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? 'Sending...' : 'Submit Request'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <div className="modal-overlay" onClick={closeSuccessModal}>
//           <div className="modal-content successs-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="successs-modal-content">
//               <div className="successs-icon">
//                 <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
//                   <circle cx="32" cy="32" r="32" fill="#10B981" fillOpacity="0.1"/>
//                   <path 
//                     d="M28 32L31 35L36 29" 
//                     stroke="#10B981" 
//                     strokeWidth="3" 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round"
//                   />
//                   <circle cx="32" cy="32" r="30" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"/>
//                 </svg>
//               </div>
              
//               <h2 className="successs-title">Request Submitted Successfully!</h2>
              
//               <p className="successs-message">
//                 Thank you for your interest in hiring our students. Our team will contact you within 24 hours to discuss your requirements and match you with the perfect candidates.
//               </p>

//               <div className="successs-details">
//                 <div className="successs-detail">
//                   <span className="detail-label">What happens next?</span>
//                   <ul className="detail-list">
//                     <li>Our team will review your requirements</li>
//                     <li>We'll shortlist matching candidates</li>
//                     <li>Schedule interviews at your convenience</li>
//                     <li>Provide ongoing support throughout the process</li>
//                   </ul>
//                 </div>
//               </div>

//               <div className="successs-actions">
//                 <button
//                   className="btn-primary successs-btn"
//                   onClick={closeSuccessModal}
//                 >
//                   Got It
//                 </button>
//               </div>

//               <p className="successs-note">
//                 Need immediate assistance? <a href="tel:+1234567890">Call us at 9444369625</a>
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;


// import React, { useState, useEffect, useRef } from 'react';
// import logo from '../../../assests/logo2.png';
// import './Header.css';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Header = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [showHireModal, setShowHireModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [activeCourse, setActiveCourse] = useState(null);
//   const [isCoursesHovered, setIsCoursesHovered] = useState(false);
//   const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
//   const [formData, setFormData] = useState({
//     companyName: '',
//     companyEmail: '',
//     companyPhone: '',
//     domain: '',
//     numofstudents: '',
//     experienceLevel: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
//   const coursesRef = useRef(null);

//   // Courses data structure with descriptions
//   const coursesData = {
//     "Web Development": {
//       title: "Software Development",
//       items: [
//         { name: "Frontend Development", description: "Learn HTML, CSS, JavaScript, React and build modern web interfaces" },
//         { name: "Backend Development", description: "Master server-side programming with Node.js, Python, Java and databases" },
//         { name: "Full Stack Development", description: "End-to-end web development with both frontend and backend technologies" },
//         { name: "Mobile App Development", description: "Build iOS and Android apps using React Native, Flutter and native technologies" }
//       ]
//     },
//     "Mobile App Development": {
//       title: "Mobile App Development",
//       items: [
//         { name: "Flutter Development", description: "Create beautiful, fast, and cross-platform mobile applications using Flutter and Dart" },
//         { name: "Kotlin Development", description: "Build modern, efficient, and native Android applications using Kotlin and Jetpack libraries" },
//         // { name: "API Testing", description: "Comprehensive API testing with Postman, REST Assured and automation tools" },
//         // { name: "Performance Testing", description: "Load, stress and performance testing with JMeter and other tools" }
//       ]
//     },
//     // "Data Science & Analytics": {
//     //   title: "Data Science & Analytics",
//     //   items: [
//     //     { name: "Data Analysis", description: "Python, Pandas, SQL for data analysis and business intelligence" },
//     //     { name: "Data Visualization", description: "Create insightful dashboards with Tableau, Power BI and Python libraries" },
//     //     { name: "Statistical Analysis", description: "Advanced statistical methods and hypothesis testing for data-driven decisions" },
//     //     { name: "Business Intelligence", description: "Transform raw data into actionable business insights and reports" }
//     //   ]
//     // },
//     // "Data Engineer": {
//     //   title: "Data Engineering",
//     //   items: [
//     //     { name: "Data Pipelines", description: "Design and build scalable ETL/ELT pipelines for data processing" },
//     //     { name: "ETL Processes", description: "Extract, Transform, Load workflows with Apache Spark and cloud tools" },
//     //     { name: "Big Data", description: "Hadoop, Spark and distributed computing for large-scale data processing" },
//     //     { name: "Data Warehousing", description: "Data warehouse design, implementation and optimization strategies" }
//     //   ]
//     // },
//     // "DevOps": {
//     //   title: "DevOps",
//     //   items: [
//     //     { name: "CI/CD", description: "Continuous Integration and Deployment pipelines with Jenkins, GitLab CI" },
//     //     { name: "Containerization", description: "Docker, Kubernetes for container orchestration and management" },
//     //     { name: "Cloud Infrastructure", description: "AWS, Azure, GCP cloud services and infrastructure as code" },
//     //     { name: "Monitoring & Logging", description: "System monitoring, logging and alerting with modern DevOps tools" }
//     //   ]
//     // },
//     // "Banking": {
//     //   title: "Banking Courses",
//     //   items: [
//     //     { name: "Investment Banking", description: "Financial modeling, valuation techniques and investment strategies" },
//     //     { name: "Retail Banking", description: "Consumer banking operations, products and customer relationship management" },
//     //     { name: "Risk Management", description: "Credit risk, market risk and operational risk assessment methodologies" },
//     //     { name: "Financial Analysis", description: "Financial statement analysis, ratio analysis and performance evaluation" }
//     //   ]
//     // },
//     "AI / ML": {
//       title: "AI & Machine Learning",
//       items: [
//         { name: "AI & ML Course", description: "Comprehensive AI and Machine Learning with Python and frameworks" },
//         { name: "AI and Data Science", description: "Intersection of AI techniques with data science applications" },
//         { name: "ML and Data Analytics", description: "Machine learning algorithms for predictive analytics and insights" },
//         { name: "Deep Learning", description: "Neural networks, TensorFlow, PyTorch for advanced AI applications" }
//       ]
//     },
//     // "Cloud Computing": {
//     //   title: "Cloud Computing",
//     //   items: [
//     //     { name: "AWS", description: "Amazon Web Services certification and practical cloud solutions" },
//     //     { name: "Azure", description: "Microsoft Azure cloud platform and enterprise solutions" },
//     //     { name: "Google Cloud", description: "Google Cloud Platform services and data engineering tools" },
//     //     { name: "Cloud Security", description: "Cloud security best practices, compliance and risk management" }
//     //   ]
//     // },
//     // "Agile & Scrum": {
//     //   title: "Agile & Scrum",
//     //   items: [
//     //     { name: "Scrum Master", description: "Scrum framework, ceremonies and team facilitation techniques" },
//     //     { name: "Agile Methodology", description: "Agile principles, practices and iterative development approaches" },
//     //     { name: "Project Management", description: "Project planning, tracking and delivery in agile environments" },
//     //     { name: "Team Leadership", description: "Leading agile teams, stakeholder management and delivery excellence" }
//     //   ]
//     // }
//   };

//   // Domain options for dropdown
//   const domainOptions = [
//     'Full Stack Development',
//     'Frontend Development',
//     'Backend Development',
//     'Mobile App Development',
//     'Data Science',
//     'Machine Learning',
//     'Artificial Intelligence',
//     'Cloud Computing',
//     'DevOps',
//     'Cyber Security',
//     'UI/UX Design',
//     'Digital Marketing',
//     'Other'
//   ];

//   // Detect scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Handle body scroll and escape key
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         if (isOpen) setIsOpen(false);
//         if (showHireModal) setShowHireModal(false);
//         if (showSuccessModal) setShowSuccessModal(false);
//         setActiveCourse(null);
//         setIsCoursesHovered(false);
//       }
//     };

//     if (isOpen || showHireModal || showSuccessModal) {
//       document.body.classList.add('no-scroll');
//       document.addEventListener('keydown', handleEscape);
//     } else {
//       document.body.classList.remove('no-scroll');
//     }

//     return () => {
//       document.body.classList.remove('no-scroll');
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, [isOpen, showHireModal, showSuccessModal]);

//   const calculateDropdownPosition = () => {
//     if (coursesRef.current) {
//       const rect = coursesRef.current.getBoundingClientRect();
//       const viewportWidth = window.innerWidth;
//       const dropdownWidth = 1000; // Fixed width for the centered dropdown
      
//       const left = (viewportWidth - dropdownWidth) / 2;
//       const top = rect.bottom + window.scrollY;
      
//       setDropdownPosition({ left, top });
//     }
//   };

//   const scrollToSection = (sectionId) => {
//     document.getElementById(sectionId)?.scrollIntoView({ 
//       behavior: 'smooth',
//       block: 'start'
//     });
//   };

//   const handleNavClick = (item) => {
//     if (item === 'home') {
//       navigate('/');
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else if (item === 'hire with us') {
//       setShowHireModal(true);
//     } else {
//       // Close mobile menu first, then scroll after a brief delay
//       setIsOpen(false);
//       setTimeout(() => {
//         scrollToSection(item);
//       }, 400);
//       return;
//     }
//     setIsOpen(false);
//     setActiveCourse(null);
//     setIsCoursesHovered(false);
//   };

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//     setActiveCourse(null);
//     setIsCoursesHovered(false);
//   };

//   const closeOffcanvas = () => {
//     setIsOpen(false);
//     setActiveCourse(null);
//     setIsCoursesHovered(false);
//   };

//   const handleCoursesEnter = () => {
//     setIsCoursesHovered(true);
//     setActiveCourse('courses');
//     calculateDropdownPosition();
//   };

//   const handleCoursesLeave = () => {
//     setIsCoursesHovered(false);
//     // Add a small delay before hiding to allow moving to dropdown
//     setTimeout(() => {
//       if (!isCoursesHovered) {
//         setActiveCourse(null);
//       }
//     }, 300);
//   };

//   const handleDropdownEnter = () => {
//     setIsCoursesHovered(true);
//   };

//   const handleDropdownLeave = () => {
//     setIsCoursesHovered(false);
//     setActiveCourse(null);
//   };

//   const handleCourseHover = (courseKey) => {
//     setActiveCourse(courseKey);
//   };

//   const handleCourseClick = (courseName) => {
//     // Handle course selection
//     console.log('Selected course:', courseName);
//     setIsOpen(false);
//     setActiveCourse(null);
//     setIsCoursesHovered(false);
//     // You can add navigation logic here
//   };

//   const handleMobileCourseClick = (courseKey) => {
//     setActiveCourse(activeCourse === courseKey ? null : courseKey);
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     console.log(formData)

//     try {
//       // Send data to backend
//       const res = await axios.post('https://testing12-3ebu.onrender.com/api/hire/wanthiring', formData);
      
//       if(res.status === 200 || res.status === 201){
//         // Close hire modal and show success modal
//         setShowHireModal(false);
//         setShowSuccessModal(true);
        
//         // Reset form data
//         setFormData({
//           companyName: '',
//           companyEmail: '',
//           companyPhone: '',
//           domain: '',
//           numofstudents: '',
//           experienceLevel: '',
//           message: ''
//         });
//       }
      
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('There was an error submitting your form. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Close modals
//   const closeHireModal = () => {
//     setShowHireModal(false);
//   };

//   const closeSuccessModal = () => {
//     setShowSuccessModal(false);
//   };

//   return (
//     <>
//       <nav className={`header-nav ${scrolled ? 'header-nav--scrolled' : ''}`}>
//         <div className="header-container">
//           {/* Brand */}
//           <div className="header-brand">
//             <span className="header-brand-text">
//               <Link to="/" onClick={closeOffcanvas}>
//                 <img src={logo} alt="Logo" width={120} />
//               </Link>
//             </span>
//           </div>

//           {/* Enhanced Toggler */}
//           <button
//             className={`header-toggler ${isOpen ? 'active' : ''}`}
//             type="button"
//             onClick={handleToggle}
//             aria-label="Toggle navigation"
//             aria-expanded={isOpen}
//           >
//             <span className="header-toggler-icon"></span>
//           </button>

//           {/* Enhanced Navigation Links with Offcanvas */}
//           <div className={`header-collapse ${isOpen ? 'show' : ''}`}>
//             <ul className="header-nav-list">
//               {['home', 'about'].map((item) => (
//                 <li key={item} className="header-nav-item">
//                   <button
//                     className="header-nav-link"
//                     onClick={() => handleNavClick(item)}
//                     aria-label={`Navigate to ${item}`}
//                   >
//                     {item}
//                   </button>
//                 </li>
//               ))}
              
//               {/* Courses Dropdown - Desktop */}
//               <li 
//                 ref={coursesRef}
//                 className="header-nav-item courses-dropdown"
//                 onMouseEnter={handleCoursesEnter}
//                 onMouseLeave={handleCoursesLeave}
//               >
//                 <button
//                   className="header-nav-link"
//                   aria-label="Browse courses"
//                 >
//                   courses
//                 </button>
//               </li>

//               {['internship', 'projects', 'hire with us', 'apply', 'contact'].map((item) => (
//                 <li key={item} className="header-nav-item">
//                   <button
//                     className="header-nav-link"
//                     onClick={() => handleNavClick(item)}
//                     aria-label={`Navigate to ${item}`}
//                   >
//                     {item}
//                   </button>
//                 </li>
//               ))}
//             </ul>

//             {/* Mobile Courses Accordion */}
//             {isOpen && (
//               <div className="mobile-courses-accordion">
//                 <h3 className="mobile-courses-title">All Courses</h3>
//                 {Object.entries(coursesData).map(([courseKey, courseData]) => (
//                   <div 
//                     key={courseKey} 
//                     className={`mobile-course-category ${
//                       activeCourse === courseKey ? 'active' : ''
//                     }`}
//                   >
//                     <button
//                       className="mobile-course-header"
//                       onClick={() => handleMobileCourseClick(courseKey)}
//                     >
//                       <span>{courseData.title}</span>
//                       <span className="mobile-course-arrow">
//                         {activeCourse === courseKey ? '−' : '+'}
//                       </span>
//                     </button>
//                     <div className="mobile-course-content">
//                       {courseData.items.map((item, index) => (
//                         <div key={index} className="mobile-course-item">
//                           <h4 className="mobile-course-item-title">{item.name}</h4>
//                           <p className="mobile-course-item-description">{item.description}</p>
//                           <button 
//                             className="mobile-course-item-button"
//                             onClick={() => handleCourseClick(item.name)}
//                           >
//                             View Course
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Enhanced Overlay */}
//           {isOpen && (
//             <div 
//               className="header-overlay show" 
//               onClick={closeOffcanvas}
//               aria-hidden="true"
//             />
//           )}
//         </div>
//       </nav>

//       {/* Centered Courses Mega Dropdown */}
//       {(activeCourse === 'courses' || isCoursesHovered) && (
//         <div 
//           className="courses-mega-dropdown"
//           style={{
//             left: `${dropdownPosition.left}px`,
//             top: `${dropdownPosition.top}px`
//           }}
//           onMouseEnter={handleDropdownEnter}
//           onMouseLeave={handleDropdownLeave}
//         >
//           <div className="courses-sidebar">
//             <h3 className="courses-sidebar-title">All Courses</h3>
//             <ul className="courses-sidebar-list">
//               {Object.keys(coursesData).map((courseKey) => (
//                 <li 
//                   key={courseKey}
//                   className={`sidebar-course-item ${
//                     activeCourse === courseKey ? 'active' : ''
//                   }`}
//                   onMouseEnter={() => handleCourseHover(courseKey)}
//                 >
//                   <button className="sidebar-course-link">
//                     {coursesData[courseKey].title}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           <div className="courses-content">
//             {Object.entries(coursesData).map(([courseKey, courseData]) => (
//               <div 
//                 key={courseKey}
//                 className={`course-content-panel ${
//                   activeCourse === courseKey ? 'active' : ''
//                 }`}
//               >
//                 <h3 className="course-content-title">{courseData.title}</h3>
//                 <div className="course-subitems-grid">
//                   {courseData.items.map((item, index) => (
//                     <div key={index} className="course-subitem-card">
//                       <h4 className="subitem-title">{item.name}</h4>
//                       <p className="subitem-description">{item.description}</p>
//                       <button 
//                         className="subitem-button"
//                         onClick={() => handleCourseClick(item.name)}
//                       >
//                         Learn More
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Hire with Us Modal */}
//       {showHireModal && (
//         <div className="modal-overlay" onClick={closeHireModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>Hire Our Students</h2>
//               <button 
//                 className="modal-close" 
//                 onClick={closeHireModal}
//                 aria-label="Close modal"
//               >
//                 &times;
//               </button>
//             </div>

//             <div className="modal-body">
//               <p className="modal-description">
//                 Connect with our talented students and graduates. Fill out the form below and we'll help you find the perfect candidates for your organization.
//               </p>

//               <form onSubmit={handleSubmit} className="hire-form">
//                 <div className="form-group">
//                   <label htmlFor="companyName">Company Name *</label>
//                   <input
//                     type="text"
//                     id="companyName"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your company name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email Address *</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="companyEmail"
//                     value={formData.companyEmail}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your email address"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number *</label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="companyPhone"
//                     value={formData.companyPhone}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your phone number"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="domain">Domain Required *</label>
//                   <select
//                     id="domain"
//                     name="domain"
//                     value={formData.domain}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">Select a domain</option>
//                     {domainOptions.map((domain, index) => (
//                       <option key={index} value={domain}>
//                         {domain}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="studentCount">Number of Students Needed *</label>
//                   <input
//                     type="number"
//                     id="studentCount"
//                     name="numofstudents"
//                     value={formData.numofstudents}
//                     onChange={handleInputChange}
//                     required
//                     min="1"
//                     placeholder="How many students are you looking for?"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="experienceLevel">Experience</label>
//                   <input
//                     type="text"
//                     id="experienceLevel"
//                     name="experienceLevel"
//                     value={formData.experienceLevel}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Experience level required"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="message">Message (Optional)</label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     placeholder="Enter additional details or requirements"
//                     rows="4"
//                   />
//                 </div>

//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     className="btn-secondary"
//                     onClick={closeHireModal}
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn-primary"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? 'Sending...' : 'Submit Request'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <div className="modal-overlay" onClick={closeSuccessModal}>
//           <div className="modal-content successs-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="successs-modal-content">
//               <div className="successs-icon">
//                 <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
//                   <circle cx="32" cy="32" r="32" fill="#10B981" fillOpacity="0.1"/>
//                   <path 
//                     d="M28 32L31 35L36 29" 
//                     stroke="#10B981" 
//                     strokeWidth="3" 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round"
//                   />
//                   <circle cx="32" cy="32" r="30" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"/>
//                 </svg>
//               </div>
              
//               <h2 className="successs-title">Request Submitted Successfully!</h2>
              
//               <p className="successs-message">
//                 Thank you for your interest in hiring our students. Our team will contact you within 24 hours to discuss your requirements and match you with the perfect candidates.
//               </p>

//               <div className="successs-details">
//                 <div className="successs-detail">
//                   <span className="detail-label">What happens next?</span>
//                   <ul className="detail-list">
//                     <li>Our team will review your requirements</li>
//                     <li>We'll shortlist matching candidates</li>
//                     <li>Schedule interviews at your convenience</li>
//                     <li>Provide ongoing support throughout the process</li>
//                   </ul>
//                 </div>
//               </div>

//               <div className="successs-actions">
//                 <button
//                   className="btn-primary successs-btn"
//                   onClick={closeSuccessModal}
//                 >
//                   Got It
//                 </button>
//               </div>

//               <p className="successs-note">
//                 Need immediate assistance? <a href="tel:+1234567890">Call us at 9444369625</a>
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;



import React, { useState, useEffect, useRef } from 'react';
import logo from '../../../assests/logo2.png';
import './Header.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeCourse, setActiveCourse] = useState(null);
  const [isCoursesHovered, setIsCoursesHovered] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    domain: '',
    numofstudents: '',
    experienceLevel: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const coursesRef = useRef(null);
  const dropdownRef = useRef(null);

  // Courses data structure with descriptions
  const coursesData = {
    "Web Development": {
      title: "Web Development",
      items: [
        { name: "Frontend Development", description: "Learn HTML, CSS, JavaScript, React and build modern web interfaces" },
        { name: "Backend Development", description: "Master server-side programming with Node.js, Python, Java and databases" },
        { name: "Full Stack Development", description: "End-to-end web development with both frontend and backend technologies" }
      ]
    },
    "Mobile App Development": {
      title: "Mobile App Development",
      items: [
        { name: "Flutter Development", description: "Create beautiful, fast, and cross-platform mobile applications using Flutter and Dart" },
        { name: "Kotlin Development", description: "Build modern, efficient, and native Android applications using Kotlin and Jetpack libraries" },
      ]
    },
    // "Data Science & Analytics": {
    //   title: "Data Science & Analytics",
    //   items: [
    //     { name: "Data Analysis", description: "Python, Pandas, SQL for data analysis and business intelligence" },
    //     { name: "Data Visualization", description: "Create insightful dashboards with Tableau, Power BI and Python libraries" },
    //     { name: "Statistical Analysis", description: "Advanced statistical methods and hypothesis testing for data-driven decisions" },
    //     { name: "Business Intelligence", description: "Transform raw data into actionable business insights and reports" }
    //   ]
    // },
    // "Data Engineer": {
    //   title: "Data Engineering",
    //   items: [
    //     { name: "Data Pipelines", description: "Design and build scalable ETL/ELT pipelines for data processing" },
    //     { name: "ETL Processes", description: "Extract, Transform, Load workflows with Apache Spark and cloud tools" },
    //     { name: "Big Data", description: "Hadoop, Spark and distributed computing for large-scale data processing" },
    //     { name: "Data Warehousing", description: "Data warehouse design, implementation and optimization strategies" }
    //   ]
    // },
    // "DevOps": {
    //   title: "DevOps",
    //   items: [
    //     { name: "CI/CD", description: "Continuous Integration and Deployment pipelines with Jenkins, GitLab CI" },
    //     { name: "Containerization", description: "Docker, Kubernetes for container orchestration and management" },
    //     { name: "Cloud Infrastructure", description: "AWS, Azure, GCP cloud services and infrastructure as code" },
    //     { name: "Monitoring & Logging", description: "System monitoring, logging and alerting with modern DevOps tools" }
    //   ]
    // },
    // "Banking": {
    //   title: "Banking Courses",
    //   items: [
    //     { name: "Investment Banking", description: "Financial modeling, valuation techniques and investment strategies" },
    //     { name: "Retail Banking", description: "Consumer banking operations, products and customer relationship management" },
    //     { name: "Risk Management", description: "Credit risk, market risk and operational risk assessment methodologies" },
    //     { name: "Financial Analysis", description: "Financial statement analysis, ratio analysis and performance evaluation" }
    //   ]
    // },
    "AI / ML": {
      title: "AI & Machine Learning",
      items: [
        { name: "AI & ML Course", description: "Comprehensive AI and Machine Learning with Python and frameworks" },
        { name: "AI and Data Science", description: "Intersection of AI techniques with data science applications" },
        { name: "ML and Data Analytics", description: "Machine learning algorithms for predictive analytics and insights" },
        { name: "Deep Learning", description: "Neural networks, TensorFlow, PyTorch for advanced AI applications" }
      ]
    },
    // "Cloud Computing": {
    //   title: "Cloud Computing",
    //   items: [
    //     { name: "AWS", description: "Amazon Web Services certification and practical cloud solutions" },
    //     { name: "Azure", description: "Microsoft Azure cloud platform and enterprise solutions" },
    //     { name: "Google Cloud", description: "Google Cloud Platform services and data engineering tools" },
    //     { name: "Cloud Security", description: "Cloud security best practices, compliance and risk management" }
    //   ]
    // },
    // "Agile & Scrum": {
    //   title: "Agile & Scrum",
    //   items: [
    //     { name: "Scrum Master", description: "Scrum framework, ceremonies and team facilitation techniques" },
    //     { name: "Agile Methodology", description: "Agile principles, practices and iterative development approaches" },
    //     { name: "Project Management", description: "Project planning, tracking and delivery in agile environments" },
    //     { name: "Team Leadership", description: "Leading agile teams, stakeholder management and delivery excellence" }
    //   ]
    // }
  };

  // Domain options for dropdown
  const domainOptions = [
    'Full Stack Development',
    'Frontend Development',
    'Backend Development',
    'Mobile App Development',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Cloud Computing',
    'DevOps',
    'Cyber Security',
    'UI/UX Design',
    'Digital Marketing',
    'Other'
  ];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll and escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false);
        if (showHireModal) setShowHireModal(false);
        if (showSuccessModal) setShowSuccessModal(false);
        setActiveCourse(null);
        setIsCoursesHovered(false);
      }
    };

    if (isOpen || showHireModal || showSuccessModal) {
      document.body.classList.add('no-scroll');
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, showHireModal, showSuccessModal]);

  const calculateDropdownPosition = () => {
    if (coursesRef.current) {
      const rect = coursesRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const dropdownWidth = 1000;
      const dropdownHeight = 500;
      
      // Calculate horizontal center
      const left = Math.max(20, (viewportWidth - dropdownWidth) / 2);
      
      // Calculate vertical position - below the navbar with some margin
      const top = rect.bottom + 10;
      
      // Ensure dropdown doesn't go below viewport
      const maxTop = viewportHeight - dropdownHeight - 20;
      const adjustedTop = Math.min(top, maxTop);
      
      setDropdownPosition({ 
        left: Math.floor(left), 
        top: Math.floor(adjustedTop) 
      });
    }
  };

  // Handle window resize and scroll to reposition dropdown
  useEffect(() => {
    const handleResize = () => {
      if (isCoursesHovered) {
        calculateDropdownPosition();
      }
    };

    const handleScroll = () => {
      if (isCoursesHovered) {
        calculateDropdownPosition();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCoursesHovered]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleNavClick = (item) => {
    if (item === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item === 'hire with us') {
      setShowHireModal(true);
    } else {
      // Close mobile menu first, then scroll after a brief delay
      setIsOpen(false);
      setTimeout(() => {
        scrollToSection(item);
      }, 400);
      return;
    }
    setIsOpen(false);
    setActiveCourse(null);
    setIsCoursesHovered(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setActiveCourse(null);
    setIsCoursesHovered(false);
  };

  const closeOffcanvas = () => {
    setIsOpen(false);
    setActiveCourse(null);
    setIsCoursesHovered(false);
  };

  const handleCoursesEnter = () => {
    setIsCoursesHovered(true);
    setActiveCourse('courses');
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      calculateDropdownPosition();
    });
  };

  const handleCoursesLeave = () => {
    setIsCoursesHovered(false);
    // Add a small delay before hiding to allow moving to dropdown
    setTimeout(() => {
      if (!isCoursesHovered) {
        setActiveCourse(null);
      }
    }, 300);
  };

  const handleDropdownEnter = () => {
    setIsCoursesHovered(true);
  };

  const handleDropdownLeave = () => {
    setIsCoursesHovered(false);
    setActiveCourse(null);
  };

  const handleCourseHover = (courseKey) => {
    setActiveCourse(courseKey);
  };

  const handleCourseClick = (courseName) => {
    // Handle course selection
    console.log('Selected course:', courseName);
    setIsOpen(false);
    setActiveCourse(null);
    setIsCoursesHovered(false);
    // You can add navigation logic here
  };

  const handleMobileCourseClick = (courseKey) => {
    setActiveCourse(activeCourse === courseKey ? null : courseKey);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData)

    try {
      // Send data to backend
      const res = await axios.post('https://testing12-3ebu.onrender.com/api/hire/wanthiring', formData);
      
      if(res.status === 200 || res.status === 201){
        // Close hire modal and show success modal
        setShowHireModal(false);
        setShowSuccessModal(true);
        
        // Reset form data
        setFormData({
          companyName: '',
          companyEmail: '',
          companyPhone: '',
          domain: '',
          numofstudents: '',
          experienceLevel: '',
          message: ''
        });
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modals
  const closeHireModal = () => {
    setShowHireModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <nav className={`header-nav ${scrolled ? 'header-nav--scrolled' : ''}`}>
        <div className="header-container">
          {/* Brand */}
          <div className="header-brand">
            <span className="header-brand-text">
              <Link to="/" onClick={closeOffcanvas}>
                <img src={logo} alt="Logo" width={120} />
              </Link>
            </span>
          </div>

          {/* Enhanced Toggler */}
          <button
            className={`header-toggler ${isOpen ? 'active' : ''}`}
            type="button"
            onClick={handleToggle}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            <span className="header-toggler-icon"></span>
          </button>

          {/* Enhanced Navigation Links with Offcanvas */}
          <div className={`header-collapse ${isOpen ? 'show' : ''}`}>
            <ul className="header-nav-list">
              {['home', 'about'].map((item) => (
                <li key={item} className="header-nav-item">
                  <button
                    className="header-nav-link"
                    onClick={() => handleNavClick(item)}
                    aria-label={`Navigate to ${item}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
              
              {/* Courses Dropdown - Desktop */}
              <li 
                ref={coursesRef}
                className="header-nav-item courses-dropdown"
                onMouseEnter={handleCoursesEnter}
                onMouseLeave={handleCoursesLeave}
              >
                <button
                  className="header-nav-link"
                  aria-label="Browse courses"
                >
                  courses
                </button>
              </li>

              {['internship', 'projects', 'hire with us', 'apply', 'contact'].map((item) => (
                <li key={item} className="header-nav-item">
                  <button
                    className="header-nav-link"
                    onClick={() => handleNavClick(item)}
                    aria-label={`Navigate to ${item}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Courses Accordion */}
            {isOpen && (
              <div className="mobile-courses-accordion">
                <h3 className="mobile-courses-title">All Courses</h3>
                {Object.entries(coursesData).map(([courseKey, courseData]) => (
                  <div 
                    key={courseKey} 
                    className={`mobile-course-category ${
                      activeCourse === courseKey ? 'active' : ''
                    }`}
                  >
                    <button
                      className="mobile-course-header"
                      onClick={() => handleMobileCourseClick(courseKey)}
                    >
                      <span>{courseData.title}</span>
                      <span className="mobile-course-arrow">
                        {activeCourse === courseKey ? '−' : '+'}
                      </span>
                    </button>
                    <div className="mobile-course-content">
                      {courseData.items.map((item, index) => (
                        <div key={index} className="mobile-course-item">
                          <h4 className="mobile-course-item-title">{item.name}</h4>
                          <p className="mobile-course-item-description">{item.description}</p>
                          <button 
                            className="mobile-course-item-button"
                            onClick={() => handleCourseClick(item.name)}
                          >
                            View Course
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Overlay */}
          {isOpen && (
            <div 
              className="header-overlay show" 
              onClick={closeOffcanvas}
              aria-hidden="true"
            />
          )}
        </div>
      </nav>

      {/* Centered Courses Mega Dropdown */}
      {(activeCourse === 'courses' || isCoursesHovered) && (
        <div 
          ref={dropdownRef}
          className="courses-mega-dropdown"
          style={{
            left: `${dropdownPosition.left}px`,
            top: `${dropdownPosition.top}px`
          }}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="courses-sidebar">
            <h3 className="courses-sidebar-title">All Courses</h3>
            <ul className="courses-sidebar-list">
              {Object.keys(coursesData).map((courseKey) => (
                <li 
                  key={courseKey}
                  className={`sidebar-course-item ${
                    activeCourse === courseKey ? 'active' : ''
                  }`}
                  onMouseEnter={() => handleCourseHover(courseKey)}
                >
                  <button className="sidebar-course-link">
                    {coursesData[courseKey].title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="courses-content">
            {Object.entries(coursesData).map(([courseKey, courseData]) => (
              <div 
                key={courseKey}
                className={`course-content-panel ${
                  activeCourse === courseKey ? 'active' : ''
                }`}
              >
                <h3 className="course-content-title">{courseData.title}</h3>
                <div className="course-subitems-grid">
                  {courseData.items.map((item, index) => (
                    <div key={index} className="course-subitem-card">
                      <h4 className="subitem-title">{item.name}</h4>
                      <p className="subitem-description">{item.description}</p>
                      <button 
                        className="subitem-button"
                        onClick={() => handleCourseClick(item.name)}
                      >
                        Learn More
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hire with Us Modal */}
      {showHireModal && (
        <div className="modal-overlay" onClick={closeHireModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Hire Our Students</h2>
              <button 
                className="modal-close" 
                onClick={closeHireModal}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-description">
                Connect with our talented students and graduates. Fill out the form below and we'll help you find the perfect candidates for your organization.
              </p>

              <form onSubmit={handleSubmit} className="hire-form">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name *</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your company name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="domain">Domain Required *</label>
                  <select
                    id="domain"
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a domain</option>
                    {domainOptions.map((domain, index) => (
                      <option key={index} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="studentCount">Number of Students Needed *</label>
                  <input
                    type="number"
                    id="studentCount"
                    name="numofstudents"
                    value={formData.numofstudents}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="How many students are you looking for?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experienceLevel">Experience</label>
                  <input
                    type="text"
                    id="experienceLevel"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    required
                    placeholder="Experience level required"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter additional details or requirements"
                    rows="4"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={closeHireModal}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={closeSuccessModal}>
          <div className="modal-content successs-modal" onClick={(e) => e.stopPropagation()}>
            <div className="successs-modal-content">
              <div className="successs-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="32" fill="#10B981" fillOpacity="0.1"/>
                  <path 
                    d="M28 32L31 35L36 29" 
                    stroke="#10B981" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <circle cx="32" cy="32" r="30" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"/>
                </svg>
              </div>
              
              <h2 className="successs-title">Request Submitted Successfully!</h2>
              
              <p className="successs-message">
                Thank you for your interest in hiring our students. Our team will contact you within 24 hours to discuss your requirements and match you with the perfect candidates.
              </p>

              <div className="successs-details">
                <div className="successs-detail">
                  <span className="detail-label">What happens next?</span>
                  <ul className="detail-list">
                    <li>Our team will review your requirements</li>
                    <li>We'll shortlist matching candidates</li>
                    <li>Schedule interviews at your convenience</li>
                    <li>Provide ongoing support throughout the process</li>
                  </ul>
                </div>
              </div>

              <div className="successs-actions">
                <button
                  className="btn-primary successs-btn"
                  onClick={closeSuccessModal}
                >
                  Got It
                </button>
              </div>

              <p className="successs-note">
                Need immediate assistance? <a href="tel:+1234567890">Call us at 9444369625</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;