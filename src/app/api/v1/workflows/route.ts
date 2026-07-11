import { NextResponse } from "next/server";
import { MOCK_WORKFLOWS } from "@/lib/db";

export async function GET() {
  try {
    return NextResponse.json({ workflows: MOCK_WORKFLOWS });
  } catch (error: any) {
    console.error("[API - Workflows GET Route Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
