"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function ModernLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 1200
    canvas.height = 600

    // Background (transparent)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw the background rectangle
    ctx.fillStyle = "#003DA5"
    ctx.fillRect(100, 100, 1000, 400)
    ctx.fillRect(100, 100, 1000, 400)

    // Draw the Q circle
    ctx.beginPath()
    ctx.arc(300, 300, 150, 0, 2 * Math.PI)
    ctx.strokeStyle = "white"
    ctx.lineWidth = 15
    ctx.stroke()

    // Draw the gold diagonal accent
    ctx.beginPath()
    ctx.moveTo(400, 350)
    ctx.lineTo(480, 430)
    ctx.lineTo(400, 430)
    ctx.lineTo(350, 380)
    ctx.closePath()
    ctx.fillStyle = "#FFC72C"
    ctx.fill()

    // Draw the text "QOORE"
    ctx.font = "bold 120px Inter, sans-serif"
    ctx.fillStyle = "white"
    ctx.fillText("QOORE", 500, 330)

    // Draw the text "AI"
    ctx.font = "bold 120px Inter, sans-serif"
    ctx.fillStyle = "#FFC72C"
    ctx.fillText("AI", 860, 330)

    // Draw the tagline
    ctx.font = "500 28px Inter, sans-serif"
    ctx.fillStyle = "white"
    ctx.fillText("DATA | OPERATIONS | CLARITY", 500, 380)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#001A45] to-[#002855] p-6">
      <h1 className="text-white text-3xl font-bold mb-8 font-['Inter']">QooreAI Modern Logo</h1>
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl mb-8">
        <canvas ref={canvasRef} className="max-w-full h-auto border border-white/20 rounded-lg"></canvas>
      </div>
      <div className="flex gap-4">
        <Button className="bg-[#FFC72C] hover:bg-[#E6B428] text-[#002855] font-['Rubik'] font-semibold">
          <Download className="mr-2 h-4 w-4" /> Download PNG
        </Button>
        <Button
          variant="outline"
          className="border-[#FFC72C] text-[#FFC72C] hover:bg-[#FFC72C]/10 font-['Rubik'] font-semibold"
        >
          <Download className="mr-2 h-4 w-4" /> Download SVG
        </Button>
      </div>
      <p className="text-white/80 mt-6 max-w-md text-center font-['Inter']">
        This modern QooreAI logo follows your brand guidelines with the flat dark blue background, clean bold Q mark
        with integrated golden diagonal, and typographic "QOOREAI" text.
      </p>
    </div>
  )
}
