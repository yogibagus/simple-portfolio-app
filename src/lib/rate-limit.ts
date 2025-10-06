import { NextRequest } from 'next/server'

interface RateLimitOptions {
  windowMs: number
  maxRequests: number
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// In-memory store for rate limiting (use Redis in production)
const store: RateLimitStore = {}

export function rateLimit(options: RateLimitOptions) {
  const { windowMs, maxRequests } = options

  return (request: NextRequest) => {
    const ip = (request as any).ip || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const now = Date.now()
    const windowStart = now - windowMs

    // Clean up expired entries
    Object.keys(store).forEach(key => {
      if (store[key].resetTime < now) {
        delete store[key]
      }
    })

    // Get or create entry for this IP
    if (!store[ip] || store[ip].resetTime < now) {
      store[ip] = {
        count: 0,
        resetTime: now + windowMs
      }
    }

    // Increment count
    store[ip].count++

    // Check if limit exceeded
    if (store[ip].count > maxRequests) {
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        resetTime: store[ip].resetTime
      }
    }

    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - store[ip].count,
      resetTime: store[ip].resetTime
    }
  }
}

// Predefined rate limiters
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5 // 5 attempts per 15 minutes
})

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // 100 requests per 15 minutes
})

export const strictRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10 // 10 requests per minute
})
