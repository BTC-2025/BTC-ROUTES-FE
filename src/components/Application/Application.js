import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../Header/Header';
import Apply from '../Apply/Apply';
import Footer from '../Footer/Footer';

const Application = () => {
  return (
    <div>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Apply for Internship | BTC Routes</title>
        <meta
          name="description"
          content="Submit your internship application at BTC Routes — gain hands-on experience in Web Development, App Development, Data Science, and AI/ML training programs."
        />
        <meta
          name="keywords"
          content="btc routes application, btc routes internship apply, internship form, apply btc routes, internship registration, btc routes training"
        />
        <meta name="author" content="BTC Routes" />

        {/* ✅ Open Graph Tags (for social media) */}
        <meta property="og:title" content="Apply for Internship | BTC Routes" />
        <meta property="og:description" content="Join BTC Routes to gain real-world project experience through internship programs in Web, App, and AI/ML development." />
        <meta property="og:image" content="https://www.btcroutes.com/logo2.png" />
        <meta property="og:url" content="https://www.btcroutes.com/application" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Apply for Internship | BTC Routes" />
        <meta name="twitter:description" content="Kickstart your career with BTC Routes internships in Web, App, and AI/ML development." />
        <meta name="twitter:image" content="https://www.btcroutes.com/logo2.png" />

        {/* ✅ Canonical Link */}
        <link rel="canonical" href="https://www.btcroutes.com/application" />
      </Helmet>

      {/* ✅ Actual Page Content */}
      <Header />
      <Apply />
      <Footer />
    </div>
  );
};

export default Application;
