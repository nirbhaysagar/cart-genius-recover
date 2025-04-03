
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
}

export function ChartCard({ title, description, children, className, style, action }: ChartCardProps) {
  return (
    <Card className={cn("dashboard-card card-hover", className)} style={style}>
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base md:text-lg font-semibold">{title}</CardTitle>
          {description && <p className="text-xs md:text-sm text-muted-foreground">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="p-0 md:p-0 overflow-hidden">{children}</CardContent>
    </Card>
  );
}
