import { ProjectsClient } from "@/components/projects";

interface Project {
  id: number;
  title: string;
  description: string | null;
  clientName: string | null;
  status: "active" | "completed" | "archived" | "awaiting-feedback";
  progress: number;
  dueDate: string | null;
  priority: "high" | "medium" | "low";
}

import { cookies } from "next/headers";

export default async function ProjectsPage() {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/projects`,
      {
        cache: "force-cache",
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch projects:", response.status);
      return <ProjectsClient initialProjects={[]} />;
    }

    const projects = await response.json();

    // Ensure projects is always an array
    const projectsArray = Array.isArray(projects) ? projects : [];

    return <ProjectsClient initialProjects={projectsArray} />;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return <ProjectsClient initialProjects={[]} />;
  }
}
