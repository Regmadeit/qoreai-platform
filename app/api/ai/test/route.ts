export const runtime = 'edge'

import { NextResponse } from "next/server"
import OpenAI from "openai"

// Extract project ID from API key
const apiKey = process.env.OPENAI_API_KEY || ''
const projectId = apiKey.split('-')[2] || ''

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: process.env.OPENAI_API_BASE_URL || "https://api.openai.com/v1",
  defaultHeaders: {
    'OpenAI-Project': projectId
  }
})

export async function GET() {
  try {
    // Check environment
    const envCheck = {
      hasApiKey: !!apiKey,
      projectId: projectId,
      baseUrl: process.env.OPENAI_API_BASE_URL || "https://api.openai.com/v1",
      model: process.env.AI_MODEL || "gpt-3.5-turbo",
      maxTokens: process.env.MAX_TOKENS || "500",
      temperature: process.env.TEMPERATURE || "0.7"
    }

    console.log("Environment check:", envCheck)

    if (!apiKey) {
      throw new Error("OpenAI API key is not configured")
    }

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-3.5-turbo",
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
      max_tokens: parseInt(process.env.MAX_TOKENS || "500"),
      temperature: parseFloat(process.env.TEMPERATURE || "0.7")
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