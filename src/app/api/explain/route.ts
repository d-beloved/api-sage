import { NextRequest, NextResponse } from "next/server";
import { generateExplanation } from "@/services/ai";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const explanation = await generateExplanation(data);

    if (explanation.includes("Failed to generate")) {
      return NextResponse.json({ error: explanation }, { status: 500 });
    }
    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("AI Explanation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
}
