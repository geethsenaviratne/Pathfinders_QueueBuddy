const ProcessingTimesChart = () => {
  const processingData = [
    { department: "Health", time: 24, maxTime: 48 },
    { department: "Education", time: 18, maxTime: 48 },
    { department: "Transport", time: 36, maxTime: 48 },
    { department: "Finance", time: 12, maxTime: 48 },
    { department: "Safety", time: 30, maxTime: 48 },
    { department: "Social", time: 42, maxTime: 48 },
  ]

  return (
    <div className="chart-card">
      <h3 className="chart-title">Average Processing Times (Hours)</h3>
      <div className="horizontal-bars">
        {processingData.map((item, index) => (
          <div key={index} className="horizontal-bar-item">
            <div className="horizontal-bar-label">{item.department}</div>
            <div className="horizontal-bar">
              <div
                className="horizontal-bar-fill"
                style={{
                  width: `${(item.time / item.maxTime) * 100}%`,
                }}
              >
                <span className="horizontal-bar-value">{item.time}h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProcessingTimesChart
