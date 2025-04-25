// Re-export all types from their respective files
export * from "./work-orders"
export * from "./equipment"
export * from "./checklists"
export * from "./users"
export * from "./notifications"
export * from "./inventory"
export * from "./logistics"
export * from "./learning"
export * from "./dashboard"
export * from "./settings"

// Define global app-specific types
export interface AppConfig {
  appName: string
  version: string
  apiUrl: string
  environment: "development" | "staging" | "production"
  features: {
    predictiveMaintenance: boolean
    mobileApp: boolean
    offlineMode: boolean
    aiAssistant: boolean
    barcodeScanner: boolean
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
}

export interface FilterOptions {
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
  [key: string]: any
}
