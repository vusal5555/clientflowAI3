"use client";
import { useState, useEffect } from "react";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsFilters } from "./ProjectsFilters";
import { ProjectsGrid } from "./ProjectsGrid";
import { ProjectsList } from "./ProjectsList";
import { ProjectsEmptyState } from "./ProjectsEmptyState";
import { Project } from "./types";

interface ProjectsClientProps {
  initialProjects: Project[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(initialProjects);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    setProjects(initialProjects);
    setFilteredProjects(initialProjects);
  }, [initialProjects]);

  const handleFilteredProjectsChange = (newFilteredProjects: Project[]) => {
    setFilteredProjects(newFilteredProjects);
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <ProjectsHeader />
      <ProjectsFilters
        projects={projects}
        onFilteredProjectsChange={handleFilteredProjectsChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      {viewMode === "grid" ? (
        <ProjectsGrid projects={filteredProjects} />
      ) : (
        <ProjectsList projects={filteredProjects} />
      )}

      <ProjectsEmptyState projects={filteredProjects} />
    </div>
  );
}
