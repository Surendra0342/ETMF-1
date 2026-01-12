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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import './LandingPage.scss'
import SclinNexusLogo from '../../../assets/images/SclinNexus_color_logo.png'

const LandingPage = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activePage, setActivePage] = useState('home')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: 'Dr. Anil Mehra, MD',
      role: 'Principal Investigator, Oncology Research',
      quote: 'SclinNexus simplified our study execution by consolidating data capture, monitoring, and reporting into a single platform. Investigator oversight and data review became significantly more efficient across all trial phases.',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: 'Dr. Priya Nair, MD, PhD',
      role: 'Director of Clinical Research',
      quote: 'With SclinNexus, managing multicenter studies became far more structured. Study setup consistency and real-time visibility into patient data helped us reduce operational variability across sites.',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: 'Dr. Rakesh Kulkarni, MD',
      role: 'Head – Clinical Quality & Compliance',
      quote: 'SclinNexus met our regulatory expectations with strong audit trails, controlled access, and validation support. The platform proved inspection-ready and aligned well with GxP and 21 CFR Part 11 requirements.',
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: 'Dr. Susan Williams, MD',
      role: 'Clinical Data Management Lead',
      quote: 'Data accuracy and integrity improved noticeably after adopting SclinNexus. Query resolution cycles shortened, and database lock timelines were achieved with greater confidence.',
      image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: 'Dr. Michael Thompson, MD',
      role: 'Medical Director, Global Clinical Programs',
      quote: 'SclinNexus enabled consistent governance across our global studies. The integrated dashboards provided clear insights into study progress, risks, and data quality at an executive level.',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: 'Dr. Kavita Rao, MD',
      role: 'Senior Clinical Investigator',
      quote: 'The usability of SclinNexus stood out. Investigator workflows were intuitive, training time was minimal, and compliance controls were embedded without disrupting daily clinical operations.',
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: 'Dr. Rajesh Iyer, MD',
      role: 'Principal Investigator, Clinical Research',
      quote: 'SclinNexus enabled our site to manage protocol deviations, source data verification, and investigator sign-offs more efficiently. The system built-in controls supported compliance while allowing our team to focus on patient care and study quality.',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ]

  const heroSlides = [
    {
      image: 'https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Transform Your',
      highlight: ' Clinical Trials ',
      titleEnd: 'with Modern SclinTech Solutions',
      subtitle: 'A powerful, intuitive clinical trial management platform that simplifies execution, ensures compliance, and accelerates your path to breakthrough discoveries.',
    },
    {
      image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Streamline Your',
      highlight: ' Research Operations ',
      titleEnd: 'with Advanced Analytics',
      subtitle: 'Leverage real-time insights and predictive analytics to optimize your clinical trials and accelerate drug development timelines.',
    },
    {
      image: 'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Ensure Complete',
      highlight: ' Regulatory Compliance ',
      titleEnd: 'with Built-in Standards',
      subtitle: 'Stay audit-ready with FDA 21 CFR Part 11, GDPR, and ICH-GCP compliant document management and electronic signatures.',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  // Auto-advance testimonial carousel
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(testimonialInterval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

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
      gradient: 'linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%)',
    },
    {
      icon: <Layers size={28} />,
      title: 'EDC System',
      description: 'Streamline data collection with our intuitive electronic data capture solution designed for clinical excellence.',
      gradient: 'linear-gradient(135deg, #fbcfe8 0%, #fecaca 100%)',
    },
    {
      icon: <Clock size={28} />,
      title: 'IWRS Platform',
      description: 'Simplify randomization, drug supply management and site coordination with intelligent workflows.',
      gradient: 'linear-gradient(135deg, #93c5fd 0%, #a5f3fc 100%)',
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Nexus Vault',
      description: 'Secure, compliant document storage with advanced encryption and audit trail capabilities.',
      gradient: 'linear-gradient(135deg, #86efac 0%, #a7f3d0 100%)',
    },
    {
      icon: <FolderOpen size={28} />,
      title: 'SclinTech Manager',
      description: 'Streamline document workflows with advanced SclinTech functionality and inspection readiness.',
      gradient: 'linear-gradient(135deg, #fda4af 0%, #fde68a 100%)',
    },
    {
      icon: <Brain size={28} />,
      title: 'Medical Coding',
      description: 'Optimize medical coding accuracy with AI-powered suggestions and centralized collaboration.',
      gradient: 'linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 100%)',
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
            <img src={SclinNexusLogo} alt="SclinNexus" className="landing-logo-img" />
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
          {/* Hero Section with Carousel */}
          <section className="landing-hero">
            {/* Carousel Background */}
            <div className="landing-hero-carousel">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`landing-hero-slide ${index === currentSlide ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              ))}
            </div>
            <div className="landing-hero-overlay"></div>
            
            <div className="landing-hero-content">
              <h1 className="landing-hero-title">
                {heroSlides[currentSlide].title}
                <span className="landing-highlight">{heroSlides[currentSlide].highlight}</span>
                {heroSlides[currentSlide].titleEnd}
              </h1>
              
              <p className="landing-hero-subtitle">
                {heroSlides[currentSlide].subtitle}
              </p>
              
              <div className="landing-hero-cta-group">
                {/* <CButton
                  size="lg"
                  className="landing-hero-cta landing-cta-primary"
                  onClick={() => navigate('/register')}
                >
                  Start Free Trial
                  <ArrowRight size={20} />
                </CButton> */}
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

            {/* Carousel Navigation */}
            <button className="landing-carousel-btn landing-carousel-prev" onClick={prevSlide}>
              <ChevronLeft size={28} />
            </button>
            <button className="landing-carousel-btn landing-carousel-next" onClick={nextSlide}>
              <ChevronRight size={28} />
            </button>

            {/* Carousel Indicators */}
            <div className="landing-carousel-indicators">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={`landing-carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
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
          <div className="landing-marquee">
            <div className="landing-marquee-content">
              <div className="landing-logo-item">PharmaCorp</div>
              <div className="landing-logo-item">BioResearch</div>
              <div className="landing-logo-item">MedTrials</div>
              <div className="landing-logo-item">ClinicalFirst</div>
              <div className="landing-logo-item">HealthLabs</div>
              <div className="landing-logo-item">NovoGen</div>
              <div className="landing-logo-item">AstraZenith</div>
              <div className="landing-logo-item">Merck Global</div>
              <div className="landing-logo-item">Sanofi Labs</div>
              <div className="landing-logo-item">Roche Sciences</div>
              <div className="landing-logo-item">Pfizer Research</div>
              <div className="landing-logo-item">GSK Pharma</div>
              {/* Duplicate for seamless loop */}
              <div className="landing-logo-item">PharmaCorp</div>
              <div className="landing-logo-item">BioResearch</div>
              <div className="landing-logo-item">MedTrials</div>
              <div className="landing-logo-item">ClinicalFirst</div>
              <div className="landing-logo-item">HealthLabs</div>
              <div className="landing-logo-item">NovoGen</div>
              <div className="landing-logo-item">AstraZenith</div>
              <div className="landing-logo-item">Merck Global</div>
              <div className="landing-logo-item">Sanofi Labs</div>
              <div className="landing-logo-item">Roche Sciences</div>
              <div className="landing-logo-item">Pfizer Research</div>
              <div className="landing-logo-item">GSK Pharma</div>
            </div>
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
            <h2 className="landing-section-title">Why Choose SclinTech?</h2>
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
          <span className="landing-testimonial-badge">Customer Experience</span>
          <h2 className="landing-testimonial-title">Why Clients Trust SclinSuite</h2>

          <div className="landing-testimonial-carousel">
            <div className="landing-testimonial-card">
              <div className="landing-author-avatar">
                <img 
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                />
              </div>
              <p className="landing-testimonial-text">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div className="landing-author-info">
                <h4>{testimonials[currentTestimonial].name}</h4>
                <p>{testimonials[currentTestimonial].role}</p>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <button className="landing-testimonial-btn landing-testimonial-prev" onClick={prevTestimonial}>
              <ChevronLeft size={24} />
            </button>
            <button className="landing-testimonial-btn landing-testimonial-next" onClick={nextTestimonial}>
              <ChevronRight size={24} />
            </button>

            {/* Testimonial Indicators */}
            <div className="landing-testimonial-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`landing-testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
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
              Join hundreds of research organizations already using SclinTech to streamline their 
              clinical operations and bring treatments to patients faster.
            </p>
            <div className="landing-cta-buttons">
              {/* <CButton
                size="lg"
                className="landing-cta-btn landing-cta-btn-primary"
                onClick={() => navigate('/register')}
              >
                Start Free Trial
              </CButton> */}
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
                  SclinTech is dedicated to protecting your online privacy. This policy outlines how SclinTech collects, uses, and safeguards your personally identifiable information, such as your name, address, email address, phone number, and other related information that is not publicly available. This web publication is owned and operated by SclinTech. For any inquiries regarding this privacy statement, please contact us via email at support@SclinTech.com.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Information Collection and Use</h3>
                <p>
                  SclinTech collects personal information when you register to receive communications or download information. We may combine this information with data obtained from business partners or other companies. For instance, we may request details when you sign up for a survey or a newsletter. Registration may require information such as your name, email address, birth date, gender, zip code, occupation, industry, and personal interests. For certain products and services, we may also ask for your address, Social Security number, and information about your assets. Once registered and signed in, you are no longer anonymous to us. You always have the option to withhold the information we request.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Information Sharing and Disclosure</h3>
                <p>
                  Our primary objective in collecting user information is to understand your project or business needs and enhance your experience on our web publications. This includes providing interactive communications such as newsletters to the email address you provide. SclinTech may also disclose user information when required by law, in good faith. Please note that SclinTech may sponsor advertisers or websites with links on our publications. The information practices of these external parties and websites are not covered by this privacy statement.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Email</h3>
                <p>
                  SclinTech respects the privacy of its readers and will not disclose, distribute, or rent its email subscriber newsletter list to any third party, nor will it permit anyone else to do so.
                </p>
              </div>
            </div>
          </CContainer>
        </section>
      ) : activePage === 'terms' ? (
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
              
              <h2 className="landing-privacy-title">Terms & Conditions</h2>
              
              <div className="landing-privacy-block">
                <h3>Acknowledgment and Agreement to Terms and Conditions</h3>
                <p>
                  By accessing and using this website, you unconditionally accept and agree to the following terms and conditions. SclinTech reserves the right to amend the Terms of Use at any time without prior notice. You are required to adhere to any such amendments and are therefore advised to periodically review this page to stay informed of the current Terms and Conditions to which you are subject.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>The Veracity of Information</h3>
                <p>
                  The information provided on this website is not warranted to be accurate, current, or complete, and may contain technical inaccuracies or typographical errors. SclinTech disclaims any responsibility for updating the site to ensure the accuracy or completeness of the information posted herein. Therefore, it is incumbent on users to verify the accuracy and completeness of all information prior to making any decisions regarding the services, products, or other matters described on this website.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>No Guarantees or Warranties</h3>
                <p>
                  The website and its contents are provided on an "as is" basis. Utilization of the website and its contents is at the user's sole risk. The website and its contents are provided without any representations, endorsements, or warranties of any kind, whether express or implied, including, but not limited to, warranties of title, accuracy, merchantability, fitness for a particular purpose, or non-infringement, except for warranties (if any) that cannot be expressly excluded under applicable law. Furthermore, SclinTech makes no representations, endorsements, or warranties, whether express or implied, with respect to any third-party website.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Utilization of Website</h3>
                <p>
                  The content provided on this website is intended exclusively for the personal use of its users. Users are prohibited from copying (except for personal use), modifying, distributing, transmitting, displaying, performing, reproducing, transferring, reselling, or republishing any content from the SclinTech website without obtaining prior written consent from SclinTech, which SclinTech may withhold at its sole discretion. SclinTech reserves the right to limit or restrict access to website data, downloads, accounts, and content, and to exclude any user or group of users from the website, as outlined in the website's Terms of Use.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Copyrights and All Other Related Intellectual Property</h3>
                <p>
                  All content contained on this website, including, but not limited to, white papers, case studies, graphics, icons, and the overall design and presentation (the "Website"), is the sole and exclusive property of SclinTech, and protected by applicable intellectual property laws. Trademarks not specifically identified as belonging to SclinTech are the property of their respective owners.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Disclaimer of Liability</h3>
                <p>
                  SclinTech shall not be liable under any circumstances for any damages whatsoever, of any kind or nature, arising out of or in connection with this website, its use, or any site or resource linked to, referenced, or accessed through this website. This includes, but is not limited to, direct, indirect, incidental, special, exemplary, or consequential damages, lost profits, business interruption, lost savings, or loss of programs or other data, even if SclinTech has been expressly advised of the possibility of such damages. This exclusion and waiver of liability applies to all claims, regardless of whether they are based on contract, warranty, tort, or any other legal theory.
                </p>
              </div>
            </div>
          </CContainer>
        </section>
      ) : activePage === 'cookies' ? (
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
              
              <h2 className="landing-privacy-title">Cookie Policy</h2>
              
              <div className="landing-privacy-block">
                <h3>Use of Cookies</h3>
                <p>
                  We may utilize information gathered from our Cookies to discern user behavior and to deliver content and offers tailored to your profile, thereby enhancing the convenience for users of our Site.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Marketing and Statistics Cookies</h3>
                <p>
                  We employ marketing and statistics cookies to gain insights into visitors' behavior, such as their interactions with the website and to track visitors' sessions.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Managing Cookies</h3>
                <p>
                  Should you prefer not to have Cookies placed on your device, you may adjust the settings of your Internet browser to reject the placement of all or some Cookies and to alert you when a Cookie is placed on your device. If you wish to remove previously stored Cookies, you may manually delete the Cookies at any time. However, this will not prevent our Site from placing further Cookies on your device unless you adjust your Internet browser settings as aforementioned.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Third-Party Tools</h3>
                <p>
                  We incorporate third-party tools on the SclinTech website for analytical or user experience purposes.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Social Media</h3>
                <p>
                  Should you use social media or other third-party credentials to log in to our website, the respective organization may set a cookie that allows them to recognize you. We enable users to share our Website on social media platforms such as Facebook and Twitter through their cookies. These cookies are not under our control. Please refer to the respective privacy policies of the social media providers for information on how their cookies operate and how to manage such cookies and buttons.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Privacy Policy Links</h3>
                <p>
                  • LinkedIn – https://www.linkedin.com/legal/privacy-policy<br />
                  • Twitter – https://gdpr.twitter.com/en.html & https://twitter.com/en/privacy & https://help.twitter.com/en/rules-and-policies/twitter-cookies<br />
                  • Facebook – https://www.facebook.com/business/gdpr
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Social Media Sharing</h3>
                <p>
                  If you utilize a social media sharing button or widget on our site, the social network that created the button will record your action for its own purposes.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Collection and Processing of Personal Data</h3>
                <p>
                  We process your personal data in various instances. When you visit and use our website, we process personal data about you, such as through the use of cookies. This data is utilized to enhance our website, collect statistics regarding usage and effectiveness, improve user experience, provide customer support, target advertising, personalize your experience, and tailor our interactions with you.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Use of Personal Data</h3>
                <p>
                  We also process your personal data when you use features on our website such as signing up for newsletters or webinars, submitting data, or requesting information about our services or products. We will use this personal data to fulfill our contractual obligations. We may also contact you for customer satisfaction surveys or market research purposes.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Combining Personal Data</h3>
                <p>
                  The personal data we collect, directly or indirectly, may be combined to enhance its overall accuracy and completeness and to better tailor our interactions with you. The personal data you provide to SclinTech may also be used for direct marketing purposes. Before doing so, we will ensure that either we have obtained your specific consent or that it is necessary for the legitimate interest pursued by us in securing the delivery of our products and services.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Types of Personal Data</h3>
                <p>
                  The personal data we process is typically non-sensitive in nature. This may include your user name, password, email address, first name, surname, job title, company name, and phone number. Some of our software products may include technologies that collect information about product usage, and we may use such technologies to determine if you have opened an email or clicked on a link within an email.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>General Data Protection Regulation (GDPR)</h3>
                <p>
                  When we process personal data about you, we do so with your consent and/or as necessary to provide the website you use, operate our business, meet our contractual and legal obligations, protect the security of our systems and our customers, or fulfill other legitimate interests of SclinTech as described in this privacy statement.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Your Rights Under GDPR</h3>
                <p>
                  SclinTech adheres to applicable data protection laws in the European Economic Area, which include the following rights:<br /><br />
                  • If the processing of personal data is based on your consent, you have the right to withdraw consent at any time for future processing.<br />
                  • You have the right to request access to and rectification of your personal data.<br />
                  • You have the right to request the erasure of your personal data, subject to certain exceptions.<br />
                  • You have the right to object to the processing of your personal data.<br />
                  • You have the right to lodge a complaint with a data protection authority.
                </p>
              </div>

              <div className="landing-privacy-block">
                <h3>Disclosure of User Information</h3>
                <p>
                  SclinTech may disclose user information in compliance with legal obligations, in response to lawful requests by public authorities, to pursue our legitimate interests in applying or enforcing our terms and conditions, responding to claims, protecting our rights or the rights of third parties, ensuring the safety of any individual, or preventing illegal activities, including fraud protection and credit risk reduction, in accordance with Art. 6(1)(f) GDPR.
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
                <img src={SclinNexusLogo} alt="SclinNexus" className="landing-footer-logo-img" />
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
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('terms'); window.scrollTo(0, 0); }}>Terms of Service</a></li>
                <li><a href="#compliance">Compliance</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('cookies'); window.scrollTo(0, 0); }}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="landing-footer-bottom">
            <p className="landing-footer-copyright">© 2026 SclinTech. All rights reserved.</p>
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
