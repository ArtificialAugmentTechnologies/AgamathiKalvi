import { Brain, Calculator, HandCoins, Target, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/format';
import { useDeleteResult, useResults, type SavedResult } from './api';

const TOOL = {
  cutoff: { icon: Calculator, to: () => '/tools/cutoff-calculator' },
  predictor: {
    icon: Target,
    to: (r: SavedResult) => {
      const i = r.input as {
        cutoff?: number;
        community?: string;
        branches?: string[];
        districts?: string[];
      };
      const q = new URLSearchParams({
        cutoff: String(i.cutoff ?? ''),
        community: i.community ?? 'OC',
      });
      if (i.branches?.length) q.set('branches', i.branches.join(','));
      if (i.districts?.length) q.set('districts', i.districts.join(','));
      return `/tools/college-predictor?${q}`;
    },
  },
  quiz: { icon: Brain, to: () => '/tools/career-quiz' },
  scholarship: { icon: HandCoins, to: () => '/tools/scholarships' },
} as const;

export function ResultsPanel() {
  const { t, i18n } = useTranslation();
  const { data: results = [], isPending } = useResults();
  const remove = useDeleteResult();

  if (!isPending && results.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
        {t('dashboard.results.empty')}
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {results.map((r) => {
        const { icon: Icon, to } = TOOL[r.tool];
        return (
          <li
            key={r.id}
            className="flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-clay-soft text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold tracking-wider text-primary uppercase">
                {t(`dashboard.results.tool.${r.tool}`)}
              </p>
              <p className="font-semibold">{r.title}</p>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.results.saved', {
                  date: formatDate(r.createdAt, i18n.resolvedLanguage ?? 'en'),
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to={to(r)}>{t('dashboard.results.open')}</Link>
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={t('dashboard.results.delete')}
                disabled={remove.isPending}
                onClick={() => remove.mutate(r.id)}
              >
                <Trash2 />
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
