import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import './PieChartData.css'

const getColor = index => `hsl(${index * 40}, 70%, 55%)`

const CustomLegend = ({ payload }) => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "flex-start"
  }}>
    {payload.map((entry, index) => (
      <div key={index} style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
        <div style={{
          width: 12,
          height: 12,
          backgroundColor: entry.color
        }} />
        <span>{entry.value}</span>
      </div>
    ))}
  </div>
)

const CustomTooltip = ({ active, payload}) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip" style={{
        background: "#1f2937",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: "8px",
        border: "1px solid #374151",
      }}>
        <p>{payload[0].name}</p>
        <p>Value: {payload[0].value}</p>
      </div>
    )
  }
  return null
}

const PieChartData = ({ raw }) => {
  const data = Object.entries(raw[0]).map(([name, value]) => ({
    name,
    value,
  }))

  if (!data.length) return <p>Loading chart...</p>

  return (
    <div className="responsive-container">
      <PieChart width={250} height={300} className="">
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={70}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={getColor(index)} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip/>} />
      </PieChart>
      <CustomLegend payload={data.map((d, i) => ({
        value: d.name,
        color: getColor(i)
      }))} />
    </div>
  )
}

export default PieChartData