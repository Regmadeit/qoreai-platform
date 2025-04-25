import { NextResponse } from "next/server"
import type { Checklist } from "@/types"

// Mock data - in a real app, this would come from a database
const checklists: Checklist[] = [
  {
    id: "cl-001",
    title: "Daily Conveyor Inspection",
    description: "Standard daily inspection for conveyor systems",
    equipmentId: "eq-001",
    equipmentName: "Conveyor Belt A1",
    createdBy: "user-001",
    createdByName: "John Doe",
    createdAt: "2023-10-01T08:00:00Z",
    updatedAt: "2023-10-15T09:30:00Z",
    frequency: "daily",
    items: [
      {
        id: "item-001",
        description: "Check belt tension",
        required: true,
        completed: false,
      },
      {
        id: "item-002",
        description: "Inspect drive motor",
        required: true,
        completed: false,
      },
      {
        id: "item-003",
        description: "Check alignment",
        required: true,
        completed: false,
      },
      {
        id: "item-004",
        description: "Lubricate bearings",
        required: false,
        completed: false,
      },
    ],
    status: "active",
    assignedTo: "user-004",
    assignedToName: "Sarah Williams",
    dueDate: "2023-10-20T17:00:00Z",
    completedDate: null,
  },
  {
    id: "cl-002",
    title: "Weekly Hydraulic Press Inspection",
    description: "Standard weekly inspection for hydraulic press systems",
    equipmentId: "eq-002",
    equipmentName: "Hydraulic Press B2",
    createdBy: "user-001",
    createdByName: "John Doe",
    createdAt: "2023-10-05T10:15:00Z",
    updatedAt: "2023-10-12T14:20:00Z",
    frequency: "weekly",
    items: [
      {
        id: "item-005",
        description: "Check hydraulic fluid level",
        required: true,
        completed: true,
      },
      {
        id: "item-006",
        description: "Inspect hoses for leaks",
        required: true,
        completed: true,
      },
      {
        id: "item-007",
        description: "Test pressure relief valve",
        required: true,
        completed: false,
      },
      {
        id: "item-008",
        description: "Check electrical connections",
        required: true,
        completed: false,
      },
    ],
    status: "in-progress",
    assignedTo: "user-003",
    assignedToName: "Mike Johnson",
    dueDate: "2023-10-19T17:00:00Z",
    completedDate: null,
  },
]

export const dynamic = 'force-static'

export async function GET() {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(checklists)
}

export async function POST(request: Request) {
  const newChecklist = await request.json()

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would validate and save to a database
  const createdChecklist: Checklist = {
    ...newChecklist,
    id: `cl-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "active",
  }

  return NextResponse.json(createdChecklist, { status: 201 })
}
