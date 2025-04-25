"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Clock, Wrench, RefreshCw, TrendingUp, BarChart } from "lucide-react"
import { predictFailure, type EquipmentData, type PredictionResult } from "@/lib/ai/predictive-model"

// Sample equipment data for demonstration
const sampleEquipment: EquipmentData[] = [
  {
    id: "EQ-001",
    name: "Conveyor Belt A",
    type: "conveyor",
    readings: Array.from({ length: 100 }, (_, i) => ({
      timestamp: new Date(Date.now() - (100 - i) * 3600000).toISOString(),
      temperature: 65 + Math.random() * 10 + (i > 80 ? i - 80 : 0),
      vibration: 30 + Math.random() * 5 + (i > 90 ? (i - 90) * 3 : 0),
      pressure: 100 + Math.random() * 10,
      runtime: 5000 + i * 10,
      powerConsumption: 1500 + Math.random() * 200,
    })),
    maintenanceHistory: [
      {
        date: new Date(Date.now() - 30 * 24 * 3600000).toISOString(),
        type: "scheduled",
        description: "Regular maintenance",
        parts: ["Belt", "Rollers"],
        downtime: 4,
      },
      {
        date: new Date(Date.now() - 90 * 24 * 3600000).toISOString(),
        type: "breakdown",
        description: "Belt misalignment",
        parts: ["Belt", "Alignment system"],
        downtime: 12,
      },
    ],
  },
  {
    id: "EQ-002",
    name: "Hydraulic Press B",
    type: "press",
    readings: Array.from({ length: 100 }, (_, i) => ({
      timestamp: new Date(Date.now() - (100 - i) * 3600000).toISOString(),
      temperature: 70 + Math.random() * 5,
      vibration: 25 + Math.random() * 3,
      pressure: 110 + Math.random() * 15,
      runtime: 3000 + i * 10,
      powerConsumption: 2000 + Math.random() * 300,
    })),
    maintenanceHistory: [
      {
        date: new Date(Date.now() - 15 * 24 * 3600000).toISOString(),
        type: "scheduled",
        description: "Hydraulic fluid change",
        parts: ["Hydraulic fluid", "Filter"],
        downtime: 6,
      },
    ],
  },
  {
    id: "EQ-003",
    name: "CNC Machine C",
    type: "cnc",
    readings: Array.from({ length: 100 }, (_, i) => ({
      timestamp: new Date(Date.now() - (100 - i) * 3600000).toISOString(),
      temperature: 75 + Math.random() * 15,
      vibration: 40 + Math.random() * 10,
      pressure: 90 + Math.random() * 5,
      runtime: 8000 + i * 10,
      powerConsumption: 2500 + Math.random() * 200,
    })),
    maintenanceHistory: [
      {
        date: new Date(Date.now() - 60 * 24 * 3600000).toISOString(),
        type: "scheduled",
        description: "Tool replacement",
        parts: ["Cutting tools", "Lubricant"],
        downtime: 3,
      },
      {
        date: new Date(Date.now() - 120 * 24 * 3600000).toISOString(),
        type: "unscheduled",
        description: "Control system error",
        parts: ["Control board"],
        downtime: 8,
      },
    ],
  },
]

