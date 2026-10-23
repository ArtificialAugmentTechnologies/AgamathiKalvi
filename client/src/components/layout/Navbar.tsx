import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { AccountButtons } from './AccountButtons';
import { DesktopNav } from './DesktopNav';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const scrolled = useScrolled(8);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-b border-border/70 bg-background/75 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center gap-3 lg:h-[4.5rem]">
        <Logo />
        <div className="hidden flex-1 justify-center lg:flex">
          <DesktopNav />
        </div>
        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <LanguageToggle className="hidden sm:inline-flex" />
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
