import { AlertTriangle, ExternalLink, HandCoins } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CallToAction } from '@/components/common/CallToAction';
import { ChipGroup } from '@/components/common/ChipGroup';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { useScholarships } from '@/features/tools/api';
import { COMMUNITIES, type Scholarship } from '@/features/tools/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { formatInrShort, localized } from '@/lib/format';
import { cn } from '@/lib/utils';

const CLASSES = ['class10', 'class11', 'class12'] as const;
const STREAMS = ['science', 'commerce', 'arts', 'vocational'] as const;
// Upper bound of each income band, used as the "family income" sent to the API.
const INCOME = { u1: 100000, u2: 250000, u3: 350000, u4: 450000, above: 1000000 } as const;
type IncomeKey = keyof typeof INCOME;
// Stream names reuse the Class 10 page's stream titles.
const STREAM_LABEL_KEYS = {
  science: 'programPages.class10.streams.science.title',
  commerce: 'programPages.class10.streams.commerce.title',
  arts: 'programPages.class10.streams.arts.title',
  vocational: 'programPages.class10.streams.vocational.title',
} as const;

export default function ScholarshipsPage() {
  const { t } = useTranslation();
  usePageMeta(t('pages.scholarships'));
  const [classLevel, setClassLevel] = useState<string[]>([]);
  const [community, setCommunity] = useState<string[]>([]);
  const [income, setIncome] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([]);
  const [stream, setStream] = useState<string[]>([]);

  const { data, isFetching } = useScholarships({
    classLevel: classLevel[0],
    community: community[0],
    income: income[0] ? INCOME[income[0] as IncomeKey] : undefined,
    gender: gender[0],
    stream: stream[0],
  });
  const items = data?.items ?? [];

  return (
    <>
      <PageHeader
        art="scholarships"
        eyebrow={t('nav.toolsHeading')}
        title={t('pages.scholarships')}
        description={t('scholarshipsPage.lead')}
      />

      <section className="container-page grid grid-cols-1 gap-6 pb-16 lg:grid-cols-[22rem_1fr] lg:items-start">
        <div className="space-y-5 rounded-3xl border bg-card p-6 lg:sticky lg:top-24">
          <ChipGroup
            single
            label={t('scholarshipsPage.classLevel')}
            anyLabel={t('scholarshipsPage.any')}
            options={CLASSES.map((c) => ({ value: c, label: t(`options.class.${c}`) }))}
            value={classLevel}
            onChange={setClassLevel}
          />
          <ChipGroup
            single
            label={t('scholarshipsPage.community')}
            anyLabel={t('scholarshipsPage.any')}
            options={COMMUNITIES.map((c) => ({ value: c, label: c }))}
            value={community}
            onChange={setCommunity}
          />
          <ChipGroup
            single
            label={t('scholarshipsPage.income')}
            anyLabel={t('scholarshipsPage.any')}
            options={(Object.keys(INCOME) as IncomeKey[]).map((k) => ({
              value: k,
              label: t(`scholarshipsPage.incomeOptions.${k}`),
            }))}
            value={income}
            onChange={setIncome}
          />
          <ChipGroup
            single
            label={t('scholarshipsPage.gender')}
            anyLabel={t('scholarshipsPage.any')}
            options={[
              { value: 'female', label: t('scholarshipsPage.female') },
              { value: 'male', label: t('scholarshipsPage.male') },
            ]}
            value={gender}
            onChange={setGender}
          />
          <ChipGroup
            single
            label={t('scholarshipsPage.stream')}
            anyLabel={t('scholarshipsPage.any')}
            options={STREAMS.map((s) => ({ value: s, label: t(STREAM_LABEL_KEYS[s]) }))}
            value={stream}
            onChange={setStream}
          />
        </div>

        <div aria-live="polite">
          <p className="font-sans text-lg font-semibold">
            {t('scholarshipsPage.results', { count: items.length })}
          </p>
          <ul className={cn('mt-5 space-y-4 transition-opacity', isFetching && 'opacity-60')}>
            {items.map((s, i) => (
              <ScholarshipCard key={s.id} s={s} index={i} />
            ))}
          </ul>
          {data && items.length === 0 && (
            <p className="mt-5 rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
              {t('scholarshipsPage.empty')}
            </p>
          )}
          {data?.isSample && (
            <p className="mt-6 flex gap-2 rounded-2xl border border-brand-yellow/30 bg-brand-yellow/5 p-4 text-sm text-muted-foreground">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-brand-yellow" aria-hidden />
              {t('scholarshipsPage.sampleNotice')}
            </p>
          )}
        </div>
      </section>

      <CallToAction />
    </>
  );
}

function ScholarshipCard({ s, index }: { s: Scholarship; index: number }) {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.resolvedLanguage === 'ta';
  const tags = [
    s.classLevels.length
      ? `${t('scholarshipsPage.eligibility.classes')}: ${s.classLevels.map((c) => t(`options.class.${c as (typeof CLASSES)[number]}`)).join(', ')}`
      : null,
    s.communities.length
      ? `${t('scholarshipsPage.eligibility.communities')}: ${s.communities.join(', ')}`
      : null,
    s.incomeMax
      ? t('scholarshipsPage.eligibility.incomeUpTo', { amount: formatInrShort(s.incomeMax) })
      : null,
    s.gender === 'female'
      ? t('scholarshipsPage.eligibility.girls')
      : s.gender === 'male'
        ? t('scholarshipsPage.eligibility.boys')
        : null,
  ].filter(Boolean) as string[];

  return (
    <Reveal as="li" delay={Math.min(index, 6) * 0.05} y={10}>
      <article className="rounded-3xl border bg-card p-6">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-clay-soft text-primary">
            <HandCoins className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-sans text-lg font-semibold">
              {localized(isTamil, s.name, s.nameTa)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('scholarshipsPage.provider')}: {s.provider}
            </p>
            <p className="mt-3 text-sm leading-relaxed">{s.description}</p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">{t('scholarshipsPage.amount')}: </span>
              <span className="text-primary">{s.amount}</span>
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {(tags.length ? tags : [t('scholarshipsPage.eligibility.allStudents')]).map((tag) => (
                <li key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {tag}
                </li>
              ))}
            </ul>
            {s.link && (
              <Button asChild variant="link" className="mt-3">
                <a href={s.link} target="_blank" rel="noopener noreferrer">
                  {t('scholarshipsPage.official')} <ExternalLink />
                </a>
              </Button>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
