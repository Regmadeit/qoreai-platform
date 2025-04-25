"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Calendar } from "lucide-react"
import Link from "next/link"
import { UsageTrendChart } from "@/components/inventory/usage-trend-chart"
import { TopUsedItems } from "@/components/inventory/top-used-items"
import { LowStockAlerts } from "@/components/inventory/low-stock-alerts"
import { InventoryValue } from "@/components/inventory/inventory-value"
import { InventoryLevelChart } from "@/components/inventory/inventory-level-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  getInventoryUsageData,
  getTopUsedItems,
  getLowStockAlerts,
  getInventoryValueByCategory,
  getInventoryLevelHistory,
} from "@/lib/inventory-reports-service"

export default function InventoryReportsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedItem, setSelectedItem] = useState("INV-001")
  const [isLoading, setIsLoading] = useState(true)

  // Data states
  const [usageData, setUsageData] = useState([])
  const [topItems, setTopItems] = useState([])
  const [lowStockAlerts, setLowStockAlerts] = useState([])
  const [inventoryValue, setInventoryValue] = useState([])
  const [levelHistory, setLevelHistory] = useState([])
  const [selectedItemName, setSelectedItemName] = useState("")

  // Fetch data
  useEffect(() => {
    // Simulate API loading
    setIsLoading(true)

    setTimeout(() => {
      setUsageData(getInventoryUsageData())
      setTopItems(getTopUsedItems())
      setLowStockAlerts(getLowStockAlerts())
      setInventoryValue(getInventoryValueByCategory())

      const history = getInventoryLevelHistory(selectedItem)
      setLevelHistory(history)
      setSelectedItemName(history.length > 0 ? history[0].itemName : "")

      setIsLoading(false)
    }, 500)
  }, [selectedItem])

  // Handle item selection for level history
  const handleItemChange = (itemId: string) => {
    setSelectedItem(itemId)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Inventory Reports"
        description="Analyze inventory usage and trends"
        actions={
          <div className="flex gap-2">
            <Link href="/predictive-maintenance/inventory">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Inventory
              </Button>
            </Link>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage Analysis</TabsTrigger>
          <TabsTrigger value="levels">Stock Levels</TabsTrigger>
          <TabsTrigger value="value">Inventory Value</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <TopUsedItems items={topItems} />
            <LowStockAlerts alerts={lowStockAlerts} />
          </div>
          <UsageTrendChart data={usageData} />
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <UsageTrendChart data={usageData} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <TopUsedItems items={topItems} />
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Usage by Category</h3>
                <div className="space-y-4">
                  {/* This would be a pie chart in a real implementation */}
                  <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md">
                    Pie Chart Visualization
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="levels" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Stock Level History</h3>
                <Select value={selectedItem} onValueChange={handleItemChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INV-001">Hydraulic Pump</SelectItem>
                    <SelectItem value="INV-002">Air Filter</SelectItem>
                    <SelectItem value="INV-003">Drive Belt</SelectItem>
                    <SelectItem value="INV-005">Bearing Assembly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isLoading ? (
                <div className="h-[300px] flex items-center justify-center">Loading...</div>
              ) : (
                <InventoryLevelChart data={levelHistory} itemName={selectedItemName} />
              )}
            </CardContent>
          </Card>

          <LowStockAlerts alerts={lowStockAlerts} />
        </TabsContent>

        <TabsContent value="value" className="space-y-4">
          <InventoryValue data={inventoryValue} />

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Value Distribution</h3>
              <div className="space-y-4">
                {/* This would be a pie chart in a real implementation */}
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  Pie Chart Visualization
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
