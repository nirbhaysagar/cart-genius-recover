
import React, { createContext, useContext, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => null,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("cartgenius-theme") as Theme | null;
    if (savedTheme) return savedTheme;
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const { toast } = useToast();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Save to localStorage
    localStorage.setItem("cartgenius-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast({
      title: `${newTheme === "dark" ? "Dark" : "Light"} mode`,
      description: `Interface switched to ${newTheme} mode appearance.`,
      duration: 2000,
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="theme-toggle bg-white/10 backdrop-blur-lg dark:bg-gray-800/30 rounded-full w-10 h-10 flex items-center justify-center transition-all hover:scale-105 hover:shadow-lg"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? 
        <Moon className="h-5 w-5 transition-transform hover:rotate-45" /> : 
        <Sun className="h-5 w-5 transition-transform hover:rotate-45" />
      }
    </Button>
  );
}
