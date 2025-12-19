import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'baha-furniture-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Initialize theme immediately to prevent flash
    if (typeof window === 'undefined') {
      return 'light';
    }
    
    // Check localStorage first
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored && (stored === 'light' || stored === 'dark')) {
        // Apply immediately to prevent flash
        const root = document.documentElement;
        root.setAttribute('data-theme', stored);
        root.classList.add(stored);
        return stored;
      }
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
    }
    
    // Fallback to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      const root = document.documentElement;
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
      return 'dark';
    }
    
    // Default to light
    const root = document.documentElement;
    root.setAttribute('data-theme', 'light');
    root.classList.add('light');
    return 'light';
  });

  useEffect(() => {
    // Apply theme to document using both class and data attribute for better control
    const root = document.documentElement;
    
    // Remove previous theme classes/attributes
    root.classList.remove('light', 'dark');
    root.removeAttribute('data-theme');
    
    // Apply new theme
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    }
    
    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
    
    // Prevent flash of unstyled content by adding theme class immediately
    document.body.setAttribute('data-theme-applied', 'true');
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

