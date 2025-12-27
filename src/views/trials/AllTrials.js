import React from 'react'
import { CBadge } from '@coreui/react'
import { ShadcnTable } from 'src/components'
import './AllTrials.scss'

const AllTrials = () => {

  const data = [
    {
      id: 'TASK-9366',
      type: 'Documentation',
      title: 'Auctus bardus minus pariatur vobis solitudo tamquam solitudo.',
      status: 'Canceled',
      priority: 'Low',
    },
    {
      id: 'TASK-5736',
      type: 'Bug',
      title: 'Admoneo vehemens suscipit toties desidero tollo allatus blanditiis caute delibero degenero.',
      status: 'Canceled',
      priority: 'Medium',
    },
    {
      id: 'TASK-7918',
      type: 'Documentation',
      title: 'Ulterius vir amita verbum condico trepide velociter adicio autus claustrum quis aiunt aranea.',
      status: 'Done',
      priority: 'High',
    },
    {
      id: 'TASK-6498',
      type: 'Bug',
      title: 'Armarium atrocitas ustilo clam numquam defetiscor cunctatio vaco suadeo.',
      status: 'In Progress',
      priority: 'Low',
    },
    {
      id: 'TASK-9957',
      type: 'Documentation',
      title: 'Aspicio tempora aegrus sufficio delicate abstergo.',
      status: 'Canceled',
      priority: 'Low',
    },
    {
      id: 'TASK-4715',
      type: 'Bug',
      title: 'Solutio cohaero baiulus brevis animadverto adfero adeo callide calco quibusdam vapulus tergum.',
      status: 'Canceled',
      priority: 'Medium',
    },
    {
      id: 'TASK-7138',
      type: 'Feature',
      title: 'Usitas tardus aliquid comprehendo cupiditas a patria statim copiose crux.',
      status: 'Done',
      priority: 'Low',
    },
    {
      id: 'TASK-3344',
      type: 'Feature',
      title: 'Ventosus cetera turba auxilium comptus vindico dicta culpo.',
      status: 'Todo',
      priority: 'Medium',
    },
    {
      id: 'TASK-8090',
      type: 'Feature',
      title: 'Recusandae benigne acervus quis sapiente sapiente.',
      status: 'Backlog',
      priority: 'Medium',
    },
    {
      id: 'TASK-1234',
      type: 'Feature',
      title: 'Cancer Immunotherapy Trial - Phase II study',
      status: 'In Progress',
      priority: 'High',
    },
    {
      id: 'TASK-5678',
      type: 'Documentation',
      title: 'Cardiovascular Prevention Study documentation',
      status: 'Done',
      priority: 'Medium',
    },
    {
      id: 'TASK-9012',
      type: 'Bug',
      title: 'Alzheimer Disease Treatment Study - enrollment issue',
      status: 'In Progress',
      priority: 'High',
    },
    {
      id: 'TASK-3456',
      type: 'Feature',
      title: 'Hypertension Management Trial implementation',
      status: 'Done',
      priority: 'Medium',
    },
    {
      id: 'TASK-7890',
      type: 'Documentation',
      title: 'COVID-19 Vaccine Study final report',
      status: 'Done',
      priority: 'Low',
    },
    {
      id: 'TASK-2345',
      type: 'Bug',
      title: 'Rheumatoid Arthritis Treatment data validation',
      status: 'In Progress',
      priority: 'Medium',
    },
    {
      id: 'TASK-6789',
      type: 'Feature',
      title: 'Migraine Prevention Study patient portal',
      status: 'Todo',
      priority: 'Low',
    },
    {
      id: 'TASK-0123',
      type: 'Bug',
      title: 'Asthma Control Trial suspension review',
      status: 'Backlog',
      priority: 'Low',
    },
    {
      id: 'TASK-4567',
      type: 'Feature',
      title: 'Depression Treatment Study analytics dashboard',
      status: 'In Progress',
      priority: 'High',
    },
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      Done: { color: 'success', icon: '✓' },
      'In Progress': { color: 'primary', icon: '○' },
      Todo: { color: 'secondary', icon: '○' },
      Canceled: { color: 'danger', icon: '⊘' },
      Backlog: { color: 'warning', icon: '○' },
    }
    const config = statusConfig[status] || { color: 'secondary', icon: '○' }
    return (
      <CBadge color={config.color} className="status-badge">
        <span className="badge-icon">{config.icon}</span>
        {status}
      </CBadge>
    )
  }

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      High: { icon: '↑', class: 'priority-high' },
      Medium: { icon: '→', class: 'priority-medium' },
      Low: { icon: '↓', class: 'priority-low' },
    }
    const config = priorityConfig[priority] || { icon: '→', class: 'priority-medium' }
    return (
      <span className={`priority-badge ${config.class}`}>
        <span className="priority-icon">{config.icon}</span>
        {priority}
      </span>
    )
  }

  const getTypeBadge = (type) => {
    return <CBadge color="light" className="type-badge">{type}</CBadge>
  }

  const columns = [
    {
      key: 'id',
      label: 'Task',
      sortable: true,
      className: 'task-id-cell',
      render: (row) => (
        <div className="task-id-wrapper">
          <span className="task-id">{row.id}</span>
          {getTypeBadge(row.type)}
        </div>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      className: 'title-cell',
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      className: 'status-cell',
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      className: 'priority-cell',
      render: (row) => getPriorityBadge(row.priority),
    },
  ]

  return (
    <ShadcnTable
      data={data}
      columns={columns}
      title="Clinical Trials"
      subtitle="Manage and monitor all clinical trials"
      showImportButton={true}
      showExportButton={true}
      onImport={() => console.log('Import trials')}
      onExport={() => console.log('Export trials')}
      enableFilters={true}
      filterConfig={{
        status: { enabled: true, options: ['Backlog', 'Todo', 'In Progress', 'Done', 'Canceled'] },
        priority: { enabled: true, options: ['Low', 'Medium', 'High'] }
      }}
      searchPlaceholder="Filter trials..."
      actionMenuItems={[
        { label: 'View Trial', onClick: (row) => console.log('View trial', row) },
        { label: 'Edit Trial', onClick: (row) => console.log('Edit trial', row) },
        { label: 'Duplicate', onClick: (row) => console.log('Duplicate trial', row) },
        { label: 'Mark as Favorite', onClick: (row) => console.log('Favorite', row) },
        { type: 'divider' },
        { label: 'Archive Trial', onClick: (row) => console.log('Archive trial', row), danger: true }
      ]}
      rowsPerPageOptions={[10, 20, 50, 100]}
      defaultRowsPerPage={20}
    />
  )
}

export default AllTrials
