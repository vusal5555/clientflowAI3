"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Check, ExternalLink, Link } from "lucide-react";

export interface ShareButtonProps {
  projectId: string;
  projectName?: string;
  onShare?: (link: string) => void;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  projectId,
  onShare,
  className,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    // Only set the share link when we're in the browser
    if (typeof window !== "undefined") {
      setShareLink(`${window.location.origin}/shared/project/${projectId}`);
    }
  }, [projectId]);

  const handleShare = () => {
    setShowLink(true);
    if (onShare && shareLink) {
      onShare(shareLink);
    }
  };

  const handleCopyLink = async () => {
    if (!shareLink) return;

    try {
      await navigator.clipboard.writeText(shareLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleOpenLink = () => {
    if (shareLink) {
      window.open(shareLink, "_blank");
    }
  };

  return (
    <Card
      className={`bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
          Share Project
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!showLink ? (
          <div className="text-center space-y-3">
            <div className="h-12 w-12 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Share2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                Share this project with your client
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate a public link that allows clients to view project
                updates
              </p>
            </div>
            <Button
              onClick={handleShare}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share with Client
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Link className="h-3 w-3 mr-1" />
                Public Link
              </Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Anyone with this link can view the project
              </span>
            </div>

            <div className="flex gap-2">
              <Input
                value={shareLink}
                readOnly
                className="flex-1 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm"
              />
              <Button
                onClick={handleCopyLink}
                size="sm"
                variant="outline"
                className="flex-shrink-0"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 mr-1 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleOpenLink}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Open Link
              </Button>
              <Button
                onClick={() => setShowLink(false)}
                size="sm"
                variant="ghost"
              >
                Close
              </Button>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                <strong>Note:</strong> This link provides read-only access to
                the project overview. Clients can view progress, files, and
                feedback but cannot make changes.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShareButton;
