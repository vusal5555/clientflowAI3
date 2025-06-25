"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { RefreshCw, Edit, Save, X, Clock } from "lucide-react";
import { Textarea } from "../ui/textarea";

export interface AIStatusUpdatesProps {
  initialUpdate?: string;
  lastGenerated?: string;
  onRegenerate?: () => void;
  onSave?: (update: string) => void;
  className?: string;
}

const AIStatusUpdates: React.FC<AIStatusUpdatesProps> = ({
  initialUpdate = "The project is progressing well with the frontend development phase. The team has completed 65% of the UI components and is now focusing on integration with the backend APIs. Key milestones achieved include user authentication flow and dashboard layout implementation.",
  lastGenerated = "2024-01-15T10:30:00Z",
  onRegenerate,
  onSave,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [update, setUpdate] = useState(initialUpdate);
  const [tempUpdate, setTempUpdate] = useState(initialUpdate);

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate();
    } else {
      // Mock regeneration
      const mockUpdates = [
        "Development is on track with the mobile app reaching 75% completion. The team has successfully implemented core features including push notifications and offline functionality.",
        "Project milestones are being met ahead of schedule. The backend API integration is complete and the team is now focusing on performance optimization and testing.",
        "Significant progress made on the e-commerce platform redesign. User testing feedback has been positive and the team is implementing final UI refinements.",
      ];
      const randomUpdate =
        mockUpdates[Math.floor(Math.random() * mockUpdates.length)];
      setUpdate(randomUpdate);
      setTempUpdate(randomUpdate);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempUpdate(update);
  };

  const handleSave = () => {
    setUpdate(tempUpdate);
    setIsEditing(false);
    if (onSave) {
      onSave(tempUpdate);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempUpdate(update);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card
      className={`bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
            AI Status Updates
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="h-3 w-3" />
            <span>Last updated: {formatTimestamp(lastGenerated)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={tempUpdate}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTempUpdate(e.target.value)
              }
              className="min-h-[100px] resize-none bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
              placeholder="Enter project status update..."
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button onClick={handleCancel} size="sm" variant="outline">
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {update}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleRegenerate}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Regenerate
              </Button>
              <Button onClick={handleEdit} size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIStatusUpdates;
