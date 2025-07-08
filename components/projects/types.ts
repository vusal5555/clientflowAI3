export interface Project {
  id: number;
  title: string;
  description: string | null;
  clientName: string | null;
  status: "active" | "completed" | "archived" | "awaiting-feedback";
  progress: number;
  dueDate: string | null;
  priority: "high" | "medium" | "low";
}

export const statusConfig = {
  active: {
    label: "Active",
    variant: "default" as const,
    color: "bg-green-500",
    textColor: "text-green-700 dark:text-green-400",
  },
  completed: {
    label: "Completed",
    variant: "secondary" as const,
    color: "bg-blue-500",
    textColor: "text-blue-700 dark:text-blue-400",
  },
  archived: {
    label: "Archived",
    variant: "destructive" as const,
    color: "bg-gray-500",
    textColor: "text-gray-700 dark:text-gray-400",
  },
  "awaiting-feedback": {
    label: "Awaiting Feedback",
    variant: "secondary" as const,
    color: "bg-yellow-500",
    textColor: "text-yellow-700 dark:text-yellow-400",
  },
};

export const priorityConfig = {
  high: { label: "High", variant: "destructive" as const },
  medium: { label: "Medium", variant: "secondary" as const },
  low: { label: "Low", variant: "outline" as const },
};

// Generate initials from project title
export const getProjectInitials = (title: string) => {
  return title
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Generate a consistent color based on project title
export const getProjectColor = (title: string) => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-red-500",
  ];
  const index = title.charCodeAt(0) % colors.length;
  return colors[index];
};
