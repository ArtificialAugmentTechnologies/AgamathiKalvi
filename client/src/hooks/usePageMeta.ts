import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/** Sets the document title (full SEO tags arrive in phase 8). */
export function usePageMeta(title?: string) {
  const { t } = useTranslation();
  useEffect(() => {
    const brand = t('brand.name');
    document.title = title ? `${title} | ${brand}` : `${brand} — ${t('brand.tagline')}`;
  }, [title, t]);
}
