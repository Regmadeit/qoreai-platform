"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Users,
  Settings,
  BarChart,
  AlertTriangle,
  CheckCircle,
  Building,
  Shield,
  Activity
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 qore-gradient min-h-screen">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button className="qore-button">
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-card/50 text-white">
          <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" onClick={() => setActiveTab("users")}>
            Users
          </TabsTrigger>
          <TabsTrigger value="analytics" onClick={() => setActiveTab("analytics")}>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" onClick={() => setActiveTab("settings")}>
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="qore-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">2,853</div>
                <p className="text-xs text-muted-foreground">
                  +180 this month
                </p>
              </CardContent>
            </Card>
            <Card className="qore-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Active Facilities
                </CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">42</div>
                <p className="text-xs text-muted-foreground">
                  Across 12 regions
                </p>
              </CardContent>
            </Card>
            <Card className="qore-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  System Health
                </CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <p className="text-xs text-muted-foreground">
                  All systems operational
                </p>
              </CardContent>
            </Card>
            <Card className="qore-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Security Status
                </CardTitle>
                <Shield className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Protected</div>
                <p className="text-xs text-muted-foreground">
                  No threats detected
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="qore-card col-span-4">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "New User Registration",
                      details: "John Doe (Operator)",
                      time: "2m ago"
                    },
                    {
                      action: "System Update",
                      details: "Version 2.1.0 deployed",
                      time: "1h ago"
                    },
                    {
                      action: "Security Alert",
                      details: "Failed login attempts detected",
                      time: "3h ago"
                    }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-white">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="qore-card col-span-3">
              <CardHeader>
                <CardTitle className="text-white">System Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "CPU Usage", value: "45%", status: "Normal" },
                    { metric: "Memory Usage", value: "62%", status: "Normal" },
                    { metric: "Storage", value: "78%", status: "Warning" }
                  ].map((metric, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-white">{metric.metric}</p>
                        <p className="text-sm text-muted-foreground">{metric.status}</p>
                      </div>
                      <div className="text-sm text-white">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="qore-card">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* User management interface will be implemented here */}
                <p className="text-muted-foreground">Loading user data...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="qore-card">
            <CardHeader>
              <CardTitle className="text-white">System Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Analytics dashboard will be implemented here */}
                <p className="text-muted-foreground">Loading analytics...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="qore-card">
            <CardHeader>
              <CardTitle className="text-white">System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Settings interface will be implemented here */}
                <p className="text-muted-foreground">Loading settings...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 