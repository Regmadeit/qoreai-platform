"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, CalendarIcon, List, Grid3X3 } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for tasks
const mockTasks = [
  {
    id: "task-1",
    title: "Preventive Maintenance - Conveyor Belt #3",
    assignedTo: "John Doe",
    priority: "High",
    status: "Scheduled",
    date: "2023-07-15",
    time: "09:00 AM",
    duration: "2 hours",
    equipment: "Conveyor Belt #3",
    location: "Building A, Section 3",
  },
  {
    id: "task-2",
    title: "Inspection - Packaging Machine",
    assignedTo: "Jane Smith",
    priority: "Medium",
    status: "Scheduled",
    date: "2023-07-16",
    time: "10:30 AM",
    duration: "1 hour",
    equipment: "Packaging Machine #2",
    location: "Building B, Section 1",
  },
  {
    id: "task-3",
    title: "Repair - Forklift",
    assignedTo: "Mike Johnson",
    priority: "High",
    status: "In Progress",
    date: "2023-07-14",
    time: "02:00 PM",
    duration: "3 hours",
    equipment: "Forklift #5",
    location: "Warehouse C",
  },
  {
    id: "task-4",
    title: "Calibration - Quality Control Sensors",
    assignedTo: "Sarah Williams",
    priority: "Low",
    status: "Completed",
    date: "2023-07-13",
    time: "11:00 AM",
    duration: "2 hours",
    equipment: "QC Sensor Array",
    location: "Quality Lab",
  },
  {
    id: "task-5",
    title: "Lubrication - Assembly Line",
    assignedTo: "John Doe",
    priority: "Medium",
    status: "Scheduled",
    date: "2023-07-17",
    time: "08:00 AM",
    duration: "4 hours",
    equipment: "Assembly Line A",
    location: "Building A, Section 1",
  },
]

export default function SchedulingPage() {
  const router = useRouter()
  const [view, setView] = useState("calendar")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [filter, setFilter] = useState("all")

  // Filter tasks based on selected filter
  const filteredTasks = mockTasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "high") return task.priority === "High"
    if (filter === "medium") return task.priority === "Medium"
    if (filter === "low") return task.priority === "Low"
    if (filter === "scheduled") return task.status === "Scheduled"
    if (filter === "inProgress") return task.status === "In Progress"
    if (filter === "completed") return task.status === "Completed"
    return true
  })

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            <span>Task Scheduling</span>
            <div className="flex items-center gap-2">
              <Button
                variant={view === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("calendar")}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar
              </Button>
              <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
              <Button variant={view === "board" ? "default" : "outline"} size="sm" onClick={() => setView("board")}>
                <Grid3X3 className="h-4 w-4 mr-2" />
                Board
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 space-y-4">
              <div>
                <Label htmlFor="filter">Filter Tasks</Label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger id="filter">
                    <SelectValue placeholder="Filter tasks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tasks</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="inProgress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Select Date</Label>
                <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md p-2" />
              </div>

              <div>
                <Label htmlFor="assignee">Assignee</Label>
                <Select>
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="All Assignees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="jane">Jane Smith</SelectItem>
                    <SelectItem value="mike">Mike Johnson</SelectItem>
                    <SelectItem value="sarah">Sarah Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full md:w-3/4">
              {view === "calendar" && (
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-4">Tasks for {date?.toLocaleDateString()}</h3>
                  <div className="space-y-4">
                    {filteredTasks.map((task) => (
                      <Card key={task.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{task.title}</h4>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                task.priority === "High"
                                  ? "bg-red-100 text-red-800"
                                  : task.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Assigned to:</span> {task.assignedTo}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Status:</span> {task.status}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Time:</span> {task.time}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Duration:</span> {task.duration}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Equipment:</span> {task.equipment}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Location:</span> {task.location}
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="default" size="sm">
                              Edit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {view === "list" && (
                <div className="border rounded-md p-4">
                  <div className="grid grid-cols-6 gap-4 font-medium text-sm mb-2 px-2">
                    <div>Task</div>
                    <div>Assignee</div>
                    <div>Date & Time</div>
                    <div>Equipment</div>
                    <div>Priority</div>
                    <div>Status</div>
                  </div>
                  <div className="space-y-2">
                    {filteredTasks.map((task) => (
                      <Card key={task.id} className="hover:bg-muted/50 cursor-pointer">
                        <CardContent className="p-3 grid grid-cols-6 gap-4 text-sm">
                          <div className="font-medium">{task.title}</div>
                          <div>{task.assignedTo}</div>
                          <div>
                            {task.date}, {task.time}
                          </div>
                          <div>{task.equipment}</div>
                          <div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                task.priority === "High"
                                  ? "bg-red-100 text-red-800"
                                  : task.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                          <div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                task.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : task.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {task.status}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {view === "board" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="bg-yellow-50 py-2">
                      <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 space-y-2">
                      {filteredTasks
                        .filter((task) => task.status === "Scheduled")
                        .map((task) => (
                          <Card key={task.id} className="hover:bg-muted/50 cursor-pointer">
                            <CardContent className="p-3 text-sm">
                              <h4 className="font-medium">{task.title}</h4>
                              <div className="text-xs text-muted-foreground mt-1">
                                {task.date}, {task.time}
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs">{task.assignedTo}</span>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    task.priority === "High"
                                      ? "bg-red-100 text-red-800"
                                      : task.priority === "Medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {task.priority}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-blue-50 py-2">
                      <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 space-y-2">
                      {filteredTasks
                        .filter((task) => task.status === "In Progress")
                        .map((task) => (
                          <Card key={task.id} className="hover:bg-muted/50 cursor-pointer">
                            <CardContent className="p-3 text-sm">
                              <h4 className="font-medium">{task.title}</h4>
                              <div className="text-xs text-muted-foreground mt-1">
                                {task.date}, {task.time}
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs">{task.assignedTo}</span>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    task.priority === "High"
                                      ? "bg-red-100 text-red-800"
                                      : task.priority === "Medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {task.priority}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-green-50 py-2">
                      <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 space-y-2">
                      {filteredTasks
                        .filter((task) => task.status === "Completed")
                        .map((task) => (
                          <Card key={task.id} className="hover:bg-muted/50 cursor-pointer">
                            <CardContent className="p-3 text-sm">
                              <h4 className="font-medium">{task.title}</h4>
                              <div className="text-xs text-muted-foreground mt-1">
                                {task.date}, {task.time}
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs">{task.assignedTo}</span>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    task.priority === "High"
                                      ? "bg-red-100 text-red-800"
                                      : task.priority === "Medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {task.priority}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
