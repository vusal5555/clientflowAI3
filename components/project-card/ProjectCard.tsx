"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Project } from "@/lib/mock-data";

import {
  Calendar,
  Users,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
  className?: string;
  onClick?: (project: Project) => void;
}

// Generate initials from project title
const getProjectInitials = (title: string) => {
  return title
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Generate a consistent color based on project title
const getProjectColor = (title: string) => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-red-500",
  ];
  const index = title.charCodeAt(0) % colors.length;
  return colors[index];
};

const statusConfig = {
  active: {
    label: "Active",
    variant: "default" as const,
    color: "bg-green-500",
    textColor: "text-green-700 dark:text-green-400",
  },
  completed: {
    label: "Completed",
    variant: "secondary" as const,
    color: "bg-blue-500",
    textColor: "text-blue-700 dark:text-blue-400",
  },
  "on-hold": {
    label: "On Hold",
    variant: "secondary" as const,
    color: "bg-yellow-500",
    textColor: "text-yellow-700 dark:text-yellow-400",
  },
  cancelled: {
    label: "Cancelled",
    variant: "destructive" as const,
    color: "bg-red-500",
    textColor: "text-red-700 dark:text-red-400",
  },
};

const priorityConfig = {
  high: { label: "High", variant: "destructive" as const },
  medium: { label: "Medium", variant: "secondary" as const },
  low: { label: "Low", variant: "outline" as const },
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className,
  onClick,
}) => {
  const statusInfo = statusConfig[project.status] || statusConfig.active;
  const priorityInfo =
    priorityConfig[project.priority] || priorityConfig.medium;
  const initials = getProjectInitials(project.title);
  const projectColor = getProjectColor(project.title);

  return (
    <Link href={`/projects/${project.id}`}>
      <Card
        className={cn(
          "w-full bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group",
          className
        )}
        onClick={() => onClick?.(project)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start space-x-4">
            {/* Project Avatar */}
            <div
              className={`w-12 h-12 rounded-lg ${projectColor} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
            >
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </CardTitle>
              {project.clientName && (
                <div className="flex items-center space-x-1 mt-1">
                  <User className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {project.clientName}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
            {project.description}
          </p>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                Progress
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {project.progress}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Project Metadata */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
              <Badge variant={statusInfo.variant} className="text-xs">
                {statusInfo.label}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {format(project.dueDate, "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
