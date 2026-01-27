import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
  cilAccountLogout,
} from '@coreui/icons'

// Search icon component
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
)

// Maximize icon component
const MaximizeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
    <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
    <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
    <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
  </svg>
)

// Minimize icon component
const MinimizeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14h6v6"/>
    <path d="M20 10h-6V4"/>
    <path d="M14 10l7-7"/>
    <path d="M3 21l7-7"/>
  </svg>
)

const AppHeader = () => {
  const headerRef = useRef()
  const navigate = useNavigate()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      }).catch((err) => {
        console.error('Error attempting to exit fullscreen:', err)
      })
    }
  }

  const handleLogout = () => {
    // Clear all authentication data
    sessionStorage.removeItem('isAuthenticated')
    sessionStorage.removeItem('2fa_verified')
    // Redirect to login
    navigate('/login')
  }

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('scroll', handleScroll)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('scroll', handleScroll)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
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
          {/* Fullscreen Toggle */}
          <button
            className="shadcn-icon-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Max View"}
          >
            {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </button>

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

          {/* Logout Button */}
          {/* <button
            className="shadcn-icon-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <CIcon icon={cilAccountLogout} size="lg" />
          </button> */}
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
