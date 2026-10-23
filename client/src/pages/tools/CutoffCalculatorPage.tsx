import { ArrowRight, Calculator } from 'lucide-react';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { CallToAction } from '@/components/common/CallToAction';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { SaveResultButton } from '@/features/auth/SaveResultButton';
import { computeTneaCutoff, isValidMark } from '@/features/tools/cutoff';
import { usePageMeta } from '@/hooks/usePageMeta';
import { cn } from '@/lib/utils';

const SUBJECTS = ['maths', 'physics', 'chemistry'] as const;
type Subject = (typeof SUBJECTS)[number];

export default function CutoffCalculatorPage() {
  const { t } = useTranslation();
  const uid = useId();
  const [marks, setMarks] = useState<Record<Subject, string>>({
    maths: '',
    physics: '',
    chemistry: '',
  });
  usePageMeta(t('pages.cutoff'));

  const nums = SUBJECTS.map((s) => (marks[s] === '' ? NaN : Number(marks[s])));
  const invalid = SUBJECTS.filter((s, i) => marks[s] !== '' && !isValidMark(nums[i]!));
  const complete = nums.every(isValidMark);
  const cutoff = complete ? computeTneaCutoff(nums[0]!, nums[1]!, nums[2]!) : null;

  // Each subject's contribution, for the breakdown bars (shown as soon as a mark is valid).
  const parts = [
    {
      key: 'maths',
      label: t('cutoffPage.maths'),
      value: isValidMark(nums[0]!) ? nums[0]! : 0,
      max: 100,
    },
    {
      key: 'physics',
      label: t('cutoffPage.physics'),
      value: isValidMark(nums[1]!) ? nums[1]! / 2 : 0,
      max: 50,
    },
    {
      key: 'chemistry',
      label: t('cutoffPage.chemistry'),
      value: isValidMark(nums[2]!) ? nums[2]! / 2 : 0,
      max: 50,
    },
  ];
  const shareHref =
    cutoff !== null
      ? `https://wa.me/?text=${encodeURIComponent(t('cutoffPage.shareText', { cutoff: cutoff.toFixed(2), url: window.location.href }))}`
      : undefined;

  return (
    <>
      <PageHeader
        art="cutoff"
        eyebrow={t('nav.toolsHeading')}
        title={t('pages.cutoff')}
        description={t('cutoffPage.lead')}
      />

      <section className="container-page grid grid-cols-1 gap-6 pb-16 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="rounded-3xl border bg-card p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SUBJECTS.map((s) => (
              <div key={s}>
                <label htmlFor={`${uid}-${s}`} className="mb-2 block text-sm font-medium">
                  {t(`home.quick.${s}`)}
                </label>
                <input
                  id={`${uid}-${s}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={100}
                  step="0.5"
                  placeholder="0–100"
                  value={marks[s]}
                  onChange={(e) => setMarks((m) => ({ ...m, [s]: e.target.value }))}
                  aria-invalid={invalid.includes(s) || undefined}
                  className="h-16 w-full rounded-2xl border border-input bg-background/60 px-4 text-center font-serif text-3xl font-semibold tabular-nums outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 aria-[invalid=true]:border-destructive"
                />
              </div>
            ))}
          </div>
          {invalid.length > 0 && (
            <p role="alert" className="mt-3 text-sm font-medium text-destructive">
              {t('home.quick.invalid')}
            </p>
          )}

          <div className="mt-8 rounded-3xl bg-muted/70 p-6 text-center" aria-live="polite">
            <p className="text-sm font-medium text-muted-foreground">{t('home.quick.result')}</p>
            <p className="mt-1 font-serif text-6xl font-semibold tabular-nums sm:text-7xl">
              {cutoff !== null ? cutoff.toFixed(2) : '—'}
            </p>
            <p className="text-muted-foreground">{t('home.quick.outOf')}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="flex-1"
              variant={cutoff !== null ? 'default' : 'secondary'}
            >
              <Link
                to={
                  cutoff !== null
                    ? `/tools/college-predictor?cutoff=${cutoff}`
                    : '/tools/college-predictor'
                }
              >
                {t('cutoffPage.predict')} <ArrowRight />
              </Link>
            </Button>
            {cutoff !== null && (
              <SaveResultButton
                tool="cutoff"
                title={`${t('home.quick.result')}: ${cutoff.toFixed(2)} / 200`}
                input={{ maths: nums[0], physics: nums[1], chemistry: nums[2] }}
                output={{ cutoff }}
              />
            )}
            {shareHref && (
              <Button asChild size="lg" variant="whatsapp">
                <a href={shareHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" /> {t('cutoffPage.share')}
                </a>
              </Button>
            )}
          </div>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={0.08} className="rounded-3xl border bg-card p-6 sm:p-7">
            <h2 className="font-sans text-lg font-semibold">{t('cutoffPage.breakdownTitle')}</h2>
            <ul className="mt-5 space-y-4">
              {parts.map((p) => (
                <li key={p.key}>
                  <div className="flex justify-between text-sm">
                    <span>{p.label}</span>
                    <span className="font-semibold tabular-nums">
                      {p.value.toFixed(2)} / {p.max}
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        'h-full rounded-full bg-gradient-to-r from-primary to-[#f2b48f] transition-[width] duration-500',
                      )}
                      style={{ width: `${(p.value / p.max) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.14} className="rounded-3xl border bg-card p-6 sm:p-7">
            <h2 className="flex items-center gap-2 font-sans text-lg font-semibold">
              <Calculator className="size-5 text-primary" aria-hidden /> {t('cutoffPage.howTitle')}
            </h2>
            <p className="mt-3 font-serif text-xl">{t('home.quick.formula')}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t('cutoffPage.howBody')}
            </p>
            <p className="mt-4 text-sm">
              <span className="font-semibold">{t('cutoffPage.exampleTitle')}: </span>
              <span className="text-muted-foreground">{t('cutoffPage.example')}</span>
            </p>
            <p className="mt-4 text-xs text-muted-foreground">{t('cutoffPage.note')}</p>
          </Reveal>
        </div>
      </section>

      <CallToAction
        preset={cutoff !== null ? { cutoff, interest: 'engineering' } : { interest: 'engineering' }}
      />
    </>
  );
}
