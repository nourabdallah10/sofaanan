import { ProductCategory } from '@/utils/imagePaths';

/**
 * Multilingual text structure
 */
export interface MultilingualText {
  en: string;
  he: string;
}

/**
 * Product dimensions in centimeters
 */
export interface Dimensions {
  width: number; // cm
  height: number; // cm
  depth: number; // cm
}

/**
 * Product data model
 */
export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  name: MultilingualText;
  dimensions: Dimensions;
  materials: string[] | MultilingualText[]; // Support both old format (string[]) and new format (MultilingualText[])
  price: number;
  images: string[]; // Array of image file names (e.g., ['1.jpg', '2.jpg'])
  createdAt: string; // ISO 8601 date string
}

/**
 * Product list type
 */
export type Products = Product[];

