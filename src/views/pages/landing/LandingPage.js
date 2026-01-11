import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CContainer } from '@coreui/react'
import {
  FileText,
  Layers,
  Clock,
  ShieldCheck,
  FolderOpen,
  Brain,
  Plus,
  ArrowRight,
  ArrowLeft,
  Play,
  Check,
  Linkedin,
  Twitter,
  Hospital,
  BarChart3,
  Globe,
  Headphones,
  Cloud,
  Languages,
  Lock,
  Zap,
} from 'lucide-react'
import './LandingPage.scss'

const LandingPage = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const stats = [
    { number: '500+', label: 'Clinical Trials Managed' },
    { number: '50K+', label: 'Patients Enrolled' },
    { number: '99.9%', label: 'System Uptime' },
    { number: '40%', label: 'Faster Trial Completion' },
  ]

  const features = [
    {
      icon: <FileText size={28} />,
      title: 'Sponsor eCOA',
      description: 'Capture patient-reported outcomes with built-in compliance and real-time monitoring capabilities.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <Layers size={28} />,
      title: 'EDC System',
      description: 'Streamline data collection with our intuitive electronic data capture solution designed for clinical excellence.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <Clock size={28} />,
      title: 'IWRS Platform',
      description: 'Simplify randomization, drug supply management and site coordination with intelligent workflows.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Nexus Vault',
      description: 'Secure, compliant document storage with advanced encryption and audit trail capabilities.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      icon: <FolderOpen size={28} />,
      title: 'eTMF Manager',
      description: 'Streamline document workflows with advanced eTMF functionality and inspection readiness.',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      icon: <Brain size={28} />,
      title: 'Medical Coding',
      description: 'Optimize medical coding accuracy with AI-powered suggestions and centralized collaboration.',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },
  ]

  const benefits = [
    { icon: <Hospital size={24} />, text: 'FDA 21 CFR Part 11 Compliant' },
    { icon: <BarChart3 size={24} />, text: 'Real-time Data Analytics' },
    { icon: <Globe size={24} />, text: 'Global Regulatory Standards' },
    { icon: <Headphones size={24} />, text: '24/7 Technical Support' },
    { icon: <Cloud size={24} />, text: 'Cloud-based Infrastructure' },
    { icon: <Languages size={24} />, text: 'Multi-language Support' },
    { icon: <Lock size={24} />, text: 'Enterprise-grade Security' },
    { icon: <Zap size={24} />, text: 'Lightning Fast Performance' },
  ]

  return (
    <div className="landing-page">
      {/* Header */}
      <header className={`landing-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="landing-header-content">
          <div className="landing-logo">
            <div className="landing-logo-icon">
              <Plus size={24} strokeWidth={3} />
            </div>
            <span className="landing-logo-text">ETMF</span>
          </div>

          <div className="landing-header-buttons">
            <CButton
              color="link"
              className="landing-btn-signin"
              onClick={() => navigate('/login')}
            >
              Sign In
            </CButton>
            <CButton
              className="landing-btn-signup"
              onClick={() => navigate('/register')}
            >
              Get Started
            </CButton>
          </div>
        </div>
      </header>

      {activePage === 'home' ? (
        <>
          {/* Hero Section */}
          <section className="landing-hero">
        <div className="landing-hero-bg">
          <div className="landing-hero-gradient"></div>
          <div className="landing-hero-pattern"></div>
        </div>
        
        <div className="landing-hero-content">
          
          <h1 className="landing-hero-title">
            Transform Your
            <span className="landing-highlight"> Clinical Trials </span>
            with Modern eTMF Solutions
          </h1>
          
          <p className="landing-hero-subtitle">
            A powerful, intuitive clinical trial management platform that simplifies execution, 
            ensures compliance, and accelerates your path to breakthrough discoveries.
          </p>
          
          <div className="landing-hero-cta-group">
            <CButton
              size="lg"
              className="landing-hero-cta landing-cta-primary"
              onClick={() => navigate('/register')}
            >
              Start Free Trial
              <ArrowRight size={20} />
            </CButton>
            <CButton
              size="lg"
              className="landing-hero-cta landing-cta-secondary"
              onClick={() => navigate('/contact')}
            >
              <Play size={20} />
              Watch Demo
            </CButton>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="landing-stats-bar">
          {stats.map((stat, index) => (
            <div key={index} className="landing-stat-item">
              <span className="landing-stat-number">{stat.number}</span>
              <span className="landing-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="landing-trusted">
        <CContainer>
          <p className="landing-trusted-label">Trusted by leading pharmaceutical and research organizations</p>
          <div className="landing-trusted-logos">
            <div className="landing-logo-item">PharmaCorp</div>
            <div className="landing-logo-item">BioResearch</div>
            <div className="landing-logo-item">MedTrials</div>
            <div className="landing-logo-item">ClinicalFirst</div>
            <div className="landing-logo-item">HealthLabs</div>
          </div>
        </CContainer>
      </section>

      {/* Features Section */}
      <section id="features" className="landing-platform">
        <CContainer>
          <div className="landing-section-header">
            <span className="landing-section-badge">Platform Features</span>
            <h2 className="landing-section-title">
              Integrated Clinical Platform
            </h2>
            <p className="landing-section-subtitle">
              Everything you need to manage clinical trials efficiently, from patient enrollment to regulatory submissions.
            </p>
          </div>

          <div className="landing-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="landing-feature-card">
                <div className="landing-feature-icon" style={{ background: feature.gradient }}>
                  {feature.icon}
                </div>
                <h3 className="landing-feature-title">{feature.title}</h3>
                <p className="landing-feature-desc">{feature.description}</p>
                <a href="#" className="landing-feature-link">
                  Learn more
                  <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </CContainer>
      </section>

      {/* Image Showcase Section */}
      <section className="landing-showcase">
        <CContainer>
          <div className="landing-showcase-grid">
            <div className="landing-showcase-content">
              <span className="landing-section-badge">Why Choose Us</span>
              <h2 className="landing-showcase-title">
                Designed for <span className="landing-text-gradient">Modern Clinical Research</span>
              </h2>
              <p className="landing-showcase-desc">
                Our platform is built from the ground up to meet the unique challenges of clinical trials, 
                with features that ensure compliance, security, and efficiency at every step.
              </p>
              
              <div className="landing-showcase-features">
                <div className="landing-showcase-item">
                  <div className="landing-check-icon">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <h4>Regulatory Compliance</h4>
                    <p>Built-in FDA 21 CFR Part 11, GDPR, and ICH-GCP compliance</p>
                  </div>
                </div>
                <div className="landing-showcase-item">
                  <div className="landing-check-icon">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <h4>Real-time Collaboration</h4>
                    <p>Connect sites, sponsors, and CROs on a single platform</p>
                  </div>
                </div>
                <div className="landing-showcase-item">
                  <div className="landing-check-icon">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <h4>AI-Powered Insights</h4>
                    <p>Predictive analytics to identify risks and optimize timelines</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="landing-showcase-images">
              <div className="landing-image-stack">
                <img 
                  src="https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Clinical Research Laboratory"
                  className="landing-showcase-img landing-img-1"
                />
                <img 
                  src="https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Medical Research Team"
                  className="landing-showcase-img landing-img-2"
                />
                <div className="landing-image-decoration"></div>
              </div>
            </div>
          </div>
        </CContainer>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="landing-why-choose">
        <CContainer>
          <div className="landing-section-header">
            <span className="landing-section-badge">Benefits</span>
            <h2 className="landing-section-title">Why Choose ETMF?</h2>
            <p className="landing-section-subtitle">
              Comprehensive capabilities, flexible deployment, and proven reliability for sponsors, CROs, and research sites.
            </p>
          </div>

          <div className="landing-benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="landing-benefit-item">
                <div className="landing-benefit-icon">{benefit.icon}</div>
                <span className="landing-benefit-text">{benefit.text}</span>
              </div>
            ))}
          </div>
        </CContainer>
      </section>

      {/* Testimonial Section */}
      <section className="landing-testimonial">
        <CContainer>
          <div className="landing-testimonial-card">
            <div className="landing-testimonial-content">
              <div className="landing-quote-icon">"</div>
              <p className="landing-testimonial-text">
                ETMF has transformed how we manage clinical trials. The platform's intuitive design and 
                comprehensive features have reduced our document processing time by 60% and significantly 
                improved our inspection readiness.
              </p>
              <div className="landing-testimonial-author">
                <div className="landing-author-avatar">
                  <img 
                    src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Dr. Sarah Mitchell"
                  />
                </div>
                <div className="landing-author-info">
                  <h4>Dr. Sarah Mitchell</h4>
                  <p>Director of Clinical Operations, PharmaCorp</p>
                </div>
              </div>
            </div>
            <div className="landing-testimonial-image">
              <img 
                src="https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=500" 
                alt="Clinical Research Team"
              />
            </div>
          </div>
        </CContainer>
      </section>

      {/* CTA Section */}
      <section id="contact" className="landing-cta">
        <div className="landing-cta-bg">
          <div className="landing-cta-gradient"></div>
          <div className="landing-cta-pattern"></div>
        </div>
        <CContainer>
          <div className="landing-cta-content">
            <h2 className="landing-cta-title">Ready to Accelerate Your Clinical Trials?</h2>
            <p className="landing-cta-subtitle">
              Join hundreds of research organizations already using ETMF to streamline their 
              clinical operations and bring treatments to patients faster.
            </p>
            <div className="landing-cta-buttons">
              <CButton
                size="lg"
                className="landing-cta-btn landing-cta-btn-primary"
                onClick={() => navigate('/register')}
              >
                Start Free Trial
              </CButton>
              <CButton
                size="lg"
                className="landing-cta-btn landing-cta-btn-secondary"
                onClick={() => navigate('/contact')}
              >
                Schedule Demo
              </CButton>
            </div>
            <p className="landing-cta-note">No credit card required · 14-day free trial · Cancel anytime</p>
          </div>
        </CContainer>
      </section>
        </>
      ) : activePage === 'privacy' ? (
        <section className="landing-privacy-section">
          <CContainer>
            <div className="landing-privacy-content">
              <button 
                className="landing-back-btn"
                onClick={() => setActivePage('home')}
              >
                <ArrowLeft size={20} />
                Back to Home
              </button>
              
              <h2 className="landing-privacy-title">Privacy Policy</h2>
              
              <div className="landing-privacy-block">
                <h3>Introduction</h3>
                <p>
                  ETMF is dedicated to protecting your online privacy. This policy outlines how ETMF collects, uses, and safeguards your personally identifiable information, such as your name, address, email address, phone number, and other related information that is not publicly available. This web publication is owned and operated by ETMF. For any inquiries regarding this privacy statement, please contact us via email at support@etmf.com.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Information Collection and Use</h3>
                <p>
                  ETMF collects personal information when you register to receive communications or download information. We may combine this information with data obtained from business partners or other companies. For instance, we may request details when you sign up for a survey or a newsletter. Registration may require information such as your name, email address, birth date, gender, zip code, occupation, industry, and personal interests. For certain products and services, we may also ask for your address, Social Security number, and information about your assets. Once registered and signed in, you are no longer anonymous to us. You always have the option to withhold the information we request.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Information Sharing and Disclosure</h3>
                <p>
                  Our primary objective in collecting user information is to understand your project or business needs and enhance your experience on our web publications. This includes providing interactive communications such as newsletters to the email address you provide. ETMF may also disclose user information when required by law, in good faith. Please note that ETMF may sponsor advertisers or websites with links on our publications. The information practices of these external parties and websites are not covered by this privacy statement.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Email</h3>
                <p>
                  ETMF respects the privacy of its readers and will not disclose, distribute, or rent its email subscriber newsletter list to any third party, nor will it permit anyone else to do so.
                </p>
              </div>
            </div>
          </CContainer>
        </section>
      ) : null}

      {/* Footer */}
      <footer className="landing-footer">
        <CContainer>
          <div className="landing-footer-grid">
            {/* Company Info */}
            <div className="landing-footer-brand">
              <div className="landing-footer-logo">
                <div className="landing-logo-icon">
                  <Plus size={22} strokeWidth={3} />
                </div>
                <span className="landing-logo-text">ETMF</span>
              </div>
              <p className="landing-footer-tagline">
                Empowering clinical research with innovative technology solutions for faster, safer drug development.
              </p>
              <div className="landing-social-links">
                <a href="#" className="landing-social-link" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="landing-social-link" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Platform Links */}
            <div className="landing-footer-column">
              <h4 className="landing-footer-heading">Platform</h4>
              <ul className="landing-footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#integrations">Integrations</a></li>
              </ul>
            </div>

            {/* Solutions Links */}
            <div className="landing-footer-column">
              <h4 className="landing-footer-heading">Solutions</h4>
              <ul className="landing-footer-links">
                <li><a href="#sponsors">For Sponsors</a></li>
                <li><a href="#cros">For CROs</a></li>
                <li><a href="#sites">For Sites</a></li>
                <li><a href="#biotech">For Biotech</a></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="landing-footer-column">
              <h4 className="landing-footer-heading">Resources</h4>
              <ul className="landing-footer-links">
                <li><a href="#blog">Blog</a></li>
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#webinars">Webinars</a></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="landing-footer-column">
              <h4 className="landing-footer-heading">Legal</h4>
              <ul className="landing-footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('privacy'); window.scrollTo(0, 0); }}>Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#compliance">Compliance</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="landing-footer-bottom">
            <p className="landing-footer-copyright">© 2025 ETMF. All rights reserved.</p>
            <div className="landing-footer-powered">
              <span>Powered by</span>
              <span className="landing-powered-logo">SCLINTECH</span>
            </div>
          </div>
        </CContainer>
      </footer>
    </div>
  )
}

export default LandingPage
