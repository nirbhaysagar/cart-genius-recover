
import React, { ReactNode, CSSProperties } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    direction: "up" | "down";
    period?: string;
  };
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function StatCard({ title, value, change, icon, className, style }: StatCardProps) {
  return (
    <Card className={cn("dashboard-card card-hover overflow-hidden", className)} style={style}>
      <CardContent className="p-0 relative">
        {/* Background pattern for visual interest */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-5 -mr-8 -mt-8">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="flex justify-between items-start relative">
          <div className="space-y-2">
            <p className="stat-label">{title}</p>
            <p className="stat-value">{value}</p>
            
            {change && (
              <div className={change.direction === "up" ? "trend-up" : "trend-down"}>
                {change.direction === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span className="text-sm font-medium">{change.value} {change.period && <span className="text-muted-foreground text-xs">({change.period})</span>}</span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center transform transition-transform hover:scale-110">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
