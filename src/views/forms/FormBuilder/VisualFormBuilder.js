import { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormInput, CFormLabel, CFormSelect, CFormCheck } from '@coreui/react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {
  MdTextFields,
  MdEmail,
  MdNumbers,
  MdPhone,
  MdCalendarToday,
  MdNotes,
  MdArrowDropDownCircle,
  MdRadioButtonChecked,
  MdCheckBox,
  MdUploadFile,
  MdEdit,
  MdDelete,
  MdAdd,
  MdContentCopy,
  MdSave,
  MdArrowDownward
} from 'react-icons/md'
import FormRenderer from './FormRenderer'
import './VisualFormBuilder.scss'

// Field types available in the palette
const FIELD_TYPES = [
  { type: 'text', label: 'Text Input', icon: MdTextFields },
  { type: 'email', label: 'Email Input', icon: MdEmail },
  { type: 'number', label: 'Number Input', icon: MdNumbers },
  { type: 'tel', label: 'Phone Input', icon: MdPhone },
  { type: 'date', label: 'Date Picker', icon: MdCalendarToday },
  { type: 'textarea', label: 'Text Area', icon: MdNotes },
  { type: 'select', label: 'Dropdown', icon: MdArrowDropDownCircle },
  { type: 'radio', label: 'Radio Buttons', icon: MdRadioButtonChecked },
  { type: 'checkbox', label: 'Checkboxes', icon: MdCheckBox },
  { type: 'file', label: 'File Upload', icon: MdUploadFile },
]

// Draggable field palette item
const FieldPaletteItem = ({ fieldType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FIELD',
    item: { fieldType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const IconComponent = fieldType.icon

  return (
    <div
      ref={drag}
      className={`field-palette-item ${isDragging ? 'dragging' : ''}`}
    >
      <span className="field-icon">
        <IconComponent size={24} />
      </span>
      <span className="field-label">{fieldType.label}</span>
    </div>
  )
}

// Draggable field in canvas
const CanvasField = ({ field, index, moveField, removeField, editField }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CANVAS_FIELD',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [, drop] = useDrop(() => ({
    accept: 'CANVAS_FIELD',
    hover: (item) => {
      if (item.index !== index) {
        moveField(item.index, index)
        item.index = index
      }
    },
  }))

  const getFieldIcon = (type) => {
    const fieldType = FIELD_TYPES.find(ft => ft.type === type)
    return fieldType ? fieldType.icon : MdTextFields
  }

  const IconComponent = getFieldIcon(field.type)

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`canvas-field ${isDragging ? 'dragging' : ''}`}
    >
      <div className="field-header">
        <span className="field-icon-badge">
          <IconComponent size={24} />
        </span>
        <span className="field-type-badge">{field.type}</span>
        <span className="field-name">{field.label || field.name}</span>
        <div className="field-actions">
          <CButton
            size="sm"
            color="light"
            onClick={() => editField(index)}
          >
            <MdEdit size={18} />
          </CButton>
          <CButton
            size="sm"
            color="danger"
            onClick={() => removeField(index)}
          >
            <MdDelete size={18} />
          </CButton>
        </div>
      </div>
      <div className="field-preview">
        {field.placeholder && <small className="text-muted">Placeholder: {field.placeholder}</small>}
        {field.required && <span className="required-badge">Required</span>}
        {field.options && field.options.length > 0 && (
          <small className="text-muted ms-2">({field.options.length} options)</small>
        )}
      </div>
    </div>
  )
}

// Drop zone for canvas
const FormCanvas = ({ fields, onDrop, moveField, removeField, editField }) => {
  const [, drop] = useDrop(() => ({
    accept: 'FIELD',
    drop: (item) => {
      onDrop(item.fieldType)
    },
  }))

  return (
    <div ref={drop} className="form-canvas">
      {fields.length === 0 ? (
        <div className="empty-canvas">
          <p>Drag and drop fields here to build your form</p>
          <span className="drop-icon">
            <MdArrowDownward size={48} />
          </span>
        </div>
      ) : (
        fields.map((field, index) => (
          <CanvasField
            key={index}
            field={field}
            index={index}
            moveField={moveField}
            removeField={removeField}
            editField={editField}
          />
        ))
      )}
    </div>
  )
}

