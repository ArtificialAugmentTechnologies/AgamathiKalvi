import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type Option = { value: string; label: string };

type Props = {
  label: string;
  options: Option[];
  /** Selected values. Empty = "any". */
  value: string[];
  onChange: (value: string[]) => void;
  anyLabel: string;
  /** Single choice instead of multi-select. */
  single?: boolean;
  className?: string;
};

/** Accessible toggle-chip group used by the tools' filters. */
export function ChipGroup({ label, options, value, onChange, anyLabel, single, className }: Props) {
  const toggle = (v: string) => {
    if (single) return onChange(value[0] === v ? [] : [v]);
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  const chip = (active: boolean) =>
    cn(
      'inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
      active
        ? 'border-primary bg-primary text-primary-foreground'
        : 'bg-card hover:border-primary/50',
    );

  return (
    <fieldset className={className}>
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={!value.length}
          className={chip(!value.length)}
          onClick={() => onChange([])}
        >
          {anyLabel}
        </button>
        {options.map((o) => {
          const active = value.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              className={chip(active)}
              onClick={() => toggle(o.value)}
            >
              {active && !single && <Check className="size-3.5" aria-hidden />}
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
