import { Project } from "@/lib/mock-data";
import React from "react";
import {
  TrendingUp,
  CheckCircle,
  Clock,
  FolderOpen,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const DashboardStats = ({ projects }: { projects: Project[] }) => {
  const getStatusCount = (status: Project["status"]) => {
    return projects.filter((project) => project.status === status).length;
  };

  const stats = [
    {
      title: "Active Projects",
      value: getStatusCount("active"),
      change: "+12%",
      changeType: "positive",
      icon: FolderOpen,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
      description: "Currently in progress",
    },
    {
      title: "Completed",
      value: getStatusCount("completed"),
      change: "+8%",
      changeType: "positive",
      icon: CheckCircle,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      description: "Successfully delivered",
    },
    {
      title: "On Hold",
      value: getStatusCount("on-hold"),
      change: "-3%",
      changeType: "negative",
      icon: Clock,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
      description: "Awaiting feedback",
    },
    {
      title: "Total Projects",
      value: projects.length,
      change: "+15%",
      changeType: "positive",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
      description: "All time projects",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />

          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor}`}
              >
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
              <div className="flex items-center space-x-1">
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {stat.description}
              </p>
            </div>

            {/* Decorative element */}
            <div
              className={`absolute top-0 right-0 w-20 h-20 rounded-full ${stat.bgColor} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
