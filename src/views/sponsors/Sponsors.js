import { useState } from 'react'
import { CCol, CRow, CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBriefcase, cilBook, cilCheckCircle, cilPeople, cilArrowLeft } from '@coreui/icons'
import { Card, CardContent, ShadcnTable, DeleteConfirmation, CountrySelect } from 'src/components'

// Country → City → Postal Code hierarchical data
const locationData = {
  'United States': {
    cities: [
      { value: 'new-york', label: 'New York', postalCodes: ['10001', '10002', '10003', '10004', '10005'], defaultPostal: '10001' },
      { value: 'los-angeles', label: 'Los Angeles', postalCodes: ['90001', '90002', '90003', '90004', '90005'], defaultPostal: '90001' },
      { value: 'chicago', label: 'Chicago', postalCodes: ['60601', '60602', '60603', '60604', '60605'], defaultPostal: '60601' },
      { value: 'houston', label: 'Houston', postalCodes: ['77001', '77002', '77003', '77004', '77005'], defaultPostal: '77001' },
      { value: 'phoenix', label: 'Phoenix', postalCodes: ['85001', '85002', '85003', '85004', '85005'], defaultPostal: '85001' },
      { value: 'san-francisco', label: 'San Francisco', postalCodes: ['94102', '94103', '94104', '94105', '94107'], defaultPostal: '94102' },
    ]
  },
  'India': {
    cities: [
      { value: 'mumbai', label: 'Mumbai', postalCodes: ['400001', '400002', '400003', '400004', '400005'], defaultPostal: '400001' },
      { value: 'delhi', label: 'Delhi', postalCodes: ['110001', '110002', '110003', '110004', '110005'], defaultPostal: '110001' },
      { value: 'bangalore', label: 'Bangalore', postalCodes: ['560001', '560002', '560003', '560004', '560005'], defaultPostal: '560001' },
      { value: 'chennai', label: 'Chennai', postalCodes: ['600001', '600002', '600003', '600004', '600005'], defaultPostal: '600001' },
      { value: 'hyderabad', label: 'Hyderabad', postalCodes: ['500001', '500002', '500003', '500004', '500005'], defaultPostal: '500001' },
      { value: 'kolkata', label: 'Kolkata', postalCodes: ['700001', '700002', '700003', '700004', '700005'], defaultPostal: '700001' },
    ]
  },
  'United Kingdom': {
    cities: [
      { value: 'london', label: 'London', postalCodes: ['EC1A', 'EC2A', 'EC3A', 'WC1A', 'WC2A'], defaultPostal: 'EC1A' },
      { value: 'manchester', label: 'Manchester', postalCodes: ['M1', 'M2', 'M3', 'M4', 'M5'], defaultPostal: 'M1' },
      { value: 'birmingham', label: 'Birmingham', postalCodes: ['B1', 'B2', 'B3', 'B4', 'B5'], defaultPostal: 'B1' },
      { value: 'liverpool', label: 'Liverpool', postalCodes: ['L1', 'L2', 'L3', 'L4', 'L5'], defaultPostal: 'L1' },
      { value: 'edinburgh', label: 'Edinburgh', postalCodes: ['EH1', 'EH2', 'EH3', 'EH4', 'EH5'], defaultPostal: 'EH1' },
    ]
  },
  'Germany': {
    cities: [
      { value: 'berlin', label: 'Berlin', postalCodes: ['10115', '10117', '10119', '10178', '10179'], defaultPostal: '10115' },
      { value: 'munich', label: 'Munich', postalCodes: ['80331', '80333', '80335', '80336', '80337'], defaultPostal: '80331' },
      { value: 'frankfurt', label: 'Frankfurt', postalCodes: ['60311', '60313', '60314', '60316', '60318'], defaultPostal: '60311' },
      { value: 'hamburg', label: 'Hamburg', postalCodes: ['20095', '20097', '20099', '20144', '20146'], defaultPostal: '20095' },
    ]
  },
  'France': {
    cities: [
      { value: 'paris', label: 'Paris', postalCodes: ['75001', '75002', '75003', '75004', '75005'], defaultPostal: '75001' },
      { value: 'lyon', label: 'Lyon', postalCodes: ['69001', '69002', '69003', '69004', '69005'], defaultPostal: '69001' },
      { value: 'marseille', label: 'Marseille', postalCodes: ['13001', '13002', '13003', '13004', '13005'], defaultPostal: '13001' },
    ]
  },
  'Canada': {
    cities: [
      { value: 'toronto', label: 'Toronto', postalCodes: ['M5A', 'M5B', 'M5C', 'M5E', 'M5G'], defaultPostal: 'M5A' },
      { value: 'vancouver', label: 'Vancouver', postalCodes: ['V5K', 'V5L', 'V5M', 'V5N', 'V5P'], defaultPostal: 'V5K' },
      { value: 'montreal', label: 'Montreal', postalCodes: ['H2X', 'H2Y', 'H2Z', 'H3A', 'H3B'], defaultPostal: 'H2X' },
    ]
  },
  'Australia': {
    cities: [
      { value: 'sydney', label: 'Sydney', postalCodes: ['2000', '2001', '2002', '2003', '2004'], defaultPostal: '2000' },
      { value: 'melbourne', label: 'Melbourne', postalCodes: ['3000', '3001', '3002', '3003', '3004'], defaultPostal: '3000' },
      { value: 'brisbane', label: 'Brisbane', postalCodes: ['4000', '4001', '4002', '4003', '4004'], defaultPostal: '4000' },
    ]
  },
  'Japan': {
    cities: [
      { value: 'tokyo', label: 'Tokyo', postalCodes: ['100-0001', '100-0002', '100-0003', '100-0004', '100-0005'], defaultPostal: '100-0001' },
      { value: 'osaka', label: 'Osaka', postalCodes: ['530-0001', '530-0002', '530-0003', '530-0004', '530-0005'], defaultPostal: '530-0001' },
      { value: 'kyoto', label: 'Kyoto', postalCodes: ['600-8001', '600-8002', '600-8003', '600-8004', '600-8005'], defaultPostal: '600-8001' },
    ]
  },
  'Singapore': {
    cities: [
      { value: 'singapore', label: 'Singapore', postalCodes: ['018956', '018957', '018958', '018959', '018960'], defaultPostal: '018956' },
    ]
  },
  'United Arab Emirates': {
    cities: [
      { value: 'dubai', label: 'Dubai', postalCodes: ['00000'], defaultPostal: '00000' },
      { value: 'abu-dhabi', label: 'Abu Dhabi', postalCodes: ['00000'], defaultPostal: '00000' },
    ]
  },
}

