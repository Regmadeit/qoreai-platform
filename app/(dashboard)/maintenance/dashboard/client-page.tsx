"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ClipboardList,
  Calendar,
  Gauge,
  PenToolIcon as Tool,
  Package,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { QoreAiButton } from "@/components/ai/qoreai-button"

export default function MaintenanceDashboardClient() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Maintenance Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John. Here's your maintenance overview.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workorders">Work Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4 mt-2">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/maintenance/work-orders">
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <ClipboardList className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <p className="text-sm font-medium">My Work Orders</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/predictive-maintenance/inventory">
              <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Tool className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                  <p className="text-sm font-medium">Request Parts</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/predictive-maintenance">
              <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Gauge className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                  <p className="text-sm font-medium">Equipment Status</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/team">
              <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                  <p className="text-sm font-medium">Schedule</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Assigned Work Orders */}
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Assigned Work Orders</CardTitle>
              <QoreAiButton
                contextType="workorders"
                initialMessage="I can help you manage your work orders. What would you like to know?"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">WO-2023-042: Conveyor Belt Repair</p>
                      <p className="text-xs text-red-600">High Priority - Due Today</p>
                    </div>
                  </div>
                  <Button variant="default" size="sm" asChild>
                    <Link href="/maintenance/work-orders/WO-2023-042">Start</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">WO-2023-045: Forklift Maintenance</p>
                      <p className="text-xs text-amber-600">Medium Priority - Due Tomorrow</p>
                    </div>
                  </div>
                  <Button variant="default" size="sm" asChild>
                    <Link href="/maintenance/work-orders/WO-2023-045">Start</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/maintenance/work-orders">
                    <span>View All Work Orders</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Completions */}
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Recent Completions</CardTitle>
              <QoreAiButton
                contextType="completions"
                initialMessage="I can help you review your completed work orders. What would you like to know?"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">WO-2023-039: Dock Door Repair</p>
                      <p className="text-xs text-muted-foreground">Completed yesterday</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/maintenance/work-orders/WO-2023-039">
                      <span>View</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">WO-2023-036: HVAC Filter Replacement</p>
                      <p className="text-xs text-muted-foreground">Completed 2 days ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/maintenance/work-orders/WO-2023-036">
                      <span>View</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/maintenance/work-orders?filter=completed">
                    <span>View All Completions</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workorders" className="space-y-4 mt-2">
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">All Work Orders</CardTitle>
              <QoreAiButton
                contextType="workorders"
                initialMessage="I can help you find and manage work orders. What are you looking for?"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">WO-2023-042: Conveyor Belt Repair</p>
                      <p className="text-xs text-red-600">High Priority - Due Today</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/maintenance/work-orders/WO-2023-042">View</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">WO-2023-045: Forklift Maintenance</p>
                      <p className="text-xs text-amber-600">Medium Priority - Due Tomorrow</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/maintenance/work-orders/WO-2023-045">View</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">WO-2023-048: Light Fixture Replacement</p>
                      <p className="text-xs text-blue-600">Low Priority - Due in 3 days</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/maintenance/work-orders/WO-2023-048">View</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/maintenance/work-orders">
                    <span>View All Work Orders</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4 mt-2">
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Parts Inventory</CardTitle>
              <QoreAiButton
                contextType="inventory"
                initialMessage="I can help you find parts and manage inventory. What are you looking for?"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Conveyor Belt Rollers</p>
                      <p className="text-xs text-green-600">In Stock: 24 units</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/predictive-maintenance/inventory?part=conveyor-belt-rollers">Request</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Hydraulic Fluid</p>
                      <p className="text-xs text-amber-600">Low Stock: 2 units</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/predictive-maintenance/inventory?part=hydraulic-fluid">Request</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">HVAC Filters</p>
                      <p className="text-xs text-red-600">Out of Stock</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/predictive-maintenance/inventory?part=hvac-filters&action=order">Order</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/predictive-maintenance/inventory">
                    <span>View All Inventory</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
