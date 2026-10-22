import { Toaster } from 'sonner';
import { useTheme } from '@/providers/ThemeProvider';

export function AppToaster() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme}
      position="top-center"
      richColors
      closeButton
      toastOptions={{ className: 'font-sans' }}
    />
  );
}
