import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: 1,
    equipment: "Stadler Optical Sorter",
    issue: "Sensor calibration drift detected",
    prediction: "Failure in 7 days",
    severity: "high",
  },
  {
    id: 2,
    equipment: "Stadler Conveyor Belt #3",
    issue: "Belt tension irregularity",
    prediction: "Failure in 14 days",
    severity: "medium",
  },
  {
    id: 3,
    equipment: "Krones Washline Unit #1",
    issue: "Pressure fluctuations",
    prediction: "Failure in 21 days",
    severity: "medium",
  },
  {
    id: 4,
    equipment: "Krones Labeler #1",
    issue: "Motor vibration",
    prediction: "Failure in 30 days",
    severity: "low",
  },
  {
    id: 5,
    equipment: "Stadler Ballistic Separator",
    issue: "Efficiency decline",
    prediction: "Failure in 45 days",
    severity: "low",
  },
]

export function MaintenanceAlerts() {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start space-x-4 rounded-md border p-3">
          <div
            className={cn(
              "mt-0.5 h-2 w-2 rounded-full",
              alert.severity === "high" && "bg-red-500",
              alert.severity === "medium" && "bg-amber-500",
              alert.severity === "low" && "bg-green-500",
            )}
          />
          <div className="flex-1 space-y-1">
            <p className="font-medium leading-none">{alert.equipment}</p>
            <p className="text-sm text-muted-foreground">{alert.issue}</p>
            <p className="text-xs font-medium text-muted-foreground">{alert.prediction}</p>
          </div>
          <Button variant="outline" size="sm">
            Schedule
          </Button>
        </div>
      ))}
    </div>
  )
}
