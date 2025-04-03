
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ThemeProvider } from "./components/theme/ThemeProvider";

// Pages
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Analytics from "./pages/Analytics";
import Testing from "./pages/Testing";
import AITools from "./pages/AITools";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Import App CSS for animations
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner 
              position="top-right"
              toastOptions={{
                style: {
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  borderRadius: '0.5rem',
                },
                className: 'animate-slide-in-from-right',
              }}
            />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route 
                  path="/dashboard" 
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
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
