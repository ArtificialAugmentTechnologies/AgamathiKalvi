import { useTranslation } from 'react-i18next';
import { InstagramIcon, YouTubeIcon } from '@/components/icons/BrandIcons';
import { CallToAction } from '@/components/common/CallToAction';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { ShortVideoCard } from '@/components/common/ShortVideoCard';
import { Button } from '@/components/ui/button';
import { CAREER_TUNER_SHORTS } from '@/config/videos';
import { EntrepreneurSupport } from '@/features/careers/EntrepreneurSupport';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useSettings } from '@/hooks/useSettings';

export default function CareerTunerPage() {
  const { t } = useTranslation();
  const { data: settings } = useSettings();
  usePageMeta(t('pages.careerTuner'));

  const youtube = settings?.socials?.youtube;
  const instagram = settings?.socials?.instagram;

  return (
    <>
      <PageHeader
        art="careerTuner"
        eyebrow={t('programPages.careerTuner.eyebrow')}
        title={t('pages.careerTuner')}
        description={t('programPages.careerTuner.lead')}
      />

      <section className="container-page pb-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t('programPages.careerTuner.body')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {youtube && (
              <Button asChild>
                <a href={youtube} target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon className="size-5" /> {t('programPages.careerTuner.subscribe')}
                </a>
              </Button>
            )}
            {instagram && (
              <Button variant="outline" asChild>
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="size-5" /> {t('programPages.careerTuner.follow')}
                </a>
              </Button>
            )}
          </div>
        </Reveal>

        <EntrepreneurSupport />

        <h2 className="mt-20 text-center text-3xl font-semibold sm:text-4xl">
          {t('programPages.careerTuner.shortsTitle')}
        </h2>
        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {CAREER_TUNER_SHORTS.map((video, i) => (
            <Reveal as="li" key={video.id} delay={0.08 * i} className="mx-auto w-full max-w-xs">
              <ShortVideoCard
                video={video}
                title={t('programPages.careerTuner.shortTitle', { n: i + 1 })}
                playLabel={t('common.playVideo')}
              />
            </Reveal>
          ))}
        </ul>
      </section>

      <CallToAction />
    </>
  );
}
