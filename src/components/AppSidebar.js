import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  CCloseButton,
  CSidebar,
  CSidebarFooter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilSettings, cilAccountLogout, cilPlus } from '@coreui/icons'

import { AppSidebarNav } from './AppSidebarNav'

// sidebar nav config
import navigation from '../_nav'
import { ArrowLeftRight } from 'lucide-react'

// Swap vertical icon component for brand dropdown
const SwapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3v18M3 7l4-4 4 4M17 21V3M21 17l-4 4-4-4" />
  </svg>
)

// Chevron up icon component for user menu
const ChevronUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
)

const AppSidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // State for user profile
  const [userProfile, setUserProfile] = useState({
    fullName: 'Robert Fox',
    email: 'robert@domain.com',
  })

  // Load user profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setUserProfile(profile)
    }
  }, [])

  const handleLogout = () => {
    // Clear all authentication data
    sessionStorage.removeItem('isAuthenticated')
    sessionStorage.removeItem('2fa_verified')
    // Redirect to login
    navigate('/login')
  }

  return (
    <CSidebar
      className="shadcn-sidebar"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      {/* Header with Brand */}
      <div className="shadcn-sidebar-header">
        <CDropdown variant="btn-group" direction="dropup" className="w-100">
          <CDropdownToggle className="shadcn-brand-dropdown" caret={false}>
            <div className="shadcn-brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor"/>
                <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor"/>
                <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor"/>
                <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor"/>
              </svg>
            </div>
            <div className="shadcn-brand-info">
              <span className="shadcn-brand-title">Clinical Trials</span>
              <span className="shadcn-brand-subtitle">Admin Dashboard</span>
            </div>
            <span className="shadcn-brand-chevron"><ArrowLeftRight /></span>
          </CDropdownToggle>
          <CDropdownMenu className="w-100 shadcn-team-menu">
            <CDropdownItem className="shadcn-team-item active">
              <div className="shadcn-team-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor"/>
                  <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor"/>
                  <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor"/>
                  <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor"/>
                </svg>
              </div>
              <span className="shadcn-team-name">Clinical Trials</span>
              <span className="shadcn-team-shortcut">1</span>
            </CDropdownItem>
            <CDropdownItem className="shadcn-team-item">
              <div className="shadcn-team-icon shadcn-team-icon-alt">A</div>
              <span className="shadcn-team-name">Clinical Trials</span>
              <span className="shadcn-team-shortcut">2</span>
            </CDropdownItem>
            <CDropdownItem className="shadcn-team-item">
              <div className="shadcn-team-icon shadcn-team-icon-alt">AC</div>
              <span className="shadcn-team-name">Clinical Trials</span>
              <span className="shadcn-team-shortcut">3</span>
            </CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem className="shadcn-add-team">
              <CIcon icon={cilPlus} className="me-2" size="sm" />
              Add team
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CCloseButton
          className="d-lg-none shadcn-close-btn"
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </div>

      {/* Navigation */}
      <AppSidebarNav items={navigation} />

      {/* Footer with User */}
      <CSidebarFooter className="shadcn-sidebar-footer">
        <CDropdown variant="btn-group" direction="dropup" className="w-100">
          <CDropdownToggle className="shadcn-user-menu" caret={false}>
            <div className="shadcn-user-avatar">
              <span>{userProfile.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
            </div>
            {!unfoldable && (
              <div className="shadcn-user-info">
                <div className="shadcn-user-name">{userProfile.fullName}</div>
                <div className="shadcn-user-email">{userProfile.email}</div>
              </div>
            )}
            {!unfoldable && <span className="shadcn-user-chevron"><ChevronUpIcon /></span>}
          </CDropdownToggle>
          <CDropdownMenu className="w-100">
            <CDropdownItem href="#/profile">
              <CIcon icon={cilUser} className="me-2" /> Profile
            </CDropdownItem>
            <CDropdownItem href="#/settings/authentication">
              <CIcon icon={cilSettings} className="me-2" /> Settings
            </CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem onClick={handleLogout}>
              <CIcon icon={cilAccountLogout} className="me-2" /> Logout
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
