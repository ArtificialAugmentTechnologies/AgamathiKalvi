import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CallToAction } from '@/components/common/CallToAction';
import { FeatureGrid } from '@/components/common/FeatureGrid';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ThreeStage } from '@/components/three/ThreeStage';
import { loadGlobeScene } from '@/components/three/scenes';
import { DESTINATIONS, globeFocus } from '@/features/abroad/destinations';
import { usePageMeta } from '@/hooks/usePageMeta';
import { cn } from '@/lib/utils';

const STEPS = ['profile', 'shortlist', 'tests', 'apply', 'visa'] as const;

export default function AbroadPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState(-1);
  usePageMeta(t('pages.abroad'));

  const focus = (i: number) => {
    setActive(i);
    globeFocus.index = i;
  };
  // The focus object outlives the page — reset it so the globe spins freely next visit.
  useEffect(() => () => void (globeFocus.index = -1), []);

  return (
    <>
      <PageHeader
        art="abroad"
        eyebrow={t('programPages.abroad.eyebrow')}
        title={t('programPages.abroad.title')}
        description={t('programPages.abroad.lead')}
      />

      <section
        className="container-page grid grid-cols-1 items-center gap-10 pb-20 lg:grid-cols-2"
        aria-labelledby="countries-title"
      >
        <div className="relative mx-auto aspect-square w-full max-w-lg">
          <ThreeStage
            scene={loadGlobeScene}
            className="absolute inset-0"
            fallback={
              <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#1d3a78,#0a1222_70%)] shadow-[0_0_120px_-20px] shadow-sky/50" />
            }
          />
        </div>

        <div>
          <SectionHeading
            id="countries-title"
            title={t('programPages.abroad.countriesTitle')}
            subtitle={t('programPages.abroad.tapHint')}
          />
          <ul className="mt-8 space-y-3" onMouseLeave={() => focus(-1)}>
            {DESTINATIONS.map((d, i) => (
              <li key={d.key}>
                <button
                  type="button"
                  onMouseEnter={() => focus(i)}
                  onFocus={() => focus(i)}
                  onClick={() => focus(i)}
                  aria-pressed={active === i}
                  className={cn(
                    'flex w-full items-start gap-4 rounded-2xl border bg-card p-4 text-left transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
                    active === i ? 'border-primary bg-clay-soft/40' : 'hover:border-primary/50',
                  )}
                >
                  <MapPin
                    className={cn(
                      'mt-0.5 size-5 shrink-0',
                      active === i ? 'text-primary' : 'text-muted-foreground',
                    )}
                    aria-hidden
                  />
                  <span>
                    <span className="block font-semibold">
                      {t(`programPages.abroad.countries.${d.key}.name`)}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {t(`programPages.abroad.countries.${d.key}.note`)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page pb-20" aria-labelledby="abroad-steps">
        <SectionHeading id="abroad-steps" title={t('programPages.abroad.stepsTitle')} />
        <FeatureGrid
          className="mt-10"
          columns={3}
          numbered
          items={STEPS.map((key) => ({
            key,
            title: t(`programPages.abroad.steps.${key}.title`),
            body: t(`programPages.abroad.steps.${key}.body`),
          }))}
        />
      </section>

      <CallToAction preset={{ interest: 'abroad' }} />
    </>
  );
}
