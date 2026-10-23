import { Hammer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import type { TKey } from '@/config/navigation';
import { useBookCounselling } from '@/features/booking/useBookCounselling';
import { usePageMeta } from '@/hooks/usePageMeta';

/** Placeholder for routes built in later phases, so navigation works end to end now. */
export function ComingSoonPage({ titleKey, phase }: { titleKey: TKey; phase: string }) {
  const { t } = useTranslation();
  const book = useBookCounselling();
  const title = t(titleKey);
  usePageMeta(title);

  return (
    <>
      <PageHeader art="comingSoon" eyebrow={t('common.comingSoon')} title={title} />
      <section className="container-page pb-20">
        <div className="flex flex-col items-start gap-5 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-clay-soft text-primary">
            <Hammer className="size-6" aria-hidden />
          </span>
          <p className="flex-1 text-muted-foreground">{t('common.comingSoonBody', { phase })}</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link to="/">{t('common.backHome')}</Link>
            </Button>
            <Button onClick={book}>{t('common.bookCounselling')}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
