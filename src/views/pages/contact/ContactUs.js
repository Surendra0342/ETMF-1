import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CFormInput, CFormLabel, CFormTextarea, CFormSelect } from '@coreui/react'
import './ContactUs.scss'

const ContactUs = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    organizationName: '',
    jobTitle: '',
    phoneNumber: '',
    preferredDateTime: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) {
      newErrors.workEmail = 'Please enter a valid email address'
    }

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required'
    }

    if (!formData.jobTitle) {
      newErrors.jobTitle = 'Job title is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      // Reset form
      setFormData({
        fullName: '',
        workEmail: '',
        organizationName: '',
        jobTitle: '',
        phoneNumber: '',
        preferredDateTime: '',
        message: ''
      })
    }, 1000)
  }

  return (
    <div className="contact-page">
      {/* Header */}
      <header className="contact-header">
        <div className="contact-header-content">
          <div className="contact-logo" onClick={() => navigate('/')}>
            <span className="logo-icon">🔬</span>
            <span className="logo-text">ETMF</span>
          </div>
          <div className="contact-header-buttons">
            <CButton
              color="success"
              className="contact-btn-signin"
              onClick={() => navigate('/login')}
            >
              Sign In
            </CButton>
            <CButton
              color="success"
              className="contact-btn-contact"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </CButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="contact-main">
        <div className="contact-container">
          {/* Left Side - Info */}
          <div className="contact-left">
            <h1 className="contact-main-title">Connect. Collaborate. Transform.</h1>

            <div className="contact-info-section">
              <h2 className="contact-info-title">Contact us</h2>
              <p className="contact-info-text">
                <strong>Get in touch with our product specialist</strong>
                <br />
                to see how our platform transforms clinical trial data management.
              </p>
            </div>

            <div className="contact-brands-section">
              <h3 className="contact-brands-title">Trusted By Global Brands</h3>
              <div className="contact-brands-logos">
                <div className="brand-logo-placeholder"></div>
                <div className="brand-logo-placeholder"></div>
                <div className="brand-logo-placeholder"></div>
                <div className="brand-logo-placeholder"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="contact-right">
            <div className="contact-form-card">
              {!submitSuccess ? (
                <>
                  <h2 className="contact-form-title">Schedule a Demo</h2>

                  <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <CFormLabel htmlFor="fullName">Full Name *</CFormLabel>
                    <CFormInput
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={errors.fullName ? 'is-invalid' : ''}
                    />
                    {errors.fullName && <div className="error-text">{errors.fullName}</div>}
                  </div>

                  <div className="form-group">
                    <CFormLabel htmlFor="workEmail">Work Email Address *</CFormLabel>
                    <CFormInput
                      type="email"
                      id="workEmail"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleChange}
                      className={errors.workEmail ? 'is-invalid' : ''}
                    />
                    {errors.workEmail && <div className="error-text">{errors.workEmail}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <CFormLabel htmlFor="organizationName">Organization Name *</CFormLabel>
                    <CFormInput
                      type="text"
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      className={errors.organizationName ? 'is-invalid' : ''}
                    />
                    {errors.organizationName && <div className="error-text">{errors.organizationName}</div>}
                  </div>

                  <div className="form-group">
                    <CFormLabel htmlFor="jobTitle">Job Title *</CFormLabel>
                    <CFormSelect
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className={errors.jobTitle ? 'is-invalid' : ''}
                    >
                      <option value="">Select</option>
                      <option value="Clinical Research Associate">Clinical Research Associate</option>
                      <option value="Clinical Trial Manager">Clinical Trial Manager</option>
                      <option value="Data Manager">Data Manager</option>
                      <option value="Principal Investigator">Principal Investigator</option>
                      <option value="Study Coordinator">Study Coordinator</option>
                      <option value="Regulatory Affairs">Regulatory Affairs</option>
                      <option value="Other">Other</option>
                    </CFormSelect>
                    {errors.jobTitle && <div className="error-text">{errors.jobTitle}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                    <CFormInput
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <CFormLabel htmlFor="preferredDateTime">Preferred Date and Time (CST Time zone)</CFormLabel>
                    <CFormInput
                      type="datetime-local"
                      id="preferredDateTime"
                      name="preferredDateTime"
                      value={formData.preferredDateTime}
                      onChange={handleChange}
                      placeholder="DD-MMM-YYYY HH:MM"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <CFormLabel htmlFor="message">Message / Specific Interests *</CFormLabel>
                  <CFormTextarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'is-invalid' : ''}
                    maxLength={1000}
                  />
                  <div className="char-count">{formData.message.length} / 1000 characters</div>
                  {errors.message && <div className="error-text">{errors.message}</div>}
                </div>

                <CButton
                  type="submit"
                  className="contact-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Requesting...' : 'Request Demo'}
                </CButton>
              </form>
                </>
              ) : (
                <div className="thank-you-message">
                  <div className="check-icon">✓✓</div>
                  <h2 className="thank-you-title">Thank you for your interest!</h2>
                  <p className="thank-you-text">
                    We have received your request and will contact you shortly to schedule your demo.
                  </p>
                  <div className="thank-you-links">
                    <button className="back-to-home-btn" onClick={() => navigate('/')}>
                      ← Back to Home
                    </button>
                    <a href="mailto:demo@etmf.com" className="email-link">
                      Email to the Demo Requester
                    </a>
                    <a href="mailto:support@etmf.com" className="email-link">
                      Email to Internal Support Team
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        <div className="contact-footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <span className="logo-icon">🔬</span>
              <span className="logo-text">ETMF</span>
            </div>
            <p className="footer-tagline">Precision. Compliance. Insight.</p>
            <p className="footer-copyright">© 2025 ETMF. All rights reserved.</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#technology">Technology and Solutions</a></li>
                <li><a href="#services">Services and Industries</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Platform Features</h4>
              <ul>
                <li><a href="#ecoa">Sponsor eCOA</a></li>
                <li><a href="#edc">EDC System</a></li>
                <li><a href="#iwrs">IWRS Platform</a></li>
                <li><a href="#vault">Nexus-Vault</a></li>
                <li><a href="#etmf">eTMF Manager</a></li>
                <li><a href="#coding">Medical Coding</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
                <li><a href="#cookie">Cookie Policy</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Powered by</h4>
              <div className="footer-powered">
                <span className="powered-logo">SCLINTECH</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ContactUs
