"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Activity,
  AlertTriangle,
  BarChart,
  Brain,
  CheckCircle,
  Clock,
  Settings,
  Zap
} from "lucide-react"

export default function OperatorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 qore-gradient min-h-screen">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">QoreAI Operations Center</h2>
        <div className="flex items-center space-x-2">
          <Button className="qore-button">
            <Brain className="mr-2 h-4 w-4" />
            AI Assistant
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-card/50 text-white">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="qore-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Equipment Health
                </CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">98.5%</div>
                <p className="text-xs text-muted-foreground">
                  AI-optimized performance
                </p>
              </CardContent>
            </Card>
            <Card className="qore-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Predictive Alerts
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">2</div>
                <p className="text-xs text-muted-foreground">
                  Potential issues detected
                </p>
              </CardContent>
            </Card>
            <Card className="qore-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Energy Efficiency
                </CardTitle>
                <Zap className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">+15%</div>
                <p className="text-xs text-muted-foreground">
                  AI-driven optimization
                </p>
              </CardContent>
            </Card>
            <Card className="qore-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Production Rate
                </CardTitle>
                <BarChart className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">102%</div>
                <p className="text-xs text-muted-foreground">
                  Above target efficiency
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="qore-card col-span-4">
              <CardHeader>
                <CardTitle className="text-white">AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Optimize Conveyor Speed",
                      impact: "Efficiency +3%",
                      priority: "High",
                      time: "Now"
                    },
                    {
                      title: "Schedule Preventive Maintenance",
                      impact: "Downtime -15%",
                      priority: "Medium",
                      time: "Next 48h"
                    },
                    {
                      title: "Adjust Process Parameters",
                      impact: "Quality +2%",
                      priority: "Low",
                      time: "This week"
                    }
                  ].map((rec, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-white">{rec.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {rec.impact} • {rec.priority} Priority
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">{rec.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="qore-card col-span-3">
              <CardHeader>
                <CardTitle className="text-white">Real-time Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "Production Efficiency", value: "98.5%", trend: "↑" },
                    { metric: "Quality Score", value: "99.2%", trend: "→" },
                    { metric: "Resource Utilization", value: "94.7%", trend: "↑" }
                  ].map((metric, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-white">{metric.metric}</p>
                        <p className="text-sm text-muted-foreground">{metric.trend} Trending</p>
                      </div>
                      <div className="text-sm text-white">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <Card className="qore-card">
            <CardHeader>
              <CardTitle className="text-white">AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Loading AI analysis...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <Card className="qore-card">
            <CardHeader>
              <CardTitle className="text-white">Equipment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Loading equipment data...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="qore-card">
            <CardHeader>
              <CardTitle className="text-white">Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Loading analytics...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 