"use client";
import { Plus } from "lucide-react";
import CreateProjectDialog from "../CreateProjectDialog";

interface ProjectsHeaderProps {
  onProjectCreated?: () => void;
}

export function ProjectsHeader({ onProjectCreated }: ProjectsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Manage and track all your client projects
          </p>
        </div>

        {/* New Project Button */}
        <CreateProjectDialog onProjectCreated={onProjectCreated} />
      </div>
    </div>
  );
}
