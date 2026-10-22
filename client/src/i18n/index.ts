import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { ta } from './locales/ta';

export const LANGUAGES = ['en', 'ta'] as const;
export type Language = (typeof LANGUAGES)[number];

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ta: { translation: ta } },
    fallbackLng: 'en',
    supportedLngs: LANGUAGES,
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      // Default to English unless the visitor picked Tamil before.
      order: ['localStorage'],
      lookupLocalStorage: 'agamathi-lang',
      caches: ['localStorage'],
    },
  });

const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng.startsWith('ta') ? 'ta' : 'en';
};
syncHtmlLang(i18n.resolvedLanguage ?? 'en');
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
