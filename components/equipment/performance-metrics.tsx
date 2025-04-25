"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PerformanceMetricsProps {
  equipmentId: string
}

// Mock performance data
const performanceData: Record<
  string,
  {
    efficiency: Array<{ date: string; value: number }>
    uptime: Array<{ date: string; value: number }>
    quality: Array<{ date: string; value: number }>
  }
> = {
  "EQ-001": {
    efficiency: [
      { date: "Jan", value: 92 },
      { date: "Feb", value: 90 },
      { date: "Mar", value: 88 },
      { date: "Apr", value: 85 },
      { date: "May", value: 82 },
      { date: "Jun", value: 80 },
      { date: "Jul", value: 78 },
    ],
    uptime: [
      { date: "Jan", value: 98 },
      { date: "Feb", value: 97 },
      { date: "Mar", value: 98 },
      { date: "Apr", value: 96 },
      { date: "May", value: 95 },
      { date: "Jun", value: 94 },
      { date: "Jul", value: 92 },
    ],
    quality: [
      { date: "Jan", value: 95 },
      { date: "Feb", value: 94 },
      { date: "Mar", value: 93 },
      { date: "Apr", value: 92 },
      { date: "May", value: 91 },
      { date: "Jun", value: 90 },
      { date: "Jul", value: 89 },
    ],
  },
  "EQ-002": {
    efficiency: [
      { date: "Jan", value: 88 },
      { date: "Feb", value: 87 },
      { date: "Mar", value: 85 },
      { date: "Apr", value: 83 },
      { date: "May", value: 80 },
      { date: "Jun", value: 78 },
      { date: "Jul", value: 75 },
    ],
    uptime: [
      { date: "Jan", value: 96 },
      { date: "Feb", value: 95 },
      { date: "Mar", value: 94 },
      { date: "Apr", value: 93 },
      { date: "May", value: 91 },
      { date: "Jun", value: 90 },
      { date: "Jul", value: 88 },
    ],
    quality: [
      { date: "Jan", value: 92 },
      { date: "Feb", value: 91 },
      { date: "Mar", value: 90 },
      { date: "Apr", value: 89 },
      { date: "May", value: 88 },
      { date: "Jun", value: 87 },
      { date: "Jul", value: 86 },
    ],
  },
  "EQ-003": {
    efficiency: [
      { date: "Jan", value: 94 },
      { date: "Feb", value: 93 },
      { date: "Mar", value: 92 },
      { date: "Apr", value: 91 },
      { date: "May", value: 90 },
      { date: "Jun", value: 89 },
      { date: "Jul", value: 88 },
    ],
    uptime: [
      { date: "Jan", value: 99 },
      { date: "Feb", value: 98 },
      { date: "Mar", value: 99 },
      { date: "Apr", value: 98 },
      { date: "May", value: 97 },
      { date: "Jun", value: 96 },
      { date: "Jul", value: 95 },
    ],
    quality: [
      { date: "Jan", value: 97 },
      { date: "Feb", value: 96 },
      { date: "Mar", value: 95 },
      { date: "Apr", value: 94 },
      { date: "May", value: 93 },
      { date: "Jun", value: 92 },
      { date: "Jul", value: 91 },
    ],
  },
}

// Key performance indicators
const kpiData: Record<
  string,
  {
    oee: number
    mtbf: string
    mttr: string
    availability: number
  }
> = {
  "EQ-001": {
    oee: 78,
    mtbf: "42 days",
    mttr: "4.2 hours",
    availability: 92,
  },
  "EQ-002": {
    oee: 65,
    mtbf: "28 days",
    mttr: "6.5 hours",
    availability: 88,
  },
  "EQ-003": {
    oee: 82,
    mtbf: "56 days",
    mttr: "3.8 hours",
    availability: 95,
  },
}

export function PerformanceMetrics({ equipmentId }: PerformanceMetricsProps) {
  const metrics = performanceData[equipmentId] || {
    efficiency: [],
    uptime: [],
    quality: [],
  }

  const kpis = kpiData[equipmentId] || {
    oee: 0,
    mtbf: "0 days",
    mttr: "0 hours",
    availability: 0,
  }

  // Combine data for the chart
  const combinedData = metrics.efficiency.map((item, index) => ({
    date: item.date,
    efficiency: item.value,
    uptime: metrics.uptime[index].value,
    quality: metrics.quality[index].value,
  }))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">OEE</CardTitle>
            <CardDescription>Overall Equipment Effectiveness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.oee}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">MTBF</CardTitle>
            <CardDescription>Mean Time Between Failures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.mtbf}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">MTTR</CardTitle>
            <CardDescription>Mean Time To Repair</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.mttr}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Availability</CardTitle>
            <CardDescription>Equipment Availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.availability}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="energy">Energy Consumption</TabsTrigger>
          <TabsTrigger value="alerts">Alert History</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Historical performance data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={combinedData}>
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, ""]}
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "none",
                        borderRadius: "0.5rem",
                        color: "white",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#003DA5"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Efficiency"
                    />
                    <Line
                      type="monotone"
                      dataKey="uptime"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Uptime"
                    />
                    <Line
                      type="monotone"
                      dataKey="quality"
                      stroke="#FFC72C"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Quality"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="energy">
          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption</CardTitle>
              <CardDescription>Power usage over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[350px]">
                <p className="text-muted-foreground">Energy consumption data will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>Historical alerts and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[350px]">
                <p className="text-muted-foreground">Alert history data will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
