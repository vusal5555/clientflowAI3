"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Download,
  Trash2,
  FileText,
  File,
  Calendar,
  FolderOpen,
  Image,
} from "lucide-react";
import { File as FileType } from "@/drizzle/schema";

export interface UploadedFile {
  id?: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  url?: string;
}

export interface FileUploadsProps {
  files?: FileType[];
  onFileUpload?: (file: File) => void;
  onFileDelete?: (fileId: string, fileName: string) => void;
  onFileDownload?: (file: FileType) => void;
  className?: string;
}

const FileUploads: React.FC<FileUploadsProps> = ({
  onFileUpload,
  onFileDelete,
  onFileDownload,
  className,
  files,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if (
      type.includes("jpeg") ||
      type.includes("jpg") ||
      type.includes("png") ||
      type.includes("gif") ||
      type.includes("webp") ||
      type.includes("svg")
    )
      return <Image className="h-6 w-6 text-blue-500" />;
    if (type.includes("pdf"))
      return <FileText className="h-6 w-6 text-red-500" />;
    if (type.includes("figma") || type.includes("design"))
      return <File className="h-6 w-6 text-purple-500" />;
    return <File className="h-6 w-6 text-slate-500" />;
  };

  const getFileTypeLabel = (type: string) => {
    if (type.includes("jpeg") || type.includes("jpg") || type.includes("png"))
      return "Image";
    if (type.includes("pdf")) return "PDF";
    if (type.includes("figma")) return "Figma";
    if (type.includes("design")) return "Design";
    return "File";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (onFileUpload) {
        onFileUpload(file);
      }
    }
  };

  const handleDeleteFile = (fileId: string, fileName: string) => {
    if (onFileDelete) {
      onFileDelete(fileId, fileName);
    }
  };

  const handleDownloadFile = (file: FileType) => {
    if (onFileDownload) {
      onFileDownload(file);
    } else {
      // Mock download
      console.log("Downloading file:", file.fileName);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];
      if (onFileUpload) {
        onFileUpload(file);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card
      className={`bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
          File Uploads
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
            Drag and drop files here, or click to browse
          </p>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.fig,jpeg,jpg,png,gif,figx,.sketch,.xd"
          />
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleUploadClick();
            }}
          >
            Choose Files
          </Button>
        </div>

        {/* Files Grid */}
        {files?.length === 0 ? (
          <div className="text-center py-8">
            <FolderOpen className="h-12 w-12 mx-auto mb-3 text-slate-400" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No files uploaded yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {files?.map((file, index) => (
              <div
                key={index}
                className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {getFileIcon(file.fileName)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {file.fileName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {getFileTypeLabel(file.fileName)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {file?.createdAt
                          ? typeof file.createdAt === "string"
                            ? formatDate(file.createdAt)
                            : formatDate(file.createdAt.toISOString())
                          : formatDate(new Date().toISOString())}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      onClick={() => handleDownloadFile(file)}
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 text-slate-400 hover:text-blue-500 cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() =>
                        handleDeleteFile(
                          file.id?.toString() || "",
                          file.fileName
                        )
                      }
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploads;
