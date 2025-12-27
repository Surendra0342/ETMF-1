# ShadcnTable Component - Fully Reusable Data Table

A fully customizable and reusable data table component with shadcn-admin design system styling.

## Features

✅ **Fully Configurable** - Every aspect can be customized via props
✅ **Dynamic Columns** - Define columns with custom rendering
✅ **Sorting & Filtering** - Built-in sorting and configurable filters
✅ **Pagination** - Customizable pagination with configurable rows per page
✅ **Row Selection** - Multi-row selection with bulk actions
✅ **Custom Actions** - Configurable action menu for each row
✅ **Custom Cell Renderer** - Override default cell rendering
✅ **Theme Support** - Works in both light and dark modes
✅ **Search** - Built-in search functionality
✅ **Responsive** - Mobile-friendly design

## Basic Usage

```javascript
import { ShadcnTable } from 'src/components'

const MyTable = () => {
  const data = [
    { id: '001', name: 'John Doe', status: 'Active', priority: 'High' },
    { id: '002', name: 'Jane Smith', status: 'Inactive', priority: 'Low' },
  ]

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
  ]

  return (
    <ShadcnTable
      data={data}
      columns={columns}
      title="My Table"
      subtitle="Manage your data"
    />
  )
}
```

## Props Reference

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | `[]` | Array of data objects to display |
| `columns` | `Array` | Default columns | Column configuration array |
| `title` | `string` | `'Tasks'` | Table title |
| `subtitle` | `string` | Default subtitle | Table subtitle/description |

### Header Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headerAction` | `ReactNode` | `null` | Custom action button/element in header |
| `showImportButton` | `boolean` | `true` | Show/hide Import button |
| `showExportButton` | `boolean` | `true` | Show/hide Export button |
| `onImport` | `function` | `null` | Import button click handler |
| `onExport` | `function` | `null` | Export button click handler |

### Filter Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableFilters` | `boolean` | `true` | Enable/disable filter dropdowns |
| `filterConfig` | `object` | See below | Filter configuration object |

**Filter Config Structure:**
```javascript
{
  status: {
    enabled: true,
    options: ['Active', 'Inactive', 'Pending']
  },
  priority: {
    enabled: true,
    options: ['Low', 'Medium', 'High']
  }
}
```

### Search Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchPlaceholder` | `string` | `'Filter tasks...'` | Search input placeholder text |

### Action Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableActions` | `boolean` | `true` | Show/hide action menu column |
| `actionMenuItems` | `Array` | Default menu | Custom action menu items |

**Action Menu Items Structure:**
```javascript
[
  {
    label: 'Edit',
    onClick: (row) => console.log('Edit', row)
  },
  {
    label: 'Delete',
    onClick: (row) => console.log('Delete', row),
    danger: true
  },
  { type: 'divider' }
]
```

### Selection Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSelection` | `boolean` | `true` | Enable/disable row selection checkboxes |

### Pagination Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rowsPerPageOptions` | `Array<number>` | `[5, 10, 20, 50]` | Available rows per page options |
| `defaultRowsPerPage` | `number` | `10` | Default rows per page |

### Custom Rendering

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `customCellRenderer` | `function` | `null` | Custom cell render function |

**Custom Cell Renderer Function:**
```javascript
(columnKey, cellValue, row) => {
  if (columnKey === 'myCustomColumn') {
    return <div>Custom Content: {cellValue}</div>
  }
  // Return undefined to use default rendering
}
```

## Column Configuration

Each column object supports:

```javascript
{
  key: 'columnName',      // Data key to display
  label: 'Column Label',  // Header label
  sortable: true,         // Enable sorting (default: false)
}
```

## Advanced Examples

### Example 1: Simple Table (No Filters, No Actions)

```javascript
<ShadcnTable
  data={sponsorsData}
  columns={columns}
  title="Sponsors"
  subtitle="All registered sponsors"
  showImportButton={false}
  showExportButton={false}
  enableFilters={false}
  enableActions={false}
  enableSelection={false}
  searchPlaceholder="Search sponsors..."
/>
```

### Example 2: Full-Featured Table

```javascript
<ShadcnTable
  data={trialsData}
  columns={columns}
  title="Clinical Trials"
  subtitle="Manage all clinical trials"
  headerAction={
    <button className="btn-primary">
      Create Trial
    </button>
  }
  showImportButton={true}
  showExportButton={true}
  onImport={() => handleImport()}
  onExport={() => handleExport()}
  enableFilters={true}
  filterConfig={{
    status: {
      enabled: true,
      options: ['Active', 'Recruiting', 'Completed', 'Suspended']
    },
    priority: {
      enabled: true,
      options: ['High', 'Medium', 'Low']
    }
  }}
  actionMenuItems={[
    { label: 'View Details', onClick: (row) => navigate(`/trials/${row.id}`) },
    { label: 'Edit', onClick: (row) => handleEdit(row) },
    { label: 'Duplicate', onClick: (row) => handleDuplicate(row) },
    { type: 'divider' },
    { label: 'Archive', onClick: (row) => handleArchive(row), danger: true }
  ]}
  searchPlaceholder="Search trials..."
  rowsPerPageOptions={[10, 25, 50, 100]}
  defaultRowsPerPage={25}
/>
```

