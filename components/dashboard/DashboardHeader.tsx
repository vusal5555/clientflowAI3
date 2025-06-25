import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const DashboardHeader = () => {
  return (
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
  );
};

export default DashboardHeader;
