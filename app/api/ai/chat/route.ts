export const runtime = 'edge'

import { NextResponse } from "next/server"
import { AIService } from "@/lib/ai-service"

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json()

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    const aiService = AIService.getInstance()
    const response = await aiService.processMessage(message, userId)

    return NextResponse.json(response)
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 