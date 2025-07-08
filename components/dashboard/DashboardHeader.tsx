"use client";

import React from "react";
import CreateProjectDialog from "../CreateProjectDialog";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, TrendingUp } from "lucide-react";
import { User } from "@/drizzle/schemas/user";

const DashboardHeader = ({ user }: { user: User[] }) => {
  console.log(user);

  const currentDate = new Date();
  const greeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {greeting()}, {user[0].name || "User"}! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Here's what's happening with your projects today
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="text-xs">
            <Calendar className="mr-2 h-3 w-3" />
            Today
          </Button>
          <CreateProjectDialog />
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800/50">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
              This Week
            </p>
            <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
              +12% Growth
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800/50">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              New Projects
            </p>
            <p className="text-lg font-bold text-green-900 dark:text-green-100">
              3 Added
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800/50">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Due Today
            </p>
            <p className="text-lg font-bold text-purple-900 dark:text-purple-100">
              2 Tasks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
