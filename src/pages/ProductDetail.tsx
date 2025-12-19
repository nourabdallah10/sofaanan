import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageContainer from '@/components/layout/PageContainer';
import { useProductBySlug, useRelatedProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/products/ProductGrid';
import ImageCarousel from '@/components/products/ImageCarousel';
import { useFavorites } from '@/hooks/useFavorites';

export default function ProductDetail() {
  const { slug, category } = useParams<{ slug: string; category: string }>();
  const { t, i18n } = useTranslation();
  // Map URL category to ProductCategory type (e.g., "couches" -> "Couches")
  const productCategory = category 
    ? (category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()) as 'Beds' | 'Couches' | 'Tables' | 'Fabrics'
    : undefined;
  const product = useProductBySlug(slug || '', productCategory);
  const relatedProducts = useRelatedProducts(product?.id || '', 4);
  const { isFavorite, toggleFavorite } = useFavorites();
  const currentLanguage = i18n.language as 'en' | 'he';

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const favorite = isFavorite(product.id);

  const handleFavoriteToggle = () => {
    toggleFavorite(product.id);
  };

  return (
    <>
      <PageContainer className="pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm md:text-base text-light-text-secondary dark:text-dark-text-secondary" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link
                to="/"
                className="hover:text-light-text-accent dark:hover:text-dark-text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 rounded"
                itemProp="item"
              >
                <span itemProp="name">{t('breadcrumb.home')}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true" className="rtl:rotate-180">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link
                to={`/${product.category.toLowerCase()}`}
                className="hover:text-light-text-accent dark:hover:text-dark-text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 rounded"
                itemProp="item"
              >
                <span itemProp="name">{t(`categories.${product.category.toLowerCase() as 'beds' | 'couches' | 'tables' | 'fabrics'}`)}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li aria-hidden="true" className="rtl:rotate-180">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-light-text-primary dark:text-dark-text-primary" itemProp="name">
                {product.name[currentLanguage]}
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <ImageCarousel
              category={product.category}
              slug={product.slug}
              images={product.images}
              productName={product.name[currentLanguage]}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div>
              <span className="text-sm md:text-base font-semibold text-light-text-accent dark:text-dark-text-accent mb-3 block tracking-wide uppercase">
                {t(`categories.${product.category.toLowerCase() as 'beds' | 'couches' | 'tables' | 'fabrics'}`)}
              </span>
              <h1 className="font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-8 leading-tight">
                {product.name[currentLanguage]}
              </h1>
            </div>

            {/* Specifications Table */}
            <div className="border-t border-b border-light-bg-accent dark:border-dark-bg-accent py-8">
              <h2 className="text-xl md:text-2xl font-display font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
                {t('product.specifications')}
              </h2>
              <div className="space-y-6">
                {/* Materials */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                    {t('product.materials')}
                  </h3>
                  <ul className="space-y-2 text-base text-light-text-secondary dark:text-dark-text-secondary">
                    {product.materials.map((material, index) => {
                      // Support both string format and multilingual format
                      const materialText = typeof material === 'string' 
                        ? material 
                        : material[currentLanguage];
                      return (
                        <li key={index} className="flex items-start">
                          <span className="mr-3 rtl:mr-0 rtl:ml-3 mt-1.5 text-light-text-accent dark:text-dark-text-accent">•</span>
                          <span className="leading-relaxed">{materialText}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                {/* Crafted Message */}
                <div className="bg-light-bg-accent dark:bg-dark-bg-accent rounded-2xl p-6 md:p-8 border-2 border-light-text-accent/20 dark:border-dark-text-accent/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 text-light-text-accent dark:text-dark-text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-lg md:text-xl font-medium text-light-text-primary dark:text-dark-text-primary leading-relaxed">
                      {t('footer.craftedMessage')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="https://wa.me/972524415361"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {t('product.contactUs')}
              </a>
              <button
                onClick={handleFavoriteToggle}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 focus-visible:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] ${
                  favorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary border border-light-bg-accent dark:border-dark-bg-accent hover:bg-light-bg-accent dark:hover:bg-dark-bg-accent'
                }`}
                aria-label={favorite ? t('product.removeFromFavorites') : t('product.addToFavorites')}
                aria-pressed={favorite}
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    favorite ? 'scale-110' : 'scale-100'
                  }`}
                  fill={favorite ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{favorite ? t('product.favorited') : t('product.addToFavorites')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-8">
              {t('product.relatedProducts')}
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
        </div>
      </PageContainer>

      {/* Sticky Action Buttons (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-light-bg-primary dark:bg-dark-bg-primary border-t border-light-bg-accent dark:border-dark-bg-accent p-4 shadow-luxury">
        <div className="max-w-7xl mx-auto flex gap-3">
          <a
            href="https://wa.me/972524415361"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            {t('product.contactUs')}
          </a>
          <button
            onClick={handleFavoriteToggle}
            className={`p-3 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 focus-visible:ring-offset-2 hover:scale-110 active:scale-95 ${
              favorite
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary border border-light-bg-accent dark:border-dark-bg-accent hover:bg-light-bg-accent dark:hover:bg-dark-bg-accent'
            }`}
            aria-label={favorite ? t('product.removeFromFavorites') : t('product.addToFavorites')}
            aria-pressed={favorite}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                favorite ? 'scale-110' : 'scale-100'
              }`}
              fill={favorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
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
      </div>
    </>
  );
}

