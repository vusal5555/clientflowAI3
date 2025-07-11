"use client";

import React from "react";
import { FileText, Search, Filter, Download, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { File as FileType } from "@/drizzle/schemas/file";
import { useRouter } from "next/navigation";

const FileClientWrapper = ({ filesData }: { filesData: FileType[] }) => {
  const router = useRouter();

  const onFileDelete = async (fileId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/files`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: fileId, fileName: fileName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete failed:", errorData);
        return;
      }

      await response.json();
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const onFileDownload = async (file: FileType) => {
    try {
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
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Files
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Manage and organize your project files
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search files..."
              className="pl-10 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filesData.map((file) => (
            <div
              key={file.id}
              className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              {/* File Icon */}
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>

              {/* File Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                    {file.fileName}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Project ID: {file.projectId}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>File</span>
                  <span>
                    {file.createdAt
                      ? new Date(file.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    by User {file.uploadedBy}
                  </span>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onFileDownload(file)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onFileDownload(file)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      onClick={() =>
                        onFileDelete(file.id?.toString() || "", file.fileName)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileClientWrapper;
