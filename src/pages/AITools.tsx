
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Zap, Copy, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const messageTemplates = [
  {
    id: "1",
    name: "Abandoned Cart Reminder",
    content: "Hey there! You left some awesome items in your cart. Don't worry, we've saved them for you. Come back and complete your purchase before they sell out!",
    tone: "friendly"
  },
  {
    id: "2",
    name: "Limited Time Offer",
    content: "Your cart is waiting! 🕒 We've reserved your items, but they're in high demand. Complete your purchase now and use code COMEBACK15 for 15% off!",
    tone: "urgent"
  },
  {
    id: "3",
    name: "Premium Customer Reminder",
    content: "We noticed you didn't complete your recent purchase. As a valued customer, we'd like to offer you complimentary shipping on this order. Your cart remains saved and ready when you are.",
    tone: "professional"
  }
];

const AITools = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = React.useState(messageTemplates[0]);
  const [generatedContent, setGeneratedContent] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newContent = "Hello [Customer Name],\n\nWe noticed you left some items in your cart earlier today. Don't worry, we've saved everything for you!\n\nYour cart includes items that are trending right now, and we'd hate for you to miss out. To make things easier, we're offering a special 10% discount if you complete your purchase in the next 24 hours.\n\nSimply use code WELCOME10 at checkout.\n\nNeed help with anything? Just reply to this email and our team will be happy to assist.\n\nHappy shopping!\n[Your Store Name]";
      setGeneratedContent(newContent);
      setIsGenerating(false);
      
      toast({
        title: "Message generated!",
        description: "AI has created a personalized recovery message for you."
      });
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied to clipboard!",
      description: "You can now paste this message into your campaign."
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">AI Personalization</h2>
        <p className="text-muted-foreground">Create personalized recovery messages and optimize your campaigns with AI.</p>
      </div>

      {/* AI Tools Tabs */}
      <Tabs defaultValue="message-generator">
        <TabsList>
          <TabsTrigger value="message-generator">Message Generator</TabsTrigger>
          <TabsTrigger value="sentiment-analysis">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="dynamic-discounts">Dynamic Discounts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="message-generator" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Message Templates</CardTitle>
                  <CardDescription>Select a template as a starting point</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {messageTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 rounded-md cursor-pointer transition-colors ${
                        selectedTemplate.id === template.id ? "bg-primary/10 border-2 border-primary/50" : "bg-card hover:bg-accent"
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="outline">{template.tone}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{template.content}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Settings</CardTitle>
                  <CardDescription>Customize your message generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tone</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="cursor-pointer bg-primary">Friendly</Badge>
                      <Badge className="cursor-pointer bg-secondary text-secondary-foreground">Professional</Badge>
                      <Badge className="cursor-pointer bg-secondary text-secondary-foreground">Urgent</Badge>
                      <Badge className="cursor-pointer bg-secondary text-secondary-foreground">Humorous</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Length</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="cursor-pointer bg-secondary text-secondary-foreground">Short</Badge>
                      <Badge className="cursor-pointer bg-primary">Medium</Badge>
                      <Badge className="cursor-pointer bg-secondary text-secondary-foreground">Long</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Include</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="cursor-pointer bg-primary">Discount</Badge>
                      <Badge className="cursor-pointer bg-primary">Product Names</Badge>
                      <Badge className="cursor-pointer bg-secondary text-secondary-foreground">Urgency</Badge>
                      <Badge className="cursor-pointer bg-primary">Customer Name</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-shopify hover:bg-shopify-600" 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Generate AI Message
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Generated Message</CardTitle>
                  <CardDescription>AI-powered personalized recovery message</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Textarea 
                    className="min-h-[300px]" 
                    placeholder="Your AI-generated message will appear here..."
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                  />
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setGeneratedContent("")}>
                      Clear
                    </Button>
                    <Button variant="outline" onClick={handleCopy} disabled={!generatedContent}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button className="bg-shopify hover:bg-shopify-600" disabled={!generatedContent}>
                      Use in Campaign
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sentiment-analysis" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sentiment Analysis</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Analyze customer feedback and comments to understand sentiment and craft more effective recovery messages.
                </p>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dynamic-discounts" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Dynamic Discounts</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Automatically generate optimized discount offers based on cart value, customer behavior, and purchase history.
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

export default AITools;
