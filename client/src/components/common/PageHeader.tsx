import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

/** Standard top-of-page band used by every inner page. */
export function PageHeader({ eyebrow, title, description, children, className }: PageHeaderProps) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      <div aria-hidden className="bg-aurora absolute inset-0" />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        {eyebrow && (
          <p className="mb-4 inline-flex rounded-full border bg-card/60 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold break-words sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
