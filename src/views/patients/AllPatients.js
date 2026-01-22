import { useState } from 'react'
import { MetricCard, ShadcnTable, DeleteConfirmation, Card, CardContent } from 'src/components'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'

const AllPatients = () => {
  const [patients, setPatients] = useState([
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
  ])

  const [showForm, setShowForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    patientId: '',
    type: '',
    trialId: '',
    age: '',
    gender: '',
    enrollmentDate: '',
    status: '',
    priority: ''
  })

  const columns = [
    { key: 'id', label: 'Patient ID', sortable: true },
    { key: 'title', label: 'Details', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
  ]

  const resetForm = () => {
    setFormData({
      patientId: '',
      type: '',
      trialId: '',
      age: '',
      gender: '',
      enrollmentDate: '',
      status: '',
      priority: ''
    })
  }

  const handleCreate = () => {
    setEditMode(false)
    setSelectedPatient(null)
    resetForm()
    setShowForm(true)
  }

  const handleEdit = (patient) => {
    setEditMode(true)
    setSelectedPatient(patient)
    setFormData({
      patientId: patient.id,
      type: patient.type,
      trialId: patient.trialId,
      age: patient.age.toString(),
      gender: patient.gender,
      enrollmentDate: patient.enrollmentDate,
      status: patient.status,
      priority: patient.priority
    })
    setShowForm(true)
  }

  const handleDelete = (patient) => {
    setSelectedPatient(patient)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setPatients(patients.filter(p => p.id !== selectedPatient.id))
    setShowDeleteModal(false)
    setSelectedPatient(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditMode(false)
    setSelectedPatient(null)
    resetForm()
  }

  const handleSubmit = () => {
    if (editMode && selectedPatient) {
      setPatients(patients.map(p =>
        p.id === selectedPatient.id
          ? {
              ...p,
              type: formData.type,
              trialId: formData.trialId,
              age: parseInt(formData.age),
              gender: formData.gender,
              enrollmentDate: formData.enrollmentDate,
              status: formData.status,
              priority: formData.priority,
              title: `Trial ${formData.trialId} - ${formData.gender}, Age ${formData.age}`
            }
          : p
      ))
    } else {
      const newPatient = {
        id: `PT-${String(patients.length + 1).padStart(3, '0')}`,
        type: formData.type,
        trialId: formData.trialId,
        age: parseInt(formData.age),
        gender: formData.gender,
        enrollmentDate: formData.enrollmentDate,
        status: formData.status,
        priority: formData.priority,
        title: `Trial ${formData.trialId} - ${formData.gender}, Age ${formData.age}`
      }
      setPatients([...patients, newPatient])
    }
    handleCancel()
  }

  // Render Form View
  if (showForm) {
    return (
      <div className="patients-container">
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
                      {editMode ? 'Edit Patient' : 'Create New Patient'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                      {editMode ? 'Update patient information' : 'Fill in the details to enroll a new patient'}
                    </p>
                  </div>
                </div>

                <CForm>
                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="trialId">Trial ID *</CFormLabel>
                        <CFormSelect
                          id="trialId"
                          value={formData.trialId}
                          onChange={(e) => setFormData({ ...formData, trialId: e.target.value })}
                          required
                        >
                          <option value="">Select Trial</option>
                          <option value="CT-001">CT-001</option>
                          <option value="CT-002">CT-002</option>
                          <option value="CT-003">CT-003</option>
                          <option value="CT-004">CT-004</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="type">Patient Type *</CFormLabel>
                        <CFormSelect
                          id="type"
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="Adult">Adult</option>
                          <option value="Pediatric">Pediatric</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="gender">Gender *</CFormLabel>
                        <CFormSelect
                          id="gender"
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="age">Age *</CFormLabel>
                        <CFormInput
                          type="number"
                          id="age"
                          placeholder="Enter age"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="enrollmentDate">Enrollment Date *</CFormLabel>
                        <CFormInput
                          type="date"
                          id="enrollmentDate"
                          value={formData.enrollmentDate}
                          onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
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
                          <option value="Active">Active</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Done">Done</option>
                          <option value="Canceled">Canceled</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="priority">Priority *</CFormLabel>
                        <CFormSelect
                          id="priority"
                          value={formData.priority}
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                          required
                        >
                          <option value="">Select Priority</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
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
                      {editMode ? 'Update Patient' : 'Enroll Patient'}
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
          itemName={selectedPatient?.id}
          title="Remove Patient"
          message="This action cannot be undone. This will remove the patient from the trial."
        />
      </div>
    )
  }

  // Render Table View
  return (
    <div className="patients-container">
      {/* Header Section */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Patient Management</h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>Manage and monitor enrolled patients across clinical trials</p>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <MetricCard
          title="Total Patients"
          value={String(patients.length).padStart(2, '0')}
        />
        <MetricCard
          title="Active Patients"
          value={String(patients.filter(p => p.status === 'Active').length).padStart(2, '0')}
        />
        <MetricCard
          title="In Progress"
          value={String(patients.filter(p => p.status === 'In Progress').length).padStart(2, '0')}
        />
        <MetricCard
          title="Completed"
          value={String(patients.filter(p => p.status === 'Done').length).padStart(2, '0')}
        />
      </div>

      {/* Patients Table */}
      <ShadcnTable
        data={patients}
        columns={columns}
        title="All Patients"
        subtitle="Manage and monitor enrolled patients across clinical trials"
        headerAction={
          <button
            className="btn-primary"
            style={{ background: '#16a34a', borderColor: '#16a34a' }}
            onClick={handleCreate}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            Enroll Patient
          </button>
        }
        showImportButton={false}
        showExportButton={false}
        enableFilters={true}
        filterConfig={{
          status: { enabled: true, options: ['Active', 'In Progress', 'Done', 'Canceled'] },
          priority: { enabled: true, options: ['Low', 'Medium', 'High'] }
        }}
        searchPlaceholder="Search patients..."
        enableActions={true}
        actionMenuItems={[
          { label: 'View Details', onClick: (row) => console.log('View patient', row) },
          { label: 'Edit Patient', onClick: handleEdit },
          { label: 'Download Records', onClick: (row) => console.log('Download records', row) },
          { type: 'divider' },
          { label: 'Remove from Trial', onClick: handleDelete, danger: true }
        ]}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        itemName={selectedPatient?.id}
        title="Remove Patient"
        message="This action cannot be undone. This will remove the patient from the trial."
      />
    </div>
  )
}

export default AllPatients
