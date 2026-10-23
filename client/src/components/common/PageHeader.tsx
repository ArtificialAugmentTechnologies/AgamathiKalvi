import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { HeaderArtKey } from '@/config/headerArt';
import { cn } from '@/lib/utils';
import { HeaderArt } from './HeaderArt';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  /** Animated topic illustration shown on the right on large screens. */
  art?: HeaderArtKey;
};

/** Standard top-of-page band used by every inner page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
  art,
}: PageHeaderProps) {
  const { i18n } = useTranslation();
  const isTamil = i18n.resolvedLanguage === 'ta';

  return (
    <section className={cn('relative overflow-hidden', className)}>
      <div aria-hidden className="bg-aurora absolute inset-0" />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
      <div
        className={cn(
          'container-page relative grid grid-cols-1 items-center gap-10 py-16 sm:py-20 lg:py-20',
          art && 'lg:grid-cols-[1.35fr_0.65fr]',
        )}
      >
        <div>
          {eyebrow && (
            <p className="mb-4 inline-flex rounded-full border bg-card/60 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
              {eyebrow}
            </p>
          )}
          {/* Tamil words are long — a smaller size keeps whole words on one line on phones. */}
          <h1
            className={cn(
              'max-w-3xl font-semibold break-words',
              isTamil
                ? 'text-[1.7rem] sm:text-4xl lg:text-5xl'
                : 'text-4xl sm:text-5xl lg:text-6xl',
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>
          )}
          {children && (
            <div className="mt-8 [&_a]:h-auto [&_a]:min-h-11 [&_a]:py-2.5 [&_a]:whitespace-normal [&_a]:text-left">
              {children}
            </div>
          )}
        </div>
        {art && <HeaderArt art={art} className="hidden lg:block" />}
      </div>
    </section>
  );
}
