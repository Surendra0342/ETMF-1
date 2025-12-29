import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol } from '@coreui/react'
import FormRenderer from './FormRenderer'
import FormConfigEditor from './FormConfigEditor'
import { sampleFormConfigs } from './sampleConfigs'
import './FormBuilder.scss'

const FormBuilder = () => {
  const [activeTab, setActiveTab] = useState('builder')
  const [formConfig, setFormConfig] = useState(sampleFormConfigs)
  const [formData, setFormData] = useState({})
  const [submittedData, setSubmittedData] = useState(null)

  const handleConfigChange = (newConfig) => {
    try {
      const parsedConfig = JSON.parse(newConfig)
      setFormConfig(parsedConfig)
      setFormData({})
      setSubmittedData(null)
    } catch (error) {
      console.error('Invalid JSON configuration:', error)
    }
  }

  const handleFormSubmit = (data) => {
    console.log('Form submitted with data:', data)
    setSubmittedData(data)
  }

  const handleFormChange = (data) => {
    setFormData(data)
  }

  return (
    <div className="form-builder-container">
      <CRow className="mb-4">
        <CCol>
          <h2 className="page-title">Dynamic Form Builder</h2>
          <p className="page-description">
            Build and test forms using flexible JSON configurations. The form builder automatically maps various JSON formats from the backend.
          </p>
        </CCol>
      </CRow>

      {/* Tab Navigation */}
      <div className="form-builder-tabs mb-4">
        <CButton
          color={activeTab === 'builder' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('builder')}
          className="me-2"
        >
          Form Preview
        </CButton>
        <CButton
          color={activeTab === 'config' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('config')}
        >
          JSON Configuration
        </CButton>
      </div>

      {activeTab === 'builder' ? (
        <CRow>
          <CCol lg={8}>
            <CCard>
              <CCardHeader>
                <strong>{formConfig.title || 'Dynamic Form'}</strong>
              </CCardHeader>
              <CCardBody>
                <FormRenderer
                  config={formConfig}
                  onSubmit={handleFormSubmit}
                  onChange={handleFormChange}
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol lg={4}>
            {submittedData && (
              <CCard className="mb-3">
                <CCardHeader>
                  <strong>Submitted Data</strong>
                </CCardHeader>
                <CCardBody>
                  <pre className="submitted-data">
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </CCardBody>
              </CCard>
            )}
            <CCard>
              <CCardHeader>
                <strong>Current Form Data</strong>
              </CCardHeader>
              <CCardBody>
                <pre className="current-data">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      ) : (
        <FormConfigEditor
          config={formConfig}
          onChange={handleConfigChange}
        />
      )}

      {/* Documentation Section */}
      <CRow className="mt-4">
        <CCol>
          <CCard>
            <CCardHeader>
              <strong>Supported JSON Format - Key Mappings</strong>
            </CCardHeader>
            <CCardBody>
              <div className="json-mapping-docs">
                <h5>Field Name Mappings:</h5>
                <p>The form builder automatically maps these field properties from different JSON formats:</p>
                <ul>
                  <li><code>name</code>, <code>id</code>, <code>fieldName</code>, <code>key</code> → Field identifier</li>
                  <li><code>type</code>, <code>fieldType</code> → Field type (text, email, select, etc.)</li>
                  <li><code>label</code>, <code>title</code>, <code>fieldLabel</code> → Display label</li>
                  <li><code>placeholder</code> → Placeholder text</li>
                  <li><code>required</code> → Required validation</li>
                  <li><code>disabled</code> → Disabled state</li>
                  <li><code>width</code>, <code>col</code>, <code>columns</code> → Column width (1-12)</li>
                  <li><code>helpText</code>, <code>hint</code>, <code>description</code> → Help text</li>
                  <li><code>options</code>, <code>choices</code>, <code>values</code> → Select/Radio/Checkbox options</li>
                  <li><code>defaultValue</code>, <code>default</code>, <code>value</code> → Default value</li>
                </ul>

                <h5 className="mt-3">Validation Mappings:</h5>
                <ul>
                  <li><code>validation.regex</code>, <code>validation.pattern</code>, <code>pattern</code>, <code>regex</code> → Regex pattern</li>
                  <li><code>validation.message</code>, <code>validation.patternMessage</code> → Validation error message</li>
                  <li><code>minLength</code>, <code>maxLength</code>, <code>min</code>, <code>max</code> → Length/Value constraints</li>
                </ul>

                <h5 className="mt-3">Conditional Logic Mappings:</h5>
                <ul>
                  <li><code>condition.field</code>, <code>conditional.field</code>, <code>showIf.field</code>, <code>dependsOn</code> → Dependent field</li>
                  <li><code>condition.operator</code>, <code>conditional.condition</code> → Comparison operator</li>
                  <li><code>condition.value</code>, <code>conditional.is</code>, <code>conditional.equals</code> → Comparison value</li>
                </ul>

                <h5 className="mt-3">Supported Operators:</h5>
                <p><code>equals</code>, <code>==</code>, <code>===</code>, <code>notEquals</code>, <code>!=</code>, <code>!==</code>,
                <code>contains</code>, <code>includes</code>, <code>greaterThan</code>, <code>&gt;</code>, <code>lessThan</code>,
                <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>, <code>isEmpty</code>, <code>isNotEmpty</code></p>

                <h5 className="mt-3">Example JSON Structure:</h5>
                <pre className="example-json">
{`{
  "title": "Form Title",
  "description": "Form description",
  "sections": [
    {
      "title": "Section Title",
      "fields": [
        {
          "id": "fieldName",
          "type": "text",
          "label": "Field Label",
          "required": true,
          "validation": {
            "regex": "^[A-Za-z]+$",
            "message": "Only letters allowed"
          }
        }
      ]
    }
  ]
}`}
                </pre>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default FormBuilder
