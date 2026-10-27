import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage, type Language } from '@/i18n';
import { cn } from '@/lib/utils';

// Each option is written in its own script so visitors can find their language whatever is active.
const OPTIONS: { code: Language; native: string; english?: string }[] = [
  { code: 'en', native: 'English' },
  { code: 'ta', native: 'தமிழ்', english: 'Tamil' },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi' },
];

type LanguageMenuProps = {
  className?: string;
  /** Opens upwards where there is no room below, e.g. at the foot of the mobile menu. */
  side?: 'bottom' | 'top';
};

export function LanguageMenu({ className, side = 'bottom' }: LanguageMenuProps) {
  const { t, i18n } = useTranslation();
  const current = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  // Close on a click or tap anywhere outside the menu.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Move focus to the selected language when the menu opens.
  useEffect(() => {
    if (open) itemRefs.current[OPTIONS.findIndex((o) => o.code === current)]?.focus();
  }, [open, current]);

  const select = (code: Language) => {
    setOpen(false);
    triggerRef.current?.focus();
    if (code !== current) void i18n.changeLanguage(code);
  };

  const onMenuKeyDown = (e: KeyboardEvent) => {
    const items = itemRefs.current.filter((el): el is HTMLButtonElement => el !== null);
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    const focusAt = (i: number) => items[(i + items.length) % items.length]?.focus();
    if (e.key === 'ArrowDown') focusAt(index + 1);
    else if (e.key === 'ArrowUp') focusAt(index - 1);
    else if (e.key === 'Home') focusAt(0);
    else if (e.key === 'End') focusAt(items.length - 1);
    else if (e.key === 'Escape') {
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'Tab') {
      setOpen(false);
      return;
    } else return;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div ref={rootRef} className={cn('relative inline-flex', className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          'inline-flex h-9 items-center gap-1.5 rounded-full border bg-muted/60 pr-2.5 pl-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
          open && 'bg-muted',
        )}
      >
        <Languages className="size-4 text-primary" aria-hidden />
        {/* In the navbar, the label is the first thing to go when the row runs out of room. */}
        <span data-collapse="1" className="data-collapsed:sr-only">
          {t('common.languages')}
        </span>
        <ChevronDown
          className={cn(
            'size-3.5 text-muted-foreground transition-transform duration-200',
            open !== (side === 'top') && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={t('common.language')}
            onKeyDown={onMenuKeyDown}
            initial={{ opacity: 0, y: side === 'top' ? 6 : -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: side === 'top' ? 6 : -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={cn(
              'absolute z-50 w-48 overflow-hidden rounded-2xl border bg-popover p-1.5 text-popover-foreground shadow-xl shadow-black/10',
              side === 'top'
                ? 'bottom-full left-0 mb-2 origin-bottom-left'
                : 'top-full right-0 mt-2 origin-top-right',
            )}
          >
            {OPTIONS.map((o, i) => {
              const selected = o.code === current;
              return (
                <button
                  key={o.code}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  tabIndex={-1}
                  onClick={() => select(o.code)}
                  className={cn(
                    'flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-left text-sm transition-colors focus-visible:outline-none',
                    selected
                      ? 'bg-primary/10 font-semibold text-primary'
                      : 'hover:bg-accent focus-visible:bg-accent',
                    selected && 'focus-visible:bg-primary/15',
                  )}
                >
                  <span className="flex-1">
                    <span lang={o.code}>{o.native}</span>
                    {o.english && (
                      <span lang="en" className="text-muted-foreground">
                        {' '}
                        ({o.english})
                      </span>
                    )}
                  </span>
                  {selected && <Check className="size-4 shrink-0" aria-hidden />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
