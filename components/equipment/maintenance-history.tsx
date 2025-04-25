"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { MaintenanceRecord } from "@/types/equipment"

interface MaintenanceHistoryProps {
  equipmentId: string
}

// Mock maintenance history data
const maintenanceHistoryData: Record<string, MaintenanceRecord[]> = {
  "EQ-001": [
    {
      id: "MH-001",
      equipmentId: "EQ-001",
      type: "preventive",
      description: "Quarterly sensor calibration and belt inspection",
      technician: "John Smith",
      date: "Jan 15, 2025",
      duration: "4 hours",
      parts: ["Calibration kit", "Belt tensioner"],
      status: "completed",
    },
    {
      id: "MH-002",
      equipmentId: "EQ-001",
      type: "corrective",
      description: "Replace worn air valves in ejection system",
      technician: "Sarah Johnson",
      date: "Nov 10, 2024",
      duration: "6 hours",
      parts: ["Air valve assembly (x4)", "Pneumatic tubing"],
      status: "completed",
    },
    {
      id: "MH-003",
      equipmentId: "EQ-001",
      type: "preventive",
      description: "Quarterly sensor calibration and belt inspection",
      technician: "John Smith",
      date: "Oct 15, 2024",
      duration: "4 hours",
      parts: ["Calibration kit", "Belt tensioner"],
      status: "completed",
    },
    {
      id: "MH-004",
      equipmentId: "EQ-001",
      type: "corrective",
      description: "Replace damaged light source in NIR sensor",
      technician: "Michael Brown",
      date: "Aug 23, 2024",
      duration: "3 hours",
      parts: ["NIR light source", "Optical filter"],
      status: "completed",
    },
    {
      id: "MH-005",
      equipmentId: "EQ-001",
      type: "preventive",
      description: "Quarterly sensor calibration and belt inspection",
      technician: "John Smith",
      date: "Jul 15, 2024",
      duration: "4 hours",
      parts: ["Calibration kit", "Belt tensioner"],
      status: "completed",
    },
  ],
  "EQ-002": [
    {
      id: "MH-006",
      equipmentId: "EQ-002",
      type: "preventive",
      description: "Quarterly paddle inspection and lubrication",
      technician: "Robert Wilson",
      date: "Feb 10, 2025",
      duration: "5 hours",
      parts: ["Lubricant", "Bearing kit"],
      status: "completed",
    },
    {
      id: "MH-007",
      equipmentId: "EQ-002",
      type: "corrective",
      description: "Replace worn paddle assembly",
      technician: "Sarah Johnson",
      date: "Dec 5, 2024",
      duration: "8 hours",
      parts: ["Paddle assembly", "Mounting hardware"],
      status: "completed",
    },
  ],
  "EQ-003": [
    {
      id: "MH-008",
      equipmentId: "EQ-003",
      type: "preventive",
      description: "Quarterly inspection and cleaning of washing system",
      technician: "Emily Davis",
      date: "Mar 5, 2025",
      duration: "6 hours",
      parts: ["Cleaning solution", "Filter set"],
      status: "completed",
    },
  ],
}

export function MaintenanceHistory({ equipmentId }: MaintenanceHistoryProps) {
  const maintenanceRecords = maintenanceHistoryData[equipmentId] || []

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceRecords.length > 0 ? (
            maintenanceRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.id}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>{record.technician}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.duration}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      record.status === "completed"
                        ? "border-green-500 text-green-500"
                        : record.status === "in-progress"
                          ? "border-blue-500 text-blue-500"
                          : "border-amber-500 text-amber-500"
                    }
                  >
                    {record.status === "completed"
                      ? "Completed"
                      : record.status === "in-progress"
                        ? "In Progress"
                        : "Scheduled"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                No maintenance history available for this equipment.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
