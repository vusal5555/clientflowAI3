"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, MessageSquare, User, Clock } from "lucide-react";

export interface FeedbackEntry {
  id: string;
  text: string;
  timestamp: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

export interface ClientFeedbackProps {
  initialFeedback?: FeedbackEntry[];
  onFeedbackSubmit?: (feedback: string) => void;
  className?: string;
}

const ClientFeedback: React.FC<ClientFeedbackProps> = ({
  initialFeedback = [],
  onFeedbackSubmit,
  className,
}) => {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>(initialFeedback);
  const [newFeedback, setNewFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = () => {
    if (newFeedback.trim() && !isSubmitting) {
      setIsSubmitting(true);

      const feedbackEntry: FeedbackEntry = {
        id: Date.now().toString(),
        text: newFeedback.trim(),
        timestamp: new Date().toISOString(),
        author: {
          name: "Client",
          avatar: "",
        },
      };

      const updatedFeedback = [feedbackEntry, ...feedback];
      setFeedback(updatedFeedback);
      setNewFeedback("");

      if (onFeedbackSubmit) {
        onFeedbackSubmit(newFeedback.trim());
      }

      // Simulate API delay
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitFeedback();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card
      className={`bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
          Client Feedback
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Submit Feedback Form */}
        <div className="space-y-3">
          <Textarea
            value={newFeedback}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewFeedback(e.target.value)
            }
            onKeyPress={handleKeyPress}
            placeholder="Share your feedback about this project..."
            className="min-h-[100px] resize-none bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Press Enter to submit, Shift+Enter for new line
            </p>
            <Button
              onClick={handleSubmitFeedback}
              disabled={!newFeedback.trim() || isSubmitting}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1" />
                  Send Feedback
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-3">
          {feedback.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-slate-400" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No feedback yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            feedback.map((entry) => (
              <div
                key={entry.id}
                className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={entry.author?.avatar} />
                    <AvatarFallback className="bg-slate-200 dark:bg-slate-600">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {entry.author?.name || "Anonymous"}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Client
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(entry.timestamp)}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {entry.text}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {feedback.length > 0 && (
          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-600">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {feedback.length} feedback entr
              {feedback.length === 1 ? "y" : "ies"}
            </span>
            <Badge variant="secondary" className="text-xs">
              Latest: {formatTimestamp(feedback[0]?.timestamp || "")}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientFeedback;
