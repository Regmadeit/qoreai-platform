"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/page-header"
import { ArrowLeft, Save, CheckCircle } from "lucide-react"

// Sample checklist data - in a real app, this would come from an API
const checklistData = {
  "forklift-1": {
    id: "forklift-1",
    name: "Forklift Daily Inspection",
    description: "Complete before operating any forklift",
    items: [
      { id: "item-1", label: "Check tires for damage and proper inflation", required: true },
      { id: "item-2", label: "Test brakes and parking brake", required: true },
      { id: "item-3", label: "Check hydraulic controls and lift mechanism", required: true },
      { id: "item-4", label: "Inspect forks for cracks or damage", required: true },
      { id: "item-5", label: "Test horn and backup alarm", required: true },
      { id: "item-6", label: "Check oil and fluid levels", required: true },
      { id: "item-7", label: "Inspect seat belt functionality", required: true },
    ],
  },
  "washline-1": {
    id: "washline-1",
    name: "Washline Pre-Operation Checklist",
    description: "Complete before starting washline operations",
    items: [
      { id: "item-1", label: "Check water pressure and temperature", required: true },
      { id: "item-2", label: "Inspect conveyor belt for damage", required: true },
      { id: "item-3", label: "Verify chemical levels in dispensers", required: true },
      { id: "item-4", label: "Test emergency stop buttons", required: true },
      { id: "item-5", label: "Check drain system for blockages", required: true },
      { id: "item-6", label: "Inspect spray nozzles for clogs", required: true },
      { id: "item-7", label: "Verify safety guards are in place", required: true },
    ],
  },
  "baler-1": {
    id: "baler-1",
    name: "Baler Safety Checklist",
    description: "Complete before operating the baler",
    items: [
      { id: "item-1", label: "Inspect hydraulic lines for leaks", required: true },
      { id: "item-2", label: "Check safety interlocks and guards", required: true },
      { id: "item-3", label: "Test emergency stop button", required: true },
      { id: "item-4", label: "Verify bale ejection system", required: true },
      { id: "item-5", label: "Check oil levels", required: true },
      { id: "item-6", label: "Inspect electrical connections", required: true },
      { id: "item-7", label: "Verify area is clear of personnel", required: true },
    ],
  },
}

export default function ChecklistDetail({ params }) {
  const router = useRouter()
  const { id } = params
  const checklist = checklistData[id]

  const [checkedItems, setCheckedItems] = useState({})
  const [notes, setNotes] = useState("")

  if (!checklist) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Checklist not found</h2>
        <Button onClick={() => router.push("/checklists")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Checklists
        </Button>
      </div>
    )
  }

  const handleCheckItem = (itemId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const allItemsChecked = checklist.items.every((item) => checkedItems[item.id])

  const handleSubmit = () => {
    // In a real app, this would submit the checklist to an API
    alert("Checklist submitted successfully!")
    router.push("/checklists")
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={checklist.name}
        description={checklist.description}
        actions={
          <Button variant="outline" onClick={() => router.push("/checklists")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Checklists
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Inspection Items</CardTitle>
          <CardDescription>Check off each item after inspection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checklist.items.map((item) => (
              <div key={item.id} className="flex items-start space-x-2">
                <Checkbox
                  id={item.id}
                  checked={!!checkedItems[item.id]}
                  onCheckedChange={() => handleCheckItem(item.id)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor={item.id}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      checkedItems[item.id] ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {item.label}
                  </Label>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Label htmlFor="notes">Notes or Issues Found</Label>
            <Textarea
              id="notes"
              placeholder="Enter any notes or issues found during inspection..."
              className="mt-1"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSubmit} disabled={!allItemsChecked} className="bg-qore-blue hover:bg-blue-800">
              {allItemsChecked ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Checklist
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Complete All Items
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
