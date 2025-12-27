import React from 'react'
import { MetricCard } from '../../components'
import { Card, CardContent } from 'src/components'
import { CRow, CCol } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import WorldMap from './WorldMap'
import './Dashboard.scss'

const Dashboard = () => {
  // Data for Top 5 Trials bar chart
  const topTrialsData = {
    labels: ['Canada', 'Uganda', 'Moldova', 'Cultivation - Paraguay', 'Parkinson Disease'],
    datasets: [
      {
        data: [15, 7, 5, 4, 3],
        backgroundColor: '#16a34a',
        borderRadius: 4,
        barThickness: 25,
      },
    ],
  }

  const topTrialsOptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 20,
        ticks: {
          stepSize: 5,
        },
        grid: {
          display: true,
          color: '#e5e7eb',
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header-section">
        <div>
          <h1 className="dashboard-main-title">Dashboard</h1>
          <p className="dashboard-main-subtitle">Welcome to your Clinical Trials Management System</p>
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="dashboard-metrics-grid">
        <MetricCard
          title="Total Sponsors"
          value="45"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        <MetricCard
          title="Total Studies"
          value="37"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        <MetricCard
          title="Studies in Design"
          value="7"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        <MetricCard
          title="Running Studies"
          value="20"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        <MetricCard
          title="Studies Completed"
          value="10"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
      </div>

      {/* Studies Section Card */}
      <Card className="dashboard-studies-card">
        <CardContent>
          <div className="dashboard-studies-header">
            <h2 className="dashboard-studies-title">Studies</h2>
          </div>
          <div className="dashboard-studies-metrics">
            <MetricCard
              title="Total Enrollments"
              value="1,65,000"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />

            <MetricCard
              title="Total Completions"
              value="307"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />

            <MetricCard
              title="Total Exclusions"
              value="2,500"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <CRow className="dashboard-charts-section">
        <CCol xs={12} lg={7}>
          <Card className="dashboard-chart-card">
            <CardContent>
              <h2 className="dashboard-chart-title">Studies by Country</h2>
              <div className="dashboard-world-map">
                <WorldMap />
              </div>
            </CardContent>
          </Card>
        </CCol>
        <CCol xs={12} lg={5}>
          <Card className="dashboard-chart-card">
            <CardContent>
              <h2 className="dashboard-chart-title">Top 5 Trials</h2>
              <div style={{ height: '250px' }}>
                <CChartBar
                  data={topTrialsData}
                  options={topTrialsOptions}
                />
              </div>
            </CardContent>
          </Card>
        </CCol>
      </CRow>
    </div>
  )
}

export default Dashboard
