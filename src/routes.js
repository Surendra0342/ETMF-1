import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Trial Management
const AllTrials = React.lazy(() => import('./views/trials/AllTrials'))
const CreateTrial = React.lazy(() => import('./views/trials/CreateTrial'))
const Protocols = React.lazy(() => import('./views/trials/Protocols'))

// Patient Management
const AllPatients = React.lazy(() => import('./views/patients/AllPatients'))
const Enrollment = React.lazy(() => import('./views/patients/Enrollment'))
const ConsentForms = React.lazy(() => import('./views/patients/ConsentForms'))

// Site Management
const AllSites = React.lazy(() => import('./views/sites/AllSites'))
const Investigators = React.lazy(() => import('./views/sites/Investigators'))
const SiteStaff = React.lazy(() => import('./views/sites/SiteStaff'))

// Document Management
const Documents = React.lazy(() => import('./views/documents/Documents'))

// Sponsors
const Sponsors = React.lazy(() => import('./views/sponsors/Sponsors'))

// Studies
const Studies = React.lazy(() => import('./views/studies/Studies'))

// Team Management
const TeamMembers = React.lazy(() => import('./views/team/TeamMembers'))

// Administration
const UserManagement = React.lazy(() => import('./views/administration/UserManagement'))
const RolesManagement = React.lazy(() => import('./views/administration/RolesManagement'))

// Job Title
const JobTitle = React.lazy(() => import('./views/jobtitle/JobTitle'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  // Trial Management Routes
  { path: '/trials', name: 'Trials', element: AllTrials, exact: true },
  { path: '/trials/all', name: 'All Trials', element: AllTrials },
  { path: '/trials/create', name: 'Create New Trial', element: CreateTrial },
  { path: '/trials/protocols', name: 'Protocols', element: Protocols },

  // Patient Management Routes
  { path: '/patients', name: 'Patients', element: AllPatients, exact: true },
  { path: '/patients/all', name: 'All Patients', element: AllPatients },
  { path: '/patients/enrollment', name: 'Enrollment', element: Enrollment },
  { path: '/patients/consent', name: 'Consent Forms', element: ConsentForms },

  // Site Management Routes
  { path: '/sites', name: 'Sites', element: AllSites, exact: true },
  { path: '/sites/all', name: 'All Sites', element: AllSites },
  { path: '/sites/investigators', name: 'Investigators', element: Investigators },
  { path: '/sites/staff', name: 'Site Staff', element: SiteStaff },

  // Document Management Routes
  { path: '/documents', name: 'Documents', element: Documents },

  // Sponsors Routes
  { path: '/sponsors', name: 'Sponsors', element: Sponsors },

  // Studies Routes
  { path: '/studies', name: 'Studies', element: Studies },

  // Team Management Routes
  { path: '/team/members', name: 'Team Members', element: TeamMembers },
  { path: '/team/roles', name: 'Roles Management', element: RolesManagement },

  // Administration Routes
  { path: '/users', name: 'User Management', element: UserManagement },
  { path: '/roles', name: 'Roles Management', element: RolesManagement },

  // Job Title Routes
  { path: '/jobtitle', name: 'Job Title', element: JobTitle },
]

export default routes
