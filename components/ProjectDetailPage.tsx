"use client";

import React, { Suspense } from "react";
import ProjectOverview from "@/components/ProjectOverview";
import AIStatusUpdates from "@/components/project-sections/AIStatusUpdates";
import TodoList, { TodoItem } from "@/components/project-sections/TodoList";
import FileUploads, {
  UploadedFile,
} from "@/components/project-sections/FileUploads";
import ClientFeedback from "@/components/project-sections/ClientFeedback";
import ShareButton from "@/components/project-sections/ShareButton";
import { type Project } from "@/lib/mock-data";
import { File as FileType } from "@/drizzle/schema";
import { useRouter } from "next/navigation";

export interface ProjectDetailPageProps {
  project: Project;
  className?: string;
  todos: TodoItem[];
  files: FileType[];
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  className,
  todos,
  files,
}) => {
  const router = useRouter();

  const handleRegenerateUpdate = () => {
    console.log("Regenerating AI update for project:", project.id);
  };

  const handleSaveUpdate = (update: string) => {
    console.log("Saving AI update:", update);
  };

  const handleTodoChange = () => {
    console.log("Todo changed");
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", project.id);

    const response = await fetch("/api/files", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Upload failed:", errorData);
      return;
    }

    await response.json();

    router.refresh();
  };

  const handleFileDelete = async (fileId: string, fileName: string) => {
    console.log("File deleted:", fileId, fileName);

    const response = await fetch(`/api/files`, {
      method: "DELETE",
      body: JSON.stringify({ id: fileId, fileName: fileName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Delete failed:", errorData);
      return;
    }

    await response.json();

    router.refresh();
  };

  const handleFileDownload = (file: UploadedFile) => {
    console.log("File downloaded:", file.name);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    console.log("Feedback submitted:", feedback);
  };

  const handleShare = (link: string) => {
    console.log("Project shared:", link);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 ${className}`}
    >
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Project Details
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Comprehensive overview and management for {project.title}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Project Overview */}
          <ProjectOverview
            id={project.id}
            title={project.title}
            description={project.description}
            progress={project.progress}
            status={project.status}
            priority={project.priority}
            dueDate={project.dueDate}
            teamSize={project.teamSize}
          />

          {/* AI Status Updates */}
          <AIStatusUpdates
            onRegenerate={handleRegenerateUpdate}
            onSave={handleSaveUpdate}
          />

          {/* To-Do List */}
          <Suspense fallback={<div>Loading...</div>}>
            <TodoList
              onTodoChange={handleTodoChange}
              projectId={Number(project.id)}
              initialTodos={[]}
              todos={todos}
            />
          </Suspense>

          {/* File Uploads */}
          <FileUploads
            onFileUpload={handleFileUpload}
            onFileDelete={handleFileDelete}
            onFileDownload={handleFileDownload}
            files={files}
          />

          {/* Client Feedback */}
          <ClientFeedback onFeedbackSubmit={handleFeedbackSubmit} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Share Button */}
          <ShareButton
            projectId={project.id}
            projectName={project.title}
            onShare={handleShare}
          />

          {/* Additional sidebar content can be added here */}
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p>• View project timeline</p>
              <p>• Export project report</p>
              <p>• Schedule meeting</p>
              <p>• Update project settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
