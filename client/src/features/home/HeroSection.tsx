import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calculator,
  ChevronDown,
  GraduationCap,
  HeartHandshake,
  Users,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThreeStage } from '@/components/three/ThreeStage';
import { loadHeroScene } from '@/components/three/scenes';
import { Button } from '@/components/ui/button';
import type { TKey } from '@/config/navigation';
import { useBookCounselling } from '@/features/booking/useBookCounselling';
import { cn } from '@/lib/utils';
import { useTestimonials } from './api';
import { CutoffCalculatorDialog } from './CutoffCalculatorDialog';

// Long Tamil labels may wrap on phones instead of overflowing the button.
const heroButtonClass = 'h-auto min-h-12 py-3 whitespace-normal text-center sm:whitespace-nowrap';
const ease = [0.22, 1, 0.36, 1] as const;

const PATHS: { to: string; label: TKey }[] = [
  { to: '/careers/computer-science-engineering', label: 'options.interest.engineering' },
  { to: '/careers/mbbs-doctor', label: 'options.interest.medicine' },
  { to: '/careers/chartered-accountant', label: 'options.interest.commerce' },
  { to: '/careers/law', label: 'options.interest.law' },
  { to: '/careers/design', label: 'home.paths.design' },
  { to: '/programs/abroad', label: 'options.interest.abroad' },
];

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.resolvedLanguage === 'ta';
  const book = useBookCounselling();
  const [calcOpen, setCalcOpen] = useState(false);
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

      <div className="container-page relative grid min-h-[calc(100svh-4.5rem)] grid-cols-1 items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-center lg:text-left"
        >
          <p className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur sm:text-sm">
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full rounded-full bg-brand-yellow opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-yellow" />
            </span>
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
            <span className={cn('text-shimmer-clay block pb-2', !isTamil && 'italic')}>
              {t('home.titleLine2')}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground sm:text-xl lg:mx-0">
            {t('home.subtitle')}
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button size="lg" onClick={book} className={cn(heroButtonClass, 'cta-glow')}>
              {t('common.bookCounselling')}
              <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCalcOpen(true)}
              className={cn(heroButtonClass, 'bg-card/40 backdrop-blur')}
            >
              <Calculator />
              {t('common.tryCalculator')}
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
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

          <nav aria-label={t('home.paths.title')} className="mt-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              {t('home.paths.title')}
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
              {PATHS.map((p, i) => (
                <motion.li
                  key={p.to}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.06, ease }}
                >
                  <Link
                    to={p.to}
                    className="inline-flex h-9 items-center rounded-full border bg-card/50 px-3.5 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    {t(p.label)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>

        {/* Right half: the 3D scene shows through; glass badges float around it (desktop only). */}
        <div className="relative hidden h-[34rem] lg:block" aria-hidden>
          <FloatingBadge
            className="top-[6%] left-[2%]"
            delay={0.7}
            icon={<Users />}
            value="1 Lakh+"
            label={t('home.badges.students')}
          />
          <FloatingBadge
            className="top-[44%] right-[0%]"
            delay={0.85}
            icon={<GraduationCap />}
            value="200+"
            label={t('home.badges.careers')}
          />
          <FloatingBadge
            className="bottom-[6%] left-[12%]"
            delay={1}
            icon={<HeartHandshake />}
            value={t('home.badges.freeValue')}
            label={t('home.badges.counselling')}
          />
        </div>
      </div>

      <a
        href="#how-title"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground lg:flex"
      >
        {t('home.scrollCue')}
        <ChevronDown className="size-4 motion-safe:animate-bounce" aria-hidden />
      </a>

      <CutoffCalculatorDialog open={calcOpen} onOpenChange={setCalcOpen} />
    </section>
  );
}

/** The old site's "careers through the ages" illustration, as a band right below the hero. */
export function HeroBanner() {
  const { t } = useTranslation();
  return (
    <div className="relative -mt-4 overflow-hidden">
      <img
        src="/images/brand/hero-banner.webp"
        alt={t('home.bannerAlt')}
        width={1290}
        height={506}
        loading="lazy"
        className="mx-auto w-full max-w-5xl px-4 opacity-90 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
      />
    </div>
  );
}

function FloatingBadge({
  className,
  delay,
  icon,
  value,
  label,
}: {
  className: string;
  delay: number;
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease }}
      className={cn('absolute', className)}
    >
      {/* Gentle bob, offset per badge so they never move in sync. */}
      <div
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card/45 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl motion-safe:animate-[float_6s_ease-in-out_infinite]"
        style={{ animationDelay: `${delay * 1.6}s` }}
      >
        <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#f2b48f] text-primary-foreground [&_svg]:size-5">
          {icon}
        </span>
        <span>
          <span className="block font-serif text-xl leading-tight font-semibold">{value}</span>
          <span className="block text-xs text-muted-foreground">{label}</span>
        </span>
      </div>
    </motion.div>
  );
}
