import {
  ArrowRight,
  BarChart3,
  FolderOpen,
  Handshake,
  Lightbulb,
  MonitorSmartphone,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/common/Reveal';
import { TiltCard } from '@/components/common/TiltCard';
import { Button } from '@/components/ui/button';

const ITEMS: {
  key: 'idea' | 'mentorship' | 'skills' | 'digital' | 'resources';
  icon: LucideIcon;
}[] = [
  { key: 'idea', icon: Lightbulb },
  { key: 'mentorship', icon: Handshake },
  { key: 'skills', icon: BarChart3 },
  { key: 'digital', icon: MonitorSmartphone },
  { key: 'resources', icon: FolderOpen },
];

const k = 'programPages.careerTuner.entrepreneur' as const;

/** "From Student to Entrepreneur": a 3D hero box, the five support cards and a CTA to the StudentPreneur page. */
export function EntrepreneurSupport() {
  const { t } = useTranslation();

  return (
    <div className="mt-20" aria-labelledby="entrepreneur-title">
      <Reveal className="mx-auto max-w-4xl">
        <TiltCard max={12} radius="rounded-[2rem]">
          {/* Animated gradient rim around the box. */}
          <div className="relative h-full rounded-[2rem] bg-[conic-gradient(from_var(--angle,0deg),#f2994a,#ffd34e,#7ee0d0,#f2994a)] p-0.5 shadow-2xl shadow-black/25 [transform-style:preserve-3d] motion-safe:animate-[spin-border_8s_linear_infinite]">
            {/* No overflow-hidden here: it would flatten the translateZ layers. Decorations clip in their own layer. */}
            <div className="relative rounded-[calc(2rem-2px)] bg-gradient-to-br from-[#1b2b52] via-ink to-[#3a2420] px-6 py-12 text-center text-ink-foreground [transform-style:preserve-3d] sm:px-14 sm:py-16">
              <div
                aria-hidden
                className="absolute inset-0 overflow-hidden rounded-[calc(2rem-2px)]"
              >
                <div className="bg-grid absolute inset-0 opacity-40" />
                <div className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-brand-yellow/20 blur-3xl" />
              </div>
              <div aria-hidden className="relative mx-auto mb-6 w-fit [transform:translateZ(70px)]">
                <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-brand-yellow text-[#1a0f0a] shadow-xl shadow-primary/30 motion-safe:animate-[float_6s_ease-in-out_infinite]">
                  <Rocket className="size-8" />
                </span>
              </div>
              <p className="relative text-xs font-semibold tracking-[0.2em] text-ink-accent uppercase [transform:translateZ(40px)] sm:text-sm">
                {t(`${k}.eyebrow`)}
              </p>
              <h2
                id="entrepreneur-title"
                className="relative mt-3 text-3xl font-semibold [transform:translateZ(60px)] sm:text-5xl"
              >
                {t(`${k}.title`)}
              </h2>
              <p className="relative mt-4 text-lg font-medium text-ink-accent [transform:translateZ(45px)] sm:text-xl">
                {t(`${k}.tagline`)}
              </p>
              <p className="relative mx-auto mt-4 max-w-2xl leading-relaxed text-ink-muted [transform:translateZ(30px)]">
                {t(`${k}.body`)}
              </p>
            </div>
          </div>
        </TiltCard>
      </Reveal>

      <h3 className="mt-16 text-center text-2xl font-semibold sm:text-3xl">
        {t(`${k}.supportTitle`)}
      </h3>
      <ul className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-5">
        {ITEMS.map(({ key, icon: Icon }, i) => (
          <Reveal
            as="li"
            key={key}
            delay={0.07 * i}
            className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]"
          >
            <TiltCard>
              <div className="group relative flex h-full flex-col rounded-3xl border bg-card p-6 transition duration-300 [transform-style:preserve-3d] hover:border-primary/50 hover:shadow-2xl hover:shadow-black/15 sm:p-7">
                <div className="flex items-center justify-between [transform:translateZ(40px)]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-clay-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="font-serif text-4xl font-semibold text-primary/25" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="mt-5 text-lg font-semibold [transform:translateZ(30px)]">
                  <span className="sr-only">{String(i + 1).padStart(2, '0')} — </span>
                  {t(`${k}.items.${key}.title`)}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground [transform:translateZ(20px)]">
                  {t(`${k}.items.${key}.body`)}
                </p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mx-auto mt-12 max-w-3xl">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-primary/30 bg-clay-soft/60 p-8 text-center sm:flex-row sm:text-left">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Lightbulb className="size-7" aria-hidden />
          </span>
          <div className="flex-1">
            <p className="text-xl font-semibold">{t(`${k}.ctaTitle`)}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t(`${k}.ctaBody`)}</p>
          </div>
          <Button size="lg" asChild className="cta-glow">
            <Link to="/programs/studentpreneur">
              {t(`${k}.cta`)}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
