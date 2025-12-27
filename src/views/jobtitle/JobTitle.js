import { useState } from 'react'
import { MetricCard, ShadcnTable, DeleteConfirmation } from '../../components'
import { COffcanvas, COffcanvasHeader, COffcanvasTitle, COffcanvasBody, CButton, CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import './JobTitle.scss'

const JobTitle = () => {
  const [jobTitles, setJobTitles] = useState([
    {
      id: 1,
      jobTitleName: 'Vice President',
      description: 'Show the description and truncated to 25 characters',
      status: 'Active',
    },
    {
      id: 2,
      jobTitleName: 'Deputy Manager',
      description: 'Show the description and truncated to 25 characters',
      status: 'Inactive',
    },
    {
      id: 3,
      jobTitleName: 'Quality Manager',
      description: 'Show the description and truncated to 25 characters',
      status: 'Active',
    },
    {
      id: 4,
      jobTitleName: 'Statistical Manager',
      description: 'Show the description and truncated to 25 characters',
      status: 'Inactive',
    },
  ])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedJobTitle, setSelectedJobTitle] = useState(null)
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [markAsInactive, setMarkAsInactive] = useState(false)
  const [formData, setFormData] = useState({
    jobTitleName: '',
    description: ''
  })

  const columns = [
    {
      key: 'jobTitleName',
      label: 'Job Title Name',
    },
    {
      key: 'description',
      label: 'Preview',
      render: (item) => (
        <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
          {item.description}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
    },
  ]

  const handleCreate = () => {
    setEditMode(false)
    setFormData({
      jobTitleName: '',
      description: ''
    })
    setMarkAsInactive(false)
    setShowOffcanvas(true)
  }

  const handleEdit = (jobTitle) => {
    setEditMode(true)
    setSelectedJobTitle(jobTitle)
    setFormData({
      jobTitleName: jobTitle.jobTitleName,
      description: jobTitle.description
    })
    setMarkAsInactive(jobTitle.status === 'Inactive')
    setShowOffcanvas(true)
  }

  const handleDelete = (jobTitle) => {
    setSelectedJobTitle(jobTitle)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setJobTitles(jobTitles.filter((jobTitle) => jobTitle.id !== selectedJobTitle.id))
    setShowDeleteModal(false)
  }

  const handleSubmit = () => {
    if (editMode && selectedJobTitle) {
      setJobTitles(jobTitles.map(jt =>
        jt.id === selectedJobTitle.id
          ? {
              ...jt,
              jobTitleName: formData.jobTitleName,
              description: formData.description,
              status: markAsInactive ? 'Inactive' : 'Active'
            }
          : jt
      ))
    } else {
      const newJobTitle = {
        id: jobTitles.length + 1,
        jobTitleName: formData.jobTitleName,
        description: formData.description,
        status: markAsInactive ? 'Inactive' : 'Active'
      }
      setJobTitles([...jobTitles, newJobTitle])
    }
    setShowOffcanvas(false)
  }

  return (
    <div className="job-title-container">
      {/* Header Section */}
      <div className="job-title-header-section">
        <div>
          <h1 className="job-title-main-title">Job Title</h1>
          <p className="job-title-main-subtitle">Manage job titles and their descriptions</p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="job-title-metrics-grid">
        <MetricCard
          title="Total Job Titles"
          value="04"
        />

        <MetricCard
          title="Active Job Titles"
          value="02"
        />

        <MetricCard
          title="Inactive Job Titles"
          value="02"
        />
      </div>

      {/* Job Titles Table */}
      <ShadcnTable
        data={jobTitles}
        columns={columns}
        title="All Job Titles"
        subtitle="Manage job titles and their descriptions"
        headerAction={
          <button
            className="btn-primary"
            style={{ background: '#16a34a', borderColor: '#16a34a' }}
            onClick={handleCreate}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            Create Job Title
          </button>
        }
        showImportButton={false}
        showExportButton={false}
        enableFilters={false}
        enableSelection={false}
        enableActions={true}
        searchPlaceholder="Search job titles..."
        actionMenuItems={[
          { label: 'Edit', onClick: handleEdit },
          { label: 'Delete', onClick: handleDelete }
        ]}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        itemName={selectedJobTitle?.jobTitleName}
      />

      {/* Create/Edit Job Title Sliding Panel */}
      <COffcanvas
        placement="end"
        visible={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        backdrop={true}
        scroll={false}
        style={{
          width: '600px',
          maxWidth: '100%'
        }}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>{editMode ? 'Edit Job Title' : 'Create a new job title'}</COffcanvasTitle>
          <CButton
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowOffcanvas(false)}
          />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="jobTitleName">Job Title Name *</CFormLabel>
              <CFormInput
                type="text"
                id="jobTitleName"
                placeholder="Enter job title name"
                value={formData.jobTitleName}
                onChange={(e) => setFormData({ ...formData, jobTitleName: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="description">Description</CFormLabel>
              <CFormTextarea
                id="description"
                rows="4"
                placeholder="Enter job title description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="mb-3 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAsInactive"
                checked={markAsInactive}
                onChange={(e) => setMarkAsInactive(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="markAsInactive">
                Mark as Inactive
              </label>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <CButton
                color="secondary"
                onClick={() => setShowOffcanvas(false)}
              >
                Cancel
              </CButton>
              <CButton
                color="success"
                onClick={handleSubmit}
              >
                {editMode ? 'Update Job Title' : 'Create Job Title'}
              </CButton>
            </div>
          </CForm>
        </COffcanvasBody>
      </COffcanvas>
    </div>
  )
}

export default JobTitle
