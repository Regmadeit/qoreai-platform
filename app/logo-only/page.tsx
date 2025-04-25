"use client"

import { useEffect, useRef } from "react"

export default function LogoOnly() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 800
    canvas.height = 400

    // Background (transparent)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw the background rectangle
    ctx.fillStyle = "#003DA5"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw the Q circle
    ctx.beginPath()
    ctx.arc(200, 200, 120, 0, 2 * Math.PI)
    ctx.strokeStyle = "white"
    ctx.lineWidth = 12
    ctx.stroke()

    // Draw the gold diagonal accent
    ctx.beginPath()
    ctx.moveTo(280, 240)
    ctx.lineTo(340, 300)
    ctx.lineTo(280, 300)
    ctx.lineTo(240, 260)
    ctx.closePath()
    ctx.fillStyle = "#FFC72C"
    ctx.fill()

    // Draw the text "QORE"
    ctx.font = "bold 100px Inter, sans-serif"
    ctx.fillStyle = "white"
    ctx.fillText("QORE", 360, 230)

    // Draw the text "Ai"
    ctx.font = "bold 100px Inter, sans-serif"
    ctx.fillStyle = "#FFC72C"
    ctx.fillText("Ai", 680, 230)

    // Draw the tagline
    ctx.font = "500 24px Inter, sans-serif"
    ctx.fillStyle = "white"
    ctx.fillText("DATA | OPERATIONS | CLARITY", 360, 280)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#001A45] to-[#002855] p-6">
      <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-2xl"></canvas>
    </div>
  )
}
