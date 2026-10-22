import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { useBookCounselling } from '@/features/booking/useBookCounselling';
import { useWhatsAppNumber } from '@/hooks/useSettings';

export function ClosingCta() {
  const { t } = useTranslation();
  const book = useBookCounselling();
  const whatsapp = useWhatsAppNumber();

  return (
    <section className="container-page pb-20 sm:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1b2b52] via-ink to-[#3a2420] p-8 text-center text-ink-foreground sm:p-14">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold sm:text-5xl">
              {t('home.cta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-muted sm:text-lg">{t('home.cta.body')}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={book}
                className="bg-ink-accent text-[#1a0f0a] hover:bg-ink-accent/90"
              >
                {t('common.bookCounselling')} <ArrowRight />
              </Button>
              <Button size="lg" variant="whatsapp" asChild>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" /> {t('home.cta.whatsapp')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
