"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, X, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function OperatorWorkOrderForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [showCamera, setShowCamera] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      toast({
        title: "Work Order Submitted",
        description: "Your work order has been submitted successfully.",
      })

      // Redirect after a delay
      setTimeout(() => {
        router.push("/operator/dashboard")
      }, 2000)
    }, 1500)
  }

  const handleAddImage = () => {
    // Simulate adding an image
    setImages([...images, `/placeholder.svg?height=300&width=300&query=equipment`])
    setShowCamera(false)
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  if (submitted) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-6">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Work Order Submitted</h2>
          <p className="text-muted-foreground mb-6">
            Your work order has been submitted successfully and will be reviewed by maintenance.
          </p>
          <Button onClick={() => router.push("/operator/dashboard")}>Return to Dashboard</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submit Work Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="equipment">Equipment</Label>
            <Select required>
              <SelectTrigger id="equipment">
                <SelectValue placeholder="Select equipment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="forklift-1">Forklift #1</SelectItem>
                <SelectItem value="forklift-2">Forklift #2</SelectItem>
                <SelectItem value="conveyor-a">Conveyor Belt A</SelectItem>
                <SelectItem value="dock-door-3">Dock Door #3</SelectItem>
                <SelectItem value="pallet-jack-5">Pallet Jack #5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue-type">Issue Type</Label>
            <Select required>
              <SelectTrigger id="issue-type">
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mechanical">Mechanical Issue</SelectItem>
                <SelectItem value="electrical">Electrical Issue</SelectItem>
                <SelectItem value="hydraulic">Hydraulic Issue</SelectItem>
                <SelectItem value="structural">Structural Issue</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select required>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Not Urgent</SelectItem>
                <SelectItem value="medium">Medium - Needs Attention</SelectItem>
                <SelectItem value="high">High - Affecting Operations</SelectItem>
                <SelectItem value="critical">Critical - Operations Stopped</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Add Photos</Label>
            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-muted">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Issue photo ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {images.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  className="aspect-square flex flex-col items-center justify-center"
                  onClick={() => setShowCamera(true)}
                >
                  <Camera className="h-6 w-6 mb-1" />
                  <span className="text-xs">Add Photo</span>
                </Button>
              )}
            </div>
          </div>

          {showCamera && (
            <div className="fixed inset-0 bg-background z-50 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-medium">Take Photo</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowCamera(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 bg-black flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-white mb-4">Camera preview would appear here</p>
                  <Button onClick={handleAddImage}>Take Photo</Button>
                </div>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Work Order"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function WorkOrderForm() {
  return <OperatorWorkOrderForm />
}
