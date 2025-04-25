"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar as CalendarIcon, CheckCircle, AlertTriangle } from "lucide-react"

// Mock data - replace with real data from your backend
const scheduleItems = [
  {
    id: 1,
    title: "Morning Equipment Check",
    time: "08:00 AM",
    duration: "1 hour",
    status: "completed",
    type: "inspection",
  },
  {
    id: 2,
    title: "Production Line A Operation",
    time: "09:00 AM",
    duration: "4 hours",
    status: "in-progress",
    type: "production",
  },
  {
    id: 3,
    title: "Maintenance Break",
    time: "01:00 PM",
    duration: "30 minutes",
    status: "upcoming",
    type: "maintenance",
  },
]

export default function ProductionSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "upcoming":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "inspection":
        return <CheckCircle className="h-4 w-4" />
      case "maintenance":
        return <AlertTriangle className="h-4 w-4" />
      case "production":
        return <Clock className="h-4 w-4" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Production Schedule</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Production tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Scheduled tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Week Total</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Tasks scheduled</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Select a date to view scheduled tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Details</CardTitle>
            <CardDescription>Tasks and activities for {date?.toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="production">Production</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {scheduleItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between space-x-4 rounded-lg border p-4"
                  >
                    <div className="flex items-center space-x-4">
                      {getTypeIcon(item.type)}
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-muted-foreground">{item.time}</p>
                          <span className="text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">{item.duration}</p>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="production" className="space-y-4">
                {scheduleItems
                  .filter((item) => item.type === "production")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between space-x-4 rounded-lg border p-4"
                    >
                      <div className="flex items-center space-x-4">
                        {getTypeIcon(item.type)}
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm text-muted-foreground">{item.time}</p>
                            <span className="text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">{item.duration}</p>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4">
                {scheduleItems
                  .filter((item) => item.type === "maintenance")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between space-x-4 rounded-lg border p-4"
                    >
                      <div className="flex items-center space-x-4">
                        {getTypeIcon(item.type)}
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm text-muted-foreground">{item.time}</p>
                            <span className="text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">{item.duration}</p>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 