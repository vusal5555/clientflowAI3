import db from "@/db";
import { projects, feedback } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    // Get all projects for this client
    const projectsData = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        clientName: projects.clientName,
        status: projects.status,
        progress: projects.progress,
        dueDate: projects.dueDate,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
      })
      .from(projects)
      .where(sql`${projects.clientName} ILIKE ${id}`);

    if (projectsData.length === 0) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    // Get feedback data for this client's projects
    const projectIds = projectsData.map((p) => p.id);
    const feedbackData = await db
      .select({
        projectId: feedback.projectId,
        count: sql<number>`count(*)`,
        lastActivity: sql<string>`max(${feedback.createdAt})`,
      })
      .from(feedback)
      .where(sql`${feedback.projectId} = ANY(${projectIds})`)
      .groupBy(feedback.projectId);

    // Create client object
    const clientName = projectsData[0].clientName || id;
    const client = {
      id: id,
      name: clientName,
      email: `${clientName.toLowerCase().replace(/\s+/g, ".")}@example.com`, // Mock email
      phone: `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(
        Math.random() * 9000 + 1000
      )}`, // Mock phone
      projects: projectsData.map((project) => ({
        id: project.id.toString(),
        title: project.title,
        description: project.description,
        status: project.status,
        progress: project.progress || 0,
        dueDate: project.dueDate?.toISOString(),
      })),
      feedbackCount: feedbackData.reduce(
        (sum, item) => sum + Number(item.count),
        0
      ),
      lastActivity: projectsData.reduce((latest, project) => {
        const projectDate = project.updatedAt || project.createdAt;
        return projectDate && latest && projectDate > latest
          ? projectDate
          : latest;
      }, projectsData[0].createdAt || new Date()),
      totalProjects: projectsData.length,
      activeProjects: projectsData.filter((p) => p.status === "active").length,
      status: getClientStatus(projectsData, feedbackData),
    };

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

function getClientStatus(
  projects: any[],
  feedback: any[]
): "online" | "offline" | "feedback-pending" | "inactive" {
  const now = new Date();
  const lastActivity = projects.reduce((latest, project) => {
    const projectDate = project.updatedAt || project.createdAt;
    return projectDate > latest ? projectDate : latest;
  }, projects[0].createdAt);

  const daysSinceActivity =
    (now.getTime() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceActivity < 1) return "online";
  if (daysSinceActivity < 7) return "offline";
  if (projects.some((p) => p.status === "awaiting-feedback"))
    return "feedback-pending";
  return "inactive";
}
