const PeakHoursChart = () => {
  const hourlyData = [
    { hour: "8AM", bookings: 45 },
    { hour: "9AM", bookings: 78 },
    { hour: "10AM", bookings: 92 },
    { hour: "11AM", bookings: 67 },
    { hour: "12PM", bookings: 54 },
    { hour: "1PM", bookings: 43 },
    { hour: "2PM", bookings: 89 },
    { hour: "3PM", bookings: 76 },
    { hour: "4PM", bookings: 65 },
    { hour: "5PM", bookings: 38 },
  ]

  const maxBookings = Math.max(...hourlyData.map((d) => d.bookings))

  return (
    <div className="chart-card">
      <h3 className="chart-title">Peak Booking Hours</h3>
      <div className="bar-chart">
        {hourlyData.map((item, index) => (
          <div key={index} className="bar-item">
            <div
              className="bar"
              style={{
                height: `${(item.bookings / maxBookings) * 100}%`,
              }}
            >
              <span className="bar-value">{item.bookings}</span>
            </div>
            <span className="bar-label">{item.hour}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PeakHoursChart
