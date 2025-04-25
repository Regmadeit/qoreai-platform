export interface Equipment {
  id: string
  name: string
  manufacturer: string
  model: string
  serialNumber: string
  installDate: string
  location: string
  status: "operational" | "maintenance" | "offline" | "warning"
  lastMaintenance?: string
  nextMaintenance?: string
  description?: string
  category: string
  image?: string
  specifications?: Record<string, string | number>
  healthScore?: number
}

export interface EquipmentReading {
  id: string
  equipmentId: string
  timestamp: string
  temperature: number
  vibration: number
  pressure: number
  runtime: number
  powerConsumption: number
  [key: string]: any // For additional sensor readings
}

export interface MaintenanceRecord {
  id: string
  equipmentId: string
  type: "preventive" | "corrective" | "predictive"
  description: string
  technician: string
  date: string
  duration: string
  parts: string[]
  status: "scheduled" | "in-progress" | "completed"
  workOrderId?: string
}

export interface EquipmentDocument {
  id: string
  equipmentId: string
  name: string
  type: "manual" | "specification" | "drawing" | "certificate" | "report"
  fileType: "pdf" | "excel" | "image" | "word"
  date: string
  size: string
  url: string
}

export interface EquipmentFilter {
  status?: string[]
  category?: string[]
  location?: string[]
  manufacturer?: string[]
}
