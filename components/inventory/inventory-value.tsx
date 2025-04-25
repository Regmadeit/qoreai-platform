import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { InventoryValueData } from "@/lib/inventory-reports-service"

interface InventoryValueProps {
  data: InventoryValueData[]
}

export function InventoryValue({ data }: InventoryValueProps) {
  // Calculate total value
  const totalValue = data.reduce((sum, item) => sum + item.totalValue, 0)

  // Calculate total item count
  const totalItems = data.reduce((sum, item) => sum + item.itemCount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Value</CardTitle>
        <CardDescription>Total value by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-bold">{totalItems}</p>
            </div>
          </div>

          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.category}</div>
                  <div className="text-sm text-muted-foreground">{item.itemCount} items</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${item.totalValue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{item.percentageOfTotal}% of total</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
