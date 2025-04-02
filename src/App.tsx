
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Analytics from "./pages/Analytics";
import Testing from "./pages/Testing";
import AITools from "./pages/AITools";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                } 
              />
              <Route 
                path="/campaigns" 
                element={
                  <AppLayout>
                    <Campaigns />
                  </AppLayout>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <AppLayout>
                    <Analytics />
                  </AppLayout>
                } 
              />
              <Route 
                path="/testing" 
                element={
                  <AppLayout>
                    <Testing />
                  </AppLayout>
                } 
              />
              <Route 
                path="/ai-tools" 
                element={
                  <AppLayout>
                    <AITools />
                  </AppLayout>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
