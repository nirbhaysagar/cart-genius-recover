
import React, { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { LineAreaChart } from "@/components/charts/LineAreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, DollarSign, Percent, Mail, Loader2 } from "lucide-react";
import { getAbandonedCarts, AbandonedCart, markCartAsRecovered } from "@/services/cartService";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
          value={loading ? "Loading..." : stats.totalCarts.toString()} 
          change={{ value: "12%", direction: "up", period: "vs. last month" }}
          icon={<ShoppingCart className="h-5 w-5 text-primary" />}
        />
        <StatCard 
          title="Recovery Rate"
          value={loading ? "Loading..." : `${stats.recoveryRate.toFixed(1)}%`} 
          change={{ value: "4%", direction: "up", period: "vs. last month" }}
          icon={<Percent className="h-5 w-5 text-primary" />}
        />
        <StatCard 
          title="Revenue Recovered"
          value={loading ? "Loading..." : `$${stats.revenueRecovered.toFixed(2)}`} 
          change={{ value: "8%", direction: "up", period: "vs. last month" }}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
        />
        <StatCard 
          title="Email Open Rate"
          value={loading ? "Loading..." : `${stats.emailOpenRate.toFixed(1)}%`} 
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
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
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
                  {carts.length > 0 ? (
                    carts.slice(0, 5).map((cart) => (
                      <tr key={cart.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3">{cart.user_email}</td>
                        <td className="p-3">${Number(cart.cart_value).toFixed(2)}</td>
                        <td className="p-3">{cart.items.length}</td>
                        <td className="p-3">
                          {new Date(cart.abandoned_at).toLocaleString(undefined, {
                            dateStyle: 'short',
                            timeStyle: 'short'
                          })}
                        </td>
                        <td className="p-3">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block
                            ${cart.recovered ? "bg-green-100 text-green-800" : 
                              !cart.recovery_email_sent ? "bg-gray-100 text-gray-800" : 
                              "bg-amber-100 text-amber-800"}`
                          }>
                            {cart.recovered 
                              ? "Recovered" 
                              : !cart.recovery_email_sent 
                                ? "Not Sent" 
                                : "Not Recovered"}
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRecoverCart(cart.id)}
                            disabled={cart.recovered}
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
