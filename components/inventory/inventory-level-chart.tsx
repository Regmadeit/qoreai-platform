"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { InventoryLevelData } from "@/lib/inventory-reports-service"

interface InventoryLevelChartProps {
  data: InventoryLevelData[]
  itemName: string
}

export function InventoryLevelChart({ data, itemName }: InventoryLevelChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw chart when data changes
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

    // Find maximum level for scaling
    const maxLevel = Math.max(...data.map((item) => item.maxLevel))

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, chartHeight + 30)
    ctx.lineTo(chartWidth + 50, chartHeight + 30)
    ctx.stroke()

    // Draw minimum level line
    if (data.length > 0) {
      const minLevel = data[0].minLevel
      const minY = chartHeight + 30 - (minLevel / maxLevel) * chartHeight

      ctx.beginPath()
      ctx.setLineDash([5, 3])
      ctx.moveTo(40, minY)
      ctx.lineTo(chartWidth + 50, minY)
      ctx.strokeStyle = "rgba(220, 38, 38, 0.5)"
      ctx.stroke()
      ctx.setLineDash([])
      ctx.strokeStyle = "#000"

      // Label for minimum level
      ctx.fillStyle = "rgba(220, 38, 38, 0.8)"
      ctx.font = "10px Arial"
      ctx.textAlign = "left"
      ctx.fillText("Min Level", chartWidth + 55, minY + 3)
    }

    // Draw level line
    ctx.beginPath()
    ctx.moveTo(40, chartHeight + 30 - (data[0].currentLevel / maxLevel) * chartHeight)

    data.forEach((item, index) => {
      const x = 40 + (index / (data.length - 1)) * chartWidth
      const y = chartHeight + 30 - (item.currentLevel / maxLevel) * chartHeight
      ctx.lineTo(x, y)
    })

    ctx.strokeStyle = "rgba(37, 99, 235, 0.8)"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.lineWidth = 1
    ctx.strokeStyle = "#000"

    // Fill area under the line
    ctx.lineTo(40 + chartWidth, chartHeight + 30)
    ctx.lineTo(40, chartHeight + 30)
    ctx.fillStyle = "rgba(37, 99, 235, 0.1)"
    ctx.fill()

    // Draw points on the line
    data.forEach((item, index) => {
      const x = 40 + (index / (data.length - 1)) * chartWidth
      const y = chartHeight + 30 - (item.currentLevel / maxLevel) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(37, 99, 235, 0.8)"
      ctx.fill()
    })

    // Draw x-axis labels (every 5 days)
    for (let i = 0; i < data.length; i += 5) {
      const x = 40 + (i / (data.length - 1)) * chartWidth
      const date = new Date(data[i].date)
      const label = `${date.getDate()}/${date.getMonth() + 1}`

      ctx.fillStyle = "#000"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(label, x, chartHeight + 45)
    }

    // Draw y-axis labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxLevel / 5) * i)
      const y = chartHeight + 30 - (i / 5) * chartHeight
      ctx.fillText(value.toString(), 35, y + 3)
    }
  }, [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Level History</CardTitle>
        <CardDescription>{itemName} - Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[2/1] w-full">
          <canvas ref={canvasRef} width={600} height={300} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  )
}
