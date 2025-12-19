import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import heTranslations from './locales/he.json';

const STORAGE_KEY = 'i18nextLng';

// Helper function to update document direction and language
function updateDocumentDirection(lng: string) {
  const isRTL = lng === 'he';
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lng);
  
  // Also update body for better RTL support
  document.body.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      he: {
        translation: heTranslations,
      },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'he'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: STORAGE_KEY,
    },
  });

// Update HTML dir and lang attributes when language changes
i18n.on('languageChanged', (lng) => {
  updateDocumentDirection(lng);
  // Persist to localStorage explicitly
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
});

// Initialize direction on load
updateDocumentDirection(i18n.language);

export default i18n;

