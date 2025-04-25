export const runtime = 'edge'

import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Extract project ID from API key
    const apiKey = process.env.OPENAI_API_KEY || ''
    const projectId = apiKey.split('-')[2] // Get the project ID part
    
    console.log('Making request with:', {
      projectId,
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey.length,
      apiKeyStart: apiKey.substring(0, 10)
    })

    const response = await fetch('https://api.qoreai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Project-ID': projectId
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Say hi' }],
        max_tokens: 50
      })
    })

    const data = await response.json()
    console.log('QoreAI Response:', data)

    if (!response.ok) {
      throw new Error(JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        data
      }))
    }

    return NextResponse.json({
      success: true,
      response: data.choices?.[0]?.message?.content,
      full_response: data,
      project_id: projectId
    })
  } catch (error: any) {
    console.error("Test Error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 