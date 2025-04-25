"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Camera, X, Check, Loader2 } from "lucide-react"

interface BarcodeScannerProps {
  onScan: (data: string, type: string) => void
  scanType: "bol" | "aoc" | "inventory"
  buttonText?: string
}

export function BarcodeScanner({ onScan, scanType, buttonText = "Scan Barcode" }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [manualEntry, setManualEntry] = useState(false)
  const [barcodeValue, setBarcodeValue] = useState("")
  const [processing, setProcessing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Clean up function to stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startScanning = async () => {
    try {
      setIsScanning(true)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()

        // In a real app, we would use a barcode scanning library here
        // For this demo, we'll simulate finding a barcode after a delay
        setTimeout(() => {
          simulateBarcodeScan()
        }, 3000)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please try manual entry.",
        variant: "destructive",
      })
      setManualEntry(true)
      setIsScanning(false)
    }
  }

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }

  const simulateBarcodeScan = () => {
    // In a real app, this would be replaced with actual barcode detection
    // For now, we'll generate a random barcode value
    const randomBarcode = generateRandomBarcode(scanType)

    // Take a "snapshot" from the video feed
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }

    stopScanning()
    setBarcodeValue(randomBarcode)
    processBarcode(randomBarcode)
  }

  const generateRandomBarcode = (type: string): string => {
    switch (type) {
      case "bol":
        return `BOL${Math.floor(1000000000 + Math.random() * 9000000000)}`
      case "aoc":
        return `AOC${Math.floor(10000 + Math.random() * 90000)}-${new Date().getFullYear()}`
      case "inventory":
        return `INV${Math.floor(10000 + Math.random() * 90000)}`
      default:
        return `BC${Math.floor(1000000 + Math.random() * 9000000)}`
    }
  }

  const processBarcode = async (code: string) => {
    setProcessing(true)

    try {
      // Simulate API call to process the barcode
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onScan(code, scanType)

      toast({
        title: "Scan Successful",
        description: `${scanType.toUpperCase()} ${code} has been processed successfully.`,
      })
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "There was an error processing the barcode.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
      setBarcodeValue("")
    }
  }

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (barcodeValue.trim()) {
      processBarcode(barcodeValue)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {scanType === "bol"
            ? "Bill of Lading Scanner"
            : scanType === "aoc"
              ? "Analysis of Conformity Scanner"
              : "Inventory Item Scanner"}
        </CardTitle>
        <CardDescription>
          {isScanning
            ? "Position barcode in the camera view"
            : manualEntry
              ? "Enter barcode manually"
              : `Scan ${scanType.toUpperCase()} barcode or enter manually`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isScanning ? (
          <div className="space-y-4">
            <div className="relative aspect-video rounded-md overflow-hidden border-2 border-dashed border-muted-foreground">
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-1/3 border-2 border-red-500 rounded-md"></div>
              </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <Button variant="outline" onClick={stopScanning} className="w-full">
              <X className="mr-2 h-4 w-4" />
              Cancel Scanning
            </Button>
          </div>
        ) : manualEntry ? (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <Label htmlFor="barcode-input">
                {scanType === "bol" ? "BOL Number" : scanType === "aoc" ? "AOC Number" : "Item Barcode"}
              </Label>
              <Input
                id="barcode-input"
                value={barcodeValue}
                onChange={(e) => setBarcodeValue(e.target.value)}
                placeholder={`Enter ${scanType.toUpperCase()} number`}
                disabled={processing}
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button
                type="submit"
                disabled={processing || !barcodeValue.trim()}
                className="bg-qore-blue hover:bg-blue-800 flex-1"
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Submit
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => setManualEntry(false)} disabled={processing}>
                <Camera className="mr-2 h-4 w-4" />
                Use Camera
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <Camera className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Click the button below to start scanning a{" "}
                {scanType === "bol" ? "Bill of Lading" : scanType === "aoc" ? "Analysis of Conformity" : "barcode"}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={startScanning} className="bg-qore-blue hover:bg-blue-800">
                <Camera className="mr-2 h-4 w-4" />
                {buttonText}
              </Button>
              <Button variant="outline" onClick={() => setManualEntry(true)}>
                Manual Entry
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
