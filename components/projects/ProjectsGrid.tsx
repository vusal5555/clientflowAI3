"use client";
import { useState, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { Project } from "./types";
import { ProjectsEmptyState } from "./ProjectsEmptyState";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
