import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Languages, School, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { Field, fieldAria, Input, Select } from '@/components/ui/form-controls';
import type { TKey } from '@/config/navigation';
import { CLASS_OPTIONS, DISTRICT_OPTIONS, OUTSIDE_TN } from '@/config/tamil-nadu';
import {
  leadErrorKey,
  schoolInviteForm,
  useCreateLead,
  type SchoolInviteForm,
} from '@/features/leads/leads';

const POINTS = [
  { key: 'home.invite.points.one', icon: School },
  { key: 'home.invite.points.two', icon: Languages },
  { key: 'home.invite.points.three', icon: Users },
] as const;

export function InviteSchoolSection() {
  const { t } = useTranslation();
  const createLead = useCreateLead();
  const { register, handleSubmit, reset, formState } = useForm<SchoolInviteForm>({
    resolver: zodResolver(schoolInviteForm),
    mode: 'onTouched',
  });
  const err = (name: keyof SchoolInviteForm) => {
    const m = formState.errors[name]?.message;
    return m ? t(m as TKey) : undefined;
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createLead.mutateAsync({ type: 'school_invite', source: 'home-invite', ...values });
      toast.success(t('home.invite.success'));
      reset();
    } catch (e) {
      toast.error(t(leadErrorKey(e)));
    }
  });

  return (
    <section id="invite" className="container-page py-20 sm:py-28" aria-labelledby="invite-title">
      <div className="grid grid-cols-1 gap-10 overflow-hidden rounded-[2rem] border bg-card p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
        <div>
          <SectionHeading
            id="invite-title"
            eyebrow={t('home.invite.eyebrow')}
            title={t('home.invite.title')}
            subtitle={t('home.invite.body')}
          />
          <ul className="mt-8 space-y-3">
            {POINTS.map(({ key, icon: Icon }, i) => (
              <Reveal
                as="li"
                key={key}
                delay={0.08 * i}
                className="flex items-center gap-3 text-sm sm:text-base"
              >
                <span className="grid grid-cols-1 size-9 place-items-center rounded-xl bg-clay-soft text-primary">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                {t(key)}
              </Reveal>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hidden"
            {...register('website')}
          />
          <Field id="inv-name" label={t('forms.labels.studentName')} error={err('name')}>
            <Input
              {...fieldAria('inv-name', err('name'))}
              autoComplete="name"
              placeholder={t('forms.placeholders.name')}
              {...register('name')}
            />
          </Field>
          <Field id="inv-school" label={t('forms.labels.schoolName')} error={err('schoolName')}>
            <Input
              {...fieldAria('inv-school', err('schoolName'))}
              autoComplete="organization"
              placeholder={t('forms.placeholders.school')}
              {...register('schoolName')}
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="inv-class" label={t('forms.labels.classLevel')} error={err('classLevel')}>
              <Select
                {...fieldAria('inv-class', err('classLevel'))}
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
            <Field id="inv-district" label={t('forms.labels.district')} error={err('district')}>
              <Select
                {...fieldAria('inv-district', err('district'))}
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
          <Field id="inv-phone" label={t('forms.labels.mobile')} error={err('phone')}>
            <Input
              {...fieldAria('inv-phone', err('phone'))}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={t('forms.placeholders.mobile')}
              {...register('phone')}
            />
          </Field>
          <Button type="submit" size="lg" className="w-full" disabled={createLead.isPending}>
            {createLead.isPending ? (
              t('forms.sending')
            ) : (
              <>
                <CheckCircle2 /> {t('home.invite.submit')}
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">{t('forms.privacy')}</p>
        </form>
      </div>
    </section>
  );
}
