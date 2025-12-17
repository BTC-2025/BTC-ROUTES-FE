import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

import ScrollTop from './ScrollTop';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import WebDevelopment from './components/User/Internship/components/webdevelopment/WebDevelopment';
import AppDevelopment from './components/User/Internship/components/AppDevelopment/AppDevelopment';
import AiMlInternship from './components/User/Internship/components/AiMl/AiMlInternship';
import DataScienceInternship from './components/User/Internship/components/DataScience/DataScienceInternship';
import DataAnalyticsInternship from './components/User/Internship/components/DataAnalytics/DataAnalyticsInternship';
import TermsAndConditions from './components/User/termsandpolicy/TermsAndConditions';
import PrivacyPolicy from './components/User/termsandpolicy/PrivacyPolicy';
import Application from './components/User/Application/Application';
import Contacts from './components/User/contactseparate/contacts';
import Home from './components/User/Home/Home';

import BtcRoutesAdmin from './components/Admin/Dashboard/btcroutesadmin';
import FrontendCourse from './components/User/Courses/Components/FrontendCourse';

import Loader from './components/Loader/Loader';


function App() {

  const [loading,setLoading] = useState(true)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Fake delay for loader (2 sec) OR replace with real API load logic
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;  // ⬅ Show loading screen before website loads
  }

  

  return (
    <div className="App">
      <Router>
        <ScrollTop />
        <Routes>
          <Route
            path="/"
            element={ <Home />}
          />
          {/* ✅ Corrected route syntax */}
          <Route path="/internship/web-development" element={<WebDevelopment />} />
          <Route path='/internship/app-development' element={<AppDevelopment />} />
          <Route path='/internship/aiml-development' element={<AiMlInternship />} />
          <Route path='/internship/data-science' element={<DataScienceInternship />} />
          <Route path='/internship/data-analytics' element={<DataAnalyticsInternship />} />
          <Route path='/terms-and-condition' element={<TermsAndConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path="/application" element={<Application />} />
          <Route path="/contact" element={<Contacts /> } />
          {/* <Route path='/home' element={<Home />} /> */}
          <Route path='/courses/frontend-development' element={<FrontendCourse />} />
          <Route path='/btcroutesadmin' element={<BtcRoutesAdmin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
