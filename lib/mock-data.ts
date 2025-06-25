export interface Project {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "on-hold" | "cancelled";
  progress: number;
  dueDate: string;
  teamSize: number;
  priority: "high" | "medium" | "low";
}

// Mock data for projects
export const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform Redesign",
    description:
      "Complete redesign of the main e-commerce platform with modern UI/UX and improved performance.",
    status: "active",
    progress: 75,
    dueDate: "Dec 15, 2024",
    teamSize: 8,
    priority: "high",
  },
  {
    id: "2",
    title: "Mobile App Development",
    description:
      "Native mobile application for iOS and Android platforms with offline capabilities.",
    status: "active",
    progress: 45,
    dueDate: "Jan 20, 2025",
    teamSize: 6,
    priority: "medium",
  },
  {
    id: "3",
    title: "API Integration Project",
    description:
      "Integration of third-party APIs for payment processing and shipping calculations.",
    status: "completed",
    progress: 100,
    dueDate: "Nov 30, 2024",
    teamSize: 4,
    priority: "low",
  },
  {
    id: "4",
    title: "Data Analytics Dashboard",
    description:
      "Real-time analytics dashboard with interactive charts and reporting features.",
    status: "on-hold",
    progress: 30,
    dueDate: "Feb 10, 2025",
    teamSize: 5,
    priority: "medium",
  },
  {
    id: "5",
    title: "Security Audit Implementation",
    description:
      "Comprehensive security audit and implementation of new security protocols.",
    status: "active",
    progress: 60,
    dueDate: "Jan 5, 2025",
    teamSize: 3,
    priority: "high",
  },
  {
    id: "6",
    title: "Legacy System Migration",
    description:
      "Migration of legacy systems to modern cloud infrastructure with zero downtime.",
    status: "cancelled",
    progress: 20,
    dueDate: "Mar 1, 2025",
    teamSize: 10,
    priority: "high",
  },
];
