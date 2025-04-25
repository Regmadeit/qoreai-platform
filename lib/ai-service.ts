import OpenAI from 'openai'

// Extract project ID from API key
const apiKey = process.env.OPENAI_API_KEY || ''
const projectId = apiKey.startsWith('sk-proj-') ? apiKey.split('-')[2] : ''

// Initialize OpenAI client with QoreAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL || 'https://api.qoreai.com/v1',
  defaultHeaders: {
    'X-Project-ID': projectId
  }
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
        model: process.env.AI_MODEL || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message }
        ],
        temperature: parseFloat(process.env.TEMPERATURE || '0.7'),
        max_tokens: parseInt(process.env.MAX_TOKENS || '500', 10)
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
    return this.userContext.get(userId) || []
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

  private prepareSystemMessage(context: string[]): string {
    return `You are an AI assistant helping with equipment maintenance and operations. Previous conversation:\n${context.join('\n')}`
  }

  private generateRecommendations(response: string): string[] {
    // Example recommendations based on response
    return [
      'Check equipment status regularly',
      'Document any unusual observations',
      'Follow safety protocols'
    ]
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