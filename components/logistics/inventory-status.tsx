"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function InventoryStatus() {
  const inventory = [
    { name: "Raw Materials", current: 75, max: 100, unit: "tons" },
    { name: "Work in Progress", current: 45, max: 80, unit: "units" },
    { name: "Finished Goods", current: 120, max: 150, unit: "units" },
    { name: "Packaging Materials", current: 2500, max: 3000, unit: "pieces" }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {inventory.map((item) => {
          const percentage = (item.current / item.max) * 100
          return (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground">
                  {item.current} / {item.max} {item.unit}
                </span>
              </div>
              <Progress value={percentage} />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
