import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  /** Use on always-dark (ink) bands. */
  tone?: 'default' | 'ink';
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'default',
  className,
  id,
}: Props) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-3 text-xs font-semibold tracking-[0.16em] uppercase',
            tone === 'ink' ? 'text-ink-accent' : 'text-primary',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl leading-tight font-semibold sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg',
            tone === 'ink' ? 'text-ink-muted' : 'text-muted-foreground',
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
