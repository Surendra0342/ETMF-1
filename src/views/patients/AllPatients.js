import { ShadcnTable } from 'src/components'

const AllPatients = () => {
  const data = [
    {
      id: 'PT-001',
      type: 'Adult',
      title: 'Trial CT-001 - Male, Age 45',
      status: 'Active',
      priority: 'High',
      trialId: 'CT-001',
      age: 45,
      gender: 'Male',
      enrollmentDate: '2024-01-10',
    },
    {
      id: 'PT-002',
      type: 'Adult',
      title: 'Trial CT-001 - Female, Age 52',
      status: 'Active',
      priority: 'High',
      trialId: 'CT-001',
      age: 52,
      gender: 'Female',
      enrollmentDate: '2024-01-15',
    },
    {
      id: 'PT-003',
      type: 'Adult',
      title: 'Trial CT-002 - Male, Age 38',
      status: 'In Progress',
      priority: 'Medium',
      trialId: 'CT-002',
      age: 38,
      gender: 'Male',
      enrollmentDate: '2024-02-01',
    },
    {
      id: 'PT-004',
      type: 'Pediatric',
      title: 'Trial CT-003 - Female, Age 12',
      status: 'Done',
      priority: 'Low',
      trialId: 'CT-003',
      age: 12,
      gender: 'Female',
      enrollmentDate: '2024-01-20',
    },
    {
      id: 'PT-005',
      type: 'Adult',
      title: 'Trial CT-001 - Male, Age 67',
      status: 'Canceled',
      priority: 'Low',
      trialId: 'CT-001',
      age: 67,
      gender: 'Male',
      enrollmentDate: '2024-02-05',
    },
    {
      id: 'PT-006',
      type: 'Adult',
      title: 'Trial CT-004 - Female, Age 29',
      status: 'In Progress',
      priority: 'High',
      trialId: 'CT-004',
      age: 29,
      gender: 'Female',
      enrollmentDate: '2024-02-10',
    },
  ]

  const columns = [
    { key: 'id', label: 'Patient ID', sortable: true },
    { key: 'title', label: 'Details', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
  ]

  return (
    <ShadcnTable
      data={data}
      columns={columns}
      title="All Patients"
      subtitle="Manage and monitor enrolled patients across clinical trials"
      showImportButton={false}
      showExportButton={false}
      enableFilters={true}
      filterConfig={{
        status: { enabled: true, options: ['Active', 'In Progress', 'Done', 'Canceled'] },
        priority: { enabled: true, options: ['Low', 'Medium', 'High'] }
      }}
      searchPlaceholder="Search patients..."
      actionMenuItems={[
        { label: 'View Details', onClick: (row) => console.log('View patient', row) },
        { label: 'Edit Patient', onClick: (row) => console.log('Edit patient', row) },
        { label: 'Download Records', onClick: (row) => console.log('Download records', row) },
        { type: 'divider' },
        { label: 'Remove from Trial', onClick: (row) => console.log('Remove patient', row), danger: true }
      ]}
    />
  )
}

export default AllPatients
