export const runtime = 'edge'

import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(JSON.stringify(data))
    }

    return NextResponse.json({
      success: true,
      message: "API key is valid",
      models_count: data.data?.length || 0,
      first_model: data.data?.[0]?.id || null
    })
  } catch (error) {
    console.error("Auth Test Error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 