// Field configuration modal
const FieldConfigModal = ({ visible, field, onSave, onClose }) => {
  const [config, setConfig] = useState(field || {})

  // Reset config when field changes or modal opens
  useEffect(() => {
    if (visible && field) {
      setConfig({ ...field })
    }
  }, [visible, field])

  const handleChange = (key, value) => {
    setConfig({ ...config, [key]: value })
  }

  const handleOptionsChange = (value) => {
    const options = value.split('\n').filter(opt => opt.trim()).map(opt => ({
      label: opt.trim(),
      value: opt.trim().toLowerCase().replace(/\s+/g, '_')
    }))
    setConfig({ ...config, options })
  }

  const handleSave = () => {
    onSave(config)
  }

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>Configure Field</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Field Name (ID)</CFormLabel>
            <CFormInput
              value={config.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="fieldName"
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel>Field Label</CFormLabel>
            <CFormInput
              value={config.label || ''}
              onChange={(e) => handleChange('label', e.target.value)}
              placeholder="Field Label"
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel>Placeholder</CFormLabel>
            <CFormInput
              value={config.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              placeholder="Enter placeholder text"
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel>Help Text</CFormLabel>
            <CFormInput
              value={config.helpText || ''}
              onChange={(e) => handleChange('helpText', e.target.value)}
              placeholder="Help text"
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={4}>
            <CFormLabel>Column Width (1-12)</CFormLabel>
            <CFormSelect
              value={config.width || 12}
              onChange={(e) => handleChange('width', parseInt(e.target.value))}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={4}>
            <CFormCheck
              id="required"
              label="Required"
              checked={config.required || false}
              onChange={(e) => handleChange('required', e.target.checked)}
            />
          </CCol>
          <CCol md={4}>
            <CFormCheck
              id="disabled"
              label="Disabled"
              checked={config.disabled || false}
              onChange={(e) => handleChange('disabled', e.target.checked)}
            />
          </CCol>
        </CRow>

        {(config.type === 'select' || config.type === 'radio' || config.type === 'checkbox') && (
          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Options (one per line)</CFormLabel>
              <textarea
                className="form-control"
                rows={5}
                value={config.options?.map(opt => opt.label).join('\n') || ''}
                onChange={(e) => handleOptionsChange(e.target.value)}
                placeholder="Option 1&#10;Option 2&#10;Option 3"
              />
              <small className="text-muted">Each line will be an option</small>
            </CCol>
          </CRow>
        )}

        {config.type === 'number' && (
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Min Value</CFormLabel>
              <CFormInput
                type="number"
                value={config.validation?.min || ''}
                onChange={(e) => handleChange('validation', { ...config.validation, min: e.target.value })}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Max Value</CFormLabel>
              <CFormInput
                type="number"
                value={config.validation?.max || ''}
                onChange={(e) => handleChange('validation', { ...config.validation, max: e.target.value })}
              />
            </CCol>
          </CRow>
        )}

        {(config.type === 'text' || config.type === 'textarea') && (
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Min Length</CFormLabel>
              <CFormInput
                type="number"
                value={config.validation?.minLength || ''}
                onChange={(e) => handleChange('validation', { ...config.validation, minLength: parseInt(e.target.value) })}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Max Length</CFormLabel>
              <CFormInput
                type="number"
                value={config.validation?.maxLength || ''}
                onChange={(e) => handleChange('validation', { ...config.validation, maxLength: parseInt(e.target.value) })}
              />
            </CCol>
          </CRow>
        )}

        {/* Conditional Logic / Dependencies */}
        <CRow className="mb-3">
          <CCol>
            <h6 className="mb-2">Conditional Logic (Optional)</h6>
            <small className="text-muted d-block mb-2">
              Show this field only when another field meets a condition
            </small>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={4}>
            <CFormLabel>Depends On Field</CFormLabel>
            <CFormInput
              value={config.condition?.field || ''}
              onChange={(e) => handleChange('condition', { ...config.condition, field: e.target.value })}
              placeholder="field_name"
            />
          </CCol>
          <CCol md={4}>
            <CFormLabel>Condition</CFormLabel>
            <CFormSelect
              value={config.condition?.operator || 'equals'}
              onChange={(e) => handleChange('condition', { ...config.condition, operator: e.target.value })}
            >
              <option value="equals">Equals</option>
              <option value="notEquals">Not Equals</option>
              <option value="contains">Contains</option>
              <option value="isEmpty">Is Empty</option>
              <option value="isNotEmpty">Is Not Empty</option>
              <option value="greaterThan">Greater Than</option>
              <option value="lessThan">Less Than</option>
            </CFormSelect>
          </CCol>
          <CCol md={4}>
            <CFormLabel>Value</CFormLabel>
            <CFormInput
              value={config.condition?.value || ''}
              onChange={(e) => handleChange('condition', { ...config.condition, value: e.target.value })}
              placeholder="Expected value"
            />
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Save Field
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

const VisualFormBuilder = () => {
  const [fields, setFields] = useState([])
  const [formTitle, setFormTitle] = useState('My Custom Form')
  const [formDescription, setFormDescription] = useState('')
  const [submitConditions, setSubmitConditions] = useState([])
  const [configModalVisible, setConfigModalVisible] = useState(false)
  const [editingFieldIndex, setEditingFieldIndex] = useState(null)
  const [previewMode, setPreviewMode] = useState(false)

  // Handle dropping a new field from palette
  const handleDrop = (fieldType) => {
    const newField = {
      name: `field_${fields.length + 1}`,
      type: fieldType.type,
      label: `${fieldType.label} ${fields.length + 1}`,
      placeholder: '',
      required: false,
      width: 12,
      validation: {}
    }

    setFields([...fields, newField])
    setEditingFieldIndex(fields.length)
    setConfigModalVisible(true)
  }

  // Move field within canvas (reorder)
  const moveField = (fromIndex, toIndex) => {
    const updatedFields = [...fields]
    const [movedField] = updatedFields.splice(fromIndex, 1)
    updatedFields.splice(toIndex, 0, movedField)
    setFields(updatedFields)
  }

  // Remove field from canvas
  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  // Edit field configuration
  const editField = (index) => {
    setEditingFieldIndex(index)
    setConfigModalVisible(true)
  }

  // Save field configuration
  const saveFieldConfig = (config) => {
    const updatedFields = [...fields]
    updatedFields[editingFieldIndex] = config
    setFields(updatedFields)
    setConfigModalVisible(false)
    setEditingFieldIndex(null)
  }

  // Generate JSON configuration
  const generateJSON = () => {
    return {
      title: formTitle,
      description: formDescription,
      submitButtonText: 'Submit Form',
      submitConditions: submitConditions,
      fields: fields
    }
  }

  // Export JSON
  const exportJSON = () => {
    const json = generateJSON()
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'form-config.json'
    a.click()
  }

  // Copy JSON to clipboard
  const copyJSON = () => {
    const json = JSON.stringify(generateJSON(), null, 2)
    navigator.clipboard.writeText(json)
    alert('JSON copied to clipboard!')
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="visual-form-builder">
        <CRow className="mb-4">
          <CCol>
            <h2 className="page-title">Visual Form Builder</h2>
            <p className="page-description">
              Drag and drop fields to build your custom form. No coding required!
            </p>
          </CCol>
        </CRow>

        {/* Form Settings */}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Form Settings</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={6}>
                <CFormLabel>Form Title</CFormLabel>
                <CFormInput
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Enter form title"
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Form Description</CFormLabel>
                <CFormInput
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Enter form description"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        {/* Submit Button Conditions */}
        {fields.length > 0 && (
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Submit Button Conditions (Optional)</strong>
              <CButton
                size="sm"
                color="primary"
                onClick={() => {
                  setSubmitConditions([
                    ...submitConditions,
                    { field: '', operator: 'equals', value: '' }
                  ])
                }}
              >
                <MdAdd size={18} className="me-1" /> Add Condition
              </CButton>
            </CCardHeader>
            <CCardBody>
              {submitConditions.length === 0 ? (
                <p className="text-muted mb-0">
                  Add conditions to control when the submit button should be enabled.
                  For example: "Enable submit button only when user agrees to terms checkbox is checked"
                </p>
              ) : (
                submitConditions.map((condition, index) => (
                  <CRow key={index} className="mb-3 align-items-end">
                    <CCol md={4}>
                      <CFormLabel>Field Name</CFormLabel>
                      <CFormSelect
                        value={condition.field}
                        onChange={(e) => {
                          const updated = [...submitConditions]
                          updated[index].field = e.target.value
                          setSubmitConditions(updated)
                        }}
                      >
                        <option value="">Select field...</option>
                        {fields.map((field) => (
                          <option key={field.name} value={field.name}>
                            {field.label} ({field.name})
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel>Condition</CFormLabel>
                      <CFormSelect
                        value={condition.operator}
                        onChange={(e) => {
                          const updated = [...submitConditions]
                          updated[index].operator = e.target.value
                          setSubmitConditions(updated)
                        }}
                      >
                        <option value="equals">Equals</option>
                        <option value="notEquals">Not Equals</option>
                        <option value="contains">Contains</option>
                        <option value="isEmpty">Is Empty</option>
                        <option value="isNotEmpty">Is Not Empty</option>
                        <option value="greaterThan">Greater Than</option>
                        <option value="lessThan">Less Than</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel>Value</CFormLabel>
                      <CFormInput
                        value={condition.value}
                        onChange={(e) => {
                          const updated = [...submitConditions]
                          updated[index].value = e.target.value
                          setSubmitConditions(updated)
                        }}
                        placeholder="Expected value (e.g., true, false, text)"
                      />
                      <small className="text-muted">
                        For checkbox: use "true" or "false"
                      </small>
                    </CCol>
                    <CCol md={1}>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => {
                          setSubmitConditions(submitConditions.filter((_, i) => i !== index))
                        }}
                      >
                        <MdDelete size={18} />
                      </CButton>
                    </CCol>
                  </CRow>
                ))
              )}
            </CCardBody>
          </CCard>
        )}

        {/* Main Builder Area */}
        <CRow>
          {/* Field Palette */}
          <CCol lg={3}>
            <CCard>
              <CCardHeader>
                <strong>Field Components</strong>
              </CCardHeader>
              <CCardBody>
                <div className="field-palette">
                  {FIELD_TYPES.map((fieldType) => (
                    <FieldPaletteItem key={fieldType.type} fieldType={fieldType} />
                  ))}
                </div>
              </CCardBody>
            </CCard>
          </CCol>

          {/* Form Canvas */}
          <CCol lg={9}>
            <CCard>
              <CCardHeader className="d-flex justify-content-between align-items-center">
                <strong>Form Canvas ({fields.length} fields)</strong>
                <div>
                  <CButton
                    color={previewMode ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="me-2"
                  >
                    {previewMode ? 'Edit Mode' : 'Preview Mode'}
                  </CButton>
                  <CButton
                    color="success"
                    size="sm"
                    onClick={copyJSON}
                    className="me-2"
                    disabled={fields.length === 0}
                  >
                    <MdContentCopy size={18} className="me-1" /> Copy JSON
                  </CButton>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={exportJSON}
                    disabled={fields.length === 0}
                  >
                    <MdSave size={18} className="me-1" /> Export JSON
                  </CButton>
                </div>
              </CCardHeader>
              <CCardBody>
                {previewMode ? (
                  <FormRenderer
                    config={generateJSON()}
                    onSubmit={(data) => {
                      console.log('Form submitted:', data)
                      alert('Form submitted! Check console for data.')
                    }}
                  />
                ) : (
                  <FormCanvas
                    fields={fields}
                    onDrop={handleDrop}
                    moveField={moveField}
                    removeField={removeField}
                    editField={editField}
                  />
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* JSON Output */}
        {fields.length > 0 && (
          <CCard className="mt-4">
            <CCardHeader>
              <strong>Generated JSON Configuration</strong>
            </CCardHeader>
            <CCardBody>
              <pre className="json-output">
                {JSON.stringify(generateJSON(), null, 2)}
              </pre>
            </CCardBody>
          </CCard>
        )}

        {/* Field Configuration Modal */}
        <FieldConfigModal
          visible={configModalVisible}
          field={editingFieldIndex !== null ? fields[editingFieldIndex] : {}}
          onSave={saveFieldConfig}
          onClose={() => {
            setConfigModalVisible(false)
            setEditingFieldIndex(null)
          }}
        />
      </div>
    </DndProvider>
  )
}

export default VisualFormBuilder
