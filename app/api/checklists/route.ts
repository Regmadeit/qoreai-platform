import { NextResponse } from "next/server"

interface ChecklistItem {
  id: string
  description: string
  required: boolean
  completed: boolean
}

interface Checklist {
  id: string
  title: string
  type: string
  items: ChecklistItem[]
  createdAt: string
  dueDate: string
  assignedTo: string
  status: "pending" | "in-progress" | "completed"
}

// Mock data
const checklists: Checklist[] = [
  {
    id: "checklist-001",
    title: "Daily Equipment Inspection",
    type: "equipment",
    items: [
      {
        id: "item-001",
        description: "Check belt tension",
        required: true,
        completed: false,
      },
      {
        id: "item-002",
        description: "Inspect for wear and damage",
        required: true,
        completed: false,
      },
      {
        id: "item-003",
        description: "Test emergency stops",
        required: true,
        completed: false,
      },
      {
        id: "item-004",
        description: "Check oil levels",
        required: true,
        completed: false,
      },
    ],
    createdAt: "2024-04-25",
    dueDate: "2024-04-26",
    assignedTo: "John Smith",
    status: "pending",
  },
  {
    id: "checklist-002",
    title: "Weekly Safety Inspection",
    type: "safety",
    items: [
      {
        id: "item-001",
        description: "Check fire extinguishers",
        required: true,
        completed: false,
      },
      {
        id: "item-002",
        description: "Inspect emergency exits",
        required: true,
        completed: false,
      },
      {
        id: "item-003",
        description: "Test emergency lighting",
        required: true,
        completed: false,
      },
      {
        id: "item-004",
        description: "Check first aid supplies",
        required: true,
        completed: false,
      },
    ],
    createdAt: "2024-04-25",
    dueDate: "2024-05-02",
    assignedTo: "Sarah Wilson",
    status: "pending",
  },
]

export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json(checklists)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const newChecklist: Checklist = {
      id: `checklist-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString().split("T")[0],
      status: "pending",
    }
    checklists.push(newChecklist)
    return NextResponse.json(newChecklist)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create checklist" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()
    const index = checklists.findIndex((c) => c.id === data.id)
    if (index === -1) {
      return NextResponse.json(
        { error: "Checklist not found" },
        { status: 404 }
      )
    }
    checklists[index] = { ...checklists[index], ...data }
    return NextResponse.json(checklists[index])
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update checklist" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    const index = checklists.findIndex((c) => c.id === id)
    if (index === -1) {
      return NextResponse.json(
        { error: "Checklist not found" },
        { status: 404 }
      )
    }
    checklists.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete checklist" },
      { status: 500 }
    )
  }
}
