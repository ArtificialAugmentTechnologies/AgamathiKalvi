import type { en } from './locales/en';

// Typed translation keys: t('nav.home') autocompletes and typos fail type-checking.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof en };
  }
}
