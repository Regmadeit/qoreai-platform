"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1800,
  },
  {
    name: "Feb",
    total: 2200,
  },
  {
    name: "Mar",
    total: 2700,
  },
  {
    name: "Apr",
    total: 2400,
  },
  {
    name: "May",
    total: 2900,
  },
  {
    name: "Jun",
    total: 3100,
  },
  {
    name: "Jul",
    total: 3400,
  },
  {
    name: "Aug",
    total: 3200,
  },
  {
    name: "Sep",
    total: 3500,
  },
  {
    name: "Oct",
    total: 3700,
  },
  {
    name: "Nov",
    total: 3600,
  },
  {
    name: "Dec",
    total: 3900,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          formatter={(value: number) => [`${value}`, "Revenue"]}
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "none",
            borderRadius: "0.5rem",
            color: "white",
          }}
        />
        <Bar dataKey="total" fill="#003DA5" radius={[4, 4, 0, 0]} className="fill-qore-blue hover:fill-qore-gold" />
      </BarChart>
    </ResponsiveContainer>
  )
}
