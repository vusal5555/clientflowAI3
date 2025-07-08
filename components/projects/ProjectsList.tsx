"use client";
import { useState, useEffect } from "react";
import { ProjectListItem } from "./ProjectListItem";
import { Project } from "./types";

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {filteredProjects.map((project) => (
        <ProjectListItem key={project.id} project={project} />
      ))}
    </div>
  );
}
