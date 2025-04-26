"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function InventoryScanPage() {
  const [scannedItem, setScannedItem] = useState("")
  const [recentScans, setRecentScans] = useState<string[]>([])

  const handleScan = () => {
    if (scannedItem) {
      setRecentScans([scannedItem, ...recentScans])
      setScannedItem("")
    }
  }

  return (
    <div className="container space-y-4 p-4">
      <h1 className="text-2xl font-bold">Inventory Scanner</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Scan Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={scannedItem}
              onChange={(e) => setScannedItem(e.target.value)}
              placeholder="Scan barcode or enter item ID"
              className="flex-1"
            />
            <Button onClick={handleScan}>Scan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          {recentScans.length > 0 ? (
            <ul className="space-y-2">
              {recentScans.map((item, index) => (
                <li key={index} className="p-2 bg-muted rounded-lg">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No recent scans</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
