
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
      case "small": return "p-2 pb-1";
      case "normal": return "p-4 pb-2";
      default: return "p-4 pb-2";
    }
  };
  
  return (
    <Card className={cn("dashboard-card card-hover", className)} style={style}>
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
        <div className="p-4 pt-2 border-t mt-auto">
          {footer}
        </div>
      )}
    </Card>
  );
}
