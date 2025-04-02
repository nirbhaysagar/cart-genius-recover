
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart } from "@/components/charts/BarChart";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Plus } from "lucide-react";

const testData = [
  {
    id: "1",
    name: "Subject Line Test",
    status: "running",
    variants: 2,
    duration: "14 days",
    startDate: "May 5, 2023",
    results: [
      { name: "Variant A", opens: 38, clicks: 12, conversions: 8 },
      { name: "Variant B", opens: 42, clicks: 15, conversions: 11 }
    ]
  },
  {
    id: "2",
    name: "Discount Amount Test",
    status: "completed",
    variants: 2,
    duration: "30 days",
    startDate: "April 1, 2023",
    results: [
      { name: "10% off", opens: 40, clicks: 14, conversions: 9 },
      { name: "Free shipping", opens: 43, clicks: 18, conversions: 12 }
    ]
  },
  {
    id: "3",
    name: "Send Time Test",
    status: "running",
    variants: 3,
    duration: "21 days",
    startDate: "April 28, 2023",
    results: [
      { name: "Morning", opens: 36, clicks: 10, conversions: 7 },
      { name: "Afternoon", opens: 41, clicks: 14, conversions: 10 },
      { name: "Evening", opens: 39, clicks: 12, conversions: 8 }
    ]
  }
];

const Testing = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">A/B Testing</h2>
          <p className="text-muted-foreground">Test different recovery strategies to optimize your conversion rates.</p>
        </div>
        <Button className="bg-shopify hover:bg-shopify-600">
          <Plus className="mr-2 h-4 w-4" /> New Test
        </Button>
      </div>

      {/* Test Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="running">Running</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="space-y-6">
            {testData.map((test) => (
              <Card key={test.id} className="border shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{test.name}</CardTitle>
                      <CardDescription>
                        {test.variants} variants • Started {test.startDate} • {test.duration}
                      </CardDescription>
                    </div>
                    <Badge variant={test.status === "running" ? "default" : "secondary"}>
                      {test.status === "running" ? "Running" : "Completed"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ChartCard title="Open Rate (%)">
                      <BarChart 
                        data={test.results}
                        bars={[{ dataKey: "opens", name: "Open Rate (%)", color: "#3b82f6" }]}
                        height={200}
                      />
                    </ChartCard>
                    <ChartCard title="Click Rate (%)">
                      <BarChart 
                        data={test.results}
                        bars={[{ dataKey: "clicks", name: "Click Rate (%)", color: "#8b5cf6" }]}
                        height={200}
                      />
                    </ChartCard>
                    <ChartCard title="Conversion Rate (%)">
                      <BarChart 
                        data={test.results}
                        bars={[{ dataKey: "conversions", name: "Conversion Rate (%)", color: "#10b981" }]}
                        height={200}
                      />
                    </ChartCard>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    {test.status === "completed" 
                      ? <span className="text-green-600 font-medium">Winner: {test.results.reduce((prev, current) => (prev.conversions > current.conversions) ? prev : current).name}</span>
                      : <span>Results updating in real-time</span>
                    }
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="running" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Viewing running tests only</p>
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Viewing completed tests only</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Testing;
