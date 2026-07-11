import { NextResponse } from "next/server";
import { MOCK_COURSES } from "@/lib/db";

export async function GET() {
  try {
    return NextResponse.json({ courses: MOCK_COURSES });
  } catch (error: any) {
    console.error("[API - Courses GET Route Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
