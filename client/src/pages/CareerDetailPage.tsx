import {
  ArrowLeft,
  BookOpenCheck,
  ClipboardList,
  GraduationCap,
  HandCoins,
  IndianRupee,
  School,
  TrendingUp,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { CallToAction } from '@/components/common/CallToAction';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { interestForCluster } from '@/features/careers/careers';
import { useCareer } from '@/features/content/api';
import { usePageMeta } from '@/hooks/usePageMeta';
import { formatInrShort, localized } from '@/lib/format';

export default function CareerDetailPage() {
  const { slug = '' } = useParams();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.resolvedLanguage === 'ta';
  const { data: career, isPending, isError } = useCareer(slug);
  const title = career ? localized(isTamil, career.title, career.titleTa) : t('pages.careerDetail');
  usePageMeta(title);

  if (isPending) {
    return (
      <div className="container-page min-h-[60vh] py-24" aria-busy>
        <div className="h-12 w-2/3 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (isError || !career) {
    return (
      <PageHeader eyebrow="404" title={t('careerDetail.notFound')}>
        <Button asChild>
          <Link to="/careers">
            <ArrowLeft /> {t('careerDetail.back')}
          </Link>
        </Button>
      </PageHeader>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`${localized(isTamil, career.stream.name, career.stream.nameTa)} · ${t(`careersHub.entry.${career.entry}`)}`}
        title={title}
        description={career.summary}
      >
        <Button variant="outline" asChild>
          <Link to="/careers">
            <ArrowLeft /> {t('careerDetail.back')}
          </Link>
        </Button>
      </PageHeader>

      <section className="container-page grid grid-cols-1 gap-4 pb-20 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Block icon={<BookOpenCheck />} title={t('careerDetail.overview')}>
            <p>{career.overview}</p>
          </Block>
          <Block icon={<GraduationCap />} title={t('careerDetail.eligibility')}>
            <p>{career.eligibility}</p>
          </Block>
          <Block icon={<TrendingUp />} title={t('careerDetail.futureScope')}>
            <p>{career.futureScope}</p>
          </Block>
          {career.scholarshipNote && (
            <Block icon={<HandCoins />} title={t('careerDetail.scholarships')}>
              <p>{career.scholarshipNote}</p>
            </Block>
          )}
        </div>

        <aside className="space-y-4">
          {career.salaryMin && career.salaryMax && (
            <Block icon={<IndianRupee />} title={t('careerDetail.salary')}>
              <p className="font-serif text-2xl font-semibold text-foreground">
                {t('careerDetail.salaryRange', {
                  min: formatInrShort(career.salaryMin),
                  max: formatInrShort(career.salaryMax),
                })}
              </p>
            </Block>
          )}
          <Block icon={<ClipboardList />} title={t('careerDetail.exams')}>
            <ul className="flex flex-wrap gap-2">
              {career.exams.map((e) => (
                <li
                  key={e}
                  className="rounded-full bg-sky-soft px-3 py-1 text-sm font-medium text-sky"
                >
                  {e}
                </li>
              ))}
            </ul>
          </Block>
          <Block icon={<School />} title={t('careerDetail.topColleges')}>
            <ul className="space-y-2">
              {career.topColleges.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </Block>
        </aside>
      </section>

      <CallToAction
        title={t('careerDetail.ctaTitle')}
        body={t('careerDetail.ctaBody')}
        preset={{ interest: interestForCluster(career.cluster) }}
      />
    </>
  );
}

function Block({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Reveal className="rounded-3xl border bg-card p-6 sm:p-7">
      <h2 className="flex items-center gap-3 font-sans text-lg font-semibold">
        <span
          className="grid size-9 place-items-center rounded-lg bg-clay-soft text-primary [&_svg]:size-[18px]"
          aria-hidden
        >
          {icon}
        </span>
        {title}
      </h2>
      <div className="mt-4 leading-relaxed text-muted-foreground">{children}</div>
    </Reveal>
  );
}
