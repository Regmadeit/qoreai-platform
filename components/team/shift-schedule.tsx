"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

const shifts = [
  {
    id: "morning",
    name: "Morning Shift",
    time: "6:00 AM - 2:00 PM",
    color: "bg-blue-500",
  },
  {
    id: "evening",
    name: "Evening Shift",
    time: "2:00 PM - 10:00 PM",
    color: "bg-amber-500",
  },
  {
    id: "night",
    name: "Night Shift",
    time: "10:00 PM - 6:00 AM",
    color: "bg-purple-500",
  },
]

const departments = ["All Departments", "Operations", "Maintenance", "Engineering", "Logistics", "Quality"]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// Sample schedule data
const scheduleData = {
  Operations: {
    Mon: ["morning", "evening", "night"],
    Tue: ["morning", "evening", "night"],
    Wed: ["morning", "evening", "night"],
    Thu: ["morning", "evening", "night"],
    Fri: ["morning", "evening", "night"],
    Sat: ["morning", "evening"],
    Sun: ["morning"],
  },
  Maintenance: {
    Mon: ["morning", "evening"],
    Tue: ["morning", "evening"],
    Wed: ["morning", "evening"],
    Thu: ["morning", "evening"],
    Fri: ["morning", "evening"],
    Sat: ["morning"],
    Sun: [],
  },
  Engineering: {
    Mon: ["morning"],
    Tue: ["morning"],
    Wed: ["morning"],
    Thu: ["morning"],
    Fri: ["morning"],
    Sat: [],
    Sun: [],
  },
  Logistics: {
    Mon: ["morning", "evening"],
    Tue: ["morning", "evening"],
    Wed: ["morning", "evening"],
    Thu: ["morning", "evening"],
    Fri: ["morning", "evening"],
    Sat: ["morning"],
    Sun: [],
  },
  Quality: {
    Mon: ["morning", "evening"],
    Tue: ["morning", "evening"],
    Wed: ["morning", "evening"],
    Thu: ["morning", "evening"],
    Fri: ["morning", "evening"],
    Sat: [],
    Sun: [],
  },
}

export function ShiftSchedule() {
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [currentWeek, setCurrentWeek] = useState("Apr 22 - Apr 28, 2025")

  const getShiftColor = (shiftId) => {
    const shift = shifts.find((s) => s.id === shiftId)
    return shift ? shift.color : "bg-gray-300"
  }

  const getShiftName = (shiftId) => {
    const shift = shifts.find((s) => s.id === shiftId)
    return shift ? shift.name : "Unknown Shift"
  }

  const departmentsToShow = selectedDepartment === "All Departments" ? Object.keys(scheduleData) : [selectedDepartment]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">{currentWeek}</div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">Today</Button>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="grid grid-cols-8 bg-muted">
          <div className="p-3 font-medium border-r">Department</div>
          {weekDays.map((day) => (
            <div key={day} className="p-3 font-medium text-center">
              {day}
            </div>
          ))}
        </div>

        {departmentsToShow.map((dept) => (
          <div key={dept} className="grid grid-cols-8 border-t">
            <div className="p-3 font-medium border-r bg-muted/50">{dept}</div>
            {weekDays.map((day) => (
              <div key={day} className="p-2 text-center border-r last:border-r-0">
                <div className="flex flex-col gap-1">
                  {scheduleData[dept][day].map((shiftId) => (
                    <Badge key={shiftId} variant="outline" className={`${getShiftColor(shiftId)} text-white border-0`}>
                      {getShiftName(shiftId)}
                    </Badge>
                  ))}
                  {scheduleData[dept][day].length === 0 && (
                    <span className="text-xs text-muted-foreground">No shifts</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {shifts.map((shift) => (
          <div key={shift.id} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${shift.color}`}></div>
            <span className="text-sm">
              {shift.name} ({shift.time})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
