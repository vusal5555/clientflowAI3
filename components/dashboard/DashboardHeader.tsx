"use client";

import React from "react";
import CreateProjectDialog from "../CreateProjectDialog";

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

        <CreateProjectDialog />
      </div>
    </div>
  );
};

export default DashboardHeader;
