import { DoorOpen, Ear, Trophy, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YouTubeIcon } from '@/components/icons/BrandIcons';
import { CallToAction } from '@/components/common/CallToAction';
import { FeatureGrid } from '@/components/common/FeatureGrid';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { useMedia } from '@/features/content/api';
import { Lightbox } from '@/features/media/Lightbox';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useSettings } from '@/hooks/useSettings';
import { cn } from '@/lib/utils';

const VALUES = [
  { key: 'teamUp', icon: Users },
  { key: 'listen', icon: Ear },
  { key: 'success', icon: Trophy },
  { key: 'doors', icon: DoorOpen },
] as const;

export default function MediaPage() {
  const { t } = useTranslation();
  const { data: items = [], isPending } = useMedia();
  const { data: settings } = useSettings();
  const [event, setEvent] = useState('');
  const [open, setOpen] = useState<number | null>(null);
  usePageMeta(t('pages.media'));

  const photos = useMemo(() => items.filter((m) => m.type === 'photo' && m.url), [items]);
  const events = useMemo(
    () => [...new Set(photos.map((p) => p.event).filter(Boolean))] as string[],
    [photos],
  );
  const shown = event ? photos.filter((p) => p.event === event) : photos;

  return (
    <>
      <PageHeader
        art="media"
        eyebrow={t('mediaPage.eyebrow')}
        title={t('mediaPage.title')}
        description={t('mediaPage.subtitle')}
      />

      <section className="container-page pb-20">
        <div
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]"
          role="group"
        >
          {['', ...events].map((e) => (
            <button
              key={e || 'all'}
              type="button"
              aria-pressed={event === e}
              onClick={() => setEvent(e)}
              className={cn(
                'h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
                event === e
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'bg-card hover:border-primary/50',
              )}
            >
              {e || t('mediaPage.all')}
            </button>
          ))}
        </div>

        {/* Masonry-style columns keep each photo's natural shape. */}
        <ul className="mt-8 columns-2 gap-3 sm:gap-4 lg:columns-3">
          {isPending &&
            Array.from({ length: 6 }, (_, i) => (
              <li
                key={i}
                className="mb-3 h-56 animate-pulse break-inside-avoid rounded-2xl bg-muted sm:mb-4"
                aria-hidden
              />
            ))}
          {shown.map((p, i) => (
            <Reveal
              as="li"
              key={p.id}
              delay={Math.min(i, 6) * 0.04}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={t('mediaPage.open', { title: p.title })}
                className="group block w-full overflow-hidden rounded-2xl border focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <img
                  src={p.url!}
                  alt={p.title}
                  loading="lazy"
                  className="w-full transition duration-500 group-hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </ul>
      </section>

      <Lightbox items={shown} index={open} onIndexChange={setOpen} />

      <section className="container-page pb-20">
        <FeatureGrid
          columns={4}
          items={VALUES.map(({ key, icon }) => ({
            key,
            icon,
            tag: t(`mediaPage.values.${key}.tag`),
            title: t(`mediaPage.values.${key}.title`),
            body: t(`mediaPage.values.${key}.body`),
          }))}
        />
      </section>

      {settings?.socials?.youtube && (
        <section className="container-page pb-20">
          <div className="flex flex-col items-start gap-5 rounded-3xl border bg-card p-7 sm:flex-row sm:items-center">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#ff0033]/10 text-[#ff0033]">
              <YouTubeIcon className="size-7" />
            </span>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{t('mediaPage.videosTitle')}</h2>
              <p className="mt-1 text-muted-foreground">{t('mediaPage.videosBody')}</p>
            </div>
            <Button asChild>
              <a href={settings.socials.youtube} target="_blank" rel="noopener noreferrer">
                {t('mediaPage.videosCta')}
              </a>
            </Button>
          </div>
        </section>
      )}

      <CallToAction />
    </>
  );
}
