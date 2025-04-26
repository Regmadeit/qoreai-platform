import { NextResponse } from "next/server"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  status: "read" | "unread"
  createdAt: string
  userId: string
}

// Mock data
const notifications: Notification[] = [
  {
    id: "notif-001",
    title: "Equipment Maintenance Due",
    message: "Scheduled maintenance for Pump A1 is due tomorrow",
    type: "warning",
    status: "unread",
    createdAt: "2024-04-25T10:00:00Z",
    userId: "user-001",
  },
  {
    id: "notif-002",
    title: "Safety Inspection Complete",
    message: "Weekly safety inspection has been completed successfully",
    type: "success",
    status: "unread",
    createdAt: "2024-04-25T09:30:00Z",
    userId: "user-001",
  },
  {
    id: "notif-003",
    title: "Low Inventory Alert",
    message: "Raw material inventory is below minimum threshold",
    type: "error",
    status: "unread",
    createdAt: "2024-04-25T09:00:00Z",
    userId: "user-001",
  },
  {
    id: "notif-004",
    title: "System Update",
    message: "System maintenance scheduled for tonight at 22:00",
    type: "info",
    status: "read",
    createdAt: "2024-04-24T15:00:00Z",
    userId: "user-001",
  },
]

export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json(notifications)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      ...data,
      status: "unread",
      createdAt: new Date().toISOString(),
    }
    notifications.push(newNotification)
    return NextResponse.json(newNotification)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()
    const index = notifications.findIndex((n) => n.id === data.id)
    if (index === -1) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      )
    }
    notifications[index] = { ...notifications[index], ...data }
    return NextResponse.json(notifications[index])
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    const index = notifications.findIndex((n) => n.id === id)
    if (index === -1) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      )
    }
    notifications.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 }
    )
  }
}
