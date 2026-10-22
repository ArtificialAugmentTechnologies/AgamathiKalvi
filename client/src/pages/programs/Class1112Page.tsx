import {
  ArrowUpRight,
  Briefcase,
  Cpu,
  FlaskConical,
  Palette,
  Scale,
  Stethoscope,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CallToAction } from '@/components/common/CallToAction';
import { FeatureGrid } from '@/components/common/FeatureGrid';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { toolLinks } from '@/config/navigation';
import { usePageMeta } from '@/hooks/usePageMeta';

const PATHS = [
  { key: 'engineering', icon: Cpu },
  { key: 'medical', icon: Stethoscope },
  { key: 'artsScience', icon: FlaskConical },
  { key: 'commerce', icon: Briefcase },
  { key: 'law', icon: Scale },
  { key: 'design', icon: Palette },
] as const;

const EXAMS = ['tnea', 'neet', 'jee', 'clat', 'cuet', 'design'] as const;

export default function Class1112Page() {
  const { t } = useTranslation();
  usePageMeta(t('pages.class1112'));

  return (
    <>
      <PageHeader
        eyebrow={t('programPages.class1112.eyebrow')}
        title={t('programPages.class1112.title')}
        description={t('programPages.class1112.lead')}
      />

      <section className="container-page pb-20" aria-labelledby="paths-title">
        <SectionHeading id="paths-title" title={t('programPages.class1112.pathsTitle')} />
        <FeatureGrid
          className="mt-10"
          items={PATHS.map(({ key, icon }) => ({
            key,
            icon,
            title: t(`programPages.class1112.paths.${key}.title`),
            body: t(`programPages.class1112.paths.${key}.body`),
          }))}
        />
      </section>

      <section className="bg-ink py-20 text-ink-foreground" aria-labelledby="exams-title">
        <div className="container-page">
          <SectionHeading
            id="exams-title"
            tone="ink"
            title={t('programPages.class1112.examsTitle')}
          />
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EXAMS.map((key, i) => (
              <Reveal
                as="li"
                key={key}
                delay={0.05 * i}
                className="rounded-2xl border border-ink-border bg-ink-2 p-5"
              >
                <p className="font-serif text-xl font-semibold text-ink-accent">
                  {t(`programPages.class1112.exams.${key}.title`)}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {t(`programPages.class1112.exams.${key}.body`)}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-20" aria-labelledby="tools-start">
        <SectionHeading id="tools-start" title={t('programPages.class1112.toolsTitle')} />
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {toolLinks.map(({ to, title, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="group flex h-full items-center gap-3 rounded-2xl border bg-card p-4 transition hover:border-primary/50 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <Icon className="size-5 shrink-0 text-primary" aria-hidden />
                <span className="flex-1 text-sm font-semibold">{t(title)}</span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground transition group-hover:text-primary"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CallToAction />
    </>
  );
}
