import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import ProductGrid from '@/components/products/ProductGrid';
import HeroCarousel from '@/components/layout/HeroCarousel';
import WhatsAppContact from '@/components/layout/WhatsAppContact';
import { useProducts } from '@/hooks/useProducts';
import { ProductCategory, getProductImagePath } from '@/utils/imagePaths';

const CATEGORIES: ProductCategory[] = ['Beds', 'Couches', 'Tables', 'Fabrics'];

export default function Home() {
  const { t } = useTranslation();
  const products = useProducts();

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped: Record<ProductCategory, typeof products> = {
      Beds: [],
      Couches: [],
      Tables: [],
      Fabrics: [],
    };

    products.forEach((product) => {
      grouped[product.category].push(product);
    });

    return grouped;
  }, [products]);

  // Category translation keys
  const categoryKeys: Record<ProductCategory, string> = {
    Beds: 'categories.beds',
    Couches: 'categories.couches',
    Tables: 'categories.tables',
    Fabrics: 'categories.fabrics',
  };

  return (
    <>
      {/* Hero Carousel with Welcome Message - Full Width */}
      <div className="w-full mb-16 md:mb-24 lg:mb-32">
        <HeroCarousel />
      </div>

      {/* Featured Categories Section */}
      <PageContainer>
        <div className="max-w-7xl mx-auto mb-16 md:mb-24 lg:mb-32">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-10 md:mb-12 text-center">
            {t('home.featuredCategories')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {CATEGORIES.map((category) => {
              const categoryProducts = productsByCategory[category];
              const firstProduct = categoryProducts[0];
              const categoryImage = firstProduct 
                ? getProductImagePath(category, firstProduct.slug, firstProduct.images[0] || '1.jpg')
                : null;

              return (
                <Link
                  key={category}
                  to={`/${category.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-2xl bg-light-bg-accent dark:bg-dark-bg-accent shadow-soft hover:shadow-luxury transition-all duration-500 hover-lift focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 focus-visible:ring-offset-4 focus-visible:ring-offset-light-bg-primary dark:focus-visible:ring-offset-dark-bg-primary"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {categoryImage ? (
                      <img
                        src={categoryImage}
                        alt={t(categoryKeys[category])}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-light-bg-accent to-light-bg-secondary dark:from-dark-bg-accent dark:to-dark-bg-secondary flex items-center justify-center">
                        <span className="text-4xl text-light-text-secondary dark:text-dark-text-secondary">
                          {category.charAt(0)}
                        </span>
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-2 group-hover:text-light-text-accent dark:group-hover:text-dark-text-accent transition-colors duration-300">
                      {t(categoryKeys[category])}
                    </h3>
                    <p className="text-sm md:text-base text-light-text-secondary dark:text-dark-text-secondary">
                      {t(`categories.description.${category.toLowerCase()}`)}
                    </p>
                    <div className="mt-4 flex items-center text-light-text-accent dark:text-dark-text-accent font-semibold text-sm md:text-base">
                      <span>{t('common.viewAll')}</span>
                      <svg
                        className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:translate-x-[-4px]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </PageContainer>

      {/* Crafted Message & WhatsApp Contact Section */}
      <WhatsAppContact />

      <PageContainer>
        <div className="max-w-7xl mx-auto">
          {/* Products grouped by category */}
          <div className="space-y-20 md:space-y-28 lg:space-y-32">
            {CATEGORIES.map((category) => {
              const categoryProducts = productsByCategory[category];
              if (categoryProducts.length === 0) return null;

              return (
                <section key={category} className="animate-slide-up">
                  <div className="flex items-center justify-between mb-10 md:mb-12">
                    <h2 className="font-display font-bold text-light-text-primary dark:text-dark-text-primary">
                      {t(categoryKeys[category])}
                    </h2>
                    <Link
                      to={`/${category.toLowerCase()}`}
                      className="text-sm md:text-base font-semibold text-light-text-accent dark:text-dark-text-accent hover:underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-light-text-accent/60 dark:hover:decoration-dark-text-accent/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 focus-visible:ring-offset-2 rounded-lg"
                    >
                      {t('common.viewAll')}
                    </Link>
                  </div>
                  <ProductGrid products={categoryProducts} />
                </section>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </>
  );
}
