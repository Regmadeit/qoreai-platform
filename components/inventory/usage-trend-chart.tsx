"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { InventoryUsageData } from "@/lib/inventory-reports-service"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Note: In a real application, you would use a charting library like Chart.js, Recharts, or D3.js
// For this example, we'll create a simplified chart visualization

interface UsageTrendChartProps {
  data: InventoryUsageData[]
}

export function UsageTrendChart({ data }: UsageTrendChartProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Get unique categories from data
  const categories = Array.from(new Set(data.map((item) => item.category)))

  // Get unique months from data
  const months = Array.from(new Set(data.map((item) => item.month)))

  // Filter data by selected category
  const filteredData = selectedCategory === "all" ? data : data.filter((item) => item.category === selectedCategory)

  // Group data by month and sum usage
  const monthlyUsage = months.map((month) => {
    const monthData = filteredData.filter((item) => item.month === month)
    const totalUsage = monthData.reduce((sum, item) => sum + item.usageCount, 0)
    return { month, totalUsage }
  })

  // Draw chart when data or selected category changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Chart dimensions
    const chartWidth = canvas.width - 60
    const chartHeight = canvas.height - 60
    const barWidth = chartWidth / monthlyUsage.length - 10

    // Find maximum usage for scaling
    const maxUsage = Math.max(...monthlyUsage.map((item) => item.totalUsage))

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, chartHeight + 30)
    ctx.lineTo(chartWidth + 50, chartHeight + 30)
    ctx.stroke()

    // Draw bars
    monthlyUsage.forEach((item, index) => {
      const x = 50 + index * (barWidth + 10)
      const barHeight = (item.totalUsage / maxUsage) * chartHeight
      const y = chartHeight + 30 - barHeight

      // Draw bar
      ctx.fillStyle = "rgba(37, 99, 235, 0.8)"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw month label
      ctx.fillStyle = "#000"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(item.month, x + barWidth / 2, chartHeight + 45)

      // Draw usage value
      ctx.fillText(item.totalUsage.toString(), x + barWidth / 2, y - 5)
    })

    // Draw y-axis labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxUsage / 5) * i)
      const y = chartHeight + 30 - (i / 5) * chartHeight
      ctx.fillText(value.toString(), 35, y + 3)
    }
  }, [monthlyUsage])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Inventory Usage Trends</CardTitle>
          <CardDescription>Monthly usage patterns over time</CardDescription>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="aspect-[2/1] w-full">
          <canvas ref={canvasRef} width={600} height={300} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  )
}
