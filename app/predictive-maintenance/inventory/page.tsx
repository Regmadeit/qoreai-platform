import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { ArrowLeft, Plus, Filter, Download, BarChart2 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample inventory data
const inventoryItems = [
  {
    id: "INV-001",
    name: "Hydraulic Pump",
    category: "Spare Parts",
    location: "Warehouse A",
    quantity: 12,
    minQuantity: 5,
    status: "In Stock",
    lastUpdated: "Apr 20, 2025",
  },
  {
    id: "INV-002",
    name: "Air Filter",
    category: "Consumables",
    location: "Warehouse B",
    quantity: 45,
    minQuantity: 20,
    status: "In Stock",
    lastUpdated: "Apr 19, 2025",
  },
  {
    id: "INV-003",
    name: "Drive Belt",
    category: "Spare Parts",
    location: "Warehouse A",
    quantity: 8,
    minQuantity: 10,
    status: "Low Stock",
    lastUpdated: "Apr 18, 2025",
  },
  {
    id: "INV-004",
    name: "Lubricant",
    category: "Consumables",
    location: "Warehouse C",
    quantity: 32,
    minQuantity: 15,
    status: "In Stock",
    lastUpdated: "Apr 17, 2025",
  },
  {
    id: "INV-005",
    name: "Bearing Assembly",
    category: "Spare Parts",
    location: "Warehouse B",
    quantity: 3,
    minQuantity: 5,
    status: "Low Stock",
    lastUpdated: "Apr 16, 2025",
  },
  {
    id: "INV-006",
    name: "Control Panel",
    category: "Electronics",
    location: "Warehouse A",
    quantity: 0,
    minQuantity: 2,
    status: "Out of Stock",
    lastUpdated: "Apr 15, 2025",
  },
  {
    id: "INV-007",
    name: "Sensor Kit",
    category: "Electronics",
    location: "Warehouse C",
    quantity: 7,
    minQuantity: 3,
    status: "In Stock",
    lastUpdated: "Apr 14, 2025",
  },
]

export default function MaintenanceInventory() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Maintenance Inventory"
        description="Track and manage spare parts and consumables"
        actions={
          <div className="flex gap-2">
            <Link href="/predictive-maintenance">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Maintenance
              </Button>
            </Link>
            <Link href="/predictive-maintenance/inventory/reports">
              <Button variant="outline">
                <BarChart2 className="mr-2 h-4 w-4" />
                Reports
              </Button>
            </Link>
            <Button className="bg-qore-blue hover:bg-blue-800">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">107</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">11</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>Manage spare parts and consumables</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input placeholder="Search inventory..." />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="spare-parts">Spare Parts</SelectItem>
                <SelectItem value="consumables">Consumables</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      {item.quantity} / {item.minQuantity}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.status === "In Stock"
                            ? "border-green-500 text-green-500"
                            : item.status === "Low Stock"
                              ? "border-amber-500 text-amber-500"
                              : "border-red-500 text-red-500"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
