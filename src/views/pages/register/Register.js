import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormCheck,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMedicalCross } from '@coreui/icons'
import './Register.scss'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // On success, navigate to login or dashboard
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="register-page">
      <CContainer>
        <CRow className="justify-content-center align-items-center min-vh-100">
          <CCol lg={6} md={8} sm={10}>
            <div className="register-card">
              {/* Logo and Title */}
              <div className="register-header">
                <div className="register-logo">
                  <CIcon icon={cilMedicalCross} size="xl" />
                </div>
                <h1 className="register-title">Create Account</h1>
                <p className="register-subtitle">Join Clinical Trials Management System</p>
              </div>

              {/* Register Form */}
              <CCard className="border-0 shadow-sm">
                <CCardBody className="p-4">
                  <CForm onSubmit={handleSubmit}>
                    {/* Full Name Field */}
                    <div className="mb-3">
                      <CFormLabel htmlFor="fullName" className="form-label">
                        Full Name
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        invalid={!!errors.fullName}
                        className="form-input"
                      />
                      {errors.fullName && (
                        <div className="invalid-feedback d-block">{errors.fullName}</div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-3">
                      <CFormLabel htmlFor="email" className="form-label">
                        Email
                      </CFormLabel>
                      <CFormInput
                        type="email"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        invalid={!!errors.email}
                        className="form-input"
                      />
                      {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                      <CFormLabel htmlFor="password" className="form-label">
                        Password
                      </CFormLabel>
                      <CFormInput
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        invalid={!!errors.password}
                        className="form-input"
                      />
                      {errors.password && (
                        <div className="invalid-feedback d-block">{errors.password}</div>
                      )}
                      {!errors.password && formData.password && (
                        <div className="password-hint">
                          Must be at least 8 characters with uppercase, lowercase, and number
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-3">
                      <CFormLabel htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </CFormLabel>
                      <CFormInput
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        invalid={!!errors.confirmPassword}
                        className="form-input"
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
                      )}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="mb-4">
                      <CFormCheck
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="terms-check"
                        label={
                          <span>
                            I agree to the{' '}
                            <a href="/terms" className="terms-link">
                              Terms and Conditions
                            </a>{' '}
                            and{' '}
                            <a href="/privacy" className="terms-link">
                              Privacy Policy
                            </a>
                          </span>
                        }
                      />
                      {errors.agreeToTerms && (
                        <div className="invalid-feedback d-block">{errors.agreeToTerms}</div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <CButton
                      color="primary"
                      type="submit"
                      className="w-100 register-button"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating account...' : 'Create account'}
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>

              {/* Login Link */}
              <div className="register-footer">
                <p className="login-text">
                  Already have an account?{' '}
                  <Link to="/login" className="login-link">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
