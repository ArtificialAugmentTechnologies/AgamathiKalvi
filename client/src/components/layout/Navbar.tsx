import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { AccountButtons } from './AccountButtons';
import { DesktopNav } from './DesktopNav';
import { LanguageMenu } from './LanguageMenu';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const scrolled = useScrolled(8);
  const row = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  useFitOneLine(row, i18n.resolvedLanguage);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-b border-border/70 bg-background/75 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div ref={row} className="container-page flex h-16 items-center gap-3 lg:h-[4.5rem]">
        <Logo />
        {/* Last to go: when even the links don't fit, the hamburger menu takes over. */}
        <div
          data-collapse="4"
          className="hidden flex-1 justify-center lg:flex data-collapsed:hidden!"
        >
          <DesktopNav />
        </div>
        <div className="ml-auto flex items-center gap-1.5 lg:ml-0 lg:in-data-compact:ml-auto!">
          <LanguageMenu className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <AccountButtons />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function useScrolled(threshold: number) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/**
 * Keeps the navbar on one line whatever the language or screen width. Items marked
 * `data-collapse="n"` are optional, and a higher n is more important (4 = the links). If the row
 * overflows, all of them collapse, then each comes back, most important first, if it still fits.
 * The row gets `data-compact` while the links are collapsed, which shows the hamburger.
 */
function useFitOneLine(ref: RefObject<HTMLDivElement | null>, language: string | undefined) {
  useLayoutEffect(() => {
    const row = ref.current;
    if (!row) return;
    const overflows = () => row.scrollWidth > row.clientWidth;
    const setCollapsed = (el: HTMLElement, collapsed: boolean) => {
      el.toggleAttribute('data-collapsed', collapsed);
      if (el.dataset.collapse === '4') row.toggleAttribute('data-compact', collapsed);
    };
    const fit = () => {
      const items = [...row.querySelectorAll<HTMLElement>('[data-collapse]')]
        .filter((el) => el.offsetParent !== null || el.hasAttribute('data-collapsed'))
        .sort((a, b) => Number(b.dataset.collapse) - Number(a.dataset.collapse));
      for (const el of items) setCollapsed(el, false);
      if (!overflows()) return;
      for (const el of items) setCollapsed(el, true);
      for (const el of items) {
        setCollapsed(el, false);
        if (overflows()) setCollapsed(el, true);
      }
    };
    fit();
    // Re-fit on resize, when the account buttons appear after loading, and once web fonts arrive.
    const observer = new ResizeObserver(fit);
    observer.observe(row);
    for (const child of row.children) observer.observe(child);
    void document.fonts.ready.then(fit);
    return () => observer.disconnect();
  }, [ref, language]);
}
