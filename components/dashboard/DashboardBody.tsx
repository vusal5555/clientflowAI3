import React, { useState, useEffect } from "react";
import ProjectCard, { Project } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { mockProjects } from "@/lib/mock-data";

const DashboardBody = () => {
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

  return (
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
  );

  {
    /* Projects Grid */
  }
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredProjects.map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        onClick={handleProjectClick}
      />
    ))}
  </div>;

  {
    /* Empty State */
  }
  {
    filteredProjects.length === 0 && (
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
    );
  }
};

export default DashboardBody;
