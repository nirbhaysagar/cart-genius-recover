
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Desktop, Smartphone, RefreshCw } from "lucide-react";

interface LivePreviewEmailProps {
  htmlContent: string;
  subject: string;
  recipientEmail?: string;
  onRefresh?: () => void;
}

export function LivePreviewEmail({ 
  htmlContent, 
  subject, 
  recipientEmail,
  onRefresh
}: LivePreviewEmailProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-md">Email Preview</CardTitle>
          {subject && (
            <p className="text-sm text-muted-foreground">
              Subject: <span className="font-medium">{subject}</span>
            </p>
          )}
          {recipientEmail && (
            <p className="text-xs text-muted-foreground">
              To: {recipientEmail}
            </p>
          )}
        </div>
        
        {onRefresh && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onRefresh}
            className="hover:bg-muted"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh preview</span>
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="desktop">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="desktop" className="flex items-center gap-2">
              <Desktop className="h-4 w-4" />
              <span>Desktop</span>
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span>Mobile</span>
            </TabsTrigger>
            <TabsTrigger value="raw" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>HTML</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="desktop" className="mt-0">
            <div className="border rounded-md overflow-hidden bg-white h-[400px]">
              <iframe
                title="Desktop Email Preview"
                srcDoc={htmlContent}
                className="w-full h-full"
                sandbox="allow-same-origin"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="mobile" className="mt-0">
            <div className="flex justify-center">
              <div className="border rounded-md overflow-hidden bg-white h-[400px] w-[320px]">
                <iframe
                  title="Mobile Email Preview"
                  srcDoc={htmlContent}
                  className="w-full h-full"
                  sandbox="allow-same-origin"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="raw" className="mt-0">
            <div className="border rounded-md overflow-auto bg-muted p-4 h-[400px]">
              <pre className="text-xs">
                <code>{htmlContent}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
