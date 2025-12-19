import { useTranslation } from 'react-i18next';
import PageContainer from '@/components/layout/PageContainer';
import ProductGrid from '@/components/products/ProductGrid';
import WhatsAppContact from '@/components/layout/WhatsAppContact';
import { useProductsByCategory } from '@/hooks/useProducts';

export default function Couches() {
  const { t } = useTranslation();
  const couches = useProductsByCategory('Couches');

  return (
    <>
      <PageContainer>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              {t('categories.couches')}
            </h1>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
              {t('categories.description.couches')}
            </p>
          </div>
          <ProductGrid products={couches} />
        </div>
      </PageContainer>
      
      <WhatsAppContact />
    </>
  );
}

