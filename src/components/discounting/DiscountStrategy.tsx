
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Edit, Gauge, ShoppingCart, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface DiscountStrategyProps {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'paused';
  strategy: {
    type: 'percentage' | 'fixed' | 'shipping' | 'gift';
    value: number;
    condition?: string;
  };
  segments: string[];
  conversionRate: number;
  applicableOrders: number;
  totalOrders: number;
  onClick?: () => void;
}

export function DiscountStrategy({ 
  id, 
  name, 
  status, 
  strategy, 
  segments, 
  conversionRate,
  applicableOrders,
  totalOrders,
  onClick
}: DiscountStrategyProps) {
  const { toast } = useToast();
  
  const getStrategyText = () => {
    switch (strategy.type) {
      case 'percentage':
        return `${strategy.value}% off`;
      case 'fixed':
        return `$${strategy.value} off`;
      case 'shipping':
        return 'Free shipping';
      case 'gift':
        return `Free gift (value: $${strategy.value})`;
      default:
        return 'Custom discount';
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'paused':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleActivate = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Strategy activated",
      description: `The discount strategy "${name}" has been activated.`
    });
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // This would open the edit modal in a real implementation
  };
  
  return (
    <Card 
      className="border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">{name}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={getStatusColor()} variant="outline">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
              <Badge variant="outline" className="bg-primary/10 font-normal">
                {getStrategyText()}
              </Badge>
              {strategy.condition && (
                <span className="text-xs text-muted-foreground">{strategy.condition}</span>
              )}
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Applied to: </span>
            <div className="flex items-center gap-1 flex-wrap">
              {segments.map((segment, i) => (
                <Badge key={i} variant="secondary" className="font-normal">
                  {segment}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1.5">
                <Gauge className="h-4 w-4 text-green-600" />
                <span>Conversion rate:</span>
              </div>
              <span className="font-medium">{conversionRate}%</span>
            </div>
            <Progress value={conversionRate} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1.5">
                <ShoppingCart className="h-4 w-4 text-shopify" />
                <span>Applicable orders:</span>
              </div>
              <span className="font-medium">{applicableOrders} / {totalOrders}</span>
            </div>
            <Progress value={(applicableOrders/totalOrders)*100} className="h-1.5" />
          </div>
          
          <div className="flex justify-between pt-2 gap-2">
            {status !== 'active' ? (
              <Button 
                onClick={handleActivate} 
                variant="outline" 
                className="flex-1 bg-shopify text-white hover:bg-shopify-600"
                size="sm"
              >
                Activate
              </Button>
            ) : (
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  toast({
                    title: "Strategy paused",
                    description: `The discount strategy "${name}" has been paused.`
                  });
                }} 
                variant="outline" 
                className="flex-1"
                size="sm"
              >
                Pause
              </Button>
            )}
            <Button 
              onClick={handleEdit} 
              variant="outline" 
              size="sm" 
              className="flex-1"
            >
              <Edit className="h-3.5 w-3.5 mr-1" /> Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
