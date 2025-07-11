import ProjectDetailPage from "@/components/ProjectDetailPage";
import React from "react";

import { cookies } from "next/headers";

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const cookieStore = await cookies();

  let project;
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/projects/${id}`,
      {
        cache: "force-cache",
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    project = await response.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    project = null;
  }

  const todos = await fetch("http://localhost:3000/api/todos", {
    cache: "force-cache",
    next: { tags: ["todos"] },
    headers: {
      Cookie: cookieStore.toString(),
    },
  }).then((res) => res.json());

  const files = await fetch("http://localhost:3000/api/files", {
    cache: "force-cache",
    next: { tags: ["files"] },
    headers: {
      Cookie: cookieStore.toString(),
    },
  }).then((res) => res.json());

  if (!project || !project.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            Project Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return <ProjectDetailPage project={project} todos={todos} files={files} />;
};

export default ProjectPage;
