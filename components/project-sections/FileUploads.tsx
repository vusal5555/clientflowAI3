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
} from "lucide-react";
import Image from "next/image";

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  url?: string;
}

export interface FileUploadsProps {
  initialFiles?: UploadedFile[];
  onFileUpload?: (file: File) => void;
  onFileDelete?: (fileId: string) => void;
  onFileDownload?: (file: UploadedFile) => void;
  className?: string;
}

const FileUploads: React.FC<FileUploadsProps> = ({
  initialFiles = [],
  onFileUpload,
  onFileDelete,
  onFileDownload,
  className,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if (type.includes("image"))
      return (
        <Image
          className="h-6 w-6 text-blue-500"
          width={50}
          height={50}
          alt="Image"
          src={"/images/file-icons/image.png"}
        />
      );
    if (type.includes("pdf"))
      return <FileText className="h-6 w-6 text-red-500" />;
    if (type.includes("figma") || type.includes("design"))
      return <File className="h-6 w-6 text-purple-500" />;
    if (type.includes("figma") || type.includes("design"))
      return <File className="h-6 w-6 text-purple-500" />;
    return <File className="h-6 w-6 text-slate-500" />;
  };

  const getFileTypeLabel = (type: string) => {
    if (type.includes("image")) return "Image";
    if (type.includes("pdf")) return "PDF";
    if (type.includes("figma")) return "Figma";
    if (type.includes("design")) return "Design";
    return "File";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };

      const updatedFiles = [...files, newFile];
      setFiles(updatedFiles);

      if (onFileUpload) {
        onFileUpload(file);
      }
    }
  };

  const handleDeleteFile = (fileId: string) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);

    if (onFileDelete) {
      onFileDelete(fileId);
    }
  };

  const handleDownloadFile = (file: UploadedFile) => {
    if (onFileDownload) {
      onFileDownload(file);
    } else {
      // Mock download
      console.log("Downloading file:", file.name);
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
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };

      const updatedFiles = [...files, newFile];
      setFiles(updatedFiles);

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
            accept="image/*,.pdf,.fig,.figx,.sketch,.xd"
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
        {files.length === 0 ? (
          <div className="text-center py-8">
            <FolderOpen className="h-12 w-12 mx-auto mb-3 text-slate-400" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No files uploaded yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">{getFileIcon(file.type)}</div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {getFileTypeLabel(file.type)}
                      </Badge>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(file.uploadedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      onClick={() => handleDownloadFile(file)}
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 text-slate-400 hover:text-blue-500"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteFile(file.id)}
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 text-slate-400 hover:text-red-500"
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
