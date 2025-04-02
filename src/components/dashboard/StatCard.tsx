
import React, { ReactNode } from "react";
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
}

export function StatCard({ title, value, change, icon, className }: StatCardProps) {
  return (
    <Card className={cn("dashboard-card", className)}>
      <CardContent className="p-0">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="stat-label">{title}</p>
            <p className="stat-value">{value}</p>
            
            {change && (
              <div className={change.direction === "up" ? "trend-up" : "trend-down"}>
                {change.direction === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span className="text-sm font-medium">{change.value} {change.period && `(${change.period})`}</span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
