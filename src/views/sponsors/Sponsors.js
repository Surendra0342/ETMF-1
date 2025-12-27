import { useState } from 'react'
import { CCol, CRow, COffcanvas, COffcanvasHeader, COffcanvasTitle, COffcanvasBody, CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBriefcase, cilBook, cilCheckCircle, cilPeople } from '@coreui/icons'
import { Card, CardContent, ShadcnTable, DeleteConfirmation } from 'src/components'

const Sponsors = () => {
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [sponsors, setSponsors] = useState([
    {
      id: 'SP-001',
      sponsorName: 'Pharma Global Inc.',
      email: 'contact@pharmaglobal.com',
      contactNumber: '+91 9876543210',
      country: 'India',
      organization: 'Pharma Global Inc.',
      websiteAddress: 'www.pharmaglobal.com',
      status: 'Active',
      type: 'Pharmaceutical',
    },
    {
      id: 'SP-002',
      sponsorName: 'Medical Research Corp.',
      email: 'info@medresearch.com',
      contactNumber: '+91 9876543211',
      country: 'India',
      organization: 'Medical Research Corporation',
      websiteAddress: 'www.medresearch.com',
      status: 'Active',
      type: 'Research',
    },
    {
      id: 'SP-003',
      sponsorName: 'BioTech Solutions',
      email: 'hello@biotech.com',
      contactNumber: '+91 9876543212',
      country: 'India',
      organization: 'BioTech Solutions Pvt. Ltd.',
      websiteAddress: 'www.biotech.com',
      status: 'Inactive',
      type: 'Biotechnology',
    },
    {
      id: 'SP-004',
      sponsorName: 'Health Innovations',
      email: 'support@healthinnovations.com',
      contactNumber: '+91 9876543213',
      country: 'India',
      organization: 'Health Innovations Ltd.',
      websiteAddress: 'www.healthinnovations.com',
      status: 'Active',
      type: 'Healthcare',
    },
  ])

  const [formData, setFormData] = useState({
    sponsorName: '',
    contactNumber: '',
    email: '',
    organizationName: '',
    registrationNumber: '',
    websiteAddress: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    district: '',
    stateProvince: '',
    country: '',
    markAsInactive: false
  })

  const handleCreateNew = () => {
    setEditMode(false)
    setEditingId(null)
    setFormData({
      sponsorName: '',
      contactNumber: '',
      email: '',
      organizationName: '',
      registrationNumber: '',
      websiteAddress: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      postalCode: '',
      district: '',
      stateProvince: '',
      country: '',
      markAsInactive: false
    })
    setShowModal(true)
  }

  const handleEdit = (row) => {
    setEditMode(true)
    setEditingId(row.id)
    setFormData({
      sponsorName: row.sponsorName || '',
      contactNumber: row.contactNumber || '',
      email: row.email || '',
      organizationName: row.organization || '',
      registrationNumber: '',
      websiteAddress: row.websiteAddress || '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      postalCode: '',
      district: '',
      stateProvince: '',
      country: row.country || '',
      markAsInactive: row.status === 'Inactive'
    })
    setShowModal(true)
  }

  const handleDelete = (row) => {
    setDeleteTarget(row)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (deleteTarget) {
      setSponsors(sponsors.filter(s => s.id !== deleteTarget.id))
      setShowDeleteModal(false)
      setDeleteTarget(null)
    }
  }

  const handleSubmit = () => {
    if (editMode && editingId) {
      // Update existing sponsor
      setSponsors(sponsors.map(s =>
        s.id === editingId
          ? {
              ...s,
              sponsorName: formData.sponsorName,
              contactNumber: formData.contactNumber,
              email: formData.email,
              organization: formData.organizationName,
              websiteAddress: formData.websiteAddress,
              country: formData.country,
              status: formData.markAsInactive ? 'Inactive' : 'Active'
            }
          : s
      ))
    } else {
      // Create new sponsor
      const newSponsor = {
        id: `SP-${String(sponsors.length + 1).padStart(3, '0')}`,
        sponsorName: formData.sponsorName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        country: formData.country,
        organization: formData.organizationName,
        websiteAddress: formData.websiteAddress,
        status: formData.markAsInactive ? 'Inactive' : 'Active',
        type: 'Pharmaceutical',
      }
      setSponsors([...sponsors, newSponsor])
    }
    setShowModal(false)
  }

  const columns = [
    { key: 'sponsorName', label: 'Sponsor Name', sortable: true },
    { key: 'contactNumber', label: 'Contact Number', sortable: true },
    { key: 'organization', label: 'Organization', sortable: true },
    { key: 'websiteAddress', label: 'Website Address', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ]

  return (
    <>
      <CRow className="mb-4">
        <CCol sm={6} lg={3}>
          <Card className="mb-4">
            <CardContent>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {String(sponsors.length).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.05em' }}>
                    Total Sponsors
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                    Registered sponsors
                  </div>
                </div>
                <div style={{ fontSize: '1.5rem', color: 'var(--muted-foreground)' }}>
                  <CIcon icon={cilBriefcase} />
                </div>
              </div>
            </CardContent>
          </Card>
        </CCol>
        <CCol sm={6} lg={3}>
          <Card className="mb-4">
            <CardContent>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    02
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.05em' }}>
                    Total Studies
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                    All studies
                  </div>
                </div>
                <div style={{ fontSize: '1.5rem', color: 'var(--muted-foreground)' }}>
                  <CIcon icon={cilBook} />
                </div>
              </div>
            </CardContent>
          </Card>
        </CCol>
        <CCol sm={6} lg={3}>
          <Card className="mb-4">
            <CardContent>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    02
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.05em' }}>
                    Active Studies
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                    Currently running
                  </div>
                </div>
                <div style={{ fontSize: '1.5rem', color: 'var(--muted-foreground)' }}>
                  <CIcon icon={cilCheckCircle} />
                </div>
              </div>
            </CardContent>
          </Card>
        </CCol>
        <CCol sm={6} lg={3}>
          <Card className="mb-4">
            <CardContent>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    02
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.05em' }}>
                    Total Assigned Members
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                    Study contacts
                  </div>
                </div>
                <div style={{ fontSize: '1.5rem', color: 'var(--muted-foreground)' }}>
                  <CIcon icon={cilPeople} />
                </div>
              </div>
            </CardContent>
          </Card>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12}>
          <ShadcnTable
            data={sponsors}
            columns={columns}
            title="All Sponsors"
            subtitle="Manage clinical trial sponsors and their organizations"
            headerAction={
              <button
                className="btn-primary"
                style={{ background: '#16a34a', borderColor: '#16a34a' }}
                onClick={handleCreateNew}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
                Create Sponsor
              </button>
            }
            showImportButton={false}
            showExportButton={false}
            enableFilters={false}
            enableSelection={false}
            enableActions={true}
            searchPlaceholder="Search sponsors..."
            actionMenuItems={[
              { label: 'Edit', onClick: handleEdit },
              { label: 'View Details', onClick: (row) => console.log('View details', row) },
              { type: 'divider' },
              { label: 'Delete', onClick: handleDelete, danger: true }
            ]}
          />
        </CCol>
      </CRow>

      {/* Create/Edit Sponsor Sliding Panel */}
      <COffcanvas
        placement="end"
        visible={showModal}
        onHide={() => setShowModal(false)}
        backdrop={true}
        scroll={false}
        style={{
          width: '600px',
          maxWidth: '100%'
        }}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>{editMode ? 'Edit Sponsor' : 'Create a new sponsor'}</COffcanvasTitle>
          <CButton
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowModal(false)}
          />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CForm>
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

            <div className="mb-3">
              <CFormLabel htmlFor="contactNumber">Contact Number *</CFormLabel>
              <CFormInput
                type="tel"
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="email">Email Address *</CFormLabel>
              <CFormInput
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="organizationName">Organization Name *</CFormLabel>
              <CFormInput
                type="text"
                id="organizationName"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="registrationNumber">Registration Number *</CFormLabel>
              <CFormInput
                type="text"
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="websiteAddress">Website Address</CFormLabel>
              <CFormInput
                type="text"
                id="websiteAddress"
                value={formData.websiteAddress}
                onChange={(e) => setFormData({ ...formData, websiteAddress: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="addressLine1">Address Line 1</CFormLabel>
              <CFormInput
                type="text"
                id="addressLine1"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="addressLine2">Address Line 2</CFormLabel>
              <CFormInput
                type="text"
                id="addressLine2"
                value={formData.addressLine2}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="city">City *</CFormLabel>
              <CFormSelect
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                <option value="">auto-complete dropdown</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
              </CFormSelect>
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="postalCode">Postal Code</CFormLabel>
              <CFormSelect
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              >
                <option value="">auto-complete dropdown</option>
                <option value="10001">10001</option>
                <option value="90001">90001</option>
              </CFormSelect>
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="district">District *</CFormLabel>
              <CFormSelect
                id="district"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              >
                <option value="">auto-complete dropdown</option>
                <option value="manhattan">Manhattan</option>
                <option value="brooklyn">Brooklyn</option>
              </CFormSelect>
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="country">Country</CFormLabel>
              <CFormSelect
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              >
                <option value="">auto-complete dropdown</option>
                <option value="india">India</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
              </CFormSelect>
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="stateProvince">State/Province/Region</CFormLabel>
              <CFormSelect
                id="stateProvince"
                value={formData.stateProvince}
                onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
              >
                <option value="">auto-complete dropdown</option>
                <option value="ny">New York</option>
                <option value="ca">California</option>
              </CFormSelect>
            </div>

            <div className="mb-3">
              <div className="form-check form-switch">
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
            </div>

            <div className="d-flex gap-2 justify-content-end mt-4">
              <CButton color="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </CButton>
              <CButton
                style={{ background: '#16a34a', borderColor: '#16a34a', color: 'white' }}
                onClick={handleSubmit}
              >
                {editMode ? 'Update Sponsor' : 'Create Sponsor'}
              </CButton>
            </div>
          </CForm>
        </COffcanvasBody>
      </COffcanvas>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation
        visible={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setDeleteTarget(null)
        }}
        onConfirm={confirmDelete}
        itemName={deleteTarget?.sponsorName}
        title="Delete Sponsor"
        message="This action cannot be undone. This will permanently delete the sponsor and remove all associated data."
        confirmText="delete"
        warningText="Please type delete to confirm."
      />
    </>
  )
}

export default Sponsors
