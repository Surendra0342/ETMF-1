import React, { useState } from 'react'
import { MetricCard, ShadcnTable, DeleteConfirmation, Card, CardContent } from '../../components'
import { CForm, CFormLabel, CFormInput, CFormSelect, CButton, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import './Studies.scss'

const Studies = () => {
  const [showForm, setShowForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    studyId: '',
    studyTitle: '',
    phase: '',
    maxSites: '',
    maxEnrollments: '',
    timeline: '',
    status: '',
    sponsorName: ''
  })

  const [studies, setStudies] = useState([
    {
      id: 1,
      studyId: 'HMS/3231/33',
      studyTitle: 'Hypertension Management Study',
      phase: 'Phase IV',
      maxSites: '500',
      maxEnrollments: '1000',
      timeline: '05-Nov-2025 to 21-Nov-2025',
      progress: '38%',
      status: 'Design',
      sponsorName: 'Pharma Global Inc.'
    },
    {
      id: 2,
      studyId: 'YSTL/392066',
      studyTitle: 'Suger Candy Study',
      phase: 'Phase IV',
      maxSites: '500',
      maxEnrollments: '1000',
      timeline: '05-Nov-2025 to 21-Nov-2025',
      progress: '38%',
      status: 'Live',
      sponsorName: 'Medical Research Corp.'
    },
    {
      id: 3,
      studyId: 'HMS/3231/33',
      studyTitle: 'Hypertension Management Study',
      phase: 'Phase IV',
      maxSites: '500',
      maxEnrollments: '1000',
      timeline: '05-Nov-2025 to 21-Nov-2025',
      progress: '38%',
      status: 'Closed',
      sponsorName: 'Pharma Global Inc.'
    },
    {
      id: 4,
      studyId: 'HMS/3231/33',
      studyTitle: 'Hypertension Management Study',
      phase: 'Phase IV',
      maxSites: '500',
      maxEnrollments: '1000',
      timeline: '05-Nov-2025 to 21-Nov-2025',
      progress: '38%',
      status: 'Closed',
      sponsorName: 'Medical Research Corp.'
    }
  ])

  const resetForm = () => {
    setFormData({
      studyId: '',
      studyTitle: '',
      phase: '',
      maxSites: '',
      maxEnrollments: '',
      timeline: '',
      status: '',
      sponsorName: ''
    })
  }

  const handleCreateStudy = () => {
    setIsEdit(false)
    setSelectedStudy(null)
    resetForm()
    setShowForm(true)
  }

  const handleEdit = (study) => {
    setIsEdit(true)
    setSelectedStudy(study)
    setFormData({
      studyId: study.studyId,
      studyTitle: study.studyTitle,
      phase: study.phase,
      maxSites: study.maxSites,
      maxEnrollments: study.maxEnrollments,
      timeline: study.timeline,
      status: study.status,
      sponsorName: study.sponsorName
    })
    setShowForm(true)
  }

  const handleDelete = (study) => {
    setSelectedStudy(study)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setStudies(studies.filter(s => s.id !== selectedStudy.id))
    setShowDeleteModal(false)
    setSelectedStudy(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setIsEdit(false)
    setSelectedStudy(null)
    resetForm()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEdit) {
      setStudies(studies.map(s => s.id === selectedStudy.id ? { ...s, ...formData } : s))
    } else {
      const newStudy = {
        id: studies.length + 1,
        ...formData,
        progress: '0%'
      }
      setStudies([...studies, newStudy])
    }
    handleCancel()
  }

  const columns = [
    {
      key: 'studyTitle',
      label: 'Study Title',
      sortable: true,
      render: (row) => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--foreground)', marginBottom: '2px' }}>
            {row.studyId}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
            {row.studyTitle}
          </div>
        </div>
      )
    },
    { key: 'phase', label: 'Phase', sortable: true },
    { key: 'maxSites', label: 'Max. Sites', sortable: true },
    { key: 'maxEnrollments', label: 'Max. Enrollments', sortable: true },
    { key: 'timeline', label: 'Timeline', sortable: true },
    {
      key: 'progress',
      label: 'Progress',
      sortable: false,
      render: (row) => (
        <div className="progress-cell">
          <span className="progress-text">{row.progress}</span>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: row.progress }}
            />
          </div>
        </div>
      )
    },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'sponsorName', label: 'Sponsor Name', sortable: true }
  ]

  // Render Form View
  if (showForm) {
    return (
      <div className="studies-container">
        <CRow className="mb-4">
          <CCol xs={12}>
            <Card>
              <CardContent>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <CButton
                    color="light"
                    onClick={handleCancel}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      border: '1px solid var(--border)',
                      borderRadius: '6px'
                    }}
                  >
                    <CIcon icon={cilArrowLeft} size="sm" />
                    Back
                  </CButton>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 600 }}>
                      {isEdit ? 'Edit Study' : 'Create New Study'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                      {isEdit ? 'Update study information' : 'Fill in the details to create a new study'}
                    </p>
                  </div>
                </div>

                <CForm onSubmit={handleSubmit}>
                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="studyId">Study ID *</CFormLabel>
                        <CFormInput
                          type="text"
                          id="studyId"
                          value={formData.studyId}
                          onChange={(e) => setFormData({ ...formData, studyId: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="studyTitle">Study Title *</CFormLabel>
                        <CFormInput
                          type="text"
                          id="studyTitle"
                          value={formData.studyTitle}
                          onChange={(e) => setFormData({ ...formData, studyTitle: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="phase">Phase *</CFormLabel>
                        <CFormSelect
                          id="phase"
                          value={formData.phase}
                          onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                          required
                        >
                          <option value="">Select Phase</option>
                          <option value="Phase I">Phase I</option>
                          <option value="Phase II">Phase II</option>
                          <option value="Phase III">Phase III</option>
                          <option value="Phase IV">Phase IV</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="sponsorName">Sponsor Name *</CFormLabel>
                        <CFormInput
                          type="text"
                          id="sponsorName"
                          value={formData.sponsorName}
                          onChange={(e) => setFormData({ ...formData, sponsorName: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="maxSites">Max Sites *</CFormLabel>
                        <CFormInput
                          type="number"
                          id="maxSites"
                          value={formData.maxSites}
                          onChange={(e) => setFormData({ ...formData, maxSites: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="maxEnrollments">Max Enrollments *</CFormLabel>
                        <CFormInput
                          type="number"
                          id="maxEnrollments"
                          value={formData.maxEnrollments}
                          onChange={(e) => setFormData({ ...formData, maxEnrollments: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="timeline">Timeline *</CFormLabel>
                        <CFormInput
                          type="text"
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          placeholder="DD-MMM-YYYY to DD-MMM-YYYY"
                          required
                        />
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="status">Status *</CFormLabel>
                        <CFormSelect
                          id="status"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          required
                        >
                          <option value="">Select Status</option>
                          <option value="Design">Design</option>
                          <option value="Live">Live</option>
                          <option value="Closed">Closed</option>
                          <option value="Locked">Locked</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                  </CRow>

                  <div className="d-flex gap-2 justify-content-end mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                    <CButton color="secondary" onClick={handleCancel}>
                      Cancel
                    </CButton>
                    <CButton
                      type="submit"
                      style={{ background: '#16a34a', borderColor: '#16a34a', color: 'white' }}
                    >
                      {isEdit ? 'Update Study' : 'Create Study'}
                    </CButton>
                  </div>
                </CForm>
              </CardContent>
            </Card>
          </CCol>
        </CRow>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmation
          visible={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          itemName={selectedStudy?.studyTitle}
          title="Delete Study"
          message="This action cannot be undone. This will permanently delete the study and all associated data."
        />
      </div>
    )
  }

  // Render Table View
  return (
    <div className="studies-container">
      {/* Header Section */}
      <div className="studies-header-section">
        <div>
          <h1 className="studies-main-title">Study Management</h1>
          <p className="studies-main-subtitle">Manage and monitor your clinical studies</p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="studies-metrics-grid">
        <MetricCard
          title="Total Studies"
          value="37"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        <MetricCard
          title="Studies in Design"
          value="7"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        <MetricCard
          title="Running Studies"
          value="20"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        <MetricCard
          title="Locked Studies"
          value="20"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        <MetricCard
          title="Closed Studies"
          value="10"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
      </div>

      {/* Studies Table */}
      <ShadcnTable
        data={studies}
        columns={columns}
        title="All Studies"
        subtitle="Manage and monitor your clinical studies"
        headerAction={
          <button
            className="btn-primary"
            style={{ background: '#16a34a', borderColor: '#16a34a' }}
            onClick={handleCreateStudy}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            Create Study
          </button>
        }
        showImportButton={false}
        showExportButton={false}
        enableFilters={false}
        enableSelection={false}
        enableActions={true}
        searchPlaceholder="Search studies..."
        actionMenuItems={[
          { label: 'Edit', onClick: handleEdit },
          { label: 'Delete', onClick: handleDelete },
          { label: 'Lock', onClick: (row) => console.log('Lock', row) },
          { label: 'Design Study', onClick: (row) => console.log('Design Study', row) },
          { label: 'Test Mode', onClick: (row) => console.log('Test Mode', row) },
          { label: 'Live Mode', onClick: (row) => console.log('Live Mode', row) },
          { type: 'divider' },
          { label: 'Configuration', onClick: (row) => console.log('Configuration', row) },
          { label: 'Plan Details', onClick: (row) => console.log('Plan Details', row) }
        ]}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        itemName={selectedStudy?.studyTitle}
        title="Delete Study"
        message="This action cannot be undone. This will permanently delete the study and all associated data."
      />
    </div>
  )
}

export default Studies
