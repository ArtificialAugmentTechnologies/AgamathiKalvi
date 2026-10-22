import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef, type TouchEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { MediaItem } from '@/types/content';

type Props = {
  items: MediaItem[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

/** Full-screen photo viewer with arrow-key, button and swipe navigation. */
export function Lightbox({ items, index, onIndexChange }: Props) {
  const { t } = useTranslation();
  const open = index !== null && items[index] !== undefined;
  const item = open ? items[index] : undefined;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  // Simple horizontal swipe for phones.
  const touchX = useRef(0);
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? 0;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const navButton =
    'absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none';

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 outline-none sm:p-10"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-describedby={undefined}
        >
          {item && (
            <>
              <DialogPrimitive.Title className="sr-only">{item.title}</DialogPrimitive.Title>
              <img
                key={item.id}
                src={item.url ?? ''}
                alt={item.title}
                className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl animate-in fade-in-0 zoom-in-95"
              />
              <p className="mt-4 text-center text-sm text-white/80">
                {item.event} ·{' '}
                {t('mediaPage.position', { current: (index ?? 0) + 1, total: items.length })}
              </p>
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${navButton} left-3 sm:left-6`}
                    onClick={() => go(-1)}
                    aria-label={t('mediaPage.prev')}
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    className={`${navButton} right-3 sm:right-6`}
                    onClick={() => go(1)}
                    aria-label={t('mediaPage.next')}
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}
            </>
          )}
          <DialogPrimitive.Close
            className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            aria-label={t('mediaPage.close')}
          >
            <X className="size-5" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
