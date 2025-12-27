import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  CButtonGroup,
  CPagination,
  CPaginationItem,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilChevronTop, cilChevronBottom, cilSwapVertical } from '@coreui/icons'
import './DataTable.scss'

const DataTable = ({
  columns,
  data,
  searchable = true,
  sortable = true,
  pagination = true,
  itemsPerPage = 10,
  onRowClick,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data

    return data.filter((row) =>
      columns.some((column) => {
        const value = column.selector ? column.selector(row) : row[column.key]
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      }),
    )
  }, [data, searchTerm, columns])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    const sorted = [...filteredData].sort((a, b) => {
      const column = columns.find((col) => col.key === sortConfig.key)
      const aValue = column.selector ? column.selector(a) : a[sortConfig.key]
      const bValue = column.selector ? column.selector(b) : b[sortConfig.key]

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [filteredData, sortConfig, columns])

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedData.slice(startIndex, endIndex)
  }, [sortedData, currentPage, itemsPerPage, pagination])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  const handleSort = (key) => {
    if (!sortable) return

    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (columnKey) => {
    if (!sortable) return null
    if (sortConfig.key !== columnKey) return <CIcon icon={cilSwapVertical} size="sm" />
    return sortConfig.direction === 'asc' ? (
      <CIcon icon={cilChevronTop} size="sm" />
    ) : (
      <CIcon icon={cilChevronBottom} size="sm" />
    )
  }

  const renderCell = (row, column) => {
    if (column.cell) {
      return column.cell(row)
    }
    const value = column.selector ? column.selector(row) : row[column.key]
    return value
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className={`data-table-container ${className}`}>
      {searchable && (
        <div className="data-table-header mb-3">
          <CInputGroup className="data-table-search">
            <CInputGroupText>
              <CIcon icon={cilSearch} />
            </CInputGroupText>
            <CFormInput
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </CInputGroup>
          <div className="data-table-info text-muted">
            Showing {paginatedData.length} of {sortedData.length} entries
          </div>
        </div>
      )}

      <div className="data-table-wrapper">
        <CTable hover responsive className="data-table">
          <CTableHead>
            <CTableRow>
              {columns.map((column) => (
                <CTableHeaderCell
                  key={column.key}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                  className={column.sortable !== false && sortable ? 'sortable' : ''}
                  style={{ width: column.width }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span>{column.name}</span>
                    {column.sortable !== false && getSortIcon(column.key)}
                  </div>
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paginatedData.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={columns.length} className="text-center text-muted">
                  No data available
                </CTableDataCell>
              </CTableRow>
            ) : (
              paginatedData.map((row, index) => (
                <CTableRow
                  key={row.id || index}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={onRowClick ? 'clickable' : ''}
                >
                  {columns.map((column) => (
                    <CTableDataCell key={column.key}>{renderCell(row, column)}</CTableDataCell>
                  ))}
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
      </div>

      {pagination && totalPages > 1 && (
        <div className="data-table-footer mt-3">
          <CPagination className="justify-content-center">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </CPaginationItem>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <CPaginationItem
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </CPaginationItem>
                )
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <CPaginationItem key={page}>...</CPaginationItem>
              }
              return null
            })}
            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </div>
      )}
    </div>
  )
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      selector: PropTypes.func,
      cell: PropTypes.func,
      sortable: PropTypes.bool,
      width: PropTypes.string,
    }),
  ).isRequired,
  data: PropTypes.array.isRequired,
  searchable: PropTypes.bool,
  sortable: PropTypes.bool,
  pagination: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  onRowClick: PropTypes.func,
  className: PropTypes.string,
}

export default DataTable