### Example 3: Custom Cell Renderer

```javascript
const customRenderer = (columnKey, cellValue, row) => {
  if (columnKey === 'avatar') {
    return (
      <img
        src={cellValue}
        alt={row.name}
        style={{ width: 40, height: 40, borderRadius: '50%' }}
      />
    )
  }

  if (columnKey === 'actions') {
    return (
      <div>
        <button onClick={() => handleCustomAction(row)}>
          Custom Action
        </button>
      </div>
    )
  }

  // Return undefined to use default rendering
}

<ShadcnTable
  data={data}
  columns={columns}
  customCellRenderer={customRenderer}
/>
```

## Built-in Status Support

The component automatically renders status badges with icons for:

- **Done / Active** - Green with checkmark icon
- **In Progress** - Blue with clock icon
- **Todo** - Gray with circle icon
- **Canceled / Inactive** - Gray with X icon
- **Backlog** - Gray with question mark icon

## Built-in Priority Support

The component automatically renders priority badges with icons for:

- **High** - Red up arrow
- **Medium** - Gray right arrow
- **Low** - Blue down arrow

## Styling

The component uses CSS variables from the shadcn design system:

- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--primary`, `--primary-foreground`
- `--muted`, `--muted-foreground`
- `--border`, `--ring`
- `--destructive`

All colors automatically adapt to light/dark themes.

## Real-World Examples in Codebase

1. **Sponsors Table** ([src/views/sponsors/Sponsors.js](../../views/sponsors/Sponsors.js))
   - Custom header action (Create Sponsor button)
   - No filters, no import/export
   - Custom action menu

2. **Patients Table** ([src/views/patients/AllPatients.js](../../views/patients/AllPatients.js))
   - Custom filters for patient status
   - Custom action menu for patient operations

3. **Sites Table** ([src/views/sites/AllSites.js](../../views/sites/AllSites.js))
   - Site-specific filters
   - Custom search placeholder

4. **Trials Table** ([src/views/trials/AllTrials.js](../../views/trials/AllTrials.js))
   - Full-featured with import/export
   - Custom pagination options
   - Comprehensive action menu

## Migration Guide

If you have an existing table, here's how to migrate:

**Before:**
```javascript
<CTable>
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell>Name</CTableHeaderCell>
      <CTableHeaderCell>Status</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    {data.map(item => (
      <CTableRow key={item.id}>
        <CTableDataCell>{item.name}</CTableDataCell>
        <CTableDataCell>{item.status}</CTableDataCell>
      </CTableRow>
    ))}
  </CTableBody>
</CTable>
```

**After:**
```javascript
const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
]

<ShadcnTable
  data={data}
  columns={columns}
  title="My Data"
  subtitle="Manage your records"
/>
```

## TypeScript Support

While the component is written in JavaScript, here's the TypeScript interface for reference:

```typescript
interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface FilterConfig {
  status?: {
    enabled: boolean
    options: string[]
  }
  priority?: {
    enabled: boolean
    options: string[]
  }
}

interface ActionMenuItem {
  label?: string
  onClick?: (row: any) => void
  danger?: boolean
  type?: 'divider'
}

interface ShadcnTableProps {
  data?: any[]
  columns?: Column[]
  title?: string
  subtitle?: string
  headerAction?: React.ReactNode
  showImportButton?: boolean
  showExportButton?: boolean
  onImport?: () => void
  onExport?: () => void
  enableFilters?: boolean
  filterConfig?: FilterConfig
  actionMenuItems?: ActionMenuItem[]
  customCellRenderer?: (columnKey: string, cellValue: any, row: any) => React.ReactNode | undefined
  enableSelection?: boolean
  enableActions?: boolean
  searchPlaceholder?: string
  rowsPerPageOptions?: number[]
  defaultRowsPerPage?: number
}
```

## Tips & Best Practices

1. **Keep columns simple** - Use 4-6 columns for best readability
2. **Use custom cell renderer sparingly** - Only when built-in rendering isn't sufficient
3. **Provide meaningful action labels** - "View Details" is better than "View"
4. **Configure filters appropriately** - Only show filters that users actually need
5. **Use pagination wisely** - Set appropriate default rows per page based on data
6. **Disable unused features** - Set `enableFilters={false}` if not needed
7. **Custom header actions** - Use for primary table actions (Create, Add, etc.)

## Performance Considerations

- The component filters, sorts, and paginates data in memory
- For large datasets (>10,000 rows), consider server-side pagination
- Custom cell renderers are called for every visible row
- Selection state is cleared on page change to prevent confusion

## Browser Support

Works in all modern browsers that support CSS Grid and Flexbox:
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## License

Part of the CoreUI React Admin Template project.
