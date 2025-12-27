import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilSettings, cilAccountLogout, cilChevronBottom } from '@coreui/icons'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'

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
      <CSidebarHeader className="shadcn-sidebar-header">
        <CSidebarBrand to="/" className="shadcn-sidebar-brand">
          <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Clinical Trials</span>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none shadcn-close-btn"
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="shadcn-sidebar-footer">
        <CDropdown variant="btn-group" direction="dropup" className="w-100">
          <CDropdownToggle className="shadcn-user-menu" caret={false}>
            <div className="d-flex align-items-center gap-3 w-100">
              <div className="shadcn-user-avatar">
                <CIcon icon={cilUser} size="lg" />
              </div>
              {!unfoldable && (
                <div className="flex-grow-1 text-start">
                  <div className="shadcn-user-name">Admin User</div>
                  <div className="shadcn-user-email">admin@clinicaltrials.com</div>
                </div>
              )}
              {!unfoldable && <CIcon icon={cilChevronBottom} />}
            </div>
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
