import { useState } from 'react'
import { MetricCard, ShadcnTable, DeleteConfirmation, Card, CardContent } from '../../components'
import { CButton, CForm, CFormInput, CFormLabel, CFormTextarea, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody, CRow, CCol, CFormCheck } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import './RolesManagement.scss'

const RolesManagement = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      roleName: 'CRO Administrator',
      description: 'Show the description and truncated to 25 characters',
      status: 'Active',
    },
    {
      id: 2,
      roleName: 'Data Manager',
      description: 'Show the description and truncated to 25 characters',
      status: 'Inactive',
    },
    {
      id: 3,
      roleName: 'Quality Manager',
      description: 'Show the description and truncated to 25 characters',
      status: 'Active',
    },
    {
      id: 4,
      roleName: 'Statistical Analyst',
      description: 'Show the description and truncated to 25 characters',
      status: 'Inactive',
    },
  ])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [markAsInactive, setMarkAsInactive] = useState(false)
  const [formData, setFormData] = useState({
    roleName: '',
    description: ''
  })

  // Permissions for each section
  const accessControlSections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      permissions: [
        { id: 'dashboard-view', label: 'View Dashboard' },
        { id: 'dashboard-export', label: 'Export Reports' },
        { id: 'dashboard-analytics', label: 'View Analytics' },
      ]
    },
    {
      id: 'sponsors-studies',
      label: 'Sponsors and Studies',
      permissions: [
        { id: 'sponsors-view', label: 'View Sponsors' },
        { id: 'sponsors-create', label: 'Create Sponsors' },
        { id: 'sponsors-edit', label: 'Edit Sponsors' },
        { id: 'sponsors-delete', label: 'Delete Sponsors' },
        { id: 'studies-view', label: 'View Studies' },
        { id: 'studies-create', label: 'Create Studies' },
        { id: 'studies-edit', label: 'Edit Studies' },
        { id: 'studies-delete', label: 'Delete Studies' },
      ]
    },
    {
      id: 'team-admin',
      label: 'Team Administration',
      permissions: [
        { id: 'team-view', label: 'View Team Members' },
        { id: 'team-create', label: 'Add Team Members' },
        { id: 'team-edit', label: 'Edit Team Members' },
        { id: 'team-delete', label: 'Delete Team Members' },
        { id: 'roles-manage', label: 'Manage Roles' },
      ]
    },
    {
      id: 'demo-requests',
      label: 'Demo Requests',
      permissions: [
        { id: 'demo-view', label: 'View Demo Requests' },
        { id: 'demo-respond', label: 'Respond to Requests' },
        { id: 'demo-delete', label: 'Delete Requests' },
      ]
    }
  ]

  // State for selected permissions
  const [selectedPermissions, setSelectedPermissions] = useState({})

  // Handle permission checkbox change
  const handlePermissionChange = (permissionId, checked) => {
    setSelectedPermissions(prev => ({
      ...prev,
      [permissionId]: checked
    }))
  }

  // Handle select all for a section
  const handleSelectAll = (section, checked) => {
    const newPermissions = { ...selectedPermissions }
    section.permissions.forEach(permission => {
      newPermissions[permission.id] = checked
    })
    setSelectedPermissions(newPermissions)
  }

  // Check if all permissions in a section are selected
  const isAllSelected = (section) => {
    return section.permissions.every(permission => selectedPermissions[permission.id])
  }

  // Check if some permissions in a section are selected
  const isSomeSelected = (section) => {
    return section.permissions.some(permission => selectedPermissions[permission.id]) && !isAllSelected(section)
  }

  const columns = [
    {
      key: 'roleName',
      label: 'Role Name',
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
      label: 'Role Status',
    },
  ]

  const resetForm = () => {
    setFormData({
      roleName: '',
      description: ''
    })
    setMarkAsInactive(false)
    setSelectedPermissions({})
  }

  const handleCreate = () => {
    setEditMode(false)
    setSelectedRole(null)
    resetForm()
    setShowForm(true)
  }

  const handleEdit = (role) => {
    setEditMode(true)
    setSelectedRole(role)
    setFormData({
      roleName: role.roleName,
      description: role.description
    })
    setMarkAsInactive(role.status === 'Inactive')
    setShowForm(true)
  }

  const handleDelete = (role) => {
    setSelectedRole(role)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setRoles(roles.filter((role) => role.id !== selectedRole.id))
    setShowDeleteModal(false)
    setSelectedRole(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditMode(false)
    setSelectedRole(null)
    resetForm()
  }

  const handleSubmit = () => {
    if (editMode && selectedRole) {
      setRoles(roles.map(r =>
        r.id === selectedRole.id
          ? {
              ...r,
              roleName: formData.roleName,
              description: formData.description,
              status: markAsInactive ? 'Inactive' : 'Active'
            }
          : r
      ))
    } else {
      const newRole = {
        id: roles.length + 1,
        roleName: formData.roleName,
        description: formData.description,
        status: markAsInactive ? 'Inactive' : 'Active'
      }
      setRoles([...roles, newRole])
    }
    handleCancel()
  }

  // Render Form View
  if (showForm) {
    return (
      <div className="roles-management-container">
        <CRow className="mb-4">
          <CCol xs={12}>
            <Card>
              <CardContent>
                <div className="mb-4">
                  <CButton
                    color="light"
                    onClick={handleCancel}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      marginBottom: '1rem'
                    }}
                  >
                    <CIcon icon={cilArrowLeft} size="sm" />
                    Back
                  </CButton>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 600 }}>
                      {editMode ? 'Edit Role' : 'Create New Role'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                      {editMode ? 'Update role information and permissions' : 'Fill in the details to create a new role'}
                    </p>
                  </div>
                </div>

                <CForm>
                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="roleName">Role Name *</CFormLabel>
                        <CFormInput
                          type="text"
                          id="roleName"
                          placeholder="Enter role name"
                          value={formData.roleName}
                          onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                          required
                        />
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs={12}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="description">Description</CFormLabel>
                        <CFormTextarea
                          id="description"
                          rows="3"
                          placeholder="Role Description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <div className="form-text" style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                          {formData.description.length} / 250 characters
                        </div>
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs={12}>
                      <div className="mb-3">
                        <CFormLabel>Access Control</CFormLabel>
                        <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                          Define the actions and privileges assigned to this role within the Role Management module.
                        </p>

                        <CAccordion flush className="access-control-accordion">
                          {accessControlSections.map((section) => (
                            <CAccordionItem key={section.id} itemKey={section.id}>
                              <CAccordionHeader>
                                {section.label}
                              </CAccordionHeader>
                              <CAccordionBody>
                                <div className="permissions-container">
                                  {/* Select All Checkbox */}
                                  <div className="permission-item select-all">
                                    <CFormCheck
                                      id={`select-all-${section.id}`}
                                      label="Select All"
                                      checked={isAllSelected(section)}
                                      indeterminate={isSomeSelected(section)}
                                      onChange={(e) => handleSelectAll(section, e.target.checked)}
                                    />
                                  </div>
                                  <div className="permissions-divider"></div>
                                  {/* Individual Permission Checkboxes */}
                                  <div className="permissions-grid">
                                    {section.permissions.map((permission) => (
                                      <div key={permission.id} className="permission-item">
                                        <CFormCheck
                                          id={permission.id}
                                          label={permission.label}
                                          checked={selectedPermissions[permission.id] || false}
                                          onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </CAccordionBody>
                            </CAccordionItem>
                          ))}
                        </CAccordion>
                      </div>
                    </CCol>
                  </CRow>

                  <div className="d-flex justify-content-between align-items-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="form-check form-switch">
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
                    <div className="d-flex gap-2">
                      <CButton color="secondary" onClick={handleCancel}>
                        Cancel
                      </CButton>
                      <CButton
                        style={{ background: '#16a34a', borderColor: '#16a34a', color: 'white' }}
                        onClick={handleSubmit}
                      >
                        {editMode ? 'Update Role' : 'Create Role'}
                      </CButton>
                    </div>
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
          itemName={selectedRole?.roleName}
        />
      </div>
    )
  }

  // Render Table View
  return (
    <div className="roles-management-container">
      {/* Header Section */}
      <div className="roles-management-header-section">
        <div>
          <h1 className="roles-management-main-title">Roles & Permissions</h1>
          <p className="roles-management-main-subtitle">Manage user roles and permission groups</p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="roles-management-metrics-grid">
        <MetricCard
          title="Total Roles"
          value="04"
        />

        <MetricCard
          title="Active Roles"
          value="02"
        />

        <MetricCard
          title="Inactive Roles"
          value="02"
        />
      </div>

      {/* Roles Table */}
      <ShadcnTable
        data={roles}
        columns={columns}
        title="All Roles"
        subtitle="Manage user roles and permission groups"
        headerAction={
          <button
            className="btn-primary"
            style={{ background: '#16a34a', borderColor: '#16a34a' }}
            onClick={handleCreate}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            Create Role
          </button>
        }
        showImportButton={false}
        showExportButton={false}
        enableFilters={false}
        enableSelection={false}
        enableActions={true}
        searchPlaceholder="Search roles..."
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
        itemName={selectedRole?.roleName}
      />
    </div>
  )
}

export default RolesManagement
