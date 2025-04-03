
import React, { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { LineAreaChart } from "@/components/charts/LineAreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, DollarSign, Percent, Mail, Loader2, ArrowRight } from "lucide-react";
import { getAbandonedCarts, AbandonedCart, markCartAsRecovered } from "@/services/cartService";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [carts, setCarts] = useState<AbandonedCart[]>([]);
  const [stats, setStats] = useState({
    totalCarts: 0,
    recoveryRate: 0,
    revenueRecovered: 0,
    emailOpenRate: 0
  });
  const { toast } = useToast();

  // Fetch abandoned carts
  useEffect(() => {
    const loadCarts = async () => {
      setLoading(true);
      const abandonedCarts = await getAbandonedCarts();
      setCarts(abandonedCarts);
      
      // Calculate stats
      const totalCarts = abandonedCarts.length;
      const recoveredCarts = abandonedCarts.filter(cart => cart.recovered).length;
      const recoveryRate = totalCarts > 0 ? (recoveredCarts / totalCarts) * 100 : 0;
      
      const revenueRecovered = abandonedCarts
        .filter(cart => cart.recovered)
        .reduce((sum, cart) => sum + Number(cart.cart_value), 0);
      
      const emailsSent = abandonedCarts.filter(cart => cart.recovery_email_sent).length;
      const emailsOpened = abandonedCarts.filter(cart => cart.recovery_email_opened).length;
      const emailOpenRate = emailsSent > 0 ? (emailsOpened / emailsSent) * 100 : 0;
      
      setStats({
        totalCarts,
        recoveryRate,
        revenueRecovered,
        emailOpenRate
      });
      
      setLoading(false);
    };
    
    loadCarts();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:abandoned_carts')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'abandoned_carts' 
      }, () => {
        loadCarts();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleRecoverCart = async (cartId: string) => {
    const success = await markCartAsRecovered(cartId);
    if (success) {
      setCarts(carts.map(cart => 
        cart.id === cartId 
          ? { ...cart, recovered: true } 
          : cart
      ));
      toast({
        title: "Cart recovered",
        description: "The cart has been marked as recovered.",
      });
    }
  };

  // Mock data for charts (in a production app, this would come from actual data)
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

  // Recent activity data
  const recentActivity = [
    { type: 'recovery', email: 'james.wilson@example.com', time: '12 minutes ago', value: '$159.99' },
    { type: 'abandon', email: 'sarah.thompson@example.com', time: '36 minutes ago', value: '$89.95' },
    { type: 'email_open', email: 'david.brown@example.com', time: '1 hour ago', value: '$245.50' },
    { type: 'recovery', email: 'emma.davis@example.com', time: '3 hours ago', value: '$124.95' },
  ];

  return (
    <div className="space-y-8 page-transition">
      {/* CTA Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 section-transition">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground">Here's an overview of your cart recovery performance.</p>
        </div>
        <Button size="lg" className="btn-shopify group">
          Create Recovery Campaign
          <ArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Abandoned Carts"
          value={loading ? "Loading..." : stats.totalCarts.toString()} 
          change={{ value: "12%", direction: "up", period: "vs. last month" }}
          icon={<ShoppingCart className="h-5 w-5 text-shopify" />}
          className="animate-fade-in" 
          style={{ animationDelay: '0.1s' }}
        />
        <StatCard 
          title="Recovery Rate"
          value={loading ? "Loading..." : `${stats.recoveryRate.toFixed(1)}%`} 
          change={{ value: "4%", direction: "up", period: "vs. last month" }}
          icon={<Percent className="h-5 w-5 text-shopify" />}
          className="animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        />
        <StatCard 
          title="Revenue Recovered"
          value={loading ? "Loading..." : `$${stats.revenueRecovered.toFixed(2)}`} 
          change={{ value: "8%", direction: "up", period: "vs. last month" }}
          icon={<DollarSign className="h-5 w-5 text-shopify" />}
          className="animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        />
        <StatCard 
          title="Email Open Rate"
          value={loading ? "Loading..." : `${stats.emailOpenRate.toFixed(1)}%`} 
          change={{ value: "2%", direction: "down", period: "vs. last month" }}
          icon={<Mail className="h-5 w-5 text-shopify" />}
          className="animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        />
      </div>

      {/* Charts and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartCard
            title="Cart Abandonment Trends"
            description="Last 6 months data"
            className="chart-container animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <LineAreaChart
              data={cartTrendData}
              areas={[
                { dataKey: "abandoned", name: "Abandoned Carts", color: "#f97316" },
                { dataKey: "recovered", name: "Recovered Carts", color: "#008060" }
              ]}
              height={300}
              className="chart-animate-in"
            />
          </ChartCard>

          <ChartCard
            title="Recovery by Channel"
            description="Last 30 days data"
            className="chart-container animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <BarChart
              data={channelData}
              bars={[
                { dataKey: "recovery", name: "Recovery Rate %", color: "#008060" },
              ]}
              height={250}
              className="chart-animate-in"
            />
          </ChartCard>
        </div>

        {/* Recent Activity Feed */}
        <Card className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-3 rounded-md border border-border hover:bg-secondary/50 transition-colors animate-slide-in" 
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    activity.type === 'recovery' 
                      ? 'bg-shopify-100 text-shopify-700' 
                      : activity.type === 'abandon' 
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-700'
                  }`}>
                    {activity.type === 'recovery' && <DollarSign className="h-5 w-5" />}
                    {activity.type === 'abandon' && <ShoppingCart className="h-5 w-5" />}
                    {activity.type === 'email_open' && <Mail className="h-5 w-5" />}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium">
                      {activity.type === 'recovery' && 'Cart Recovered'}
                      {activity.type === 'abandon' && 'Cart Abandoned'}
                      {activity.type === 'email_open' && 'Recovery Email Opened'}
                    </p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{activity.email}</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  
                  <Badge variant={activity.type === 'recovery' ? 'default' : 'secondary'} className="ml-2">
                    {activity.value}
                  </Badge>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-2 text-shopify hover:text-shopify-700 hover:bg-shopify-50">
              View All Activity
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Abandoned Carts Table */}
      <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Abandoned Carts</h3>
          <Button variant="outline" size="sm" className="text-shopify hover:text-shopify-700 hover:bg-shopify-50">
            View All
          </Button>
        </div>
        <div className="rounded-md border shadow-shopify-card">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-shopify" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-modern">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Cart Value</th>
                    <th>Items</th>
                    <th>Abandoned</th>
                    <th>Status</th>
                    <th className="sr-only">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.length > 0 ? (
                    carts.slice(0, 5).map((cart, index) => (
                      <tr 
                        key={cart.id}
                        className="animate-slide-in"
                        style={{ animationDelay: `${0.1 * index}s` }}
                      >
                        <td>{cart.user_email}</td>
                        <td>${Number(cart.cart_value).toFixed(2)}</td>
                        <td>{cart.items.length}</td>
                        <td>
                          {new Date(cart.abandoned_at).toLocaleString(undefined, {
                            dateStyle: 'short',
                            timeStyle: 'short'
                          })}
                        </td>
                        <td>
                          <div className={`status-pill ${
                            cart.recovered 
                              ? "status-pill-success" 
                              : !cart.recovery_email_sent 
                                ? "status-pill-neutral" 
                                : "status-pill-warning"}`
                          }>
                            {cart.recovered 
                              ? "Recovered" 
                              : !cart.recovery_email_sent 
                                ? "Not Sent" 
                                : "Not Recovered"}
                          </div>
                        </td>
                        <td className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRecoverCart(cart.id)}
                            disabled={cart.recovered}
                            className={cart.recovered ? "" : "hover:bg-shopify-50 hover:text-shopify-700 hover:border-shopify-700"}
                          >
                            {cart.recovered ? "Recovered" : "Mark Recovered"}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        No abandoned carts found. They'll appear here when customers leave items in their cart.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
