
import React, { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
}

// Helper function to get the page title based on the current route
const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/campaigns":
      return "Recovery Campaigns";
    case "/analytics":
      return "Behavior Analytics";
    case "/testing":
      return "A/B Testing";
    case "/ai-tools":
      return "AI Personalization";
    case "/settings":
      return "Integrations & Settings";
    default:
      return "CartGenius";
  }
};

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const title = getPageTitle(location.pathname);
  const isMobile = useIsMobile();
  
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full flex-col lg:flex-row bg-background">
          <AppSidebar />
          <div className="flex flex-col flex-1 w-full">
            <AppHeader title={title} />
            <main className="flex-1 overflow-auto">
              <div className={`container mx-auto ${isMobile ? 'px-3 py-3' : 'p-6'} max-w-[1600px]`}>
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
