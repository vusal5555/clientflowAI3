import React from "react";
import {
  Sparkles,
  MessageSquare,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AIInsightsSection: React.FC = () => {
  const insights = [
    {
      type: "notification",
      icon: MessageSquare,
      title: "3 clients waiting for reply",
      description:
        "Sarah, Mike, and David have sent messages in the last 24 hours",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      priority: "high",
    },
    {
      type: "insight",
      icon: TrendingUp,
      title: "Project completion rate up 15%",
      description: "Your team is delivering projects 15% faster this month",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      priority: "medium",
    },
    {
      type: "reminder",
      icon: Clock,
      title: "Weekly client check-ins due",
      description: "5 projects need status updates by Friday",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      priority: "medium",
    },
    {
      type: "achievement",
      icon: CheckCircle,
      title: "Client satisfaction score: 4.8/5",
      description: "Based on recent feedback from 12 clients",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      priority: "low",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              AI Insights
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Smart notifications and recommendations
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
        >
          View all
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 p-5 transition-all duration-300 hover:shadow-md ${
              insight.priority === "high"
                ? "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border-red-200 dark:border-red-800/50"
                : "bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm"
            }`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg ${insight.bgColor} flex items-center justify-center`}
              >
                <insight.icon className={`h-5 w-5 ${insight.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  {insight.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {insight.description}
                </p>
              </div>
              {insight.priority === "high" && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </div>
              )}
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/0 to-slate-900/0 group-hover:from-slate-900/[0.02] group-hover:to-slate-900/[0.02] transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm" className="text-xs">
          <MessageSquare className="mr-2 h-3 w-3" />
          Reply to all
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          <Clock className="mr-2 h-3 w-3" />
          Schedule updates
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          <TrendingUp className="mr-2 h-3 w-3" />
          View analytics
        </Button>
      </div>
    </div>
  );
};

export default AIInsightsSection;
