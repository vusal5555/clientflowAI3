import ProjectDetailPage from "@/components/ProjectDetailPage";
import React from "react";
import { mockProjects } from "@/lib/mock-data";

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const project = mockProjects.find((project) => project.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            Project Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            The project you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return <ProjectDetailPage project={project} />;
};

export default ProjectPage;
