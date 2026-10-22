import { ArrowRight, Calculator } from 'lucide-react';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { computeTneaCutoff, isValidMark } from '@/features/tools/cutoff';
import { cn } from '@/lib/utils';

const SUBJECTS = ['maths', 'physics', 'chemistry'] as const;
type Subject = (typeof SUBJECTS)[number];

/** Live TNEA cutoff calculator shown in the hero — the full tool lives at /tools/cutoff-calculator. */
export function QuickCutoffCard({ className }: { className?: string }) {
  const { t } = useTranslation();
  const uid = useId();
  const [marks, setMarks] = useState<Record<Subject, string>>({
    maths: '',
    physics: '',
    chemistry: '',
  });

  const nums = SUBJECTS.map((s) => (marks[s] === '' ? NaN : Number(marks[s])));
  const anyInvalid = SUBJECTS.some((s, i) => marks[s] !== '' && !isValidMark(nums[i]!));
  const complete = nums.every(isValidMark);
  const cutoff = complete ? computeTneaCutoff(nums[0]!, nums[1]!, nums[2]!) : null;

  return (
    <div
      className={cn(
        'relative rounded-3xl border bg-card/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="grid grid-cols-1 size-10 place-items-center rounded-xl bg-clay-soft text-primary">
          <Calculator className="size-5" aria-hidden />
        </span>
        <div>
          <h2 className="font-sans text-base font-semibold">{t('home.quick.title')}</h2>
          <p className="text-xs text-muted-foreground">{t('home.quick.subtitle')}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {SUBJECTS.map((s) => (
          <div key={s}>
            <label
              htmlFor={`${uid}-${s}`}
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              {t(`home.quick.${s}`)}
            </label>
            <input
              id={`${uid}-${s}`}
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              placeholder="0–100"
              value={marks[s]}
              onChange={(e) => setMarks((m) => ({ ...m, [s]: e.target.value }))}
              aria-invalid={marks[s] !== '' && !isValidMark(Number(marks[s])) ? true : undefined}
              className="h-12 w-full rounded-xl border border-input bg-background/60 px-3 text-center text-lg font-semibold tabular-nums outline-none placeholder:text-sm placeholder:font-normal placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 aria-[invalid=true]:border-destructive"
            />
          </div>
        ))}
      </div>

      <div
        className="mt-5 flex items-end justify-between gap-4 rounded-2xl bg-muted/70 p-4"
        aria-live="polite"
      >
        <div>
          <p className="text-xs font-medium text-muted-foreground">{t('home.quick.result')}</p>
          <p className="mt-1 font-serif text-4xl font-semibold tabular-nums">
            {cutoff !== null ? cutoff.toFixed(2) : '—'}
            <span className="ml-1.5 font-sans text-sm font-normal text-muted-foreground">
              {t('home.quick.outOf')}
            </span>
          </p>
        </div>
      </div>
      <p className={cn('mt-2 text-xs', anyInvalid ? 'text-destructive' : 'text-muted-foreground')}>
        {anyInvalid ? t('home.quick.invalid') : t('home.quick.formula')}
      </p>

      <Button asChild variant={cutoff !== null ? 'default' : 'secondary'} className="mt-4 w-full">
        <Link
          to={
            cutoff !== null
              ? `/tools/college-predictor?cutoff=${cutoff}`
              : '/tools/college-predictor'
          }
        >
          {t('home.quick.seeColleges')}
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
