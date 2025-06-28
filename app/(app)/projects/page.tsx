import React from "react";
import ProjectOverview from "@/components/ProjectOverview";
import { Project } from "@/lib/mock-data";

const ProjectsPage = async () => {
  // Sample project data
  const projects = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    }/api/projects`,
    {
      cache: "force-cache",
    }
  ).then((res) => res.json());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Projects Overview
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Detailed view of all active and completed projects
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <ProjectOverview key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
