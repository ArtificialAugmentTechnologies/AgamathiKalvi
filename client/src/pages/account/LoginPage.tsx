import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Field, fieldAria, Input } from '@/components/ui/form-controls';
import type { TKey } from '@/config/navigation';
import { useLogin, useMe } from '@/features/auth/api';
import { AuthLayout } from '@/features/auth/AuthLayout';
import { PasswordInput } from '@/features/auth/PasswordInput';
import { safeNext } from '@/features/auth/safeNext';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ApiError } from '@/lib/api';

const schema = z.object({
  email: z.string().trim().email('forms.errors.email'),
  password: z.string().min(1, 'forms.errors.required'),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { t } = useTranslation();
  usePageMeta(t('pages.login'));
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const navigate = useNavigate();
  const { data: user } = useMe();
  const login = useLogin();
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const err = (k: keyof FormValues) => {
    const m = formState.errors[k]?.message;
    return m ? t(m as TKey) : undefined;
  };

  if (user && !login.isSuccess) return <Navigate to={next} replace />;

  const onSubmit = handleSubmit(async (v) => {
    try {
      const { user: u } = await login.mutateAsync(v);
      toast.success(t('auth.welcome', { name: u.name.split(' ')[0] }));
      navigate(next, { replace: true });
    } catch {
      // Message shown below the form.
    }
  });

  const apiError =
    login.error instanceof ApiError
      ? login.error.status === 401
        ? t('auth.errors.invalid')
        : login.error.status === 429
          ? t('forms.errors.rateLimited')
          : t('forms.errors.generic')
      : null;

  return (
    <AuthLayout title={t('auth.loginTitle')} lead={t('auth.loginLead')}>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field id="lg-email" label={t('auth.email')} error={err('email')}>
          <Input
            {...fieldAria('lg-email', err('email'))}
            type="email"
            autoComplete="email"
            inputMode="email"
            {...register('email')}
          />
        </Field>
        <Field id="lg-pass" label={t('auth.password')} error={err('password')}>
          <PasswordInput
            {...fieldAria('lg-pass', err('password'))}
            autoComplete="current-password"
            {...register('password')}
          />
        </Field>
        {apiError && (
          <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
            {apiError}
          </p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={login.isPending}>
          <LogIn /> {login.isPending ? t('auth.working') : t('auth.login')}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t('auth.noAccount')}{' '}
        <Link
          to={`/signup${params.get('next') ? `?next=${encodeURIComponent(next)}` : ''}`}
          className="font-semibold text-primary hover:underline"
        >
          {t('nav.signup')}
        </Link>
      </p>
      <p className="mt-2 text-center text-xs text-muted-foreground">{t('auth.otpSoon')}</p>
    </AuthLayout>
  );
}
