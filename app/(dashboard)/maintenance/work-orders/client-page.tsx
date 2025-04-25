"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, AlertTriangle, Clock, CheckCircle2, ChevronRight } from "lucide-react"

export function MaintenanceWorkOrdersClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("assigned")
  const [showFilters, setShowFilters] = useState(false)

  const workOrders = {
    assigned: [
      {
        id: "WO-2023-042",
        title: "Conveyor Belt Repair",
        equipment: "Conveyor System A",
        priority: "high",
        status: "assigned",
        dueDate: "Today",
      },
      {
        id: "WO-2023-045",
        title: "Forklift Maintenance",
        equipment: "Forklift #2",
        priority: "medium",
        status: "assigned",
        dueDate: "Tomorrow",
      },
      {
        id: "WO-2023-048",
        title: "Light Fixture Replacement",
        equipment: "Warehouse Section B",
        priority: "low",
        status: "assigned",
        dueDate: "Apr 28",
      },
    ],
    inProgress: [
      {
        id: "WO-2023-039",
        title: "HVAC Filter Replacement",
        equipment: "HVAC System",
        priority: "medium",
        status: "in-progress",
        dueDate: "Today",
      },
    ],
    completed: [
      {
        id: "WO-2023-036",
        title: "Dock Door Repair",
        equipment: "Dock Door #3",
        priority: "high",
        status: "completed",
        completedDate: "Yesterday",
      },
      {
        id: "WO-2023-032",
        title: "Pallet Jack Wheel Replacement",
        equipment: "Pallet Jack #5",
        priority: "medium",
        status: "completed",
        completedDate: "Apr 22",
      },
    ],
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-600">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-600">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "assigned":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "in-progress":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      default:
        return null
    }
  }

  const filteredWorkOrders = {
    assigned: workOrders.assigned.filter(
      (wo) =>
        wo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.equipment.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    inProgress: workOrders.inProgress.filter(
      (wo) =>
        wo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.equipment.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    completed: workOrders.completed.filter(
      (wo) =>
        wo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.equipment.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search work orders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-muted" : ""}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {showFilters && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                Priority
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Date
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Equipment
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Location
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant="ghost" size="sm">
                Clear All
              </Button>
              <Button size="sm">Apply Filters</Button>
            </div>
          </div>
        </Card>
      )}

      <Tabs defaultValue="assigned" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assigned">
            Assigned
            {filteredWorkOrders.assigned.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {filteredWorkOrders.assigned.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="inProgress">
            In Progress
            {filteredWorkOrders.inProgress.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {filteredWorkOrders.inProgress.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            {filteredWorkOrders.completed.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {filteredWorkOrders.completed.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assigned" className="mt-4 space-y-4">
          {filteredWorkOrders.assigned.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No assigned work orders found</p>
            </div>
          ) : (
            filteredWorkOrders.assigned.map((wo) => (
              <Card key={wo.id} className="overflow-hidden">
                <div className="flex items-center p-4 cursor-pointer hover:bg-muted/50">
                  <div className="mr-4">{getStatusIcon(wo.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{wo.title}</p>
                      {getPriorityBadge(wo.priority)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {wo.id} • {wo.equipment}
                        </p>
                        <p className="text-xs font-medium">Due: {wo.dueDate}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="inProgress" className="mt-4 space-y-4">
          {filteredWorkOrders.inProgress.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No work orders in progress</p>
            </div>
          ) : (
            filteredWorkOrders.inProgress.map((wo) => (
              <Card key={wo.id} className="overflow-hidden">
                <div className="flex items-center p-4 cursor-pointer hover:bg-muted/50">
                  <div className="mr-4">{getStatusIcon(wo.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{wo.title}</p>
                      {getPriorityBadge(wo.priority)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {wo.id} • {wo.equipment}
                        </p>
                        <p className="text-xs font-medium">Due: {wo.dueDate}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Complete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4 space-y-4">
          {filteredWorkOrders.completed.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No completed work orders found</p>
            </div>
          ) : (
            filteredWorkOrders.completed.map((wo) => (
              <Card key={wo.id} className="overflow-hidden">
                <div className="flex items-center p-4 cursor-pointer hover:bg-muted/50">
                  <div className="mr-4">{getStatusIcon(wo.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{wo.title}</p>
                      {getPriorityBadge(wo.priority)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {wo.id} • {wo.equipment}
                        </p>
                        <p className="text-xs font-medium">Completed: {wo.completedDate}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function WorkOrdersPage() {
  return <MaintenanceWorkOrdersClient />
}
