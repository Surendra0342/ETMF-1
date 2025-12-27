import React from 'react'
import { ShadcnTable } from 'src/components'

const Documents = () => {
  const data = [
    {
      id: 'DOC-001',
      type: 'Protocol',
      title: 'Protocol Amendment v2.1',
      status: 'Approved',
      priority: 'High',
    },
    {
      id: 'DOC-002',
      type: 'Consent Form',
      title: 'Informed Consent Form',
      status: 'Approved',
      priority: 'High',
    },
    {
      id: 'DOC-003',
      type: 'CRF',
      title: 'Case Report Form Template',
      status: 'Under Review',
      priority: 'Medium',
    },
    {
      id: 'DOC-004',
      type: 'Brochure',
      title: 'Investigator Brochure',
      status: 'Approved',
      priority: 'Medium',
    },
    {
      id: 'DOC-005',
      type: 'Safety Report',
      title: 'Adverse Event Summary Report',
      status: 'Draft',
      priority: 'High',
    },
    {
      id: 'DOC-006',
      type: 'Lab Results',
      title: 'Central Lab Analysis Report',
      status: 'Approved',
      priority: 'Medium',
    },
  ]

  const columns = [
    { key: 'id', label: 'Document ID', sortable: true },
    { key: 'title', label: 'Document Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
  ]

  return (
    <ShadcnTable
      data={data}
      columns={columns}
      title="Document Management"
      subtitle="Manage clinical trial documents and regulatory files"
    />
  )
}

export default Documents
