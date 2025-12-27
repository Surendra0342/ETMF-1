import React from 'react'
import { ShadcnTable } from 'src/components'

const ConsentForms = () => {
  const data = [
    {
      id: 'CF-001',
      type: 'Informed Consent',
      title: 'Patient PT-001 - Oncology Trial',
      status: 'Signed',
      priority: 'High',
    },
    {
      id: 'CF-002',
      type: 'Informed Consent',
      title: 'Patient PT-002 - Oncology Trial',
      status: 'Signed',
      priority: 'High',
    },
    {
      id: 'CF-003',
      type: 'Informed Consent',
      title: 'Patient PT-003 - Cardiovascular Study',
      status: 'Pending',
      priority: 'High',
    },
    {
      id: 'CF-004',
      type: 'HIPAA Authorization',
      title: 'Patient PT-004 - Diabetes Trial',
      status: 'Signed',
      priority: 'Medium',
    },
    {
      id: 'CF-005',
      type: 'Informed Consent',
      title: 'Patient PT-005 - Neurology Study',
      status: 'Expired',
      priority: 'High',
    },
  ]

  const columns = [
    { key: 'id', label: 'Form ID', sortable: true },
    { key: 'title', label: 'Patient & Trial', sortable: true },
    { key: 'type', label: 'Form Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
  ]

  return (
    <ShadcnTable
      data={data}
      columns={columns}
      title="Consent Forms"
      subtitle="Track patient consent forms and authorization documents"
    />
  )
}

export default ConsentForms
