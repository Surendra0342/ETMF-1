import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

const Button = ({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const variantClass = `btn-${variant}`
  const sizeClass = `btn-${size}`

  return (
    <button
      type={type}
      className={`custom-btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']),
  size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

export default Button
