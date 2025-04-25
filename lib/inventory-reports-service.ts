// Types for inventory reports
export interface InventoryUsageData {
  itemId: string
  itemName: string
  category: string
  usageCount: number
  month: string
}

export interface InventoryLevelData {
  itemId: string
  itemName: string
  category: string
  currentLevel: number
  minLevel: number
  maxLevel: number
  date: string
}

export interface TopUsedItem {
  itemId: string
  itemName: string
  category: string
  totalUsed: number
  percentageOfTotal: number
}

export interface LowStockAlert {
  itemId: string
  itemName: string
  category: string
  currentLevel: number
  minLevel: number
  daysUntilStockout: number | null
}

export interface InventoryValueData {
  category: string
  totalValue: number
  itemCount: number
  percentageOfTotal: number
}

// Mock data for inventory usage over time (last 6 months)
const generateMockUsageData = (): InventoryUsageData[] => {
  const items = [
    { id: "INV-001", name: "Hydraulic Pump", category: "Spare Parts" },
    { id: "INV-002", name: "Air Filter", category: "Consumables" },
    { id: "INV-003", name: "Drive Belt", category: "Spare Parts" },
    { id: "INV-004", name: "Lubricant", category: "Consumables" },
    { id: "INV-005", name: "Bearing Assembly", category: "Spare Parts" },
    { id: "INV-007", name: "Sensor Kit", category: "Electronics" },
  ]

  const months = ["Nov 2024", "Dec 2024", "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025"]

  const usageData: InventoryUsageData[] = []

  items.forEach((item) => {
    months.forEach((month) => {
      // Generate random usage count between 1 and 20
      const usageCount = Math.floor(Math.random() * 20) + 1

      usageData.push({
        itemId: item.id,
        itemName: item.name,
        category: item.category,
        usageCount,
        month,
      })
    })
  })

  return usageData
}

// Get inventory usage data for reports
export const getInventoryUsageData = (): InventoryUsageData[] => {
  return generateMockUsageData()
}

// Get top used inventory items
export const getTopUsedItems = (limit = 5): TopUsedItem[] => {
  const usageData = getInventoryUsageData()

  // Aggregate usage by item
  const itemUsage = usageData.reduce((acc, curr) => {
    const existingItem = acc.find((item) => item.itemId === curr.itemId)

    if (existingItem) {
      existingItem.totalUsed += curr.usageCount
    } else {
      acc.push({
        itemId: curr.itemId,
        itemName: curr.itemName,
        category: curr.category,
        totalUsed: curr.usageCount,
        percentageOfTotal: 0, // Will calculate after summing all
      })
    }

    return acc
  }, [] as TopUsedItem[])

  // Calculate total usage across all items
  const totalUsage = itemUsage.reduce((sum, item) => sum + item.totalUsed, 0)

  // Calculate percentage and sort by usage
  const result = itemUsage
    .map((item) => ({
      ...item,
      percentageOfTotal: Number(((item.totalUsed / totalUsage) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.totalUsed - a.totalUsed)
    .slice(0, limit)

  return result
}

// Get low stock alerts with estimated days until stockout
export const getLowStockAlerts = (): LowStockAlert[] => {
  // This would normally come from your inventory database
  const inventoryItems = [
    {
      id: "INV-001",
      name: "Hydraulic Pump",
      category: "Spare Parts",
      currentLevel: 4,
      minLevel: 5,
      avgDailyUsage: 0.2,
    },
    { id: "INV-003", name: "Drive Belt", category: "Spare Parts", currentLevel: 3, minLevel: 10, avgDailyUsage: 0.5 },
    {
      id: "INV-005",
      name: "Bearing Assembly",
      category: "Spare Parts",
      currentLevel: 2,
      minLevel: 5,
      avgDailyUsage: 0.3,
    },
    { id: "INV-006", name: "Control Panel", category: "Electronics", currentLevel: 0, minLevel: 2, avgDailyUsage: 0.1 },
  ]

  return inventoryItems
    .filter((item) => item.currentLevel <= item.minLevel)
    .map((item) => ({
      itemId: item.id,
      itemName: item.name,
      category: item.category,
      currentLevel: item.currentLevel,
      minLevel: item.minLevel,
      daysUntilStockout: item.currentLevel > 0 ? Math.floor(item.currentLevel / item.avgDailyUsage) : null,
    }))
}

// Get inventory value by category
export const getInventoryValueByCategory = (): InventoryValueData[] => {
  // This would normally be calculated from your actual inventory with prices
  const inventoryValue = [
    { category: "Spare Parts", totalValue: 12500, itemCount: 15 },
    { category: "Consumables", totalValue: 5800, itemCount: 22 },
    { category: "Electronics", totalValue: 18200, itemCount: 8 },
    { category: "Tools", totalValue: 3500, itemCount: 12 },
  ]

  const totalValue = inventoryValue.reduce((sum, item) => sum + item.totalValue, 0)

  return inventoryValue.map((item) => ({
    ...item,
    percentageOfTotal: Number(((item.totalValue / totalValue) * 100).toFixed(1)),
  }))
}

// Get inventory level history (for tracking stock levels over time)
export const getInventoryLevelHistory = (itemId: string): InventoryLevelData[] => {
  // This would normally come from your inventory history database
  // For now, we'll generate mock data for the past 30 days
  const result: InventoryLevelData[] = []
  const today = new Date()
  const itemInfo = {
    "INV-001": { name: "Hydraulic Pump", category: "Spare Parts", startLevel: 15, minLevel: 5, maxLevel: 20 },
    "INV-002": { name: "Air Filter", category: "Consumables", startLevel: 50, minLevel: 20, maxLevel: 60 },
    "INV-003": { name: "Drive Belt", category: "Spare Parts", startLevel: 12, minLevel: 10, maxLevel: 25 },
    "INV-005": { name: "Bearing Assembly", category: "Spare Parts", startLevel: 8, minLevel: 5, maxLevel: 15 },
  }

  const item = itemInfo[itemId as keyof typeof itemInfo]
  if (!item) return []

  let currentLevel = item.startLevel

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Randomly adjust the level to simulate usage and restocking
    if (i % 7 === 0 && currentLevel < item.maxLevel) {
      // Simulate restocking every 7 days
      currentLevel = Math.min(item.maxLevel, currentLevel + Math.floor(Math.random() * 10) + 5)
    } else {
      // Simulate usage
      currentLevel = Math.max(0, currentLevel - (Math.random() > 0.7 ? 1 : 0))
    }

    result.push({
      itemId,
      itemName: item.name,
      category: item.category,
      currentLevel,
      minLevel: item.minLevel,
      maxLevel: item.maxLevel,
      date: date.toISOString().split("T")[0],
    })
  }

  return result
}
