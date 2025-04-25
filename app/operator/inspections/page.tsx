"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

// Mock data - replace with real data from your backend
const inspectionItems = [
  {
    id: 1,
    equipment: "Conveyor Belt A",
    checks: [
      { id: "1-1", label: "Check belt tension", required: true },
      { id: "1-2", label: "Inspect rollers for wear", required: true },
      { id: "1-3", label: "Verify emergency stops", required: true },
      { id: "1-4", label: "Check motor temperature", required: true },
    ],
  },
  {
    id: 2,
    equipment: "Hydraulic Press B",
    checks: [
      { id: "2-1", label: "Check oil levels", required: true },
      { id: "2-2", label: "Inspect hydraulic lines", required: true },
      { id: "2-3", label: "Test pressure gauges", required: true },
      { id: "2-4", label: "Verify safety guards", required: true },
    ],
  },
]

export default function EquipmentInspection() {
  const [activeInspection, setActiveInspection] = useState<number | null>(null)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})

  const handleCheckItem = (checkId: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [checkId]: checked }))
  }

  const handleAddNote = (equipmentId: number, note: string) => {
    setNotes((prev) => ({ ...prev, [equipmentId]: note }))
  }

  const isInspectionComplete = (equipmentId: number) => {
    const equipment = inspectionItems.find((item) => item.id === equipmentId)
    if (!equipment) return false
    return equipment.checks.every((check) => checkedItems[check.id])
  }

  const handleSubmitInspection = (equipmentId: number) => {
    if (isInspectionComplete(equipmentId)) {
      // Submit inspection data to your backend
      console.log("Inspection submitted:", {
        equipmentId,
        checks: checkedItems,
        notes: notes[equipmentId],
      })
      setActiveInspection(null)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipment Inspection</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Inspections</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Due today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Today's inspections</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Equipment Inspection</CardTitle>
          <CardDescription>Complete the required checks for each piece of equipment</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={String(inspectionItems[0].id)} className="space-y-4">
            <TabsList>
              {inspectionItems.map((item) => (
                <TabsTrigger key={item.id} value={String(item.id)}>
                  {item.equipment}
                </TabsTrigger>
              ))}
            </TabsList>

            {inspectionItems.map((item) => (
              <TabsContent key={item.id} value={String(item.id)} className="space-y-4">
                <div className="space-y-4">
                  {item.checks.map((check) => (
                    <div key={check.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={check.id}
                        checked={checkedItems[check.id] || false}
                        onCheckedChange={(checked) => handleCheckItem(check.id, checked as boolean)}
                      />
                      <Label htmlFor={check.id}>{check.label}</Label>
                    </div>
                  ))}

                  <div className="space-y-2">
                    <Label htmlFor={`notes-${item.id}`}>Notes</Label>
                    <Input
                      id={`notes-${item.id}`}
                      placeholder="Add any observations or issues..."
                      value={notes[item.id] || ""}
                      onChange={(e) => handleAddNote(item.id, e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => handleSubmitInspection(item.id)}
                    disabled={!isInspectionComplete(item.id)}
                  >
                    Submit Inspection
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 