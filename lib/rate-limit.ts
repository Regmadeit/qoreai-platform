import { LRUCache } from 'lru-cache'

const ratelimitCache = new LRUCache({
  max: 500,
  ttl: 60 * 1000 // 1 minute
})

class SimpleRateLimit {
  async limit(key: string) {
    const current = (ratelimitCache.get(key) as number) || 0
    if (current >= 10) {
      return { success: false }
    }
    ratelimitCache.set(key, current + 1)
    return { success: true }
  }
}

export const ratelimit = new SimpleRateLimit() 