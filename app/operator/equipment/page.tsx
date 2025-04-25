"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, CheckCircle, Gauge, Power, Settings } from "lucide-react"

// Mock data - replace with real data from your backend
const equipmentData = [
  {
    id: 1,
    name: "Production Line A",
    status: "running",
    health: 92,
    temperature: "65°C",
    pressure: "2.4 bar",
    runtime: "12h 30m",
    alerts: [],
  },
  {
    id: 2,
    name: "Hydraulic Press B",
    status: "maintenance",
    health: 45,
    temperature: "70°C",
    pressure: "1.8 bar",
    runtime: "5h 15m",
    alerts: ["High temperature warning"],
  },
  {
    id: 3,
    name: "Conveyor System C",
    status: "idle",
    health: 88,
    temperature: "35°C",
    pressure: "N/A",
    runtime: "2h 45m",
    alerts: [],
  },
]

export default function EquipmentMonitoring() {
  const [selectedEquipment, setSelectedEquipment] = useState(equipmentData[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      case "idle":
        return "bg-blue-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-500"
    if (health >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipment Monitoring</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Equipment</CardTitle>
            <Power className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/4</div>
            <p className="text-xs text-muted-foreground">Units operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Average performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Scheduled checks</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Equipment List</CardTitle>
            <CardDescription>Status and health of all equipment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipmentData.map((equipment) => (
                <div
                  key={equipment.id}
                  className={`flex items-center justify-between space-x-4 rounded-lg border p-4 cursor-pointer ${
                    selectedEquipment.id === equipment.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedEquipment(equipment)}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{equipment.name}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className={getStatusColor(equipment.status)}>
                          {equipment.status}
                        </Badge>
                        <span className={getHealthColor(equipment.health)}>
                          {equipment.health}% health
                        </span>
                      </div>
                    </div>
                  </div>
                  {equipment.alerts.length > 0 && (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Equipment Details</CardTitle>
            <CardDescription>{selectedEquipment.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant="secondary" className={getStatusColor(selectedEquipment.status)}>
                      {selectedEquipment.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Runtime</p>
                    <p className="text-2xl font-bold">{selectedEquipment.runtime}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Temperature</p>
                    <p className="text-2xl font-bold">{selectedEquipment.temperature}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Pressure</p>
                    <p className="text-2xl font-bold">{selectedEquipment.pressure}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    View History
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Request Maintenance
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">System Health</p>
                      <span className={getHealthColor(selectedEquipment.health)}>
                        {selectedEquipment.health}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div
                        className={`h-2 rounded-full ${getStatusColor(
                          selectedEquipment.status
                        )}`}
                        style={{ width: `${selectedEquipment.health}%` }}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4">
                {selectedEquipment.alerts.length > 0 ? (
                  selectedEquipment.alerts.map((alert, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 rounded-lg border p-4 text-yellow-500"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <p>{alert}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center space-x-2 rounded-lg border p-4 text-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <p>No active alerts</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 