"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileBarcodeScanner } from "@/components/barcode/mobile-barcode-scanner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Check, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function InventoryScanPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showScanner, setShowScanner] = useState(true)
  const [scannedItem, setScannedItem] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [location, setLocation] = useState("")
  const [action, setAction] = useState("check-in")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleScan = (barcode: string) => {
    setScannedItem(barcode)
    setShowScanner(false)

    // In a real app, we would fetch item details based on the barcode
    toast({
      title: "Item Found",
      description: `Scanned item: ${barcode}`,
    })
  }

  const handleCancel = () => {
    router.back()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Inventory Updated",
      description: `Item ${scannedItem} has been ${action === "check-in" ? "checked in" : "checked out"}.`,
    })

    setIsSubmitting(false)
    setIsComplete(true)

    // Reset after a delay
    setTimeout(() => {
      router.push("/inventory")
    }, 2000)
  }

  const handleScanAgain = () => {
    setScannedItem(null)
    setShowScanner(true)
  }

  if (showScanner) {
    return (
      <MobileBarcodeScanner
        onScan={handleScan}
        onCancel={handleCancel}
        title="Scan Inventory Item"
        description="Position the barcode within the frame"
      />
    )
  }

  if (isComplete) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-6">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Inventory Updated</h2>
          <p className="text-muted-foreground mb-6">
            Item {scannedItem} has been {action === "check-in" ? "checked in" : "checked out"} successfully.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleScanAgain}>
              Scan Another Item
            </Button>
            <Button onClick={() => router.push("/inventory")}>Return to Inventory</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleCancel} className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <CardTitle>Update Inventory</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Item Code</Label>
            <div className="flex gap-2">
              <Input value={scannedItem || ""} readOnly className="flex-1" />
              <Button type="button" variant="outline" onClick={handleScanAgain}>
                Rescan
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="item-name">Item Name</Label>
            <Input id="item-name" value="Hydraulic Pump" readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="action">Action</Label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger id="action">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="check-in">Check In</SelectItem>
                <SelectItem value="check-out">Check Out</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                <SelectItem value="warehouse-c">Warehouse C</SelectItem>
                <SelectItem value="production-line-1">Production Line 1</SelectItem>
                <SelectItem value="production-line-2">Production Line 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                {action === "check-in" ? "Check In Item" : "Check Out Item"}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function InventoryScan() {
  return <InventoryScanPage />
}
