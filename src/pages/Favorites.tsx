import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageContainer from '@/components/layout/PageContainer';
import WhatsAppContact from '@/components/layout/WhatsAppContact';
import { useProducts } from '@/hooks/useProducts';
import { useFavorites } from '@/hooks/useFavorites';
import { Product } from '@/types/product';
import ProductCard from '@/components/products/ProductCard';

export default function Favorites() {
  const { t } = useTranslation();
  const allProducts = useProducts();
  const { getFavoriteProducts, removeFavorite } = useFavorites();

  const favoriteProducts = getFavoriteProducts(allProducts);

  return (
    <>
    <PageContainer>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h1 className="font-display font-bold text-light-text-primary dark:text-dark-text-primary">
            {t('favorites.title')}
          </h1>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-20 md:py-32">
            <div className="max-w-md mx-auto">
              {/* Empty State Icon */}
              <div className="mb-6 flex justify-center">
                <svg
                  className="w-24 h-24 text-light-text-secondary dark:text-dark-text-secondary opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                {t('favorites.emptyTitle')}
              </h2>
              
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed">
                {t('favorites.emptyDescription')}
              </p>
              
              <Link
                to="/"
                className="btn-primary inline-block focus:outline-none"
              >
                {t('common.browseProducts')}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {favoriteProducts.map((product: Product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                {/* Remove from Favorites Button */}
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-10 p-2 rounded-full bg-white/90 dark:bg-dark-bg-primary/90 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 shadow-soft"
                  aria-label={t('favorites.removeFromFavorites')}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
    
    <WhatsAppContact />
  </>
  );
}

