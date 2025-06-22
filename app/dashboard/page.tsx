"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import TopNavbar from "@/components/top-navbar";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    <div className="flex h-screen bg-background">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:z-auto
      `}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <TopNavbar
          pageTitle="Dashboard"
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Projects Overview
                </h2>
                <p className="text-muted-foreground">
                  Manage and track your project progress
                </p>
              </div>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active
                  </p>
                  <p className="text-2xl font-bold">
                    {getStatusCount("active")}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>
                  <p className="text-2xl font-bold">
                    {getStatusCount("completed")}
                  </p>
                </div>
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    On Hold
                  </p>
                  <p className="text-2xl font-bold">
                    {getStatusCount("on-hold")}
                  </p>
                </div>
                <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-yellow-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total
                  </p>
                  <p className="text-2xl font-bold">{projects.length}</p>
                </div>
                <div className="h-8 w-8 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as Project["status"] | "all")
              }
              className="px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                <Search className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
