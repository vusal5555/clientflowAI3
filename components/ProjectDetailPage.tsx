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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  MessageSquare,
  Upload,
  Share2,
  Plus,
  Reply,
  FileText,
  Calendar,
  Users,
  Target,
} from "lucide-react";

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

  const handleFileDownload = async (file: FileType) => {
    const response = await fetch(`/api/files/download?imageUrl=${file.url}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Download failed:", errorData);
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    console.log("Feedback submitted:", feedback);
  };

  const handleShare = (link: string) => {
    console.log("Project shared:", link);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "on hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
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
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Project Overview Card */}
          <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                  Project Overview
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* AI Status Updates Card */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-blue-200/30 dark:from-purple-800/20 dark:to-blue-800/20 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                  AI Status Updates
                </CardTitle>
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  AI Generated
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <AIStatusUpdates
                onRegenerate={handleRegenerateUpdate}
                onSave={handleSaveUpdate}
              />
            </CardContent>
          </Card>

          {/* To-Do List Card */}
          <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  To-Do List
                </CardTitle>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Todo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <TodoList
                  onTodoChange={handleTodoChange}
                  projectId={Number(project.id)}
                  initialTodos={[]}
                  todos={todos}
                />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* File Uploads Card */}
          <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  File Uploads
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Add File
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <FileUploads
                onFileUpload={handleFileUpload}
                onFileDelete={handleFileDelete}
                onFileDownload={handleFileDownload}
                files={files}
              />
            </CardContent>
          </Card>

          {/* Client Feedback Card */}
          <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Feedback Threads
                </CardTitle>
                <Button size="sm" className="flex items-center gap-2">
                  <Reply className="h-4 w-4" />
                  Reply
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ClientFeedback onFeedbackSubmit={handleFeedbackSubmit} />
            </CardContent>
          </Card>

          {/* Shareable Link Card */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Share2 className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                  Shareable Link
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ShareButton
                projectId={project.id}
                projectName={project.title}
                onShare={handleShare}
              />
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  View project timeline
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sm"
                >
                  <FileText className="h-4 w-4" />
                  Export project report
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sm"
                >
                  <Users className="h-4 w-4" />
                  Schedule meeting
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sm"
                >
                  <Target className="h-4 w-4" />
                  Update project settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
