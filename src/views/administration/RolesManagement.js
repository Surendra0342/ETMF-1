import { useState } from 'react'
import { MetricCard, ShadcnTable, DeleteConfirmation } from '../../components'
import { COffcanvas, COffcanvasHeader, COffcanvasTitle, COffcanvasBody, CButton, CForm, CFormInput, CFormLabel, CFormTextarea, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/react'
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
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [markAsInactive, setMarkAsInactive] = useState(false)
  const [formData, setFormData] = useState({
    roleName: '',
    description: ''
  })

  const accessControlSections = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'sponsors-studies', label: 'Sponsors and Studies' },
    { id: 'team-admin', label: 'Team Administration' },
    { id: 'demo-requests', label: 'Demo Requests' }
  ]

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

  const handleCreate = () => {
    setEditMode(false)
    setFormData({
      roleName: '',
      description: ''
    })
    setMarkAsInactive(false)
    setShowOffcanvas(true)
  }

  const handleEdit = (role) => {
    setEditMode(true)
    setSelectedRole(role)
    setFormData({
      roleName: role.roleName,
      description: role.description
    })
    setMarkAsInactive(role.status === 'Inactive')
    setShowOffcanvas(true)
  }

  const handleDelete = (role) => {
    setSelectedRole(role)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setRoles(roles.filter((role) => role.id !== selectedRole.id))
    setShowDeleteModal(false)
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
    setShowOffcanvas(false)
  }

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

      {/* Create/Edit Role Sliding Panel */}
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
          <COffcanvasTitle>{editMode ? 'Edit Role' : 'Create a new role'}</COffcanvasTitle>
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

            <div className="mb-3">
              <CFormLabel htmlFor="description">Description</CFormLabel>
              <CFormTextarea
                id="description"
                rows="4"
                placeholder="Role Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="form-text" style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                0 / 250 characters
              </div>
            </div>

            <div className="mb-3">
              <CFormLabel>Access Control</CFormLabel>
              <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                Define the actions and privileges assigned to this role within the Role Management module.
              </p>

              <CAccordion flush>
                {accessControlSections.map((section) => (
                  <CAccordionItem key={section.id} itemKey={section.id}>
                    <CAccordionHeader>
                      {section.label}
                    </CAccordionHeader>
                    <CAccordionBody>
                      <div className="p-3">
                        Permission settings for {section.label}
                      </div>
                    </CAccordionBody>
                  </CAccordionItem>
                ))}
              </CAccordion>
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
                OK
              </CButton>
            </div>
          </CForm>
        </COffcanvasBody>
      </COffcanvas>
    </div>
  )
}

export default RolesManagement
