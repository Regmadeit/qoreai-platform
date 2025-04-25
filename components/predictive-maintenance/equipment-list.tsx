import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const equipment = [
  {
    id: "EQ-001",
    name: "Stadler Optical Sorter",
    type: "Optical Sorting System",
    health: "critical",
    prediction: "7 days",
    lastMaintenance: "Jan 15, 2025",
  },
  {
    id: "EQ-002",
    name: "Stadler Ballistic Separator",
    type: "Ballistic Separator",
    health: "warning",
    prediction: "14 days",
    lastMaintenance: "Feb 10, 2025",
  },
  {
    id: "EQ-003",
    name: "Krones Washline Unit #1",
    type: "Bottle Washing System",
    health: "good",
    prediction: "45 days",
    lastMaintenance: "Mar 5, 2025",
  },
  {
    id: "EQ-004",
    name: "Krones Labeler #1",
    type: "Labeling Machine",
    health: "warning",
    prediction: "21 days",
    lastMaintenance: "Feb 28, 2025",
  },
  {
    id: "EQ-005",
    name: "Stadler Conveyor Belt #3",
    type: "Conveyor System",
    health: "good",
    prediction: "60 days",
    lastMaintenance: "Mar 20, 2025",
  },
]

export function EquipmentList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Health</TableHead>
            <TableHead>Predicted Failure</TableHead>
            <TableHead>Last Maintenance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    item.health === "good"
                      ? "border-green-500 text-green-500"
                      : item.health === "warning"
                        ? "border-amber-500 text-amber-500"
                        : "border-red-500 text-red-500"
                  }
                >
                  {item.health === "good" ? "Good" : item.health === "warning" ? "Warning" : "Critical"}
                </Badge>
              </TableCell>
              <TableCell>{item.prediction}</TableCell>
              <TableCell>{item.lastMaintenance}</TableCell>
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
