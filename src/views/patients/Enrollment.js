import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'

const Enrollment = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Patient Enrollment</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="trialSelect">Select Trial</CFormLabel>
                <CFormSelect id="trialSelect">
                  <option>Select a trial</option>
                  <option value="CT-001">CT-001 - Phase III Diabetes Study</option>
                  <option value="CT-002">CT-002 - Cancer Immunotherapy Trial</option>
                  <option value="CT-003">CT-003 - Cardiovascular Prevention Study</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="patientId">Patient ID</CFormLabel>
                <CFormInput type="text" id="patientId" placeholder="Auto-generated" disabled />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="age">Age</CFormLabel>
                <CFormInput type="number" id="age" placeholder="Enter patient age" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="gender">Gender</CFormLabel>
                <CFormSelect id="gender">
                  <option>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="enrollmentDate">Enrollment Date</CFormLabel>
                <CFormInput type="date" id="enrollmentDate" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="site">Site</CFormLabel>
                <CFormSelect id="site">
                  <option>Select site</option>
                  <option value="1">Site 1 - General Hospital</option>
                  <option value="2">Site 2 - Research Medical Center</option>
                  <option value="3">Site 3 - University Hospital</option>
                </CFormSelect>
              </div>
              <CButton color="primary" type="submit">
                Enroll Patient
              </CButton>
              <CButton color="secondary" className="ms-2">
                Cancel
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Enrollment
