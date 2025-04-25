"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle2, Clock, Truck, Clipboard, Calendar, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import { QoreAiButton } from "@/components/ai/qoreai-button"
import { Badge } from "@/components/ui/badge"

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John. Here's your daily overview.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4 mt-2">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Link href="/checklists" className="w-full">
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer h-full">
                <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Clipboard className="h-6 w-6 md:h-8 md:w-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <p className="text-sm font-medium">Start Checklist</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/logistics" className="w-full">
              <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900 transition-colors cursor-pointer h-full">
                <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Truck className="h-6 w-6 md:h-8 md:w-8 text-green-600 dark:text-green-400 mb-2" />
                  <p className="text-sm font-medium">Logistics</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/submit-work-order" className="w-full">
              <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors cursor-pointer h-full">
                <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-amber-600 dark:text-amber-400 mb-2" />
                  <p className="text-sm font-medium">Report Issue</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/team" className="w-full">
              <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors cursor-pointer h-full">
                <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <Calendar className="h-6 w-6 md:h-8 md:w-8 text-purple-600 dark:text-purple-400 mb-2" />
                  <p className="text-sm font-medium">Schedule</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Today's Tasks */}
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Today's Tasks</CardTitle>
              <QoreAiButton
                contextType="tasks"
                initialMessage="I can help you manage your tasks for today. What would you like to know?"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Morning Equipment Check</p>
                      <p className="text-xs text-muted-foreground">Completed at 8:15 AM</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/checklists">
                      <span>View</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Trailer Loading - Bay 3</p>
                      <p className="text-xs text-muted-foreground">Due by 2:30 PM</p>
                    </div>
                  </div>
                  <Button variant="default" size="sm">
                    Start
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">End of Shift Checklist</p>
                      <p className="text-xs text-muted-foreground">Due by 5:00 PM</p>
                    </div>
                  </div>
                  <Button variant="default" size="sm">
                    Start
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/checklists">
                    <span>View All Tasks</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Recent Alerts</CardTitle>
              <QoreAiButton
                contextType="alerts"
                initialMessage="I can help you understand these alerts and recommend actions. What would you like to know?"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Forklift #3 Low Battery</p>
                      <p className="text-xs text-muted-foreground">10 minutes ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/equipment/forklift-3">
                      <span>Details</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Dock Door #2 Maintenance Required</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/equipment/dock-door-2">
                      <span>Details</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/predictive-maintenance">
                    <span>View All Alerts</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4 mt-2">
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Assigned Equipment</CardTitle>
              <QoreAiButton
                contextType="equipment"
                initialMessage="I can help you with equipment information and status. What would you like to know?"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Forklift #2</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Available
                        </Badge>
                        <span className="text-xs text-muted-foreground">Battery: 87%</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                    <Link href="/equipment/forklift-2">Details</Link>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pallet Jack #5</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          Low Battery
                        </Badge>
                        <span className="text-xs text-muted-foreground">Battery: 12%</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                    <Link href="/equipment/pallet-jack-5">Details</Link>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Conveyor Belt #1</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          Operational
                        </Badge>
                        <span className="text-xs text-muted-foreground">Speed: 100%</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                    <Link href="/equipment/conveyor-belt-1">Details</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/equipment">
                    <span>View All Equipment</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4 mt-2">
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">All Tasks</CardTitle>
              <QoreAiButton
                contextType="tasks"
                initialMessage="I can help you find and manage tasks. What are you looking for?"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Morning Equipment Check</p>
                      <p className="text-xs text-muted-foreground">Completed at 8:15 AM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/checklists">
                      <span>View</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Trailer Loading - Bay 3</p>
                      <p className="text-xs text-muted-foreground">Due by 2:30 PM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/checklists">
                      <span>View</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">End of Shift Checklist</p>
                      <p className="text-xs text-muted-foreground">Due by 5:00 PM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/checklists">
                      <span>View</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/checklists">
                    <span>View All Tasks</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
