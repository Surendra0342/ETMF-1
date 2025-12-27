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
  CFormTextarea,
  CButton,
} from '@coreui/react'

const CreateTrial = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create New Clinical Trial</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="trialId">Trial ID</CFormLabel>
                <CFormInput type="text" id="trialId" placeholder="Enter trial ID" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="trialTitle">Trial Title</CFormLabel>
                <CFormInput type="text" id="trialTitle" placeholder="Enter trial title" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="phase">Phase</CFormLabel>
                <CFormSelect id="phase">
                  <option>Select phase</option>
                  <option value="1">Phase I</option>
                  <option value="2">Phase II</option>
                  <option value="3">Phase III</option>
                  <option value="4">Phase IV</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormTextarea id="description" rows={4} placeholder="Enter trial description" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="targetEnrollment">Target Enrollment</CFormLabel>
                <CFormInput type="number" id="targetEnrollment" placeholder="Enter target enrollment" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="startDate">Start Date</CFormLabel>
                <CFormInput type="date" id="startDate" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="endDate">Expected End Date</CFormLabel>
                <CFormInput type="date" id="endDate" />
              </div>
              <CButton color="primary" type="submit">
                Create Trial
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

export default CreateTrial
