import { NextResponse } from "next/server"
import type { WorkOrder } from "@/types"

// Mock data - in a real app, this would come from a database
const workOrders: WorkOrder[] = [
  {
    id: "wo-001",
    title: "Repair Conveyor Belt A1",
    description: "Belt is slipping and needs adjustment",
    priority: "high",
    status: "in-progress",
    equipmentId: "eq-001",
    equipmentName: "Conveyor Belt A1",
    assignedTo: "user-002",
    assignedToName: "Jane Smith",
    createdBy: "user-001",
    createdByName: "John Doe",
    createdAt: "2023-10-18T14:30:00Z",
    updatedAt: "2023-10-19T09:15:00Z",
    estimatedCompletionTime: "2023-10-20T17:00:00Z",
    actualCompletionTime: null,
    parts: [
      { id: "part-001", name: "Drive Belt", quantity: 1 },
      { id: "part-002", name: "Tensioner", quantity: 2 },
    ],
    notes: [
      {
        id: "note-001",
        text: "Ordered replacement parts",
        createdBy: "user-002",
        createdByName: "Jane Smith",
        createdAt: "2023-10-18T15:45:00Z",
      },
    ],
  },
  {
    id: "wo-002",
    title: "Hydraulic Press B2 Maintenance",
    description: "Scheduled monthly maintenance",
    priority: "medium",
    status: "pending",
    equipmentId: "eq-002",
    equipmentName: "Hydraulic Press B2",
    assignedTo: "user-003",
    assignedToName: "Mike Johnson",
    createdBy: "user-001",
    createdByName: "John Doe",
    createdAt: "2023-10-17T11:20:00Z",
    updatedAt: "2023-10-17T11:20:00Z",
    estimatedCompletionTime: "2023-10-22T16:00:00Z",
    actualCompletionTime: null,
    parts: [
      { id: "part-003", name: "Hydraulic Oil", quantity: 5 },
      { id: "part-004", name: "Oil Filter", quantity: 1 },
    ],
    notes: [],
  },
]

export const dynamic = 'force-static'

export async function GET() {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(workOrders)
}

export async function POST(request: Request) {
  const newWorkOrder = await request.json()

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would validate and save to a database
  const createdWorkOrder: WorkOrder = {
    ...newWorkOrder,
    id: `wo-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "pending",
    notes: [],
  }

  return NextResponse.json(createdWorkOrder, { status: 201 })
}
