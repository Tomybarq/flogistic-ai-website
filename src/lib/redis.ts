import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Graceful fallback helper if credentials are not configured in local development
const isConfigured = !!(redisUrl && redisToken);

/**
 * Global Redis Client
 * Provides access to key-value stores, session caching, and semantic lookups.
 */
export const redis = isConfigured
  ? new Redis({
      url: redisUrl,
      token: redisToken,
    })
  : null;

/**
 * Retrieve cached response or fallback to null
 */
export async function getCache(key: string): Promise<string | null> {
  if (!redis) return null;
  try {
    return await redis.get(key);
  } catch (error) {
    console.error("[Redis Cache Get Error]", error);
    return null;
  }
}

/**
 * Set value in cache with dynamic expiration (seconds)
 */
export async function setCache(key: string, value: string, ttlSeconds = 3600): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(key, value, { ex: ttlSeconds });
  } catch (error) {
    console.error("[Redis Cache Set Error]", error);
  }
}
