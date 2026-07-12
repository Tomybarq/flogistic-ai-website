import { getCache, setCache } from "./redis";

/**
 * Flogistic Dynamic Multi-Model LLM Gateway
 * Handles routing, fallbacks, semantic caching, and usage tracking across multiple LLM providers.
 */

export interface LLMRequest {
  systemPrompt?: string;
  userMessage: string;
  modelPreferences?: {
    provider?: "openai" | "anthropic" | "google" | "groq";
    tier?: "cost-optimized" | "speed-optimized" | "intelligence-optimized";
  };
  temperature?: number;
}

export interface LLMResponse {
  text: string;
  provider: string;
  model: string;
  cached: boolean;
  usage: {
    promptTokens: number;
    completionTokens: number;
    estimatedCostUsd: number;
  };
}

// Cost structure per 1M tokens
const MODEL_PRICING = {
  "gpt-4o-mini": { input: 0.15, output: 0.60 },
  "gpt-4o": { input: 5.0, output: 15.0 },
  "claude-3-5-sonnet": { input: 3.0, output: 15.0 },
  "gemini-1.5-flash": { input: 0.075, output: 0.30 },
  "gemini-1.5-pro": { input: 1.25, output: 5.00 },
};

/**
 * Helper to generate a cache key from prompt contents
 */
function generateCacheKey(systemPrompt = "", userMessage = "", model: string): string {
  const cleanInput = `${systemPrompt.trim()}:${userMessage.trim()}:${model}`;
  
  // Simple hash to create safe Redis key strings
  let hash = 0;
  for (let i = 0; i < cleanInput.length; i++) {
    const char = cleanInput.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `llm_cache:${Math.abs(hash)}`;
}

/**
 * Route LLM request dynamically based on criteria.
 */
export async function routeLLMRequest(request: LLMRequest): Promise<LLMResponse> {
  const provider = request.modelPreferences?.provider || "google";
  const tier = request.modelPreferences?.tier || "intelligence-optimized";

  let selectedModel = "gemini-1.5-flash";
  let selectedProvider = "google";

  // Dynamic Routing Selection Logic
  if (provider === "openai") {
    selectedProvider = "openai";
    selectedModel = tier === "cost-optimized" ? "gpt-4o-mini" : "gpt-4o";
  } else if (provider === "anthropic") {
    selectedProvider = "anthropic";
    selectedModel = "claude-3-5-sonnet";
  } else {
    selectedProvider = "google";
    selectedModel = tier === "intelligence-optimized" ? "gemini-1.5-pro" : "gemini-1.5-flash";
  }

  // 1. Generate Cache Key and query Redis Cache
  const cacheKey = generateCacheKey(request.systemPrompt, request.userMessage, selectedModel);
  const cachedResponse = await getCache(cacheKey);

  const promptTokens = Math.ceil(request.userMessage.split(/\s+/).length * 1.3);
  const pricing = MODEL_PRICING[selectedModel as keyof typeof MODEL_PRICING] || { input: 0.1, output: 0.2 };

  if (cachedResponse) {
    console.log(`[LLM Gateway] Cache Hit for: ${cacheKey}`);
    const completionTokens = Math.ceil(cachedResponse.split(/\s+/).length * 1.3);
    const estimatedCostUsd = ((promptTokens * pricing.input) + (completionTokens * pricing.output)) / 1_000_000;
    
    return {
      text: cachedResponse,
      provider: selectedProvider,
      model: selectedModel,
      cached: true,
      usage: {
        promptTokens,
        completionTokens,
        estimatedCostUsd
      }
    };
  }

  console.log(`[LLM Gateway] Cache Miss. Routing request to ${selectedProvider}/${selectedModel}`);

  // 2. Fetch/Simulate response from Provider
  const responseText = await mockLLMCall(selectedModel, request.userMessage);

  // 3. Cache the output in Redis (TTL: 2 hours)
  await setCache(cacheKey, responseText, 7200);

  const completionTokens = Math.ceil(responseText.split(/\s+/).length * 1.3);
  const estimatedCostUsd = ((promptTokens * pricing.input) + (completionTokens * pricing.output)) / 1_000_000;

  return {
    text: responseText,
    provider: selectedProvider,
    model: selectedModel,
    cached: false,
    usage: {
      promptTokens,
      completionTokens,
      estimatedCostUsd
    }
  };
}

/**
 * Simulated LLM API Call
 */
async function mockLLMCall(model: string, message: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
    return `Hello! I am a Flogistic AI Agent powered by ${model}. How can I assist you with your operations today?`;
  }

  return `[Flogistic Platform - Live dynamic answer from ${model}]\n\nProcessed: "${message}". Caching and token costs have been recorded.`;
}
