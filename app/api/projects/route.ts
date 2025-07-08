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

  console.log("Creating project for user:", session.user.id, {
    title,
    description,
    status,
    priority,
    dueDate,
  });

  try {
    const project = await db.insert(projects).values({
      userId: session.user.id,
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    });
    console.log("Project created:", project);
    revalidatePath("/projects");
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
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Try a more explicit query approach
    const projectsData = await db
      .select({
        id: projects.id,
        userId: projects.userId,
        title: projects.title,
        description: projects.description,
        clientName: projects.clientName,
        status: projects.status,
        priority: projects.priority,
        dueDate: projects.dueDate,
        progress: projects.progress,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
      })
      .from(projects)
      .where(eq(projects.userId, session.user.id));

    return NextResponse.json(projectsData);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  const project = await db.delete(projects).where(eq(projects.id, id));

  revalidatePath("/projects");
  revalidatePath("/");

  return NextResponse.json(project);
}

export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();

  const project = await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, id));

  revalidatePath("/projects");
  revalidatePath("/");

  return NextResponse.json(project);
}
