# DataTable Component

A modern, feature-rich table component with shadcn-inspired design for the Clinical Trials Management System.

## Features

- ✅ **Search** - Real-time search across all columns
- ✅ **Sorting** - Click column headers to sort (ascending/descending)
- ✅ **Pagination** - Configurable items per page with smart page navigation
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Custom Cell Rendering** - Render custom components in cells
- ✅ **Row Click Handler** - Optional row click functionality
- ✅ **Clean UI** - Modern, minimal design with smooth transitions
- ✅ **Dark Mode Support** - Automatically adapts to dark mode

## Usage

### Basic Example

```jsx
import DataTable from '../../components/DataTable'

const MyComponent = () => {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ]

  const columns = [
    {
      key: 'id',
      name: 'ID',
      sortable: true,
      width: '80px',
    },
    {
      key: 'name',
      name: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      name: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      name: 'Role',
      sortable: true,
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      searchable={true}
      sortable={true}
      pagination={true}
      itemsPerPage={10}
    />
  )
}
```

### Advanced Example with Custom Cell Rendering

```jsx
import DataTable from '../../components/DataTable'
import { CBadge, CButton } from '@coreui/react'

const TrialsTable = () => {
  const data = [
    {
      id: 'CT-001',
      title: 'Phase III Diabetes Study',
      status: 'Active',
      enrolled: 145,
      target: 200,
    },
  ]

  const columns = [
    {
      key: 'id',
      name: 'Trial ID',
      sortable: true,
      width: '120px',
    },
    {
      key: 'title',
      name: 'Title',
      sortable: true,
    },
    {
      key: 'status',
      name: 'Status',
      sortable: true,
      width: '120px',
      cell: (row) => (
        <CBadge color={row.status === 'Active' ? 'success' : 'secondary'}>
          {row.status}
        </CBadge>
      ),
    },
    {
      key: 'enrollment',
      name: 'Enrollment',
      sortable: false,
      selector: (row) => row.enrolled, // Used for sorting
      cell: (row) => (
        <span>
          {row.enrolled} / {row.target}
        </span>
      ),
    },
    {
      key: 'actions',
      name: 'Actions',
      sortable: false,
      cell: (row) => (
        <CButton color="primary" size="sm">
          View
        </CButton>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      searchable={true}
      sortable={true}
      pagination={true}
      itemsPerPage={5}
    />
  )
}
```

## Props

### DataTable Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `columns` | Array | - | Yes | Column configuration array |
| `data` | Array | - | Yes | Data array to display |
| `searchable` | Boolean | `true` | No | Enable/disable search functionality |
| `sortable` | Boolean | `true` | No | Enable/disable sorting functionality |
| `pagination` | Boolean | `true` | No | Enable/disable pagination |
| `itemsPerPage` | Number | `10` | No | Number of items per page |
| `onRowClick` | Function | - | No | Callback when row is clicked |
| `className` | String | `''` | No | Additional CSS classes |

### Column Configuration

Each column object in the `columns` array can have:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `key` | String | Yes | Unique identifier for the column |
| `name` | String | Yes | Column header display name |
| `selector` | Function | No | Function to extract value from row for sorting (row) => value |
| `cell` | Function | No | Custom cell renderer (row) => JSX |
| `sortable` | Boolean | No | Override global sortable setting for this column |
| `width` | String | No | Column width (e.g., '120px', '20%') |

### Column Examples

**Simple Column:**
```javascript
{
  key: 'name',
  name: 'Name',
  sortable: true,
}
```

**Column with Custom Rendering:**
```javascript
{
  key: 'status',
  name: 'Status',
  cell: (row) => <CBadge color="success">{row.status}</CBadge>,
}
```

**Column with Custom Sorting:**
```javascript
{
  key: 'enrollment',
  name: 'Enrollment',
  selector: (row) => row.enrolled, // Sort by enrolled number
  cell: (row) => `${row.enrolled} / ${row.target}`, // Display as fraction
}
```

**Non-sortable Column:**
```javascript
{
  key: 'actions',
  name: 'Actions',
  sortable: false,
  cell: (row) => <CButton size="sm">Edit</CButton>,
}
```

## Styling

The DataTable uses CSS custom properties for theming and automatically adapts to light/dark mode:

- Clean, minimal borders
- Hover effects on rows
- Smooth transitions
- Responsive design
- Custom scrollbar styling

### Customizing Styles

You can override styles by targeting the component classes:

```css
.data-table-container {
  /* Container styles */
}

.data-table-wrapper {
  /* Table wrapper styles */
}

.data-table {
  /* Table styles */
}
```

## Features in Detail

### Search

- Searches across all columns
- Real-time filtering as you type
- Case-insensitive search
- Resets to page 1 when searching

### Sorting

- Click column header to sort ascending
- Click again to sort descending
- Visual indicators (arrows) show sort direction
- Can be disabled globally or per column

### Pagination

- Smart page number display (shows first, last, current, and adjacent pages)
- Previous/Next navigation
- Automatically adjusts when data is filtered
- Shows "X of Y entries" count

### Custom Cell Rendering

Use the `cell` prop to render custom content:

```javascript
{
  key: 'status',
  name: 'Status',
  cell: (row) => {
    const color = row.status === 'Active' ? 'success' : 'danger'
    return <CBadge color={color}>{row.status}</CBadge>
  }
}
```

### Row Click Handler

```javascript
<DataTable
  columns={columns}
  data={data}
  onRowClick={(row) => {
    console.log('Clicked row:', row)
    // Navigate or open modal
  }}
/>
```

## Examples in the Project

See these files for working examples:

- `src/views/trials/AllTrials.js` - Clinical trials table with badges and actions
- `src/views/patients/AllPatients.js` - Patient table example
- `src/views/sites/AllSites.js` - Sites table example

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Efficient filtering and sorting using React hooks
- Memoized calculations to prevent unnecessary re-renders
- Smooth animations without jank
- Handles large datasets (tested with 1000+ rows)

## Accessibility

- Semantic HTML table structure
- Keyboard navigation support
- Screen reader friendly
- ARIA labels where appropriate
