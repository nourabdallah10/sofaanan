import { useMemo } from 'react';
import { Product, Products } from '@/types/product';
import { ProductCategory } from '@/utils/imagePaths';
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getRelatedProducts,
} from '@/utils/productUtils';

/**
 * Hook to get all products
 */
export function useProducts(): Products {
  return useMemo(() => getAllProducts(), []);
}

/**
 * Hook to get a product by ID
 */
export function useProduct(id: string): Product | undefined {
  return useMemo(() => getProductById(id), [id]);
}

/**
 * Hook to get a product by slug
 * @param slug - Product slug
 * @param category - Product category (optional, but recommended to avoid conflicts)
 */
export function useProductBySlug(slug: string, category?: ProductCategory): Product | undefined {
  return useMemo(() => getProductBySlug(slug, category), [slug, category]);
}

/**
 * Hook to get products by category
 */
export function useProductsByCategory(category: ProductCategory): Products {
  return useMemo(() => getProductsByCategory(category), [category]);
}

/**
 * Hook to search products
 */
export function useSearchProducts(query: string): Products {
  return useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query);
  }, [query]);
}

/**
 * Hook to get featured products
 */
export function useFeaturedProducts(limit: number = 4): Products {
  return useMemo(() => getFeaturedProducts(limit), [limit]);
}

/**
 * Hook to get related products
 */
export function useRelatedProducts(productId: string, limit: number = 4): Products {
  return useMemo(() => getRelatedProducts(productId, limit), [productId, limit]);
}

