import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

// Define standard sliding window rate limiter
const limiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, "60 s"), // 60 requests per minute
      analytics: true,
      prefix: "flogistic_ratelimit",
    })
  : null;

/**
 * Check Rate Limit for target identifier
 * Returns success boolean, current limit, and remaining tokens.
 */
export async function checkRateLimit(
  identifier: string,
  customRequests = 60,
  customWindow: "60 s" | "10 s" | "1 d" = "60 s"
) {
  if (!limiter) {
    // If Redis is not yet configured, bypass rate limiting for local dev
    return {
      success: true,
      limit: customRequests,
      remaining: customRequests,
      reset: Date.now() + 60000,
    };
  }

  try {
    const result = await limiter.limit(identifier);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.error("[Rate Limiter Error]", error);
    // Graceful fallback to pass-through in case of Redis infrastructure issues
    return {
      success: true,
      limit: customRequests,
      remaining: customRequests,
      reset: Date.now() + 60000,
    };
  }
}
