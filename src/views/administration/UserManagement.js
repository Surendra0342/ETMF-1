import React from 'react'
import { ShadcnTable } from 'src/components'

const UserManagement = () => {
  const data = [
    {
      id: 'USR-001',
      type: 'System Admin',
      title: 'Admin User',
      status: 'Active',
      priority: 'High',
    },
    {
      id: 'USR-002',
      type: 'Principal Investigator',
      title: 'Dr. John Smith',
      status: 'Active',
      priority: 'High',
    },
    {
      id: 'USR-003',
      type: 'Research Coordinator',
      title: 'Jane Cooper',
      status: 'Active',
      priority: 'Medium',
    },
    {
      id: 'USR-004',
      type: 'Data Manager',
      title: 'Emily Davis',
      status: 'Inactive',
      priority: 'Low',
    },
    {
      id: 'USR-005',
      type: 'Study Nurse',
      title: 'Sarah Martinez',
      status: 'Active',
      priority: 'Medium',
    },
    {
      id: 'USR-006',
      type: 'Clinical Monitor',
      title: 'Robert Chen',
      status: 'Active',
      priority: 'High',
    },
  ]

  const columns = [
    { key: 'id', label: 'User ID', sortable: true },
    { key: 'title', label: 'Name', sortable: true },
    { key: 'type', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
  ]

  return (
    <ShadcnTable
      data={data}
      columns={columns}
      title="User Management"
      subtitle="Manage system users and their access permissions"
    />
  )
}

export default UserManagement