export function AIPredictionDashboard() {
  const [predictions, setPredictions] = useState<PredictionResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null)

  // Get predictions for all equipment
  useEffect(() => {
    async function getPredictions() {
      setIsLoading(true)

      try {
        const results = await Promise.all(sampleEquipment.map((equipment) => predictFailure(equipment)))

        setPredictions(results)

        // Auto-select equipment with highest failure probability
        const highestRiskIndex = results.reduce(
          (maxIndex, prediction, currentIndex, arr) =>
            prediction.failureProbability > arr[maxIndex].failureProbability ? currentIndex : maxIndex,
          0,
        )

        setSelectedEquipment(results[highestRiskIndex].equipmentId)
      } catch (error) {
        console.error("Error getting predictions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getPredictions()
  }, [])

  // Get the selected prediction
  const selectedPrediction = predictions.find((p) => p.equipmentId === selectedEquipment)

  // Get the selected equipment data
  const selectedEquipmentData = sampleEquipment.find((e) => e.id === selectedEquipment)

  // Format hours to a readable format
  const formatHours = (hours: number) => {
    if (hours < 24) return `${Math.round(hours)} hours`
    const days = Math.floor(hours / 24)
    return `${days} day${days !== 1 ? "s" : ""}`
  }

  // Refresh predictions
  const handleRefresh = async () => {
    setIsLoading(true)

    try {
      const results = await Promise.all(sampleEquipment.map((equipment) => predictFailure(equipment)))

      setPredictions(results)
    } catch (error) {
      console.error("Error refreshing predictions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI Predictive Maintenance</h2>
        <Button onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Predictions
        </Button>
      </div>

      {/* Equipment Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictions.map((prediction) => {
          const equipment = sampleEquipment.find((e) => e.id === prediction.equipmentId)
          if (!equipment) return null

          // Determine status color
          let statusColor = "bg-green-500"
          if (prediction.failureProbability > 0.7) statusColor = "bg-red-500"
          else if (prediction.failureProbability > 0.4) statusColor = "bg-amber-500"
          else if (prediction.failureProbability > 0.2) statusColor = "bg-blue-500"

          return (
            <Card
              key={prediction.equipmentId}
              className={`cursor-pointer transition-all ${selectedEquipment === prediction.equipmentId ? "ring-2 ring-qore-blue" : ""}`}
              onClick={() => setSelectedEquipment(prediction.equipmentId)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{equipment.name}</CardTitle>
                    <CardDescription>{equipment.type}</CardDescription>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Failure Probability</div>
                    <div className="flex items-center gap-2">
                      <Progress value={prediction.failureProbability * 100} className="h-2" />
                      <span className="text-sm font-medium">{Math.round(prediction.failureProbability * 100)}%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <Clock className="inline h-4 w-4 mr-1" />
                      {formatHours(prediction.estimatedTimeToFailure)}
                    </div>
                    <Badge variant={prediction.anomalyDetected ? "destructive" : "outline"}>
                      {prediction.anomalyDetected ? "Anomaly Detected" : "Normal"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed Analysis */}
      {selectedPrediction && selectedEquipmentData && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Analysis: {selectedEquipmentData.name}</CardTitle>
            <CardDescription>AI-powered predictive maintenance analysis and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="history">Maintenance History</TabsTrigger>
                <TabsTrigger value="readings">Sensor Readings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Failure Probability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold mb-2">
                          {Math.round(selectedPrediction.failureProbability * 100)}%
                        </div>
                        <Progress value={selectedPrediction.failureProbability * 100} className="h-2 w-full" />
                        <div className="text-sm text-muted-foreground mt-2">
                          Confidence: {Math.round(selectedPrediction.confidenceScore * 100)}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Estimated Time to Failure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold mb-2">
                          {formatHours(selectedPrediction.estimatedTimeToFailure)}
                        </div>
                        <Clock className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        {selectedPrediction.failureProbability > 0.7 ? (
                          <>
                            <div className="text-3xl font-bold text-red-500 mb-2">Critical</div>
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                          </>
                        ) : selectedPrediction.failureProbability > 0.4 ? (
                          <>
                            <div className="text-3xl font-bold text-amber-500 mb-2">Warning</div>
                            <AlertTriangle className="h-8 w-8 text-amber-500" />
                          </>
                        ) : selectedPrediction.failureProbability > 0.2 ? (
                          <>
                            <div className="text-3xl font-bold text-blue-500 mb-2">Monitor</div>
                            <TrendingUp className="h-8 w-8 text-blue-500" />
                          </>
                        ) : (
                          <>
                            <div className="text-3xl font-bold text-green-500 mb-2">Healthy</div>
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Critical Components</CardTitle>
                    <CardDescription>Components that may require attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedPrediction.criticalComponents.length > 0 ? (
                      <div className="space-y-2">
                        {selectedPrediction.criticalComponents.map((component, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            <span>{component}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>No critical components detected</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                    <CardDescription>Suggested actions based on predictive analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPrediction.recommendedActions.map((action, index) => (
                        <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                          <div className="bg-qore-blue/10 p-2 rounded-full">
                            <Wrench className="h-5 w-5 text-qore-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">{action}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {index === 0 &&
                                selectedPrediction.failureProbability > 0.7 &&
                                "Immediate action required to prevent equipment failure."}
                              {index === 0 &&
                                selectedPrediction.failureProbability > 0.4 &&
                                selectedPrediction.failureProbability <= 0.7 &&
                                "Prompt action recommended to address potential issues."}
                              {index === 0 &&
                                selectedPrediction.failureProbability <= 0.4 &&
                                "Preventative action to maintain equipment health."}
                              {index === 1 && "Based on historical data and current readings."}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance History</CardTitle>
                    <CardDescription>Previous maintenance activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedEquipmentData.maintenanceHistory.map((maintenance, index) => (
                        <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                          <div
                            className={`p-2 rounded-full ${
                              maintenance.type === "breakdown"
                                ? "bg-red-100"
                                : maintenance.type === "unscheduled"
                                  ? "bg-amber-100"
                                  : "bg-green-100"
                            }`}
                          >
                            <Wrench
                              className={`h-5 w-5 ${
                                maintenance.type === "breakdown"
                                  ? "text-red-500"
                                  : maintenance.type === "unscheduled"
                                    ? "text-amber-500"
                                    : "text-green-500"
                              }`}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{maintenance.description}</h4>
                              <Badge
                                variant={
                                  maintenance.type === "breakdown"
                                    ? "destructive"
                                    : maintenance.type === "unscheduled"
                                      ? "default"
                                      : "outline"
                                }
                              >
                                {maintenance.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(maintenance.date).toLocaleDateString()} • Downtime: {maintenance.downtime} hours
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {maintenance.parts.map((part, i) => (
                                <Badge key={i} variant="outline">
                                  {part}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="readings">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Sensor Readings</CardTitle>
                    <CardDescription>Last 24 hours of equipment data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <BarChart className="h-16 w-16 text-muted-foreground" />
                      <p className="text-muted-foreground ml-4">Sensor data visualization would be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
