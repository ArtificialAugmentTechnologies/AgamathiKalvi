import { Atom, Briefcase, Palette, Sparkles, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CallToAction } from '@/components/common/CallToAction';
import { FeatureGrid } from '@/components/common/FeatureGrid';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { TiltCard } from '@/components/common/TiltCard';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/hooks/usePageMeta';

const STREAMS = [
  { key: 'science', icon: Atom },
  { key: 'commerce', icon: Briefcase },
  { key: 'arts', icon: Palette },
  { key: 'vocational', icon: Wrench },
] as const;

const HOW = ['interest', 'aptitude', 'marks', 'future'] as const;

export default function Class10Page() {
  const { t } = useTranslation();
  usePageMeta(t('pages.class10'));

  return (
    <>
      <PageHeader
        eyebrow={t('programPages.class10.eyebrow')}
        title={t('programPages.class10.title')}
        description={t('programPages.class10.lead')}
      >
        <Button asChild size="lg">
          <Link to="/tools/career-quiz">
            <Sparkles /> {t('programPages.class10.quizCta')}
          </Link>
        </Button>
      </PageHeader>

      <section className="container-page pb-20" aria-labelledby="streams-title">
        <SectionHeading id="streams-title" title={t('programPages.class10.streamsTitle')} />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STREAMS.map(({ key, icon: Icon }, i) => (
            <Reveal as="li" key={key} delay={0.06 * i}>
              <TiltCard max={6}>
                <div className="h-full rounded-3xl border bg-card p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-clay-soft text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="text-2xl font-semibold">
                      {t(`programPages.class10.streams.${key}.title`)}
                    </h3>
                  </div>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold">{t('programPages.class10.subjects')}</dt>
                      <dd className="mt-0.5 text-muted-foreground">
                        {t(`programPages.class10.streams.${key}.subjects`)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold">{t('programPages.class10.leadsTo')}</dt>
                      <dd className="mt-0.5 text-muted-foreground">
                        {t(`programPages.class10.streams.${key}.careers`)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-page pb-20" aria-labelledby="how-choose">
        <SectionHeading id="how-choose" title={t('programPages.class10.howTitle')} />
        <FeatureGrid
          className="mt-10"
          columns={4}
          numbered
          items={HOW.map((key) => ({
            key,
            title: t(`programPages.class10.how.${key}.title`),
            body: t(`programPages.class10.how.${key}.body`),
          }))}
        />
      </section>

      <CallToAction />
    </>
  );
}
