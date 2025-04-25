export interface ProfileSettings {
  name: string
  email: string
  phone?: string
  avatar?: string
  jobTitle?: string
  department?: string
  bio?: string
  skills?: string[]
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  categories: {
    workOrders: boolean
    equipment: boolean
    inventory: boolean
    checklists: boolean
    system: boolean
  }
  digest: "none" | "daily" | "weekly"
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  lastPasswordChange: string
  sessionTimeout: number // in minutes
  loginHistory: {
    date: string
    ip: string
    device: string
    location?: string
  }[]
}

export interface DisplaySettings {
  theme: "light" | "dark" | "system"
  fontSize: "small" | "medium" | "large"
  compactMode: boolean
  dashboardLayout: "default" | "compact" | "expanded"
  language: string
}

export interface APISettings {
  apiKey?: string
  webhooks: {
    url: string
    events: string[]
    active: boolean
    lastTriggered?: string
  }[]
  integrations: {
    name: string
    status: "connected" | "disconnected"
    lastSync?: string
  }[]
}

export type UserRole = "admin" | "manager" | "user"

export interface RolePermission {
  role: UserRole
  permissions: {
    workOrders: {
      create: boolean
      view: boolean
      edit: boolean
      delete: boolean
      assign: boolean
    }
    equipment: {
      create: boolean
      view: boolean
      edit: boolean
      delete: boolean
    }
    inventory: {
      create: boolean
      view: boolean
      edit: boolean
      delete: boolean
    }
    checklists: {
      create: boolean
      view: boolean
      edit: boolean
      delete: boolean
      approve: boolean
    }
    users: {
      create: boolean
      view: boolean
      edit: boolean
      delete: boolean
    }
    reports: {
      view: boolean
      export: boolean
    }
    settings: {
      view: boolean
      edit: boolean
    }
  }
}
