"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, X, Check, Loader2, Zap, ChevronLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MobileBarcodeProps {
  onScan: (data: string) => void
  onCancel: () => void
  title?: string
  description?: string
}

export function MobileBarcodeScanner({
  onScan,
  onCancel,
  title = "Scan Barcode",
  description = "Position the barcode within the frame",
}: MobileBarcodeProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [manualEntry, setManualEntry] = useState(false)
  const [barcodeValue, setBarcodeValue] = useState("")
  const [processing, setProcessing] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [torchActive, setTorchActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const { toast } = useToast()

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
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream
      setHasPermission(true)

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
      setHasPermission(false)
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
    setTorchActive(false)
  }

  const toggleTorch = async () => {
    if (!streamRef.current) return

    try {
      const track = streamRef.current.getVideoTracks()[0]
      const capabilities = track.getCapabilities() as MediaTrackCapabilities & { torch?: boolean }

      // Check if torch is supported
      if (!capabilities.torch) {
        toast({
          title: "Torch Not Available",
          description: "Your device doesn't support the torch feature.",
          variant: "destructive",
        })
        return
      }

      // Toggle torch
      const torchEnabled = !torchActive
      await track.applyConstraints({
        advanced: [{ torch: torchEnabled } as unknown as MediaTrackConstraintSet]
      })
      setTorchActive(torchEnabled)
    } catch (error) {
      console.error("Error toggling torch:", error)
      toast({
        title: "Torch Error",
        description: "Failed to toggle the torch.",
        variant: "destructive",
      })
    }
  }

  const simulateBarcodeScan = () => {
    // In a real app, this would be replaced with actual barcode detection
    // For now, we'll generate a random barcode value
    const randomBarcode = `ITEM${Math.floor(1000000 + Math.random() * 9000000)}`

    stopScanning()
    setBarcodeValue(randomBarcode)
    processBarcode(randomBarcode)
  }

  const processBarcode = async (code: string) => {
    setProcessing(true)

    try {
      // Simulate API call to process the barcode
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onScan(code)
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "There was an error processing the barcode.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (barcodeValue.trim()) {
      processBarcode(barcodeValue)
    }
  }

  if (isScanning) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 bg-black/80">
          <Button variant="ghost" size="icon" onClick={stopScanning} className="text-white">
            <X className="h-5 w-5" />
          </Button>
          <h3 className="font-medium text-white">{title}</h3>
          <Button variant="ghost" size="icon" onClick={toggleTorch} className="text-white">
            <Zap className={`h-5 w-5 ${torchActive ? "text-yellow-400" : "text-white"}`} />
          </Button>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline autoPlay muted />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-white rounded-lg relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white"></div>
            </div>
          </div>
          <div className="absolute bottom-8 left-0 right-0 text-center text-white text-sm">{description}</div>
        </div>
      </div>
    )
  }

  if (manualEntry) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onCancel} className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="barcode-input">Enter barcode manually</Label>
              <Input
                id="barcode-input"
                value={barcodeValue}
                onChange={(e) => setBarcodeValue(e.target.value)}
                placeholder="Enter barcode number"
                disabled={processing}
                autoFocus
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
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onCancel} className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="rounded-full bg-muted p-4">
            <Camera className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Scan a barcode using your device's camera or enter the code manually
            </p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={startScanning} className="bg-qore-blue hover:bg-blue-800">
              <Camera className="mr-2 h-4 w-4" />
              Scan Barcode
            </Button>
            <Button variant="outline" onClick={() => setManualEntry(true)}>
              Manual Entry
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
