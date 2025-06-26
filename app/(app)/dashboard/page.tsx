import React from "react";
import ProjectCard from "@/components/project-card";
import { type Project } from "@/lib/mock-data";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";

const DashboardPage = async () => {
  // Use absolute URL for server-side fetch
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  let projects = [];
  try {
    const response = await fetch(`${baseUrl}/api/projects`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    projects = await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      {/* Header Section */}
      <DashboardHeader />

      {/* Stats Cards */}
      <DashboardStats projects={projects} />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
