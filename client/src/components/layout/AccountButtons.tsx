import { LayoutDashboard, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useLogout, useMe } from '@/features/auth/api';

/** Navbar (desktop): Login / Sign up when signed out; avatar + name linking to the dashboard when signed in. */
export function AccountButtons() {
  const { t } = useTranslation();
  const { data: user, isPending } = useMe();

  if (isPending) return <span className="hidden h-9 w-24 lg:inline-block" aria-hidden />;

  if (user) {
    return (
      <Link
        to="/dashboard"
        className="hidden h-10 items-center gap-2 rounded-full border bg-card/60 py-1 pr-4 pl-1 text-sm font-semibold transition hover:border-primary/60 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none lg:inline-flex"
        title={t('account.dashboard')}
      >
        <span
          className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-primary to-[#f2b48f] text-primary-foreground"
          aria-hidden
        >
          {user.name.charAt(0).toUpperCase()}
        </span>
        <span className="max-w-28 truncate">{user.name.split(' ')[0]}</span>
      </Link>
    );
  }

  return (
    <>
      <Button variant="ghost" size="sm" asChild className="hidden lg:inline-flex">
        <Link to="/login">{t('nav.login')}</Link>
      </Button>
      <Button size="sm" asChild className="hidden xl:inline-flex">
        <Link to="/signup">{t('nav.signup')}</Link>
      </Button>
    </>
  );
}

/** Mobile menu: the same choice, as two full-width buttons. */
export function MobileAccountButtons({ onNavigate }: { onNavigate: () => void }) {
  const { t } = useTranslation();
  const { data: user } = useMe();
  const logout = useLogout();
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" asChild>
          <Link to="/dashboard" onClick={onNavigate}>
            <LayoutDashboard /> {t('account.dashboard')}
          </Link>
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            logout.mutate(undefined, {
              onSuccess: () => {
                onNavigate();
                toast(t('auth.loggedOut'));
                navigate('/');
              },
            })
          }
        >
          <LogOut /> {t('account.logout')}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" asChild>
        <Link to="/login" onClick={onNavigate}>
          {t('nav.login')}
        </Link>
      </Button>
      <Button variant="secondary" asChild>
        <Link to="/signup" onClick={onNavigate}>
          {t('nav.signup')}
        </Link>
      </Button>
    </div>
  );
}
