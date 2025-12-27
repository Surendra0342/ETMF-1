import React from 'react'
import { ShadcnTable } from 'src/components'

const Investigators = () => {
  const data = [
    {
      id: 'INV-001',
      type: 'Oncology',
      title: 'Dr. John Smith',
      status: 'Active',
      priority: 'High',
    },
    {
      id: 'INV-002',
      type: 'Cardiology',
      title: 'Dr. Sarah Johnson',
      status: 'Active',
      priority: 'Medium',
    },
    {
      id: 'INV-003',
      type: 'Endocrinology',
      title: 'Dr. Michael Brown',
      status: 'Active',
      priority: 'High',
    },
    {
      id: 'INV-004',
      type: 'Neurology',
      title: 'Dr. Lisa Anderson',
      status: 'Active',
      priority: 'Medium',
    },
    {
      id: 'INV-005',
      type: 'Pediatrics',
      title: 'Dr. Robert Chen',
      status: 'Inactive',
      priority: 'Low',
    },
  ]

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'title', label: 'Name', sortable: true },
    { key: 'type', label: 'Specialty', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
  ]

  return (
    <ShadcnTable
      data={data}
      columns={columns}
      title="Principal Investigators"
      subtitle="Manage clinical trial investigators and their specialties"
    />
  )
}

export default Investigators
