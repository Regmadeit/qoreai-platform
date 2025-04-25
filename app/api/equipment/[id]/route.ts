import { NextResponse } from "next/server"
import type { Equipment } from "@/types"

// Mock data - in a real app, this would come from a database
const equipmentData: Record<string, Equipment> = {
  "eq-001": {
    id: "eq-001",
    name: "Conveyor Belt A1",
    type: "Conveyor",
    status: "operational",
    location: "Building 1, Section A",
    lastMaintenance: "2023-10-15",
    nextMaintenance: "2023-11-15",
    installationDate: "2020-05-10",
    manufacturer: "ConveyTech Industries",
    model: "CT-5000",
    serialNumber: "CTI-5000-12345",
    specifications: {
      powerRequirements: "220V, 3-phase",
      dimensions: "50ft x 3ft x 4ft",
      weight: "2000 lbs",
      capacity: "500 items/hour",
    },
    healthScore: 92,
    maintenanceHistory: [],
    documents: [],
    parts: [],
    sensors: [
      { id: "s-001", name: "Temperature Sensor", status: "normal", value: "72°F" },
      { id: "s-002", name: "Vibration Sensor", status: "warning", value: "15mm/s" },
      { id: "s-003", name: "Speed Sensor", status: "normal", value: "120ft/min" },
    ],
  },
  "eq-002": {
    id: "eq-002",
    name: "Hydraulic Press B2",
    type: "Press",
    status: "maintenance",
    location: "Building 2, Section B",
    lastMaintenance: "2023-09-20",
    nextMaintenance: "2023-10-20",
    installationDate: "2019-08-15",
    manufacturer: "HydroPress Systems",
    model: "HP-8000",
    serialNumber: "HPS-8000-67890",
    specifications: {
      powerRequirements: "440V, 3-phase",
      dimensions: "10ft x 8ft x 12ft",
      weight: "8000 lbs",
      capacity: "200 tons",
    },
    healthScore: 68,
    maintenanceHistory: [],
    documents: [],
    parts: [],
    sensors: [
      { id: "s-004", name: "Pressure Sensor", status: "critical", value: "2800 PSI" },
      { id: "s-005", name: "Oil Temperature", status: "normal", value: "140°F" },
      { id: "s-006", name: "Position Sensor", status: "normal", value: "0.5mm" },
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!equipmentData[id]) {
    return NextResponse.json({ error: "Equipment not found" }, { status: 404 })
  }

  return NextResponse.json(equipmentData[id])
}
