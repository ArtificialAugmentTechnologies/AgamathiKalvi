import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThreeStage } from '@/components/three/ThreeStage';
import { loadHeroScene } from '@/components/three/scenes';
import { Button } from '@/components/ui/button';
import { useBookCounselling } from '@/features/booking/useBookCounselling';
import { cn } from '@/lib/utils';
import { useTestimonials } from './api';
import { QuickCutoffCard } from './QuickCutoffCard';

// Long Tamil labels may wrap on phones instead of overflowing the button.
const heroButtonClass = 'h-auto min-h-12 py-3 whitespace-normal text-center sm:whitespace-nowrap';
const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.resolvedLanguage === 'ta';
  const book = useBookCounselling();
  const { data: testimonials } = useTestimonials();
  const avatars = (testimonials ?? []).filter((x) => x.avatarUrl).slice(0, 4);

  return (
    <section className="relative -mt-16 overflow-hidden pt-16 lg:-mt-[4.5rem] lg:pt-[4.5rem]">
      <div aria-hidden className="bg-aurora absolute inset-0" />
      <div aria-hidden className="bg-grid absolute inset-0" />
      {/* 3D cap, book and globe — decorative, mounted after the text has painted. */}
      <ThreeStage
        scene={loadHeroScene}
        delayMs={350}
        className="absolute inset-x-0 top-0 h-[100svh] max-h-full"
      />

      <div className="container-page relative grid grid-cols-1 items-center gap-12 pt-12 pb-10 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-center lg:text-left"
        >
          <p className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur sm:text-sm">
            <span className="size-2 rounded-full bg-brand-yellow" aria-hidden />
            {t('home.eyebrow')}
          </p>

          {/* Tamil words are much longer, so the headline scales down and drops the (synthetic) italic. */}
          <h1
            className={cn(
              'mt-6 font-semibold break-words',
              isTamil
                ? 'text-[2.1rem] leading-tight sm:text-5xl xl:text-6xl'
                : 'text-5xl leading-[1.04] sm:text-6xl xl:text-7xl',
            )}
          >
            <span className="block">{t('home.titleLine1')}</span>
            <span className={cn('text-gradient-clay block pb-2', !isTamil && 'italic')}>
              {t('home.titleLine2')}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground sm:text-xl lg:mx-0">
            {t('home.subtitle')}
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button size="lg" onClick={book} className={heroButtonClass}>
              {t('common.bookCounselling')}
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" asChild className={heroButtonClass}>
              <Link to="/tools/cutoff-calculator">
                <Calculator />
                {t('common.tryCalculator')}
              </Link>
            </Button>
          </div>

          <div className="mt-9 flex items-center justify-center gap-3 lg:justify-start">
            {avatars.length > 0 && (
              <div className="flex -space-x-2.5" aria-hidden>
                {avatars.map((a) => (
                  <img
                    key={a.id}
                    src={a.avatarUrl!}
                    alt=""
                    width={36}
                    height={36}
                    loading="lazy"
                    className="size-9 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
            )}
            <p className="text-sm text-muted-foreground">{t('home.studentsGuided')}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sky/25 via-transparent to-primary/25 blur-2xl"
          />
          <QuickCutoffCard />
        </motion.div>
      </div>

      <div className="relative">
        <img
          src="/images/brand/hero-banner.webp"
          alt={t('home.bannerAlt')}
          width={1290}
          height={506}
          loading="lazy"
          className="mx-auto w-full max-w-5xl px-4 opacity-90 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
        />
      </div>
    </section>
  );
}
