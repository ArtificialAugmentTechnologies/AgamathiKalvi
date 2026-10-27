import { useTranslation } from 'react-i18next';
import { Toaster } from 'sonner';
import { useTheme } from '@/providers/ThemeProvider';

export function AppToaster() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <Toaster
      theme={theme}
      position="top-center"
      richColors
      closeButton
      containerAriaLabel={t('common.notifications')}
      toastOptions={{ className: 'font-sans' }}
    />
  );
}
