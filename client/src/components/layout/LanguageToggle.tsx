import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const OPTIONS = [
  { code: 'en', label: 'EN' },
  { code: 'ta', label: 'தமிழ்' },
] as const;

export function LanguageToggle({ className }: { className?: string }) {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage === 'ta' ? 'ta' : 'en';

  return (
    <div
      role="group"
      aria-label={t('common.language')}
      className={cn(
        'inline-flex h-9 items-center rounded-full border bg-muted/60 p-0.5 text-xs',
        className,
      )}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.code}
          type="button"
          lang={o.code}
          aria-pressed={current === o.code}
          aria-label={o.code === 'ta' ? t('common.switchToTamil') : t('common.switchToEnglish')}
          onClick={() => void i18n.changeLanguage(o.code)}
          className={cn(
            'h-8 min-w-10 rounded-full px-2.5 font-semibold transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
            current === o.code
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
