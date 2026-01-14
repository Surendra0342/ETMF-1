import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CFormInput, CFormLabel } from '@coreui/react'
import { Shield, Smartphone, Copy, Check, ArrowLeft, QrCode, Key, Download, ExternalLink } from 'lucide-react'
import './TwoFactorAuth.scss'

const TwoFactorSetup = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState('intro') // 'intro', 'download-app', 'qr', 'verify', 'backup', 'success'
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [secretKey, setSecretKey] = useState('')
  const [backupCodes, setBackupCodes] = useState([])
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [demoCode, setDemoCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  
  // Generate a random secret key (in production, this comes from backend)
  const generateRandomSecret = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    let secret = ''
    for (let i = 0; i < 16; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return secret
  }

  // Generate backup codes
  const generateBackupCodes = () => {
    const codes = []
    for (let i = 0; i < 8; i++) {
      const part1 = Math.random().toString(36).substring(2, 7).toUpperCase()
      const part2 = Math.random().toString(36).substring(2, 7).toUpperCase()
      codes.push(`${part1}-${part2}`)
    }
    return codes
  }

  // Generate a demo TOTP code (changes every 30 seconds)
  const generateDemoTOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  useEffect(() => {
    // Check if 2FA is already enabled
    const twoFAStatus = localStorage.getItem('2fa_enabled')
    setIs2FAEnabled(twoFAStatus === 'true')
  }, [])

  // Timer for demo TOTP code
  useEffect(() => {
    if (step === 'verify' || step === 'qr') {
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
    }
  }, [step, demoCode])

  const startSetup = () => {
    setStep('download-app')
  }

  const generateSecretKey = () => {
    const newSecret = generateRandomSecret()
    setSecretKey(newSecret)
    setBackupCodes(generateBackupCodes())
    setDemoCode(generateDemoTOTP())
    setStep('qr')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCodeChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return
    
    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)
    
    if (error) setError('')
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleCodePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    
    const newCode = pastedData.split('')
    while (newCode.length < 6) newCode.push('')
    
    setVerificationCode(newCode)
    
    if (pastedData.length === 6) {
      document.getElementById('code-5')?.focus()
    }
  }

  const verifyCode = () => {
    const enteredCode = verificationCode.join('')
    
    if (enteredCode.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }
    
    // Verify the code matches the demo code
    // In production, this would validate against a real TOTP algorithm
    if (enteredCode === demoCode) {
      setError('')
      setStep('backup')
    } else {
      setError('Invalid code. Please enter the code shown above.')
      setVerificationCode(['', '', '', '', '', ''])
      document.getElementById('code-0')?.focus()
    }
  }

  const completeSetup = () => {
    // Save 2FA status and backup codes
    localStorage.setItem('2fa_enabled', 'true')
    localStorage.setItem('2fa_secret', secretKey)
    localStorage.setItem('2fa_backup_codes', JSON.stringify(backupCodes))
    setIs2FAEnabled(true)
    setStep('success')
  }

  const disable2FA = () => {
    localStorage.removeItem('2fa_enabled')
    localStorage.removeItem('2fa_secret')
    localStorage.removeItem('2fa_backup_codes')
    setIs2FAEnabled(false)
    setStep('intro')
  }

  const downloadBackupCodes = () => {
    const content = `SclinTech 2FA Backup Codes
Generated: ${new Date().toLocaleString()}

Keep these codes safe! Each code can only be used once.

${backupCodes.map((code, i) => `${i + 1}. ${code}`).join('\n')}

If you lose access to your authenticator app, you can use one of these codes to sign in.
`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sclintech-backup-codes.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="twofa-page">
      <div className="twofa-container">
        {/* Header */}
        <div className="twofa-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div className="header-title">
            <Shield size={24} />
            <h1>Two-Factor Authentication</h1>
          </div>
        </div>

        <div className="twofa-content">
          {step === 'intro' && (
            <div className="twofa-intro">
              <div className="intro-icon">
                <Shield size={64} />
              </div>
              <h2>{is2FAEnabled ? '2FA is Enabled' : 'Secure Your Account'}</h2>
              <p className="intro-description">
                {is2FAEnabled 
                  ? 'Your account is protected with two-factor authentication. You\'ll need to enter a code from your authenticator app when signing in.'
                  : 'Add an extra layer of security to your account. When enabled, you\'ll need to enter a code from your authenticator app in addition to your password.'}
              </p>
              
              <div className="security-benefits">
                <h3>Benefits of 2FA:</h3>
                <ul>
                  <li>
                    <Check size={16} />
                    <span>Protects against unauthorized access</span>
                  </li>
                  <li>
                    <Check size={16} />
                    <span>Secures sensitive patient data</span>
                  </li>
                  <li>
                    <Check size={16} />
                    <span>Complies with healthcare security standards</span>
                  </li>
                  <li>
                    <Check size={16} />
                    <span>Works with any authenticator app</span>
                  </li>
                </ul>
              </div>

              {is2FAEnabled ? (
                <div className="twofa-actions">
                  <CButton 
                    className="twofa-disable-btn"
                    onClick={disable2FA}
                  >
                    Disable 2FA
                  </CButton>
                </div>
              ) : (
                <CButton 
                  className="twofa-enable-btn"
                  onClick={startSetup}
                >
                  <Shield size={20} />
                  Enable Two-Factor Authentication
                </CButton>
              )}
            </div>
          )}

          {step === 'download-app' && (
            <div className="twofa-download-step">
              <div className="step-indicator">
                <span className="step active">1</span>
                <span className="step-line"></span>
                <span className="step">2</span>
                <span className="step-line"></span>
                <span className="step">3</span>
                <span className="step-line"></span>
                <span className="step">4</span>
              </div>

              <div className="download-icon">
                <Download size={48} />
              </div>

              <h2>Download Authenticator App</h2>
              <p className="step-description">
                First, download an authenticator app on your mobile device. We recommend any of these apps:
              </p>

              <div className="authenticator-apps">
                <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank" rel="noopener noreferrer" className="app-card">
                  <div className="app-icon google-auth">G</div>
                  <div className="app-info">
                    <h4>Google Authenticator</h4>
                    <p>Free • iOS & Android</p>
                  </div>
                  <ExternalLink size={16} />
                </a>

                <a href="https://authy.com/download/" target="_blank" rel="noopener noreferrer" className="app-card">
                  <div className="app-icon authy">A</div>
                  <div className="app-info">
                    <h4>Authy</h4>
                    <p>Free • iOS, Android & Desktop</p>
                  </div>
                  <ExternalLink size={16} />
                </a>

                <a href="https://www.microsoft.com/en-us/security/mobile-authenticator-app" target="_blank" rel="noopener noreferrer" className="app-card">
                  <div className="app-icon microsoft">M</div>
                  <div className="app-info">
                    <h4>Microsoft Authenticator</h4>
                    <p>Free • iOS & Android</p>
                  </div>
                  <ExternalLink size={16} />
                </a>
              </div>

              <div className="already-have-app">
                <p>Already have an authenticator app?</p>
              </div>

              <div className="step-actions">
                <CButton 
                  className="twofa-secondary-btn"
                  onClick={() => setStep('intro')}
                >
                  Cancel
                </CButton>
                <CButton 
                  className="twofa-primary-btn"
                  onClick={generateSecretKey}
                >
                  I Have an App → Continue
                </CButton>
              </div>
            </div>
          )}

          {step === 'qr' && (
            <div className="twofa-qr-step">
              <div className="step-indicator">
                <span className="step completed">✓</span>
                <span className="step-line completed"></span>
                <span className="step active">2</span>
                <span className="step-line"></span>
                <span className="step">3</span>
                <span className="step-line"></span>
                <span className="step">4</span>
              </div>

              <h2>Scan QR Code</h2>
              <p className="step-description">
                Open your authenticator app and scan this QR code, or enter the setup key manually.
              </p>

              <div className="qr-code-container">
                {/* QR Code placeholder - In production, generate actual QR code using a library */}
                <div className="qr-code-placeholder">
                  <QrCode size={160} />
                  <p className="qr-mock-text">Scan with App</p>
                </div>
              </div>

              <div className="manual-entry">
                <p>Can't scan? Enter this key manually in your app:</p>
                <div className="secret-key-display">
                  <code>{secretKey}</code>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(secretKey)}
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                <p className="key-info">Account: SclinTech • Type: Time-based</p>
              </div>

              {/* Demo Code Display */}
              <div className="demo-totp-section">
                <p className="demo-label">🔧 Demo Mode - Use this code:</p>
                <div className="demo-totp-display">
                  <span className="demo-code">{demoCode}</span>
                  <div className="demo-timer">
                    <div className="timer-circle" style={{ '--progress': `${(timeLeft / 30) * 100}%` }}>
                      {timeLeft}s
                    </div>
                  </div>
                </div>
              </div>

              <div className="step-actions">
                <CButton 
                  className="twofa-secondary-btn"
                  onClick={() => setStep('download-app')}
                >
                  Back
                </CButton>
                <CButton 
                  className="twofa-primary-btn"
                  onClick={() => setStep('verify')}
                >
                  Next: Enter Code
                </CButton>
              </div>
            </div>
          )}

          {step === 'verify' && (
            <div className="twofa-verify-step">
              <div className="step-indicator">
                <span className="step completed">✓</span>
                <span className="step-line completed"></span>
                <span className="step completed">✓</span>
                <span className="step-line completed"></span>
                <span className="step active">3</span>
                <span className="step-line"></span>
                <span className="step">4</span>
              </div>

              <div className="verify-icon">
                <Smartphone size={48} />
              </div>

              <h2>Enter Verification Code</h2>
              <p className="step-description">
                Enter the 6-digit code from your authenticator app to verify the setup.
              </p>

              {/* Demo Code Display */}
              <div className="demo-totp-section compact">
                <p className="demo-label">🔧 Demo - Current code:</p>
                <div className="demo-totp-display">
                  <span className="demo-code">{demoCode}</span>
                  <span className="demo-timer-text">{timeLeft}s</span>
                </div>
              </div>

              <div className="verification-code-input">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(index, e)}
                    onPaste={index === 0 ? handleCodePaste : undefined}
                    className={`code-input ${error ? 'error' : ''}`}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {error && <p className="error-message">{error}</p>}

              <div className="step-actions">
                <CButton 
                  className="twofa-secondary-btn"
                  onClick={() => setStep('qr')}
                >
                  Back
                </CButton>
                <CButton 
                  className="twofa-primary-btn"
                  onClick={verifyCode}
                >
                  Verify & Continue
                </CButton>
              </div>
            </div>
          )}

          {step === 'backup' && (
            <div className="twofa-backup-step">
              <div className="step-indicator">
                <span className="step completed">✓</span>
                <span className="step-line completed"></span>
                <span className="step completed">✓</span>
                <span className="step-line completed"></span>
                <span className="step completed">✓</span>
                <span className="step-line completed"></span>
                <span className="step active">4</span>
              </div>

              <div className="backup-icon">
                <Key size={48} />
              </div>

              <h2>Save Backup Codes</h2>
              <p className="step-description">
                Save these backup codes in a secure place. You can use them to sign in if you lose access to your authenticator app. <strong>Each code can only be used once.</strong>
              </p>

              <div className="backup-codes-container">
                <div className="backup-codes-grid">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="backup-code">
                      <span className="code-number">{index + 1}.</span>
                      <code>{code}</code>
                    </div>
                  ))}
                </div>
                
                <div className="backup-actions">
                  <button 
                    className="backup-action-btn"
                    onClick={() => copyToClipboard(backupCodes.join('\n'))}
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy All'}
                  </button>
                  <button 
                    className="backup-action-btn"
                    onClick={downloadBackupCodes}
                  >
                    <Download size={18} />
                    Download
                  </button>
                </div>
              </div>

              <div className="backup-warning">
                <p>⚠️ These codes won't be shown again. Make sure to save them now.</p>
              </div>

              <div className="step-actions">
                <CButton 
                  className="twofa-primary-btn full-width"
                  onClick={completeSetup}
                >
                  I've Saved My Codes - Complete Setup
                </CButton>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="twofa-success">
              <div className="success-icon">
                <div className="success-circle">
                  <Check size={48} />
                </div>
              </div>

              <h2>2FA Successfully Enabled!</h2>
              <p className="success-description">
                Your account is now protected with two-factor authentication. You'll need to enter a verification code from your authenticator app each time you sign in.
              </p>

              <div className="success-info">
                <div className="info-item">
                  <Shield size={20} />
                  <span>Enhanced security is now active</span>
                </div>
                <div className="info-item">
                  <Smartphone size={20} />
                  <span>Use your authenticator app for codes</span>
                </div>
                <div className="info-item">
                  <Key size={20} />
                  <span>Backup codes saved for recovery</span>
                </div>
              </div>

              <CButton 
                className="twofa-primary-btn"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </CButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TwoFactorSetup
