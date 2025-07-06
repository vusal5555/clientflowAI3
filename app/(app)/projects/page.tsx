"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Calendar, User, Filter } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface Project {
  id: string;
  title: string;
  description: string;
  clientName?: string;
  status: "active" | "completed" | "archived" | "awaiting-feedback";
  progress: number;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

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
  archived: {
    label: "Archived",
    variant: "destructive" as const,
    color: "bg-gray-500",
    textColor: "text-gray-700 dark:text-gray-400",
  },
  "awaiting-feedback": {
    label: "Awaiting Feedback",
    variant: "secondary" as const,
    color: "bg-yellow-500",
    textColor: "text-yellow-700 dark:text-yellow-400",
  },
};

const priorityConfig = {
  high: { label: "High", variant: "destructive" as const },
  medium: { label: "Medium", variant: "secondary" as const },
  low: { label: "Low", variant: "outline" as const },
};

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

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data - in real app this would come from API
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "E-commerce Platform Redesign",
      description:
        "Complete redesign of the main e-commerce platform with modern UI/UX and improved performance.",
      clientName: "TechCorp Inc.",
      status: "active",
      progress: 75,
      dueDate: "2024-12-15",
      priority: "high",
    },
    {
      id: "2",
      title: "Mobile App Development",
      description:
        "Native mobile application for iOS and Android platforms with offline capabilities.",
      clientName: "StartupXYZ",
      status: "active",
      progress: 45,
      dueDate: "2025-01-20",
      priority: "medium",
    },
    {
      id: "3",
      title: "API Integration Project",
      description:
        "Integration of third-party APIs for payment processing and shipping calculations.",
      clientName: "Global Retail",
      status: "completed",
      progress: 100,
      dueDate: "2024-11-30",
      priority: "low",
    },
    {
      id: "4",
      title: "Data Analytics Dashboard",
      description:
        "Real-time analytics dashboard with interactive charts and reporting features.",
      clientName: "DataFlow Solutions",
      status: "awaiting-feedback",
      progress: 30,
      dueDate: "2025-02-10",
      priority: "medium",
    },
    {
      id: "5",
      title: "Security Audit Implementation",
      description:
        "Comprehensive security audit and implementation of new security protocols.",
      clientName: "SecureNet Ltd.",
      status: "active",
      progress: 60,
      dueDate: "2025-01-05",
      priority: "high",
    },
    {
      id: "6",
      title: "Legacy System Migration",
      description:
        "Migration of legacy systems to modern cloud infrastructure with zero downtime.",
      clientName: "Enterprise Corp",
      status: "archived",
      progress: 20,
      dueDate: "2025-03-01",
      priority: "high",
    },
  ]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const ProjectCard = ({ project }: { project: Project }) => {
    const statusInfo = statusConfig[project.status] || statusConfig.active;
    const priorityInfo =
      priorityConfig[project.priority] || priorityConfig.medium;
    const initials = getProjectInitials(project.title);
    const projectColor = getProjectColor(project.title);

    return (
      <Link href={`/projects/${project.id}`}>
        <Card className="w-full bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
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
                  {format(new Date(project.dueDate), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  const ProjectListItem = ({ project }: { project: Project }) => {
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
                  {format(new Date(project.dueDate), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      {/* Header Section */}
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
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search projects, clients, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-white/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="awaiting-feedback">
                Awaiting Feedback
              </SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              List
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-slate-600 dark:text-slate-300">
          {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Projects Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by creating your first project"}
          </p>
          {!searchTerm && statusFilter === "all" && (
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
