"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EquipmentOverview } from "@/components/equipment/equipment-overview"
import { MaintenanceHistory } from "@/components/equipment/maintenance-history"
import { PerformanceMetrics } from "@/components/equipment/performance-metrics"
import { DocumentationList } from "@/components/equipment/documentation-list"
import { ArrowLeft, Calendar, Settings } from "lucide-react"

export default function EquipmentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [equipment, setEquipment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch equipment details
    const fetchEquipment = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        setEquipment({
          id: params.id,
          name: `Equipment ${params.id}`,
          type: "Conveyor Belt",
          status: "Operational",
          lastMaintenance: "2023-04-15",
          nextMaintenance: "2023-07-15",
          location: "Building A, Section 3",
          serialNumber: `SN-${params.id}-12345`,
          manufacturer: "Industrial Systems Inc.",
          installDate: "2020-06-10",
          warranty: "2025-06-10",
          healthScore: 87,
          uptime: 98.7,
          maintenanceHistory: [
            {
              date: "2023-04-15",
              type: "Preventive",
              technician: "John Doe",
              notes: "Replaced bearings and lubricated moving parts",
            },
            { date: "2023-01-22", type: "Corrective", technician: "Jane Smith", notes: "Fixed motor alignment issue" },
            {
              date: "2022-10-05",
              type: "Preventive",
              technician: "John Doe",
              notes: "General inspection and cleaning",
            },
          ],
          performanceData: {
            efficiency: [78, 82, 85, 87, 86, 89, 90],
            downtime: [5, 3, 4, 2, 3, 1, 2],
            energyConsumption: [120, 118, 115, 117, 114, 112, 110],
          },
          documents: [
            { name: "User Manual", type: "PDF", size: "2.4 MB", lastUpdated: "2020-06-10" },
            { name: "Maintenance Guide", type: "PDF", size: "1.8 MB", lastUpdated: "2022-03-15" },
            { name: "Parts Diagram", type: "PNG", size: "0.7 MB", lastUpdated: "2021-11-22" },
            { name: "Warranty Certificate", type: "PDF", size: "0.3 MB", lastUpdated: "2020-06-10" },
          ],
        })
        setLoading(false)
      } catch (error) {
        console.error("Error fetching equipment details:", error)
        setLoading(false)
      }
    }

    fetchEquipment()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
          <Button variant="default" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Edit Equipment
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            <span>{equipment.name}</span>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                equipment.status === "Operational"
                  ? "bg-green-100 text-green-800"
                  : equipment.status === "Maintenance"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {equipment.status}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-medium">{equipment.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{equipment.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Serial Number</p>
              <p className="font-medium">{equipment.serialNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Manufacturer</p>
              <p className="font-medium">{equipment.manufacturer}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Install Date</p>
              <p className="font-medium">{equipment.installDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Warranty Until</p>
              <p className="font-medium">{equipment.warranty}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <EquipmentOverview equipment={equipment} />
        </TabsContent>
        <TabsContent value="maintenance">
          <MaintenanceHistory history={equipment.maintenanceHistory} />
        </TabsContent>
        <TabsContent value="performance">
          <PerformanceMetrics data={equipment.performanceData} />
        </TabsContent>
        <TabsContent value="documentation">
          <DocumentationList documents={equipment.documents} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
