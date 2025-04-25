export const runtime = 'edge'

import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.OPENAI_API_KEY,
    baseUrl: process.env.OPENAI_BASE_URL,
    model: process.env.AI_MODEL,
    maxTokens: process.env.MAX_TOKENS,
    temperature: process.env.TEMPERATURE,
    appUrl: process.env.NEXT_PUBLIC_APP_URL
  })
} 