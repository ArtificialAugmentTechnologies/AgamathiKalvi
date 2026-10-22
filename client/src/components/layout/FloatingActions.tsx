import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { Button } from '@/components/ui/button';
import { useBookCounselling } from '@/features/booking/useBookCounselling';
import { useSettings, useWhatsAppNumber } from '@/hooks/useSettings';

/** Sticky WhatsApp button (all screens) + bottom booking bar (phones and tablets). */
export function FloatingActions() {
  const { t } = useTranslation();
  const number = useWhatsAppNumber();
  const { data } = useSettings();
  const book = useBookCounselling();
  const phone = data?.contact?.phones[0]?.replace(/\s/g, '');
  const waHref = `https://wa.me/${number}?text=${encodeURIComponent(t('common.whatsapp.message'))}`;

  return (
    <>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('common.whatsapp.label')}
        title={t('common.whatsapp.label')}
        className="group fixed right-4 bottom-[5.5rem] z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-[#05230f] shadow-lg shadow-black/30 transition-transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-whatsapp/40 focus-visible:outline-none lg:right-6 lg:bottom-6"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-whatsapp/60 motion-safe:animate-ping [animation-duration:2.5s]"
        />
        <WhatsAppIcon className="relative size-7" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/85 px-4 pt-3 pb-safe backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-xl gap-2">
          <Button className="min-w-0 flex-1" size="lg" onClick={book}>
            <span className="truncate">{t('common.bookShort')}</span>
          </Button>
          {phone && (
            <Button variant="outline" size="lg" className="px-4" asChild>
              <a href={`tel:${phone}`} aria-label={t('common.callUs')}>
                <Phone className="size-5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
