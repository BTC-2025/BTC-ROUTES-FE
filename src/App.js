import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Internship from './components/Internship/Internship';
import Projects from './components/Projects/Projects';
import Benefits from './components/Benefits/Benefits';
import Apply from './components/Apply/Apply';
// import Batches from './components/Batches/Batches';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ScrollTop from './ScrollTop';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import WebDevelopment from './components/Internship/components/webdevelopment/WebDevelopment';
import AppDevelopment from './components/Internship/components/AppDevelopment/AppDevelopment';
import AiMlInternship from './components/Internship/components/AiMl/AiMlInternship';
import DataScienceInternship from './components/Internship/components/DataScience/DataScienceInternship';
import DataAnalyticsInternship from './components/Internship/components/DataAnalytics/DataAnalyticsInternship';
import TermsAndConditions from './components/termsandpolicy/TermsAndConditions';
import PrivacyPolicy from './components/termsandpolicy/PrivacyPolicy';
import Application from './components/Application/Application';
import Contacts from './components/contactseparate/contacts';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <ScrollTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <About />
                <Internship />
                <Projects />
                <Benefits />
                <Apply />
                {/* <Batches /> */}
                <Contact />
                <Footer />
                <ScrollToTop />
              </>
            }
          />
          {/* ✅ Corrected route syntax */}
          <Route path="/internship/full-stack-development" element={<WebDevelopment />} />
          <Route path='/internship/app-development' element={<AppDevelopment />} />
          <Route path='/internship/aiml-development' element={<AiMlInternship />} />
          <Route path='/internship/data-science' element={<DataScienceInternship />} />
          <Route path='/internship/data-analytics' element={<DataAnalyticsInternship />} />
          <Route path='/terms-and-condition' element={<TermsAndConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path="/application" element={<Application />} />
          <Route path="/contact" element={<Contacts /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
