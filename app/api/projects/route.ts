import db from "@/db";
import { projects } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, description, status, priority, dueDate } =
    await request.json();

  try {
    const project = await db.insert(projects).values({
      userId: session.user.id,
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    });
    revalidatePath("/");
    return NextResponse.json(project);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Database error", error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  const projectsData = await db.select().from(projects);

  if (!projectsData) {
    return NextResponse.json({ message: "No projects found" }, { status: 404 });
  }

  return NextResponse.json(projectsData);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  const project = await db.delete(projects).where(eq(projects.id, id));

  return NextResponse.json(project);
}

export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();

  const project = await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, id));

  return NextResponse.json(project);
}
