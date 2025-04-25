"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

const maintenanceTasks = [
  {
    id: 1,
    equipment: "Pump #12",
    task: "Replace seals and bearings",
    date: "May 15, 2025",
    priority: "high",
  },
  {
    id: 2,
    equipment: "Conveyor Belt #3",
    task: "Belt tension adjustment",
    date: "May 18, 2025",
    priority: "medium",
  },
  {
    id: 3,
    equipment: "Compressor #2",
    task: "Filter replacement",
    date: "May 20, 2025",
    priority: "medium",
  },
  {
    id: 4,
    equipment: "Mixer #5",
    task: "Lubrication and inspection",
    date: "May 22, 2025",
    priority: "low",
  },
  {
    id: 5,
    equipment: "Boiler #1",
    task: "Safety valve testing",
    date: "May 25, 2025",
    priority: "high",
  },
]

export function MaintenanceSchedule() {
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <div className="space-y-4">
      {maintenanceTasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between rounded-md border p-3 gap-3"
        >
          <div className="flex items-start space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted flex-shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="font-medium">{task.equipment}</p>
              <p className={cn("text-sm text-muted-foreground", isMobile ? "line-clamp-1" : "")}>{task.task}</p>
              <p className="text-xs text-muted-foreground">{task.date}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex-shrink-0",
              task.priority === "high"
                ? "border-red-500 text-red-500 hover:bg-red-500/10"
                : task.priority === "medium"
                  ? "border-amber-500 text-amber-500 hover:bg-amber-500/10"
                  : "border-green-500 text-green-500 hover:bg-green-500/10",
            )}
          >
            {task.priority === "high"
              ? "High Priority"
              : task.priority === "medium"
                ? "Medium Priority"
                : "Low Priority"}
          </Button>
        </div>
      ))}
    </div>
  )
}
