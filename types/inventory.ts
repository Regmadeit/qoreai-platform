export interface InventoryItem {
  id: string
  name: string
  category: string
  location: string
  quantity: number
  minQuantity: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  lastUpdated: string
  unitCost?: number
  supplier?: string
  partNumber?: string
  description?: string
  image?: string
  barcode?: string
}

export interface InventoryTransaction {
  id: string
  itemId: string
  type: "in" | "out" | "adjustment"
  quantity: number
  date: string
  performedBy: string
  workOrderId?: string
  notes?: string
}

export interface InventoryReport {
  period: string
  generatedAt: string
  items: {
    category: string
    totalValue: number
    itemCount: number
    percentageOfTotal: number
  }[]
  lowStockItems: number
  outOfStockItems: number
  totalValue: number
}

export interface SupplierInfo {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  items: string[]
  performance: {
    deliveryTime: number // Average in days
    qualityRating: number // 1-5
    costRating: number // 1-5
  }
}
