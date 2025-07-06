"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Users,
  MessageSquare,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  projects: Project[];
  feedbackCount: number;
  lastActivity: string;
  totalProjects: number;
  activeProjects: number;
  status: "online" | "offline" | "feedback-pending" | "inactive";
}

interface Project {
  id: string;
  title: string;
  status: "active" | "completed" | "archived" | "awaiting-feedback";
  progress: number;
  dueDate?: string;
  description?: string;
}

interface Feedback {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
  projectId: string;
  projectTitle: string;
}

const ClientDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // Fetch client data
        const response = await fetch(`/api/clients/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch client");
        }
        const clientData = await response.json();
        setClient(clientData);

        // Fetch feedback data
        const feedbackResponse = await fetch(
          `/api/feedback?clientId=${params.id}`
        );
        if (feedbackResponse.ok) {
          const feedbackData = await feedbackResponse.json();
          setFeedback(feedbackData);
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
        // Fallback to mock data
        const mockClient: Client = {
          id: params.id,
          name: "Sarah Johnson",
          email: "sarah.johnson@techcorp.com",
          phone: "+1 (555) 123-4567",
          image:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          projects: [
            {
              id: "1",
              title: "E-commerce Platform Redesign",
              status: "active",
              progress: 75,
              dueDate: "2024-12-15",
              description:
                "Complete redesign of the main e-commerce platform with modern UI/UX and improved performance.",
            },
            {
              id: "2",
              title: "Mobile App Development",
              status: "active",
              progress: 45,
              dueDate: "2025-01-20",
              description:
                "Native mobile application for iOS and Android platforms with offline capabilities.",
            },
          ],
          feedbackCount: 12,
          lastActivity: "2024-12-01T10:30:00Z",
          totalProjects: 2,
          activeProjects: 2,
          status: "online",
        };
        setClient(mockClient);

        const mockFeedback: Feedback[] = [
          {
            id: "1",
            content:
              "The new design looks great! Can we adjust the color scheme slightly?",
            authorName: "Sarah Johnson",
            createdAt: "2024-12-01T10:30:00Z",
            projectId: "1",
            projectTitle: "E-commerce Platform Redesign",
          },
          {
            id: "2",
            content:
              "The mobile app is working perfectly. Great job on the offline functionality!",
            authorName: "Sarah Johnson",
            createdAt: "2024-11-28T14:15:00Z",
            projectId: "2",
            projectTitle: "Mobile App Development",
          },
        ];
        setFeedback(mockFeedback);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [params.id]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getClientColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getStatusConfig = (status: Client["status"]) => {
    const configs = {
      online: {
        label: "Online",
        variant: "default",
        icon: CheckCircle,
        color: "text-green-600 dark:text-green-400",
      },
      offline: {
        label: "Offline",
        variant: "secondary",
        icon: Clock,
        color: "text-slate-500 dark:text-slate-400",
      },
      "feedback-pending": {
        label: "Feedback Pending",
        variant: "destructive",
        icon: AlertCircle,
        color: "text-orange-600 dark:text-orange-400",
      },
      inactive: {
        label: "Inactive",
        variant: "outline",
        icon: Clock,
        color: "text-slate-400 dark:text-slate-500",
      },
    };
    return configs[status];
  };

  const getProjectStatusConfig = (status: Project["status"]) => {
    const configs = {
      active: {
        label: "Active",
        variant: "default",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      },
      completed: {
        label: "Completed",
        variant: "secondary",
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      },
      archived: {
        label: "Archived",
        variant: "outline",
        color:
          "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
      },
      "awaiting-feedback": {
        label: "Awaiting Feedback",
        variant: "destructive",
        color:
          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      },
    };
    return configs[status];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Loading client details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            Client Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            The client you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const initials = getInitials(client.name);
  const clientColor = getClientColor(client.name);
  const statusConfig = getStatusConfig(client.status);
  const StatusIcon = statusConfig.icon;
  const lastActivityDate = new Date(client.lastActivity);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Client Details
          </h1>
        </div>

        {/* Client Info Card */}
        <Card className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={client.image} alt={client.name} />
                  <AvatarFallback
                    className={`${clientColor} text-white font-semibold text-xl`}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 ${statusConfig.color} bg-white dark:bg-slate-800 flex items-center justify-center`}
                >
                  <StatusIcon className="w-3 h-3" />
                </div>
              </div>

              {/* Client Details */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {client.name}
                  </h2>
                  <Badge variant={statusConfig.variant as any}>
                    {statusConfig.label}
                  </Badge>
                </div>

                <div className="space-y-2 text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>
                      Last active:{" "}
                      {format(lastActivityDate, "MMM d, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {client.totalProjects} project
                      {client.totalProjects !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {client.feedbackCount} feedback
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {client.activeProjects} active
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {client.projects.map((project) => {
              const projectStatus = getProjectStatusConfig(project.status);
              return (
                <Card
                  key={project.id}
                  className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {project.title}
                          </h3>
                          <Badge className={projectStatus.color}>
                            {projectStatus.label}
                          </Badge>
                        </div>
                        {project.description && (
                          <p className="text-slate-600 dark:text-slate-300 mb-3">
                            {project.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Progress: {project.progress}%</span>
                          </div>
                          {project.dueDate && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Due:{" "}
                                {format(
                                  new Date(project.dueDate),
                                  "MMM d, yyyy"
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <div className="grid gap-4">
            {feedback.map((item) => (
              <Card
                key={item.id}
                className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {getInitials(item.authorName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {item.authorName}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {item.projectTitle}
                        </Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-2">
                        {item.content}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {format(
                            new Date(item.createdAt),
                            "MMM d, yyyy 'at' h:mm a"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {feedback.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No feedback yet
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Feedback from this client will appear here.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Project "E-commerce Platform Redesign" updated
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {format(new Date(), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Feedback submitted for "Mobile App Development"
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {format(
                        new Date(Date.now() - 86400000),
                        "MMM d, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      New project "Mobile App Development" created
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {format(
                        new Date(Date.now() - 172800000),
                        "MMM d, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetailPage;
