import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, Mail, MapPin, Navigation, Phone, Send } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { PageHeader } from '@/components/common/PageHeader';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { Field, fieldAria, Input, Select, Textarea } from '@/components/ui/form-controls';
import type { TKey } from '@/config/navigation';
import { CLASS_OPTIONS } from '@/config/tamil-nadu';
import { useBookCounselling } from '@/features/booking/useBookCounselling';
import { leadErrorKey, mobileField, nameField, useCreateLead } from '@/features/leads/leads';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useSettings, useWhatsAppNumber } from '@/hooks/useSettings';

const schema = z.object({
  name: nameField,
  phone: mobileField,
  email: z.string().trim().email('forms.errors.email').optional().or(z.literal('')),
  classLevel: z.enum(CLASS_OPTIONS).optional().or(z.literal('')),
  message: z.string().trim().min(5, 'forms.errors.required').max(2000),
  preferredTime: z.string().trim().max(40).optional(),
  website: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const { t } = useTranslation();
  const { data: settings } = useSettings();
  const whatsapp = useWhatsAppNumber();
  const book = useBookCounselling();
  const [params, setParams] = useSearchParams();
  const createLead = useCreateLead();
  const contact = settings?.contact;
  usePageMeta(t('pages.contact'));

  // Old links like /contact?intent=counselling open the booking dialog directly.
  useEffect(() => {
    if (params.get('intent') === 'counselling') {
      book();
      setParams({}, { replace: true });
    }
  }, [params, book, setParams]);

  const { register, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });
  const err = (name: keyof FormValues) => {
    const m = formState.errors[name]?.message;
    return m ? t(m as TKey) : undefined;
  };

  const onSubmit = handleSubmit(async (v) => {
    try {
      await createLead.mutateAsync({
        type: 'contact',
        source: 'contact-page',
        name: v.name,
        phone: v.phone,
        email: v.email || undefined,
        classLevel: v.classLevel || undefined,
        message: v.message,
        preferredTime: v.preferredTime || undefined,
        website: v.website,
      });
      toast.success(t('contactPage.success'));
      reset();
    } catch (e) {
      toast.error(t(leadErrorKey(e)));
    }
  });

  const address = contact
    ? [...contact.addressLines, contact.pincode].filter(Boolean).join(', ')
    : '';
  const mapQuery = encodeURIComponent(contact?.mapQuery ?? address);

  return (
    <>
      <PageHeader
        art="contact"
        eyebrow={t('contactPage.eyebrow')}
        title={t('contactPage.title')}
        description={t('contactPage.subtitle')}
      />

      <section className="container-page grid grid-cols-1 gap-6 pb-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="rounded-3xl border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">{t('contactPage.formTitle')}</h2>
          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
              {...register('website')}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="ct-name" label={t('forms.labels.name')} error={err('name')}>
                <Input
                  {...fieldAria('ct-name', err('name'))}
                  autoComplete="name"
                  placeholder={t('forms.placeholders.name')}
                  {...register('name')}
                />
              </Field>
              <Field id="ct-phone" label={t('forms.labels.mobile')} error={err('phone')}>
                <Input
                  {...fieldAria('ct-phone', err('phone'))}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={t('forms.placeholders.mobile')}
                  {...register('phone')}
                />
              </Field>
              <Field id="ct-email" label={t('forms.labels.email')} error={err('email')}>
                <Input
                  {...fieldAria('ct-email', err('email'))}
                  type="email"
                  autoComplete="email"
                  placeholder={t('forms.placeholders.email')}
                  {...register('email')}
                />
              </Field>
              <Field id="ct-class" label={t('forms.labels.classLevel')}>
                <Select id="ct-class" defaultValue="" {...register('classLevel')}>
                  <option value="">{t('forms.labels.select')}</option>
                  {CLASS_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {t(`options.class.${c}`)}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <Field id="ct-message" label={t('forms.labels.message')} error={err('message')}>
              <Textarea
                {...fieldAria('ct-message', err('message'))}
                rows={5}
                {...register('message')}
              />
            </Field>
            <Field id="ct-time" label={t('contactPage.preferredTime')}>
              <Input
                id="ct-time"
                placeholder={t('options.time.evening')}
                {...register('preferredTime')}
              />
            </Field>
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={createLead.isPending}
            >
              <Send /> {createLead.isPending ? t('forms.sending') : t('contactPage.submit')}
            </Button>
            <p className="text-xs text-muted-foreground">{t('forms.privacy')}</p>
          </form>
        </Reveal>

        <Reveal delay={0.1} className="space-y-4">
          <Button variant="whatsapp" size="lg" className="w-full" asChild>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" /> {t('contactPage.whatsapp')}
            </a>
          </Button>
          {contact && (
            <ul className="space-y-3">
              <InfoRow icon={<MapPin />} label={t('contactPage.address')}>
                <address className="not-italic">{address}</address>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  <Navigation className="size-3.5" aria-hidden /> {t('contactPage.directions')}
                </a>
              </InfoRow>
              <InfoRow icon={<Phone />} label={t('contactPage.phone')}>
                {contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, '')}`}
                    className="block hover:text-primary"
                  >
                    {p}
                  </a>
                ))}
              </InfoRow>
              <InfoRow icon={<Mail />} label={t('contactPage.email')}>
                {contact.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="block break-all hover:text-primary">
                    {e}
                  </a>
                ))}
              </InfoRow>
              {contact.hours && (
                <InfoRow icon={<Clock />} label={t('contactPage.hours')}>
                  {contact.hours}
                </InfoRow>
              )}
            </ul>
          )}
        </Reveal>
      </section>

      {contact && (
        <section className="container-page pb-20">
          <div className="overflow-hidden rounded-3xl border">
            <iframe
              title={t('contactPage.mapTitle')}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full sm:h-96 dark:[filter:invert(0.9)_hue-rotate(180deg)]"
            />
          </div>
        </section>
      )}
    </>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4 rounded-2xl border bg-card p-5">
      <span
        className="grid size-10 shrink-0 place-items-center rounded-xl bg-clay-soft text-primary [&_svg]:size-5"
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold">{label}</p>
        <div className="mt-1 text-muted-foreground">{children}</div>
      </div>
    </li>
  );
}
