import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type LogoProps = {
  /** `auto` follows the theme; `light` always uses the white-text logo (for dark bands). */
  tone?: 'auto' | 'light';
  className?: string;
};

export function Logo({ tone = 'auto', className }: LogoProps) {
  const { t } = useTranslation();
  const alt = t('brand.legalName');

  return (
    <Link
      to="/"
      className={cn(
        'inline-flex shrink-0 items-center rounded-md focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
        className,
      )}
      aria-label={`${alt} — ${t('nav.home')}`}
    >
      {tone === 'auto' && (
        <img
          src="/images/brand/logo.png"
          alt={alt}
          width={738}
          height={128}
          className="h-9 w-auto lg:h-10 dark:hidden"
        />
      )}
      <img
        src="/images/brand/logo-light.png"
        alt={alt}
        width={738}
        height={128}
        className={cn('h-9 w-auto lg:h-10', tone === 'auto' && 'hidden dark:block')}
      />
    </Link>
  );
}
