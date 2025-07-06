import React from "react";
import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Reply,
  Archive,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FeedbackPage = () => {
  // Mock feedback data
  const feedbackItems = [
    {
      id: 1,
      client: "Sarah Johnson",
      avatar: "SJ",
      project: "Website Redesign",
      message:
        "The new design looks amazing! Just a few small tweaks needed on the mobile version.",
      status: "pending",
      priority: "high",
      timestamp: "2 hours ago",
      rating: 5,
    },
    {
      id: 2,
      client: "Mike Chen",
      avatar: "MC",
      project: "Brand Identity",
      message:
        "Love the logo concepts! Can we explore option 2 with a different color palette?",
      status: "replied",
      priority: "medium",
      timestamp: "1 day ago",
      rating: 4,
    },
    {
      id: 3,
      client: "David Wilson",
      avatar: "DW",
      project: "Content Marketing",
      message:
        "The blog posts are performing well. Can we increase the frequency to 3 posts per week?",
      status: "resolved",
      priority: "low",
      timestamp: "3 days ago",
      rating: 5,
    },
    {
      id: 4,
      client: "Emily Davis",
      avatar: "ED",
      project: "SEO Campaign",
      message:
        "The analytics look great! Traffic is up 25% this month. Great work!",
      status: "resolved",
      priority: "low",
      timestamp: "1 week ago",
      rating: 5,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "replied":
        return <Reply className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Client Feedback
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Manage client messages and feedback
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Archive className="mr-2 h-4 w-4" />
              Archive All
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Update
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Pending
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  3
                </p>
              </div>
              <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Replied
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  1
                </p>
              </div>
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Reply className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Resolved
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  2
                </p>
              </div>
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Avg Rating
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  4.8
                </p>
              </div>
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {feedbackItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12 border-2 border-slate-200 dark:border-slate-600">
                  <AvatarImage
                    src={`/api/placeholder/48/48`}
                    alt={item.client}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                    {item.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {item.client}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {item.project}
                      </Badge>
                      <Badge
                        className={`text-xs ${getPriorityColor(item.priority)}`}
                      >
                        {item.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {item.timestamp}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    {item.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < item.rating
                              ? "text-yellow-400 fill-current"
                              : "text-slate-300 dark:text-slate-600"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button variant="ghost" size="sm">
                        <Reply className="mr-2 h-4 w-4" />
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </Button>
                    </div>
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

export default FeedbackPage;
