import { NextResponse } from "next/server"
import type { Notification } from "@/types"

// Mock data - in a real app, this would come from a database
const notifications: Notification[] = [
  {
    id: "notif-001",
    title: "Work Order Assigned",
    message: "You have been assigned a new work order: Repair Conveyor Belt A1",
    type: "work-order",
    status: "unread",
    createdAt: "2023-10-19T09:15:00Z",
    userId: "user-002",
    relatedItemId: "wo-001",
    relatedItemType: "work-order",
    priority: "high",
  },
  {
    id: "notif-002",
    title: "Checklist Due Soon",
    message: "Weekly Hydraulic Press Inspection is due in 24 hours",
    type: "checklist",
    status: "unread",
    createdAt: "2023-10-18T14:30:00Z",
    userId: "user-003",
    relatedItemId: "cl-002",
    relatedItemType: "checklist",
    priority: "medium",
  },
  {
    id: "notif-003",
    title: "Equipment Alert",
    message: "Hydraulic Press B2 pressure sensor reading is critical: 2800 PSI",
    type: "alert",
    status: "read",
    createdAt: "2023-10-18T10:45:00Z",
    userId: "user-001",
    relatedItemId: "eq-002",
    relatedItemType: "equipment",
    priority: "critical",
  },
  {
    id: "notif-004",
    title: "Maintenance Completed",
    message: "Scheduled maintenance for Conveyor Belt A1 has been completed",
    type: "maintenance",
    status: "read",
    createdAt: "2023-10-17T16:20:00Z",
    userId: "user-001",
    relatedItemId: "eq-001",
    relatedItemType: "equipment",
    priority: "low",
  },
  {
    id: "notif-005",
    title: "Inventory Alert",
    message: "Hydraulic Oil is running low (5 units remaining)",
    type: "inventory",
    status: "unread",
    createdAt: "2023-10-19T08:30:00Z",
    userId: "user-005",
    relatedItemId: "part-003",
    relatedItemType: "inventory",
    priority: "medium",
  },
]

export const dynamic = 'force-static'

export async function GET() {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(notifications)
}

export async function POST(request: Request) {
  const { notificationId } = await request.json()

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would update the database
  // Here we're just returning a success response

  return NextResponse.json({ success: true, notificationId })
}
