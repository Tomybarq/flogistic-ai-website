import { NextRequest, NextResponse } from "next/server";
import { routeLLMRequest } from "@/lib/llm";
import { checkRateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { systemPrompt, userMessage, provider, tier, temperature } = body;

    if (!userMessage) {
      return NextResponse.json({ error: "Missing required parameter: userMessage" }, { status: 400 });
    }

    // Rate Limiting Check (by IP address or header fallback)
    const ip = req.headers.get("x-forwarded-for") || "global-client-rate-limit";
    const limitCheck = await checkRateLimit(ip, 60, "60 s");
    if (!limitCheck.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before asking again." },
        { 
          status: 429,
          headers: {
            "Retry-After": Math.ceil((limitCheck.reset - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // Call dynamic multi-model router
    const result = await routeLLMRequest({
      systemPrompt,
      userMessage,
      modelPreferences: {
        provider,
        tier
      },
      temperature: temperature !== undefined ? Number(temperature) : 0.2
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[API - Chat Route Error]", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
