import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkCheck, BookmarkPlus, LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Button, type ButtonProps } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useMe } from './api';

type Props = {
  tool: 'cutoff' | 'predictor' | 'quiz' | 'scholarship';
  title: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  disabled?: boolean;
  variant?: ButtonProps['variant'];
  className?: string;
};

/** "Save to dashboard" for tool results; signed-out visitors are sent to log in first. */
export function SaveResultButton({
  tool,
  title,
  input,
  output,
  disabled,
  variant = 'outline',
  className,
}: Props) {
  const { t } = useTranslation();
  const { data: user } = useMe();
  const location = useLocation();
  const qc = useQueryClient();
  const save = useMutation({
    mutationFn: () =>
      api('/me/results', { method: 'POST', body: JSON.stringify({ tool, title, input, output }) }),
    onSuccess: () => {
      toast.success(t('save.saved'));
      void qc.invalidateQueries({ queryKey: ['me', 'results'] });
    },
    onError: () => toast.error(t('forms.errors.generic')),
  });

  if (!user) {
    return (
      <Button asChild variant={variant} size="lg" className={className}>
        <Link to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`}>
          <LogIn /> {t('save.login')}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size="lg"
      className={className}
      disabled={disabled || save.isPending || save.isSuccess}
      onClick={() => save.mutate()}
    >
      {save.isSuccess ? <BookmarkCheck /> : <BookmarkPlus />}
      {save.isSuccess ? t('save.saved') : t('save.button')}
    </Button>
  );
}
