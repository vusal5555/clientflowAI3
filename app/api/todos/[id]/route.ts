import db from "@/db";
import { todos } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // ✅ Don't await

  const deletedTodo = await db
    .delete(todos)
    .where(eq(todos.id, parseInt(id)))
    .returning();

  revalidateTag("todos");

  return NextResponse.json(deletedTodo);
}

export async function PUT(request: NextRequest) {
  const { id, title, status, assignedTo, dueDate } = await request.json();

  const updatedTodo = await db
    .update(todos)
    .set({ title, status, assignedTo, dueDate })
    .where(eq(todos.id, id))
    .returning();

  revalidateTag("todos");

  return NextResponse.json(updatedTodo);
}
