
import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GuidedTooltipProps {
  id: string;
  title?: string;
  description: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  defaultOpen?: boolean;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function GuidedTooltip({
  id,
  title,
  description,
  children,
  onDismiss,
  defaultOpen = false,
  className,
  side = "bottom",
  align = "center",
}: GuidedTooltipProps) {
  const [isOpen, setIsOpen] = useState(() => {
    // Check if tooltip has been dismissed before
    const dismissed = localStorage.getItem(`tooltip-dismissed-${id}`);
    return defaultOpen && !dismissed;
  });

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem(`tooltip-dismissed-${id}`, "true");
    if (onDismiss) onDismiss();
  };

  if (!isOpen) return <>{children}</>;

  return (
    <TooltipProvider>
      <Tooltip defaultOpen={true} open={isOpen}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={cn("w-80 p-0 shadow-lg", className)}
        >
          <div className="relative flex flex-col space-y-1.5 p-4">
            <div className="absolute right-2 top-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-5 w-5"
                onClick={handleDismiss}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            {title && <h3 className="font-medium">{title}</h3>}
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="border-t p-3 flex justify-end bg-muted/50">
            <Button size="sm" variant="outline" onClick={handleDismiss}>
              Got it
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
