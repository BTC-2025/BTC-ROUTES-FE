import React, { useState } from 'react';
import { 
  FaCheckCircle, 
  FaPaperPlane, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaUniversity, 
  FaFileAlt,
  FaArrowRight,
  FaArrowLeft,
  FaCloudUploadAlt
} from "react-icons/fa";
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

  const [currentStep, setCurrentStep] = useState(1);
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

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.mobile && formData.college;
      case 2:
        return formData.department && formData.domain && formData.mode && formData.duration;
      default:
        return true;
    }
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
        setCurrentStep(1);
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

  const steps = [
    { number: 1, title: "Personal Info", icon: <FaUser /> },
    { number: 2, title: "Academic Details", icon: <FaUniversity /> },
    { number: 3, title: "Documents", icon: <FaFileAlt /> }
  ];

  const getStepCompletion = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.mobile && formData.college;
      case 2:
        return formData.department && formData.domain && formData.mode && formData.duration;
      case 3:
        return formData.resume && hasReadPrivacy && hasReadTerms;
      default:
        return false;
    }
  };

  return (
    <div className="apply-container" id='apply'>
      {/* Enhanced Header */}
      {/* <header className="apply-header">
        <div className="header-content">
          <div className="header-badge">
            <div className="badge-dot"></div>
            Internship Program 2024
          </div>
          <h1 className="header-title">
            Start Your Tech Career
          </h1>
          <p className="header-subtitle">
            Join our internship program and gain real-world experience
          </p>
          <div className="header-progress">
            <div className="progress-text">
              Step {currentStep} of {steps.length}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header> */}

      {/* Enhanced Form Section */}
      <section className="application-section">
        <div className="application-container">
          {/* Modern Progress Steps */}
          <div className="progress-container">
            <div className="steps-wrapper">
              {steps.map((step) => (
                <div key={step.number} className="step-item">
                  <div className={`step-indicator ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''} ${getStepCompletion(step.number) ? 'completed' : ''}`}>
                    {getStepCompletion(step.number) ? (
                      <FaCheckCircle className="step-check" />
                    ) : (
                      step.icon
                    )}
                    <span className="step-number">{step.number}</span>
                  </div>
                  <span className="step-title">{step.title}</span>
                  {step.number < steps.length && (
                    <div className={`step-connector ${currentStep > step.number ? 'active' : ''}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Form */}
          <div className="form-section-single">
            <form className="application-form" onSubmit={handleSubmit}>
              
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="form-step active">
                  <div className="step-header">
                    <div className="step-icon-wrapper">
                      <FaUser className="step-header-icon" />
                    </div>
                    <div>
                      <h2>Personal Information</h2>
                      <p>Let's get to know you better</p>
                    </div>
                  </div>
                  
                  <div className="input-grid">
                    <div className="input-field">
                      <label>
                        <FaUser className="field-icon" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className={formData.name ? 'has-value' : ''}
                      />
                    </div>

                    <div className="input-field">
                      <label>
                        <FaEnvelope className="field-icon" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className={formData.email ? 'has-value' : ''}
                      />
                    </div>

                    <div className="input-field">
                      <label>
                        <FaPhone className="field-icon" />
                        Phone Number *
                      </label>
                      <input
                        type='tel'
                        name='mobile'
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        placeholder='+91 9876543210'
                        className={formData.mobile ? 'has-value' : ''}
                      />
                    </div>

                    <div className="input-field">
                      <label>
                        <FaUniversity className="field-icon" />
                        College/University *
                      </label>
                      <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        required
                        placeholder="Enter your college name"
                        className={formData.college ? 'has-value' : ''}
                      />
                    </div>
                  </div>

                  <div className="step-actions">
                    <button type="button" className="btn-next" onClick={nextStep} disabled={!validateStep(1)}>
                      Continue to Academic Details
                      <FaArrowRight className="btn-icon" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Details */}
              {currentStep === 2 && (
                <div className="form-step active">
                  <div className="step-header">
                    <div className="step-icon-wrapper">
                      <FaUniversity className="step-header-icon" />
                    </div>
                    <div>
                      <h2>Academic Details</h2>
                      <p>Tell us about your educational background</p>
                    </div>
                  </div>
                  
                  <div className="input-grid">
                    <div className="input-field">
                      <label>Department *</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className={formData.department ? 'has-value' : ''}
                      >
                        <option value="">Select your department</option>
                        <option value="CSE">Computer Science & Engineering</option>
                        <option value="IT">Information Technology</option>
                        <option value="AI">Artificial Intelligence</option>
                        <option value="ML">Machine Learning</option>
                        <option value="DS">Data Science</option>
                        <option value="ECE">Electronics & Communication</option>
                        <option value="EEE">Electrical & Electronics</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>

                    <div className="input-field">
                      <label>Preferred Domain *</label>
                      <select
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        required
                        className={formData.domain ? 'has-value' : ''}
                      >
                        <option value="">Choose your interest area</option>
                        <optgroup label="Web Development">
                          <option value="Frontend Development">Frontend Development</option>
                          <option value="Backend Development">Backend Development</option>
                          <option value="Full Stack Development">Full Stack Development</option>
                        </optgroup>
                        <optgroup label="App Development">
                          <option value="Flutter Development">Flutter Development</option>
                          <option value="React Native Development">React Native Development</option>
                          <option value="Android Development">Android Development</option>
                        </optgroup>
                        <optgroup label="Emerging Technologies">
                          <option value="AI/ML Development">AI & ML</option>
                          <option value="Data Science">Data Science</option>
                          <option value="Cloud Computing">Cloud Computing</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="input-field">
                      <label>Preferred Mode *</label>
                      <select
                        name="mode"
                        value={formData.mode}
                        onChange={handleChange}
                        required
                        className={formData.mode ? 'has-value' : ''}
                      >
                        <option value="">Select preferred mode</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>

                    <div className="input-field">
                      <label>Duration *</label>
                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className={formData.duration ? 'has-value' : ''}
                      >
                        <option value="">Select duration</option>
                        <option value="1">1 Month</option>
                        <option value="2">2 Months</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                      </select>
                    </div>
                  </div>

                  <div className="additional-info">
                    <div className="input-field full-width">
                      <label>Additional Information</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your projects, skills, achievements, or why you're interested in this internship..."
                        rows="4"
                        className="modern-textarea"
                      ></textarea>
                      <div className="char-count">
                        {formData.message.length}/500 characters
                      </div>
                    </div>
                  </div>

                  <div className="step-actions">
                    <button type="button" className="btn-prev" onClick={prevStep}>
                      <FaArrowLeft className="btn-icon" />
                      Back
                    </button>
                    <button type="button" className="btn-next" onClick={nextStep} disabled={!validateStep(2)}>
                      Continue to Documents
                      <FaArrowRight className="btn-icon" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload */}
              {currentStep === 3 && (
                <div className="form-step active">
                  <div className="step-header">
                    <div className="step-icon-wrapper">
                      <FaFileAlt className="step-header-icon" />
                    </div>
                    <div>
                      <h2>Final Steps</h2>
                      <p>Upload your resume and review terms</p>
                    </div>
                  </div>
                  
                  <div className="upload-section">
                    <div className="upload-card">
                      <div className="upload-header">
                        <FaCloudUploadAlt className="upload-icon" />
                        <div>
                          <h3>Upload Your Resume</h3>
                          <p>Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                        </div>
                      </div>
                      <div className="upload-area">
                        <input
                          type="file"
                          name="resume"
                          onChange={handleChange}
                          accept=".pdf,.doc,.docx"
                          id="resume-upload"
                        />
                        <label htmlFor="resume-upload" className="upload-label">
                          {formData.resume ? (
                            <div className="file-preview">
                              <FaFileAlt className="file-icon" />
                              <div className="file-details">
                                <div className="file-name">{formData.resume.name}</div>
                                <div className="file-size">{(formData.resume.size / 1024 / 1024).toFixed(2)} MB</div>
                                <div className="file-status">
                                  <FaCheckCircle className="status-icon" />
                                  Ready to submit
                                </div>
                              </div>
                              <button 
                                type="button" 
                                className="change-file"
                                onClick={() => setFormData(prev => ({...prev, resume: null}))}
                              >
                                Change File
                              </button>
                            </div>
                          ) : (
                            <div className="upload-placeholder">
                              <div className="upload-icon-large">
                                <FaCloudUploadAlt />
                              </div>
                              <div className="upload-text">
                                <div className="upload-title">Click to upload resume</div>
                                <div className="upload-subtitle">or drag and drop your file here</div>
                              </div>
                              <div className="upload-hint">
                                PDF, DOC, DOCX up to 5MB
                              </div>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Enhanced Terms Section */}
                    <div className="terms-card">
                      <div className="terms-header">
                        <div className="terms-icon-wrapper">
                          <FaCheckCircle className="terms-icon" />
                        </div>
                        <div>
                          <h4>Application Agreement</h4>
                          <p>Please review and accept our policies</p>
                        </div>
                      </div>
                      <div className="terms-links">
                        <div className="policy-item">
                          <a
                            href="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`policy-link ${hasReadPrivacy ? 'visited' : ''}`}
                            onClick={() => setHasReadPrivacy(true)}
                          >
                            <div className="policy-link-content">
                              <span>Privacy Policy</span>
                              <div className="policy-status">
                                {hasReadPrivacy ? (
                                  <>
                                    <FaCheckCircle className="visited-check" />
                                    <span>Reviewed</span>
                                  </>
                                ) : (
                                  <span>Click to review</span>
                                )}
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="policy-item">
                          <a
                            href="/terms-and-conditions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`policy-link ${hasReadTerms ? 'visited' : ''}`}
                            onClick={() => setHasReadTerms(true)}
                          >
                            <div className="policy-link-content">
                              <span>Terms & Conditions</span>
                              <div className="policy-status">
                                {hasReadTerms ? (
                                  <>
                                    <FaCheckCircle className="visited-check" />
                                    <span>Reviewed</span>
                                  </>
                                ) : (
                                  <span>Click to review</span>
                                )}
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      {(!hasReadPrivacy || !hasReadTerms) && (
                        <div className="terms-warning">
                          <div className="warning-icon">⚠️</div>
                          <div className="warning-text">
                            Please review both policies to enable submission
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="step-actions">
                    <button type="button" className="btn-prev" onClick={prevStep}>
                      <FaArrowLeft className="btn-icon" />
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn-submit"
                      disabled={isSubmitting || !hasReadPrivacy || !hasReadTerms || !formData.resume}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="submit-spinner"></div>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="btn-icon" />
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Enhanced Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="modal-content">
              <div className="success-icon">
                <FaCheckCircle />
              </div>
              <h2>Application Submitted Successfully! 🎉</h2>
              <p className="success-message">
                Thank you <strong>{formData.name}</strong>! We've received your application 
                and our team will review it carefully.
              </p>
              <div className="next-steps">
                <h4>What happens next?</h4>
                <ul>
                  <li>Application review by our team</li>
                  <li>Interview schedule (if shortlisted)</li>
                  <li>Onboarding process</li>
                </ul>
              </div>
              <p className="contact-note">
                We'll contact you at <strong>{formData.email}</strong> within 24 hours.
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
    </div>
  );
};

export default Apply;