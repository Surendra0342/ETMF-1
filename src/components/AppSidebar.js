import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

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
import { cilUser, cilSettings, cilAccountLogout } from '@coreui/icons'
import { CgArrowsExpandUpRight } from 'react-icons/cg'

import { AppSidebarNav } from './AppSidebarNav'

// sidebar nav config
import navigation from '../_nav'

// Swap vertical icon component
const SwapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3v18M3 7l4-4 4 4M17 21V3M21 17l-4 4-4-4" />
  </svg>
)

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

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
        <div className="shadcn-brand-dropdown">
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
          <span className="shadcn-brand-chevron"><SwapIcon /></span>
        </div>
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
              <span>SN</span>
            </div>
            {!unfoldable && (
              <div className="shadcn-user-info">
                <div className="shadcn-user-name">satnaing</div>
                <div className="shadcn-user-email">satnaingdev@gmail.com</div>
              </div>
            )}
            {!unfoldable && <span className="shadcn-user-chevron"><SwapIcon /></span>}
          </CDropdownToggle>
          <CDropdownMenu className="w-100">
            <CDropdownItem href="#/profile">
              <CIcon icon={cilUser} className="me-2" /> Profile
            </CDropdownItem>
            <CDropdownItem href="#/settings">
              <CIcon icon={cilSettings} className="me-2" /> Settings
            </CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem href="#/login">
              <CIcon icon={cilAccountLogout} className="me-2" /> Logout
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
