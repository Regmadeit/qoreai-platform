"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

// Mock data - in a real app this would come from an API
const checklistData: Record<string, {
  title: string
  items: Array<{
    id: string
    label: string
    required: boolean
  }>
}> = {
  "daily-equipment": {
    title: "Daily Equipment Inspection",
    items: [
      { id: "1", label: "Check oil levels", required: true },
      { id: "2", label: "Inspect belts and hoses", required: true },
      { id: "3", label: "Test emergency stops", required: true },
      { id: "4", label: "Check coolant levels", required: true },
      { id: "5", label: "Inspect for leaks", required: true },
      { id: "6", label: "Check safety guards", required: true },
      { id: "7", label: "Test warning lights", required: false },
      { id: "8", label: "Clean sensors", required: false },
    ],
  },
  "safety-protocol": {
    title: "Safety Protocol Checklist",
    items: [
      { id: "1", label: "PPE equipment check", required: true },
      { id: "2", label: "Emergency exits clear", required: true },
      { id: "3", label: "First aid kit inspection", required: true },
      { id: "4", label: "Fire extinguisher check", required: true },
      { id: "5", label: "Safety signage visible", required: true },
      { id: "6", label: "Emergency contacts posted", required: true },
      { id: "7", label: "Spill kit available", required: false },
      { id: "8", label: "Safety meeting log", required: false },
    ],
  },
}

interface ChecklistDetailProps {
  params: {
    id: string
  }
}

export default function ChecklistDetail({ params }: ChecklistDetailProps) {
  const router = useRouter()
  const { id } = params
  const checklist = checklistData[id]
  const [checked, setChecked] = useState<string[]>([])

  if (!checklist) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Checklist not found</p>
        </CardContent>
      </Card>
    )
  }

  const handleCheck = (itemId: string) => {
    setChecked((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleSubmit = () => {
    const requiredItems = checklist.items.filter((item) => item.required)
    const allRequiredChecked = requiredItems.every((item) =>
      checked.includes(item.id)
    )

    if (!allRequiredChecked) {
      toast.error("Please complete all required items")
      return
    }

    toast.success("Checklist completed successfully")
    router.push("/checklists")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{checklist.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {checklist.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={checked.includes(item.id)}
                onCheckedChange={() => handleCheck(item.id)}
              />
              <label
                htmlFor={item.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
                {item.required && (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </label>
            </div>
          ))}
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Submit Checklist
        </Button>
      </CardContent>
    </Card>
  )
}
