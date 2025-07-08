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

  // Refresh projects from server
  const refreshProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const updatedProjects = await response.json();
        const projectsArray = Array.isArray(updatedProjects)
          ? updatedProjects
          : [];
        setProjects(projectsArray);
        setFilteredProjects(projectsArray);
      }
    } catch (error) {
      console.error("Error refreshing projects:", error);
    }
  };

  const handleFilteredProjectsChange = (newFilteredProjects: Project[]) => {
    setFilteredProjects(newFilteredProjects);
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <ProjectsHeader onProjectCreated={refreshProjects} />
      <ProjectsFilters
        projects={projects}
        onFilteredProjectsChange={handleFilteredProjectsChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      {!filteredProjects || filteredProjects.length === 0 ? (
        <ProjectsEmptyState projects={filteredProjects || []} />
      ) : (
        <>
          {viewMode === "grid" ? (
            <ProjectsGrid projects={filteredProjects} />
          ) : (
            <ProjectsList projects={filteredProjects} />
          )}
        </>
      )}
    </div>
  );
}
