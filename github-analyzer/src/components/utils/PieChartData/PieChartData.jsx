import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Tooltip } from "recharts"
import './PieChartData.css'

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const PieChartData = ({raw}) => {
  console.log(raw)  
  const data = Object.entries(raw[0]).map(([name, value]) => ({
            name,
            value,
          }));
  console.log(data.length)
  console.log(data)
  if (!data.length) return <p>Loading chart...</p>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
          {data.map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip labelClassName=""/>
        <Legend className="tooltip"/>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartData
