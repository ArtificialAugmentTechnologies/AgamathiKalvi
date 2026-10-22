import { Briefcase, GraduationCap, HandCoins, School } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { useSettings } from '@/hooks/useSettings';

const ICONS: Record<string, typeof Briefcase> = {
  careers: GraduationCap,
  scholarships: HandCoins,
  jobs: Briefcase,
  colleges: School,
};

export function StatsBar() {
  const { t, i18n } = useTranslation();
  const { data } = useSettings();
  const stats = data?.stats_home ?? [];
  const isTamil = i18n.resolvedLanguage === 'ta';

  return (
    <section
      aria-label={t('home.stats.label')}
      className="container-page relative z-10 -mt-6 sm:-mt-10"
    >
      <ul className="grid grid-cols-2 overflow-hidden rounded-3xl border bg-card/80 shadow-xl shadow-black/10 backdrop-blur-xl lg:grid-cols-4">
        {(stats.length ? stats : placeholders).map((s, i) => {
          const Icon = ICONS[s.key] ?? GraduationCap;
          return (
            <li
              key={s.key}
              className={`flex flex-col items-center gap-1 px-4 py-6 text-center sm:py-8 ${
                i % 2 === 1 ? 'border-l' : ''
              } ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <Icon className="mb-1 size-5 text-primary" aria-hidden />
              <span className="font-serif text-3xl font-semibold sm:text-4xl">
                {stats.length ? (
                  <AnimatedCounter value={s.value} suffix={s.suffix} display={s.display} />
                ) : (
                  '—'
                )}
              </span>
              <span className="text-sm text-muted-foreground">
                {isTamil && s.labelTa ? s.labelTa : s.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// Same footprint while settings load, so the layout does not jump.
const placeholders = ['careers', 'scholarships', 'jobs', 'colleges'].map((key) => ({
  key,
  value: 0,
  label: ' ',
  labelTa: undefined as string | undefined,
  suffix: '',
  display: undefined as string | undefined,
}));
