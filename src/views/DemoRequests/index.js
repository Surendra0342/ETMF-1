import { useState } from 'react'
import { MetricCard, ShadcnTable, DeleteConfirmation, Card, CardContent } from '../../components'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import './DemoRequests.scss'

const DemoRequests = () => {
  const [demoRequests, setDemoRequests] = useState([
    {
      id: 1,
      requestId: 'DEMO-1',
      fullName: 'Jason Mathew',
      email: 'jason@mankind.com',
      jobTitle: 'Clinical Data Manager',
      company: 'Mankind Pharma',
      phone: '+911234567890',
      preferredDateTime: '27-Nov-2025 08:00',
      demoStatus: 'New',
      expressionOfInterest: 'Very High',
    },
    {
      id: 2,
      requestId: 'DEMO-2',
      fullName: 'Kathy Morrison',
      email: 'katty@pharmacology.com',
      jobTitle: 'Associate Manager',
      company: 'Pharmacology',
      phone: '+001123456789',
      preferredDateTime: '27-Nov-2025 13:00',
      demoStatus: 'Postponed',
      expressionOfInterest: 'High',
    },
    {
      id: 3,
      requestId: 'DEMO-3',
      fullName: 'Sophia Kannan',
      email: 'sophia@pyramal.com',
      jobTitle: 'Associate Manager',
      company: 'Pyramal LLC',
      phone: '+001123456789',
      preferredDateTime: '25-Nov-2025 08:00',
      demoStatus: 'Completed',
      expressionOfInterest: 'Closed Positive',
    },
    {
      id: 4,
      requestId: 'DEMO-4',
      fullName: 'Sophia Kannan',
      email: 'sophia@pyramal.com',
      jobTitle: 'Associate Manager',
      company: 'Pyramal LLC',
      phone: '+001123456789',
      preferredDateTime: '25-Nov-2025 08:00',
      demoStatus: 'Cancelled',
      expressionOfInterest: 'Closed Negative',
    },
  ])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    jobTitle: '',
    company: '',
    phone: '',
    preferredDateTime: '',
    demoStatus: 'New',
    expressionOfInterest: 'High'
  })

  const columns = [
    {
      key: 'requestId',
      label: 'Request ID',
    },
    {
      key: 'fullName',
      label: 'Full Name',
      render: (item) => (
        <div>
          <div style={{ fontWeight: 500 }}>{item.fullName}</div>
          <div style={{ fontSize: '0.8rem', color: '#0066cc' }}>{item.email}</div>
        </div>
      ),
    },
    {
      key: 'jobTitle',
      label: 'Job Title',
      render: (item) => (
        <div>
          <div>{item.jobTitle}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>{item.company}</div>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone Number',
    },
    {
      key: 'preferredDateTime',
      label: 'Preferred Date and Time (CST Time zone)',
    },
    {
      key: 'demoStatus',
      label: 'Demo Status',
      render: (item) => {
        const statusColors = {
          New: { bg: '#e0e0e0', color: '#424242' },
          Postponed: { bg: '#fff3cd', color: '#856404' },
          Completed: { bg: '#d4edda', color: '#155724' },
          Cancelled: { bg: '#f8d7da', color: '#721c24' },
        }
        const style = statusColors[item.demoStatus] || { bg: '#f3f4f6', color: '#374151' }
        return (
          <span
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 500,
              backgroundColor: style.bg,
              color: style.color,
            }}
          >
            {item.demoStatus}
          </span>
        )
      },
    },
    {
      key: 'expressionOfInterest',
      label: 'Expression of Interest',
      render: (item) => {
        const interestColors = {
          'Very High': { bg: '#28a745', color: '#fff' },
          'High': { bg: '#ffc107', color: '#000' },
          'Closed Positive': { bg: '#28a745', color: '#fff' },
          'Closed Negative': { bg: '#dc3545', color: '#fff' },
        }
        const style = interestColors[item.expressionOfInterest] || { bg: '#f3f4f6', color: '#374151' }
        return (
          <span
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 500,
              backgroundColor: style.bg,
              color: style.color,
            }}
          >
            {item.expressionOfInterest}
          </span>
        )
      },
    },
  ]

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      jobTitle: '',
      company: '',
      phone: '',
      preferredDateTime: '',
      demoStatus: 'New',
      expressionOfInterest: 'High'
    })
  }

  const handleCreate = () => {
    setEditMode(false)
    setSelectedRequest(null)
    resetForm()
    setShowForm(true)
  }

  const handleEdit = (request) => {
    setEditMode(true)
    setSelectedRequest(request)
    setFormData({
      fullName: request.fullName,
      email: request.email,
      jobTitle: request.jobTitle,
      company: request.company,
      phone: request.phone,
      preferredDateTime: request.preferredDateTime,
      demoStatus: request.demoStatus,
      expressionOfInterest: request.expressionOfInterest
    })
    setShowForm(true)
  }

  const handleDelete = (request) => {
    setSelectedRequest(request)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setDemoRequests(demoRequests.filter((request) => request.id !== selectedRequest.id))
    setShowDeleteModal(false)
    setSelectedRequest(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditMode(false)
    setSelectedRequest(null)
    resetForm()
  }

  const handleSubmit = () => {
    if (editMode && selectedRequest) {
      setDemoRequests(demoRequests.map(req =>
        req.id === selectedRequest.id
          ? {
              ...req,
              ...formData
            }
          : req
      ))
    } else {
      const newId = demoRequests.length + 1
      const newRequest = {
        id: newId,
        requestId: `DEMO-${newId}`,
        ...formData
      }
      setDemoRequests([...demoRequests, newRequest])
    }
    handleCancel()
  }

  // Render Form View
  if (showForm) {
    return (
      <div className="demo-requests-container">
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
                      {editMode ? 'Edit Demo Request' : 'Schedule a Demo'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                      {editMode ? 'Update demo request information' : 'Fill in the details to schedule a demo'}
                    </p>
                  </div>
                </div>

                <CForm>
                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="fullName">Full Name *</CFormLabel>
                        <CFormInput
                          type="text"
                          id="fullName"
                          placeholder="Enter full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="email">Email *</CFormLabel>
                        <CFormInput
                          type="email"
                          id="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="jobTitle">Job Title *</CFormLabel>
                        <CFormInput
                          type="text"
                          id="jobTitle"
                          placeholder="Enter job title"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="company">Company *</CFormLabel>
                        <CFormInput
                          type="text"
                          id="company"
                          placeholder="Enter company name"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="phone">Phone Number *</CFormLabel>
                        <CFormInput
                          type="tel"
                          id="phone"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="preferredDateTime">Preferred Date and Time *</CFormLabel>
                        <CFormInput
                          type="text"
                          id="preferredDateTime"
                          placeholder="e.g., 27-Nov-2025 08:00"
                          value={formData.preferredDateTime}
                          onChange={(e) => setFormData({ ...formData, preferredDateTime: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="demoStatus">Demo Status</CFormLabel>
                        <CFormSelect
                          id="demoStatus"
                          value={formData.demoStatus}
                          onChange={(e) => setFormData({ ...formData, demoStatus: e.target.value })}
                        >
                          <option value="New">New</option>
                          <option value="Postponed">Postponed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="expressionOfInterest">Expression of Interest</CFormLabel>
                        <CFormSelect
                          id="expressionOfInterest"
                          value={formData.expressionOfInterest}
                          onChange={(e) => setFormData({ ...formData, expressionOfInterest: e.target.value })}
                        >
                          <option value="Very High">Very High</option>
                          <option value="High">High</option>
                          <option value="Closed Positive">Closed Positive</option>
                          <option value="Closed Negative">Closed Negative</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                  </CRow>

                  <div className="d-flex gap-2 justify-content-end mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                    <CButton color="secondary" onClick={handleCancel}>
                      Cancel
                    </CButton>
                    <CButton
                      style={{ background: '#16a34a', borderColor: '#16a34a', color: 'white' }}
                      onClick={handleSubmit}
                    >
                      {editMode ? 'Update Demo' : 'Schedule Demo'}
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
          itemName={selectedRequest?.fullName}
        />
      </div>
    )
  }

  // Render Table View
  return (
    <div className="demo-requests-container">
      {/* Header Section */}
      <div className="demo-requests-header-section">
        <div>
          <h1 className="demo-requests-main-title">Demo Requests</h1>
          <p className="demo-requests-main-subtitle">Manage demo requests from potential customers</p>
        </div>
      </div>

      {/* Demo Requests Table */}
      <ShadcnTable
        data={demoRequests}
        columns={columns}
        title="All Demo Requests"
        subtitle="Manage demo requests from potential customers"
        headerAction={
          <button
            className="btn-primary"
            style={{ background: '#16a34a', borderColor: '#16a34a' }}
            onClick={handleCreate}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            Schedule a Demo
          </button>
        }
        showImportButton={false}
        showExportButton={false}
        enableFilters={false}
        enableSelection={false}
        enableActions={true}
        searchPlaceholder="Search..."
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
        itemName={selectedRequest?.fullName}
      />
    </div>
  )
}

export default DemoRequests
