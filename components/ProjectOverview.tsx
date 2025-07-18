import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Target } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export interface ProjectOverviewProps {
  id: string;
  title: string;
  description: string;
  clientName?: string;
  progress: number;
  status:
    | "active"
    | "completed"
    | "archived"
    | "on-hold"
    | "cancelled"
    | "awaiting-feedback";
  priority: "high" | "medium" | "low";
  dueDate: string;
  teamSize: number;
  className?: string;
}

const statusConfig = {
  active: {
    label: "Active",
    variant: "default" as const,
    color: "bg-green-500",
  },
  completed: {
    label: "Completed",
    variant: "secondary" as const,
    color: "bg-blue-500",
  },
  archived: {
    label: "Archived",
    variant: "destructive" as const,
    color: "bg-red-500",
  },
  "on-hold": {
    label: "On Hold",
    variant: "secondary" as const,
    color: "bg-yellow-500",
  },
  cancelled: {
    label: "Cancelled",
    variant: "destructive" as const,
    color: "bg-red-500",
  },
  "awaiting-feedback": {
    label: "Awaiting Feedback",
    variant: "secondary" as const,
    color: "bg-yellow-500",
  },
};

const priorityConfig = {
  high: { label: "High", variant: "destructive" as const },
  medium: { label: "Medium", variant: "secondary" as const },
  low: { label: "Low", variant: "outline" as const },
};

const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  title,
  description,
  clientName,
  progress,
  status,
  priority,
  dueDate,
  teamSize,
  className,
  id,
}) => {
  const statusInfo =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  const priorityInfo =
    priorityConfig[priority as keyof typeof priorityConfig] ||
    priorityConfig.medium;

  return (
    <Link href={`/projects/${id}`}>
      <Card
        className={`w-full bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-col space-y-2">
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              {title}
            </CardTitle>
            {clientName && (
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {clientName}
                </span>
              </div>
            )}
            <CardDescription className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                Progress
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Project Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Status:
              </span>
              <Badge variant={statusInfo.variant} className="text-xs">
                {statusInfo.label}
              </Badge>
            </div>

            {/* Priority */}
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Priority:
              </span>
              <Badge variant={priorityInfo.variant} className="text-xs">
                {priorityInfo.label}
              </Badge>
            </div>

            {/* Due Date */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Due Date:
              </span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {format(dueDate, "MMM d, yyyy")}
              </span>
            </div>

            {/* Team Size */}
            {/* <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Team Size:
              </span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {teamSize} members
              </span>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectOverview;
