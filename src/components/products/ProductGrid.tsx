import { useTranslation } from 'react-i18next';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export default function ProductGrid({ products, className = '' }: ProductGridProps) {
  const { t } = useTranslation();

  if (products.length === 0) {
    return (
      <div className="text-center py-16 md:py-24">
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
          {t('common.noProductsFound')}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10 ${className}`}
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in"
          style={{
            animationDelay: `${Math.min(index * 50, 500)}ms`,
            animationFillMode: 'both',
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

