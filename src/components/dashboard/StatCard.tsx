
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
  onClick?: () => void;
}

export function StatCard({ title, value, change, icon, className, style, onClick }: StatCardProps) {
  return (
    <Card 
      className={cn(
        "monterey-card dashboard-card overflow-hidden transition-all duration-300", 
        onClick && "cursor-pointer hover:scale-[1.02]",
        className
      )} 
      style={style}
      onClick={onClick}
    >
      <CardContent className="p-5 relative">
        <div className="flex justify-between items-start relative">
          <div className="space-y-2">
            <p className="stat-label text-xs md:text-sm">{title}</p>
            <p className="stat-value text-xl md:text-2xl font-semibold">{value}</p>
            
            {change && (
              <div className={cn(
                "flex items-center gap-1",
                change.direction === "up" ? "trend-up text-green-500" : "trend-down text-red-500"
              )}>
                {change.direction === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span className="text-xs md:text-sm font-medium">
                  {change.value} {change.period && <span className="text-muted-foreground text-xs">({change.period})</span>}
                </span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl glass flex items-center justify-center transition-transform hover:scale-110">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
