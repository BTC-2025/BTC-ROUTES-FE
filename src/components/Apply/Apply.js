import React, { useState } from 'react';
import { FaCheckCircle, FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaUniversity, FaFileAlt } from "react-icons/fa";
import './Apply.css';

const Apply = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    college: '',
    department: '',
    domain: '',
    mode: '',
    duration: '',
    message: '',
    resume: null
  });

  const [hasReadPrivacy, setHasReadPrivacy] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);


  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const response = await fetch("https://testing12-3ebu.onrender.com/api/application/apply", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setShowModal(true);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          college: "",
          department: "",
          domain: "",
          mode: "",
          duration: "",
          message: "",
          resume: null,
        });
      } else {
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Server error! Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="apply-section">
      <div className="apply-container pt-5">
        
        {/* Header with subtle background */}
        {/* <div className="apply-header">
          <div className="header-content">
            <span className="badge">Internship Program</span>
            <h1>Start Your Tech Journey</h1>
            <p>Join our internship program and gain hands-on experience with real-world projects. We'll review your application and get back to you within 24 hours.</p>
          </div>
        </div> */}

        <div className="apply-content mt-5">
          {/* Main Form */}
          <div className="form-card">
            <div className="form-header">
              <h2>Application Form</h2>
              <p>Please fill in your details below</p>
            </div>

            <form className="application-form" onSubmit={handleSubmit}>
              
              <div className="form-section">
                <h3 className="section-title">Personal Information</h3>
                <div className="form-grid">
                  <div className="input-group">
                    <label>
                      <FaUser className="input-icon" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="input-group">
                    <label>
                      <FaEnvelope className="input-icon" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="input-group">
                    <label>
                      <FaPhone className="input-icon" />
                      Phone Number *
                    </label>
                    <input
                      type='tel'
                      name='mobile'
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      placeholder='+91 9876543210'
                    />
                  </div>

                  <div className="input-group">
                    <label>
                      <FaUniversity className="input-icon" />
                      College/University *
                    </label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      required
                      placeholder="Enter your college name"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Academic Details</h3>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    >
                      <option value="">Select your department</option>
                      <option value="CSE">Computer Science & Engineering</option>
                      <option value="IT">Information Technology</option>
                      <option value="AI">Artificial Intelligence</option>
                      <option value="ML">Machine Learning</option>
                      <option value="DS">Data Science</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Preferred Domain</label>
                    <select
                      name="domain"
                      value={formData.domain}
                      onChange={handleChange}
                    >
                      <option value="">Choose a domain</option>

                      <optgroup label="Web Development">
                        <option value="Frontend Development">Frontend Development</option>
                        <option value="Backend Development">Backend Development</option>
                        <option value="Full Stack Development">Full Stack Development</option>
                      </optgroup>


                      <optgroup label="App Development">
                        <option value="Flutter Development">Flutter Development</option>
                        <option value="Kotlin Development">Kotlin Development</option>
                      </optgroup>


                      <optgroup label="Other Domains">
                        <option value="AI/ML Development">AI & ML</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                      </optgroup>

                    </select>
                  </div>

                  <div className="input-group">
                    <label>Preferred Mode</label>
                    <select
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                    >
                      <option value="">Select mode</option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Duration</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                    >
                      <option value="">Select duration</option>
                      <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                {/* <h3 className="section-title">Additional Information</h3>
                <div className="input-group full-width">
                  <label>Tell us about yourself</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your interests, goals, or any questions you have..."
                  ></textarea>
                </div> */}

                <div className="input-group full-width">
                  <label>
                    <FaFileAlt className="input-icon" />
                    Upload Resume
                  </label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      name="resume"
                      onChange={handleChange}
                      accept=".pdf,.doc,.docx"
                    />
                    <div className="file-content">
                      {formData.resume ? (
                        <>
                          <div className="file-preview">
                            <FaFileAlt className="file-icon" />
                            <div className="file-info">
                              <div className="file-name">{formData.resume.name}</div>
                              <div className="file-size">Ready to submit</div>
                            </div>
                          </div>
                          <button 
                            type="button" 
                            className="change-file-btn"
                            onClick={() => setFormData(prev => ({...prev, resume: null}))}
                          >
                            Change
                          </button>
                        </>
                      ) : (
                        <>
                          <FaFileAlt className="upload-icon" />
                          <div className="upload-text">
                            <div className="upload-title">Click to upload resume</div>
                            <div className="upload-subtitle">PDF, DOC, DOCX up to 5MB</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Privacy Confirmation */}
              <div className="terms-section">
                <p className="terms-text">
                  Please read our{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`terms-link ${hasReadPrivacy ? "visited" : ""}`}
                    onClick={() => setHasReadPrivacy(true)}
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`terms-link ${hasReadTerms ? "visited" : ""}`}
                    onClick={() => setHasReadTerms(true)}
                  >
                    Terms & Conditions
                  </a>{" "}
                  before submitting your application.
                </p>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting || !hasReadPrivacy || !hasReadTerms}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Processing Your Application...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="button-icon" />
                    Submit Application
                  </>
                )}
              </button>

              {/* Info Message Below the Button */}
              {(!hasReadPrivacy || !hasReadTerms) && (
                <p className="terms-warning">
                  ⚠️ Please view both the Privacy Policy and Terms & Conditions to enable the Submit button.
                </p>
              )}



              {/* <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Processing Your Application...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="button-icon" />
                    Submit Application
                  </>
                )}
              </button> */}
            </form>
          </div>

          {/* Info Sidebar */}
          <div className="info-sidebar">
            <div className="info-card">
              <div className="card-header">
                <h3>Application Process</h3>
              </div>
              
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Submit Form</h4>
                    <p>Complete the application with your details</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Review</h4>
                    <p>We'll review your application</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Get Started</h4>
                    <p>Begin your internship journey</p>
                  </div>
                </div>
              </div>

              <div className="contact-info">
                <h4>Questions?</h4>
                <p>We're here to help you with the application process.</p>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-label">Email:</span>
                    <span className="contact-value">info.btcroutes@gmail.com</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Phone:</span>
                    <span className="contact-value">+91 9962454596</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="stats-card">
              <h4>Why Choose Us?</h4>
              <div className="stats-grid">
                <div className="stat">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Placement Rate</div>
                </div>
                <div className="stat">
                  <div className="stat-number">24h</div>
                  <div className="stat-label">Response Time</div>
                </div>
                <div className="stat">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Happy Interns</div>
                </div>
              </div>
            </div> */}
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
              <h2>Application Submitted!</h2>
              <p className="success-message">
                Thank you <strong>{formData.name}</strong>! We've received your application 
                and will contact you at <strong>{formData.email}</strong> within 24 hours.
              </p>
              <button 
                className="modal-button"
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

export default Apply;