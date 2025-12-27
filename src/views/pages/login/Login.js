import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CButton, CFormInput, CFormLabel } from '@coreui/react'
import './Login.scss'

const Login = () => {
  const navigate = useNavigate()
  const [emailOrMobile, setEmailOrMobile] = useState('')
  const [error, setError] = useState('')

  const validateInput = (value) => {
    // Check if it's a valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Check if it's a valid mobile number (10 digits)
    const mobileRegex = /^\d{10}$/

    if (!value) {
      return 'Please enter a valid email address or mobile number.'
    }

    if (!emailRegex.test(value) && !mobileRegex.test(value)) {
      return 'Please enter a valid email address or mobile number.'
    }

    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationError = validateInput(emailOrMobile)

    if (validationError) {
      setError(validationError)
      return
    }

    // Check if account exists (mock validation)
    // In real app, this would be an API call
    const mockValidEmails = ['robert@domain.com', 'user@example.com']
    const mockValidMobiles = ['9661096610', '1234567890']

    if (!mockValidEmails.includes(emailOrMobile) && !mockValidMobiles.includes(emailOrMobile)) {
      if (emailOrMobile.includes('@')) {
        setError('Sorry, we cannot find an account with this email address.')
      } else {
        setError('Sorry, we cannot find an account with this mobile number.')
      }
      return
    }

    // Clear error and navigate to next step or dashboard
    setError('')
    // For now, navigate to dashboard
    navigate('/dashboard')
  }

  const handleInputChange = (e) => {
    setEmailOrMobile(e.target.value)
    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Dark Panel */}
        <div className="auth-left-panel">
          <div className="auth-left-content">
            <h1 className="auth-welcome-title">
              Welcome to
              <br />
              the <span className="platform-name">ETMF</span> Community
            </h1>

            <p className="auth-welcome-description">
              We empowers clinical teams to design, manage, and monitor electronic data capture workflows with precision and compliance. Join us to simplify study setup, streamline data collection, and accelerate clinical research outcomes.
            </p>

            <div className="auth-avatars">
              <div className="avatar-group">
                <img src="https://i.pravatar.cc/150?img=1" alt="User 1" className="avatar" />
                <img src="https://i.pravatar.cc/150?img=2" alt="User 2" className="avatar" />
                <img src="https://i.pravatar.cc/150?img=3" alt="User 3" className="avatar" />
                <img src="https://i.pravatar.cc/150?img=4" alt="User 4" className="avatar" />
              </div>
            </div>

            <p className="auth-trust-text">
              A trusted platform for research and operational teams
              <br />
              across the globe — now it's your turn.
            </p>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="auth-right-panel">
          <div className="auth-form-container">
            {/* Back to Home Link */}
            <Link to="/" className="back-to-home">
              <span className="back-icon">←</span> Back to Home
            </Link>

            {/* Logo and Title */}
            <div className="auth-form-header">
              <div className="auth-logo">
                <span className="logo-icon">🔬</span>
                <span className="logo-text">ETMF</span>
              </div>
              <h2 className="auth-form-title">Sign In</h2>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <CFormLabel htmlFor="emailOrMobile" className="form-label">
                  Enter your Email Address or Mobile Number *
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="emailOrMobile"
                  name="emailOrMobile"
                  value={emailOrMobile}
                  onChange={handleInputChange}
                  className={`form-input ${error ? 'is-invalid' : ''}`}
                  placeholder="Email or Mobile Number"
                />
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}
              </div>

              <CButton
                type="submit"
                className="auth-submit-btn"
              >
                Sign In
              </CButton>
            </form>

            {/* Sign Up Link */}
            <div className="auth-footer-link">
              <span>Can't access? </span>
              <Link to="/register" className="link-primary">
                Try another way
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
