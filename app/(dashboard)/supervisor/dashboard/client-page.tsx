"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, BarChart3, Truck, ArrowUp, ArrowDown, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { QoreAiButton } from "@/components/ai/qoreai-button"
import { Badge } from "@/components/ui/badge"

export function SupervisorDashboardClient() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Supervisor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John. Here's your team and operations overview.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4 mt-2">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-muted-foreground">Work Orders</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">24</p>
                    <div className="flex items-center text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span className="text-xs">8%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">5 high priority</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-muted-foreground">Team Attendance</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">92%</p>
                    <div className="flex items-center text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span className="text-xs">3%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">2 absent today</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-muted-foreground">Equipment Uptime</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">87%</p>
                    <div className="flex items-center text-red-600">
                      <ArrowDown className="h-4 w-4" />
                      <span className="text-xs">2%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">3 units down</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-muted-foreground">Shipments</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">18</p>
                    <div className="flex items-center text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span className="text-xs">12%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">All on schedule</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Critical Issues */}
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Critical Issues</CardTitle>
              <QoreAiButton
                contextType="issues"
                initialMessage="I can help you understand these critical issues and recommend actions. What would you like to know?"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Main Conveyor System Failure</p>
                      <p className="text-xs text-red-600">Estimated impact: $5,200/day</p>
                    </div>
                  </div>
                  <Button variant="default" size="sm" asChild>
                    <Link href="/supervisor/predictive/conveyor-system">Assign</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Shipping Dock #3 Door Malfunction</p>
                      <p className="text-xs text-amber-600">Maintenance scheduled</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/supervisor/predictive/dock-door-3">View</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/supervisor/predictive">
                    <span>View All Issues</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Team Performance</CardTitle>
              <QoreAiButton
                contextType="team"
                initialMessage="I can help you analyze team performance data. What metrics are you interested in?"
              />
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-muted" />
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/team">
                    <span>View Team Details</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4 mt-2">
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Team Members</CardTitle>
              <QoreAiButton
                contextType="team"
                initialMessage="I can help you manage your team. What would you like to know about your team members?"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-medium text-blue-600">MJ</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Mike Johnson</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          On shift
                        </Badge>
                        <span className="text-xs text-muted-foreground">Maintenance</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/team/members/mike-johnson">Contact</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-medium text-blue-600">SL</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sarah Lee</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          On shift
                        </Badge>
                        <span className="text-xs text-muted-foreground">Operator</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/team/members/sarah-lee">Contact</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-medium text-blue-600">RB</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Robert Brown</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                          Absent
                        </Badge>
                        <span className="text-xs text-muted-foreground">Maintenance</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/team/members/robert-brown">Contact</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/team">
                    <span>View All Team Members</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4 mt-2">
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Today's Operations</CardTitle>
              <QoreAiButton
                contextType="operations"
                initialMessage="I can help you manage today's operations. What would you like to know?"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Inbound Shipment - Vendor A</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          On time
                        </Badge>
                        <span className="text-xs text-muted-foreground">ETA 2:30 PM</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/logistics?shipment=vendor-a-inbound">Details</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Outbound Shipment - Customer B</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          Delayed
                        </Badge>
                        <span className="text-xs text-muted-foreground">Waiting for QC</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/logistics?shipment=customer-b-outbound">Details</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Maintenance Window</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          Scheduled
                        </Badge>
                        <span className="text-xs text-muted-foreground">8:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/maintenance/work-orders?type=scheduled">Details</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/logistics">
                    <span>View All Operations</span>
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

export default SupervisorDashboardClient
