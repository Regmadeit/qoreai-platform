// This is a mock service that would be replaced with actual API calls in a real application

// Types
interface InventoryItem {
  id: string
  name: string
  category: string
  location: string
  quantity: number
  minQuantity: number
  status: string
  lastUpdated: string
}

interface WorkOrderItem {
  id: string
  name: string
  quantity: number
}

// Mock inventory data
let inventoryItems: InventoryItem[] = [
  {
    id: "INV-001",
    name: "Hydraulic Pump",
    category: "Spare Parts",
    location: "Warehouse A",
    quantity: 12,
    minQuantity: 5,
    status: "In Stock",
    lastUpdated: "Apr 20, 2025",
  },
  {
    id: "INV-002",
    name: "Air Filter",
    category: "Consumables",
    location: "Warehouse B",
    quantity: 45,
    minQuantity: 20,
    status: "In Stock",
    lastUpdated: "Apr 19, 2025",
  },
  {
    id: "INV-003",
    name: "Drive Belt",
    category: "Spare Parts",
    location: "Warehouse A",
    quantity: 8,
    minQuantity: 10,
    status: "Low Stock",
    lastUpdated: "Apr 18, 2025",
  },
  {
    id: "INV-004",
    name: "Lubricant",
    category: "Consumables",
    location: "Warehouse C",
    quantity: 32,
    minQuantity: 15,
    status: "In Stock",
    lastUpdated: "Apr 17, 2025",
  },
  {
    id: "INV-005",
    name: "Bearing Assembly",
    category: "Spare Parts",
    location: "Warehouse B",
    quantity: 3,
    minQuantity: 5,
    status: "Low Stock",
    lastUpdated: "Apr 16, 2025",
  },
  {
    id: "INV-006",
    name: "Control Panel",
    category: "Electronics",
    location: "Warehouse A",
    quantity: 0,
    minQuantity: 2,
    status: "Out of Stock",
    lastUpdated: "Apr 15, 2025",
  },
  {
    id: "INV-007",
    name: "Sensor Kit",
    category: "Electronics",
    location: "Warehouse C",
    quantity: 7,
    minQuantity: 3,
    status: "In Stock",
    lastUpdated: "Apr 14, 2025",
  },
]

// Get all inventory items
export const getAllInventoryItems = async (): Promise<InventoryItem[]> => {
  // In a real app, this would fetch from an API
  return inventoryItems
}

// Get a single inventory item by ID
export const getInventoryItemById = async (id: string): Promise<InventoryItem | undefined> => {
  // In a real app, this would fetch from an API
  return inventoryItems.find((item) => item.id === id)
}

// Update inventory quantities based on work order items
export const deductInventoryForWorkOrder = async (workOrderItems: WorkOrderItem[]): Promise<boolean> => {
  try {
    // In a real app, this would be a transaction to ensure all updates succeed or fail together

    // Create a new array with updated quantities
    const updatedInventory = inventoryItems.map((item) => {
      const workOrderItem = workOrderItems.find((woItem) => woItem.id === item.id)

      if (workOrderItem) {
        const newQuantity = item.quantity - workOrderItem.quantity

        if (newQuantity < 0) {
          throw new Error(`Not enough ${item.name} in inventory`)
        }

        // Update the status based on the new quantity
        let status = "In Stock"
        if (newQuantity === 0) {
          status = "Out of Stock"
        } else if (newQuantity < item.minQuantity) {
          status = "Low Stock"
        }

        return {
          ...item,
          quantity: newQuantity,
          status,
          lastUpdated: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }
      }

      return item
    })

    // Update the inventory
    inventoryItems = updatedInventory

    return true
  } catch (error) {
    console.error("Error deducting inventory:", error)
    return false
  }
}

// Return inventory items when a work order is cancelled
export const returnInventoryForWorkOrder = async (workOrderItems: WorkOrderItem[]): Promise<boolean> => {
  try {
    // In a real app, this would be a transaction to ensure all updates succeed or fail together

    // Create a new array with updated quantities
    const updatedInventory = inventoryItems.map((item) => {
      const workOrderItem = workOrderItems.find((woItem) => woItem.id === item.id)

      if (workOrderItem) {
        const newQuantity = item.quantity + workOrderItem.quantity

        // Update the status based on the new quantity
        let status = "In Stock"
        if (newQuantity === 0) {
          status = "Out of Stock"
        } else if (newQuantity < item.minQuantity) {
          status = "Low Stock"
        }

        return {
          ...item,
          quantity: newQuantity,
          status,
          lastUpdated: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }
      }

      return item
    })

    // Update the inventory
    inventoryItems = updatedInventory

    return true
  } catch (error) {
    console.error("Error returning inventory:", error)
    return false
  }
}
