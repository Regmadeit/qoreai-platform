"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    date: "Jan",
    "Pump #12": 85,
    "Conveyor #3": 92,
    "Compressor #2": 78,
  },
  {
    date: "Feb",
    "Pump #12": 82,
    "Conveyor #3": 90,
    "Compressor #2": 76,
  },
  {
    date: "Mar",
    "Pump #12": 78,
    "Conveyor #3": 88,
    "Compressor #2": 74,
  },
  {
    date: "Apr",
    "Pump #12": 75,
    "Conveyor #3": 85,
    "Compressor #2": 72,
  },
  {
    date: "May",
    "Pump #12": 70,
    "Conveyor #3": 83,
    "Compressor #2": 70,
  },
  {
    date: "Jun",
    "Pump #12": 65,
    "Conveyor #3": 80,
    "Compressor #2": 68,
  },
  {
    date: "Jul",
    "Pump #12": 60,
    "Conveyor #3": 78,
    "Compressor #2": 65,
  },
]

export function PredictiveMaintenanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "none",
            borderRadius: "0.5rem",
            color: "white",
          }}
        />
        <Line type="monotone" dataKey="Pump #12" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line
          type="monotone"
          dataKey="Conveyor #3"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="Compressor #2"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
