import React from 'react'
import { ShadcnTable } from 'src/components'

const SiteStaff = () => {
  const data = [
    {
      id: 'STAFF-001',
      type: 'Research Coordinator',
      title: 'Jane Cooper',
      status: 'Active',
      priority: 'High',
    },
    {
      id: 'STAFF-002',
      type: 'Clinical Research Associate',
      title: 'Robert Wilson',
      status: 'Active',
      priority: 'High',
    },
    {
      id: 'STAFF-003',
      type: 'Data Manager',
      title: 'Emily Davis',
      status: 'Active',
      priority: 'Medium',
    },
    {
      id: 'STAFF-004',
      type: 'Laboratory Technician',
      title: 'Michael Torres',
      status: 'Active',
      priority: 'Medium',
    },
    {
      id: 'STAFF-005',
      type: 'Study Nurse',
      title: 'Sarah Martinez',
      status: 'Inactive',
      priority: 'Low',
    },
  ]

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'title', label: 'Name', sortable: true },
    { key: 'type', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
  ]

  return (
    <ShadcnTable
      data={data}
      columns={columns}
      title="Site Staff"
      subtitle="Manage clinical trial site staff members and their roles"
    />
  )
}

export default SiteStaff
