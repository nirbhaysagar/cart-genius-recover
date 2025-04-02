
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully."
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Integrations & Settings</h2>
        <p className="text-muted-foreground">Configure your recovery app and connect to your marketing tools.</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="integrations">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="integrations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Email Providers</CardTitle>
                    <CardDescription>Connect your email service provider</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Check className="mr-1 h-3 w-3" /> Connected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                      <span className="font-semibold">K</span>
                    </div>
                    <div>
                      <p className="font-medium">Klaviyo</p>
                      <p className="text-xs text-muted-foreground">Connected on May 10, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                      <span className="font-semibold">M</span>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mailchimp</p>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>SMS Providers</CardTitle>
                <CardDescription>Connect your SMS service provider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                      <span className="font-semibold">T</span>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Twilio</p>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                      <span className="font-semibold">W</span>
                    </div>
                    <div>
                      <p className="text-muted-foreground">WhatsApp Business</p>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Google Analytics</CardTitle>
                <CardDescription>Track recovery performance in GA</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ga-id">Google Analytics ID</Label>
                    <Input id="ga-id" placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="track-events" />
                    <Label htmlFor="track-events">Track recovery events</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ecommerce" defaultChecked />
                    <Label htmlFor="ecommerce">Enable eCommerce tracking</Label>
                  </div>
                  <Button type="submit" className="w-full">Save Settings</Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Shopify Integration</CardTitle>
                <CardDescription>Connect to your Shopify store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded bg-shopify flex items-center justify-center text-white">
                      <span className="font-semibold">S</span>
                    </div>
                    <div>
                      <p className="font-medium">myshopifystore.com</p>
                      <p className="text-xs text-muted-foreground">Connected via Shopify App</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Check className="mr-1 h-3 w-3" /> Active
                  </Badge>
                </div>
                
                <div className="rounded-md border p-4 bg-muted/50">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Data is syncing automatically. Visit the <a href="#" className="text-primary hover:underline inline-flex items-center">Shopify app page <ExternalLink className="h-3 w-3 ml-1" /></a> to manage permissions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New abandoned cart</p>
                        <p className="text-sm text-muted-foreground">Get notified when a new cart is abandoned</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Recovery success</p>
                        <p className="text-sm text-muted-foreground">Get notified when a cart is successfully recovered</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Campaign performance</p>
                        <p className="text-sm text-muted-foreground">Weekly summary of campaign performance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">System alerts</p>
                        <p className="text-sm text-muted-foreground">Notifications about system updates and maintenance</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Browser notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mobile push notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications on your mobile device</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSave}>Save Notification Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-xl font-semibold mb-2">Appearance Settings</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Customize the look and feel of your recovery emails and messages.
                </p>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-xl font-semibold mb-2">API Settings</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Manage API keys and webhooks for custom integrations.
                </p>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
