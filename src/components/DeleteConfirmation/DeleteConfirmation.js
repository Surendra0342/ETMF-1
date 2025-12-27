import React, { useState, useEffect } from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormInput, CFormLabel } from '@coreui/react'
import './DeleteConfirmation.scss'

const DeleteConfirmation = ({
  visible,
  onClose,
  onConfirm,
  itemName = '',
  title = 'Delete Item',
  message = 'This action cannot be undone. This will permanently delete the item.',
  confirmText = 'delete',
  warningText = 'Please type delete to confirm.'
}) => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!visible) {
      setInputValue('')
      setError('')
    }
  }, [visible])

  const handleConfirm = () => {
    if (inputValue.toLowerCase() === confirmText.toLowerCase()) {
      onConfirm()
      setInputValue('')
      setError('')
    } else {
      setError(`Please type "${confirmText}" to confirm`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConfirm()
    }
  }

  return (
    <CModal
      visible={visible}
      onClose={onClose}
      backdrop="static"
      alignment="center"
    >
      <CModalHeader closeButton>
        <CModalTitle className="delete-modal-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="delete-icon">
            <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {title}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="delete-confirmation-content">
          <p className="delete-message">{message}</p>
          {itemName && (
            <div className="delete-item-name">
              <strong>{itemName}</strong>
            </div>
          )}
          <div className="delete-warning">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 7V9M8 11H8.01M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {warningText}
          </div>
          <div className="mt-3">
            <CFormLabel htmlFor="deleteConfirmInput" className="delete-label">
              Type <strong>{confirmText}</strong> to confirm:
            </CFormLabel>
            <CFormInput
              type="text"
              id="deleteConfirmInput"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                setError('')
              }}
              onKeyPress={handleKeyPress}
              placeholder={confirmText}
              className={error ? 'is-invalid' : ''}
              autoComplete="off"
            />
            {error && <div className="invalid-feedback d-block">{error}</div>}
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton
          color="danger"
          onClick={handleConfirm}
          disabled={!inputValue}
        >
          Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteConfirmation
