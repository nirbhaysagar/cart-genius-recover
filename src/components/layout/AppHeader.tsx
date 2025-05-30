
import React from "react";
import { Bell, Search, ShoppingCart } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme/ThemeProvider";

export function AppHeader({ title }: { title: string }) {
  return (
    <header className="border-b bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/50 dark:border-gray-800">
      <div className="flex h-16 items-center px-4 lg:px-6">
        <SidebarTrigger className="lg:hidden" />
        
        <div className="flex items-center gap-2 lg:hidden">
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        
        <h1 className="hidden text-lg font-semibold lg:block">{title}</h1>
        
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex relative w-60">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 rounded-full glass h-10"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative hover:bg-muted/50">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            <span className="sr-only">Shopping Cart</span>
          </Button>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-muted/50">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 glass shadow-lg backdrop-blur-xl">
              <div className="p-4 border-b">
                <p className="text-sm font-semibold">Notifications</p>
              </div>
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer gap-1 p-4 hover:bg-muted/50">
                <div className="text-sm font-medium">New abandoned cart</div>
                <div className="text-xs text-muted-foreground">Customer alex@example.com abandoned their cart with $129.99 worth of items</div>
                <div className="text-xs text-muted-foreground">12 minutes ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer gap-1 p-4 hover:bg-muted/50">
                <div className="text-sm font-medium">Campaign success</div>
                <div className="text-xs text-muted-foreground">Your "Summer Sale Recovery" campaign has a 24% recovery rate!</div>
                <div className="text-xs text-muted-foreground">1 hour ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 text-center text-xs text-muted-foreground border-t hover:bg-muted/50">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-medium">JS</span>
          </div>
        </div>
      </div>
    </header>
  );
}
