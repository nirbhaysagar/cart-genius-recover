
import React, { useState } from 'react';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { DiscountStrategy } from '@/components/discounting/DiscountStrategy';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertCircle,
  ArrowRight,
  BrainCircuit,
  ChevronDown,
  Gauge,
  Plus,
  Sparkles,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for discount strategies
const mockStrategies = [
  {
    id: '1',
    name: 'High-value cart recovery',
    status: 'active' as const,
    strategy: {
      type: 'percentage' as const,
      value: 15,
      condition: 'For carts over $100'
    },
    segments: ['High-value', 'Returning customers'],
    conversionRate: 32,
    applicableOrders: 87,
    totalOrders: 220
  },
  {
    id: '2',
    name: 'New customer welcome discount',
    status: 'active' as const,
    strategy: {
      type: 'fixed' as const,
      value: 10,
      condition: 'First-time abandoners'
    },
    segments: ['New customers'],
    conversionRate: 28,
    applicableOrders: 43,
    totalOrders: 130
  },
  {
    id: '3',
    name: 'Premium customer loyalty',
    status: 'draft' as const,
    strategy: {
      type: 'shipping' as const,
      value: 0,
    },
    segments: ['VIP', 'High LTV'],
    conversionRate: 0,
    applicableOrders: 12,
    totalOrders: 40
  },
  {
    id: '4',
    name: 'Holiday flash offer',
    status: 'paused' as const,
    strategy: {
      type: 'percentage' as const,
      value: 20,
      condition: 'Limited 24-hour window'
    },
    segments: ['All segments'],
    conversionRate: 38,
    applicableOrders: 156,
    totalOrders: 320
  }
];

export function SmartDiscount() {
  const { toast } = useToast();
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  const isMobile = useIsMobile();
  
  const handleGenerateAI = () => {
    setShowAiSuggestion(true);
  };
  
  const handleApplySuggestion = () => {
    setShowAiSuggestion(false);
    toast({
      title: "AI strategy applied",
      description: "The AI-suggested discount strategy has been created and is ready for review.",
    });
  };
  
  const handleViewStrategy = (id: string) => {
    toast({
      title: "Strategy details",
      description: `Viewing detailed analytics for strategy #${id}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            Smart Discounting
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <Sparkles className="h-3 w-3 mr-1" /> AI Powered
            </Badge>
          </h2>
          <p className="text-muted-foreground">Personalized recovery incentives that maximize conversions</p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button onClick={handleGenerateAI} className="bg-shopify hover:bg-shopify-600 flex-1 sm:flex-auto">
            <BrainCircuit className="h-4 w-4 mr-2" />
            Generate AI Strategy
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-auto">
            <Plus className="h-4 w-4 mr-2" />
            New Strategy
          </Button>
        </div>
      </div>
      
      {/* AI Suggestion Dialog */}
      <Dialog open={showAiSuggestion} onOpenChange={setShowAiSuggestion}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-purple-500" />
              AI-Generated Discount Strategy
            </DialogTitle>
            <DialogDescription>
              Based on your store data, we've generated an optimal discount strategy to maximize recovery.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="border rounded-md p-3 bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Recommended Strategy</h4>
                <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">High Confidence</Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Discount Type:</span>
                  <span className="font-medium">Dynamic Percentage (10-15%)</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Target Segment:</span>
                  <span className="font-medium">Returning Customers with 2+ previous purchases</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Timing:</span>
                  <span className="font-medium">1 hour after abandonment + 24 hour expiry</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Predicted Conversion Lift:</span>
                  <span className="font-medium text-green-600">+24% vs standard recovery</span>
                </div>
              </div>
            </div>
            
            <div className="border border-l-4 border-l-amber-500 rounded-md p-3 bg-amber-50 dark:bg-amber-950/20">
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-700 dark:text-amber-400">Insight</h4>
                  <p className="text-sm text-amber-700/80 dark:text-amber-400/80">
                    This customer segment responds better to percentage-based discounts with urgency 
                    triggers than to free shipping offers based on historical data.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAiSuggestion(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplySuggestion} className="bg-shopify hover:bg-shopify-600">
              Apply Strategy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Discount Strategy Performance Overview */}
      <ChartCard 
        title="Discount Strategy Performance" 
        description="Last 30 days conversion impact"
        padding="small"
      >
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-muted/20 border">
            <CardContent className="p-4 flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <Gauge className="h-4 w-4 text-shopify" />
                <span className="text-sm font-medium">Average Conversion Rate</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold">28.4%</span>
                <span className="text-xs text-green-600 flex items-center">
                  +5.2%
                  <ArrowRight className="h-3 w-3 rotate-45 ml-0.5" />
                </span>
              </div>
              <span className="text-xs text-muted-foreground">vs 23.2% without discounts</span>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/20 border">
            <CardContent className="p-4 flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <Users className="h-4 w-4 text-shopify" />
                <span className="text-sm font-medium">Customer Segments</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold">4</span>
              </div>
              <span className="text-xs text-muted-foreground">Active personalized strategies</span>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/20 border">
            <CardContent className="p-4 flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="h-4 w-4 text-shopify" />
                <span className="text-sm font-medium">AI Optimization Score</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold">87/100</span>
                <span className="text-xs text-amber-600 flex items-center">
                  Room for improvement
                </span>
              </div>
              <Button variant="link" className="text-shopify p-0 h-auto text-xs justify-start">
                View optimization suggestions
              </Button>
            </CardContent>
          </Card>
        </div>
      </ChartCard>
      
      {/* Discount Strategies */}
      <div className="space-y-4">
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Strategies</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="text-xs md:text-sm flex items-center gap-1">
              Sort by: Performance <ChevronDown className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-4">
            <div className={`grid grid-cols-1 ${isMobile ? "" : "md:grid-cols-2 xl:grid-cols-3"} gap-4`}>
              {mockStrategies.map(strategy => (
                <DiscountStrategy
                  key={strategy.id}
                  {...strategy}
                  onClick={() => handleViewStrategy(strategy.id)}
                />
              ))}
              
              {/* "Create Strategy" Card */}
              <Card className="border border-dashed bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                  <div className="rounded-full bg-background p-3 mb-4">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Create a new strategy</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Set up personalized discount rules for specific customer segments
                  </p>
                  <Button className="bg-shopify hover:bg-shopify-600">
                    New Strategy
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">Viewing active strategies only</p>
            </div>
          </TabsContent>
          
          <TabsContent value="draft" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">Viewing draft strategies only</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
