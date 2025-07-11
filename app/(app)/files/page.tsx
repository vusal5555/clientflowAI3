import React from "react";
import { cookies } from "next/headers";
import { File } from "@/drizzle/schemas/file";
import FileClientWrapper from "@/components/file/FileClientWrapper";

const FilesPage = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const cookieStore = await cookies();

  let projects = [];
  try {
    const response = await fetch(`${baseUrl}/api/projects`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    projects = await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

  let filesData: File[] = [];
  try {
    const response = await fetch(`${baseUrl}/api/files`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "force-cache",
      next: {
        tags: ["files"],
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    filesData = await response.json();
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }

  return <FileClientWrapper filesData={filesData} />;
};

export default FilesPage;
