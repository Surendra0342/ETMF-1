import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CContainer } from '@coreui/react'
import './LandingPage.scss'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-header-content">
          <div className="landing-logo">
            <span className="logo-icon">🔬</span>
            <span className="logo-text">ETMF</span>
          </div>
          <div className="landing-header-buttons">
            <CButton
              color="success"
              className="landing-btn-signin"
              onClick={() => navigate('/login')}
            >
              Sign In
            </CButton>
            <CButton
              color="success"
              className="landing-btn-signup"
              onClick={() => navigate('/register')}
            >
              Sign Up
            </CButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-overlay"></div>
        <div className="landing-hero-content">
          <h1 className="landing-hero-title">
            Accelerate Your <span className="highlight">Clinical Trials</span> with<br />
            <span className="platform-name">ETMF</span>
          </h1>
          <p className="landing-hero-subtitle">
            A flexible, intuitive, and feature-rich clinical trial software that simplifies trial execution, reduces complexity, and accelerates
            <br />study timelines, all while ensuring data integrity and regulatory compliance.
          </p>
          <CButton
            color="success"
            size="lg"
            className="landing-hero-cta"
            onClick={() => navigate('/contact')}
          >
            Request a Demo
          </CButton>
        </div>
      </section>

      {/* Integrated Clinical Platform */}
      <section className="landing-platform">
        <CContainer>
          <h2 className="landing-section-title">Integrated Clinical Platform</h2>
          <p className="landing-section-subtitle">
            Simplify and accelerate clinical trials with a comprehensive suite of solutions designed for efficient data
          </p>

          <div className="landing-features-grid">
            {/* Sponsor eCOA */}
            <div className="landing-feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Sponsor eCOA</h3>
              <p className="feature-description">
                Capture patient-reported outcomes with built-in compliance
              </p>
            </div>

            {/* EDC System */}
            <div className="landing-feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="feature-title">EDC System</h3>
              <p className="feature-description">
                Streamline data collection with a user-friendly EDC solution
              </p>
            </div>

            {/* IWRS Platform */}
            <div className="landing-feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="feature-title">IWRS Platform</h3>
              <p className="feature-description">
                Simplify site, IVR, Remote Cares and Drug Supply Management
              </p>
            </div>

            {/* Nexus Vault */}
            <div className="landing-feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 17v-2M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Nexus Vault</h3>
              <p className="feature-description">
                Secure, compliant document storage and management solution
              </p>
            </div>

            {/* eTMF Manager */}
            <div className="landing-feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-title">eTMF Manager</h3>
              <p className="feature-description">
                Streamline document workflows with advanced eTMF functionality
              </p>
            </div>

            {/* Medical Coding */}
            <div className="landing-feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-title">Medical Coding</h3>
              <p className="feature-description">
                Optimize medical coding accuracy with a centralized collaborative platform
              </p>
            </div>
          </div>
        </CContainer>
      </section>

      {/* Why Choose Section */}
      <section className="landing-why-choose">
        <CContainer>
          <h2 className="landing-section-title">Why Choose Nexus R?</h2>
          <p className="landing-section-subtitle">
            Comprehensive capabilities. Flexible deployment. Proven reliability. These are just a few of the reasons why sponsors,
          </p>

          <div className="landing-benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">✓</div>
              <span className="benefit-text">FDA 21 CFR Part 11 Compliant</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">✓</div>
              <span className="benefit-text">User-time Data Analytics</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">✓</div>
              <span className="benefit-text">Global Regulatory Standards</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">✓</div>
              <span className="benefit-text">24/7 Technical Support</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">✓</div>
              <span className="benefit-text">Cloud-based Infrastructure</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">✓</div>
              <span className="benefit-text">Multi-language Support</span>
            </div>
          </div>
        </CContainer>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <CContainer>
          <div className="landing-cta-content">
            <div className="cta-icon">💬</div>
            <h2 className="cta-title">Let's start the conversation.</h2>
            <p className="cta-subtitle">
              Every successful clinical trial begins with a quick idea—which evolves.
              <br />Reach out to BiooptTech today, and together we will accelerate your clinical trial through smarter data and streamlined regulatory operations.
            </p>
            <CButton
              color="success"
              size="lg"
              className="cta-button"
              onClick={() => navigate('/contact')}
            >
              Request a Demo
            </CButton>
          </div>
        </CContainer>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <CContainer>
          <div className="landing-footer-grid">
            {/* Company Info */}
            <div className="footer-column">
              <div className="footer-logo">
                <span className="logo-icon">🔬</span>
                <span className="logo-text">ETMF</span>
              </div>
              <p className="footer-info">Platform · Oncologic · Insight</p>
              <p className="footer-copyright">© 2025 ETMF. All rights reserved.</p>
            </div>

            {/* Company Links */}
            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#technology">Technology and Innovation</a></li>
                <li><a href="#solutions">Solutions and Solutions</a></li>
              </ul>
            </div>

            {/* Platform Features */}
            <div className="footer-column">
              <h4 className="footer-heading">Platform Features</h4>
              <ul className="footer-links">
                <li><a href="#ecoa">Sponsor eCOA</a></li>
                <li><a href="#edc">EDC System</a></li>
                <li><a href="#iwrs">IWRS Platform</a></li>
                <li><a href="#vault">Nexus Vault</a></li>
                <li><a href="#etmf">eTMF Manager</a></li>
                <li><a href="#coding">Medical Coding</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="footer-column">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-links">
                <li><a href="#terms">Terms & Conditions</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>

            {/* Powered By */}
            <div className="footer-column">
              <h4 className="footer-heading">Powered by</h4>
              <div className="footer-powered">
                <span className="powered-logo">SCLINTECH</span>
              </div>
            </div>
          </div>
        </CContainer>
      </footer>
    </div>
  )
}

export default LandingPage
