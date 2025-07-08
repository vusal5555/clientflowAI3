"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Project,
  statusConfig,
  priorityConfig,
  getProjectInitials,
  getProjectColor,
} from "./types";

interface ProjectListItemProps {
  project: Project;
}

export function ProjectListItem({ project }: ProjectListItemProps) {
  const statusInfo = statusConfig[project.status] || statusConfig.active;
  const priorityInfo =
    priorityConfig[project.priority] || priorityConfig.medium;
  const initials = getProjectInitials(project.title);
  const projectColor = getProjectColor(project.title);

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="w-full bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            {/* Project Avatar */}
            <div
              className={`w-10 h-10 rounded-lg ${projectColor} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
            >
              {initials}
            </div>

            {/* Project Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {project.title}
                </h3>
                <Badge variant={priorityInfo.variant} className="text-xs">
                  {priorityInfo.label}
                </Badge>
              </div>
              {project.clientName && (
                <div className="flex items-center space-x-1 mt-1">
                  <User className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {project.clientName}
                  </span>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
              <Badge variant={statusInfo.variant} className="text-xs">
                {statusInfo.label}
              </Badge>
            </div>

            {/* Progress */}
            <div className="flex items-center space-x-2 min-w-[100px]">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {project.progress}%
              </span>
              <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center space-x-2 min-w-[120px]">
              <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {project.dueDate
                  ? format(new Date(project.dueDate), "MMM d, yyyy")
                  : "No due date"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
