"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Mail,
  Calendar,
  Filter,
  Users,
  MessageSquare,
  Activity,
  Grid3X3,
  List,
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import AddClientDialog from "@/components/AddClientDialog";

interface Client {
  id: string;
  name: string;
  email: string;
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
}

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activityFilter, setActivityFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/clients");
        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }
        const data = await response.json();

        // Transform API data to match our interface
        const transformedClients: Client[] = data.map((client: any) => ({
          id: client.id,
          name: client.name,
          email: client.email,
          image: undefined, // API doesn't provide images yet
          projects: client.projects || [],
          feedbackCount: client.feedbackCount || 0,
          lastActivity: client.lastActivity,
          totalProjects: client.totalProjects || 0,
          activeProjects: client.activeProjects || 0,
          status: getClientStatus(client),
        }));

        setClients(transformedClients);
      } catch (error) {
        console.error("Error fetching clients:", error);
        // Fallback to mock data if API fails
        const mockClients: Client[] = [
          {
            id: "1",
            name: "Sarah Johnson",
            email: "sarah.johnson@techcorp.com",
            image:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            projects: [
              {
                id: "1",
                title: "E-commerce Platform Redesign",
                status: "active",
                progress: 75,
                dueDate: "2024-12-15",
              },
              {
                id: "2",
                title: "Mobile App Development",
                status: "active",
                progress: 45,
                dueDate: "2025-01-20",
              },
            ],
            feedbackCount: 12,
            lastActivity: "2024-12-01T10:30:00Z",
            totalProjects: 2,
            activeProjects: 2,
            status: "online",
          },
          {
            id: "2",
            name: "Michael Chen",
            email: "michael.chen@startupxyz.com",
            projects: [
              {
                id: "3",
                title: "API Integration Project",
                status: "completed",
                progress: 100,
                dueDate: "2024-11-30",
              },
            ],
            feedbackCount: 8,
            lastActivity: "2024-11-28T14:15:00Z",
            totalProjects: 1,
            activeProjects: 0,
            status: "offline",
          },
          {
            id: "3",
            name: "Emily Rodriguez",
            email: "emily.rodriguez@globalretail.com",
            image:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            projects: [
              {
                id: "4",
                title: "Data Analytics Dashboard",
                status: "awaiting-feedback",
                progress: 30,
                dueDate: "2025-02-10",
              },
            ],
            feedbackCount: 15,
            lastActivity: "2024-12-02T09:45:00Z",
            totalProjects: 1,
            activeProjects: 1,
            status: "feedback-pending",
          },
          {
            id: "4",
            name: "David Thompson",
            email: "david.thompson@securenetsolutions.com",
            projects: [
              {
                id: "5",
                title: "Security Audit Implementation",
                status: "active",
                progress: 60,
                dueDate: "2025-01-05",
              },
            ],
            feedbackCount: 6,
            lastActivity: "2024-11-30T16:20:00Z",
            totalProjects: 1,
            activeProjects: 1,
            status: "online",
          },
          {
            id: "5",
            name: "Lisa Wang",
            email: "lisa.wang@enterprisecorp.com",
            image:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
            projects: [
              {
                id: "6",
                title: "Legacy System Migration",
                status: "archived",
                progress: 20,
                dueDate: "2025-03-01",
              },
            ],
            feedbackCount: 3,
            lastActivity: "2024-11-25T11:10:00Z",
            totalProjects: 1,
            activeProjects: 0,
            status: "inactive",
          },
          {
            id: "6",
            name: "Alex Martinez",
            email: "alex.martinez@dataflowsolutions.com",
            projects: [
              {
                id: "7",
                title: "Cloud Infrastructure Setup",
                status: "active",
                progress: 85,
                dueDate: "2024-12-20",
              },
              {
                id: "8",
                title: "Performance Optimization",
                status: "active",
                progress: 25,
                dueDate: "2025-01-15",
              },
            ],
            feedbackCount: 9,
            lastActivity: "2024-12-01T13:25:00Z",
            totalProjects: 2,
            activeProjects: 2,
            status: "online",
          },
        ];
        setClients(mockClients);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const getClientStatus = (client: any): Client["status"] => {
    const lastActivity = new Date(client.lastActivity);
    const now = new Date();
    const daysSinceActivity =
      (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceActivity < 1) return "online";
    if (daysSinceActivity < 7) return "offline";
    if (client.projects?.some((p: any) => p.status === "awaiting-feedback"))
      return "feedback-pending";
    return "inactive";
  };

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.projects.some((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" || client.status === statusFilter;

      const matchesActivity =
        activityFilter === "all" ||
        (activityFilter === "active" && client.activeProjects > 0) ||
        (activityFilter === "inactive" && client.activeProjects === 0);

      return matchesSearch && matchesStatus && matchesActivity;
    });
  }, [clients, searchTerm, statusFilter, activityFilter]);

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

  const ClientCard = ({ client }: { client: Client }) => {
    const initials = getInitials(client.name);
    const clientColor = getClientColor(client.name);
    const lastActivityDate = new Date(client.lastActivity);
    const isRecent =
      Date.now() - lastActivityDate.getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days
    const statusConfig = getStatusConfig(client.status);
    const StatusIcon = statusConfig.icon;

    return (
      <Link href={`/clients/${client.id}`}>
        <Card className="w-full bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="flex items-start space-x-4">
              {/* Client Avatar */}
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={client.image} alt={client.name} />
                  <AvatarFallback
                    className={`${clientColor} text-white font-semibold`}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {/* Status indicator */}
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${statusConfig.color} bg-white dark:bg-slate-800 flex items-center justify-center`}
                >
                  <StatusIcon className="w-2.5 h-2.5" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {client.name}
                  </CardTitle>
                  <Badge
                    variant={statusConfig.variant as any}
                    className="text-xs"
                  >
                    {statusConfig.label}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <Mail className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300 truncate">
                    {client.email}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Project Stats */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {client.totalProjects} project
                  {client.totalProjects !== 1 ? "s" : ""}
                </span>
              </div>
              <Badge
                variant={client.activeProjects > 0 ? "default" : "secondary"}
                className="text-xs"
              >
                {client.activeProjects} active
              </Badge>
            </div>

            {/* Feedback & Activity */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {client.feedbackCount} feedback
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity
                  className={`w-4 h-4 ${
                    isRecent ? "text-green-500" : "text-slate-400"
                  }`}
                />
                <span
                  className={`text-xs ${
                    isRecent
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {format(lastActivityDate, "MMM d")}
                </span>
              </div>
            </div>

            {/* Recent Projects */}
            {client.projects.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="space-y-2">
                  {client.projects.slice(0, 2).map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-slate-600 dark:text-slate-300 truncate">
                        {project.title}
                      </span>
                      <Badge
                        variant={
                          project.status === "active"
                            ? "default"
                            : project.status === "completed"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  ))}
                  {client.projects.length > 2 && (
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      +{client.projects.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    );
  };

  const ClientListItem = ({ client }: { client: Client }) => {
    const initials = getInitials(client.name);
    const clientColor = getClientColor(client.name);
    const lastActivityDate = new Date(client.lastActivity);
    const isRecent =
      Date.now() - lastActivityDate.getTime() < 7 * 24 * 60 * 60 * 1000;
    const statusConfig = getStatusConfig(client.status);
    const StatusIcon = statusConfig.icon;

    return (
      <Link href={`/clients/${client.id}`}>
        <Card className="w-full bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              {/* Client Avatar */}
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={client.image} alt={client.name} />
                  <AvatarFallback
                    className={`${clientColor} text-white font-semibold`}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {/* Status indicator */}
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${statusConfig.color} bg-white dark:bg-slate-800 flex items-center justify-center`}
                >
                  <StatusIcon className="w-1.5 h-1.5" />
                </div>
              </div>

              {/* Client Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {client.name}
                  </h3>
                  <Badge
                    variant={statusConfig.variant as any}
                    className="text-xs"
                  >
                    {statusConfig.label}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <Mail className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300 truncate">
                    {client.email}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{client.totalProjects}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{client.feedbackCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity
                    className={`w-4 h-4 ${isRecent ? "text-green-500" : ""}`}
                  />
                  <span
                    className={
                      isRecent ? "text-green-600 dark:text-green-400" : ""
                    }
                  >
                    {format(lastActivityDate, "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Loading clients...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Clients
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Manage and track all your client relationships
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search clients by name, email, or project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-white/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="feedback-pending">Feedback Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Activity Filter */}
          <Select value={activityFilter} onValueChange={setActivityFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-white/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <Activity className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activity</SelectItem>
              <SelectItem value="active">Active Clients</SelectItem>
              <SelectItem value="inactive">Inactive Clients</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-slate-600 dark:text-slate-300">
          {filteredClients.length} client
          {filteredClients.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Clients Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredClients.map((client) => (
            <ClientListItem key={client.id} client={client} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredClients.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No clients found
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
            {searchTerm || statusFilter !== "all" || activityFilter !== "all"
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Get started by adding your first client to begin managing your relationships."}
          </p>
          {!searchTerm &&
            statusFilter === "all" &&
            activityFilter === "all" && (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => setShowAddDialog(true)}
              >
                <UserPlus className="w-5 h-5" />
                <span>Add Your First Client</span>
              </Button>
            )}
        </div>
      )}

      {/* Floating Add Button */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        onClick={() => setShowAddDialog(true)}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Add Client Dialog */}
      <AddClientDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
};

export default ClientsPage;
