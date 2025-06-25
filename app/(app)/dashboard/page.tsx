"use client";

import React, { useState, useEffect } from "react";
import ProjectCard, { Project } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search } from "lucide-react";

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform Redesign",
    description:
      "Complete redesign of the main e-commerce platform with modern UI/UX and improved performance.",
    status: "active",
    progress: 75,
    dueDate: "Dec 15, 2024",
    teamSize: 8,
    priority: "high",
  },
  {
    id: "2",
    title: "Mobile App Development",
    description:
      "Native mobile application for iOS and Android platforms with offline capabilities.",
    status: "active",
    progress: 45,
    dueDate: "Jan 20, 2025",
    teamSize: 6,
    priority: "medium",
  },
  {
    id: "3",
    title: "API Integration Project",
    description:
      "Integration of third-party APIs for payment processing and shipping calculations.",
    status: "completed",
    progress: 100,
    dueDate: "Nov 30, 2024",
    teamSize: 4,
    priority: "low",
  },
  {
    id: "4",
    title: "Data Analytics Dashboard",
    description:
      "Real-time analytics dashboard with interactive charts and reporting features.",
    status: "on-hold",
    progress: 30,
    dueDate: "Feb 10, 2025",
    teamSize: 5,
    priority: "medium",
  },
  {
    id: "5",
    title: "Security Audit Implementation",
    description:
      "Comprehensive security audit and implementation of new security protocols.",
    status: "active",
    progress: 60,
    dueDate: "Jan 5, 2025",
    teamSize: 3,
    priority: "high",
  },
  {
    id: "6",
    title: "Legacy System Migration",
    description:
      "Migration of legacy systems to modern cloud infrastructure with zero downtime.",
    status: "cancelled",
    progress: 20,
    dueDate: "Mar 1, 2025",
    teamSize: 10,
    priority: "high",
  },
];

const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Project["status"] | "all">(
    "all"
  );

  useEffect(() => {
    // Simulate API call
    setProjects(mockProjects);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleProjectClick = (project: Project) => {
    console.log("Project clicked:", project);
    // Handle project click - could navigate to project detail page
  };

  const getStatusCount = (status: Project["status"]) => {
    return projects.filter((project) => project.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Projects Overview
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Manage and track your project progress
            </p>
          </div>
          <Button className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Active
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {getStatusCount("active")}
              </p>
            </div>
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <div className="h-5 w-5 bg-green-600 dark:bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Completed
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {getStatusCount("completed")}
              </p>
            </div>
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <div className="h-5 w-5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                On Hold
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {getStatusCount("on-hold")}
              </p>
            </div>
            <div className="h-10 w-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
              <div className="h-5 w-5 bg-yellow-600 dark:bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Total
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {projects.length}
              </p>
            </div>
            <div className="h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
              <div className="h-5 w-5 bg-slate-600 dark:bg-slate-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as Project["status"] | "all")
          }
          className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={handleProjectClick}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500 mb-6">
            <Search className="h-16 w-16" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
            No projects found
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
            Try adjusting your search or filter criteria to find what you're
            looking for
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
