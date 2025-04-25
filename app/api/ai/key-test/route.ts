export const runtime = 'edge'

import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY
  
  return NextResponse.json({
    hasKey: !!apiKey,
    keyLength: apiKey?.length || 0,
    keyStart: apiKey ? apiKey.substring(0, 7) : null,
    keyEnd: apiKey ? apiKey.substring(apiKey.length - 4) : null
  })
} 