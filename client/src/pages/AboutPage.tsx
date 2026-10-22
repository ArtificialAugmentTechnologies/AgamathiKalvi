import { FlaskConical, Quote, Rocket, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { CallToAction } from '@/components/common/CallToAction';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { TiltCard } from '@/components/common/TiltCard';
import { useTeam } from '@/features/content/api';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useSettings } from '@/hooks/useSettings';
import { localized } from '@/lib/format';

const JOURNEY = ['start', 'schools', 'students', 'districts', 'programs', 'next'] as const;

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.resolvedLanguage === 'ta';
  const { data: settings } = useSettings();
  const { data: team = [] } = useTeam();
  usePageMeta(t('pages.about'));

  // The founder is stored as the first team member, with the founder's message as the bio.
  const founder = team.find((m) => m.bio);
  const members = team.filter((m) => m !== founder);
  const stats = settings?.stats_about ?? [];

  return (
    <>
      <PageHeader
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        description={t('about.intro')}
      />

      {stats.length > 0 && (
        <section aria-label={t('about.impact')} className="container-page">
          <ul className="grid grid-cols-2 overflow-hidden rounded-3xl border bg-card lg:grid-cols-4">
            {stats.map((s, i) => (
              <li
                key={s.key}
                className={`px-4 py-7 text-center ${i % 2 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
              >
                <p className="font-serif text-3xl font-semibold sm:text-4xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} display={s.display} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {localized(isTamil, s.label, s.labelTa)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container-page grid grid-cols-1 gap-4 py-20 md:grid-cols-3">
        {[
          { key: 'mission', icon: Target },
          { key: 'vision', icon: Rocket },
          { key: 'rnd', icon: FlaskConical },
        ].map(({ key, icon: Icon }, i) => (
          <Reveal key={key} delay={0.08 * i} className="rounded-3xl border bg-card p-7">
            <span className="grid size-11 place-items-center rounded-xl bg-clay-soft text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <h2 className="mt-5 text-2xl font-semibold">
              {t(`about.${key as 'mission' | 'vision' | 'rnd'}.title`)}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {t(`about.${key as 'mission' | 'vision' | 'rnd'}.body`)}
            </p>
          </Reveal>
        ))}
      </section>

      {founder && (
        <section
          className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-28"
          aria-labelledby="founder-title"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-ink-accent/15 blur-3xl"
          />
          <div className="container-page relative grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-ink-accent uppercase">
                {t('about.founder.eyebrow')}
              </p>
              <h2 id="founder-title" className="mt-3 text-4xl font-semibold">
                {founder.name}
              </h2>
              <p className="mt-2 text-ink-muted">
                {localized(isTamil, founder.role, founder.roleTa)}
              </p>
              {founder.photoUrl ? (
                <div className="relative mt-8 max-w-xs">
                  <div
                    aria-hidden
                    className="absolute inset-x-6 bottom-0 top-16 rounded-[2.5rem] bg-gradient-to-br from-ink-accent/40 via-sky/20 to-transparent blur-2xl"
                  />
                  <img
                    src={founder.photoUrl}
                    alt={`${founder.name}, ${localized(isTamil, founder.role, founder.roleTa)}`}
                    width={388}
                    height={510}
                    loading="lazy"
                    className="relative w-full drop-shadow-2xl"
                  />
                </div>
              ) : (
                <span
                  aria-hidden
                  className="mt-8 grid size-28 place-items-center rounded-full bg-gradient-to-br from-ink-accent to-[#f2b48f] font-serif text-5xl font-semibold text-[#1a0f0a]"
                >
                  {founder.name.charAt(0)}
                </span>
              )}
            </div>
            <blockquote className="relative space-y-5 font-serif text-lg leading-relaxed sm:text-xl">
              <Quote className="size-10 text-ink-accent" aria-hidden />
              {founder.bio!.split('\n\n').map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </blockquote>
          </div>
        </section>
      )}

      {members.length > 0 && (
        <section className="container-page py-20 sm:py-28" aria-labelledby="team-title">
          <SectionHeading
            id="team-title"
            align="center"
            eyebrow={t('about.team.eyebrow')}
            title={t('about.team.title')}
            subtitle={t('about.team.subtitle')}
          />
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {members.map((m, i) => (
              <Reveal as="li" key={m.id} delay={0.05 * i}>
                <TiltCard max={7}>
                  <div className="h-full rounded-3xl border bg-card p-5 text-center">
                    {m.photoUrl ? (
                      <img
                        src={m.photoUrl}
                        alt={m.name}
                        width={160}
                        height={160}
                        loading="lazy"
                        className="mx-auto size-24 rounded-full object-cover ring-4 ring-clay-soft sm:size-28"
                      />
                    ) : (
                      <span className="mx-auto grid size-24 place-items-center rounded-full bg-clay-soft font-serif text-3xl text-primary sm:size-28">
                        {m.name.charAt(0)}
                      </span>
                    )}
                    <p className="mt-4 font-semibold">{m.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {localized(isTamil, m.role, m.roleTa)}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      <section className="container-page pb-20 sm:pb-28" aria-labelledby="journey-title">
        <SectionHeading
          id="journey-title"
          eyebrow={t('about.journey.eyebrow')}
          title={t('about.journey.title')}
        />
        <ol className="relative mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEY.map((key, i) => (
            <Reveal as="li" key={key} delay={0.06 * i}>
              <div className="h-full rounded-3xl border bg-card p-6">
                <span className="inline-flex rounded-full bg-clay-soft px-3 py-1 text-xs font-semibold text-primary">
                  {t(`about.journey.items.${key}.label`)}
                </span>
                <h3 className="mt-4 text-xl font-semibold">
                  {t(`about.journey.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`about.journey.items.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <CallToAction />
    </>
  );
}
