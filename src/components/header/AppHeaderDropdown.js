import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilAccountLogout,
  cilShieldAlt,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)

  useEffect(() => {
    // Check 2FA status on mount and when localStorage changes
    const check2FAStatus = () => {
      const status = localStorage.getItem('2fa_enabled') === 'true'
      setIs2FAEnabled(status)
    }
    
    check2FAStatus()
    
    // Listen for storage changes (in case 2FA is enabled/disabled in another tab)
    window.addEventListener('storage', check2FAStatus)
    
    // Also check on window focus (when user returns to the tab)
    window.addEventListener('focus', check2FAStatus)
    
    // Check periodically in case localStorage was updated in the same tab
    const interval = setInterval(check2FAStatus, 1000)
    
    return () => {
      window.removeEventListener('storage', check2FAStatus)
      window.removeEventListener('focus', check2FAStatus)
      clearInterval(interval)
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    // Clear all authentication data
    sessionStorage.removeItem('isAuthenticated')
    sessionStorage.removeItem('2fa_verified')
    // Redirect to login
    navigate('/login')
  }

  const handle2FASetup = (e) => {
    e.preventDefault()
    navigate('/2fa/setup')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <div className="position-relative d-inline-block">
          <CAvatar src={avatar8} size="md" />
          {is2FAEnabled && (
            <span 
              className="position-absolute translate-middle rounded-circle bg-success border border-white"
              style={{ 
                width: '12px', 
                height: '12px', 
                bottom: '0',
                right: '-2px',
                top: 'auto',
                left: 'auto'
              }}
              title="2FA Enabled"
            >
              <span className="visually-hidden">2FA Enabled</span>
            </span>
          )}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#" onClick={handle2FASetup} className="d-flex align-items-center">
          <CIcon icon={cilShieldAlt} className="me-2" />
          Two-Factor Auth
          {is2FAEnabled ? (
            <CBadge color="success" className="ms-auto">Enabled</CBadge>
          ) : (
            <CBadge color="warning" className="ms-auto">Disabled</CBadge>
          )}
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
