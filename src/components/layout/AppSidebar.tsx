
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  Settings, 
  ShoppingCart, 
  MessageSquare, 
  LayoutGrid, 
  SplitSquareVertical, 
  Zap, 
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="glassmorphism border-r border-glass-border">
      <SidebarHeader className="flex justify-center py-6">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">CartGenius</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all", 
                    isActive ? "bg-white/30 dark:bg-gray-800/40 text-primary shadow-sm" : "hover:bg-white/20 dark:hover:bg-gray-800/20"
                  )
                }
                end
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Dashboard</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/campaigns" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all", 
                    isActive ? "bg-white/30 dark:bg-gray-800/40 text-primary shadow-sm" : "hover:bg-white/20 dark:hover:bg-gray-800/20"
                  )
                }
              >
                <MessageSquare className="h-4 w-4" />
                <span>Campaigns</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/analytics" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all", 
                    isActive ? "bg-white/30 dark:bg-gray-800/40 text-primary shadow-sm" : "hover:bg-white/20 dark:hover:bg-gray-800/20"
                  )
                }
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/testing" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all", 
                    isActive ? "bg-white/30 dark:bg-gray-800/40 text-primary shadow-sm" : "hover:bg-white/20 dark:hover:bg-gray-800/20"
                  )
                }
              >
                <SplitSquareVertical className="h-4 w-4" />
                <span>A/B Testing</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/ai-tools" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all", 
                    isActive ? "bg-white/30 dark:bg-gray-800/40 text-primary shadow-sm" : "hover:bg-white/20 dark:hover:bg-gray-800/20"
                  )
                }
              >
                <Zap className="h-4 w-4" />
                <span>AI Tools</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all", 
                    isActive ? "bg-white/30 dark:bg-gray-800/40 text-primary shadow-sm" : "hover:bg-white/20 dark:hover:bg-gray-800/20"
                  )
                }
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="px-3 py-4">
        <div className="glass rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium">JS</span>
            </div>
            <div className="text-sm">
              <p className="font-medium">John Store</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <button className="h-8 w-8 rounded-lg hover:bg-accent flex items-center justify-center">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
