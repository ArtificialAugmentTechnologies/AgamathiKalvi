import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CallToAction } from '@/components/common/CallToAction';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { TiltCard } from '@/components/common/TiltCard';
import { toolLinks } from '@/config/navigation';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function ToolsPage() {
  const { t } = useTranslation();
  usePageMeta(t('pages.tools'));

  return (
    <>
      <PageHeader
        art="tools"
        eyebrow={t('toolsHub.eyebrow')}
        title={t('toolsHub.title')}
        description={t('toolsHub.subtitle')}
      />
      <section className="container-page pb-20">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolLinks.map(({ to, title, desc, icon: Icon }, i) => (
            <Reveal as="li" key={to} delay={0.06 * i}>
              <TiltCard>
                <Link
                  to={to}
                  className="group flex h-full flex-col rounded-3xl border bg-card p-7 transition duration-300 [transform-style:preserve-3d] hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-black/15 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-clay-soft text-primary [transform:translateZ(28px)]">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h2 className="mt-6 text-2xl font-semibold">{t(title)}</h2>
                  <p className="mt-2 flex-1 text-muted-foreground">{t(desc)}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {t('toolsHub.open')}
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </section>
      <CallToAction />
    </>
  );
}
