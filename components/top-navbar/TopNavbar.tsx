"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Menu, ChevronDown } from "lucide-react";

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
  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between px-6 border-b border-border bg-background",
        className
      )}
    >
      {/* Left side - Menu button and title */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden md:block">
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
        </div>
      </div>

      {/* Center - Page title for mobile */}
      <div className="md:hidden">
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
      </div>

      {/* Right side - Search, notifications, user */}
      <div className="flex items-center space-x-3">
        {/* Search */}
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Search className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </Button>

        {/* User Avatar */}
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/api/placeholder/32/32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex items-center space-x-1">
            <span className="text-sm font-medium">John Doe</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
