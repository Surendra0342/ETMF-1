import React from 'react'
import PropTypes from 'prop-types'
import './Card.scss'

const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`custom-card ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`custom-card-header ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`custom-card-title ${className}`} {...props}>
      {children}
    </h3>
  )
}

const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`custom-card-description ${className}`} {...props}>
      {children}
    </p>
  )
}

const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`custom-card-content ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`custom-card-footer ${className}`} {...props}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CardDescription.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const MetricCard = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className={`metric-card ${className}`} {...props}>
      <div className="metric-card-header">
        <span className="metric-card-title">{title}</span>
        {icon && <span className="metric-card-icon">{icon}</span>}
      </div>
      <div className="metric-card-content">
        <div className="metric-card-value">{value}</div>
        {change && (
          <div className={`metric-card-change ${changeType}`}>
            {change}
          </div>
        )}
      </div>
    </div>
  )
}

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.string,
  changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
  icon: PropTypes.node,
  className: PropTypes.string,
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, MetricCard }
