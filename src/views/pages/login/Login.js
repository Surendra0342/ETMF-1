import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CButton, CFormInput, CFormLabel } from '@coreui/react'
import './Login.scss'

const Login = () => {
  const navigate = useNavigate()
  const [emailOrMobile, setEmailOrMobile] = useState('')
  const [error, setError] = useState('')
  const [step, setStep] = useState('input') // 'input', 'otp', 'recovery', or 'email-otp'
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const otpRefs = useRef([])

  // Recovery step states
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [recoveryError, setRecoveryError] = useState('')

  // Timer for OTP resend
  useEffect(() => {
    if (step === 'otp' && resendTimer > 0) {
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

    // Generate and send OTP
    const newOtp = generateOTP()
    setGeneratedOtp(newOtp)
    console.log('Generated OTP:', newOtp) // In production, this would be sent via SMS/Email

    // Clear error and move to OTP step
    setError('')
    setStep('otp')
    setResendTimer(30)
    setCanResend(false)

    // Focus first OTP input
    setTimeout(() => {
      if (otpRefs.current[0]) {
        otpRefs.current[0].focus()
      }
    }, 100)
  }

  const handleInputChange = (e) => {
    setEmailOrMobile(e.target.value)
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
      setOtpError('Please enter complete 6-digit OTP')
      return
    }

    // Verify OTP (In production, this would be an API call)
    if (enteredOtp === generatedOtp) {
      setOtpError('')
      // Navigate to dashboard on successful verification
      navigate('/dashboard')
    } else {
      setOtpError('Invalid OTP. Please try again.')
      // Clear OTP inputs
      setOtp(['', '', '', '', '', ''])
      otpRefs.current[0]?.focus()
    }
  }

  const handleResendOtp = () => {
    if (!canResend) return

    // Generate new OTP
    const newOtp = generateOTP()
    setGeneratedOtp(newOtp)
    console.log('Resent OTP:', newOtp) // In production, this would be sent via SMS/Email

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
  }

  const handleTryAnotherWay = () => {
    setStep('recovery')
    setError('')
  }

  const handleRecoveryInputChange = (e) => {
    setRecoveryEmail(e.target.value)
    if (recoveryError) {
      setRecoveryError('')
    }
  }

  const handleRecoveryContinue = (e) => {
    e.preventDefault()

    const validationError = validateInput(recoveryEmail)

    if (validationError) {
      setRecoveryError(validationError)
      return
    }

    // Move to email OTP confirmation step
    setRecoveryError('')
    setStep('email-otp')
  }

  const handleSendOtpToEmail = () => {
    // Generate OTP for recovery
    const newOtp = generateOTP()
    setGeneratedOtp(newOtp)
    console.log('Recovery OTP sent to email:', newOtp)

    // Move to OTP verification step
    setStep('otp')
    setResendTimer(30)
    setCanResend(false)
    setEmailOrMobile(recoveryEmail) // Use recovery email for display

    // Focus first OTP input
    setTimeout(() => {
      if (otpRefs.current[0]) {
        otpRefs.current[0].focus()
      }
    }, 100)
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
                <span className="logo-icon">🔬</span>
                <span className="logo-text">ETMF</span>
              </div>
              <h2 className="auth-form-title">
                {step === 'input'
                  ? 'Sign In'
                  : step === 'recovery'
                  ? 'Find Your Account'
                  : step === 'email-otp'
                  ? 'ETMF'
                  : 'Verify OTP'}
              </h2>
            </div>

            {step === 'input' ? (
              <>
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
                  <button
                    type="button"
                    className="link-primary link-button"
                    onClick={handleTryAnotherWay}
                  >
                    Try another way
                  </button>
                </div>
              </>
            ) : step === 'recovery' ? (
              <>
                {/* Account Recovery Form */}
                <div className="recovery-form">
                  <p className="recovery-instruction">
                    We need your registered email address or mobile number to find your account
                  </p>

                  <form onSubmit={handleRecoveryContinue} className="auth-form">
                    <div className="form-group">
                      <CFormLabel htmlFor="recoveryEmail" className="form-label">
                        Enter your Email Address or Mobile Number *
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="recoveryEmail"
                        name="recoveryEmail"
                        value={recoveryEmail}
                        onChange={handleRecoveryInputChange}
                        className={`form-input ${recoveryError ? 'is-invalid' : ''}`}
                        placeholder="Email or Mobile Number"
                      />
                      {recoveryError && (
                        <div className="error-message">
                          {recoveryError}
                        </div>
                      )}
                    </div>

                    <CButton
                      type="submit"
                      className="auth-submit-btn"
                    >
                      Continue
                    </CButton>
                  </form>

                  <div className="auth-footer-link">
                    <button
                      type="button"
                      className="link-primary link-button"
                      onClick={() => setStep('input')}
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              </>
            ) : step === 'email-otp' ? (
              <>
                {/* Email OTP Confirmation */}
                <div className="email-otp-confirmation">
                  <div className="platform-icon">
                    <span className="wifi-icon">📶</span>
                  </div>

                  <h3 className="email-otp-title">ETMF</h3>

                  <p className="email-otp-instruction">
                    You will receive an OTP on your registered email
                  </p>

                  <div className="masked-email-container">
                    <CFormInput
                      type="text"
                      value={recoveryEmail.replace(/(.{3})(.*)(@.*)/, '$1*****$3')}
                      readOnly
                      className="masked-email-input"
                    />
                  </div>

                  <CButton
                    onClick={handleSendOtpToEmail}
                    className="auth-submit-btn send-otp-btn"
                  >
                    Send OTP to Email
                  </CButton>

                  <div className="auth-footer-link">
                    <button
                      type="button"
                      className="link-primary link-button"
                      onClick={() => setStep('recovery')}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* OTP Verification */}
                <div className="otp-verification">
                  <p className="otp-instruction">
                    We've sent a 6-digit OTP to
                    <br />
                    <strong>{emailOrMobile}</strong>
                  </p>

                  <button
                    type="button"
                    className="change-email-btn"
                    onClick={handleChangeEmailOrMobile}
                  >
                    Change
                  </button>

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

                  <CButton
                    onClick={() => verifyOtp()}
                    className="auth-submit-btn verify-btn"
                  >
                    Verify OTP
                  </CButton>

                  <div className="otp-resend">
                    {canResend ? (
                      <button
                        type="button"
                        className="resend-btn"
                        onClick={handleResendOtp}
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <span className="resend-timer">
                        Resend OTP in {resendTimer}s
                      </span>
                    )}
                  </div>
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
