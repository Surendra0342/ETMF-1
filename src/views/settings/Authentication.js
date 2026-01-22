import React, { useState, useEffect } from 'react'
import { FiUser, FiMail, FiLock, FiSave, FiShield, FiSun, FiBell } from 'react-icons/fi'
import { useColorModes } from '@coreui/react'
import './Authentication.scss'

const Authentication = () => {
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  // Active tab state
  const [activeTab, setActiveTab] = useState('profile')

  // Profile states
  const [profile, setProfile] = useState({
    fullName: 'Robert Fox',
    email: 'robert@domain.com',
  })

  // Password states
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // 2FA states
  const [twoFactorSMS, setTwoFactorSMS] = useState(false)
  const [twoFactorTOTP, setTwoFactorTOTP] = useState(false)

  // Theme color
  const [selectedColor, setSelectedColor] = useState('blue')

  // Appearance mode (synced with CoreUI's colorMode)
  const [appearance, setAppearance] = useState('light')

  // Notification states
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
  })

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

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'password', label: 'Password', icon: FiLock },
    { id: 'twofactor', label: 'Two-Factor Auth', icon: FiShield },
    { id: 'appearance', label: 'Appearance', icon: FiSun },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
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

    // Load saved notifications if exists
    const savedNotifications = localStorage.getItem('notifications')
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
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

    // Save notifications
    localStorage.setItem('notifications', JSON.stringify(notifications))

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

  // Render Profile Tab Content
  const renderProfileContent = () => (
    <div className="tab-content-inner">
      <div className="content-header">
        <h2 className="content-title">Profile Information</h2>
        <p className="content-subtitle">Update your personal information and profile details.</p>
      </div>

      <div className="form-section">
        <div className="avatar-section">
          <div className="avatar-circle">
            <span className="avatar-text">{profile.fullName.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <div className="avatar-info">
            <p className="avatar-name">{profile.fullName}</p>
            <p className="avatar-email">{profile.email}</p>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Full Name</label>
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

        <div className="form-group">
          <label className="form-label">Email Address</label>
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
      </div>
    </div>
  )

  // Render Password Tab Content
  const renderPasswordContent = () => (
    <div className="tab-content-inner">
      <div className="content-header">
        <h2 className="content-title">Change Password</h2>
        <p className="content-subtitle">Update your password to keep your account secure.</p>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label className="form-label">Current Password</label>
          <div className="input-wrapper">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              className="field-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">New Password</label>
          <div className="input-wrapper">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              className="field-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Confirm New Password</label>
          <div className="input-wrapper">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              className="field-input"
            />
          </div>
        </div>
      </div>
    </div>
  )

  // Render Two-Factor Auth Tab Content
  const renderTwoFactorContent = () => (
    <div className="tab-content-inner">
      <div className="content-header">
        <h2 className="content-title">Two-Factor Authentication</h2>
        <p className="content-subtitle">Add an extra layer of security to your account.</p>
      </div>

      <div className="form-section">
        <div className="twofa-options">
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
              <h4 className="twofa-option-title">Email Address Verification</h4>
              <p className="twofa-option-description">
                Receive a one-time passcode via email each time you log in.
              </p>
            </div>
          </div>

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
                Use an authenticator app to receive a temporary one-time passcode each time you log in.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )

  // Render Appearance Tab Content
  const renderAppearanceContent = () => (
    <div className="tab-content-inner">
      <div className="content-header">
        <h2 className="content-title">Appearance</h2>
        <p className="content-subtitle">Customize the look and feel of the application.</p>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label className="form-label">Theme Color</label>
          <p className="form-description">Choose a preferred accent color for the app.</p>
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

        <div className="form-group">
          <label className="form-label">Mode</label>
          <p className="form-description">Choose light or dark mode, or auto-switch based on system settings.</p>
          <div className="appearance-options">
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
  )

  // Render Notifications Tab Content
  const renderNotificationsContent = () => (
    <div className="tab-content-inner">
      <div className="content-header">
        <h2 className="content-title">Notifications</h2>
        <p className="content-subtitle">Manage your notification preferences.</p>
      </div>

      <div className="form-section">
        <div className="twofa-options">
          <div className="twofa-option">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={() => handleNotificationChange('emailNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
            <div className="twofa-option-content">
              <h4 className="twofa-option-title">Email Notifications</h4>
              <p className="twofa-option-description">
                Receive notifications about account activity via email.
              </p>
            </div>
          </div>

          <div className="twofa-option">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={() => handleNotificationChange('pushNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
            <div className="twofa-option-content">
              <h4 className="twofa-option-title">Push Notifications</h4>
              <p className="twofa-option-description">
                Receive push notifications in your browser.
              </p>
            </div>
          </div>

          <div className="twofa-option">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.weeklyDigest}
                onChange={() => handleNotificationChange('weeklyDigest')}
              />
              <span className="toggle-slider"></span>
            </label>
            <div className="twofa-option-content">
              <h4 className="twofa-option-title">Weekly Digest</h4>
              <p className="twofa-option-description">
                Receive a weekly summary of your account activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileContent()
      case 'password':
        return renderPasswordContent()
      case 'twofactor':
        return renderTwoFactorContent()
      case 'appearance':
        return renderAppearanceContent()
      case 'notifications':
        return renderNotificationsContent()
      default:
        return renderProfileContent()
    }
  }

  return (
    <div className="authentication-settings">
      <div className="settings-header">
        <div>
          <h1 className="settings-main-title">Settings</h1>
          <p className="settings-main-subtitle">Manage your account settings and preferences.</p>
        </div>
      </div>

      {saveSuccess && (
        <div className="alert alert-success">
          Settings saved successfully!
        </div>
      )}

      {/* Horizontal Tabs */}
      <div className="settings-tabs">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              className={`settings-tab ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="tab-icon" />
              <span className="tab-label">{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content Area */}
      <div className="settings-content-area">
        {renderContent()}

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
    </div>
  )
}

export default Authentication
