import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/common/Reveal';
import { TiltCard } from '@/components/common/TiltCard';
import { SectionHeading } from '@/components/common/SectionHeading';
import { careerLinks } from '@/config/navigation';

const PROGRAM_KEYS = ['careerTuner', 'studentpreneur', 'abroad', 'class1112', 'class10'] as const;

export function ProgramsSection() {
  const { t } = useTranslation();
  // careerLinks[0] is "Explore careers"; the rest are the five programs in PROGRAM_KEYS order.
  const programs = careerLinks.slice(1).map((link, i) => ({ ...link, key: PROGRAM_KEYS[i]! }));

  return (
    <section className="container-page py-20 sm:py-28" aria-labelledby="programs-title">
      <SectionHeading
        id="programs-title"
        eyebrow={t('home.programs.eyebrow')}
        title={t('home.programs.title')}
        subtitle={t('home.programs.subtitle')}
      />
      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal
              as="li"
              key={p.to}
              delay={0.06 * i}
              className={i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}
            >
              <TiltCard>
                <Link
                  to={p.to}
                  className="group relative flex h-full [transform-style:preserve-3d] flex-col overflow-hidden rounded-3xl border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-black/15 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none sm:p-7"
                >
                  {i === 0 && (
                    <img
                      src="/images/brand/career-tuner.webp"
                      alt=""
                      width={674}
                      height={631}
                      loading="lazy"
                      className="mx-auto mb-4 w-full max-w-64 lg:max-w-none"
                    />
                  )}
                  <span className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                    {t(`home.programs.items.${p.key}.tag`)}
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="grid grid-cols-1 size-10 shrink-0 place-items-center rounded-xl bg-clay-soft text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="text-xl font-semibold">{t(p.title)}</h3>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`home.programs.items.${p.key}.body`)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {t('home.programs.explore')}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
