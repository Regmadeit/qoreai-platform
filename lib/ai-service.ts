import OpenAI from 'openai'

function validateApiKey(apiKey: string | undefined): string {
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured')
  }
  if (!apiKey.startsWith('sk-') && !apiKey.startsWith('sk-proj-')) {
    throw new Error('API key must start with sk- or sk-proj-')
  }
  return apiKey
}

// Initialize OpenAI client with simplified configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
})

export interface AIResponse {
  content: string
  recommendations?: string[]
  metrics?: {
    [key: string]: number | string
  }
}

export class AIService {
  private static instance: AIService
  private userContext: Map<string, string[]>

  private constructor() {
    this.userContext = new Map()
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  public async processMessage(message: string, userId: string): Promise<AIResponse> {
    try {
      const context = this.getUserContext(userId)
      const systemMessage = this.prepareSystemMessage(context)

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })

      const response = completion.choices[0].message.content || ''
      this.updateContext(userId, message, response)

      return {
        content: response,
        recommendations: this.generateRecommendations(response),
        metrics: this.generateMetrics(response)
      }
    } catch (error) {
      console.error('AI Service Error:', error)
      throw new Error(error instanceof Error ? error.message : 'Unknown error in AI service')
    }
  }

  private getUserContext(userId: string): string[] {
    if (!this.userContext.has(userId)) {
      this.userContext.set(userId, [])
    }
    return this.userContext.get(userId) || []
  }

  private prepareSystemMessage(context: string[]): string {
    return `You are QoreAI, an AI assistant for the QoreAI manufacturing operations platform. You help users with equipment monitoring, maintenance, logistics, and operational tasks. Previous conversation context:\n${context.join('\n')}`
  }

  private updateContext(userId: string, message: string, response: string) {
    const context = this.getUserContext(userId)
    context.push(`User: ${message}`)
    context.push(`Assistant: ${response}`)
    
    // Keep only last 10 messages
    if (context.length > 20) {
      context.splice(0, 2)
    }
    
    this.userContext.set(userId, context)
  }

  private generateRecommendations(response: string): string[] {
    // Extract action items or recommendations from the response
    const recommendations: string[] = []
    const lines = response.split('\n')
    
    for (const line of lines) {
      if (line.includes('recommend') || line.includes('suggest') || line.includes('should')) {
        recommendations.push(line.trim())
      }
    }
    
    return recommendations
  }

  private generateMetrics(response: string): { [key: string]: number | string } {
    // Example metrics based on response
    return {
      responseTime: '2.5s',
      confidence: 0.95,
      relevance: 0.85
    }
  }
} 