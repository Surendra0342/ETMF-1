import React from 'react'
import {
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CFormCheck,
  CCol,
} from '@coreui/react'

const FieldRenderer = ({ field, value, onChange, errors }) => {
  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':
      case 'url':
        return (
          <CFormInput
            type={field.type}
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={errors && errors.length > 0 ? 'is-invalid' : ''}
          />
        )

      case 'date':
      case 'datetime-local':
      case 'time':
        return (
          <CFormInput
            type={field.type}
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={field.disabled}
            className={errors && errors.length > 0 ? 'is-invalid' : ''}
          />
        )

      case 'textarea':
        return (
          <CFormTextarea
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            disabled={field.disabled}
            className={errors && errors.length > 0 ? 'is-invalid' : ''}
          />
        )

      case 'select':
        return (
          <CFormSelect
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={field.disabled}
            className={errors && errors.length > 0 ? 'is-invalid' : ''}
          >
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CFormSelect>
        )

      case 'radio':
        return (
          <div className="radio-group">
            {field.options?.map((option) => (
              <CFormCheck
                key={option.value}
                type="radio"
                id={`${field.name}-${option.value}`}
                name={field.name}
                value={option.value}
                label={option.label}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                disabled={field.disabled}
                className={errors && errors.length > 0 ? 'is-invalid' : ''}
              />
            ))}
          </div>
        )

      case 'checkbox':
        if (field.options) {
          // Multiple checkboxes
          return (
            <div className="checkbox-group">
              {field.options?.map((option) => (
                <CFormCheck
                  key={option.value}
                  type="checkbox"
                  id={`${field.name}-${option.value}`}
                  name={field.name}
                  value={option.value}
                  label={option.label}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={(e) => {
                    const newValue = Array.isArray(value) ? [...value] : []
                    if (e.target.checked) {
                      newValue.push(option.value)
                    } else {
                      const index = newValue.indexOf(option.value)
                      if (index > -1) {
                        newValue.splice(index, 1)
                      }
                    }
                    onChange(newValue)
                  }}
                  disabled={field.disabled}
                  className={errors && errors.length > 0 ? 'is-invalid' : ''}
                />
              ))}
            </div>
          )
        } else {
          // Single checkbox
          return (
            <CFormCheck
              type="checkbox"
              id={field.name}
              name={field.name}
              label={field.checkboxLabel || field.label}
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              disabled={field.disabled}
              className={errors && errors.length > 0 ? 'is-invalid' : ''}
            />
          )
        }

      case 'file':
        return (
          <CFormInput
            type="file"
            id={field.name}
            name={field.name}
            onChange={(e) => onChange(e.target.files[0])}
            accept={field.accept}
            disabled={field.disabled}
            className={errors && errors.length > 0 ? 'is-invalid' : ''}
          />
        )

      case 'range':
        return (
          <div className="range-field">
            <CFormInput
              type="range"
              id={field.name}
              name={field.name}
              value={value || field.validation?.min || 0}
              onChange={(e) => onChange(e.target.value)}
              min={field.validation?.min}
              max={field.validation?.max}
              step={field.step || 1}
              disabled={field.disabled}
              className={errors && errors.length > 0 ? 'is-invalid' : ''}
            />
            <span className="range-value">{value || field.validation?.min || 0}</span>
          </div>
        )

      default:
        return (
          <CFormInput
            type="text"
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={errors && errors.length > 0 ? 'is-invalid' : ''}
          />
        )
    }
  }

  return (
    <CCol md={field.width || 12} className="mb-3">
      <div className="form-field">
        {field.type !== 'checkbox' || field.options ? (
          <CFormLabel htmlFor={field.name}>
            {field.label}
            {field.required && <span className="text-danger ms-1">*</span>}
          </CFormLabel>
        ) : null}

        {field.helpText && <small className="form-text text-muted d-block mb-2">{field.helpText}</small>}

        {renderField()}

        {errors && errors.length > 0 && (
          <div className="invalid-feedback d-block">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
      </div>
    </CCol>
  )
}

export default FieldRenderer
