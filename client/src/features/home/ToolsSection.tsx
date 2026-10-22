import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/common/Reveal';
import { TiltCard } from '@/components/common/TiltCard';
import { ThreeStage } from '@/components/three/ThreeStage';
import { loadShapesScene } from '@/components/three/scenes';
import { SectionHeading } from '@/components/common/SectionHeading';
import { toolLinks } from '@/config/navigation';
import { cn } from '@/lib/utils';

export function ToolsSection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-28"
      aria-labelledby="tools-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-sky/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-ink-accent/15 blur-3xl"
      />
      <ThreeStage scene={loadShapesScene} className="absolute inset-0" />
      <div className="container-page relative">
        <SectionHeading
          id="tools-title"
          tone="ink"
          eyebrow={t('home.tools.eyebrow')}
          title={t('home.tools.title')}
          subtitle={t('home.tools.subtitle')}
        />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {toolLinks.map((tool, i) => {
            const Icon = tool.icon;
            // First two cards are wider on desktop: 3 + 3, then 2 + 2 + 2.
            const span = i < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            return (
              <Reveal
                as="li"
                key={tool.to}
                delay={0.06 * i}
                className={cn(span, i === 0 && 'sm:col-span-2 lg:col-span-3')}
              >
                <TiltCard>
                  <Link
                    to={tool.to}
                    className="group relative flex h-full [transform-style:preserve-3d] flex-col rounded-3xl border border-ink-border bg-ink-2/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-ink-accent/60 hover:bg-ink-2 focus-visible:ring-[3px] focus-visible:ring-ink-accent/50 focus-visible:outline-none sm:p-7"
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-ink-accent/15 text-ink-accent transition-transform [transform:translateZ(28px)] group-hover:scale-110">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <span className="rounded-full border border-ink-border px-2.5 py-1 text-[11px] font-semibold tracking-wide text-ink-muted uppercase">
                        {t('home.tools.free')}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{t(tool.title)}</h3>
                    <p className="mt-2 flex-1 text-sm text-ink-muted">{t(tool.desc)}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-accent">
                      {t('home.tools.open')}
                      <ArrowUpRight
                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
