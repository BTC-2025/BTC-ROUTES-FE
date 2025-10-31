import React, { useState } from 'react';
import { FaCheckCircle, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setContactForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contactForm)
    setIsSubmitting(true);
    try{

      const response = await fetch("https://testing12-3ebu.onrender.com/api/contact/create",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(contactForm)
      })

      const result = await response.json()
      
      if(response.ok){
        setContactForm({
          name:'',
          email:'',
          subject:'',
          message:''
        });
        setShowModal(true);
      } else {
        alert(result.error || "Something went wrong. Please try again.");
      }

    }catch(err){
      console.error(err);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Our Office",
      details: ["No.469, Pavalamalli Street, Narasimhapuram, Kakkalur, Tiruvallur - 602 003"]
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      details: ["+91 9962454596"]
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      details: ["info.btcroutes@gmail.com"]
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 6:30 PM", "Sat: 10:00 AM - 4:00 PM"]
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container pt-5">
        
        {/* Header */}
        <div className="contact-header">
          <span className="contact-badge">Get In Touch</span>
          <h1 style={{color:"white"}}>Contact Us</h1>
          <p>Have questions about our programs? We're here to help you start your tech journey.</p>
        </div>

        <div className="contact-content">
          
          {/* Main Form - Larger */}
          <div className="contact-form-main">
            <div className="form-container">
              <div className="form-header">
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours</p>
              </div>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleChange}
                      placeholder="What's this regarding?"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Message *</label>
                    <textarea
                      rows="6"
                      name="message"
                      value={contactForm.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn-large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="button-spinner"></div>
                      Sending Your Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="btn-icon" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Compact Contact Info Sidebar */}
          <div className="contact-sidebar">
            <div className="sidebar-card">
              <h3>Quick Contact</h3>
              
              <div className="compact-info-list">
                {contactInfo.map((info, index) => (
                  <div key={index} className="compact-info-item">
                    <div className="compact-icon">{info.icon}</div>
                    <div className="compact-content">
                      <h4>{info.title}</h4>
                      <div className="compact-details">
                        {info.details.map((detail, detailIndex) => (
                          <span key={detailIndex}>{detail}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sidebar-footer">
                <div className="response-info">
                  <div className="response-indicator">
                    <div className="indicator-dot"></div>
                    <span>Fast Response</span>
                  </div>
                  <p>We typically reply within 2 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal">
              <div className="modal-icon">
                <FaCheckCircle />
              </div>
              <h2>Message Sent!</h2>
              <p>
                Thank you <strong>{contactForm.name}</strong>! We've received your message 
                and will get back to you within 24 hours at <strong>{contactForm.email}</strong>.
              </p>
              <button 
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;