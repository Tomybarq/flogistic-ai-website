import { NextRequest, NextResponse } from "next/server";
import { routeLLMRequest } from "@/lib/llm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { systemPrompt, userMessage, provider, tier, temperature } = body;

    if (!userMessage) {
      return NextResponse.json({ error: "Missing required parameter: userMessage" }, { status: 400 });
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
