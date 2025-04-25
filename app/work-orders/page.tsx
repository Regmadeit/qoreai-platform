import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WorkOrderTable } from "@/components/work-orders/work-order-table"
import { PageHeader } from "@/components/page-header"
import { PlusCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function WorkOrders() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Work Orders"
        description="Create, manage, and track work orders across your organization"
        actions={
          <div className="flex gap-2">
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/work-orders/new">
              <Button className="bg-qore-blue hover:bg-blue-800">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Work Order
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Work Orders</CardTitle>
          <CardDescription>View and manage all work orders</CardDescription>
        </CardHeader>
        <CardContent>
          <WorkOrderTable />
        </CardContent>
      </Card>
    </div>
  )
}
