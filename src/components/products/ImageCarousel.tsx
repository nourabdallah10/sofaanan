import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getProductImagePath } from '@/utils/imagePaths';
import { ProductCategory } from '@/utils/imagePaths';
import ImageSkeleton from './ImageSkeleton';

interface ImageCarouselProps {
  category: ProductCategory;
  slug: string;
  images: string[];
  productName: string;
}

export default function ImageCarousel({
  category,
  slug,
  images,
  productName,
}: ImageCarouselProps) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const isFabric = category === 'Fabrics';

  const currentImage = images[currentIndex] || images[0] || '1.jpg';

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setImageLoaded(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageLoaded(false);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setImageLoaded(false);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className={`relative overflow-hidden rounded-2xl bg-light-bg-accent dark:bg-dark-bg-accent group shadow-soft ${
        isFabric 
          ? 'min-h-[500px] lg:min-h-[700px] flex items-center justify-center p-6 lg:p-10' 
          : 'aspect-square lg:aspect-[4/3]'
      }`}>
        {!imageLoaded && <ImageSkeleton />}

        <img
          src={getProductImagePath(category, slug, currentImage)}
          alt=""
          className={`transition-opacity duration-500 ${
            isFabric
              ? 'w-auto h-auto max-w-full max-h-[90vh] object-contain'
              : 'w-full h-full object-contain'
          } ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
          width={isFabric ? undefined : "1200"}
          height={isFabric ? undefined : "900"}
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

            {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/95 dark:bg-dark-bg-primary/95 backdrop-blur-md text-light-text-primary dark:text-dark-text-primary hover:bg-white dark:hover:bg-dark-bg-primary hover:scale-110 active:scale-95 shadow-soft transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/40 dark:focus-visible:ring-dark-text-accent/40 focus-visible:ring-offset-2"
              aria-label={t('product.previousImage')}
            >
              <svg
                className="w-6 h-6 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/95 dark:bg-dark-bg-primary/95 backdrop-blur-md text-light-text-primary dark:text-dark-text-primary hover:bg-white dark:hover:bg-dark-bg-primary hover:scale-110 active:scale-95 shadow-soft transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/40 dark:focus-visible:ring-dark-text-accent/40 focus-visible:ring-offset-2 rtl:left-4 rtl:right-auto"
              aria-label={t('product.nextImage')}
            >
              <svg
                className="w-6 h-6 rtl:rotate-180"
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
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-medium shadow-soft">
            {t('product.imageCounter', { current: currentIndex + 1, total: images.length })}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 focus-visible:ring-offset-2 hover:scale-105 ${
                currentIndex === index
                  ? 'border-light-text-accent dark:border-dark-text-accent ring-2 ring-light-text-accent/20 dark:ring-dark-text-accent/20 scale-105 shadow-soft'
                  : 'border-transparent hover:border-light-text-secondary/30 dark:hover:border-dark-text-secondary/30 opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={getProductImagePath(category, slug, image)}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                width="200"
                height="200"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

