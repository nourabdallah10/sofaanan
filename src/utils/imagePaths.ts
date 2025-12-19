/**
 * Product category types
 */
export type ProductCategory = 'Beds' | 'Couches' | 'Tables' | 'Fabrics';

/**
 * Map category names to actual folder names
 * This handles cases where the category name differs from the folder name
 */
const CATEGORY_TO_FOLDER: Record<ProductCategory, string> = {
  Beds: 'Beds',
  Couches: 'Sofas', // Map Couches to Sofas folder
  Tables: 'Tables',
  Fabrics: 'Fabrics',
};

/**
 * Get the folder name for a category
 * @param category - Product category
 * @returns Folder name for the category
 */
function getCategoryFolderName(category: ProductCategory): string {
  return CATEGORY_TO_FOLDER[category];
}

/**
 * Get the logo image path based on theme
 * @param theme - Theme mode ('light' | 'dark')
 * @returns Path to the logo image
 */
export function getLogoPath(theme: 'light' | 'dark' = 'light'): string {
  return theme === 'dark' ? '/Images/logo2.png' : '/Images/logo.png';
}

/**
 * Get product image path
 * @param category - Product category (Beds, Couches, Tables, Fabrics)
 * @param productSlug - Product slug/identifier
 * @param imageName - Image filename (e.g., '1.jpg', '2.jpg')
 * @returns Full path to the product image
 */
export function getProductImagePath(
  category: ProductCategory,
  productSlug: string,
  imageName: string
): string {
  const folderName = getCategoryFolderName(category);
  
  // Fabrics are stored directly in the Fabrics folder, not in subfolders
  if (category === 'Fabrics') {
    return `/Images/${folderName}/${imageName}`;
  }
  
  // Other categories have products in subfolders
  return `/Images/${folderName}/${productSlug}/${imageName}`;
}

/**
 * Get all image paths for a product
 * @param category - Product category
 * @param productSlug - Product slug/identifier
 * @param imageCount - Number of images for this product (default: tries common names)
 * @returns Array of image paths
 */
export function getProductImagePaths(
  category: ProductCategory,
  productSlug: string,
  imageCount?: number
): string[] {
  if (imageCount) {
    return Array.from({ length: imageCount }, (_, i) =>
      getProductImagePath(category, productSlug, `${i + 1}.jpg`)
    );
  }

  // If no count provided, try common image names
  // In a real app, you might want to fetch this from an API
  const commonNames = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
  return commonNames.map((name) =>
    getProductImagePath(category, productSlug, name)
  );
}

/**
 * Get the primary (first) image path for a product
 * @param category - Product category
 * @param productSlug - Product slug/identifier
 * @returns Path to the primary product image
 */
export function getPrimaryProductImagePath(
  category: ProductCategory,
  productSlug: string
): string {
  // For Fabrics, the image name comes from the slug (e.g., "fabric-1" -> "1.jpg")
  if (category === 'Fabrics') {
    const imageName = productSlug.replace('fabric-', '') + '.jpg';
    return getProductImagePath(category, productSlug, imageName);
  }
  return getProductImagePath(category, productSlug, '1.jpg');
}

/**
 * Validate if a category is valid
 * @param category - Category to validate
 * @returns True if valid, false otherwise
 */
export function isValidCategory(category: string): category is ProductCategory {
  return ['Beds', 'Couches', 'Tables', 'Fabrics'].includes(category);
}

/**
 * Get the actual folder name for a category
 * Useful when you need to know the physical folder structure
 * @param category - Product category
 * @returns Folder name used in the file system
 */
export function getCategoryFolder(category: ProductCategory): string {
  return getCategoryFolderName(category);
}

/**
 * Get category display name (can be extended with i18n later)
 * @param category - Product category
 * @returns Display name for the category
 */
export function getCategoryDisplayName(category: ProductCategory): string {
  const names: Record<ProductCategory, string> = {
    Beds: 'Beds',
    Couches: 'Couches',
    Tables: 'Tables',
    Fabrics: 'Fabrics',
  };
  return names[category];
}

