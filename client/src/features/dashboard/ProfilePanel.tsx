import { Save } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { ChipGroup } from '@/components/common/ChipGroup';
import { Button } from '@/components/ui/button';
import { Field, Input, Select } from '@/components/ui/form-controls';
import { INTEREST_OPTIONS, TN_DISTRICTS } from '@/config/tamil-nadu';
import { COMMUNITIES } from '@/features/tools/types';
import { useProfile, useUpdateProfile, type Profile } from './api';

const CLASSES = ['class10', 'class11', 'class12'] as const;
const SUBJECTS = ['maths', 'physics', 'chemistry'] as const;

export function ProfilePanel() {
  const { t } = useTranslation();
  const { data } = useProfile();
  const update = useUpdateProfile();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [p, setP] = useState<Profile>({
    classLevel: null,
    school: null,
    district: null,
    community: null,
    marks: null,
    interests: null,
  });

  // Fill the form once the saved profile arrives.
  useEffect(() => {
    if (!data) return;
    setName(data.user.name);
    setPhone(data.user.phone?.replace(/^\+91/, '') ?? '');
    if (data.profile) setP(data.profile);
  }, [data]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    update.mutate(
      { name, phone, ...p, school: p.school || null },
      {
        onSuccess: () => toast.success(t('dashboard.profile.saved')),
        onError: () => toast.error(t('forms.errors.generic')),
      },
    );
  };

  const setMark = (s: (typeof SUBJECTS)[number], v: string) =>
    setP((prev) => ({ ...prev, marks: { ...prev.marks, [s]: v === '' ? undefined : Number(v) } }));

  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset className="rounded-3xl border bg-card p-6">
        <legend className="px-1 font-sans text-lg font-semibold">
          {t('dashboard.profile.account')}
        </legend>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="pf-name" label={t('auth.name')}>
            <Input
              id="pf-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
              minLength={2}
            />
          </Field>
          <Field id="pf-phone" label={t('auth.phone')}>
            <Input
              id="pf-phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </Field>
          <Field id="pf-email" label={t('auth.email')} className="sm:col-span-2">
            <Input id="pf-email" value={data?.user.email ?? ''} disabled />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5 rounded-3xl border bg-card p-6">
        <legend className="px-1 font-sans text-lg font-semibold">
          {t('dashboard.profile.study')}
        </legend>
        <ChipGroup
          single
          label={t('dashboard.profile.classLevel')}
          anyLabel="—"
          options={CLASSES.map((c) => ({ value: c, label: t(`options.class.${c}`) }))}
          value={p.classLevel ? [p.classLevel] : []}
          onChange={(v) => setP({ ...p, classLevel: (v[0] as Profile['classLevel']) ?? null })}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="pf-school" label={t('dashboard.profile.school')}>
            <Input
              id="pf-school"
              value={p.school ?? ''}
              onChange={(e) => setP({ ...p, school: e.target.value })}
              autoComplete="organization"
            />
          </Field>
          <Field id="pf-district" label={t('dashboard.profile.district')}>
            <Select
              id="pf-district"
              value={p.district ?? ''}
              onChange={(e) => setP({ ...p, district: e.target.value || null })}
            >
              <option value="">{t('forms.labels.select')}</option>
              {TN_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <ChipGroup
          single
          label={t('dashboard.profile.community')}
          anyLabel="—"
          options={COMMUNITIES.map((c) => ({ value: c, label: c }))}
          value={p.community ? [p.community] : []}
          onChange={(v) => setP({ ...p, community: v[0] ?? null })}
        />
        <fieldset>
          <legend className="mb-2 text-sm font-medium">{t('dashboard.profile.marks')}</legend>
          <div className="grid grid-cols-3 gap-3">
            {SUBJECTS.map((s) => (
              <Field key={s} id={`pf-${s}`} label={t(`home.quick.${s}`)}>
                <Input
                  id={`pf-${s}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={100}
                  step="0.5"
                  value={p.marks?.[s] ?? ''}
                  onChange={(e) => setMark(s, e.target.value)}
                />
              </Field>
            ))}
          </div>
        </fieldset>
        <ChipGroup
          label={t('dashboard.profile.interests')}
          anyLabel="—"
          options={INTEREST_OPTIONS.filter((i) => i !== 'notSure').map((i) => ({
            value: i,
            label: t(`options.interest.${i}`),
          }))}
          value={p.interests ?? []}
          onChange={(v) => setP({ ...p, interests: v })}
        />
      </fieldset>

      <Button type="submit" size="lg" disabled={update.isPending}>
        <Save /> {update.isPending ? t('auth.working') : t('dashboard.profile.save')}
      </Button>
    </form>
  );
}
