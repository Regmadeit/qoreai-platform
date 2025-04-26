"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function PerformanceMetrics() {
  const metrics = [
    { name: "Efficiency", value: 85 },
    { name: "Uptime", value: 92 },
    { name: "Quality Rate", value: 95 },
    { name: "OEE", value: 88 }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{metric.name}</span>
              <span className="text-sm text-muted-foreground">{metric.value}%</span>
            </div>
            <Progress value={metric.value} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
