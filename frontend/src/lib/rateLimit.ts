/**
 * Rate Limiting Utility
 * Implements token bucket algorithm for API rate limiting
 */

interface RateLimitStore {
  [key: string]: {
    tokens: number
    lastRefill: number
  }
}

const store: RateLimitStore = {}

interface RateLimitConfig {
  interval: number // Time window in milliseconds
  maxRequests: number // Maximum requests per interval
}

/**
 * Rate limiter using token bucket algorithm
 * @param identifier - Unique identifier for the client (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns true if request is allowed, false if rate limited
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { interval: 60000, maxRequests: 60 } // Default: 60 requests per minute
): boolean {
  const now = Date.now()
  const { interval, maxRequests } = config

  // Initialize or get existing bucket
  if (!store[identifier]) {
    store[identifier] = {
      tokens: maxRequests,
      lastRefill: now,
    }
  }

  const bucket = store[identifier]

  // Calculate tokens to add based on time elapsed
  const timePassed = now - bucket.lastRefill
  const tokensToAdd = Math.floor((timePassed / interval) * maxRequests)

  if (tokensToAdd > 0) {
    bucket.tokens = Math.min(maxRequests, bucket.tokens + tokensToAdd)
    bucket.lastRefill = now
  }

  // Check if request can be allowed
  if (bucket.tokens > 0) {
    bucket.tokens--
    return true
  }

  return false
}

/**
 * Get client identifier from request
 * Uses X-Forwarded-For header if behind proxy, otherwise uses connection IP
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from headers (for proxied requests)
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Fallback to a generic identifier
  return 'unknown'
}

/**
 * Cleanup old entries from the store (run periodically)
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now()
  const maxAge = 3600000 // 1 hour

  Object.keys(store).forEach((key) => {
    if (now - store[key].lastRefill > maxAge) {
      delete store[key]
    }
  })
}

// Cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 600000)
}

