import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';

interface FavoritesContextType {
  favoriteIds: string[];
  isFavorite: (productId: string) => boolean;
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  getFavoriteProducts: (products: Product[]) => Product[];
  favoriteCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'baha-favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    // Initialize from localStorage
    if (typeof window === 'undefined') {
      return [];
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  });

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favoriteIds]);

  const isFavorite = (productId: string): boolean => {
    return favoriteIds.includes(productId);
  };

  const addFavorite = (productId: string) => {
    setFavoriteIds((prev) => {
      if (prev.includes(productId)) {
        return prev; // Already favorited
      }
      return [...prev, productId];
    });
  };

  const removeFavorite = (productId: string) => {
    setFavoriteIds((prev) => prev.filter((id) => id !== productId));
  };

  const toggleFavorite = (productId: string) => {
    setFavoriteIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const getFavoriteProducts = (products: Product[]): Product[] => {
    return products.filter((product) => favoriteIds.includes(product.id));
  };

  const favoriteCount = favoriteIds.length;

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        getFavoriteProducts,
        favoriteCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

