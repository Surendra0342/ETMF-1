import { useState } from 'react'
import { MetricCard, ShadcnTable, DeleteConfirmation } from '../../components'
import { COffcanvas, COffcanvasHeader, COffcanvasTitle, COffcanvasBody, CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import './TeamMembers.scss'

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'Principal Investigator',
      contactNumber: '+1 (555) 123-4567',
      status: 'Active',
    },
    {
      id: 2,
      fullName: 'Michael Chen',
      email: 'michael.chen@example.com',
      role: 'Clinical Research Coordinator',
      contactNumber: '+1 (555) 234-5678',
      status: 'Active',
    },
    {
      id: 3,
      fullName: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      role: 'Data Manager',
      contactNumber: '+1 (555) 345-6789',
      status: 'Inactive',
    },
    {
      id: 4,
      fullName: 'David Thompson',
      email: 'david.thompson@example.com',
      role: 'Study Coordinator',
      contactNumber: '+1 (555) 456-7890',
      status: 'Inactive',
    },
  ])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    role: '',
    markAsInactive: false
  })

  const columns = [
    {
      key: 'fullName',
      label: 'Full Name',
      render: (item) => (
        <div>
          <div style={{ fontWeight: 500 }}>{item.fullName}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
            {item.email}
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
    },
    {
      key: 'contactNumber',
      label: 'Contact Number',
    },
    {
      key: 'status',
      label: 'Status',
    },
  ]

  const handleCreate = () => {
    setEditMode(false)
    setFormData({
      fullName: '',
      email: '',
      contactNumber: '',
      role: '',
      markAsInactive: false
    })
    setShowOffcanvas(true)
  }

  const handleEdit = (member) => {
    setEditMode(true)
    setSelectedMember(member)
    setFormData({
      fullName: member.fullName,
      email: member.email,
      contactNumber: member.contactNumber,
      role: member.role,
      markAsInactive: member.status === 'Inactive'
    })
    setShowOffcanvas(true)
  }

  const handleDelete = (member) => {
    setSelectedMember(member)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setTeamMembers(teamMembers.filter((member) => member.id !== selectedMember.id))
    setShowDeleteModal(false)
  }

  const handleSubmit = () => {
    if (editMode && selectedMember) {
      setTeamMembers(teamMembers.map(m =>
        m.id === selectedMember.id
          ? {
              ...m,
              fullName: formData.fullName,
              email: formData.email,
              contactNumber: formData.contactNumber,
              role: formData.role,
              status: formData.markAsInactive ? 'Inactive' : 'Active'
            }
          : m
      ))
    } else {
      const newMember = {
        id: teamMembers.length + 1,
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        role: formData.role,
        status: formData.markAsInactive ? 'Inactive' : 'Active'
      }
      setTeamMembers([...teamMembers, newMember])
    }
    setShowOffcanvas(false)
  }

  return (
    <div className="team-members-container">
      {/* Header Section */}
      <div className="team-members-header-section">
        <div>
          <h1 className="team-members-main-title">Team Management</h1>
          <p className="team-members-main-subtitle">Manage your team members and their roles here</p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="team-members-metrics-grid">
        <MetricCard
          title="Total Team Members"
          value="04"
        />

        <MetricCard
          title="Active Team Members"
          value="02"
        />

        <MetricCard
          title="Inactive Team Members"
          value="02"
        />
      </div>

      {/* Team Members Table */}
      <ShadcnTable
        data={teamMembers}
        columns={columns}
        title="All Team Members"
        subtitle="Manage your team members and their roles"
        headerAction={
          <button
            className="btn-primary"
            style={{ background: '#16a34a', borderColor: '#16a34a' }}
            onClick={handleCreate}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            Create Team Member
          </button>
        }
        showImportButton={false}
        showExportButton={false}
        enableFilters={false}
        enableSelection={true}
        enableActions={true}
        searchPlaceholder="Search team members..."
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
        itemName={selectedMember?.fullName}
      />

      {/* Create/Edit Team Member Sliding Panel */}
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
          <COffcanvasTitle>{editMode ? 'Edit Team Member' : 'Create a new team member'}</COffcanvasTitle>
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
              <CFormLabel htmlFor="fullName">Full Name *</CFormLabel>
              <CFormInput
                type="text"
                id="fullName"
                placeholder="Varada C"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="email">Email Address *</CFormLabel>
              <CFormInput
                type="email"
                id="email"
                placeholder="varada@sclimtech.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="contactNumber">Contact Number *</CFormLabel>
              <CFormInput
                type="tel"
                id="contactNumber"
                placeholder="+911234567890"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="role">Role *</CFormLabel>
              <CFormSelect
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="">Select Role</option>
                <option value="CRO Administrator">CRO Administrator</option>
                <option value="Principal Investigator">Principal Investigator</option>
                <option value="Clinical Research Coordinator">Clinical Research Coordinator</option>
                <option value="Data Manager">Data Manager</option>
                <option value="Study Coordinator">Study Coordinator</option>
              </CFormSelect>
            </div>

            <div className="mb-3 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAsInactive"
                checked={formData.markAsInactive}
                onChange={(e) => setFormData({ ...formData, markAsInactive: e.target.checked })}
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
                Create User
              </CButton>
            </div>
          </CForm>
        </COffcanvasBody>
      </COffcanvas>
    </div>
  )
}

export default TeamMembers
