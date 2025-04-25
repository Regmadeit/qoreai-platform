import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const workOrders = [
  {
    id: "WO-2023-1234",
    title: "Pump Maintenance",
    assignee: "John Smith",
    status: "in-progress",
    priority: "high",
    created: "Apr 18, 2025",
    due: "Apr 25, 2025",
  },
  {
    id: "WO-2023-1235",
    title: "Conveyor Belt Repair",
    assignee: "Sarah Johnson",
    status: "pending",
    priority: "medium",
    created: "Apr 19, 2025",
    due: "Apr 26, 2025",
  },
  {
    id: "WO-2023-1236",
    title: "Electrical System Check",
    assignee: "Mike Brown",
    status: "completed",
    priority: "low",
    created: "Apr 20, 2025",
    due: "Apr 27, 2025",
  },
  {
    id: "WO-2023-1237",
    title: "HVAC Maintenance",
    assignee: "Lisa Davis",
    status: "in-progress",
    priority: "medium",
    created: "Apr 21, 2025",
    due: "Apr 28, 2025",
  },
  {
    id: "WO-2023-1238",
    title: "Safety Inspection",
    assignee: "David Wilson",
    status: "pending",
    priority: "high",
    created: "Apr 22, 2025",
    due: "Apr 29, 2025",
  },
  {
    id: "WO-2023-1239",
    title: "Lubrication Service",
    assignee: "Emily Clark",
    status: "completed",
    priority: "medium",
    created: "Apr 23, 2025",
    due: "Apr 30, 2025",
  },
  {
    id: "WO-2023-1240",
    title: "Filter Replacement",
    assignee: "Robert Lee",
    status: "in-progress",
    priority: "low",
    created: "Apr 24, 2025",
    due: "May 1, 2025",
  },
]

export function WorkOrderTable() {
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
            <TableHead>Due Date</TableHead>
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
              <TableCell>{order.due}</TableCell>
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