// Helper function to get cities for a country
const getCitiesForCountry = (country) => {
  return locationData[country]?.cities || []
}

// Helper function to get city data
const getCityData = (country, cityValue) => {
  const cities = getCitiesForCountry(country)
  return cities.find(c => c.value === cityValue)
}

const Sponsors = () => {
  const [showForm, setShowForm] = useState(false)
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

  const resetForm = () => {
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
  }

  const handleCreateNew = () => {
    setEditMode(false)
    setEditingId(null)
    resetForm()
    setShowForm(true)
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
    setShowForm(true)
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

  const handleCancel = () => {
    setShowForm(false)
    setEditMode(false)
    setEditingId(null)
    resetForm()
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
    handleCancel()
  }

  const columns = [
    { key: 'sponsorName', label: 'Sponsor Name', sortable: true },
    { key: 'contactNumber', label: 'Contact Number', sortable: true },
    { key: 'organization', label: 'Organization', sortable: true },
    { key: 'websiteAddress', label: 'Website Address', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ]

  // Render Form View
  if (showForm) {
    return (
      <>
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
                      {editMode ? 'Edit Sponsor' : 'Create New Sponsor'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                      {editMode ? 'Update sponsor information' : 'Fill in the details to create a new sponsor'}
                    </p>
                  </div>
                </div>

                <CForm>
                  {/* Sponsor Information Section */}
                  <div className="mb-4">
                    <h6 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--foreground)' }}>
                      Sponsor Information
                    </h6>
                    <CRow>
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
                    <CCol md={6}>
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
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
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
                    </CCol>
                    <CCol md={6}>
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
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="registrationNumber">Registration Number *</CFormLabel>
                        <CFormInput
                          type="text"
                          id="registrationNumber"
                          value={formData.registrationNumber}
                          onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                        />
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="websiteAddress">Website Address</CFormLabel>
                        <CFormInput
                          type="text"
                          id="websiteAddress"
                          value={formData.websiteAddress}
                          onChange={(e) => setFormData({ ...formData, websiteAddress: e.target.value })}
                        />
                      </div>
                      </CCol>
                    </CRow>
                  </div>

                  {/* Address Information Section */}
                  <div className="mb-4" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                    <h6 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--foreground)' }}>
                      Address Information
                    </h6>
                    <CRow>
                      <CCol md={6}>
                        <div className="mb-3">
                          <CFormLabel htmlFor="addressLine1">Address Line 1</CFormLabel>
                        <CFormInput
                          type="text"
                          id="addressLine1"
                          value={formData.addressLine1}
                          onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                        />
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="addressLine2">Address Line 2</CFormLabel>
                        <CFormInput
                          type="text"
                          id="addressLine2"
                          value={formData.addressLine2}
                          onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                        />
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CountrySelect
                          id="country"
                          label="Country"
                          value={formData.country}
                          onChange={(value) => setFormData({
                            ...formData,
                            country: value,
                            city: '',
                            postalCode: '',
                            district: ''
                          })}
                        />
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="city">City *</CFormLabel>
                        <CFormSelect
                          id="city"
                          value={formData.city}
                          onChange={(e) => {
                            const selectedCity = e.target.value
                            const cityData = getCityData(formData.country, selectedCity)
                            setFormData({
                              ...formData,
                              city: selectedCity,
                              postalCode: cityData ? cityData.defaultPostal : ''
                            })
                          }}
                          disabled={!formData.country}
                        >
                          <option value="">Select city</option>
                          {getCitiesForCountry(formData.country).map(city => (
                            <option key={city.value} value={city.value}>{city.label}</option>
                          ))}
                        </CFormSelect>
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="postalCode">Postal Code</CFormLabel>
                        <CFormSelect
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          disabled={!formData.city}
                        >
                          <option value="">Select postal code</option>
                          {formData.city && getCityData(formData.country, formData.city)?.postalCodes.map(code => (
                            <option key={code} value={code}>{code}</option>
                          ))}
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="district">District *</CFormLabel>
                        <CFormSelect
                          id="district"
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          disabled={!formData.city}
                        >
                          <option value="">Select district</option>
                          <option value="central">Central</option>
                          <option value="north">North</option>
                          <option value="south">South</option>
                          <option value="east">East</option>
                          <option value="west">West</option>
                        </CFormSelect>
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="stateProvince">State/Province/Region</CFormLabel>
                        <CFormSelect
                          id="stateProvince"
                          value={formData.stateProvince}
                          onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
                        >
                          <option value="">Select state/province</option>
                          <option value="ny">New York</option>
                          <option value="ca">California</option>
                        </CFormSelect>
                      </div>
                      </CCol>
                    </CRow>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
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
                    <div className="d-flex gap-2">
                      <CButton color="secondary" onClick={handleCancel}>
                        Cancel
                      </CButton>
                      <CButton
                        style={{ background: '#16a34a', borderColor: '#16a34a', color: 'white' }}
                        onClick={handleSubmit}
                      >
                        {editMode ? 'Update Sponsor' : 'Create Sponsor'}
                      </CButton>
                    </div>
                  </div>
                </CForm>
              </CardContent>
            </Card>
          </CCol>
        </CRow>

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

  // Render Table View
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
