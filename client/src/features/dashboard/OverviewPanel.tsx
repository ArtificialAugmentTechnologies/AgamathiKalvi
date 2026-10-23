import { ArrowRight, BookmarkCheck, CalendarCheck, ListOrdered, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useChoiceList } from '@/features/tools/choiceList';
import { upcoming, useMyBookings, useProfile, useResults } from './api';
import { formatDay, formatTime } from './format';

export function OverviewPanel() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage ?? 'en';
  const choices = useChoiceList();
  const { data: results = [] } = useResults();
  const { data: bookings = [] } = useMyBookings();
  const { data: profile } = useProfile();
  const next = upcoming(bookings)[0];
  const profileIncomplete = profile && !(profile.profile?.classLevel && profile.profile?.district);

  return (
    <div className="space-y-5">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat
          to="/dashboard/choices"
          icon={<ListOrdered />}
          value={choices.length}
          label={t('dashboard.overview.choices')}
        />
        <Stat
          to="/dashboard/results"
          icon={<BookmarkCheck />}
          value={results.length}
          label={t('dashboard.overview.results')}
        />
        <Stat
          to="/dashboard/bookings"
          icon={<CalendarCheck />}
          value={upcoming(bookings).length}
          label={t('dashboard.overview.sessions')}
        />
      </ul>

      <div className="rounded-3xl border bg-card p-6">
        <h2 className="font-sans text-lg font-semibold">{t('dashboard.overview.nextSession')}</h2>
        {next ? (
          <p className="mt-2 font-serif text-2xl">
            {formatDay(next.slot.startsAt, lang)} · {formatTime(next.slot.startsAt, lang)}{' '}
            <span className="font-sans text-base text-muted-foreground">
              · {t(`options.mode.${next.slot.mode}`)}
            </span>
          </p>
        ) : (
          <p className="mt-2 text-muted-foreground">{t('dashboard.overview.noSession')}</p>
        )}
        <Button asChild className="mt-4">
          <Link to="/dashboard/bookings">
            {t('dashboard.overview.book')} <ArrowRight />
          </Link>
        </Button>
      </div>

      {profileIncomplete && (
        <div className="flex flex-col gap-4 rounded-3xl border border-primary/40 bg-clay-soft/30 p-6 sm:flex-row sm:items-center">
          <UserRound className="size-8 shrink-0 text-primary" aria-hidden />
          <div className="flex-1">
            <h2 className="font-sans text-lg font-semibold">
              {t('dashboard.overview.profileTitle')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('dashboard.overview.profileBody')}</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/dashboard/profile">{t('dashboard.overview.profileCta')}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function Stat({
  to,
  icon,
  value,
  label,
}: {
  to: string;
  icon: ReactNode;
  value: number;
  label: string;
}) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-4 rounded-3xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/50 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <span
          className="grid size-12 place-items-center rounded-2xl bg-clay-soft text-primary [&_svg]:size-6"
          aria-hidden
        >
          {icon}
        </span>
        <span>
          <span className="block font-serif text-3xl font-semibold tabular-nums">{value}</span>
          <span className="block text-sm text-muted-foreground">{label}</span>
        </span>
      </Link>
    </li>
  );
}
