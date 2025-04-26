"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getInventoryUsageData,
  getTopUsedItems,
  getLowStockAlerts,
  getInventoryValueByCategory,
  type InventoryUsageData,
  type TopUsedItem,
  type LowStockAlert,
  type InventoryValueData,
} from "@/lib/inventory-reports-service"

export default function InventoryReportsPage() {
  const [usageData, setUsageData] = useState<InventoryUsageData[]>([])
  const [topItems, setTopItems] = useState<TopUsedItem[]>([])
  const [lowStockAlerts, setLowStockAlerts] = useState<LowStockAlert[]>([])
  const [inventoryValue, setInventoryValue] = useState<InventoryValueData[]>([])

  // Simulate data loading
  setTimeout(() => {
    setUsageData(getInventoryUsageData())
    setTopItems(getTopUsedItems())
    setLowStockAlerts(getLowStockAlerts())
    setInventoryValue(getInventoryValueByCategory())
  }, 1000)

  return (
    <div className="container space-y-4 p-4">
      <h1 className="text-2xl font-bold">Inventory Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
              Usage Trend Chart
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Used Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topItems.map((item) => (
                <div key={item.itemId} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">{item.itemName}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.totalUsed} units</p>
                    <p className="text-sm text-muted-foreground">{item.percentageOfTotal}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockAlerts.map((alert) => (
                <div key={alert.itemId} className="p-2 bg-red-50 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{alert.itemName}</p>
                      <p className="text-sm text-muted-foreground">{alert.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{alert.currentLevel} units</p>
                      <p className="text-sm text-red-600">Below min ({alert.minLevel})</p>
                    </div>
                  </div>
                  {alert.daysUntilStockout !== null && (
                    <p className="text-sm text-red-600 mt-1">
                      Stockout in {alert.daysUntilStockout} days
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Value Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {inventoryValue.map((item) => (
                <div key={item.category} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">{item.category}</p>
                    <p className="text-sm text-muted-foreground">{item.itemCount} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.totalValue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{item.percentageOfTotal}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 