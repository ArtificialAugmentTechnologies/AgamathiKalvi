import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { mainNav } from '@/config/navigation';
import { useBookCounselling } from '@/features/booking/useBookCounselling';
import { MobileAccountButtons } from './AccountButtons';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

export function MobileNav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const book = useBookCounselling();
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('nav.menu')} className="lg:hidden">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={t('nav.close')} aria-describedby={undefined}>
        <div className="flex h-16 items-center border-b px-4" onClick={close}>
          <Logo />
        </div>
        <SheetTitle className="sr-only">{t('nav.mainNav')}</SheetTitle>
        <SheetDescription className="sr-only">{t('brand.tagline')}</SheetDescription>

        <nav aria-label={t('nav.mainNav')} className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {mainNav.map((item) =>
              item.kind === 'link' ? (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={close}
                    className="flex h-12 items-center rounded-xl px-3 text-base font-medium transition-colors hover:bg-accent aria-[current=page]:bg-accent aria-[current=page]:text-primary"
                  >
                    {t(item.label)}
                  </NavLink>
                </li>
              ) : (
                <li key={item.id} className="pt-3">
                  <p className="px-3 pb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    {t(item.label)}
                  </p>
                  <ul>
                    {item.children.map((child) => {
                      const Icon = child.icon;
                      return (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            onClick={close}
                            className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-2 text-[15px] transition-colors hover:bg-accent"
                          >
                            <Icon className="size-[18px] shrink-0 text-primary" aria-hidden />
                            {t(child.title)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="space-y-3 border-t p-4 pb-safe">
          <div className="flex items-center justify-between">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <MobileAccountButtons onNavigate={close} />
          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              close();
              book();
            }}
          >
            {t('common.bookCounselling')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
