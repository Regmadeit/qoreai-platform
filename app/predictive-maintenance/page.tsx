import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PredictiveMaintenanceChart } from "@/components/predictive-maintenance/chart"
import { EquipmentList } from "@/components/predictive-maintenance/equipment-list"
import { MaintenanceAlerts } from "@/components/predictive-maintenance/maintenance-alerts"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"
import { Wrench, ArrowLeft, Package } from "lucide-react"

export default function PredictiveMaintenance() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Predictive Maintenance"
        description="AI-powered maintenance predictions and equipment health monitoring"
        actions={
          <div className="flex gap-2">
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/predictive-maintenance/inventory">
              <Button variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Inventory
              </Button>
            </Link>
            <Button className="bg-qore-blue hover:bg-blue-800">
              <Wrench className="mr-2 h-4 w-4" />
              Schedule Maintenance
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Equipment Health</CardTitle>
                <CardDescription>Overall equipment health status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px]">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-green-500">87%</div>
                    <p className="text-sm text-muted-foreground mt-2">Healthy Equipment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Predicted Failures</CardTitle>
                <CardDescription>Next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px]">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-amber-500">5</div>
                    <p className="text-sm text-muted-foreground mt-2">Potential Issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Maintenance Savings</CardTitle>
                <CardDescription>This quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px]">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-qore-gold">$42K</div>
                    <p className="text-sm text-muted-foreground mt-2">Cost Reduction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Failure Prediction Trends</CardTitle>
                <CardDescription>AI-powered failure predictions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <PredictiveMaintenanceChart />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Maintenance Alerts</CardTitle>
                <CardDescription>Equipment requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <MaintenanceAlerts />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="equipment">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Inventory</CardTitle>
              <CardDescription>Complete list of monitored equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <EquipmentList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Alerts</CardTitle>
              <CardDescription>Detailed view of all maintenance alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Detailed alerts will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
              <CardDescription>Historical record of all maintenance activities</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Maintenance history will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
