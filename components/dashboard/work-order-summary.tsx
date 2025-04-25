import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Card, CardContent } from "@/components/ui/card"

const workOrders = [
  {
    id: "WO-2023-1234",
    title: "Pump Maintenance",
    assignee: "John Smith",
    status: "in-progress",
    priority: "high",
    created: "Apr 18, 2025",
  },
  {
    id: "WO-2023-1235",
    title: "Conveyor Belt Repair",
    assignee: "Sarah Johnson",
    status: "pending",
    priority: "medium",
    created: "Apr 19, 2025",
  },
  {
    id: "WO-2023-1236",
    title: "Electrical System Check",
    assignee: "Mike Brown",
    status: "completed",
    priority: "low",
    created: "Apr 20, 2025",
  },
  {
    id: "WO-2023-1237",
    title: "HVAC Maintenance",
    assignee: "Lisa Davis",
    status: "in-progress",
    priority: "medium",
    created: "Apr 21, 2025",
  },
  {
    id: "WO-2023-1238",
    title: "Safety Inspection",
    assignee: "David Wilson",
    status: "pending",
    priority: "high",
    created: "Apr 22, 2025",
  },
]

export function WorkOrderSummary() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  if (isMobile) {
    return (
      <div className="space-y-4">
        {workOrders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{order.title}</h3>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    order.priority === "high"
                      ? "border-red-500 text-red-500"
                      : order.priority === "medium"
                        ? "border-amber-500 text-amber-500"
                        : "border-green-500 text-green-500"
                  }
                >
                  {order.priority === "high" ? "High" : order.priority === "medium" ? "Medium" : "Low"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">Assignee:</span>
                  <p>{order.assignee}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p>{order.created}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Badge
                  variant="outline"
                  className={
                    order.status === "completed"
                      ? "border-green-500 text-green-500"
                      : order.status === "in-progress"
                        ? "border-blue-500 text-blue-500"
                        : "border-amber-500 text-amber-500"
                  }
                >
                  {order.status === "in-progress"
                    ? "In Progress"
                    : order.status === "pending"
                      ? "Pending"
                      : "Completed"}
                </Badge>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.title}</TableCell>
              <TableCell>{order.assignee}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    order.status === "completed"
                      ? "border-green-500 text-green-500"
                      : order.status === "in-progress"
                        ? "border-blue-500 text-blue-500"
                        : "border-amber-500 text-amber-500"
                  }
                >
                  {order.status === "in-progress"
                    ? "In Progress"
                    : order.status === "pending"
                      ? "Pending"
                      : "Completed"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    order.priority === "high"
                      ? "border-red-500 text-red-500"
                      : order.priority === "medium"
                        ? "border-amber-500 text-amber-500"
                        : "border-green-500 text-green-500"
                  }
                >
                  {order.priority === "high" ? "High" : order.priority === "medium" ? "Medium" : "Low"}
                </Badge>
              </TableCell>
              <TableCell>{order.created}</TableCell>
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
  )
}
