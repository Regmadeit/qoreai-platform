"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, CheckCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { AiAssistantButton } from "@/components/ai/ai-assistant-button"

// Commodity types based on different processing areas
const commodityTypes = {
  washline: ["Flake", "Flake Sort", "Reject", "Capn and Rings", "Fines"],
  stadler: ["HDPE ROY", "HDPE Color", "PET Clear", "PET Color", "HD Natural", "HD Nat/Why", "PP", "PP Other"],
}

interface CommodityChecklistProps {
  area: "washline" | "stadler"
  onComplete: () => void
}

export function CommodityChecklist({ area, onComplete }: CommodityChecklistProps) {
  const [operatorName, setOperatorName] = useState("")
  const [shift, setShift] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [commodityChecks, setCommodityChecks] = useState<Record<string, { quality: string; notes: string }>>({})
  const [generalNotes, setGeneralNotes] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const areaTitle = area === "washline" ? "Washline" : "Stadler Conveyor"
  const commodities = commodityTypes[area]

  const handleQualityChange = (commodity: string, quality: string) => {
    setCommodityChecks((prev) => ({
      ...prev,
      [commodity]: {
        ...prev[commodity],
        quality,
      },
    }))
  }

  const handleNotesChange = (commodity: string, notes: string) => {
    setCommodityChecks((prev) => ({
      ...prev,
      [commodity]: {
        ...prev[commodity],
        notes,
      },
    }))
  }

  const handleImageCapture = () => {
    // In a real app, this would open the camera or file picker
    // For now, we'll simulate adding an image
    setImages((prev) => [...prev, `/placeholder.svg?height=200&width=200`])
    toast({
      title: "Image captured",
      description: "The image has been added to the checklist",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!operatorName || !shift) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Check if all commodities have been checked
      const allCommoditiesChecked = commodities.every(
        (commodity) => commodityChecks[commodity] && commodityChecks[commodity].quality,
      )

      if (!allCommoditiesChecked) {
        toast({
          title: "Incomplete checklist",
          description: "Please check the quality of all commodities",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Checklist submitted",
        description: "Your checklist has been submitted for supervisor review",
      })

      onComplete()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your checklist",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{areaTitle} Commodity Quality Checklist</CardTitle>
            <CardDescription>Check and document the quality of each commodity type</CardDescription>
          </div>
          <AiAssistantButton checklistType={area} className="ml-auto" />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="operator-name">Operator Name</Label>
              <Input
                id="operator-name"
                value={operatorName}
                onChange={(e) => setOperatorName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <Label htmlFor="shift">Shift</Label>
              <Select value={shift} onValueChange={setShift}>
                <SelectTrigger id="shift">
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (6am-2pm)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (2pm-10pm)</SelectItem>
                  <SelectItem value="night">Night (10pm-6am)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Commodity Quality Checks</h3>

            {commodities.map((commodity) => (
              <div key={commodity} className="border rounded-md p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{commodity}</h4>
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${commodity}-good`}
                        checked={commodityChecks[commodity]?.quality === "good"}
                        onCheckedChange={() => handleQualityChange(commodity, "good")}
                      />
                      <Label htmlFor={`${commodity}-good`} className="text-green-600">
                        Good
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${commodity}-fair`}
                        checked={commodityChecks[commodity]?.quality === "fair"}
                        onCheckedChange={() => handleQualityChange(commodity, "fair")}
                      />
                      <Label htmlFor={`${commodity}-fair`} className="text-amber-600">
                        Fair
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${commodity}-poor`}
                        checked={commodityChecks[commodity]?.quality === "poor"}
                        onCheckedChange={() => handleQualityChange(commodity, "poor")}
                      />
                      <Label htmlFor={`${commodity}-poor`} className="text-red-600">
                        Poor
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor={`${commodity}-notes`}>Notes</Label>
                  <Textarea
                    id={`${commodity}-notes`}
                    placeholder={`Enter notes about ${commodity} quality...`}
                    value={commodityChecks[commodity]?.notes || ""}
                    onChange={(e) => handleNotesChange(commodity, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <Label htmlFor="general-notes">General Notes</Label>
            <Textarea
              id="general-notes"
              placeholder="Enter any general notes or observations..."
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Evidence Photos</Label>
            <div className="flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24 rounded-md overflow-hidden border">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Evidence ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-24 h-24 flex flex-col items-center justify-center"
                onClick={handleImageCapture}
              >
                <Camera className="h-8 w-8 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">Add Photo</span>
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="bg-qore-blue hover:bg-blue-800">
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit for Review
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
