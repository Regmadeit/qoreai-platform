import { NextResponse } from "next/server"

interface Equipment {
  id: string
  name: string
  type: string
  status: "operational" | "maintenance" | "offline"
  location: string
  lastMaintenance: string
  nextMaintenance: string
  specifications: Record<string, string>
  maintenanceHistory: Array<{
    date: string
    type: string
    description: string
    technician: string
    status: "completed" | "scheduled" | "in-progress"
  }>
}

// Mock data
const equipment: Record<string, Equipment> = {
  "pump-01": {
    id: "pump-01",
    name: "Industrial Pump A1",
    type: "Centrifugal Pump",
    status: "operational",
    location: "Building A - Floor 1",
    lastMaintenance: "2024-04-15",
    nextMaintenance: "2024-05-15",
    specifications: {
      "Flow Rate": "500 GPM",
      "Head": "100 ft",
      "Motor Power": "50 HP",
      "RPM": "3600",
      "Voltage": "460V",
      "Phase": "3-Phase",
    },
    maintenanceHistory: [
      {
        date: "2024-04-15",
        type: "Preventive Maintenance",
        description: "Regular inspection and bearing lubrication",
        technician: "John Smith",
        status: "completed",
      },
      {
        date: "2024-03-01",
        type: "Repair",
        description: "Replaced mechanical seal",
        technician: "Mike Johnson",
        status: "completed",
      },
      {
        date: "2024-05-15",
        type: "Scheduled Maintenance",
        description: "Full system inspection and oil change",
        technician: "Sarah Wilson",
        status: "scheduled",
      },
    ],
  },
  "motor-01": {
    id: "motor-01",
    name: "Electric Motor B2",
    type: "AC Induction Motor",
    status: "maintenance",
    location: "Building B - Floor 2",
    lastMaintenance: "2024-04-01",
    nextMaintenance: "2024-05-01",
    specifications: {
      "Power": "75 HP",
      "Speed": "1800 RPM",
      "Voltage": "460V",
      "Current": "80A",
      "Frame": "365T",
      "Efficiency": "95%",
    },
    maintenanceHistory: [
      {
        date: "2024-04-01",
        type: "Emergency Repair",
        description: "Bearing replacement",
        technician: "Mike Johnson",
        status: "completed",
      },
      {
        date: "2024-04-25",
        type: "Inspection",
        description: "Vibration analysis and alignment check",
        technician: "Sarah Wilson",
        status: "in-progress",
      },
    ],
  },
}

export const dynamic = 'force-static'

// Generate static params for all equipment IDs
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ]
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const equipmentItem = equipment[params.id]

  if (!equipmentItem) {
    return NextResponse.json(
      { error: "Equipment not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(equipmentItem)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const equipmentItem = equipment[params.id]

    if (!equipmentItem) {
      return NextResponse.json(
        { error: "Equipment not found" },
        { status: 404 }
      )
    }

    equipment[params.id] = { ...equipmentItem, ...data }
    return NextResponse.json(equipment[params.id])
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update equipment" },
      { status: 500 }
    )
  }
}
