"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogisticsMap } from "@/components/logistics/logistics-map"
import { ShipmentTable } from "@/components/logistics/shipment-table"
import { InventoryStatus } from "@/components/logistics/inventory-status"
import { PageHeader } from "@/components/page-header"
import { Truck, Plus, ArrowLeft, PackageCheck, Clipboard } from "lucide-react"
import { TrailerPoolsTable } from "@/components/logistics/trailer-pools-table"
import { TrailerStatusCard } from "@/components/logistics/trailer-status-card"
import { BarcodeScanner } from "@/components/barcode/barcode-scanner"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Logistics() {
  const [scannedBol, setScannedBol] = useState<string | null>(null)
  const [scannedAoc, setScannedAoc] = useState<string | null>(null)
  const router = useRouter()

  const handleBolScan = (bolNumber: string) => {
    setScannedBol(bolNumber)
  }

  const handleAocScan = (aocNumber: string) => {
    setScannedAoc(aocNumber)
  }

  const handleNewShipment = () => {
    router.push("/shipments/new")
  }

  const handleAddTrailer = () => {
    router.push("/trailers/new")
  }

  const handleNewPool = () => {
    router.push("/trailer-pools/new")
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Logistics & Tracking"
        description="Real-time logistics tracking and inventory management"
        actions={
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="bg-qore-blue hover:bg-blue-800" onClick={handleNewShipment}>
              <Truck className="mr-2 h-4 w-4" />
              New Shipment
            </Button>
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4 md:hidden" />
                <span className="md:hidden">Back</span>
                <span className="hidden md:inline">Back to Dashboard</span>
              </Button>
            </Link>
          </div>
        }
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="shipping-receiving">Shipping & Receiving</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="trailers">Trailers</TabsTrigger>
          <TabsTrigger value="pools">Trailer Pools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Available Trailers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Shipment Tracking</CardTitle>
              <CardDescription>Real-time location of active shipments</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] p-0">
              <LogisticsMap />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Shipments</CardTitle>
                <CardDescription>Latest shipment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ShipmentTable />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Current inventory levels</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryStatus />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shipments">
          <Card>
            <CardHeader>
              <CardTitle>All Shipments</CardTitle>
              <CardDescription>Comprehensive view of all shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Shipments content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping-receiving" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <BarcodeScanner onScan={handleBolScan} scanType="bol" buttonText="Scan BOL" />
            <BarcodeScanner onScan={handleAocScan} scanType="aoc" buttonText="Scan AOC" />
          </div>

          <Tabs defaultValue="inbound" className="space-y-4">
            <TabsList>
              <TabsTrigger value="inbound">Inbound Shipments</TabsTrigger>
              <TabsTrigger value="outbound">Outbound Shipments</TabsTrigger>
              <TabsTrigger value="history">Shipment History</TabsTrigger>
            </TabsList>

            <TabsContent value="inbound">
              <Card>
                <CardHeader>
                  <CardTitle>Inbound Shipment Details</CardTitle>
                  <CardDescription>Enter or scan shipment information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">BOL Number</label>
                        <input
                          type="text"
                          value={scannedBol || ""}
                          className="w-full p-2 border rounded"
                          placeholder="Enter or scan BOL number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Shipment Date</label>
                        <input
                          type="date"
                          className="w-full p-2 border rounded"
                          defaultValue={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Contents</label>
                      <select className="w-full p-2 border rounded">
                        <option value="">Select contents...</option>
                        <option value="PP Other">PP Other</option>
                        <option value="PET Color">PET Color</option>
                        <option value="HD Color">HD Color (Raw Material)</option>
                        <option value="PET Clear Flake">PET Clear Flake</option>
                        <option value="Flake Fines">Flake Fines</option>
                        <option value="Flake Caps & Rings">Flake Caps & Rings</option>
                        <option value="Flake Reject">Flake Reject</option>
                      </select>
                    </div>

                    <Button className="bg-qore-blue hover:bg-blue-800 w-full">
                      <PackageCheck className="mr-2 h-4 w-4" />
                      Process Inbound Shipment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="outbound">
              <Card>
                <CardHeader>
                  <CardTitle>Outbound Shipment Details</CardTitle>
                  <CardDescription>Enter or scan shipment information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">BOL Number</label>
                        <input
                          type="text"
                          value={scannedBol || ""}
                          className="w-full p-2 border rounded"
                          placeholder="Enter or scan BOL number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">AOC Number</label>
                        <input
                          type="text"
                          value={scannedAoc || ""}
                          className="w-full p-2 border rounded"
                          placeholder="Enter or scan AOC number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Shipment Date</label>
                        <input
                          type="date"
                          className="w-full p-2 border rounded"
                          defaultValue={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Buyer Name</label>
                        <input type="text" className="w-full p-2 border rounded" placeholder="Enter buyer name" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Contents</label>
                      <select className="w-full p-2 border rounded">
                        <option value="">Select contents...</option>
                        <option value="PP Other">PP Other</option>
                        <option value="PET Color">PET Color</option>
                        <option value="HD Color">HD Color (Raw Material)</option>
                        <option value="PET Clear Flake">PET Clear Flake</option>
                        <option value="Flake Fines">Flake Fines</option>
                        <option value="Flake Caps & Rings">Flake Caps & Rings</option>
                        <option value="Flake Reject">Flake Reject</option>
                      </select>
                    </div>

                    <Button className="bg-qore-blue hover:bg-blue-800 w-full">
                      <Clipboard className="mr-2 h-4 w-4" />
                      Process Outbound Shipment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Shipment History</CardTitle>
                  <CardDescription>Record of all processed shipments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">ID</th>
                          <th className="text-left py-3 px-2">Type</th>
                          <th className="text-left py-3 px-2">BOL Number</th>
                          <th className="text-left py-3 px-2">AOC Number</th>
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Status</th>
                          <th className="text-left py-3 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-2">SHP-001</td>
                          <td className="py-3 px-2">Inbound</td>
                          <td className="py-3 px-2">BOL1234567890</td>
                          <td className="py-3 px-2">—</td>
                          <td className="py-3 px-2">2025-04-23</td>
                          <td className="py-3 px-2">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Completed
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2">SHP-002</td>
                          <td className="py-3 px-2">Outbound</td>
                          <td className="py-3 px-2">BOL9876543210</td>
                          <td className="py-3 px-2">AOC12345-2025</td>
                          <td className="py-3 px-2">2025-04-22</td>
                          <td className="py-3 px-2">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Completed
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Complete inventory tracking and management</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Inventory content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trailers">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Trailer Management</CardTitle>
                <CardDescription>Track and manage all trailers</CardDescription>
              </div>
              <Button size="sm" onClick={handleAddTrailer}>
                <Plus className="mr-1 h-4 w-4" />
                Add Trailer
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <TrailerStatusCard status="Empty" count={8} color="bg-gray-200" />
                <TrailerStatusCard status="Preloaded" count={5} color="bg-blue-200" />
                <TrailerStatusCard status="In Route" count={12} color="bg-amber-200" />
                <TrailerStatusCard status="In Service" count={7} color="bg-green-200" />
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Trailer ID</th>
                      <th className="text-left py-3 px-2">Type</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Location</th>
                      <th className="text-left py-3 px-2">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2">TR-1001</td>
                      <td className="py-3 px-2">Flatbed</td>
                      <td className="py-3 px-2">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          In Service
                        </span>
                      </td>
                      <td className="py-3 px-2">Warehouse A</td>
                      <td className="py-3 px-2">2 hours ago</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">TR-1002</td>
                      <td className="py-3 px-2">Box</td>
                      <td className="py-3 px-2">
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                          In Route
                        </span>
                      </td>
                      <td className="py-3 px-2">Highway 95</td>
                      <td className="py-3 px-2">30 minutes ago</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">TR-1003</td>
                      <td className="py-3 px-2">Refrigerated</td>
                      <td className="py-3 px-2">
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                          Empty
                        </span>
                      </td>
                      <td className="py-3 px-2">Yard B</td>
                      <td className="py-3 px-2">1 day ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pools">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Trailer Pools by Buyer</CardTitle>
                <CardDescription>Manage trailer pools assigned to specific buyers</CardDescription>
              </div>
              <Button size="sm" onClick={handleNewPool}>
                <Plus className="mr-1 h-4 w-4" />
                New Pool
              </Button>
            </CardHeader>
            <CardContent>
              <TrailerPoolsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
