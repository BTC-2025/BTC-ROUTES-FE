import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';
import { Helmet } from 'react-helmet';

const Contacts = () => {
  return (
    <div>
      <Helmet>
        <title>Contact Us | BTC Routes</title>
        <meta
          name="description"
          content="Get in touch with BTC Routes for internship inquiries, project training, or support. We’re here to assist you with your learning journey."
        />
        <meta
          name="keywords"
          content="BTC Routes contact, internship support, project training, customer service, email, phone, BTC Routes help"
        />
        <meta name="author" content="BTC Routes" />
        <link rel="canonical" href="https://www.btcroutes.com/contact" />

        {/* ✅ Open Graph Meta Tags */}
        <meta property="og:title" content="Contact BTC Routes | Get in Touch" />
        <meta
          property="og:description"
          content="Reach out to BTC Routes for internship and project training inquiries. Our support team is ready to help you get started."
        />
        <meta property="og:image" content="%PUBLIC_URL%/logo2.png" />
        <meta property="og:url" content="https://www.btcroutes.com/contact" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BTC Routes | Contact Us" />
        <meta
          name="twitter:description"
          content="Get in touch with BTC Routes for inquiries, guidance, and support related to internships and project training."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/logo2.png" />

        {/* ✅ Structured Data (Organization Contact Info) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "mainEntity": {
                "@type": "Organization",
                "name": "BTC Routes",
                "url": "https://www.btcroutes.com",
                "logo": "https://www.btcroutes.com/logo2.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-9876543210",
                  "contactType": "Customer Support",
                  "areaServed": "IN",
                  "availableLanguage": "English"
                },
                "sameAs": [
                  "https://www.facebook.com/btcroutes",
                  "https://www.instagram.com/btcroutes",
                  "https://www.linkedin.com/company/btcroutes"
                ]
              }
            }
          `}
        </script>
      </Helmet>

      <Header />
      <Contact />
      <Footer />
    </div>
  );
};

export default Contacts;
