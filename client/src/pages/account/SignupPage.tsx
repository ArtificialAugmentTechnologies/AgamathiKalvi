import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Field, fieldAria, Input } from '@/components/ui/form-controls';
import type { TKey } from '@/config/navigation';
import { useMe, useSignup } from '@/features/auth/api';
import { AuthLayout } from '@/features/auth/AuthLayout';
import { PasswordInput } from '@/features/auth/PasswordInput';
import { safeNext } from '@/features/auth/safeNext';
import { mobileField, nameField } from '@/features/leads/leads';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ApiError } from '@/lib/api';

const schema = z.object({
  name: nameField,
  email: z.string().trim().email('forms.errors.email'),
  phone: mobileField.optional().or(z.literal('')),
  password: z
    .string()
    .min(8, 'auth.errors.password')
    .max(72, 'auth.errors.password')
    .refine((v) => /[A-Za-z]/.test(v) && /\d/.test(v), 'auth.errors.password'),
});
type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const { t } = useTranslation();
  usePageMeta(t('pages.signup'));
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const navigate = useNavigate();
  const { data: user } = useMe();
  const signup = useSignup();
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });
  const err = (k: keyof FormValues) => {
    const m = formState.errors[k]?.message;
    return m ? t(m as TKey) : undefined;
  };

  if (user && !signup.isSuccess) return <Navigate to={next} replace />;

  const onSubmit = handleSubmit(async (v) => {
    try {
      const { user: u } = await signup.mutateAsync({ ...v, phone: v.phone || undefined });
      toast.success(t('auth.welcome', { name: u.name.split(' ')[0] }));
      navigate(next, { replace: true });
    } catch {
      // Message shown below the form.
    }
  });

  const apiError =
    signup.error instanceof ApiError
      ? signup.error.status === 409
        ? t('auth.errors.exists')
        : signup.error.status === 429
          ? t('forms.errors.rateLimited')
          : signup.error.status === 400
            ? t('auth.errors.password')
            : t('forms.errors.generic')
      : null;

  return (
    <AuthLayout title={t('auth.signupTitle')} lead={t('auth.signupLead')}>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field id="su-name" label={t('auth.name')} error={err('name')}>
          <Input {...fieldAria('su-name', err('name'))} autoComplete="name" {...register('name')} />
        </Field>
        <Field id="su-email" label={t('auth.email')} error={err('email')}>
          <Input
            {...fieldAria('su-email', err('email'))}
            type="email"
            autoComplete="email"
            inputMode="email"
            {...register('email')}
          />
        </Field>
        <Field id="su-phone" label={t('auth.phone')} error={err('phone')}>
          <Input
            {...fieldAria('su-phone', err('phone'))}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t('forms.placeholders.mobile')}
            {...register('phone')}
          />
        </Field>
        <Field
          id="su-pass"
          label={t('auth.password')}
          hint={t('auth.passwordHint')}
          error={err('password')}
        >
          <PasswordInput
            {...fieldAria('su-pass', err('password'), t('auth.passwordHint'))}
            autoComplete="new-password"
            {...register('password')}
          />
        </Field>
        {apiError && (
          <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
            {apiError}
          </p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={signup.isPending}>
          <UserPlus /> {signup.isPending ? t('auth.working') : t('auth.signup')}
        </Button>
        <p className="text-center text-xs text-muted-foreground">{t('forms.privacy')}</p>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t('auth.haveAccount')}{' '}
        <Link
          to={`/login${params.get('next') ? `?next=${encodeURIComponent(next)}` : ''}`}
          className="font-semibold text-primary hover:underline"
        >
          {t('nav.login')}
        </Link>
      </p>
    </AuthLayout>
  );
}
