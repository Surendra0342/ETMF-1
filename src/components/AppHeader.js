import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilContrast,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'

// Search icon component
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
)

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <CHeader position="sticky" className="shadcn-header" ref={headerRef}>
      <CContainer className="shadcn-header-container" fluid>
        {/* Left side - Toggle and Search */}
        <div className="d-flex align-items-center gap-2">
          <CHeaderToggler
            className="shadcn-icon-btn"
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            title="Toggle Sidebar"
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          
          {/* Search Button */}
          <button className="shadcn-search-btn d-none d-md-flex">
            <SearchIcon />
            <span>Search</span>
            <kbd>⌘K</kbd>
          </button>
        </div>

        {/* Right side - Theme toggle and User */}
        <CHeaderNav className="d-flex align-items-center gap-1">
          {/* Theme Toggle */}
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle className="shadcn-icon-btn" caret={false} title="Toggle theme">
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu className="shadcn-dropdown-menu">
              <CDropdownItem
                active={colorMode === 'light'}
                className="shadcn-dropdown-item"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="shadcn-dropdown-item"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="shadcn-dropdown-item"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          {/* User Profile Dropdown */}
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
