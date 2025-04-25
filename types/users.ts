export type UserRole = "operator" | "maintenance" | "supervisor" | "manager" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  avatar?: string
  phone?: string
  hireDate: string
  status: "active" | "inactive"
  skills?: string[]
  certifications?: Certification[]
  preferences?: UserPreferences
}

export interface Certification {
  id: string
  name: string
  issuedDate: string
  expiryDate: string
  issuer: string
  verified: boolean
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  dashboardLayout?: Record<string, any>
}

export interface TeamMember extends User {
  position: string
  supervisor?: string
  schedule?: ShiftSchedule
  performance?: {
    rating: number
    completedTasks: number
    onTimePercentage: number
  }
}

export interface ShiftSchedule {
  shift: "morning" | "afternoon" | "night"
  days: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[]
  startTime: string
  endTime: string
}
