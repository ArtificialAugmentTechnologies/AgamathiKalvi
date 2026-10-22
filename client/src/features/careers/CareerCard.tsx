import { ArrowRight, IndianRupee } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TiltCard } from '@/components/common/TiltCard';
import { formatInrShort, localized } from '@/lib/format';
import type { CareerSummary } from '@/types/content';

export function CareerCard({ career }: { career: CareerSummary }) {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.resolvedLanguage === 'ta';

  return (
    <TiltCard max={7}>
      <Link
        to={`/careers/${career.slug}`}
        className="group flex h-full flex-col rounded-3xl border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-black/15 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-clay-soft px-2.5 py-1 text-primary">
            {localized(isTamil, career.stream.name, career.stream.nameTa)}
          </span>
          <span className="rounded-full bg-sky-soft px-2.5 py-1 text-sky">
            {t(`careersHub.entry.${career.entry}`)}
          </span>
        </div>
        <h3 className="mt-4 text-xl leading-snug font-semibold">
          {localized(isTamil, career.title, career.titleTa)}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{career.summary}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4 text-sm">
          {career.salaryMin ? (
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <IndianRupee className="size-3.5" aria-hidden />
              <span>
                <span className="sr-only">{t('careersHub.salary')}: </span>
                {formatInrShort(career.salaryMin)}+
              </span>
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1 font-semibold text-primary">
            {t('careersHub.view')}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
