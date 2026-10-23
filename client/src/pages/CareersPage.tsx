import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { CallToAction } from '@/components/common/CallToAction';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { CareerCard } from '@/features/careers/CareerCard';
import { useCareers, useStreams } from '@/features/content/api';
import { usePageMeta } from '@/hooks/usePageMeta';
import { localized } from '@/lib/format';
import { cn } from '@/lib/utils';

const ENTRIES = ['', 'after10', 'after12'] as const;

const chip = (active: boolean) =>
  cn(
    'h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
    active
      ? 'border-primary bg-primary text-primary-foreground'
      : 'bg-card hover:border-primary/50',
  );

export default function CareersPage() {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.resolvedLanguage === 'ta';
  usePageMeta(t('pages.careers'));

  // Filters live in the URL so a filtered list can be shared or bookmarked.
  const [params, setParams] = useSearchParams();
  const stream = params.get('stream') ?? '';
  const entry = params.get('entry') ?? '';
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(id);
  }, [query]);

  const update = (key: string, value: string) =>
    setParams(
      (p) => {
        if (value) p.set(key, value);
        else p.delete(key);
        return p;
      },
      { replace: true },
    );

  useEffect(() => update('q', debounced), [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: streams = [] } = useStreams();
  const { data: careers = [], isPending, isFetching } = useCareers({ stream, entry, q: debounced });
  const filtered = Boolean(stream || entry || debounced);

  return (
    <>
      <PageHeader
        art="careers"
        eyebrow={t('careersHub.eyebrow')}
        title={t('careersHub.title')}
        description={t('careersHub.subtitle')}
      >
        <label className="relative block max-w-xl">
          <span className="sr-only">{t('careersHub.search')}</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('careersHub.search')}
            className="h-14 w-full rounded-full border bg-card/80 pr-5 pl-12 text-base shadow-lg shadow-black/10 backdrop-blur outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30"
          />
        </label>
      </PageHeader>

      <section className="container-page pb-20">
        <div className="flex flex-col gap-3">
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]"
            role="group"
            aria-label={t('careersHub.allStreams')}
          >
            <button
              type="button"
              className={chip(!stream)}
              aria-pressed={!stream}
              onClick={() => update('stream', '')}
            >
              {t('careersHub.allStreams')}
            </button>
            {streams.map((s) => (
              <button
                key={s.slug}
                type="button"
                className={chip(stream === s.slug)}
                aria-pressed={stream === s.slug}
                onClick={() => update('stream', s.slug)}
              >
                {localized(isTamil, s.name, s.nameTa)}
              </button>
            ))}
          </div>
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label={t('careersHub.entry.all')}
          >
            {ENTRIES.map((e) => (
              <button
                key={e || 'all'}
                type="button"
                className={chip(entry === e)}
                aria-pressed={entry === e}
                onClick={() => update('entry', e)}
              >
                {t(`careersHub.entry.${e || 'all'}`)}
              </button>
            ))}
            <p className="ml-auto text-sm text-muted-foreground" aria-live="polite">
              {t('careersHub.count', { count: careers.length })}
            </p>
          </div>
        </div>

        <ul
          className={cn(
            'mt-8 grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-3',
            isFetching && !isPending && 'opacity-60',
          )}
        >
          {isPending &&
            Array.from({ length: 6 }, (_, i) => (
              <li key={i} className="h-56 animate-pulse rounded-3xl border bg-card" aria-hidden />
            ))}
          {careers.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={Math.min(i, 6) * 0.04}>
              <CareerCard career={c} />
            </Reveal>
          ))}
        </ul>

        {!isPending && careers.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed p-10 text-center">
            <p className="text-muted-foreground">{t('careersHub.empty')}</p>
            {filtered && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setQuery('');
                  setParams({}, { replace: true });
                }}
              >
                <X /> {t('careersHub.reset')}
              </Button>
            )}
          </div>
        )}
      </section>

      <CallToAction />
    </>
  );
}
