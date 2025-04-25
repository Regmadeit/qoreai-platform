export const runtime = 'edge'

import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY || ''
    const parts = apiKey.split('-')
    
    // Test basic API access
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Project': parts[2] || ''
      }
    })

    const data = await response.json()

    return NextResponse.json({
      api_key_info: {
        exists: !!apiKey,
        length: apiKey.length,
        prefix: apiKey.substring(0, 7),
        parts: parts.map((p, i) => i === 1 ? '***' : p),
        project_id: parts[2] || ''
      },
      models_response: {
        status: response.status,
        ok: response.ok,
        data: data
      }
    })
  } catch (error) {
    console.error("Debug Error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 