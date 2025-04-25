"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarcodeScanner } from "@/components/barcode/barcode-scanner"
import { ArrowLeft, Truck, PackageCheck, Clipboard, Search } from "lucide-react"
import Link from "next/link"

interface ShipmentRecord {
  id: string
  type: "inbound" | "outbound"
  bolNumber: string
  aocNumber?: string
  date: string
  status: "pending" | "completed" | "rejected"
  commodities: Array<{
    type: string
    quantity: string
    unit: string
  }>
}

export default function ShippingReceivingPage() {
  const [activeTab, setActiveTab] = useState("inbound")
  const [scannedBol, setScannedBol] = useState<string | null>(null)
  const [scannedAoc, setScannedAoc] = useState<string | null>(null)
  const [shipments, setShipments] = useState<ShipmentRecord[]>([
    {
      id: "SHP-001",
      type: "inbound",
      bolNumber: "BOL1234567890",
      date: "2025-04-23",
      status: "completed",
      commodities: [
        { type: "HDPE ROY", quantity: "12000", unit: "lbs" },
        { type: "PET Clear", quantity: "8500", unit: "lbs" },
      ],
    },
    {
      id: "SHP-002",
      type: "outbound",
      bolNumber: "BOL9876543210",
      aocNumber: "AOC12345-2025",
      date: "2025-04-22",
      status: "completed",
      commodities: [
        { type: "Flake", quantity: "15000", unit: "lbs" },
        { type: "PP", quantity: "7200", unit: "lbs" },
      ],
    },
    {
      id: "SHP-003",
      type: "inbound",
      bolNumber: "BOL5678901234",
      date: "2025-04-24",
      status: "pending",
      commodities: [{ type: "HDPE Color", quantity: "9800", unit: "lbs" }],
    },
  ])

  const handleBolScan = (bolNumber: string) => {
    setScannedBol(bolNumber)
  }

  const handleAocScan = (aocNumber: string) => {
    setScannedAoc(aocNumber)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Shipping & Receiving"
        description="Manage inbound and outbound shipments"
        actions={
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="inbound">Inbound Shipments</TabsTrigger>
          <TabsTrigger value="outbound">Outbound Shipments</TabsTrigger>
          <TabsTrigger value="history">Shipment History</TabsTrigger>
        </TabsList>

        <TabsContent value="inbound" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <BarcodeScanner onScan={handleBolScan} scanType="bol" buttonText="Scan Inbound BOL" />

            <Card>
              <CardHeader>
                <CardTitle>Inbound Shipment Details</CardTitle>
                <CardDescription>Enter or scan shipment information</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="bol-number">BOL Number</Label>
                    <Input
                      id="bol-number"
                      value={scannedBol || ""}
                      onChange={(e) => setScannedBol(e.target.value)}
                      placeholder="Enter or scan BOL number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="shipment-date">Shipment Date</Label>
                    <Input id="shipment-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>

                  <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select>
                      <SelectTrigger id="supplier">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supplier-1">ABC Recycling</SelectItem>
                        <SelectItem value="supplier-2">XYZ Materials</SelectItem>
                        <SelectItem value="supplier-3">Green Planet Recyclers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button className="bg-qore-blue hover:bg-blue-800 w-full">
                      <Truck className="mr-2 h-4 w-4" />
                      Process Inbound Shipment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pending Inbound Shipments</CardTitle>
              <CardDescription>Shipments awaiting processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">BOL Number</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Commodities</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments
                      .filter((shipment) => shipment.type === "inbound" && shipment.status === "pending")
                      .map((shipment) => (
                        <tr key={shipment.id} className="border-b">
                          <td className="py-3 px-2">{shipment.bolNumber}</td>
                          <td className="py-3 px-2">{shipment.date}</td>
                          <td className="py-3 px-2">
                            {shipment.commodities.map((commodity, index) => (
                              <div key={index}>
                                {commodity.type}: {commodity.quantity} {commodity.unit}
                              </div>
                            ))}
                          </td>
                          <td className="py-3 px-2">
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                              Pending
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Search className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <PackageCheck className="h-3 w-3 mr-1" />
                                Receive
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {shipments.filter((shipment) => shipment.type === "inbound" && shipment.status === "pending")
                      .length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-muted-foreground">
                          No pending inbound shipments
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outbound" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <BarcodeScanner onScan={handleBolScan} scanType="bol" buttonText="Scan Outbound BOL" />

            <BarcodeScanner onScan={handleAocScan} scanType="aoc" buttonText="Scan AOC" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Outbound Shipment Details</CardTitle>
              <CardDescription>Enter or scan shipment information</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="outbound-bol">BOL Number</Label>
                    <Input
                      id="outbound-bol"
                      value={scannedBol || ""}
                      onChange={(e) => setScannedBol(e.target.value)}
                      placeholder="Enter or scan BOL number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="aoc-number">AOC Number</Label>
                    <Input
                      id="aoc-number"
                      value={scannedAoc || ""}
                      onChange={(e) => setScannedAoc(e.target.value)}
                      placeholder="Enter or scan AOC number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="shipment-date">Shipment Date</Label>
                  <Input id="shipment-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>

                <div>
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger id="customer">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-1">Acme Plastics</SelectItem>
                      <SelectItem value="customer-2">EcoProcess Industries</SelectItem>
                      <SelectItem value="customer-3">Sustainable Materials Co.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button className="bg-qore-blue hover:bg-blue-800 w-full">
                    <Truck className="mr-2 h-4 w-4" />
                    Process Outbound Shipment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Outbound Shipments</CardTitle>
              <CardDescription>Shipments ready for dispatch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">BOL Number</th>
                      <th className="text-left py-3 px-2">AOC Number</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Commodities</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments
                      .filter((shipment) => shipment.type === "outbound" && shipment.status === "pending")
                      .map((shipment) => (
                        <tr key={shipment.id} className="border-b">
                          <td className="py-3 px-2">{shipment.bolNumber}</td>
                          <td className="py-3 px-2">{shipment.aocNumber || "—"}</td>
                          <td className="py-3 px-2">{shipment.date}</td>
                          <td className="py-3 px-2">
                            {shipment.commodities.map((commodity, index) => (
                              <div key={index}>
                                {commodity.type}: {commodity.quantity} {commodity.unit}
                              </div>
                            ))}
                          </td>
                          <td className="py-3 px-2">
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                              Pending
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Search className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <Clipboard className="h-3 w-3 mr-1" />
                                Complete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {shipments.filter((shipment) => shipment.type === "outbound" && shipment.status === "pending")
                      .length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-muted-foreground">
                          No pending outbound shipments
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
                    {shipments
                      .filter((shipment) => shipment.status === "completed" || shipment.status === "rejected")
                      .map((shipment) => (
                        <tr key={shipment.id} className="border-b">
                          <td className="py-3 px-2">{shipment.id}</td>
                          <td className="py-3 px-2">{shipment.type === "inbound" ? "Inbound" : "Outbound"}</td>
                          <td className="py-3 px-2">{shipment.bolNumber}</td>
                          <td className="py-3 px-2">{shipment.aocNumber || "—"}</td>
                          <td className="py-3 px-2">{shipment.date}</td>
                          <td className="py-3 px-2">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                shipment.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {shipment.status === "completed" ? "Completed" : "Rejected"}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <Button size="sm" variant="outline">
                              <Search className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
