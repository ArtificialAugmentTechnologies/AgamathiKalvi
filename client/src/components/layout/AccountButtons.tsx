import { LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useLogout, useMe } from '@/features/auth/api';
import { useBookCounselling } from '@/features/booking/useBookCounselling';
import { cn } from '@/lib/utils';

/** The CTA labels carry a "\n": two short lines keep the buttons narrow in the navbar. */
const TWO_LINE =
  'h-11 rounded-2xl px-3 py-1 text-center text-[13px] leading-tight whitespace-pre-line';

/** Navbar (desktop): explore-courses, student-login and free-guidance CTAs when signed out; avatar + name linking to the dashboard when signed in. */
export function AccountButtons() {
  const { t } = useTranslation();
  const { data: user, isPending } = useMe();
  const book = useBookCounselling();

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
      {/* data-collapse: the navbar drops these, Explore first, when they don't fit on one line. */}
      <Button
        variant="outline"
        size="sm"
        asChild
        data-collapse="2"
        className={cn(TWO_LINE, 'hidden md:inline-flex data-collapsed:hidden!')}
      >
        <Link to="/careers">{t('nav.exploreCourses')}</Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        asChild
        data-collapse="2.5"
        className={cn(TWO_LINE, 'hidden gap-1.5 px-2 md:inline-flex data-collapsed:hidden!')}
      >
        <Link to="/login">
          <LogIn aria-hidden />
          {t('nav.studentLogin')}
        </Link>
      </Button>
      <Button
        size="sm"
        onClick={() => book({ thenLogin: true })}
        data-collapse="3"
        className={cn(TWO_LINE, 'hidden md:inline-flex data-collapsed:hidden!')}
      >
        {t('nav.freeGuidance')}
      </Button>
    </>
  );
}

/** Mobile menu: Student Login, Sign up and Explore Courses when signed out (Free Career Guidance sits below it); dashboard and logout when signed in. */
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
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" asChild>
          <Link to="/login" onClick={onNavigate}>
            <LogIn /> {t('nav.studentLogin').replace('\n', ' ')}
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link to="/signup" onClick={onNavigate}>
            {t('nav.signup')}
          </Link>
        </Button>
      </div>
      <Button variant="outline" className="w-full" asChild>
        <Link to="/careers" onClick={onNavigate}>
          {t('nav.exploreCourses').replace('\n', ' ')}
        </Link>
      </Button>
    </div>
  );
}
