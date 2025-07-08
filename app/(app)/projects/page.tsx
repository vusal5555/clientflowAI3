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

async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/projects`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient initialProjects={projects} />;
}
