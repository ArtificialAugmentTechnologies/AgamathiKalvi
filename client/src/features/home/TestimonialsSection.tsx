import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n';
import { localized } from '@/lib/format';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ShortVideoCard } from '@/components/common/ShortVideoCard';
import { Button } from '@/components/ui/button';
import { TESTIMONIAL_CLIPS } from '@/config/videos';
import { useTestimonials } from './api';

/** Swipeable scroll-snap carousel (3D ring upgrade in phase 3b). */
export function TestimonialsSection() {
  const { t } = useTranslation();
  const { data: items = [] } = useTestimonials();
  const track = useRef<HTMLUListElement>(null);
  const lang = useLanguage();

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 20), behavior: 'smooth' });
  };

  return (
    <section
      className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-28"
      aria-labelledby="testimonials-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-ink-accent/10 blur-3xl"
      />
      <div className="container-page relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="testimonials-title"
            tone="ink"
            eyebrow={t('home.testimonials.eyebrow')}
            title={t('home.testimonials.title')}
            subtitle={t('home.testimonials.subtitle')}
          />
          <div className="flex gap-2">
            <Button
              variant="ink"
              size="icon"
              onClick={() => scrollBy(-1)}
              aria-label={t('home.testimonials.prev')}
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="ink"
              size="icon"
              onClick={() => scrollBy(1)}
              aria-label={t('home.testimonials.next')}
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <ul
        ref={track}
        className="relative mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scroll-px-4 px-4 pb-4 sm:scroll-px-6 [scrollbar-width:none] sm:px-6 lg:scroll-px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label={t('home.testimonials.title')}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className="flex w-[85%] max-w-sm shrink-0 snap-start flex-col rounded-3xl border border-ink-border bg-ink-2 p-7 sm:w-96"
          >
            <Quote className="size-8 text-ink-accent" aria-hidden />
            <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed">
              “{localized(lang, item.quote, item.quoteTa, item.quoteHi)}”
            </blockquote>
            <div className="mt-6 flex items-center gap-3 border-t border-ink-border pt-5">
              {item.avatarUrl && (
                <img
                  src={item.avatarUrl}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  className="size-12 rounded-full object-cover ring-2 ring-ink-accent/40"
                />
              )}
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-ink-muted">{item.town}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="container-page relative mt-16">
        <h3 className="text-center text-2xl font-semibold sm:text-3xl">
          {t('home.testimonials.clipsTitle')}
        </h3>
        <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIAL_CLIPS.map((video, i) => (
            <Reveal as="li" key={video.id} delay={0.08 * i} className="mx-auto w-full max-w-xs">
              <ShortVideoCard
                video={video}
                title={t('home.testimonials.clipTitle', { n: i + 1 })}
                playLabel={t('common.playVideo')}
                className="border-ink-border"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
