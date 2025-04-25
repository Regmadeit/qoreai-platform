"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

const alerts = [
  {
    id: 1,
    title: "Pump #12 Pressure Drop",
    description: "Pressure has dropped below threshold",
    severity: "high",
    time: "10 minutes ago",
  },
  {
    id: 2,
    title: "Conveyor Belt #3 Speed Fluctuation",
    description: "Speed is fluctuating outside normal range",
    severity: "medium",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Compressor #2 Temperature Rise",
    description: "Temperature is rising above normal levels",
    severity: "high",
    time: "2 hours ago",
  },
  {
    id: 4,
    title: "Mixer #5 Vibration Alert",
    description: "Unusual vibration patterns detected",
    severity: "medium",
    time: "3 hours ago",
  },
  {
    id: 5,
    title: "Boiler #1 Pressure Warning",
    description: "Pressure approaching upper limit",
    severity: "low",
    time: "5 hours ago",
  },
]

export function RecentAlerts() {
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start space-x-4 rounded-md border p-3">
          <div
            className={cn(
              "mt-0.5 h-2 w-2 rounded-full flex-shrink-0",
              alert.severity === "high" && "bg-red-500",
              alert.severity === "medium" && "bg-amber-500",
              alert.severity === "low" && "bg-green-500",
            )}
          />
          <div className="flex-1 space-y-1 min-w-0">
            <p className="font-medium leading-none">{alert.title}</p>
            <p className={cn("text-sm text-muted-foreground", isMobile ? "line-clamp-1" : "")}>{alert.description}</p>
            <p className="text-xs text-muted-foreground">{alert.time}</p>
          </div>
          <Button variant="ghost" size="sm" className="flex-shrink-0">
            {isMobile ? "View" : "View Details"}
          </Button>
        </div>
      ))}
    </div>
  )
}
