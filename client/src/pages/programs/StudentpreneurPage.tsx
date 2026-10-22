import { Brain, HandHeart, Sprout, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CallToAction } from '@/components/common/CallToAction';
import { FeatureGrid } from '@/components/common/FeatureGrid';
import { PageHeader } from '@/components/common/PageHeader';
import { usePageMeta } from '@/hooks/usePageMeta';

const FEATURES = [
  { key: 'knowledge', icon: Brain },
  { key: 'growth', icon: TrendingUp },
  { key: 'creators', icon: Sprout },
  { key: 'give', icon: HandHeart },
] as const;

export default function StudentpreneurPage() {
  const { t } = useTranslation();
  usePageMeta(t('pages.studentpreneur'));

  return (
    <>
      <PageHeader
        eyebrow={t('programPages.studentpreneur.eyebrow')}
        title={t('programPages.studentpreneur.title')}
        description={t('programPages.studentpreneur.lead')}
      />
      <section className="container-page pb-20">
        <FeatureGrid
          columns={2}
          items={FEATURES.map(({ key, icon }) => ({
            key,
            icon,
            tag: t(`programPages.studentpreneur.features.${key}.tag`),
            title: t(`programPages.studentpreneur.features.${key}.title`),
            body: t(`programPages.studentpreneur.features.${key}.body`),
          }))}
        />
      </section>
      <CallToAction title={t('programPages.studentpreneur.join')} />
    </>
  );
}
