"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Settings,
  Home,
  Users,
  FileText,
  Bell,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    name: "Files",
    href: "/files",
    icon: FileText,
  },
  {
    name: "Feedback",
    href: "/feedback",
    icon: MessageSquare,
  },
  {
    name: "Clients",
    href: "/clients",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();

  const date = new Date();
  const year = date.getFullYear();

  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border-r border-slate-200 dark:border-slate-700",
        className
      )}
    >
      {/* Logo/Brand */}
      <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-700">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Home className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            ClientFlow
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start space-x-3 h-12 transition-all duration-200 cursor-pointer rounded-xl",
                  isActive
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-500 dark:text-slate-400"
                  )}
                />
                <span className="font-medium">{item.name}</span>
                {item.name === "Feedback" && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </div>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start space-x-2 h-10 text-xs"
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
            <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
          © {year} ClientFlow
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
