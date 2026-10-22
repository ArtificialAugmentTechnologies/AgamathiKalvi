import { Compass, Lightbulb, School } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/common/Reveal';
import { ThreeStage } from '@/components/three/ThreeStage';
import { loadBlobScene } from '@/components/three/scenes';
import { SectionHeading } from '@/components/common/SectionHeading';

const ITEMS = [
  { key: 'guidance', icon: Compass },
  { key: 'college', icon: School },
  { key: 'talent', icon: Lightbulb },
] as const;

export function WhyAgamathi() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="why-title">
      <div aria-hidden className="bg-aurora absolute inset-0 opacity-70" />
      {/* Morphing blob glows through the frosted cards. */}
      <ThreeStage scene={loadBlobScene} className="absolute inset-0" />
      <div className="container-page relative">
        <SectionHeading
          id="why-title"
          align="center"
          eyebrow={t('home.why.eyebrow')}
          title={t('home.why.title')}
          subtitle={t('home.why.subtitle')}
        />
        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {ITEMS.map(({ key, icon: Icon }, i) => (
            <Reveal as="li" key={key} delay={0.1 * i}>
              <div className="h-full rounded-3xl border bg-card/55 p-7 text-center backdrop-blur-xl sm:p-8">
                <span className="mx-auto grid grid-cols-1 size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[#f2b48f] text-primary-foreground shadow-lg shadow-primary/30">
                  <Icon className="size-7" aria-hidden />
                </span>
                <p className="mt-6 font-serif text-sm font-semibold text-muted-foreground">
                  0{i + 1}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{t(`home.why.items.${key}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(`home.why.items.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
