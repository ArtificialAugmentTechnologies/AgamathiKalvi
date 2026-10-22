import { useTranslation } from 'react-i18next';
import { InstagramIcon, YouTubeIcon } from '@/components/icons/BrandIcons';
import { CallToAction } from '@/components/common/CallToAction';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { YouTubeEmbed } from '@/components/common/YouTubeEmbed';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useSettings } from '@/hooks/useSettings';

const FALLBACK_CHANNEL = 'UCowIzeqP1biqg7AwNjnhJaA';

export default function CareerTunerPage() {
  const { t } = useTranslation();
  const { data: settings } = useSettings();
  usePageMeta(t('pages.careerTuner'));

  const channelId = settings?.youtube?.channelId ?? FALLBACK_CHANNEL;
  // A channel's "uploads" playlist id is its channel id with "UC" swapped for "UU".
  const uploadsPlaylist = `UU${channelId.slice(2)}`;
  const youtube = settings?.socials?.youtube;
  const instagram = settings?.socials?.instagram;

  return (
    <>
      <PageHeader
        eyebrow={t('programPages.careerTuner.eyebrow')}
        title={t('pages.careerTuner')}
        description={t('programPages.careerTuner.lead')}
      />

      <section className="container-page grid grid-cols-1 items-center gap-10 pb-20 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <YouTubeEmbed
            playlistId={uploadsPlaylist}
            title={t('pages.careerTuner')}
            playLabel={t('programPages.careerTuner.play')}
            poster="/images/brand/career-tuner.webp"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t('programPages.careerTuner.body')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
      </section>

      <CallToAction />
    </>
  );
}
