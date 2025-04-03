
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
        "dashboard-card card-hover overflow-hidden transition-all duration-200", 
        onClick && "cursor-pointer hover:scale-[1.01]",
        className
      )} 
      style={style}
      onClick={onClick}
    >
      <CardContent className="p-4 relative">
        {/* Background gradient for visual interest instead of diamond shape */}
        <div className="absolute top-0 right-0 bottom-0 w-1/3 opacity-5 bg-gradient-to-l from-current to-transparent" />
        
        <div className="flex justify-between items-start relative">
          <div className="space-y-2">
            <p className="stat-label text-xs md:text-sm">{title}</p>
            <p className="stat-value text-xl md:text-2xl">{value}</p>
            
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
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center transform transition-transform hover:scale-110">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
