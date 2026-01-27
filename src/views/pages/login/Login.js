import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CButton, CFormInput, CFormLabel } from '@coreui/react'
import './Login.scss'
import SclinNexusLogo from '../../../assets/images/SclinNexus_color_logo.png'

const Login = () => {
  const navigate = useNavigate()
  const [emailOrMobile, setEmailOrMobile] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [step, setStep] = useState('input') // 'input', 'passcode'
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const otpRefs = useRef([])

  // Store user info temporarily for 2FA flow
  const [userInfo, setUserInfo] = useState(null)

  // Timer for Passcode resend
  useEffect(() => {
    if (step === 'passcode' && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else if (resendTimer === 0) {
      setCanResend(true)
    }
  }, [resendTimer, step])

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

  const generateOTP = () => {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    return otp
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationError = validateInput(emailOrMobile)

    if (validationError) {
      setError(validationError)
      return
    }

    if (!password) {
      setError('Please enter your password.')
      return
    }

    // Check if account exists and validate password (mock validation)
    // In real app, this would be an API call
    const mockUsers = {
      'robert@domain.com': { password: 'password123' },
      'user@example.com': { password: 'password123' },
      '9661096610': { password: 'password123' },
      '1234567890': { password: 'password123' }
    }

    const user = mockUsers[emailOrMobile]

    if (!user) {
      if (emailOrMobile.includes('@')) {
        setError('Sorry, we cannot find an account with this email address.')
      } else {
        setError('Sorry, we cannot find an account with this mobile number.')
      }
      return
    }

    // Validate password
    if (user.password !== password) {
      setError('Incorrect password. Please try again.')
      return
    }

    // Clear error
    setError('')

    // Check 2FA status from localStorage (set in Authentication settings page)
    const is2FASMSEnabled = localStorage.getItem('2fa_sms_enabled') === 'true'
    const is2FATOTPEnabled = localStorage.getItem('2fa_totp_enabled') === 'true'
    const is2FAEnabled = is2FASMSEnabled || is2FATOTPEnabled

    console.log('2FA Status Check:', {
      is2FASMSEnabled,
      is2FATOTPEnabled,
      is2FAEnabled,
      sms_value: localStorage.getItem('2fa_sms_enabled'),
      totp_value: localStorage.getItem('2fa_totp_enabled')
    })

    // Store user info
    setUserInfo({ email: emailOrMobile, is2FAEnabled })

    // Check if 2FA is enabled
    if (is2FAEnabled) {
      // Generate and send Passcode
      const newOtp = generateOTP()
      setGeneratedOtp(newOtp)
      // For demo purposes - OTP is displayed on screen
      // In production, this would be sent via SMS/Email only

      // Move to Passcode step
      setStep('passcode')
      setResendTimer(30)
      setCanResend(false)

      // Focus first OTP input
      setTimeout(() => {
        if (otpRefs.current[0]) {
          otpRefs.current[0].focus()
        }
      }, 100)
    } else {
      // 2FA not enabled, directly login
      sessionStorage.setItem('isAuthenticated', 'true')
      sessionStorage.setItem('2fa_verified', 'true')
      navigate('/dashboard')
    }
  }

  const handleInputChange = (e) => {
    setEmailOrMobile(e.target.value)
    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Clear error when user starts typing
    if (otpError) {
      setOtpError('')
    }

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all 6 digits are entered
    if (index === 5 && value) {
      const enteredOtp = [...newOtp.slice(0, 5), value].join('')
      setTimeout(() => verifyOtp(enteredOtp), 100)
    }
  }

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)

    if (!/^\d+$/.test(pastedData)) return

    const newOtp = pastedData.split('')
    while (newOtp.length < 6) newOtp.push('')

    setOtp(newOtp)

    // Focus last filled input or verify if complete
    if (pastedData.length === 6) {
      setTimeout(() => verifyOtp(pastedData), 100)
    } else {
      otpRefs.current[pastedData.length]?.focus()
    }
  }

  const verifyOtp = (otpToVerify = null) => {
    const enteredOtp = otpToVerify || otp.join('')

    if (enteredOtp.length !== 6) {
      setOtpError('Please enter complete 6-digit passcode')
      return
    }

    // Verify Passcode (In production, this would be an API call)
    if (enteredOtp === generatedOtp) {
      setOtpError('')

      // Set user as authenticated
      sessionStorage.setItem('isAuthenticated', 'true')
      sessionStorage.setItem('2fa_verified', 'true')

      // Navigate to dashboard on successful verification
      navigate('/dashboard')
    } else {
      setOtpError('Invalid passcode. Please try again.')
      // Clear OTP inputs
      setOtp(['', '', '', '', '', ''])
      otpRefs.current[0]?.focus()
    }
  }

  const handleResendOtp = () => {
    if (!canResend) return

    // Generate new Passcode
    const newOtp = generateOTP()
    setGeneratedOtp(newOtp)
    // For demo purposes - Passcode is displayed on screen

    // Reset timer and OTP inputs
    setResendTimer(30)
    setCanResend(false)
    setOtp(['', '', '', '', '', ''])
    setOtpError('')
    otpRefs.current[0]?.focus()
  }

  const handleChangeEmailOrMobile = () => {
    setStep('input')
    setOtp(['', '', '', '', '', ''])
    setOtpError('')
    setGeneratedOtp('')
    setPassword('')
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
              the <span className="platform-name">SclinNexus</span> Community
            </h1>

            <p className="auth-welcome-description">
              We empowers clinical teams to design, manage, and monitor electronic data capture workflows with precision and compliance. Join us to simplify study setup, streamline data collection, and accelerate clinical research outcomes.
            </p>

            <div className="auth-avatars">
              <div className="avatar-group">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face" alt="Senior Doctor" className="avatar" />
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face" alt="Senior Researcher" className="avatar" />
                <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face" alt="Senior Professional" className="avatar" />
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&h=150&fit=crop&crop=face" alt="Senior Medical Professional" className="avatar" />
              </div>
            </div>

            <p className="auth-trust-text">
              A trusted platform for research and operational teams
              <br />
              across the globe — now it's your turn.
            </p>
          </div>
        </div>

        {/* Right Side - Sign In Form / OTP Verification */}
        <div className="auth-right-panel">
          <div className="auth-form-container">
            {/* Back to Home Link */}
            <Link to="/" className="back-to-home">
              <span className="back-icon">←</span> Back to Home
            </Link>

            {/* Logo and Title */}
            <div className="auth-form-header">
              <div className="auth-logo">
                <img src={SclinNexusLogo} alt="SclinNexus" className="logo-image" />
                <span className="logo-text">SclinNexus</span>
              </div>
              <h2 className="auth-form-title">
                {step === 'input' ? "Let's Sign you in" : 'Write the code sent'}
              </h2>
              {step === 'input' && (
                <p className="auth-form-subtitle">Sign in your account</p>
              )}
              {step === 'passcode' && (
                <p className="auth-form-subtitle">
                  A code has been sent to your number. Enter it in the box below.
                </p>
              )}
            </div>

            {step === 'input' ? (
              <>
                {/* Sign In Form */}
                <form onSubmit={handleSubmit} className="auth-form">
                  <div className="form-group">
                    <CFormLabel htmlFor="emailOrMobile" className="form-label">
                      Email Address
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="emailOrMobile"
                      name="emailOrMobile"
                      value={emailOrMobile}
                      onChange={handleInputChange}
                      className={`form-input ${error ? 'is-invalid' : ''}`}
                      placeholder="Enter Your Email Address"
                    />
                  </div>

                  <div className="form-group">
                    <CFormLabel htmlFor="password" className="form-label">
                      Password
                    </CFormLabel>
                    <div className="password-input-wrapper">
                      <CFormInput
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`form-input ${error ? 'is-invalid' : ''}`}
                        placeholder="Enter Your Password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    {error && (
                      <div className="error-message">
                        {error}
                      </div>
                    )}
                  </div>

                  <div className="auth-links">
                    <Link to="/forgot-password" className="link-primary">
                      Forgot Password?
                    </Link>
                  </div>

                  <CButton
                    type="submit"
                    className="auth-submit-btn"
                  >
                    Sign In
                  </CButton>
                </form>

                {/* Sign Up Link */}
                {/* <div className="auth-footer-link">
                  <span>Don't have an account? </span>
                  <Link to="/register" className="link-primary">
                    Sign up
                  </Link>
                </div> */}
              </>
            ) : (
              <>
                {/* Passcode Verification */}
                <div className="otp-verification">
                  <p className="passcode-label">Enter The Code</p>

                  {/* Demo Passcode Display */}
                  <div className="demo-otp-display">
                    <span className="demo-label">Demo Passcode:</span>
                    <span className="demo-otp-code">{generatedOtp}</span>
                  </div>

                  <div className="otp-inputs">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        className={`otp-input ${otpError ? 'is-invalid' : ''}`}
                      />
                    ))}
                  </div>

                  {otpError && (
                    <div className="error-message otp-error">
                      {otpError}
                    </div>
                  )}

                  <div className="otp-resend-info">
                    <span className="resend-info-text">
                      A One-Time Code Has Been Sent To You.
                    </span>
                    {canResend ? (
                      <button
                        type="button"
                        className="resend-link"
                        onClick={handleResendOtp}
                      >
                        Resend
                      </button>
                    ) : (
                      <span className="resend-timer-link">
                        {String(Math.floor(resendTimer / 60)).padStart(2, '0')}:
                        {String(resendTimer % 60).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  <CButton
                    onClick={() => verifyOtp()}
                    className="auth-submit-btn verify-btn"
                  >
                    Confirm
                  </CButton>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
