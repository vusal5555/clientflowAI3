"use client";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Project } from "./types";

interface ProjectsEmptyStateProps {
  projects: Project[];
}

export function ProjectsEmptyState({ projects }: ProjectsEmptyStateProps) {
  if (!projects || projects.length > 0) {
    return null;
  }

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        No projects found
      </h3>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        Get started by creating your first project
      </p>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        <Plus className="w-4 h-4 mr-2" />
        Create Project
      </Button>
    </div>
  );
}
