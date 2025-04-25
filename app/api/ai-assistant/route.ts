import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

// This is a simple example of how to use the Groq API with the AI SDK
export const dynamic = 'force-static'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const result = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: `You are QoreAi, an AI assistant for the QoreAI platform. You help users with questions about equipment, procedures, troubleshooting, and other operational topics.
      
      User question: ${prompt}
      
      Provide a helpful, concise response:`,
      maxTokens: 500,
    })

    return Response.json({ response: result.text })
  } catch (error) {
    console.error("Error calling Groq:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
