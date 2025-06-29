import db from "@/db";
import { todos } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const deletedTodo = await db
    .delete(todos)
    .where(eq(todos.id, parseInt(id)))
    .returning();

  revalidatePath("/projects");

  return NextResponse.json(deletedTodo);
}

export async function PUT(request: NextRequest) {
  const { id, title, status, assignedTo, dueDate } = await request.json();

  const updatedTodo = await db
    .update(todos)
    .set({ title, status, assignedTo, dueDate })
    .where(eq(todos.id, id))
    .returning();

  revalidatePath("/projects");

  return NextResponse.json(updatedTodo);
}
