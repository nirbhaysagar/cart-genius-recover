
import React, { useState, useEffect } from 'react';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SmileIcon, MehIcon, FrownIcon, Search, ArrowDownUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

// Mock data for sentiment analysis
const mockFeedbackData = [
  { 
    id: 1, 
    content: "I love how easy this recovery system is! It helped me recover so many abandoned carts.", 
    customer: "sarah.johnson@example.com",
    date: "2 days ago",
    sentiment: "positive" 
  },
  { 
    id: 2, 
    content: "The interface is sleek but I found the campaign setup process a bit confusing at first.", 
    customer: "david.smith@example.com",
    date: "3 days ago",
    sentiment: "neutral" 
  },
  { 
    id: 3, 
    content: "It's frustrating that I can't customize the discount amounts for specific customer segments.", 
    customer: "emily.jones@example.com",
    date: "5 days ago",
    sentiment: "negative" 
  },
  { 
    id: 4, 
    content: "This is exactly what our store needed. Already seeing great recovery rates!", 
    customer: "michael.brown@example.com",
    date: "1 week ago",
    sentiment: "positive" 
  },
  { 
    id: 5, 
    content: "The analytics are detailed and helpful, but loading times could be improved.", 
    customer: "jennifer.williams@example.com",
    date: "1 week ago",
    sentiment: "neutral" 
  },
  { 
    id: 6, 
    content: "We experienced several technical issues during setup that required support assistance.", 
    customer: "robert.taylor@example.com",
    date: "2 weeks ago",
    sentiment: "negative" 
  },
  { 
    id: 7, 
    content: "The AI-suggested subject lines have improved our open rates considerably!", 
    customer: "lisa.anderson@example.com",
    date: "2 weeks ago",
    sentiment: "positive" 
  },
];

export function SentimentAnalysis() {
  const [filterTab, setFilterTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const { toast } = useToast();
  const [feedbackData, setFeedbackData] = useState(mockFeedbackData);

  // Filter feedback based on selected tab and search query
  const filteredFeedback = feedbackData.filter((item) => {
    const matchesTab = filterTab === "all" || item.sentiment === filterTab;
    const matchesSearch = item.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Sort the filtered feedback
  const sortedFeedback = [...filteredFeedback].sort((a, b) => {
    if (sortOrder === "newest") {
      return mockFeedbackData.indexOf(a) - mockFeedbackData.indexOf(b);
    } else {
      return mockFeedbackData.indexOf(b) - mockFeedbackData.indexOf(a);
    }
  });

  // Calculate sentiment distribution
  const sentimentCounts = {
    positive: feedbackData.filter(item => item.sentiment === "positive").length,
    neutral: feedbackData.filter(item => item.sentiment === "neutral").length,
    negative: feedbackData.filter(item => item.sentiment === "negative").length
  };

  const totalFeedback = feedbackData.length;
  const sentimentPercentages = {
    positive: totalFeedback > 0 ? Math.round((sentimentCounts.positive / totalFeedback) * 100) : 0,
    neutral: totalFeedback > 0 ? Math.round((sentimentCounts.neutral / totalFeedback) * 100) : 0,
    negative: totalFeedback > 0 ? Math.round((sentimentCounts.negative / totalFeedback) * 100) : 0
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  };

  const getSentimentIcon = (sentiment: string) => {
    switch(sentiment) {
      case "positive": return <SmileIcon className="h-4 w-4 text-green-500" />;
      case "neutral": return <MehIcon className="h-4 w-4 text-blue-500" />;
      case "negative": return <FrownIcon className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const handleAddNewFeedback = () => {
    // Just a demo function to add new feedback for UI interaction
    const newFeedback = {
      id: Math.max(...feedbackData.map(f => f.id)) + 1,
      content: "Just tried the new features. Works perfectly for our store!",
      customer: "new.customer@example.com",
      date: "Just now",
      sentiment: "positive"
    };
    
    setFeedbackData([newFeedback, ...feedbackData]);
    toast({
      title: "New feedback added",
      description: "A new positive feedback has been added to the analysis.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl font-semibold">Customer Sentiment Analysis</h2>
        <Button variant="monterey" onClick={handleAddNewFeedback} className="hover-lift">
          Analyze New Feedback
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="monterey-card p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
              <Tabs defaultValue="all" value={filterTab} onValueChange={setFilterTab} className="w-full md:w-auto">
                <TabsList className="glass">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="positive" className="flex items-center gap-1">
                    <SmileIcon className="h-3.5 w-3.5" /> Positive
                  </TabsTrigger>
                  <TabsTrigger value="neutral" className="flex items-center gap-1">
                    <MehIcon className="h-3.5 w-3.5" /> Neutral
                  </TabsTrigger>
                  <TabsTrigger value="negative" className="flex items-center gap-1">
                    <FrownIcon className="h-3.5 w-3.5" /> Negative
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search feedback..."
                    className="pl-10 rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-full"
                  onClick={toggleSortOrder}
                >
                  <ArrowDownUp className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {sortedFeedback.length > 0 ? (
                sortedFeedback.map((feedback) => (
                  <div key={feedback.id} className="monterey-card p-4 transition-all hover:-translate-y-0.5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{feedback.customer}</h4>
                      <div className={`sentiment-tag sentiment-${feedback.sentiment}`}>
                        {getSentimentIcon(feedback.sentiment)}
                        <span>
                          {feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{feedback.content}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{feedback.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No matching feedback found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ChartCard title="Sentiment Overview" className="h-auto">
            <div className="p-5">
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="monterey-card p-4 text-center">
                  <SmileIcon className="h-5 w-5 text-green-500 mx-auto mb-2" />
                  <div className="text-xl font-semibold">{sentimentPercentages.positive}%</div>
                  <div className="text-xs text-muted-foreground">Positive</div>
                </div>
                <div className="monterey-card p-4 text-center">
                  <MehIcon className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                  <div className="text-xl font-semibold">{sentimentPercentages.neutral}%</div>
                  <div className="text-xs text-muted-foreground">Neutral</div>
                </div>
                <div className="monterey-card p-4 text-center">
                  <FrownIcon className="h-5 w-5 text-red-500 mx-auto mb-2" />
                  <div className="text-xl font-semibold">{sentimentPercentages.negative}%</div>
                  <div className="text-xs text-muted-foreground">Negative</div>
                </div>
              </div>

              <div className="monterey-card p-4 space-y-4">
                <h4 className="text-sm font-medium">Sentiment Progress</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">Positive</span>
                      <span>{sentimentPercentages.positive}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${sentimentPercentages.positive}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">Neutral</span>
                      <span>{sentimentPercentages.neutral}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${sentimentPercentages.neutral}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">Negative</span>
                      <span>{sentimentPercentages.negative}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${sentimentPercentages.negative}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 monterey-card p-4">
                <h4 className="text-sm font-medium mb-3">Recent Trends</h4>
                <p className="text-xs text-muted-foreground mb-2">Customer sentiment has improved by 12% over the past 30 days.</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-green-500">↑ Improving</span>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
