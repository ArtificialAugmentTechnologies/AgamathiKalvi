import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function NotFoundPage() {
  const { t } = useTranslation();
  usePageMeta(t('pages.notFound'));

  return (
    <PageHeader eyebrow="404" title={t('pages.notFound')} description={t('pages.notFoundBody')}>
      <Button asChild size="lg">
        <Link to="/">{t('common.backHome')}</Link>
      </Button>
    </PageHeader>
  );
}
