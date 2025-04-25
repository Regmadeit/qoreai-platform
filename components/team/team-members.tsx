"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Operations Manager",
    department: "Operations",
    shift: "Morning",
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Maintenance Technician",
    department: "Maintenance",
    shift: "Evening",
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Process Engineer",
    department: "Engineering",
    shift: "Morning",
    status: "inactive",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Logistics Coordinator",
    department: "Logistics",
    shift: "Night",
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    role: "Maintenance Supervisor",
    department: "Maintenance",
    shift: "Morning",
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Jennifer Martinez",
    email: "jennifer.martinez@example.com",
    role: "Quality Control Specialist",
    department: "Quality",
    shift: "Evening",
    status: "active",
    avatar: "/placeholder.svg",
  },
  {
    id: 7,
    name: "David Thompson",
    email: "david.thompson@example.com",
    role: "Equipment Operator",
    department: "Operations",
    shift: "Night",
    status: "inactive",
    avatar: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Lisa Garcia",
    email: "lisa.garcia@example.com",
    role: "Safety Coordinator",
    department: "Safety",
    shift: "Morning",
    status: "active",
    avatar: "/placeholder.svg",
  },
]

export function TeamMembers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [shiftFilter, setShiftFilter] = useState("all")

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment =
      departmentFilter === "all" || member.department.toLowerCase() === departmentFilter.toLowerCase()
    const matchesShift = shiftFilter === "all" || member.shift.toLowerCase() === shiftFilter.toLowerCase()

    return matchesSearch && matchesDepartment && matchesShift
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="logistics">Logistics</SelectItem>
            <SelectItem value="quality">Quality</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
          </SelectContent>
        </Select>
        <Select value={shiftFilter} onValueChange={setShiftFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Shifts</SelectItem>
            <SelectItem value="morning">Morning</SelectItem>
            <SelectItem value="evening">Evening</SelectItem>
            <SelectItem value="night">Night</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>{member.shift}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      member.status === "active" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
                    }
                  >
                    {member.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
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
    </div>
  )
}
