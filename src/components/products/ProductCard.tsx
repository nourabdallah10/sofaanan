import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Product } from '@/types/product';
import { getProductImagePath } from '@/utils/imagePaths';
import { useFavorites } from '@/hooks/useFavorites';
import ImageSkeleton from './ImageSkeleton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const currentLanguage = i18n.language;
  const primaryImage = product.images[0] || '1.jpg';
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const favorite = isFavorite(product.id);
  const isFabric = product.category === 'Fabrics';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, handler: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      handler();
    }
  };

  return (
    <div className="card-luxury group overflow-hidden hover-lift">
      <Link
        to={`/${product.category.toLowerCase()}/product/${product.slug}`}
        className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 focus-visible:ring-offset-4 focus-visible:ring-offset-light-bg-primary dark:focus-visible:ring-offset-dark-bg-primary rounded-2xl"
        aria-label={`View ${product.name[currentLanguage as 'en' | 'he']}`}
      >
        <div className={`relative overflow-hidden bg-light-bg-accent dark:bg-dark-bg-accent ${isFabric ? 'rounded-2xl flex items-center justify-center p-4' : 'aspect-[3/4] rounded-t-2xl'}`}>
          {/* Skeleton Loading */}
          {!imageLoaded && !imageError && <ImageSkeleton />}

          {/* Product Image */}
          {!imageError && (
            <img
              src={getProductImagePath(product.category, product.slug, primaryImage)}
              alt=""
              className={`${isFabric 
                ? 'w-auto h-auto max-w-full max-h-[600px] object-contain transition-transform duration-500 group-hover:scale-105' 
                : 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              } ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              width={isFabric ? undefined : "800"}
              height={isFabric ? undefined : "600"}
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
          )}

          {/* Error Placeholder */}
          {imageError && (
            <div className="w-full h-full flex items-center justify-center bg-light-bg-accent dark:bg-dark-bg-accent">
              <svg
                className="w-12 h-12 text-light-text-secondary dark:text-dark-text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            onKeyDown={(e) => handleKeyDown(e, () => toggleFavorite(product.id))}
            className={`absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2.5 rounded-full backdrop-blur-md shadow-soft transition-all duration-300 z-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/40 dark:focus-visible:ring-dark-text-accent/40 focus-visible:ring-offset-2 hover:scale-110 active:scale-95 ${
              favorite
                ? 'bg-red-500/95 text-white hover:bg-red-600/95 hover:shadow-soft-lg'
                : 'bg-white/95 dark:bg-dark-bg-primary/95 text-light-text-secondary dark:text-dark-text-secondary hover:bg-white dark:hover:bg-dark-bg-primary hover:shadow-soft-lg'
            }`}
            aria-label={favorite ? t('product.removeFromFavorites') : t('product.addToFavorites')}
            aria-pressed={favorite}
          >
            <svg
              className={`w-5 h-5 transition-all duration-300 ${
                favorite ? 'scale-110 fill-current' : 'scale-100'
              }`}
              fill={favorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {!isFabric && (
          <div className="p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-display font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 line-clamp-2 min-h-[3rem] leading-snug">
              {product.name[currentLanguage as 'en' | 'he']}
            </h3>
          </div>
        )}
      </Link>
    </div>
  );
}

