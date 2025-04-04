
import React, { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { LineAreaChart } from "@/components/charts/LineAreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import { Button } from "@/components/ui/button";
import { ShoppingCart, DollarSign, Percent, Mail, Loader2, ArrowRight, BrainCircuit, ShoppingBag, BarChart3, SmileIcon } from "lucide-react";
import { getAbandonedCarts, AbandonedCart, markCartAsRecovered } from "@/services/cartService";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { subscribeToTable } from "@/services/realtimeService";
import { SmartDiscount } from "@/components/discounting/SmartDiscount";
import { SentimentAnalysis } from "@/components/analytics/SentimentAnalysis";

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
  const isMobile = useIsMobile();

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
    
    // Subscribe to realtime changes using our realtimeService
    const unsubscribe = subscribeToTable({
      table: 'abandoned_carts',
      handler: () => {
        loadCarts();
        toast({
          title: "Data updated",
          description: "Your dashboard has been updated with the latest data.",
          duration: 3000,
        });
      }
    });
      
    return () => {
      unsubscribe();
    };
  }, [toast]);

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

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6 md:space-y-8 page-transition">
      {/* Tabs for switching between Overview, Smart Discounting, and Sentiment Analysis */}
      <div className="flex overflow-x-auto scrollbar-hide border-b pb-1 mb-2">
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent'} px-4 py-2`}
          onClick={() => setActiveTab('overview')}
        >
          <LayoutGrid className="h-4 w-4 mr-2" /> 
          Overview
        </Button>
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === 'discounting' ? 'border-primary text-primary' : 'border-transparent'} px-4 py-2 flex items-center gap-1`}
          onClick={() => setActiveTab('discounting')}
        >
          <BrainCircuit className="h-4 w-4 mr-1" /> 
          Smart Discounting
        </Button>
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === 'sentiment' ? 'border-primary text-primary' : 'border-transparent'} px-4 py-2 flex items-center gap-1`}
          onClick={() => setActiveTab('sentiment')}
        >
          <SmileIcon className="h-4 w-4 mr-1" /> 
          Sentiment Analysis
        </Button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 section-transition">
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Welcome back</h2>
              <p className="text-muted-foreground text-sm md:text-base">Here's an overview of your cart recovery performance.</p>
            </div>
            <Button variant="monterey" size={isMobile ? "default" : "lg"} className="group whitespace-nowrap hover-lift">
              Create Recovery Campaign
              <ArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            <StatCard 
              title="Abandoned Carts"
              value={loading ? "Loading..." : stats.totalCarts.toString()} 
              change={{ value: "12%", direction: "up", period: "vs. last month" }}
              icon={<ShoppingCart className="h-5 w-5 text-primary" />}
              className="animate-fade-in" 
              style={{ animationDelay: '0.1s' }}
            />
            <StatCard 
              title="Recovery Rate"
              value={loading ? "Loading..." : `${stats.recoveryRate.toFixed(1)}%`} 
              change={{ value: "4%", direction: "up", period: "vs. last month" }}
              icon={<Percent className="h-5 w-5 text-primary" />}
              className="animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            />
            <StatCard 
              title="Revenue Recovered"
              value={loading ? "Loading..." : `$${stats.revenueRecovered.toFixed(2)}`} 
              change={{ value: "8%", direction: "up", period: "vs. last month" }}
              icon={<DollarSign className="h-5 w-5 text-primary" />}
              className="animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            />
            <StatCard 
              title="Email Open Rate"
              value={loading ? "Loading..." : `${stats.emailOpenRate.toFixed(1)}%`} 
              change={{ value: "2%", direction: "down", period: "vs. last month" }}
              icon={<Mail className="h-5 w-5 text-primary" />}
              className="animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            />
          </div>

          {/* Progress Tracker */}
          <ProgressTracker
            title="Weekly Recovery Goal"
            currentAmount={stats.revenueRecovered}
            targetAmount={5000}
            prefix="$"
            className="animate-fade-in glass p-5 rounded-xl"
            style={{ animationDelay: '0.5s' }}
          />

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
                    { dataKey: "recovered", name: "Recovered Carts", color: "#00ad6a" }
                  ]}
                  height={isMobile ? 250 : 300}
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
                    { dataKey: "recovery", name: "Recovery Rate %", color: "#00ad6a" },
                  ]}
                  height={isMobile ? 200 : 250}
                />
              </ChartCard>
            </div>

            {/* Recent Activity Feed */}
            <Card className="animate-fade-in monterey-card h-fit" style={{ animationDelay: '0.7s' }}>
              <div className="p-5 md:p-6 space-y-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index} 
                      className="activity-item border border-glass-border animate-slide-in" 
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl glass flex items-center justify-center ${
                          activity.type === 'recovery' 
                            ? 'text-green-500' 
                            : activity.type === 'abandon' 
                              ? 'text-amber-500'
                              : 'text-blue-500'
                        }`}>
                          {activity.type === 'recovery' && <DollarSign className="h-4 w-4 md:h-5 md:w-5" />}
                          {activity.type === 'abandon' && <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />}
                          {activity.type === 'email_open' && <Mail className="h-4 w-4 md:h-5 md:w-5" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm md:text-base truncate">
                            {activity.type === 'recovery' && 'Cart Recovered'}
                            {activity.type === 'abandon' && 'Cart Abandoned'}
                            {activity.type === 'email_open' && 'Recovery Email Opened'}
                          </p>
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center text-xs md:text-sm text-muted-foreground">
                            <span className="truncate">{activity.email}</span>
                            <span className="whitespace-nowrap">{activity.time}</span>
                          </div>
                        </div>
                        
                        <Badge variant={activity.type === 'recovery' ? 'default' : 'secondary'} className="ml-2 whitespace-nowrap rounded-full">
                          {activity.value}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="monterey" className="w-full mt-2 hover-lift">
                  View All Activity
                </Button>
              </div>
            </Card>
          </div>

          {/* Recent Abandoned Carts Table */}
          <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Abandoned Carts</h3>
              <Button variant="outline" size="sm" className="rounded-full">
                View All
              </Button>
            </div>
            <Card className="monterey-card overflow-hidden">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table-monterey w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th>Customer</th>
                        <th>Cart Value</th>
                        <th className="hidden md:table-cell">Items</th>
                        <th className="hidden md:table-cell">Abandoned</th>
                        <th>Status</th>
                        <th className="sr-only">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.length > 0 ? (
                        carts.slice(0, 5).map((cart, index) => (
                          <tr 
                            key={cart.id}
                            className="animate-slide-in hover:bg-muted/20"
                            style={{ animationDelay: `${0.1 * index}s` }}
                          >
                            <td className="truncate max-w-[120px] md:max-w-none">{cart.user_email}</td>
                            <td>${Number(cart.cart_value).toFixed(2)}</td>
                            <td className="hidden md:table-cell">{cart.items.length}</td>
                            <td className="hidden md:table-cell">
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
                                className={`rounded-full ${cart.recovered ? "" : "hover:bg-primary/10 hover:text-primary hover:border-primary"}`}
                              >
                                {cart.recovered ? "Recovered" : "Mark"}
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
            </Card>
          </div>
        </>
      )}

      {activeTab === 'discounting' && <SmartDiscount />}
      
      {activeTab === 'sentiment' && <SentimentAnalysis />}
    </div>
  );
};

export default Dashboard;
