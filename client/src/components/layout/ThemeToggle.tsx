import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const label = theme === 'dark' ? t('common.theme.toLight') : t('common.theme.toDark');

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={className}
    >
      {theme === 'dark' ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </Button>
  );
}
