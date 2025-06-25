import { Project } from "@/lib/mock-data";
import React from "react";

const DashboardStats = ({ projects }: { projects: Project[] }) => {
  const getStatusCount = (status: Project["status"]) => {
    return projects.filter((project) => project.status === status).length;
  };
  return (
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
  );
};

export default DashboardStats;
