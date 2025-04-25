import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LowStockAlert } from "@/lib/inventory-reports-service"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle } from "lucide-react"

interface LowStockAlertsProps {
  alerts: LowStockAlert[]
}

export function LowStockAlerts({ alerts }: LowStockAlertsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Low Stock Alerts
        </CardTitle>
        <CardDescription>Items that need reordering soon</CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No low stock alerts</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.itemId} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div>
                  <div className="font-medium">{alert.itemName}</div>
                  <div className="text-sm text-muted-foreground">{alert.category}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm">
                      {alert.currentLevel} / {alert.minLevel} units
                    </span>
                    {alert.currentLevel === 0 ? (
                      <Badge variant="destructive" className="text-xs">
                        Out of Stock
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs border-amber-500 text-amber-500">
                        Low Stock
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {alert.daysUntilStockout === null ? (
                    <div className="flex items-center text-red-500 text-sm font-medium">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Out of Stock
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm font-medium">{alert.daysUntilStockout} days</div>
                      <div className="text-xs text-muted-foreground">until stockout</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
