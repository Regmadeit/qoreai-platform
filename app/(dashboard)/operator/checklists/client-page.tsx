"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, AlertTriangle, ChevronRight, Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function EquipmentChecklistClient() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [activeChecklist, setActiveChecklist] = useState<string | null>(null)

  const checklists = [
    {
      id: "forklift-1",
      name: "Forklift #1 Daily Inspection",
      status: "due",
      items: [
        { id: "1", label: "Check tires for damage and proper inflation", required: true },
        { id: "2", label: "Test horn and backup alarm", required: true },
        { id: "3", label: "Check hydraulic fluid levels", required: true },
        { id: "4", label: "Inspect forks for cracks or damage", required: true },
        { id: "5", label: "Test brakes and parking brake", required: true },
        { id: "6", label: "Check battery charge level", required: true },
        { id: "7", label: "Inspect seat belt functionality", required: true },
        { id: "8", label: "Check lights and signals", required: true },
      ],
    },
    {
      id: "pallet-jack-5",
      name: "Pallet Jack #5 Daily Inspection",
      status: "due",
      items: [
        { id: "1", label: "Check wheels for damage", required: true },
        { id: "2", label: "Test lifting and lowering mechanism", required: true },
        { id: "3", label: "Inspect handle for damage", required: true },
        { id: "4", label: "Check hydraulic fluid for leaks", required: true },
      ],
    },
    {
      id: "dock-door-3",
      name: "Dock Door #3 Daily Inspection",
      status: "completed",
      items: [],
    },
  ]

  const [checklistItems, setChecklistItems] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState("")

  const handleItemCheck = (itemId: string) => {
    setChecklistItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      toast({
        title: "Checklist Submitted",
        description: "Your equipment checklist has been submitted successfully.",
      })

      // Reset and go back to list
      setTimeout(() => {
        setActiveChecklist(null)
        setChecklistItems({})
        setNotes("")
        setSubmitted(false)
      }, 2000)
    }, 1500)
  }

  // Render the active checklist form
  if (activeChecklist) {
    const checklist = checklists.find((c) => c.id === activeChecklist)

    if (!checklist) return null

    if (submitted) {
      return (
        <Card className="w-full">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Checklist Submitted</h2>
            <p className="text-muted-foreground mb-6">Your equipment checklist has been submitted successfully.</p>
            <Button onClick={() => setActiveChecklist(null)}>Return to Checklists</Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card className="w-full">
        <CardHeader>
          <Button variant="ghost" className="mb-2 -ml-2 text-muted-foreground" onClick={() => setActiveChecklist(null)}>
            ← Back to Checklists
          </Button>
          <CardTitle>{checklist.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {checklist.items.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 pb-4 border-b">
                <Checkbox
                  id={`item-${item.id}`}
                  checked={!!checklistItems[item.id]}
                  onCheckedChange={() => handleItemCheck(item.id)}
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`item-${item.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.label}
                  </Label>
                  {item.required && <p className="text-xs text-muted-foreground mt-1">Required</p>}
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="notes">Notes or Issues</Label>
              <Textarea
                id="notes"
                placeholder="Enter any notes or issues found..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button type="button" variant="outline" className="flex items-center gap-1">
                <Camera className="h-4 w-4" />
                Add Photo
              </Button>

              <Button onClick={handleSubmit} disabled={isSubmitting || !Object.values(checklistItems).every(Boolean)}>
                {isSubmitting ? "Submitting..." : "Submit Checklist"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Render the list of available checklists
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Equipment Checklists</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {checklists.map((checklist) => (
              <div
                key={checklist.id}
                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                onClick={() => checklist.status === "due" && setActiveChecklist(checklist.id)}
              >
                <div className="flex items-center gap-3">
                  {checklist.status === "completed" ? (
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{checklist.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {checklist.status === "completed" ? "Completed today" : "Due today"}
                    </p>
                  </div>
                </div>
                {checklist.status === "due" && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Checklists</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Forklift #2 Daily Inspection</p>
                  <p className="text-xs text-muted-foreground">Completed yesterday</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Pallet Jack #3 Daily Inspection</p>
                  <p className="text-xs text-muted-foreground">Completed yesterday</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ChecklistPage() {
  return <EquipmentChecklistClient />
}
