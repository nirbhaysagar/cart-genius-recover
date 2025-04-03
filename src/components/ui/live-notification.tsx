
import React, { useState, useEffect } from "react";
import { X, AlertCircle, CheckCircle2, InfoIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const notificationVariants = cva(
  "fixed flex items-start gap-3 shadow-lg border rounded-lg p-4 transition-all duration-500 bg-background",
  {
    variants: {
      position: {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
      },
      variant: {
        default: "border-border",
        info: "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
        success: "border-green-500 bg-green-50 dark:bg-green-900/20",
        warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
        error: "border-red-500 bg-red-50 dark:bg-red-900/20",
      },
      size: {
        default: "w-80",
        sm: "w-72",
        lg: "w-96",
      },
    },
    defaultVariants: {
      position: "top-right",
      variant: "default",
      size: "default",
    },
  }
);

export interface LiveNotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
  visible?: boolean;
}

export function LiveNotification({
  title,
  description,
  icon,
  autoClose = true,
  duration = 5000,
  onClose,
  visible = true,
  position,
  variant,
  size,
  className,
  ...props
}: LiveNotificationProps) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, isVisible, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const getDefaultIcon = () => {
    switch (variant) {
      case "info":
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-foreground" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        notificationVariants({ position, variant, size }),
        "animate-in slide-in-from-right-5 fade-in-0 z-50",
        className
      )}
      {...props}
    >
      <div className="mt-0.5">{icon || getDefaultIcon()}</div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={handleClose}
        className="opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}
