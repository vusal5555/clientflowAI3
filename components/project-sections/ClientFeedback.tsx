"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, MessageSquare, User, Clock, Reply } from "lucide-react";
import { Input } from "../ui/input";

export interface FeedbackEntry {
  id: string;
  text: string;
  timestamp: string;
  role: "client" | "owner";
  parentId?: string;
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
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleSubmitFeedback = () => {
    if (newFeedback.trim() && !isSubmitting) {
      setIsSubmitting(true);
      const feedbackEntry: FeedbackEntry = {
        id: Date.now().toString(),
        text: newFeedback.trim(),
        timestamp: new Date().toISOString(),
        role: "client",
        author: { name: authorName || "Anonymous" },
      };
      setFeedback((prev) => [feedbackEntry, ...prev]);
      setNewFeedback("");
      onFeedbackSubmit?.(newFeedback.trim());
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  const handleReply = (parentId: string) => {
    if (!replyText.trim()) return;
    const replyEntry: FeedbackEntry = {
      id: Date.now().toString(),
      text: replyText.trim(),
      timestamp: new Date().toISOString(),
      role: "owner",
      parentId,
      author: { name: "Agency Owner" },
    };
    setFeedback((prev) => [replyEntry, ...prev]);
    setReplyText("");
    setReplyingTo(null);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  const renderReplies = (parentId: string) =>
    feedback
      .filter((entry) => entry.parentId === parentId)
      .map((reply) => (
        <div
          key={reply.id}
          className="ml-10 mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
        >
          <div className="flex items-start gap-3">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-slate-200 dark:bg-slate-600">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {reply.author?.name || "Owner"}
                </span>
                <Badge
                  variant="secondary"
                  className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50"
                >
                  Owner
                </Badge>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimestamp(reply.timestamp)}</span>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {reply.text}
              </p>
            </div>
          </div>
        </div>
      ));

  const topLevelFeedback = feedback.filter((entry) => !entry.parentId);

  return (
    <Card
      className={`bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
          Client Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* New Feedback */}
        <div className="space-y-3">
          <Input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name"
            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
          />
          <Textarea
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="Leave feedback for this project..."
            className="resize-none bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmitFeedback();
              }
            }}
          />
          <div className="flex justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Press Enter to submit, Shift+Enter for newline
            </p>
            <Button
              onClick={handleSubmitFeedback}
              size="sm"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-1" /> Send
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Feedback List */}
        {topLevelFeedback.length === 0 ? (
          <div className="text-center py-6">
            <MessageSquare className="mx-auto text-slate-400 dark:text-slate-500 mb-2" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No feedback yet.
            </p>
          </div>
        ) : (
          topLevelFeedback.map((entry) => (
            <div
              key={entry.id}
              className="p-4 border rounded-lg bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={entry.author?.avatar} />
                  <AvatarFallback className="bg-slate-200 dark:bg-slate-600">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {entry.author?.name || "Anonymous"}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50"
                    >
                      Client
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimestamp(entry.timestamp)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {entry.text}
                  </p>
                  <div className="mt-2">
                    {replyingTo === entry.id ? (
                      <div className="space-y-2 mt-2">
                        <Textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="resize-none bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
                          placeholder="Write a reply..."
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleReply(entry.id)}
                            disabled={!replyText.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Reply
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setReplyingTo(null)}
                            className="border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setReplyingTo(entry.id)}
                        className="mt-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Reply className="w-3 h-3 mr-1" /> Reply
                      </Button>
                    )}
                  </div>

                  {/* Replies */}
                  {renderReplies(entry.id)}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ClientFeedback;
