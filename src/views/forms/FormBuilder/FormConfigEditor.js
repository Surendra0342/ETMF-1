import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CAlert } from '@coreui/react'

const FormConfigEditor = ({ config, onChange }) => {
  const [jsonString, setJsonString] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setJsonString(JSON.stringify(config, null, 2))
  }, [config])

  const handleJsonChange = (e) => {
    setJsonString(e.target.value)
    setError('')
  }

  const handleApplyChanges = () => {
    try {
      const parsedConfig = JSON.parse(jsonString)
      onChange(jsonString)
      setError('')
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
    }
  }

  const handleFormatJson = () => {
    try {
      const parsedConfig = JSON.parse(jsonString)
      setJsonString(JSON.stringify(parsedConfig, null, 2))
      setError('')
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
    }
  }

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>JSON Configuration Editor</strong>
        <div>
          <CButton
            color="secondary"
            size="sm"
            onClick={handleFormatJson}
            className="me-2"
          >
            Format JSON
          </CButton>
          <CButton
            color="primary"
            size="sm"
            onClick={handleApplyChanges}
          >
            Apply Changes
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        {error && (
          <CAlert color="danger" className="mb-3">
            {error}
          </CAlert>
        )}
        <textarea
          className="form-control config-editor"
          value={jsonString}
          onChange={handleJsonChange}
          rows={30}
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        />
        <div className="mt-3">
          <small className="text-muted">
            Edit the JSON configuration above and click "Apply Changes" to update the form.
            The configuration supports various field types, validation rules, and conditional logic.
          </small>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default FormConfigEditor
