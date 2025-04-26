"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PerformanceMetrics } from "@/components/equipment/performance-metrics"

interface MaintenanceRecord {
  date: string
  type: string
  description: string
  technician: string
  status: "completed" | "scheduled" | "in-progress"
}

interface MaintenanceHistoryProps {
  maintenanceHistory: MaintenanceRecord[]
}

function MaintenanceHistory({ maintenanceHistory }: MaintenanceHistoryProps) {
  return (
    <div className="space-y-4">
      {maintenanceHistory.map((record, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{record.type}</h3>
                <p className="text-sm text-muted-foreground">{record.date}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                record.status === "completed" 
                  ? "bg-green-100 text-green-800"
                  : record.status === "in-progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {record.status}
              </div>
            </div>
            <p className="text-sm mb-2">{record.description}</p>
            <p className="text-sm text-muted-foreground">Technician: {record.technician}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Mock equipment data
const equipmentData: Record<string, {
  id: string
  name: string
  status: "operational" | "maintenance" | "offline"
  type: string
  location: string
  lastMaintenance: string
  nextMaintenance: string
  specifications: Record<string, string>
  maintenanceHistory: MaintenanceRecord[]
}> = {
  "pump-01": {
    id: "pump-01",
    name: "Industrial Pump A1",
    status: "operational",
    type: "Centrifugal Pump",
    location: "Building A - Floor 1",
    lastMaintenance: "2024-04-15",
    nextMaintenance: "2024-05-15",
    specifications: {
      "Flow Rate": "500 GPM",
      "Head": "100 ft",
      "Motor Power": "50 HP",
      "RPM": "3600",
      "Voltage": "460V",
      "Phase": "3-Phase",
    },
    maintenanceHistory: [
      {
        date: "2024-04-15",
        type: "Preventive Maintenance",
        description: "Regular inspection and bearing lubrication",
        technician: "John Smith",
        status: "completed",
      },
      {
        date: "2024-03-01",
        type: "Repair",
        description: "Replaced mechanical seal",
        technician: "Mike Johnson",
        status: "completed",
      },
      {
        date: "2024-05-15",
        type: "Scheduled Maintenance",
        description: "Full system inspection and oil change",
        technician: "Sarah Wilson",
        status: "scheduled",
      },
    ],
  },
  "motor-01": {
    id: "motor-01",
    name: "Electric Motor B2",
    status: "maintenance",
    type: "AC Induction Motor",
    location: "Building B - Floor 2",
    lastMaintenance: "2024-04-01",
    nextMaintenance: "2024-05-01",
    specifications: {
      "Power": "75 HP",
      "Speed": "1800 RPM",
      "Voltage": "460V",
      "Current": "80A",
      "Frame": "365T",
      "Efficiency": "95%",
    },
    maintenanceHistory: [
      {
        date: "2024-04-01",
        type: "Emergency Repair",
        description: "Bearing replacement",
        technician: "Mike Johnson",
        status: "completed",
      },
      {
        date: "2024-04-25",
        type: "Inspection",
        description: "Vibration analysis and alignment check",
        technician: "Sarah Wilson",
        status: "in-progress",
      },
    ],
  },
}

export default function EquipmentDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const equipment = equipmentData[id]

  if (!equipment) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Equipment not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{equipment.name}</h1>
          <p className="text-muted-foreground">{equipment.type}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${
          equipment.status === "operational" 
            ? "bg-green-100 text-green-800"
            : equipment.status === "maintenance"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}>
          {equipment.status}
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{equipment.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Maintenance</p>
                  <p className="text-sm text-muted-foreground">{equipment.lastMaintenance}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Next Maintenance</p>
                  <p className="text-sm text-muted-foreground">{equipment.nextMaintenance}</p>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(equipment.specifications).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm text-muted-foreground">{key}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance">
          <MaintenanceHistory maintenanceHistory={equipment.maintenanceHistory} />
        </TabsContent>
        <TabsContent value="performance">
          <PerformanceMetrics />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => router.push("/equipment")}>
          Back to Equipment
        </Button>
        <Button onClick={() => router.push(`/equipment/${id}/maintenance/new`)}>
          Schedule Maintenance
        </Button>
      </div>
    </div>
  )
}
