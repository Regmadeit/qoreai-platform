export const runtime = 'edge'

import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"
})

export async function GET() {
  try {
    // Check environment
    const envCheck = {
      hasApiKey: !!process.env.OPENAI_API_KEY,
      baseUrl: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
      model: "gpt-3.5-turbo"
    }

    console.log("Environment check:", envCheck)

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: "Say hello!"
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    })

    return NextResponse.json({
      success: true,
      message: response.choices[0].message.content,
      environment: envCheck
    })

  } catch (error: any) {
    console.error("AI Test Error:", error)
    
    // Handle specific error types
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: "API quota exceeded. Please check your OpenAI account." },
        { status: 429 }
      )
    }

    if (error.code === 'invalid_project') {
      return NextResponse.json(
        { error: "Invalid project ID. Please check your API key configuration." },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { 
        error: error.message,
        type: error.type,
        code: error.code 
      },
      { status: error.status || 500 }
    )
  }
} 