import React from 'react'
import { ShadcnTable } from 'src/components'

const Protocols = () => {
  const data = [
    {
      id: 'PROT-001',
      type: 'Version 2.1',
      title: 'Oncology Trial Protocol - Phase III',
      status: 'Approved',
      priority: 'High',
    },
    {
      id: 'PROT-002',
      type: 'Version 1.0',
      title: 'Cardiovascular Study Protocol',
      status: 'Under Review',
      priority: 'Medium',
    },
    {
      id: 'PROT-003',
      type: 'Version 3.0',
      title: 'Diabetes Management Protocol',
      status: 'Approved',
      priority: 'High',
    },
    {
      id: 'PROT-004',
      type: 'Version 1.5',
      title: 'Neurology Clinical Trial Protocol',
      status: 'Draft',
      priority: 'Low',
    },
    {
      id: 'PROT-005',
      type: 'Version 2.0',
      title: 'Pediatric Vaccine Trial Protocol',
      status: 'Approved',
      priority: 'High',
    },
  ]

  const columns = [
    { key: 'id', label: 'Protocol ID', sortable: true },
    { key: 'title', label: 'Protocol Name', sortable: true },
    { key: 'type', label: 'Version', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
  ]

  return (
    <ShadcnTable
      data={data}
      columns={columns}
      title="Trial Protocols"
      subtitle="Manage clinical trial protocols and version control"
    />
  )
}

export default Protocols
