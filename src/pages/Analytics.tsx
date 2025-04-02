
import React from "react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { LineAreaChart } from "@/components/charts/LineAreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for charts
const behaviorData = [
  { name: "Price concerns", percentage: 35 },
  { name: "Shipping cost", percentage: 25 },
  { name: "Just browsing", percentage: 20 },
  { name: "Payment issues", percentage: 12 },
  { name: "Website issues", percentage: 8 }
];

const checkoutFunnelData = [
  { name: "Add to Cart", completed: 100 },
  { name: "View Cart", completed: 70 },
  { name: "Start Checkout", completed: 45 },
  { name: "Add Info", completed: 30 },
  { name: "Payment", completed: 18 },
  { name: "Complete", completed: 15 }
];

const visitorSegmentData = [
  { name: "New visitors", abandoned: 68, recovered: 22 },
  { name: "Returning", abandoned: 52, recovered: 32 }
];

const timeSpentData = [
  { name: "Under 1m", percentage: 15 },
  { name: "1-3m", percentage: 30 },
  { name: "3-5m", percentage: 25 },
  { name: "5-10m", percentage: 20 },
  { name: "10m+", percentage: 10 }
];

const Analytics = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Behavior Analytics</h2>
          <p className="text-muted-foreground">Understand why customers abandon their carts and optimize your recovery strategy.</p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Analytics Content */}
      <Tabs defaultValue="behavior" className="space-y-6">
        <TabsList>
          <TabsTrigger value="behavior">Abandonment Reasons</TabsTrigger>
          <TabsTrigger value="funnel">Checkout Funnel</TabsTrigger>
          <TabsTrigger value="segments">Visitor Segments</TabsTrigger>
        </TabsList>

        {/* Abandonment Reasons Tab */}
        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Top Abandonment Reasons"
              description="Based on exit surveys and behavior patterns"
            >
              <BarChart
                data={behaviorData}
                bars={[
                  { dataKey: "percentage", name: "Percentage (%)", color: "#f97316" }
                ]}
                layout="horizontal"
              />
            </ChartCard>
            <ChartCard
              title="Time Spent Before Abandonment"
              description="Average session duration before cart abandonment"
            >
              <BarChart
                data={timeSpentData}
                bars={[
                  { dataKey: "percentage", name: "Percentage (%)", color: "#8b5cf6" }
                ]}
                layout="horizontal"
              />
            </ChartCard>
          </div>

          {/* Insights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Price Sensitivity</h3>
                <p className="text-muted-foreground mb-4">
                  35% of customers abandon their carts due to price concerns. Consider adjusting your discount strategy in recovery emails.
                </p>
                <div className="h-2 bg-muted rounded-full mt-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Shipping Friction</h3>
                <p className="text-muted-foreground mb-4">
                  25% abandon due to shipping costs. Consider offering free shipping in your recovery campaigns.
                </p>
                <div className="h-2 bg-muted rounded-full mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Payment Issues</h3>
                <p className="text-muted-foreground mb-4">
                  12% of customers face payment issues. Adding alternative payment methods may improve conversion.
                </p>
                <div className="h-2 bg-muted rounded-full mt-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Checkout Funnel Tab */}
        <TabsContent value="funnel" className="space-y-6">
          <ChartCard
            title="Checkout Funnel Analysis"
            description="Percentage of users completing each checkout step"
          >
            <div className="h-[400px]">
              <BarChart
                data={checkoutFunnelData}
                bars={[
                  { dataKey: "completed", name: "Completion Rate (%)", color: "#10b981" }
                ]}
                height={350}
              />
            </div>
          </ChartCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Funnel Insights</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span>Largest drop-off (25%) occurs between View Cart and Start Checkout</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span>15% drop-off during payment information entry</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    <span>Only 33% of checkout starts result in completed purchases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Recovery campaigns most effective when targeting users who reached payment step</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-shopify"></span>
                    <span>Simplify the transition from cart to checkout with a progress indicator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-shopify"></span>
                    <span>Add trust badges near payment information fields</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-shopify"></span>
                    <span>Implement a single-page checkout to reduce friction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-shopify"></span>
                    <span>Target recovery emails specifically mentioning secure payment options</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Visitor Segments Tab */}
        <TabsContent value="segments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="New vs Returning Visitors"
              description="Abandonment and recovery rates by visitor type"
            >
              <BarChart
                data={visitorSegmentData}
                bars={[
                  { dataKey: "abandoned", name: "Abandoned (%)", color: "#f97316" },
                  { dataKey: "recovered", name: "Recovered (%)", color: "#10b981" }
                ]}
              />
            </ChartCard>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Segment Insights</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">New Visitors</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                        <span>Higher abandonment rate (68%)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                        <span>Lower recovery rate (22%)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>More responsive to first-time purchase discounts</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Returning Visitors</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Lower abandonment rate (52%)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Higher recovery rate (32%)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>More responsive to loyalty-based incentives</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
