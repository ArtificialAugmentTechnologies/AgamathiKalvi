import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

export type Feature = {
  key: string;
  icon?: LucideIcon;
  tag?: string;
  title: string;
  body: string;
};

type Props = {
  items: Feature[];
  columns?: 2 | 3 | 4;
  /** Show 01, 02… instead of an icon when no icon is given. */
  numbered?: boolean;
  className?: string;
};

const COLS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/** Card grid for program features, steps and similar lists. */
export function FeatureGrid({ items, columns = 3, numbered = false, className }: Props) {
  return (
    <ul className={cn('grid grid-cols-1 gap-4', COLS[columns], className)}>
      {items.map(({ key, icon: Icon, tag, title, body }, i) => (
        <Reveal as="li" key={key} delay={0.06 * i}>
          <div className="h-full rounded-3xl border bg-card p-6 sm:p-7">
            {Icon ? (
              <span className="grid size-11 place-items-center rounded-xl bg-clay-soft text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
            ) : numbered ? (
              <span className="font-serif text-2xl font-semibold text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
            ) : null}
            {tag && (
              <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
                {tag}
              </p>
            )}
            <h3 className={cn('text-xl font-semibold', tag ? 'mt-1' : 'mt-4')}>{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
