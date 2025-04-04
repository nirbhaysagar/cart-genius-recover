
import React, { ReactNode, CSSProperties } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  action?: ReactNode;
  footer?: ReactNode;
  padding?: "none" | "small" | "normal";
  headerClassName?: string;
  contentClassName?: string;
}

export function ChartCard({ 
  title, 
  description, 
  children, 
  className, 
  style, 
  action,
  footer,
  padding = "normal",
  headerClassName,
  contentClassName
}: ChartCardProps) {
  
  const getPadding = () => {
    switch (padding) {
      case "none": return "p-0";
      case "small": return "p-3 pb-2";
      case "normal": return "p-5 pb-3";
      default: return "p-5 pb-3";
    }
  };
  
  return (
    <Card className={cn("monterey-card dashboard-card hover:shadow-monterey-hover dark:hover:shadow-monterey-hover-dark", className)} style={style}>
      <CardHeader className={cn(getPadding(), "flex flex-row items-start justify-between", headerClassName)}>
        <div>
          <CardTitle className="text-base md:text-lg font-semibold">{title}</CardTitle>
          {description && <p className="text-xs md:text-sm text-muted-foreground">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className={cn("p-0 md:p-0 overflow-hidden", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <div className="p-5 pt-3 border-t mt-auto">
          {footer}
        </div>
      )}
    </Card>
  );
}
