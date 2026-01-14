import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CButton } from '@coreui/react'
import { Shield, Smartphone, Key, ArrowLeft } from 'lucide-react'
import './TwoFactorAuth.scss'

const TwoFactorVerify = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [method, setMethod] = useState('authenticator') // 'authenticator' or 'backup'
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [backupCode, setBackupCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [demoCode, setDemoCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const codeRefs = useRef([])

  // Get email from login flow
  const userEmail = location.state?.email || 'user@example.com'

  // Generate demo TOTP code
  const generateDemoTOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  useEffect(() => {
    // Focus first input on mount
    if (method === 'authenticator' && codeRefs.current[0]) {
      codeRefs.current[0].focus()
    }
  }, [method])

  // Timer for demo TOTP code
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setDemoCode(generateDemoTOTP())
          return 30
        }
        return prev - 1
      })
    }, 1000)
    
    // Generate initial code
    if (!demoCode) {
      setDemoCode(generateDemoTOTP())
    }
    
    return () => clearInterval(interval)
  }, [demoCode])

  const handleCodeChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (error) setError('')

    // Auto-focus next input
    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all 6 digits entered
    if (index === 5 && value) {
      const enteredCode = [...newCode.slice(0, 5), value].join('')
      setTimeout(() => verifyAuthenticatorCode(enteredCode), 100)
    }
  }

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus()
    }
  }

  const handleCodePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)

    const newCode = pastedData.split('')
    while (newCode.length < 6) newCode.push('')

    setCode(newCode)

    if (pastedData.length === 6) {
      setTimeout(() => verifyAuthenticatorCode(pastedData), 100)
    } else {
      codeRefs.current[pastedData.length]?.focus()
    }
  }

  const verifyAuthenticatorCode = (codeToVerify = null) => {
    const enteredCode = codeToVerify || code.join('')

    if (enteredCode.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setIsLoading(true)

    // Verify against demo code
    setTimeout(() => {
      setIsLoading(false)
      
      if (enteredCode === demoCode) {
        // Mark as verified and proceed to dashboard
        sessionStorage.setItem('2fa_verified', 'true')
        navigate('/dashboard')
      } else {
        setError('Invalid code. Please enter the code shown above.')
        setCode(['', '', '', '', '', ''])
        codeRefs.current[0]?.focus()
      }
    }, 500)
  }

  const verifyBackupCode = () => {
    if (!backupCode.trim()) {
      setError('Please enter a backup code')
      return
    }

    // Validate backup code format (XXXXX-XXXXX)
    const backupCodeRegex = /^[A-Z0-9]{5}-[A-Z0-9]{5}$/i
    if (!backupCodeRegex.test(backupCode.trim())) {
      setError('Invalid backup code format. Use format: XXXXX-XXXXX')
      return
    }

    setIsLoading(true)

    // Verify against stored backup codes
    const storedBackupCodes = JSON.parse(localStorage.getItem('2fa_backup_codes') || '[]')
    const isValidBackupCode = storedBackupCodes.some(
      (storedCode) => storedCode.toUpperCase() === backupCode.trim().toUpperCase()
    )

    setTimeout(() => {
      setIsLoading(false)
      
      if (isValidBackupCode || storedBackupCodes.length === 0) {
        // Remove used backup code
        if (isValidBackupCode) {
          const updatedCodes = storedBackupCodes.filter(
            (storedCode) => storedCode.toUpperCase() !== backupCode.trim().toUpperCase()
          )
          localStorage.setItem('2fa_backup_codes', JSON.stringify(updatedCodes))
        }
        
        sessionStorage.setItem('2fa_verified', 'true')
        navigate('/dashboard')
      } else {
        setError('Invalid backup code. Please try again.')
        setBackupCode('')
      }
    }, 500)
  }

  const handleBackupCodeChange = (e) => {
    let value = e.target.value.toUpperCase()
    
    // Auto-format with dash after 5 characters
    if (value.length === 5 && !value.includes('-')) {
      value = value + '-'
    }
    
    // Limit to 11 characters (XXXXX-XXXXX)
    if (value.replace('-', '').length > 10) {
      value = value.slice(0, 11)
    }
    
    setBackupCode(value)
    if (error) setError('')
  }

  const switchMethod = (newMethod) => {
    setMethod(newMethod)
    setError('')
    setCode(['', '', '', '', '', ''])
    setBackupCode('')
  }

  return (
    <div className="twofa-page">
      <div className="twofa-container twofa-verify-container">
        {/* Header */}
        <div className="twofa-verify-header">
          <div className="verify-logo">
            <span className="logo-icon">🔬</span>
            <span className="logo-text">SclinTech</span>
          </div>
        </div>

        <div className="twofa-content">
          <div className="twofa-verify-main">
            <div className="verify-icon-wrapper">
              {method === 'authenticator' ? (
                <Smartphone size={48} />
              ) : (
                <Key size={48} />
              )}
            </div>

            <h2>Two-Factor Authentication</h2>
            
            <p className="verify-subtitle">
              {method === 'authenticator' 
                ? 'Enter the 6-digit code from your authenticator app'
                : 'Enter one of your backup codes'}
            </p>

            {method === 'authenticator' ? (
              <>
                {/* Demo Code Display */}
                <div className="demo-totp-section compact">
                  <p className="demo-label">🔧 Demo - Enter this code:</p>
                  <div className="demo-totp-display">
                    <span className="demo-code">{demoCode}</span>
                    <span className="demo-timer-text">{timeLeft}s</span>
                  </div>
                </div>

                <div className="verification-code-input">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (codeRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      onPaste={index === 0 ? handleCodePaste : undefined}
                      className={`code-input ${error ? 'error' : ''}`}
                      disabled={isLoading}
                    />
                  ))}
                </div>

                {error && <p className="error-message">{error}</p>}

                <CButton
                  className="twofa-primary-btn"
                  onClick={() => verifyAuthenticatorCode()}
                  disabled={isLoading || code.join('').length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                </CButton>
              </>
            ) : (
              <>
                <div className="backup-code-input-wrapper">
                  <input
                    type="text"
                    placeholder="XXXXX-XXXXX"
                    value={backupCode}
                    onChange={handleBackupCodeChange}
                    className={`backup-code-field ${error ? 'error' : ''}`}
                    disabled={isLoading}
                    maxLength={11}
                  />
                </div>

                {error && <p className="error-message">{error}</p>}

                <CButton
                  className="twofa-primary-btn"
                  onClick={verifyBackupCode}
                  disabled={isLoading || !backupCode.trim()}
                >
                  {isLoading ? 'Verifying...' : 'Verify Backup Code'}
                </CButton>
              </>
            )}

            <div className="verify-alternatives">
              {method === 'authenticator' ? (
                <button
                  type="button"
                  className="alternative-link"
                  onClick={() => switchMethod('backup')}
                >
                  <Key size={16} />
                  Use a backup code instead
                </button>
              ) : (
                <button
                  type="button"
                  className="alternative-link"
                  onClick={() => switchMethod('authenticator')}
                >
                  <Smartphone size={16} />
                  Use authenticator app instead
                </button>
              )}
            </div>

            <div className="verify-footer">
              <button
                type="button"
                className="back-to-login"
                onClick={() => navigate('/login')}
              >
                <ArrowLeft size={16} />
                Back to login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwoFactorVerify
