import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBriefcase,
  cilPeople,
  cilCog,
  cilNotes,
  cilMedicalCross,
  cilInfo,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  // General Section
  {
    title: 'General',
  },
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

  // Pages Section
  {
    title: 'Pages',
  },
  {
    component: CNavGroup,
    name: 'Form Builder',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Visual Builder',
        to: '/forms/visual-builder',
      },
      // {
      //   component: CNavItem,
      //   name: 'JSON Builder',
      //   to: '/forms/builder',
      // },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Clinical Data',
  //   icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Patients',
  //       to: '/patients',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Sites',
  //       to: '/sites',
  //     },
  //   ],
  // },

  // Other Section  
  {
    title: 'Other',
  },
  {
    component: CNavGroup,
    name: 'Settings',
    icon: <CIcon icon={cilCog} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Authentication',
        to: '/settings/authentication',
      },
      // {
      //   component: CNavItem,
      //   name: 'Email Templates',
      //   to: '/settings/email-templates',
      // },
      {
        component: CNavItem,
        name: 'Job Title',
        to: '/jobtitle',
      },
      // {
      //   component: CNavItem,
      //   name: 'Activity Log',
      //   to: '/settings/activity-log',
      // },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Help Center',
  //   to: '/help',
  //   icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  // },
]

export default _nav
