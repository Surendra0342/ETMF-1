import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CBadge, CNavLink, CSidebarNav } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {
  const navLink = (name, icon, badge, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
            )}
        <span className="nav-name">{name}</span>
        {badge && (
          <CBadge color={badge.color} className="shadcn-badge" size="sm">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <CNavLink
            {...(rest.to && { as: NavLink })}
            {...(rest.href && { target: '_blank', rel: 'noopener noreferrer' })}
            {...rest}
            className="shadcn-nav-link"
          >
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    )
  }

  const navGroup = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component
    return (
      <Component 
        compact 
        as="div" 
        key={index} 
        toggler={navLink(name, icon)} 
        className="shadcn-nav-group"
        {...rest}
      >
        {items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true),
        )}
      </Component>
    )
  }

  const navTitle = (item, index) => {
    return (
      <div key={index} className="shadcn-nav-title">
        {item.title}
      </div>
    )
  }

  return (
    <CSidebarNav as={SimpleBar} className="shadcn-sidebar-nav">
      {items &&
        items.map((item, index) => {
          if (item.title) {
            return navTitle(item, index)
          }
          return item.items ? navGroup(item, index) : navItem(item, index)
        })}
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
