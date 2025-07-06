import db from "@/db";
import { projects, feedback } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { eq, desc, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Get all projects with client names
    const projectsData = await db
      .select({
        id: projects.id,
        title: projects.title,
        clientName: projects.clientName,
        status: projects.status,
        progress: projects.progress,
        dueDate: projects.dueDate,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
      })
      .from(projects)
      .where(sql`${projects.clientName} IS NOT NULL`);

    // Get feedback data for each project
    const feedbackData = await db
      .select({
        projectId: feedback.projectId,
        count: sql<number>`count(*)`,
        lastActivity: sql<string>`max(${feedback.createdAt})`,
      })
      .from(feedback)
      .groupBy(feedback.projectId);

    // Group projects by client
    const clientsMap = new Map();

    projectsData.forEach((project) => {
      if (!project.clientName) return;

      const clientKey = project.clientName.toLowerCase().trim();

      if (!clientsMap.has(clientKey)) {
        clientsMap.set(clientKey, {
          id: clientKey,
          name: project.clientName,
          email: `${project.clientName
            .toLowerCase()
            .replace(/\s+/g, ".")}@example.com`, // Mock email
          projects: [],
          feedbackCount: 0,
          lastActivity: project.updatedAt || project.createdAt,
          totalProjects: 0,
          activeProjects: 0,
        });
      }

      const client = clientsMap.get(clientKey);
      client.projects.push({
        id: project.id.toString(),
        title: project.title,
        status: project.status,
        progress: project.progress || 0,
        dueDate: project.dueDate?.toISOString(),
      });
      client.totalProjects++;
      if (project.status === "active") {
        client.activeProjects++;
      }
    });

    // Add feedback data
    feedbackData.forEach((feedbackItem) => {
      const project = projectsData.find((p) => p.id === feedbackItem.projectId);
      if (project?.clientName) {
        const clientKey = project.clientName.toLowerCase().trim();
        const client = clientsMap.get(clientKey);
        if (client) {
          client.feedbackCount += Number(feedbackItem.count);
          const feedbackDate = new Date(feedbackItem.lastActivity);
          const clientDate = new Date(client.lastActivity);
          if (feedbackDate > clientDate) {
            client.lastActivity = feedbackItem.lastActivity;
          }
        }
      }
    });

    const clients = Array.from(clientsMap.values());

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, email } = await request.json();

  try {
    // In a real app, you might have a separate clients table
    // For now, we'll create a project with the client name
    const project = await db.insert(projects).values({
      userId: session.user.id,
      title: `Project for ${name}`,
      description: `Initial project setup for ${name}`,
      clientName: name,
      status: "active",
    });

    return NextResponse.json({
      message: "Client added successfully",
      project,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Database error", error: String(error) },
      { status: 500 }
    );
  }
}
