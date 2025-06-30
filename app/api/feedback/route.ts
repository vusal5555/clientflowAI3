import { NextRequest, NextResponse } from "next/server";
import { feedback } from "@/drizzle/schemas/feedback";
import db from "@/db";

export async function POST(request: NextRequest) {
  const { projectId, authorId, content } = await request.json();

  const feedbackData = await db.insert(feedback).values({
    projectId,
    authorId,
    content,
  });

  return NextResponse.json({
    message: "Feedback submitted successfully",
    feedback: feedbackData,
  });
}
