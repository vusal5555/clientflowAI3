import React from "react";
import {
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FilesPage = () => {
  // Mock file data
  const files = [
    {
      id: 1,
      name: "Project_Brief_v2.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: "John Doe",
      uploadedAt: "2 hours ago",
      project: "Website Redesign",
    },
    {
      id: 2,
      name: "Logo_Design.ai",
      type: "AI",
      size: "15.7 MB",
      uploadedBy: "Sarah Smith",
      uploadedAt: "1 day ago",
      project: "Brand Identity",
    },
    {
      id: 3,
      name: "Content_Strategy.docx",
      type: "DOCX",
      size: "856 KB",
      uploadedBy: "Mike Johnson",
      uploadedAt: "3 days ago",
      project: "Content Marketing",
    },
    {
      id: 4,
      name: "Analytics_Report.xlsx",
      type: "XLSX",
      size: "1.2 MB",
      uploadedBy: "David Wilson",
      uploadedAt: "1 week ago",
      project: "SEO Campaign",
    },
  ];

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
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
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
          {files.map((file) => (
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
                    {file.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {file.project}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{file.size}</span>
                  <span>{file.uploadedAt}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    by {file.uploadedBy}
                  </span>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Drop files here or click to upload
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Upload project files, documents, and assets
          </p>
          <Button variant="outline">Choose Files</Button>
        </div>
      </div>
    </div>
  );
};

export default FilesPage;
