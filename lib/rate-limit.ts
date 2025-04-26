import { LRUCache } from 'lru-cache'

export interface RateLimitOptions {
  interval: number
  uniqueTokenPerInterval: number
}

export interface RateLimiter {
  check: (request: Request, limit: number, token: string) => Promise<void>
}

export function rateLimit(options: RateLimitOptions): RateLimiter {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000
  })

  return {
    check: async (request: Request, limit: number, token: string) => {
      const ip = request.headers.get('x-forwarded-for') || 'anonymous'
      const tokenKey = `${ip}-${token}`
      
      const tokenCount = (tokenCache.get(tokenKey) as number[]) || [0]
      if (tokenCount[0] === 0) {
        tokenCache.set(tokenKey, [1])
      } else {
        tokenCount[0] += 1
        tokenCache.set(tokenKey, tokenCount)
      }

      const currentUsage = tokenCount[0]
      if (currentUsage > limit) {
        throw new Error('Rate limit exceeded')
      }
    }
  }
} 