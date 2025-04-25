export interface Checklist {
  id: string
  title: string
  description: string
  type: "equipment" | "safety" | "quality" | "commodity"
  equipmentId?: string
  items: ChecklistItem[]
  requiredRole: UserRole
  frequency: "daily" | "weekly" | "monthly" | "quarterly"
}

export interface ChecklistItem {
  id: string
  text: string
  required: boolean
  hasNotes: boolean
  hasPhoto: boolean
}

export interface ChecklistSubmission {
  id: string
  checklistId: string
  operatorName: string
  operatorId: string
  date: string
  items: ChecklistItemSubmission[]
  notes?: string
  images?: string[]
  status: "submitted" | "approved" | "rejected"
  reviewedBy?: string
  reviewedAt?: string
  reviewNotes?: string
}

export interface ChecklistItemSubmission {
  itemId: string
  checked: boolean
  notes?: string
  photoUrl?: string
}

export interface CommodityChecklistSubmission extends ChecklistSubmission {
  shift: string
  commodityChecks: Record<string, { quality: string; notes: string }>
}

// Define UserRole type
type UserRole = "admin" | "user" | "manager"
