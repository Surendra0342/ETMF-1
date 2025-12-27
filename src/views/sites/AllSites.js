import { ShadcnTable } from 'src/components'

const AllSites = () => {
  const data = [
    {
      id: 'SITE-001',
      type: 'Hospital',
      title: 'General Hospital - New York, NY - 3 trials, 85 patients',
      status: 'Active',
      priority: 'High',
    },
    {
      id: 'SITE-002',
      type: 'Research Center',
      title: 'Research Medical Center - Los Angeles, CA - 2 trials, 42 patients',
      status: 'Active',
      priority: 'High',
    },
    {
      id: 'SITE-003',
      type: 'Hospital',
      title: 'University Hospital - Chicago, IL - 1 trial, 28 patients',
      status: 'In Progress',
      priority: 'Medium',
    },
    {
      id: 'SITE-004',
      type: 'Clinic',
      title: 'Metro Clinic - Boston, MA - 2 trials, 55 patients',
      status: 'Active',
      priority: 'High',
    },
    {
      id: 'SITE-005',
      type: 'Hospital',
      title: 'Regional Medical Center - Houston, TX - 0 trials, 0 patients',
      status: 'Backlog',
      priority: 'Low',
    },
  ]

  const columns = [
    { key: 'id', label: 'Site ID', sortable: true },
    { key: 'title', label: 'Site Details', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
  ]

  return (
    <ShadcnTable
      data={data}
      columns={columns}
      title="All Research Sites"
      subtitle="Manage clinical trial research sites and facilities"
      showImportButton={false}
      showExportButton={false}
      enableFilters={true}
      filterConfig={{
        status: { enabled: true, options: ['Active', 'In Progress', 'Backlog'] },
        priority: { enabled: true, options: ['Low', 'Medium', 'High'] }
      }}
      searchPlaceholder="Search sites..."
      actionMenuItems={[
        { label: 'View Site Details', onClick: (row) => console.log('View site', row) },
        { label: 'Edit Site', onClick: (row) => console.log('Edit site', row) },
        { label: 'View Trials', onClick: (row) => console.log('View trials', row) },
        { type: 'divider' },
        { label: 'Deactivate Site', onClick: (row) => console.log('Deactivate site', row), danger: true }
      ]}
    />
  )
}

export default AllSites
