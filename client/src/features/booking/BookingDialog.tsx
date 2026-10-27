import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarCheck, Check, Clock, LogIn, MapPin, Phone, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, type FieldPath, type UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Field, fieldAria, Input, Select, Textarea } from '@/components/ui/form-controls';
import type { TKey } from '@/config/navigation';
import { CLASS_OPTIONS, DISTRICT_OPTIONS, INTEREST_OPTIONS, OUTSIDE_TN } from '@/config/tamil-nadu';
import {
  classField,
  districtField,
  interestField,
  leadErrorKey,
  mobileField,
  nameField,
  useCreateLead,
} from '@/features/leads/leads';
import { useWhatsAppNumber } from '@/hooks/useSettings';
import { cn } from '@/lib/utils';
import { useMe } from '@/features/auth/api';
import type { BookingPreset } from './BookingProvider';

const schema = z.object({
  name: nameField,
  phone: mobileField,
  email: z.string().trim().email('forms.errors.email').optional().or(z.literal('')),
  district: districtField,
  classLevel: classField,
  interest: interestField,
  cutoff: z
    .string()
    .trim()
    .refine((v) => v === '' || (Number(v) >= 0 && Number(v) <= 200), 'forms.errors.cutoff'),
  message: z.string().trim().max(1000).optional(),
  mode: z.enum(['phone', 'video', 'office']),
  preferredTime: z.enum(['morning', 'afternoon', 'evening']),
  website: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const STEPS: { key: TKey; fields: FieldPath<FormValues>[] }[] = [
  { key: 'booking.steps.about', fields: ['name', 'phone', 'email', 'district', 'classLevel'] },
  { key: 'booking.steps.goals', fields: ['interest', 'cutoff', 'message'] },
  { key: 'booking.steps.slot', fields: ['mode', 'preferredTime'] },
];

const MODES = [
  { value: 'phone', icon: Phone },
  { value: 'video', icon: Video },
  { value: 'office', icon: MapPin },
] as const;
const TIMES = ['morning', 'afternoon', 'evening'] as const;

const LOGIN_REDIRECT_SECONDS = 6;

type Props = { open: boolean; onOpenChange: (open: boolean) => void; preset: BookingPreset };

export default function BookingDialog({ open, onOpenChange, preset }: Props) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const createLead = useCreateLead();
  const whatsapp = useWhatsAppNumber();
  const { data: user } = useMe();
  const navigate = useNavigate();
  const toLogin = !!preset.thenLogin && !user;
  const [countdown, setCountdown] = useState(LOGIN_REDIRECT_SECONDS);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      cutoff: '',
      message: '',
      mode: 'phone',
      preferredTime: 'evening',
      website: '',
    },
  });
  const { register, handleSubmit, trigger, watch, setValue, reset, formState } = form;
  const errors = formState.errors;
  const err = (name: keyof FormValues) =>
    errors[name]?.message ? t(errors[name]!.message as TKey) : undefined;

  // Apply presets (e.g. cutoff from the hero calculator) every time the dialog opens.
  useEffect(() => {
    if (!open) return;
    // Signed-in students don't retype what we already know.
    if (user) {
      if (!form.getValues('name')) setValue('name', user.name);
      if (!form.getValues('phone') && user.phone)
        setValue('phone', user.phone.startsWith('+91') ? user.phone.slice(3) : user.phone);
      if (!form.getValues('email')) setValue('email', user.email);
    }
    if (preset.cutoff !== undefined) setValue('cutoff', String(preset.cutoff));
    if (preset.interest && (INTEREST_OPTIONS as readonly string[]).includes(preset.interest)) {
      setValue('interest', preset.interest as FormValues['interest']);
    }
  }, [open, preset, setValue, user, form]);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next && submitted) {
      // Start fresh next time after a completed booking.
      setTimeout(() => {
        reset();
        setStep(0);
        setSubmitted(null);
        createLead.reset();
      }, 300);
    }
  };

  const goToLogin = () => {
    handleOpenChange(false);
    navigate('/login');
  };

  // Free-guidance flow: count down on the success screen, then open the Student Login.
  useEffect(() => {
    if (!submitted || !toLogin || !open) return;
    setCountdown(LOGIN_REDIRECT_SECONDS);
    const id = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [submitted, toLogin, open]);

  useEffect(() => {
    if (submitted && toLogin && open && countdown <= 0) goToLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  const next = async () => {
    if (await trigger(STEPS[step]!.fields)) setStep((s) => s + 1);
  };

  const onSubmit = handleSubmit(async (values) => {
    await createLead.mutateAsync({
      type: 'counselling',
      source: 'booking-modal',
      name: values.name,
      phone: values.phone,
      email: values.email || undefined,
      district: values.district,
      classLevel: values.classLevel,
      interest: values.interest,
      cutoff: values.cutoff === '' ? undefined : Number(values.cutoff),
      mode: values.mode,
      preferredTime: values.preferredTime,
      message: values.message || undefined,
      website: values.website,
    });
    setSubmitted(values);
  });

  const waHref = submitted
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        t('booking.waMessage', {
          name: submitted.name,
          classLevel: t(`options.class.${submitted.classLevel}`),
          district: submitted.district,
          interest: t(`options.interest.${submitted.interest}`),
          mode: t(`options.mode.${submitted.mode}`),
          time: t(`options.time.${submitted.preferredTime}`),
        }),
      )}`
    : '#';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent closeLabel={t('booking.close')}>
        {submitted ? (
          <div className="py-4 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-success/15 text-success">
              <CalendarCheck className="size-8" aria-hidden />
            </span>
            <DialogTitle className="mt-5 font-serif text-2xl font-semibold">
              {t('booking.successTitle')}
            </DialogTitle>
            <DialogDescription className="mt-3 text-muted-foreground">
              {t('booking.successBody')}
            </DialogDescription>
            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button variant="whatsapp" size="lg" asChild>
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" />
                  {t('booking.sendWhatsapp')}
                </a>
              </Button>
              {toLogin ? (
                <Button size="lg" onClick={goToLogin}>
                  <LogIn />
                  {t('booking.toLogin')}
                </Button>
              ) : (
                <Button variant="outline" size="lg" onClick={() => handleOpenChange(false)}>
                  {t('booking.done')}
                </Button>
              )}
            </div>
            {toLogin && (
              <p className="mt-4 text-xs text-muted-foreground" aria-live="polite">
                {t('booking.toLoginCountdown', { count: Math.max(countdown, 0) })}
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <DialogTitle className="pr-10 font-serif text-2xl font-semibold">
              {t('booking.title')}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-muted-foreground">
              {t('booking.subtitle')}
            </DialogDescription>

            <Stepper step={step} />

            {/* Honeypot: hidden from people, tempting for bots. */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
              {...register('website')}
            />

            <div className="mt-6 space-y-4">
              {step === 0 && (
                <>
                  <Field id="bk-name" label={t('forms.labels.studentName')} error={err('name')}>
                    <Input
                      {...fieldAria('bk-name', err('name'))}
                      autoComplete="name"
                      placeholder={t('forms.placeholders.name')}
                      {...register('name')}
                    />
                  </Field>
                  <Field id="bk-phone" label={t('forms.labels.mobile')} error={err('phone')}>
                    <Input
                      {...fieldAria('bk-phone', err('phone'))}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={t('forms.placeholders.mobile')}
                      {...register('phone')}
                    />
                  </Field>
                  <Field id="bk-email" label={t('forms.labels.email')} error={err('email')}>
                    <Input
                      {...fieldAria('bk-email', err('email'))}
                      type="email"
                      autoComplete="email"
                      placeholder={t('forms.placeholders.email')}
                      {...register('email')}
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      id="bk-class"
                      label={t('forms.labels.classLevel')}
                      error={err('classLevel')}
                    >
                      <Select
                        {...fieldAria('bk-class', err('classLevel'))}
                        defaultValue=""
                        {...register('classLevel')}
                      >
                        <option value="" disabled>
                          {t('forms.labels.select')}
                        </option>
                        {CLASS_OPTIONS.map((c) => (
                          <option key={c} value={c}>
                            {t(`options.class.${c}`)}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field
                      id="bk-district"
                      label={t('forms.labels.district')}
                      error={err('district')}
                    >
                      <Select
                        {...fieldAria('bk-district', err('district'))}
                        defaultValue=""
                        {...register('district')}
                      >
                        <option value="" disabled>
                          {t('forms.labels.select')}
                        </option>
                        {DISTRICT_OPTIONS.map((d) => (
                          <option key={d} value={d}>
                            {d === OUTSIDE_TN ? t('options.outsideTn') : d}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <fieldset>
                    <legend className="mb-2 text-sm font-medium">{t('booking.interest')}</legend>
                    <div className="flex flex-wrap gap-2">
                      {INTEREST_OPTIONS.map((i) => (
                        <ChoiceChip
                          key={i}
                          name="interest"
                          value={i}
                          checked={watch('interest') === i}
                          register={register('interest')}
                          label={t(`options.interest.${i}`)}
                        />
                      ))}
                    </div>
                    {err('interest') && (
                      <p role="alert" className="mt-2 text-xs font-medium text-destructive">
                        {err('interest')}
                      </p>
                    )}
                  </fieldset>
                  <Field
                    id="bk-cutoff"
                    label={t('booking.cutoff')}
                    hint={t('booking.cutoffHint')}
                    error={err('cutoff')}
                  >
                    <Input
                      {...fieldAria('bk-cutoff', err('cutoff'), t('booking.cutoffHint'))}
                      type="number"
                      inputMode="decimal"
                      step="0.5"
                      min={0}
                      max={200}
                      {...register('cutoff')}
                    />
                  </Field>
                  <Field id="bk-msg" label={t('booking.message')}>
                    <Textarea id="bk-msg" rows={3} {...register('message')} />
                  </Field>
                </>
              )}

              {step === 2 && (
                <>
                  <fieldset>
                    <legend className="mb-2 text-sm font-medium">{t('booking.mode')}</legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {MODES.map(({ value, icon: Icon }) => (
                        <label
                          key={value}
                          className={cn(
                            'flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 sm:flex-col sm:text-center',
                            watch('mode') === value
                              ? 'border-primary bg-primary/10 text-foreground'
                              : 'hover:border-primary/50',
                          )}
                        >
                          <input
                            type="radio"
                            value={value}
                            className="sr-only"
                            {...register('mode')}
                          />
                          <Icon className="size-5 text-primary" aria-hidden />
                          {t(`options.mode.${value}`)}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                      <Clock className="size-4 text-muted-foreground" aria-hidden />
                      {t('booking.time')}
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {TIMES.map((tm) => (
                        <ChoiceChip
                          key={tm}
                          name="preferredTime"
                          value={tm}
                          checked={watch('preferredTime') === tm}
                          register={register('preferredTime')}
                          label={t(`options.time.${tm}`)}
                        />
                      ))}
                    </div>
                  </fieldset>
                  <p className="text-xs text-muted-foreground">{t('forms.privacy')}</p>
                </>
              )}
            </div>

            {createLead.isError && (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive"
              >
                {t(leadErrorKey(createLead.error))}
              </p>
            )}

            <div className="mt-7 flex gap-2">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setStep((s) => s - 1)}
                >
                  {t('booking.back')}
                </Button>
              )}
              {step < STEPS.length - 1 ? (
                <Button type="button" size="lg" className="flex-1" onClick={next}>
                  {t('booking.next')}
                </Button>
              ) : (
                <Button type="submit" size="lg" className="flex-1" disabled={createLead.isPending}>
                  {createLead.isPending ? t('forms.sending') : t('booking.submit')}
                </Button>
              )}
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Stepper({ step }: { step: number }) {
  const { t } = useTranslation();
  return (
    <ol
      className="mt-5 flex items-center gap-2"
      aria-label={t('booking.stepOf', { current: step + 1, total: STEPS.length })}
    >
      {STEPS.map((s, i) => (
        <li
          key={s.key}
          className="flex flex-1 items-center gap-2"
          aria-current={i === step ? 'step' : undefined}
        >
          <span
            className={cn(
              'grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors',
              i < step && 'bg-success text-white',
              i === step && 'bg-primary text-primary-foreground',
              i > step && 'bg-muted text-muted-foreground',
            )}
          >
            {i < step ? <Check className="size-4" aria-hidden /> : i + 1}
          </span>
          <span
            className={cn(
              'hidden text-xs font-medium sm:inline',
              i !== step && 'text-muted-foreground',
            )}
          >
            {t(s.key)}
          </span>
          {i < STEPS.length - 1 && <span className="h-px flex-1 bg-border" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

function ChoiceChip({
  name,
  value,
  checked,
  label,
  register,
}: {
  name: string;
  value: string;
  checked: boolean;
  label: string;
  register: UseFormRegisterReturn;
}) {
  return (
    <label
      className={cn(
        'cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50',
        checked ? 'border-primary bg-primary text-primary-foreground' : 'hover:border-primary/50',
      )}
    >
      <input type="radio" value={value} className="sr-only" {...register} name={name} />
      {label}
    </label>
  );
}
