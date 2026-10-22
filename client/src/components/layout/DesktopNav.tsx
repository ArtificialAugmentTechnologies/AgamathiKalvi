import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navItemClass,
} from '@/components/ui/navigation-menu';
import { mainNav, type NavChild } from '@/config/navigation';
import { cn } from '@/lib/utils';

export function DesktopNav() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <NavigationMenu aria-label={t('nav.mainNav')} delayDuration={80}>
      <NavigationMenuList>
        {mainNav.map((item) =>
          item.kind === 'link' ? (
            <NavigationMenuItem key={item.to}>
              <NavigationMenuLink asChild>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={cn(
                    navItemClass,
                    'aria-[current=page]:bg-accent aria-[current=page]:text-foreground',
                  )}
                >
                  {t(item.label)}
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.id} value={item.id}>
              <NavigationMenuTrigger
                className={cn(
                  item.children.some((c) => pathname.startsWith(c.to)) && 'text-foreground',
                )}
              >
                {t(item.label)}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-[min(36rem,calc(100vw-2rem))]">
                <p className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {t(item.heading)}
                </p>
                <ul className="grid gap-1 sm:grid-cols-2">
                  {item.children.map((child) => (
                    <MenuLink key={child.to} item={child} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MenuLink({ item }: { item: NavChild }) {
  const { t } = useTranslation();
  const Icon = item.icon;
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={item.to}
          className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-clay-soft text-primary transition-transform group-hover:scale-105">
            <Icon className="size-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">{t(item.title)}</span>
            <span className="block text-xs leading-snug text-muted-foreground">{t(item.desc)}</span>
          </span>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
