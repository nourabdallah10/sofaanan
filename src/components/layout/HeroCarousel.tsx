import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getProductImagePath } from '@/utils/imagePaths';

// Select 6 couch products for the carousel (5+ as requested)
const carouselImages = [
  { slug: 'Product1', image: '1.jpg' },
  { slug: 'Product5', image: '1.jpg' },
  { slug: 'Product10', image: '1.jpg' },
  { slug: 'Product15', image: '1.jpg' },
  { slug: 'Product20', image: '1.jpg' },
  { slug: 'Product25', image: '1.jpg' },
];

export default function HeroCarousel() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'he';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance carousel every 5 seconds with progress tracking
  useEffect(() => {
    const startProgress = () => {
      setProgress(0);
      const startTime = Date.now();
      if (progressRef.current) clearInterval(progressRef.current);
      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / 5000) * 100, 100);
        setProgress(newProgress);
      }, 50);
    };

    startProgress();

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        setIsTransitioning(false);
        setProgress(0);
        startProgress();
      }, 100);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
      // Reset auto-advance timer
      if (intervalRef.current) clearInterval(intervalRef.current);
      const startProgress = () => {
        setProgress(0);
        const startTime = Date.now();
        progressRef.current = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const newProgress = Math.min((elapsed / 5000) * 100, 100);
          setProgress(newProgress);
        }, 50);
      };
      startProgress();
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
          setIsTransitioning(false);
          setProgress(0);
          startProgress();
        }, 100);
      }, 5000);
    }, 100);
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
    const startProgress = () => {
      setProgress(0);
      const startTime = Date.now();
      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / 5000) * 100, 100);
        setProgress(newProgress);
      }, 50);
    };
    startProgress();
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        setIsTransitioning(false);
        setProgress(0);
        startProgress();
      }, 100);
    }, 5000);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
      resetTimer();
    }, 100);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
      setIsTransitioning(false);
      resetTimer();
    }, 100);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden shadow-luxury group">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-soft" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.05)_50%,transparent_70%)] animate-shimmer" />
      </div>

      {/* Image Container with Enhanced Slide Animation */}
      <div 
        className="flex h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        style={{ transform: `translateX(${isRTL ? currentIndex * 100 : -currentIndex * 100}%)` }}
      >
        {carouselImages.map((item, index) => (
          <div
            key={index}
            className="min-w-full h-full relative overflow-hidden"
          >
            <img
              src={getProductImagePath('Couches', item.slug, item.image)}
              alt={`Couch ${index + 1}`}
              className={`w-full h-full object-cover transition-all duration-[1200ms] ${
                index === currentIndex 
                  ? 'scale-100 brightness-100' 
                  : 'scale-110 brightness-90'
              } ${isTransitioning ? 'brightness-75' : ''}`}
            />
            
            {/* Multi-layer Gradient Overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-transparent" />
            
            {/* Animated Light Rays Effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-1/3 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform -skew-x-12 animate-pulse-soft" />
              <div className="absolute top-0 right-1/4 w-1/3 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform skew-x-12 animate-pulse-soft" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Message Overlay with Enhanced Animations */}
      <div className={`absolute inset-0 flex items-center px-6 md:px-12 lg:px-16 z-10 ${isRTL ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-2xl space-y-4 md:space-y-6">
          {/* Animated Decorative Line */}
          <div className={`absolute top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-white/60 to-transparent animate-pulse-soft ${isRTL ? '-right-4' : '-left-4'}`} />
          
          <div className="relative">
            {/* Glowing Text Effect */}
            <div className="absolute inset-0 blur-xl opacity-30">
              <h1 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                Welcome to Modern Furniture
              </h1>
            </div>
            
            <h1 
              className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight drop-shadow-2xl relative z-10 animate-slide-in-left"
              style={{
                textShadow: '0 0 30px rgba(255,255,255,0.3), 0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Welcome to{' '}
              </span>
              <span className="inline-block animate-fade-in-up text-light-text-accent dark:text-dark-text-accent" style={{ animationDelay: '0.3s' }}>
                Modern Furniture
              </span>
            </h1>
          </div>
          
          <p 
            className="text-white text-lg md:text-xl lg:text-2xl font-medium drop-shadow-lg max-w-xl relative z-10 animate-fade-in-up"
            style={{ 
              animationDelay: '0.5s',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Discover luxury furniture for your home
          </p>

          {/* Animated Decorative Elements */}
          <div className="flex gap-2 mt-6 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>

      {/* Creative Navigation Arrows - Redesigned */}
      <button
        onClick={isRTL ? goToNext : goToPrevious}
        className={`absolute top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 ${isRTL ? 'right-6' : 'left-6'}`}
        aria-label="Previous slide"
      >
        <div className="relative">
          {/* Outer Glow Circle */}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-pulse-soft" />
          {/* Main Button Circle */}
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl hover:shadow-white/20">
            {/* Inner Arrow */}
            <svg
              className={`w-6 h-6 md:w-7 md:h-7 text-white transition-transform duration-300 ${isRTL ? 'hover:translate-x-[3px]' : 'hover:translate-x-[-3px]'} ${isRTL ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
              />
            </svg>
            {/* Decorative Dots */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse ${isRTL ? '-right-2' : '-left-2'}`} />
            <div className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/40 animate-pulse ${isRTL ? '-right-4' : '-left-4'}`} style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </button>
      <button
        onClick={isRTL ? goToPrevious : goToNext}
        className={`absolute top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 ${isRTL ? 'left-6' : 'right-6'}`}
        aria-label="Next slide"
      >
        <div className="relative">
          {/* Outer Glow Circle */}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-pulse-soft" />
          {/* Main Button Circle */}
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center shadow-2xl hover:shadow-white/20">
            {/* Inner Arrow */}
            <svg
              className={`w-6 h-6 md:w-7 md:h-7 text-white transition-transform duration-300 ${isRTL ? 'hover:translate-x-[-3px]' : 'hover:translate-x-[3px]'} ${isRTL ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
              />
            </svg>
            {/* Decorative Dots */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse ${isRTL ? '-left-2' : '-right-2'}`} />
            <div className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/40 animate-pulse ${isRTL ? '-left-4' : '-right-4'}`} style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </button>

      {/* Creative Slide Indicators - Redesigned as Circles */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20 items-center">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative group"
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Outer Ring for Active State */}
            {index === currentIndex && (
              <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping" style={{ animationDuration: '2s' }} />
            )}
            
            {/* Main Circle Indicator */}
            <div className={`relative rounded-full transition-all duration-500 ${
              index === currentIndex
                ? 'w-4 h-4 md:w-5 md:h-5 bg-white shadow-lg shadow-white/50 ring-2 ring-white/30'
                : 'w-3 h-3 md:w-3.5 md:h-3.5 bg-white/50 hover:bg-white/80 hover:scale-125'
            }`}>
              {/* Inner Glow for Active */}
              {index === currentIndex && (
                <div className="absolute inset-0 rounded-full bg-white/60 animate-pulse" />
              )}
              
              {/* Progress Ring for Active Slide */}
              {index === currentIndex && (
                <svg className="absolute inset-0 w-4 h-4 md:w-5 md:h-5 transform -rotate-90" viewBox="0 0 20 20">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray={`${2 * Math.PI * 8}`}
                    strokeDashoffset={`${2 * Math.PI * 8 * (1 - progress / 100)}`}
                    className="transition-all duration-50"
                    style={{
                      strokeLinecap: 'round',
                    }}
                  />
                </svg>
              )}
            </div>
            
          </button>
        ))}
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

