"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { ModeToggle } from "../theme-provider/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth.client";
import { useRouter } from "next/navigation";

interface TopNavbarProps {
  pageTitle?: string;
  className?: string;
  onMenuClick?: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({
  pageTitle = "Dashboard",
  className,
  onMenuClick,
}) => {
  const router = useRouter();

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  };

  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm",
        className
      )}
    >
      {/* Left side - Menu button and title */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden md:block">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Center - Page title for mobile */}
      <div className="md:hidden">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
          {pageTitle}
        </h1>
      </div>

      {/* Right side - Search, notifications, user */}
      <div className="flex items-center space-x-3">
        <ModeToggle />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </Button>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
            >
              <Avatar className="h-8 w-8 border-2 border-slate-200 dark:border-slate-600">
                <AvatarImage src="/api/placeholder/32/32" alt="User" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex items-center space-x-1">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  John Doe
                </span>
                <ChevronDown className="h-3 w-3 text-slate-500 dark:text-slate-400" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700"
          >
            <DropdownMenuLabel className="text-slate-900 dark:text-white">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                  john.doe@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
            <DropdownMenuItem className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
            <DropdownMenuItem
              onClick={logout}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNavbar;
