"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

interface ChecklistFormProps {
  id: string
  title: string
  description: string
  items: string[]
  onComplete?: () => void
}

export function ChecklistForm({ id, title, description, items, onComplete }: ChecklistFormProps) {
  const [operatorName, setOperatorName] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCheckItem = (item: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!operatorName) {
        toast({
          title: "Missing information",
          description: "Please enter your name",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Check if all items are checked
      const allItemsChecked = items.every((item) => checkedItems[item])
      if (!allItemsChecked) {
        toast({
          title: "Incomplete checklist",
          description: "Please check all items before submitting",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Checklist submitted",
        description: "Your checklist has been submitted for review",
      })

      if (onComplete) {
        onComplete()
      }
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
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Checklist Items</h3>
            <div className="border rounded-md p-4 space-y-4">
              {items.map((item) => (
                <div key={item} className="flex items-start space-x-2">
                  <Checkbox
                    id={`item-${item}`}
                    checked={checkedItems[item] || false}
                    onCheckedChange={(checked) => handleCheckItem(item, checked === true)}
                  />
                  <Label htmlFor={`item-${item}`} className="text-sm leading-tight">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter any additional notes or observations"
              className="min-h-[100px]"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/checklists">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-qore-blue hover:bg-blue-800">
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Submit Checklist
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
