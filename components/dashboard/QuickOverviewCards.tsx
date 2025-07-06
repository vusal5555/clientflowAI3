import React from "react";
import { Project } from "@/lib/mock-data";
import {
  FolderOpen,
  MessageSquare,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface QuickOverviewCardsProps {
  projects: Project[];
}

const QuickOverviewCards: React.FC<QuickOverviewCardsProps> = ({
  projects,
}) => {
  // Calculate metrics
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const feedbackAwaiting = projects.filter(
    (p) => p.status === "active" && Math.random() > 0.5
  ).length; // Mock data
  const newUpdates = projects.filter(
    (p) => p.status === "active" && Math.random() > 0.7
  ).length; // Mock data
  const clientsWaiting = Math.floor(Math.random() * 5) + 1; // Mock data

  const cards = [
    {
      title: "Active Projects",
      value: activeProjects,
      icon: FolderOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      description: "Currently in progress",
    },
    {
      title: "Feedback Awaiting",
      value: feedbackAwaiting,
      icon: MessageSquare,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
      description: "Client responses needed",
    },
    {
      title: "New Updates",
      value: newUpdates,
      icon: Bell,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
      description: "Recent activity",
    },
    {
      title: "Clients Waiting",
      value: clientsWaiting,
      icon: Clock,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
      description: "For your response",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />

          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${card.bgColor} mb-4`}
              >
                <card.icon className={`h-6 w-6 ${card.textColor}`} />
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {card.value}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {card.description}
              </p>
            </div>

            {/* Decorative element */}
            <div
              className={`w-16 h-16 rounded-full ${card.bgColor} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickOverviewCards;
