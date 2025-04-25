// This file defines the core AI learning model for predictive maintenance

export interface EquipmentData {
  id: string
  name: string
  type: string
  readings: {
    timestamp: string
    temperature: number
    vibration: number
    pressure: number
    runtime: number
    powerConsumption: number
    [key: string]: any // Allow for additional sensor readings
  }[]
  maintenanceHistory: {
    date: string
    type: "scheduled" | "unscheduled" | "breakdown"
    description: string
    parts: string[]
    downtime: number // in hours
  }[]
}

export interface PredictionResult {
  equipmentId: string
  failureProbability: number
  estimatedTimeToFailure: number // in hours
  confidenceScore: number
  recommendedActions: string[]
  criticalComponents: string[]
  anomalyDetected: boolean
}

// Feature extraction from raw equipment data
function extractFeatures(data: EquipmentData): number[] {
  // Calculate key features from the equipment data
  const recentReadings = data.readings.slice(-100) // Get last 100 readings

  // Calculate averages
  const avgTemp = recentReadings.reduce((sum, r) => sum + r.temperature, 0) / recentReadings.length
  const avgVibration = recentReadings.reduce((sum, r) => sum + r.vibration, 0) / recentReadings.length
  const avgPressure = recentReadings.reduce((sum, r) => sum + r.pressure, 0) / recentReadings.length
  const totalRuntime = recentReadings[recentReadings.length - 1].runtime

  // Calculate trends (slope of recent readings)
  const tempTrend = calculateTrend(recentReadings.map((r) => r.temperature))
  const vibrationTrend = calculateTrend(recentReadings.map((r) => r.vibration))
  const pressureTrend = calculateTrend(recentReadings.map((r) => r.pressure))

  // Calculate variability
  const tempVariability = calculateStandardDeviation(recentReadings.map((r) => r.temperature))
  const vibrationVariability = calculateStandardDeviation(recentReadings.map((r) => r.vibration))

  // Calculate time since last maintenance
  const lastMaintenance =
    data.maintenanceHistory.length > 0
      ? new Date(data.maintenanceHistory[data.maintenanceHistory.length - 1].date)
      : new Date(0)
  const timeSinceLastMaintenance = (new Date().getTime() - lastMaintenance.getTime()) / (1000 * 60 * 60) // in hours

  // Count previous breakdowns
  const breakdownCount = data.maintenanceHistory.filter((m) => m.type === "breakdown").length

  // Return feature vector
  return [
    avgTemp,
    avgVibration,
    avgPressure,
    totalRuntime,
    tempTrend,
    vibrationTrend,
    pressureTrend,
    tempVariability,
    vibrationVariability,
    timeSinceLastMaintenance,
    breakdownCount,
  ]
}

// Helper function to calculate trend (simple linear regression slope)
function calculateTrend(values: number[]): number {
  const n = values.length
  if (n <= 1) return 0

  // Create x-coordinates (0, 1, 2, ..., n-1)
  const x = Array.from({ length: n }, (_, i) => i)

  // Calculate means
  const meanX = x.reduce((sum, val) => sum + val, 0) / n
  const meanY = values.reduce((sum, val) => sum + val, 0) / n

  // Calculate slope
  let numerator = 0
  let denominator = 0

  for (let i = 0; i < n; i++) {
    numerator += (x[i] - meanX) * (values[i] - meanY)
    denominator += Math.pow(x[i] - meanX, 2)
  }

  return denominator !== 0 ? numerator / denominator : 0
}

// Helper function to calculate standard deviation
function calculateStandardDeviation(values: number[]): number {
  const n = values.length
  if (n <= 1) return 0

  const mean = values.reduce((sum, val) => sum + val, 0) / n
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n

  return Math.sqrt(variance)
}

// Main prediction function
export async function predictFailure(equipmentData: EquipmentData): Promise<PredictionResult> {
  // Extract features from the equipment data
  const features = extractFeatures(equipmentData)

  // In a real implementation, this would use a trained machine learning model
  // For this example, we'll use a simplified heuristic approach

  // Calculate a baseline failure probability based on runtime and maintenance history
  let failureProbability = Math.min(0.95, features[3] / 10000) // Based on total runtime

  // Adjust based on time since last maintenance
  failureProbability += features[9] / 1000

  // Adjust based on sensor readings (temperature, vibration, pressure)
  if (features[0] > 80) failureProbability += 0.2 // High temperature
  if (features[1] > 50) failureProbability += 0.3 // High vibration
  if (features[4] > 0.5) failureProbability += 0.1 // Rising temperature trend
  if (features[5] > 0.3) failureProbability += 0.2 // Rising vibration trend

  // Cap probability at 0.95
  failureProbability = Math.min(0.95, Math.max(0.01, failureProbability))

  // Estimate time to failure based on probability
  const estimatedTimeToFailure =
    failureProbability > 0.5 ? Math.max(1, 100 * (1 - failureProbability)) : 500 * (1 - failureProbability)

  // Determine confidence score
  const confidenceScore = 0.7 + (features[7] < 5 ? 0.2 : 0) + (features[10] > 2 ? 0.1 : 0)

  // Determine critical components based on readings
  const criticalComponents = []
  if (features[0] > 80) criticalComponents.push("Cooling system")
  if (features[1] > 50) criticalComponents.push("Bearings")
  if (features[2] > 120) criticalComponents.push("Pressure valve")

  // Generate recommended actions
  const recommendedActions = []
  if (failureProbability > 0.7) {
    recommendedActions.push("Schedule immediate maintenance")
    recommendedActions.push("Order replacement parts")
  } else if (failureProbability > 0.4) {
    recommendedActions.push("Schedule maintenance within 48 hours")
    recommendedActions.push("Perform detailed inspection")
  } else if (failureProbability > 0.2) {
    recommendedActions.push("Monitor equipment closely")
    recommendedActions.push("Schedule maintenance within 2 weeks")
  } else {
    recommendedActions.push("Continue regular maintenance schedule")
  }

  // Determine if an anomaly is detected
  const anomalyDetected = failureProbability > 0.4

  return {
    equipmentId: equipmentData.id,
    failureProbability,
    estimatedTimeToFailure,
    confidenceScore,
    recommendedActions,
    criticalComponents,
    anomalyDetected,
  }
}

// Function to continuously improve the model with new data
export async function trainModel(historicalData: EquipmentData[]): Promise<void> {
  // In a real implementation, this would:
  // 1. Preprocess the historical data
  // 2. Extract features and labels
  // 3. Train a machine learning model (e.g., Random Forest, Neural Network)
  // 4. Save the trained model for future predictions

  console.log(`Training model with ${historicalData.length} equipment records`)

  // Simulate training time
  await new Promise((resolve) => setTimeout(resolve, 2000))

  console.log("Model training complete")
}

// Function to detect anomalies in real-time data
export function detectAnomalies(realtimeData: EquipmentData["readings"][0]): boolean {
  // Simple anomaly detection based on thresholds
  return (
    realtimeData.temperature > 90 ||
    realtimeData.vibration > 60 ||
    realtimeData.pressure > 150 ||
    realtimeData.powerConsumption > 2000
  )
}
