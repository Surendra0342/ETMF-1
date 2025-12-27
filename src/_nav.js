import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBriefcase,
  cilPeople,
  cilCog,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Sponsors & Studies',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Sponsors',
        to: '/sponsors',
      },
      {
        component: CNavItem,
        name: 'Studies',
        to: '/studies',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Administration',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Team Members',
        to: '/team/members',
      },
      {
        component: CNavItem,
        name: 'Roles & Permissions',
        to: '/team/roles',
      },
      {
        component: CNavItem,
        name: 'Demo Requests',
        to: '/team/demo-requests',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Settings',
    icon: <CIcon icon={cilCog} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Email Templates',
        to: '/settings/email-templates',
      },
      {
        component: CNavItem,
        name: 'Job Title',
        to: '/jobtitle',
      },
      {
        component: CNavItem,
        name: 'Activity Log',
        to: '/settings/activity-log',
      },
    ],
  },
]

export default _nav
