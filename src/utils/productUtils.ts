import { Product, Products } from '@/types/product';
import { ProductCategory } from '@/utils/imagePaths';
import productsData from '@/data/products.json';

/**
 * Get all products
 * @returns Array of all products
 */
export function getAllProducts(): Products {
  return productsData as Products;
}

/**
 * Get product by ID
 * @param id - Product ID
 * @returns Product or undefined if not found
 */
export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((product) => product.id === id);
}

/**
 * Get product by slug
 * @param slug - Product slug
 * @param category - Product category (optional, but recommended to avoid conflicts)
 * @returns Product or undefined if not found
 */
export function getProductBySlug(slug: string, category?: ProductCategory): Product | undefined {
  if (category) {
    return getAllProducts().find((product) => product.slug === slug && product.category === category);
  }
  return getAllProducts().find((product) => product.slug === slug);
}

/**
 * Get products by category
 * @param category - Product category
 * @returns Array of products in the specified category
 */
export function getProductsByCategory(category: ProductCategory): Products {
  return getAllProducts().filter((product) => product.category === category);
}

/**
 * Search products by name (supports both English and Hebrew)
 * @param query - Search query
 * @returns Array of matching products
 */
export function searchProducts(query: string): Products {
  const lowerQuery = query.toLowerCase();
  return getAllProducts().filter(
    (product) =>
      product.name.en.toLowerCase().includes(lowerQuery) ||
      product.name.he.includes(query)
  );
}

/**
 * Get featured products (newest products)
 * @param limit - Maximum number of products to return
 * @returns Array of featured products
 */
export function getFeaturedProducts(limit: number = 4): Products {
  return getAllProducts()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/**
 * Get related products (same category, excluding current product)
 * @param productId - Current product ID
 * @param limit - Maximum number of products to return
 * @returns Array of related products
 */
export function getRelatedProducts(productId: string, limit: number = 4): Products {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];

  return getProductsByCategory(currentProduct.category)
    .filter((product) => product.id !== productId)
    .slice(0, limit);
}

/**
 * Format price with currency
 * @param price - Product price
 * @param currency - Currency symbol (default: ₪)
 * @returns Formatted price string
 */
export function formatPrice(price: number, _currency: string = '₪'): string {
  return new Intl.NumberFormat('he-IL', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

