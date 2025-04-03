
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, Trophy, DollarSign } from "lucide-react";

interface ProgressTrackerProps {
  title: string;
  currentAmount: number;
  targetAmount: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function ProgressTracker({
  title,
  currentAmount,
  targetAmount,
  prefix = "",
  suffix = "",
  className,
}: ProgressTrackerProps) {
  const percentage = Math.min(100, Math.round((currentAmount / targetAmount) * 100));
  
  const formatValue = (value: number) => {
    return `${prefix}${value.toLocaleString()}${suffix}`;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2">
          <Trophy className="h-5 w-5 text-shopify" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">
                {formatValue(currentAmount)}
              </p>
              <p className="text-sm text-muted-foreground">
                of {formatValue(targetAmount)} target
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold flex items-center gap-1">
                {percentage}%
                <TrendingUp className={cn(
                  "h-4 w-4",
                  percentage >= 80 ? "text-green-600" :
                  percentage >= 50 ? "text-amber-600" : "text-blue-600"
                )} />
              </div>
              <p className="text-xs text-muted-foreground">of goal</p>
            </div>
          </div>
          
          <div className="overflow-hidden rounded-full bg-muted h-3">
            <div 
              className="h-full rounded-full" 
              style={{ 
                width: `${percentage}%`, 
                background: `linear-gradient(90deg, #005744 0%, #008060 ${percentage}%)`,
                transition: "width 1s ease-in-out",
              }}
            ></div>
          </div>
          
          {percentage >= 100 && (
            <div className="rounded-lg bg-shopify-50 p-3 text-center text-sm font-medium text-shopify-700 border border-shopify-200 flex items-center justify-center gap-2">
              <DollarSign className="h-5 w-5" />
              <span>Congratulations! You've reached your target.</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
