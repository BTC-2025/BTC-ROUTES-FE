import React, { useState } from 'react';
import { FaCheckCircle, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaUser, FaComment } from 'react-icons/fa';
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
      title: "Our Location",
      details: ["No.469, Pavalamalli Street", "Narasimhapuram, Kakkalur", "Tiruvallur - 602 003"]
    },
    {
      icon: <FaPhone />,
      title: "Phone Number",
      details: ["+91 9444369625"]
    },
    {
      icon: <FaEnvelope />,
      title: "Email Address",
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
      <div className="contact-container">
        
        {/* Modern Header */}
        <div className="contact-header">
          <div className="header-content">
            <div className="contact-badge">
              <div className="badge-dot"></div>
              Get In Touch
            </div>
            <h1>Let's Start a Conversation</h1>
            <p>Ready to begin your tech journey? Reach out to us and we'll help you get started.</p>
          </div>
        </div>

        <div className="contact-content">
          
          {/* Contact Info Cards */}
          <div className="contact-info-section">
            <div className="info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div className="card-icon">
                    {info.icon}
                  </div>
                  <div className="card-content">
                    <h3>{info.title}</h3>
                    <div className="card-details">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex}>{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response Time Card */}
            <div className="response-card">
              <div className="response-header">
                <div className="pulse-dot"></div>
                <span>Fast Response Time</span>
              </div>
              <p>We typically reply within 2 hours during business hours</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-wrapper">
              <div className="form-header">
                <div className="form-icon">
                  <FaComment />
                </div>
                <div>
                  <h2>Send Us a Message</h2>
                  <p>Fill out the form and we'll get back to you shortly</p>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="input-group">
                    <div className="input-icon">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="modern-input"
                    />
                  </div>

                  <div className="input-group">
                    <div className="input-icon">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email address"
                      className="modern-input"
                    />
                  </div>

                  <div className="input-group full-width">
                    <input
                      type="text"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleChange}
                      placeholder="Subject (optional)"
                      className="modern-input"
                    />
                  </div>

                  <div className="input-group full-width">
                    <textarea
                      rows="5"
                      name="message"
                      value={contactForm.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your inquiry..."
                      className="modern-textarea"
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="button-spinner"></div>
                      Sending Message...
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
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="modal-content">
              <div className="success-icon">
                <FaCheckCircle />
              </div>
              <h2>Message Sent Successfully!</h2>
              <p className="success-message">
                Thank you <strong>{contactForm.name}</strong>! We've received your message 
                and will get back to you within 24 hours.
              </p>
              <div className="contact-details">
                <p>We'll contact you at: <strong>{contactForm.email}</strong></p>
              </div>
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