
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone, Mail, Eye } from 'lucide-react';

export function LivePreviewEmail() {
  const [activePreview, setActivePreview] = useState('desktop');
  
  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Email Preview</h3>
        <Tabs defaultValue="desktop" value={activePreview} onValueChange={setActivePreview}>
          <TabsList className="grid grid-cols-2 w-[240px]">
            <TabsTrigger value="desktop">
              <Monitor className="w-4 h-4 mr-2" />
              Desktop
            </TabsTrigger>
            <TabsTrigger value="mobile">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Card className={`border bg-card ${
        activePreview === 'mobile' ? 'max-w-[375px] mx-auto h-[600px]' : 'w-full h-[500px]'
      }`}>
        <div className="p-1 border-b bg-muted/20 flex items-center gap-2">
          <div className="flex space-x-1 px-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-xs text-muted-foreground">
            {activePreview === 'desktop' ? 'Email Preview - Desktop View' : 'Email Preview - Mobile View'}
          </div>
        </div>
        <div className="p-4 h-[calc(100%-30px)] overflow-auto">
          <div className="preview-content">
            <div className="text-center p-6">
              <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">We saved your cart</h2>
              <p className="text-muted-foreground mb-6">
                You left some items in your cart. We've saved them for you.
              </p>
              <Button className="mx-auto">Complete Your Purchase</Button>
            </div>
            <div className="mt-8 border rounded-lg p-4">
              <h3 className="font-medium mb-3">Your Cart</h3>
              <div className="space-y-3">
                <div className="flex gap-3 pb-3 border-b">
                  <div className="w-16 h-16 bg-muted rounded"></div>
                  <div>
                    <p className="font-medium">Product Name</p>
                    <p className="text-sm text-muted-foreground">Variant</p>
                    <p className="text-sm font-medium">$49.99</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-muted rounded"></div>
                  <div>
                    <p className="font-medium">Another Product</p>
                    <p className="text-sm text-muted-foreground">Variant</p>
                    <p className="text-sm font-medium">$29.99</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">$79.98</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-center">
        <Button variant="outline" className="gap-2">
          <Eye className="w-4 h-4" />
          Send Test Email
        </Button>
      </div>
    </div>
  );
}
