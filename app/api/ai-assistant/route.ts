import { NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL || "https://api.openai.com/v1",
  defaultHeaders: {
    'OpenAI-Project': process.env.OPENAI_API_KEY?.split('-')[2] || ''
  }
})

// This is a simple example of how to use the Groq API with the AI SDK
export const dynamic = 'force-static'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are QoreAi, an AI assistant for the QoreAI platform. You help users with questions about equipment, procedures, troubleshooting, and other operational topics."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: parseInt(process.env.MAX_TOKENS || "500"),
      temperature: parseFloat(process.env.TEMPERATURE || "0.7")
    })

    return NextResponse.json({ 
      response: completion.choices[0].message.content,
      usage: completion.usage
    })
  } catch (error: any) {
    console.error("Error calling OpenAI:", error)
    return NextResponse.json({ 
      error: "Failed to generate response",
      details: error.message
    }, { status: error.status || 500 })
  }
}
