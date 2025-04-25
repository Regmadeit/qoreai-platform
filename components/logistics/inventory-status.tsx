"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Raw Material A",
    stock: 85,
    threshold: 20,
  },
  {
    name: "Raw Material B",
    stock: 32,
    threshold: 25,
  },
  {
    name: "Component C",
    stock: 56,
    threshold: 30,
  },
  {
    name: "Component D",
    stock: 18,
    threshold: 20,
  },
  {
    name: "Finished Product E",
    stock: 45,
    threshold: 15,
  },
]

export function InventoryStatus() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "none",
            borderRadius: "0.5rem",
            color: "white",
          }}
        />
        <Bar dataKey="stock" fill="#003DA5" radius={[4, 4, 0, 0]} className="fill-qore-blue" />
        <Bar dataKey="threshold" fill="#FFC72C" radius={[4, 4, 0, 0]} className="fill-qore-gold" />
      </BarChart>
    </ResponsiveContainer>
  )
}
