import { motion } from 'framer-motion';
import { Handshake, Megaphone, UserRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';

const STEPS = [
  { key: 'guidance', icon: Megaphone },
  { key: 'counselling', icon: UserRound },
  { key: 'admission', icon: Handshake },
] as const;

export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="container-page py-20 sm:py-28" aria-labelledby="how-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="how-title"
            eyebrow={t('home.how.eyebrow')}
            title={t('home.how.title')}
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-muted-foreground">{t('home.how.intro')}</p>
          </Reveal>
        </div>

        <ol className="relative space-y-5">
          {/* Line that draws itself as the timeline scrolls in (3D path upgrade in phase 3b). */}
          <motion.span
            aria-hidden
            className="absolute top-8 bottom-8 left-[1.6rem] w-px origin-top bg-gradient-to-b from-primary via-sky to-primary/0 sm:left-[1.85rem]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {STEPS.map(({ key, icon: Icon }, i) => (
            <Reveal as="li" key={key} delay={0.15 * i} className="relative flex gap-5">
              <span className="relative z-10 grid grid-cols-1 size-13 shrink-0 place-items-center rounded-2xl border bg-card text-primary shadow-lg shadow-black/10 sm:size-15">
                <Icon className="size-6" aria-hidden />
              </span>
              <div className="flex-1 rounded-2xl border bg-card/60 p-5 sm:p-6">
                <p className="font-serif text-sm font-semibold text-primary">0{i + 1}</p>
                <h3 className="mt-1 text-xl font-semibold">{t(`home.how.steps.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {t(`home.how.steps.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
