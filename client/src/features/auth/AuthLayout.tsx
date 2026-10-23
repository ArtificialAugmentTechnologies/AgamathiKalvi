import { BookmarkCheck, CalendarCheck, ListOrdered } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderArt } from '@/components/common/HeaderArt';

/** Two-column frame for login and sign-up: the form on the left, perks and art on the right. */
export function AuthLayout({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  const perks = [
    { icon: BookmarkCheck, label: t('auth.perks.save') },
    { icon: ListOrdered, label: t('auth.perks.list') },
    { icon: CalendarCheck, label: t('auth.perks.book') },
  ];

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-aurora absolute inset-0" />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
      <div className="container-page relative grid min-h-[calc(100svh-4.5rem)] grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-md rounded-3xl border bg-card/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
          <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="mt-2 text-muted-foreground">{lead}</p>
          <div className="mt-7">{children}</div>
        </div>
        <div className="hidden lg:block">
          <HeaderArt art="about" className="max-w-sm" />
          <ul className="mx-auto mt-6 max-w-sm space-y-3">
            {perks.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-2xl border bg-card/60 p-4 backdrop-blur"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-clay-soft text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
