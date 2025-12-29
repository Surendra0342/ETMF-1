import { useState, useEffect } from 'react'
import { CButton, CForm, CRow } from '@coreui/react'
import FieldRenderer from './FieldRenderer'

const FormRenderer = ({ config, onSubmit, onChange }) => {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [visibleFields, setVisibleFields] = useState({})
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true)

  // Normalize config to handle different JSON formats
  const normalizeConfig = (rawConfig) => {
    // If config has sections array (Format 1 - Employee form style)
    if (rawConfig.sections && Array.isArray(rawConfig.sections)) {
      return {
        title: rawConfig.title || 'Form',
        description: rawConfig.description || '',
        submitButtonText: rawConfig.submit?.label || 'Submit',
        submitConditions: rawConfig.submitConditions || rawConfig.submit?.conditions || [],
        sections: rawConfig.sections.map(section => ({
          title: section.title || section.sectionId,
          description: section.description || '',
          fields: section.fields.map(field => normalizeField(field))
        }))
      }
    }

    // If config has fields array directly (Format 2 - Clinical trial style)
    if (rawConfig.fields && Array.isArray(rawConfig.fields)) {
      return {
        title: rawConfig.title || 'Form',
        description: rawConfig.description || '',
        submitButtonText: rawConfig.submitButtonText || 'Submit',
        submitConditions: rawConfig.submitConditions || rawConfig.submit?.conditions || [],
        sections: rawConfig.sections ? rawConfig.sections.map(section => ({
          title: section.title,
          description: section.description,
          fields: section.fields.map(fieldName => {
            const field = rawConfig.fields.find(f => (f.name || f.id) === fieldName)
            return field ? normalizeField(field) : null
          }).filter(Boolean)
        })) : null,
        fields: rawConfig.fields.map(field => normalizeField(field))
      }
    }

    // Default fallback
    return {
      ...rawConfig,
      submitConditions: rawConfig.submitConditions || rawConfig.submit?.conditions || []
    }
  }

  // Normalize individual field to standard format
  const normalizeField = (field) => {
    return {
      name: field.name || field.id || field.fieldName || field.key,
      type: field.type || field.fieldType || 'text',
      label: field.label || field.title || field.fieldLabel,
      placeholder: field.placeholder || '',
      required: field.required || false,
      disabled: field.disabled || false,
      width: field.width || field.col || field.columns || 12,
      rows: field.rows || 3,
      helpText: field.helpText || field.hint || field.description || '',
      checkboxLabel: field.checkboxLabel || field.label,
      defaultValue: field.defaultValue || field.default || field.value,
      options: field.options || field.choices || field.values || [],
      accept: field.accept || field.fileTypes,
      step: field.step || 1,
      validation: normalizeValidation(field),
      condition: normalizeCondition(field.condition || field.conditional || field.showIf)
    }
  }

  // Normalize validation rules
  const normalizeValidation = (field) => {
    const validation = {}

    // Handle different validation formats
    if (field.validation) {
      validation.pattern = field.validation.regex || field.validation.pattern
      validation.patternMessage = field.validation.message || field.validation.patternMessage
      validation.min = field.validation.min
      validation.max = field.validation.max
      validation.minLength = field.validation.minLength
      validation.maxLength = field.validation.maxLength
    }

    // Direct field properties
    if (field.minLength) validation.minLength = field.minLength
    if (field.maxLength) validation.maxLength = field.maxLength
    if (field.min) validation.min = field.min
    if (field.max) validation.max = field.max
    if (field.pattern) validation.pattern = field.pattern
    if (field.regex) validation.pattern = field.regex

    return Object.keys(validation).length > 0 ? validation : null
  }

  // Normalize conditional logic
  const normalizeCondition = (condition) => {
    if (!condition) return null

    return {
      field: condition.field || condition.dependsOn || condition.when,
      operator: condition.operator || condition.condition || 'equals',
      value: condition.value || condition.is || condition.equals
    }
  }

  const normalizedConfig = normalizeConfig(config)

  useEffect(() => {
    // Initialize form data with default values
    const initialData = {}
    const allFields = getAllFields(normalizedConfig)

    allFields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        initialData[field.name] = field.defaultValue
      }
    })
    setFormData(initialData)
  }, [config])

  useEffect(() => {
    // Update visible fields based on conditional logic
    const newVisibleFields = {}
    const allFields = getAllFields(normalizedConfig)

    allFields.forEach((field) => {
      newVisibleFields[field.name] = evaluateCondition(field.condition, formData)
    })
    setVisibleFields(newVisibleFields)
  }, [formData, config])

  useEffect(() => {
    // Notify parent of data changes
    if (onChange) {
      onChange(formData)
    }
  }, [formData, onChange])

  useEffect(() => {
    // Evaluate submit button conditions
    if (!normalizedConfig.submitConditions || normalizedConfig.submitConditions.length === 0) {
      setIsSubmitEnabled(true)
      return
    }

    // All conditions must be met for submit to be enabled
    const allConditionsMet = normalizedConfig.submitConditions.every((condition) => {
      return evaluateCondition(condition, formData)
    })

    setIsSubmitEnabled(allConditionsMet)
  }, [formData, config])

  // Get all fields from normalized config
  const getAllFields = (config) => {
    if (config.sections) {
      return config.sections.flatMap(section => section.fields || [])
    }
    return config.fields || []
  }

  const evaluateCondition = (condition, data) => {
    if (!condition) return true

    const { field, operator, value } = condition
    let fieldValue = data[field]

    // Convert string boolean values to actual booleans for comparison
    let compareValue = value
    if (value === 'true' || value === 'false') {
      compareValue = value === 'true'
    }

    switch (operator) {
      case 'equals':
      case '==':
      case '===':
        return fieldValue === compareValue
      case 'notEquals':
      case '!=':
      case '!==':
        return fieldValue !== compareValue
      case 'contains':
      case 'includes':
        return Array.isArray(fieldValue) && fieldValue.includes(compareValue)
      case 'greaterThan':
      case '>':
        return Number(fieldValue) > Number(compareValue)
      case 'lessThan':
      case '<':
        return Number(fieldValue) < Number(compareValue)
      case 'greaterThanOrEqual':
      case '>=':
        return Number(fieldValue) >= Number(compareValue)
      case 'lessThanOrEqual':
      case '<=':
        return Number(fieldValue) <= Number(compareValue)
      case 'isEmpty':
      case 'empty':
        return !fieldValue || fieldValue === ''
      case 'isNotEmpty':
      case 'notEmpty':
        return fieldValue && fieldValue !== ''
      default:
        return true
    }
  }

  const validateField = (field, value) => {
    const fieldErrors = []

    // Required validation
    if (field.required && (!value || value === '')) {
      fieldErrors.push(`${field.label} is required`)
    }

    // Type-specific validations
    if (value && field.validation) {
      const { min, max, pattern, minLength, maxLength } = field.validation

      // Min/Max for numbers
      if (field.type === 'number' && min !== undefined && Number(value) < min) {
        fieldErrors.push(`${field.label} must be at least ${min}`)
      }
      if (field.type === 'number' && max !== undefined && Number(value) > max) {
        fieldErrors.push(`${field.label} must be at most ${max}`)
      }

      // MinLength/MaxLength for text
      if (minLength && value.length < minLength) {
        fieldErrors.push(`${field.label} must be at least ${minLength} characters`)
      }
      if (maxLength && value.length > maxLength) {
        fieldErrors.push(`${field.label} must be at most ${maxLength} characters`)
      }

      // Pattern validation
      if (pattern) {
        const regex = new RegExp(pattern)
        if (!regex.test(value)) {
          fieldErrors.push(field.validation.patternMessage || `${field.label} format is invalid`)
        }
      }
    }

    return fieldErrors
  }

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))

    // Clear errors for this field
    setErrors((prev) => ({
      ...prev,
      [fieldName]: [],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate all visible fields
    const newErrors = {}
    let hasErrors = false
    const allFields = getAllFields(normalizedConfig)

    allFields.forEach((field) => {
      if (visibleFields[field.name]) {
        const fieldErrors = validateField(field, formData[field.name])
        if (fieldErrors.length > 0) {
          newErrors[field.name] = fieldErrors
          hasErrors = true
        }
      }
    })

    setErrors(newErrors)

    if (!hasErrors && onSubmit) {
      onSubmit(formData)
    }
  }

  const renderSection = (section, sectionIndex) => {
    return (
      <div key={sectionIndex} className="form-section mb-4">
        <h4 className="form-section-title">{section.title}</h4>
        {section.description && (
          <p className="form-section-description">{section.description}</p>
        )}
        <CRow className="form-section-fields">
          {section.fields.map((field, fieldIndex) => {
            if (!field || !visibleFields[field.name]) return null

            return (
              <FieldRenderer
                key={field.name || fieldIndex}
                field={field}
                value={formData[field.name]}
                onChange={(value) => handleFieldChange(field.name, value)}
                errors={errors[field.name]}
              />
            )
          })}
        </CRow>
      </div>
    )
  }

  return (
    <CForm onSubmit={handleSubmit} className="dynamic-form">
      {normalizedConfig.description && (
        <p className="form-description mb-4">{normalizedConfig.description}</p>
      )}

      {normalizedConfig.sections ? (
        normalizedConfig.sections.map((section, index) => renderSection(section, index))
      ) : (
        <CRow className="form-fields">
          {normalizedConfig.fields?.map((field, index) => {
            if (!visibleFields[field.name]) return null

            return (
              <FieldRenderer
                key={field.name || index}
                field={field}
                value={formData[field.name]}
                onChange={(value) => handleFieldChange(field.name, value)}
                errors={errors[field.name]}
              />
            )
          })}
        </CRow>
      )}

      <div className="form-actions mt-4">
        <CButton type="submit" color="primary" size="lg" disabled={!isSubmitEnabled}>
          {normalizedConfig.submitButtonText || 'Submit Form'}
        </CButton>
      </div>
    </CForm>
  )
}

export default FormRenderer
