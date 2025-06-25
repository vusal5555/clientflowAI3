import React from "react";
import ProjectOverview from "@/components/ProjectOverview";

const ProjectsPage = () => {
  // Sample project data
  const sampleProject = {
    id: "1",
    title: "E-commerce Platform Redesign",
    description:
      "Complete redesign of the company's e-commerce platform to improve user experience and increase conversion rates. Includes new checkout flow, product catalog improvements, and mobile optimization.",
    progress: 65,
    status: "active" as const,
    priority: "high" as const,
    dueDate: "December 15, 2024",
    teamSize: 8,
  };

  const sampleProject2 = {
    id: "2",
    title: "Mobile App Development",
    description:
      "Development of a cross-platform mobile application for iOS and Android using React Native. Features include user authentication, real-time messaging, and push notifications.",
    progress: 85,
    status: "active" as const,
    priority: "medium" as const,
    dueDate: "November 30, 2024",
    teamSize: 5,
  };

  const sampleProject3 = {
    id: "3",
    title: "Data Analytics Dashboard",
    description:
      "Creation of an interactive dashboard for business intelligence and data visualization. Integrates with multiple data sources and provides real-time insights.",
    progress: 100,
    status: "completed" as const,
    priority: "low" as const,
    dueDate: "October 20, 2024",
    teamSize: 3,
  };

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
        <ProjectOverview {...sampleProject} />
        <ProjectOverview {...sampleProject2} />
        <ProjectOverview {...sampleProject3} />
      </div>
    </div>
  );
};

export default ProjectsPage;
