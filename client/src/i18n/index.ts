import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';
import { en } from './locales/en';
import { hi } from './locales/hi';
import { ta } from './locales/ta';

export const LANGUAGES = ['en', 'ta', 'hi'] as const;
export type Language = (typeof LANGUAGES)[number];

const toLanguage = (lng: string | undefined): Language =>
  LANGUAGES.find((l) => lng?.startsWith(l)) ?? 'en';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ta: { translation: ta }, hi: { translation: hi } },
    fallbackLng: 'en',
    supportedLngs: LANGUAGES,
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      // Default to English unless the visitor picked another language before.
      order: ['localStorage'],
      lookupLocalStorage: 'agamathi-lang',
      caches: ['localStorage'],
    },
  });

/** The active UI language, narrowed to one we ship. */
export function useLanguage(): Language {
  const { i18n: instance } = useTranslation();
  return toLanguage(instance.resolvedLanguage);
}

/** BCP 47 locale for dates and numbers in the given language. */
export const dateLocale = (lng: string) => `${toLanguage(lng)}-IN`;

const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = toLanguage(lng);
};
syncHtmlLang(i18n.resolvedLanguage ?? 'en');
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
