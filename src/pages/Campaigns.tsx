import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUpRight, 
  Clock, 
  Copy, 
  Edit, 
  MessageSquare, 
  Plus, 
  Timer, 
  Trash2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "draft" | "archived";
  recoveryRate: number;
  channels: string[];
  timeTrigger: string;
  lastModified: string;
}

// Mock campaign data
const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Welcome Back - Standard",
    status: "active",
    recoveryRate: 27.5,
    channels: ["Email", "SMS"],
    timeTrigger: "1 hour after abandonment",
    lastModified: "2 days ago"
  },
  {
    id: "2",
    name: "Summer Sale Recovery",
    status: "active",
    recoveryRate: 32.8,
    channels: ["Email", "WhatsApp", "Push"],
    timeTrigger: "30 minutes, 6 hours, 24 hours",
    lastModified: "1 week ago"
  },
  {
    id: "3",
    name: "High-Value Cart Recovery",
    status: "active",
    recoveryRate: 41.2,
    channels: ["Email", "SMS"],
    timeTrigger: "15 minutes after abandonment",
    lastModified: "3 days ago"
  },
  {
    id: "4",
    name: "Winter Discount Test",
    status: "draft",
    recoveryRate: 0,
    channels: ["Email"],
    timeTrigger: "1 hour, 1 day",
    lastModified: "5 days ago"
  },
];

const Campaigns = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recovery Campaigns</h2>
          <p className="text-muted-foreground">Create and manage your cart recovery campaigns.</p>
        </div>
        <Button className="bg-shopify hover:bg-shopify-600">
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      {/* Campaign Tabs */}
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="border shadow-sm hover:shadow-md transition-all">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle>{campaign.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>Modified {campaign.lastModified}</span>
                      </CardDescription>
                    </div>
                    <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                      {campaign.status === "active" ? "Active" : "Draft"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-0">
                  <div className="space-y-3">
                    {campaign.status === "active" && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Recovery Rate</span>
                        <div className="flex items-center gap-1 text-green-600">
                          <span className="font-semibold">{campaign.recoveryRate}%</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Channels</span>
                      <div className="flex items-center gap-1">
                        {campaign.channels.map((channel, index) => (
                          <Badge key={index} variant="outline">{channel}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Triggers</span>
                      <div className="flex items-center gap-1">
                        <Timer className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{campaign.timeTrigger}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Messages</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{campaign.channels.length} sequences</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-4 mt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Duplicate</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {/* "Create Campaign" Card */}
            <Card className="border border-dashed bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6 h-full min-h-[300px]">
                <div className="rounded-full bg-background p-3 mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">Create a new campaign</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Set up automated flows to recover abandoned carts
                </p>
                <Button className="bg-shopify hover:bg-shopify-600">
                  New Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Other tab contents - for now just show messages */}
        <TabsContent value="active" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Viewing active campaigns only</p>
          </div>
        </TabsContent>
        <TabsContent value="draft" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Viewing draft campaigns only</p>
          </div>
        </TabsContent>
        <TabsContent value="archived" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Viewing archived campaigns only</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Campaigns;
