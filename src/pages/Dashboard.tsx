
import React from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { LineAreaChart } from "@/components/charts/LineAreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, DollarSign, Percent, Mail } from "lucide-react";

// Mock data for charts
const cartTrendData = [
  { name: 'Jan', abandoned: 65, recovered: 28 },
  { name: 'Feb', abandoned: 59, recovered: 24 },
  { name: 'Mar', abandoned: 80, recovered: 38 },
  { name: 'Apr', abandoned: 81, recovered: 43 },
  { name: 'May', abandoned: 56, recovered: 29 },
  { name: 'Jun', abandoned: 55, recovered: 30 },
  { name: 'Jul', abandoned: 40, recovered: 22 },
];

const channelData = [
  { name: 'Email', recovery: 43 },
  { name: 'SMS', recovery: 29 },
  { name: 'WhatsApp', recovery: 18 },
  { name: 'Push', recovery: 10 },
];

const recentCarts = [
  {
    customer: "alex@example.com",
    value: "$129.99",
    items: 3,
    abandoned: "12 minutes ago",
    status: "Not Recovered"
  },
  {
    customer: "sarah@example.com",
    value: "$89.50",
    items: 2,
    abandoned: "1 hour ago",
    status: "Recovered"
  },
  {
    customer: "mike@example.com",
    value: "$214.75",
    items: 5,
    abandoned: "3 hours ago",
    status: "Not Recovered"
  },
  {
    customer: "emma@example.com",
    value: "$49.99",
    items: 1,
    abandoned: "5 hours ago",
    status: "Not Sent"
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* CTA Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground">Here's an overview of your cart recovery performance.</p>
        </div>
        <Button size="lg" className="bg-shopify hover:bg-shopify-600">
          Create Recovery Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Abandoned Carts"
          value="1,247" 
          change={{ value: "12%", direction: "up", period: "vs. last month" }}
          icon={<ShoppingCart className="h-5 w-5 text-primary" />}
        />
        <StatCard 
          title="Recovery Rate"
          value="32%" 
          change={{ value: "4%", direction: "up", period: "vs. last month" }}
          icon={<Percent className="h-5 w-5 text-primary" />}
        />
        <StatCard 
          title="Revenue Recovered"
          value="$24,891" 
          change={{ value: "8%", direction: "up", period: "vs. last month" }}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
        />
        <StatCard 
          title="Email Open Rate"
          value="48%" 
          change={{ value: "2%", direction: "down", period: "vs. last month" }}
          icon={<Mail className="h-5 w-5 text-primary" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Cart Abandonment Trends"
          description="Last 6 months data"
        >
          <LineAreaChart
            data={cartTrendData}
            areas={[
              { dataKey: "abandoned", name: "Abandoned Carts", color: "#f97316" },
              { dataKey: "recovered", name: "Recovered Carts", color: "#10b981" }
            ]}
            height={300}
          />
        </ChartCard>
        <ChartCard
          title="Recovery by Channel"
          description="Last 30 days data"
        >
          <BarChart
            data={channelData}
            bars={[
              { dataKey: "recovery", name: "Recovery Rate %", color: "#8b5cf6" },
            ]}
            height={300}
          />
        </ChartCard>
      </div>

      {/* Recent Abandoned Carts Table */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Abandoned Carts</h3>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="p-3 font-medium">Customer</th>
                  <th className="p-3 font-medium">Cart Value</th>
                  <th className="p-3 font-medium">Items</th>
                  <th className="p-3 font-medium">Abandoned</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium sr-only">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentCarts.map((cart, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-3">{cart.customer}</td>
                    <td className="p-3">{cart.value}</td>
                    <td className="p-3">{cart.items}</td>
                    <td className="p-3">{cart.abandoned}</td>
                    <td className="p-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block
                        ${cart.status === "Recovered" ? "bg-green-100 text-green-800" : 
                          cart.status === "Not Sent" ? "bg-gray-100 text-gray-800" : 
                          "bg-amber-100 text-amber-800"}`
                      }>
                        {cart.status}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
