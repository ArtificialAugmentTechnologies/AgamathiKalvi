import {
  BookOpen,
  BookmarkCheck,
  CalendarCheck,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  UserRound,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useLogout, useMe } from '@/features/auth/api';
import { BookingsPanel } from '@/features/dashboard/BookingsPanel';
import { ChoicesPanel, ResourcesPanel } from '@/features/dashboard/OtherPanels';
import { OverviewPanel } from '@/features/dashboard/OverviewPanel';
import { ProfilePanel } from '@/features/dashboard/ProfilePanel';
import { ResultsPanel } from '@/features/dashboard/ResultsPanel';
import { usePageMeta } from '@/hooks/usePageMeta';
import { cn } from '@/lib/utils';

const TABS = [
  { key: 'overview', path: '', icon: LayoutDashboard, Panel: OverviewPanel },
  { key: 'profile', path: 'profile', icon: UserRound, Panel: ProfilePanel },
  { key: 'choices', path: 'choices', icon: ListOrdered, Panel: ChoicesPanel },
  { key: 'results', path: 'results', icon: BookmarkCheck, Panel: ResultsPanel },
  { key: 'bookings', path: 'bookings', icon: CalendarCheck, Panel: BookingsPanel },
  { key: 'resources', path: 'resources', icon: BookOpen, Panel: ResourcesPanel },
] as const;

export default function DashboardPage() {
  const { t } = useTranslation();
  const { tab = '' } = useParams();
  const { data: user } = useMe();
  const logout = useLogout();
  const navigate = useNavigate();
  usePageMeta(t('pages.dashboard'));

  const current = TABS.find((x) => x.path === tab);
  if (!current) return <Navigate to="/dashboard" replace />;
  const { Panel } = current;

  const signOut = () =>
    logout.mutate(undefined, {
      onSuccess: () => {
        toast(t('auth.loggedOut'));
        navigate('/', { replace: true });
      },
    });

  return (
    <section className="relative">
      <div aria-hidden className="bg-aurora absolute inset-x-0 top-0 h-80" />
      <div className="container-page relative py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              {t('dashboard.greeting', { name: user?.name.split(' ')[0] ?? '' })}
            </h1>
            <p className="mt-2 text-muted-foreground">{t('dashboard.lead')}</p>
          </div>
          <Button variant="outline" onClick={signOut} disabled={logout.isPending}>
            <LogOut /> {t('account.logout')}
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[15rem_1fr] lg:items-start">
          <nav
            aria-label={t('pages.dashboard')}
            className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0"
          >
            <ul className="flex gap-2 lg:sticky lg:top-24 lg:flex-col">
              {TABS.map(({ key, path, icon: Icon }) => (
                <li key={key} className="shrink-0">
                  <NavLink
                    to={`/dashboard${path ? `/${path}` : ''}`}
                    end
                    className={({ isActive }) =>
                      cn(
                        'flex h-11 items-center gap-2.5 rounded-xl px-4 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
                        isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent',
                      )
                    }
                  >
                    <Icon className="size-4" aria-hidden />
                    {t(`dashboard.tabs.${key}`)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <Panel />
          </div>
        </div>
      </div>
    </section>
  );
}
