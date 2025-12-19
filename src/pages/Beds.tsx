import { useTranslation } from 'react-i18next';
import PageContainer from '@/components/layout/PageContainer';
import ProductGrid from '@/components/products/ProductGrid';
import WhatsAppContact from '@/components/layout/WhatsAppContact';
import { useProductsByCategory } from '@/hooks/useProducts';

export default function Beds() {
  const { t } = useTranslation();
  const beds = useProductsByCategory('Beds');

  return (
    <>
      <PageContainer>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              {t('categories.beds')}
            </h1>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
              {t('categories.description.beds')}
            </p>
          </div>
          <ProductGrid products={beds} />
        </div>
      </PageContainer>
      
      <WhatsAppContact />
    </>
  );
}

