import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { getLogoPath } from '@/utils/imagePaths';

interface NavLink {
  to: string;
  translationKey: string;
}

const navLinks: NavLink[] = [
  { to: '/', translationKey: 'header.nav.home' },
  { to: '/beds', translationKey: 'header.nav.beds' },
  { to: '/couches', translationKey: 'header.nav.couches' },
  { to: '/tables', translationKey: 'header.nav.tables' },
  { to: '/fabrics', translationKey: 'header.nav.fabrics' },
  { to: '/favorites', translationKey: 'header.nav.favorites' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    handler: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handler();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-light-bg-primary/95 dark:bg-dark-bg-primary/95 backdrop-blur-sm border-b border-light-bg-accent dark:border-dark-bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-light-text-accent dark:focus-visible:ring-dark-text-accent focus-visible:ring-offset-2 rounded-lg"
              aria-label={t('header.logo')}
            >
              <img
                src={getLogoPath(theme)}
                alt=""
                className="h-14 md:h-16 lg:h-18 w-auto object-contain"
                width="240"
                height="72"
                loading="eager"
                decoding="async"
                key={theme}
              />
            </Link>
          </div>

          {/* Center: Navigation */}
          <nav
            className="hidden lg:flex items-center justify-center flex-1"
            aria-label="Main navigation"
          >
            <ul className="flex items-center space-x-1 rtl:space-x-reverse">
              {navLinks.map((link) => {
                const isActive = isActiveRoute(link.to);
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`relative px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 focus-visible:ring-offset-2 hover:scale-105 ${
                        isActive
                          ? 'text-light-text-accent dark:text-dark-text-accent bg-light-bg-accent dark:bg-dark-bg-accent shadow-soft'
                          : 'text-light-text-primary dark:text-dark-text-primary hover:text-light-text-accent dark:hover:text-dark-text-accent hover:bg-light-bg-accent/60 dark:hover:bg-dark-bg-accent/60'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {t(link.translationKey)}
                      {isActive && (
                        <span
                          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-light-text-accent dark:bg-dark-text-accent rounded-full"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              onKeyDown={(e) => handleKeyDown(e, toggleLanguage)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-accent dark:hover:bg-dark-bg-accent hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 focus-visible:ring-offset-2"
              aria-label={t('common.language')}
              aria-pressed={currentLanguage === 'he'}
            >
              {currentLanguage === 'en' ? 'עב' : 'EN'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
              className="p-2.5 rounded-xl text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-accent dark:hover:bg-dark-bg-accent hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 focus-visible:ring-offset-2"
              aria-label={t('common.theme')}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'light' ? (
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
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
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onKeyDown={(e) =>
                handleKeyDown(e, () => setIsMobileMenuOpen(!isMobileMenuOpen))
              }
              className="lg:hidden p-2 rounded-lg text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-accent dark:hover:bg-dark-bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-light-text-accent dark:focus-visible:ring-dark-text-accent focus-visible:ring-offset-2"
              aria-label={t('common.menu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
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
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="lg:hidden pb-4 border-t border-light-bg-accent dark:border-dark-bg-accent mt-2 pt-4"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = isActiveRoute(link.to);
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={handleNavClick}
                      className={`block px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-light-text-accent/30 dark:focus-visible:ring-dark-text-accent/30 focus-visible:ring-offset-2 ${
                        isActive
                          ? 'text-light-text-accent dark:text-dark-text-accent bg-light-bg-accent dark:bg-dark-bg-accent shadow-soft'
                          : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-accent dark:hover:bg-dark-bg-accent'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {t(link.translationKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

