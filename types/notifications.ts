export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  timestamp: string
  read: boolean
  link?: string
  category: "work-order" | "equipment" | "checklist" | "inventory" | "system"
  relatedId?: string
  priority: "low" | "medium" | "high"
}

export interface NotificationPreference {
  category: string
  email: boolean
  push: boolean
  sms: boolean
}

export interface NotificationStats {
  total: number
  unread: number
  byCategory: Record<string, number>
}
