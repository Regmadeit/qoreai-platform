export interface DashboardStats {
  workOrders: {
    total: number
    open: number
    inProgress: number
    completed: number
    overdue: number
  }
  equipment: {
    total: number
    operational: number
    maintenance: number
    offline: number
    warning: number
  }
  inventory: {
    lowStock: number
    outOfStock: number
    recentTransactions: number
  }
  checklists: {
    completed: number
    pending: number
    overdue: number
  }
}

export interface Alert {
  id: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  timestamp: string
  equipmentId?: string
  equipmentName?: string
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAt?: string
}

export interface MaintenanceScheduleItem {
  id: string
  equipmentId: string
  equipmentName: string
  type: "preventive" | "corrective" | "predictive"
  assignee?: string
  scheduledDate: string
  estimatedDuration: number // in hours
  status: "scheduled" | "in-progress" | "completed" | "overdue"
  workOrderId?: string
}

export interface ShiftSchedule {
  startTime: string
  endTime: string
  employeeId: string
  employeeName: string
}

export interface OperatorDashboardData {
  assignedChecklists: number
  completedChecklists: number
  equipmentStatus: Record<string, number>
  recentAlerts: Alert[]
  upcomingShifts?: ShiftSchedule[]
}

export interface SupervisorDashboardData extends DashboardStats {
  teamPerformance: {
    checklistCompletion: number
    workOrderCompletion: number
    averageResponseTime: number
  }
  productionMetrics: {
    throughput: number
    quality: number
    uptime: number
  }
}

export interface MaintenanceDashboardData {
  assignedWorkOrders: number
  completedWorkOrders: number
  averageResolutionTime: number
  equipmentHealthOverview: Record<string, number>
  upcomingMaintenance: MaintenanceScheduleItem[]
}
