import React from "react";
import ProjectCard from "@/components/project-card";
import { type Project } from "@/lib/mock-data";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickOverviewCards from "@/components/dashboard/QuickOverviewCards";
import AIInsightsSection from "@/components/dashboard/AIInsightsSection";
import getUser from "@/actions/getUser";

const DashboardPage = async () => {
  // Use absolute URL for server-side fetch
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  let projects = [];
  try {
    const response = await fetch(`${baseUrl}/api/projects`, {
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    projects = await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

  const user = await getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="p-6 space-y-8">
        {/* Header Section */}
        <DashboardHeader user={user} />

        {/* Quick Overview Cards */}
        <QuickOverviewCards projects={projects} />

        {/* AI Insights Section */}
        <AIInsightsSection />

        {/* Projects Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Recent Projects
            </h3>
            <a
              href="/projects"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View all projects →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
