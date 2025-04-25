import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { TopUsedItem } from "@/lib/inventory-reports-service"
import { Progress } from "@/components/ui/progress"

interface TopUsedItemsProps {
  items: TopUsedItem[]
}

export function TopUsedItems({ items }: TopUsedItemsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Used Items</CardTitle>
        <CardDescription>Top items by usage frequency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.itemId} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.itemName}</span>
                <span className="text-sm text-muted-foreground">{item.totalUsed} units</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={item.percentageOfTotal} className="h-2" />
                <span className="text-xs text-muted-foreground w-12">{item.percentageOfTotal}%</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.category}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
