import { AlertTriangle, Check, ListPlus, MapPin, Pencil, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage, type Language } from '@/i18n';
import { Link, useSearchParams } from 'react-router-dom';
import { CallToAction } from '@/components/common/CallToAction';
import { ChipGroup } from '@/components/common/ChipGroup';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { Sparkline } from '@/components/common/Sparkline';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/form-controls';
import { TN_DISTRICTS } from '@/config/tamil-nadu';
import { SaveResultButton } from '@/features/auth/SaveResultButton';
import { useBranches, usePrediction, type PredictParams } from '@/features/tools/api';
import { choiceList, useChoiceList } from '@/features/tools/choiceList';
import { COMMUNITIES, type Chance, type Prediction } from '@/features/tools/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { localized } from '@/lib/format';
import { cn } from '@/lib/utils';

const CHANCES: Chance[] = ['safe', 'moderate', 'dream'];
const TONE: Record<Chance, string> = {
  safe: 'text-success bg-success/12 border-success/30',
  moderate: 'text-sky bg-sky/12 border-sky/30',
  dream: 'text-dream bg-dream/12 border-dream/30',
};

const list = (v: string | null) => (v ? v.split(',').filter(Boolean) : []);

export default function PredictorPage() {
  const { t } = useTranslation();
  const lang = useLanguage();
  usePageMeta(t('pages.predictor'));
  const [params, setParams] = useSearchParams();

  // The form starts from the URL (e.g. ?cutoff=184 from the calculator).
  const [cutoff, setCutoff] = useState(params.get('cutoff') ?? '');
  const [community, setCommunity] = useState(params.get('community') ?? 'OC');
  const [branches, setBranches] = useState<string[]>(list(params.get('branches')));
  const [districts, setDistricts] = useState<string[]>(list(params.get('districts')));
  const [submitted, setSubmitted] = useState<PredictParams | null>(() =>
    params.get('community') && params.get('cutoff') ? toParams() : null,
  );
  const [tab, setTab] = useState<Chance>('safe');

  function toParams(): PredictParams {
    return { cutoff: Number(cutoff), community, branches, districts };
  }
  const cutoffValid = cutoff !== '' && Number(cutoff) >= 0 && Number(cutoff) <= 200;

  const submit = () => {
    if (!cutoffValid) return;
    const p = toParams();
    setSubmitted(p);
    setTab('safe');
    setParams(
      {
        cutoff,
        community,
        ...(branches.length && { branches: branches.join(',') }),
        ...(districts.length && { districts: districts.join(',') }),
      },
      { replace: true },
    );
  };

  const { data: allBranches = [] } = useBranches();
  const { data, isFetching, isError } = usePrediction(submitted);
  const counts = data ? CHANCES.map((c) => data.groups[c].length) : [0, 0, 0];
  const total = counts.reduce((a, b) => a + b, 0);
  const topDistricts = useMemo(
    () =>
      Object.entries(data?.districtCounts ?? {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8),
    [data],
  );

  return (
    <>
      <PageHeader
        art="predictor"
        eyebrow={t('nav.toolsHeading')}
        title={t('pages.predictor')}
        description={t('predictor.lead')}
      />

      <section className="container-page grid grid-cols-1 gap-6 pb-16 lg:grid-cols-[22rem_1fr] lg:items-start">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="space-y-5 rounded-3xl border bg-card p-6 lg:sticky lg:top-24"
        >
          <Field id="pd-cutoff" label={t('predictor.cutoff')} hint={t('predictor.cutoffHint')}>
            <Input
              id="pd-cutoff"
              type="number"
              inputMode="decimal"
              step="0.5"
              min={0}
              max={200}
              required
              value={cutoff}
              onChange={(e) => setCutoff(e.target.value)}
              aria-describedby="pd-cutoff-hint"
              className="font-serif text-2xl font-semibold"
            />
          </Field>
          <Link
            to="/tools/cutoff-calculator"
            className="-mt-3 block text-xs font-semibold text-primary hover:underline"
          >
            {t('pages.cutoff')} →
          </Link>
          <ChipGroup
            label={t('predictor.community')}
            single
            anyLabel="OC"
            options={COMMUNITIES.filter((c) => c !== 'OC').map((c) => ({ value: c, label: c }))}
            value={community === 'OC' ? [] : [community]}
            onChange={(v) => setCommunity(v[0] ?? 'OC')}
          />
          <ChipGroup
            label={t('predictor.branches')}
            anyLabel={t('predictor.any')}
            options={allBranches.map((b) => ({ value: b.code, label: b.code }))}
            value={branches}
            onChange={setBranches}
          />
          <details className="group">
            <summary className="cursor-pointer list-none text-sm font-medium">
              {t('predictor.districts')}{' '}
              <span className="text-muted-foreground">
                ({districts.length || t('predictor.any')})
              </span>
              <span className="float-right text-muted-foreground transition group-open:rotate-180">
                ▾
              </span>
            </summary>
            <ChipGroup
              className="mt-3 max-h-56 overflow-y-auto pr-1"
              label={t('predictor.districts')}
              anyLabel={t('predictor.any')}
              options={TN_DISTRICTS.map((d) => ({ value: d, label: d }))}
              value={districts}
              onChange={setDistricts}
            />
          </details>
          <Button type="submit" size="lg" className="w-full" disabled={!cutoffValid}>
            <Sparkles /> {t('predictor.submit')}
          </Button>
        </form>

        <div aria-live="polite" aria-busy={isFetching}>
          {!submitted && (
            <div className="grid min-h-80 place-items-center rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
              <p className="max-w-sm">{t('predictor.disclaimer')}</p>
            </div>
          )}

          {submitted && (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-sans text-lg font-semibold">
                  {t('predictor.resultsFor', {
                    cutoff: submitted.cutoff,
                    community: submitted.community,
                  })}
                </h2>
                {data?.isSample && (
                  <span className="rounded-full bg-brand-yellow/15 px-2.5 py-1 text-xs font-semibold text-brand-yellow">
                    {t('predictor.sample')}
                  </span>
                )}
                {data && total > 0 && (
                  <SaveResultButton
                    tool="predictor"
                    className="ml-auto h-9 px-4 text-sm"
                    title={t('predictor.resultsFor', {
                      cutoff: submitted.cutoff,
                      community: submitted.community,
                    })}
                    input={{ ...submitted }}
                    output={{ safe: counts[0], moderate: counts[1], dream: counts[2] }}
                  />
                )}
                <a
                  href="#pd-cutoff"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary lg:hidden"
                >
                  <Pencil className="size-3.5" aria-hidden /> {t('predictor.edit')}
                </a>
              </div>

              {/* Group tabs */}
              <div role="tablist" className="mt-5 grid grid-cols-3 gap-2">
                {CHANCES.map((c, i) => (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={tab === c}
                    onClick={() => setTab(c)}
                    className={cn(
                      'rounded-2xl border p-3 text-left transition focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none sm:p-4',
                      tab === c ? TONE[c] : 'bg-card hover:border-primary/40',
                    )}
                  >
                    <span className="block font-serif text-3xl font-semibold tabular-nums">
                      {isFetching ? '…' : counts[i]}
                    </span>
                    <span className="block text-sm font-semibold">
                      {t(`predictor.groups.${c}.title`)}
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {t(`predictor.groups.${tab}.desc`)}
              </p>

              {isError && <p className="mt-6 text-destructive">{t('forms.errors.generic')}</p>}
              {data && total === 0 && (
                <p className="mt-6 rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
                  {t('predictor.emptyAll')}
                </p>
              )}
              {data && total > 0 && data.groups[tab].length === 0 && (
                <p className="mt-6 rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
                  {t('predictor.empty')}
                </p>
              )}

              <ul className={cn('mt-5 space-y-3 transition-opacity', isFetching && 'opacity-50')}>
                {data?.groups[tab].map((p, i) => (
                  <ResultRow key={p.id} p={p} index={i} lang={lang} />
                ))}
              </ul>

              {topDistricts.length > 0 && (
                <div className="mt-8 rounded-3xl border bg-card p-6">
                  <h3 className="flex items-center gap-2 font-sans font-semibold">
                    <MapPin className="size-4 text-primary" aria-hidden />{' '}
                    {t('predictor.districtsTitle')}
                  </h3>
                  <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {topDistricts.map(([d, n]) => (
                      <li
                        key={d}
                        className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2 text-sm"
                      >
                        <span className="truncate">{d}</span>
                        <span className="ml-2 font-semibold tabular-nums text-primary">{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-6 flex gap-2 rounded-2xl border border-brand-yellow/30 bg-brand-yellow/5 p-4 text-sm text-muted-foreground">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-brand-yellow" aria-hidden />
                <span>
                  {t('predictor.disclaimer')} {data?.isSample && t('predictor.sampleNotice')}
                </span>
              </p>
            </>
          )}
        </div>
      </section>

      <CallToAction
        preset={
          submitted
            ? { cutoff: submitted.cutoff, interest: 'engineering' }
            : { interest: 'engineering' }
        }
      />
    </>
  );
}

function ResultRow({ p, index, lang }: { p: Prediction; index: number; lang: Language }) {
  const { t } = useTranslation();
  const saved = useChoiceList().some((c) => c.id === p.id);
  const marginLabel =
    p.margin >= 0
      ? t('predictor.above', { value: p.margin.toFixed(1) })
      : t('predictor.below', { value: Math.abs(p.margin).toFixed(1) });

  return (
    <Reveal as="li" delay={Math.min(index, 8) * 0.03} y={10}>
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-snug">
            {p.college.name}
            {p.college.shortName && (
              <span className="text-muted-foreground"> · {p.college.shortName}</span>
            )}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {localized(lang, p.branch.name, p.branch.nameTa, p.branch.nameHi)} ·{' '}
            {p.college.district}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Sparkline
            points={p.history}
            label={t('predictor.trend')}
            className={cn('shrink-0', TONE[p.chance].split(' ')[0])}
          />
          <div className="text-right">
            <p className="font-serif text-xl font-semibold tabular-nums">
              {p.closingCutoff.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('predictor.closing', { year: p.year })}
            </p>
          </div>
          <span
            className={cn(
              'hidden rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap sm:inline',
              TONE[p.chance],
            )}
          >
            {marginLabel}
          </span>
          <Button
            size="icon-sm"
            variant={saved ? 'secondary' : 'outline'}
            onClick={() => (saved ? choiceList.remove(p.id) : choiceList.add(p))}
            aria-pressed={saved}
            aria-label={saved ? t('predictor.added') : t('predictor.add')}
            title={saved ? t('predictor.added') : t('predictor.add')}
          >
            {saved ? <Check className="text-success" /> : <ListPlus />}
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
