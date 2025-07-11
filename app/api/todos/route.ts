import db from "@/db";
import { todos } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { title, projectId, status, assignedTo, dueDate } =
    await request.json();

  const todo = {
    title,
    projectId,
    status,
    createdBy: session?.user.id ? Number(session.user.id) : 0,
    assignedTo,
    dueDate: dueDate ? new Date(dueDate) : null,
  };

  const newTodo = await db.insert(todos).values(todo).returning();

  revalidateTag("todos");

  return NextResponse.json(newTodo);
}

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const todosResult = await db
      .select()
      .from(todos)
      .orderBy(desc(todos.createdAt));

    revalidateTag("todos");

    return NextResponse.json(todosResult);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
