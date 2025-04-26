export interface WorkOrder {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "open" | "in-progress" | "completed" | "cancelled" | "pending"
  equipmentId?: string
  equipmentName?: string
  assignedTo: string
  assignedToName?: string
  createdBy: string
  createdByName?: string
  createdAt: string
  updatedAt: string
  estimatedCompletionTime?: string
  actualCompletionTime?: string | null
  parts?: {
    id: string
    name: string
    quantity: number
  }[]
  notes: {
    id: string
    text: string
    createdBy: string
    createdByName?: string
    createdAt: string
  }[]
  inventoryItems?: WorkOrderInventoryItem[]
  attachments?: WorkOrderAttachment[]
}

export interface WorkOrderInventoryItem {
  id: string
  name: string
  quantity: number
  returned?: number
}

export interface WorkOrderNote {
  id: string
  text: string
  createdBy: string
  createdAt: string
}

export interface WorkOrderAttachment {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedBy: string
  uploadedAt: string
}

export interface WorkOrderFilter {
  status?: string[]
  priority?: string[]
  assignee?: string[]
  dateRange?: {
    start: string
    end: string
  }
  equipmentId?: string
}

export interface WorkOrderStats {
  total: number
  open: number
  inProgress: number
  completed: number
  overdue: number
  byPriority: {
    low: number
    medium: number
    high: number
  }
}
