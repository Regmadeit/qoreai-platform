import { NextResponse } from "next/server"
import type { User } from "@/types"

// Mock data - in a real app, this would come from a database
const users: User[] = [
  {
    id: "user-001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "manager",
    department: "Operations",
    avatar: "/placeholder.svg?key=tpv3m",
    createdAt: "2022-01-15T08:00:00Z",
    updatedAt: "2023-09-20T14:30:00Z",
    lastLogin: "2023-10-19T08:45:00Z",
    status: "active",
  },
  {
    id: "user-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "maintenance",
    department: "Maintenance",
    avatar: "/placeholder.svg?key=2r454",
    createdAt: "2022-02-10T09:15:00Z",
    updatedAt: "2023-08-15T11:20:00Z",
    lastLogin: "2023-10-19T07:30:00Z",
    status: "active",
  },
  {
    id: "user-003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "maintenance",
    department: "Maintenance",
    avatar: "/placeholder.svg?key=nffpk",
    createdAt: "2022-03-05T10:30:00Z",
    updatedAt: "2023-07-22T16:45:00Z",
    lastLogin: "2023-10-18T16:20:00Z",
    status: "active",
  },
  {
    id: "user-004",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "operator",
    department: "Production",
    avatar: "/placeholder.svg?key=70pgu",
    createdAt: "2022-04-20T11:45:00Z",
    updatedAt: "2023-09-10T09:30:00Z",
    lastLogin: "2023-10-19T06:15:00Z",
    status: "active",
  },
  {
    id: "user-005",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "supervisor",
    department: "Production",
    avatar: "/placeholder.svg?key=57yps",
    createdAt: "2022-05-15T13:00:00Z",
    updatedAt: "2023-08-28T14:15:00Z",
    lastLogin: "2023-10-18T15:40:00Z",
    status: "active",
  },
]

export const dynamic = 'force-static'

export async function GET() {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(users)
}
