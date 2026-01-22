import React, { useState, useEffect } from 'react'
import { FiUser, FiMail, FiLock, FiSave } from 'react-icons/fi'
import { useColorModes } from '@coreui/react'
import './Authentication.scss'

const Authentication = () => {
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  // Profile states
  const [profile, setProfile] = useState({
    fullName: 'Robert Fox',
    email: 'robert@domain.com',
    password: '',
  })

  // 2FA states
  const [twoFactorSMS, setTwoFactorSMS] = useState(false)
  const [twoFactorTOTP, setTwoFactorTOTP] = useState(false)

  // Theme color
  const [selectedColor, setSelectedColor] = useState('blue')

  // Appearance mode (synced with CoreUI's colorMode)
  const [appearance, setAppearance] = useState('light')

  const [saveSuccess, setSaveSuccess] = useState(false)

  const themeColors = [
    { name: 'gray', value: '#6b7280' },
    { name: 'blue', value: '#6366f1' },
    { name: 'sky', value: '#3b82f6' },
    { name: 'pink', value: '#ec4899' },
    { name: 'purple', value: '#a855f7' },
    { name: 'indigo', value: '#6366f1' },
    { name: 'orange', value: '#f97316' },
    { name: 'teal', value: '#14b8a6' },
    { name: 'brown', value: '#92837d' },
    { name: 'green', value: '#10b981' },
  ]

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSMS = localStorage.getItem('2fa_sms_enabled') === 'true'
    const savedTOTP = localStorage.getItem('2fa_totp_enabled') === 'true'
    const savedColor = localStorage.getItem('theme_color') || 'blue'

    setTwoFactorSMS(savedSMS)
    setTwoFactorTOTP(savedTOTP)
    setSelectedColor(savedColor)

    // Load saved profile if exists
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  // Auto-save 2FA settings whenever they change
  useEffect(() => {
    localStorage.setItem('2fa_sms_enabled', twoFactorSMS.toString())
    localStorage.setItem('2fa_totp_enabled', twoFactorTOTP.toString())
  }, [twoFactorSMS, twoFactorTOTP])

  // Sync appearance with colorMode
  useEffect(() => {
    if (colorMode === 'dark') {
      setAppearance('dark')
    } else if (colorMode === 'light') {
      setAppearance('light')
    } else {
      setAppearance('auto')
    }
  }, [colorMode])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    // Save profile
    localStorage.setItem('userProfile', JSON.stringify(profile))

    // Save 2FA settings
    localStorage.setItem('2fa_sms_enabled', twoFactorSMS.toString())
    localStorage.setItem('2fa_totp_enabled', twoFactorTOTP.toString())

    // Save theme color
    localStorage.setItem('theme_color', selectedColor)

    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleAppearanceChange = (mode) => {
    setAppearance(mode)
    setColorMode(mode)
  }

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName)
  }

  return (
    <div className="authentication-settings">
      <div className="settings-header">
        <div>
          <h1 className="settings-main-title">Profile</h1>
          <p className="settings-main-subtitle">Your personal information and account security settings.</p>
        </div>
      </div>

      {saveSuccess && (
        <div className="alert alert-success">
          Settings saved successfully!
        </div>
      )}

      <div className="settings-grid">
        {/* Left Column - Labels */}
        <div className="settings-labels">
          {/* Avatar Section */}
          <div className="settings-label-section">
            <h3 className="section-label-title">Avatar</h3>
          </div>

          {/* Full Name Section */}
          <div className="settings-label-section">
            <h3 className="section-label-title">Full Name</h3>
          </div>

          {/* Email Section */}
          <div className="settings-label-section">
            <h3 className="section-label-title">Email Address</h3>
          </div>

          {/* Password Section */}
          {/* <div className="settings-label-section">
            <h3 className="section-label-title">Password</h3>
          </div> */}

          {/* 2FA Section */}
          <div className="settings-label-section">
            <h3 className="section-label-title">Two-factor authentication (2FA)</h3>
            <p className="section-label-description">
              Keep your account secure by enabling 2FA via Email Address using a temporary one-time passcode.
            </p>
          </div>

          {/* Theme Color Section */}
          <div className="settings-label-section">
            <h3 className="section-label-title">Theme color</h3>
            <p className="section-label-description">
              Choose a preferred theme for the app.
            </p>
          </div>

          {/* Appearance Section */}
          <div className="settings-label-section">
            <h3 className="section-label-title">Appearance</h3>
            <p className="section-label-description">
              Choose light or dark mode, or switch it mode automatically based on your system settings.
            </p>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="settings-content">
          {/* Avatar */}
          <div className="settings-content-section">
            <div className="avatar-section">
              <div className="avatar-circle">
                <span className="avatar-text">Inside</span>
              </div>
              <div className="avatar-info">
                <p className="avatar-name">{profile.fullName}</p>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="settings-content-section">
            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                placeholder="Enter your full name"
                className="field-input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="settings-content-section">
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="Enter your email"
                className="field-input"
              />
            </div>
          </div>

          {/* Password */}
          {/* <div className="settings-content-section">
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleProfileChange}
                placeholder="Enter New Password"
                className="field-input"
              />
            </div>
          </div> */}

          {/* 2FA Options */}
          <div className="settings-content-section">
            <div className="twofa-options">
              {/* SMS Option */}
              <div className="twofa-option">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={twoFactorSMS}
                    onChange={(e) => setTwoFactorSMS(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <div className="twofa-option-content">
                  <h4 className="twofa-option-title">Text Message (Email Address)</h4>
                  <p className="twofa-option-description">
                    Receive a one-time passcode via Email Addresseach time you log in.{' '}
                    {/* <span className="twofa-badge">Business</span>  */}
                  </p>
                </div>
              </div>

              {/* TOTP Option */}
              {/* <div className="twofa-option">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={twoFactorTOTP}
                    onChange={(e) => setTwoFactorTOTP(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <div className="twofa-option-content">
                  <h4 className="twofa-option-title">Authenticator App (TOTP)</h4>
                  <p className="twofa-option-description">
                    Use an app to receive a temporary one-time passcode each time you log in.
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Theme Colors */}
          <div className="settings-content-section">
            <div className="theme-colors">
              {themeColors.map((color) => (
                <button
                  key={color.name}
                  className={`color-option ${selectedColor === color.name ? 'active' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorChange(color.name)}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className="settings-content-section">
            <div className="appearance-options">
              {/* Light */}
              <button
                className={`appearance-card ${appearance === 'light' ? 'active' : ''}`}
                onClick={() => handleAppearanceChange('light')}
              >
                <div className="appearance-preview light-preview">
                  <div className="preview-window">
                    <div className="preview-sidebar"></div>
                    <div className="preview-content">
                      <div className="preview-header"></div>
                      <div className="preview-body"></div>
                    </div>
                  </div>
                </div>
                <span className="appearance-label">Light</span>
              </button>

              {/* Dark */}
              <button
                className={`appearance-card ${appearance === 'dark' ? 'active' : ''}`}
                onClick={() => handleAppearanceChange('dark')}
              >
                <div className="appearance-preview dark-preview">
                  <div className="preview-window">
                    <div className="preview-sidebar"></div>
                    <div className="preview-content">
                      <div className="preview-header"></div>
                      <div className="preview-body"></div>
                    </div>
                  </div>
                </div>
                <span className="appearance-label">Dark</span>
              </button>

              {/* Auto */}
              <button
                className={`appearance-card ${appearance === 'auto' ? 'active' : ''}`}
                onClick={() => handleAppearanceChange('auto')}
              >
                <div className="appearance-preview auto-preview">
                  <div className="preview-window split">
                    <div className="preview-half light">
                      <div className="preview-sidebar"></div>
                      <div className="preview-content">
                        <div className="preview-header"></div>
                        <div className="preview-body"></div>
                      </div>
                    </div>
                    <div className="preview-half dark">
                      <div className="preview-sidebar"></div>
                      <div className="preview-content">
                        <div className="preview-header"></div>
                        <div className="preview-body"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="appearance-label">Auto</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="settings-footer">
        <button
          type="button"
          onClick={handleSave}
          className="btn btn-primary"
        >
          <FiSave className="btn-icon" />
          Save changes
        </button>
      </div>
    </div>
  )
}

export default Authentication
