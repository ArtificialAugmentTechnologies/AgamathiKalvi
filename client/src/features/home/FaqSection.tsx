import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n';
import { localized } from '@/lib/format';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { SectionHeading } from '@/components/common/SectionHeading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useWhatsAppNumber } from '@/hooks/useSettings';
import { useFaqs } from './api';

export function FaqSection() {
  const { t } = useTranslation();
  const { data: faqs = [] } = useFaqs();
  const whatsapp = useWhatsAppNumber();
  const lang = useLanguage();

  return (
    <section className="container-page py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            id="faq-title"
            eyebrow={t('home.faq.eyebrow')}
            title={t('home.faq.title')}
          />
          <div className="mt-8 rounded-2xl border bg-card p-5">
            <p className="font-semibold">{t('home.faq.more')}</p>
            <Button variant="whatsapp" className="mt-4" asChild>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" /> {t('home.faq.ask')}
              </a>
            </Button>
          </div>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger>
                {localized(lang, f.question, f.questionTa, f.questionHi)}
              </AccordionTrigger>
              <AccordionContent>
                {localized(lang, f.answer, f.answerTa, f.answerHi)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
