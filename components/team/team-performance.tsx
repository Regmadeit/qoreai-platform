"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const performanceData = [
  {
    name: "Operations",
    efficiency: 92,
    safety: 95,
    quality: 88,
  },
  {
    name: "Maintenance",
    efficiency: 85,
    safety: 97,
    quality: 90,
  },
  {
    name: "Engineering",
    efficiency: 88,
    safety: 94,
    quality: 93,
  },
  {
    name: "Logistics",
    efficiency: 90,
    safety: 92,
    quality: 87,
  },
  {
    name: "Quality",
    efficiency: 86,
    safety: 96,
    quality: 98,
  },
]

const individualData = [
  {
    name: "John D.",
    tasks: 45,
    completion: 95,
    quality: 92,
  },
  {
    name: "Sarah J.",
    tasks: 38,
    completion: 97,
    quality: 94,
  },
  {
    name: "Michael B.",
    tasks: 32,
    completion: 88,
    quality: 90,
  },
  {
    name: "Emily D.",
    tasks: 41,
    completion: 93,
    quality: 89,
  },
  {
    name: "Robert W.",
    tasks: 36,
    completion: 91,
    quality: 93,
  },
]

const shiftData = [
  {
    name: "Morning",
    efficiency: 94,
    safety: 96,
    quality: 92,
  },
  {
    name: "Evening",
    efficiency: 88,
    safety: 94,
    quality: 89,
  },
  {
    name: "Night",
    efficiency: 82,
    safety: 93,
    quality: 85,
  },
]

export function TeamPerformance() {
  return (
    <Tabs defaultValue="department" className="space-y-4">
      <TabsList>
        <TabsTrigger value="department">By Department</TabsTrigger>
        <TabsTrigger value="shift">By Shift</TabsTrigger>
        <TabsTrigger value="individual">Top Performers</TabsTrigger>
      </TabsList>

      <TabsContent value="department">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Performance metrics by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={performanceData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, ""]}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "white",
                  }}
                />
                <Legend />
                <Bar dataKey="efficiency" name="Efficiency" fill="#003DA5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="safety" name="Safety" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="quality" name="Quality" fill="#FFC72C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="shift">
        <Card>
          <CardHeader>
            <CardTitle>Shift Performance</CardTitle>
            <CardDescription>Performance metrics by shift</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={shiftData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, ""]}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "white",
                  }}
                />
                <Legend />
                <Bar dataKey="efficiency" name="Efficiency" fill="#003DA5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="safety" name="Safety" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="quality" name="Quality" fill="#FFC72C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="individual">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Individual performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={individualData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}${value === 100 ? "%" : ""}`}
                />
                <Tooltip
                  formatter={(value, name) => [
                    name === "tasks" ? value : `${value}%`,
                    name === "tasks" ? "Tasks Completed" : name === "completion" ? "Completion Rate" : "Quality Score",
                  ]}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                    color: "white",
                  }}
                />
                <Legend />
                <Bar dataKey="tasks" name="Tasks Completed" fill="#003DA5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completion" name="Completion Rate" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="quality" name="Quality Score" fill="#FFC72C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
