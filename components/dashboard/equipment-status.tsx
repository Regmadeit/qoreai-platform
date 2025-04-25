"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Operational", value: 85 },
  { name: "Maintenance", value: 10 },
  { name: "Offline", value: 5 },
]

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

export function EquipmentStatus() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value}%`, "Equipment"]}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "0.5rem",
              color: "white",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center space-x-8">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="text-sm">
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
