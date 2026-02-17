"use client"

import PeakHoursChart from "./PeakHoursChart"
import NoShowTrendsChart from "./NoShowTrends"
import ProcessingTimesChart from "./ProcessingTimesChart"

const Dashboard = ({ user, onLogout }) => {
  const kpiData = [
    { title: "Total Bookings", value: "2,847", change: "+12.5%", positive: true },
    { title: "Active Users", value: "1,234", change: "+8.2%", positive: true },
    { title: "No-Show Rate", value: "8.3%", change: "-2.1%", positive: true },
    { title: "Avg. Processing", value: "24h", change: "-15%", positive: true },
  ]

  const departmentLoad = [
    { name: "Health Services", percentage: 85 },
    { name: "Education", percentage: 72 },
    { name: "Transportation", percentage: 91 },
    { name: "Finance", percentage: 64 },
    { name: "Public Safety", percentage: 78 },
    { name: "Social Services", percentage: 69 },
  ]

  const aiRecommendations = [
    "Increase staffing during 10AM-11AM peak hours to reduce wait times",
    "Implement SMS reminders to reduce no-show rates by an estimated 15%",
    "Consider extending Transportation department hours due to high demand",
    "Optimize Finance department workflow to improve processing efficiency",
  ]

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Government Analytics Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.username}</span>
          <span>|</span>
          <span>{user.department}</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {/* KPI Cards */}
        <div className="kpi-grid">
          {kpiData.map((kpi, index) => (
            <div key={index} className="kpi-card">
              <div className="kpi-title">{kpi.title}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-change ${kpi.positive ? "positive" : "negative"}`}>{kpi.change} from last month</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          <PeakHoursChart />
          <NoShowTrendsChart />

          {/* Department Load Distribution */}
          <div className="chart-card">
            <h3 className="chart-title">Departmental Load Distribution</h3>
            <div className="dept-load-grid">
              {departmentLoad.map((dept, index) => (
                <div key={index} className="dept-item">
                  <span className="dept-name">{dept.name}</span>
                  <div className="dept-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${dept.percentage}%` }}></div>
                    </div>
                  </div>
                  <span className="dept-percentage">{dept.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <ProcessingTimesChart />
        </div>

        {/* AI Recommendations */}
        <div className="recommendations">
          <h3 className="recommendations-title">
            <span className="ai-icon">AI</span>
            Smart Recommendations
          </h3>
          <ul className="recommendation-list">
            {aiRecommendations.map((recommendation, index) => (
              <li key={index} className="recommendation-item">
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

