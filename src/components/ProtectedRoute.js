import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

/**
 * ProtectedRoute component that checks for authentication
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  
  // Check if user is authenticated
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'
  
  // Check if 2FA is enabled and verified (if applicable)
  const is2FAEnabled = localStorage.getItem('2fa_enabled') === 'true'
  const is2FAVerified = sessionStorage.getItem('2fa_verified') === 'true'
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  // If 2FA is enabled but not verified, redirect to 2FA verification
  if (is2FAEnabled && !is2FAVerified) {
    return <Navigate to="/2fa/verify" state={{ from: location }} replace />
  }
  
  return children
}

export default ProtectedRoute
