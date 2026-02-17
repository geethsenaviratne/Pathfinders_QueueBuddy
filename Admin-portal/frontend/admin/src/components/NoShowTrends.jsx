const NoShowTrendsChart = () => {
  const trendData = [
    { month: "Jan", rate: 12 },
    { month: "Feb", rate: 15 },
    { month: "Mar", rate: 8 },
    { month: "Apr", rate: 18 },
    { month: "May", rate: 14 },
    { month: "Jun", rate: 10 },
    { month: "Jul", rate: 7 },
    { month: "Aug", rate: 13 },
    { month: "Sep", rate: 9 },
    { month: "Oct", rate: 11 },
    { month: "Nov", rate: 6 },
    { month: "Dec", rate: 8 },
  ]

  const maxRate = Math.max(...trendData.map((d) => d.rate))
  const width = 500
  const height = 250
  const padding = 40

  const xScale = (index) => (index / (trendData.length - 1)) * (width - 2 * padding) + padding
  const yScale = (value) => height - padding - (value / maxRate) * (height - 2 * padding)

  const pathData = trendData.map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(d.rate)}`).join(" ")

  const areaData = `${pathData} L ${xScale(trendData.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`

  return (
    <div className="chart-card">
      <h3 className="chart-title">No-Show Rate Trends</h3>
      <div className="area-chart">
        <svg viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--gov-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--gov-primary)" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <path d={areaData} className="area-path" />
          <path d={pathData} className="chart-line" />

          {trendData.map((d, i) => (
            <g key={i}>
              <circle cx={xScale(i)} cy={yScale(d.rate)} r="4" className="chart-dot" />
              <text x={xScale(i)} y={height - 10} textAnchor="middle" fontSize="12" fill="var(--gov-neutral-600)">
                {d.month}
              </text>
              <text
                x={xScale(i)}
                y={yScale(d.rate) - 10}
                textAnchor="middle"
                fontSize="11"
                fill="var(--gov-neutral-700)"
                fontWeight="600"
              >
                {d.rate}%
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

export default NoShowTrendsChart
