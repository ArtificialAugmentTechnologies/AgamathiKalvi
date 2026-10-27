import { CalendarCheck, Clock, MapPin, Phone, Video, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/form-controls';
import { useWhatsAppNumber } from '@/hooks/useSettings';
import { ApiError } from '@/lib/api';
import { cn } from '@/lib/utils';
import {
  useBookSlot,
  useCancelBooking,
  useMyBookings,
  useSlots,
  type Booking,
  type Mode,
  type Slot,
} from './api';
import { dayKey, formatDay, formatTime } from './format';

// The API answers booking conflicts in English; show them in the visitor's language.
const CONFLICT_KEYS = {
  'This slot has already started': 'dashboard.bookings.conflicts.started',
  'You have already booked this slot': 'dashboard.bookings.conflicts.duplicate',
  'This slot is full — please pick another time': 'dashboard.bookings.conflicts.full',
  'This slot just changed — please try again': 'dashboard.bookings.conflicts.changed',
  'This booking can no longer be cancelled': 'dashboard.bookings.conflicts.noCancel',
  'This session has already started': 'dashboard.bookings.conflicts.sessionStarted',
} as const;
const conflictKey = (message: string) =>
  CONFLICT_KEYS[message as keyof typeof CONFLICT_KEYS] ?? 'forms.errors.generic';

const MODE_ICON: Record<Mode, typeof Phone> = { phone: Phone, video: Video, office: MapPin };
const STATUS_TONE: Record<Booking['status'], string> = {
  pending: 'bg-brand-yellow/15 text-brand-yellow',
  confirmed: 'bg-success/15 text-success',
  completed: 'bg-sky/15 text-sky',
  cancelled: 'bg-muted text-muted-foreground',
};

export function BookingsPanel() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage ?? 'en';
  const whatsapp = useWhatsAppNumber();
  const { data: slots = [], isPending } = useSlots();
  const { data: bookings = [] } = useMyBookings();
  const book = useBookSlot();
  const cancel = useCancelBooking();
  const [selected, setSelected] = useState<Slot | null>(null);
  const [notes, setNotes] = useState('');

  // Group slots by day (India time) for a simple day-by-day picker.
  const days = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const s of slots) map.set(dayKey(s.startsAt), [...(map.get(dayKey(s.startsAt)) ?? []), s]);
    return [...map.entries()];
  }, [slots]);
  const [day, setDay] = useState<string | null>(null);
  const activeDay = day ?? days[0]?.[0] ?? null;
  const daySlots = days.find(([k]) => k === activeDay)?.[1] ?? [];

  const confirm = () => {
    if (!selected) return;
    book.mutate(
      { slotId: selected.id, notes: notes.trim() || undefined },
      {
        onSuccess: () => {
          toast.success(t('dashboard.bookings.success'));
          setSelected(null);
          setNotes('');
        },
        onError: (e) =>
          toast.error(
            t(
              e instanceof ApiError && e.status === 409
                ? conflictKey(e.message)
                : 'forms.errors.generic',
            ),
          ),
      },
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-card p-6" aria-labelledby="bk-title">
        <h2 id="bk-title" className="font-sans text-lg font-semibold">
          {t('dashboard.bookings.title')}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t('dashboard.bookings.lead')}</p>

        {!isPending && days.length === 0 && (
          <div className="mt-5 rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            <p>{t('dashboard.bookings.noSlots')}</p>
            <Button asChild variant="whatsapp" className="mt-4">
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" /> WhatsApp
              </a>
            </Button>
          </div>
        )}

        {days.length > 0 && (
          <>
            <div
              className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]"
              role="tablist"
            >
              {days.map(([k, list]) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={activeDay === k}
                  onClick={() => {
                    setDay(k);
                    setSelected(null);
                  }}
                  className={cn(
                    'shrink-0 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
                    activeDay === k
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'bg-background/40 hover:border-primary/50',
                  )}
                >
                  {formatDay(list[0]!.startsAt, lang)}
                </button>
              ))}
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {daySlots.map((s) => {
                const Icon = MODE_ICON[s.mode];
                const unavailable = s.remaining === 0 || s.bookedByMe;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      disabled={unavailable}
                      aria-pressed={selected?.id === s.id}
                      onClick={() => setSelected(s)}
                      className={cn(
                        'flex w-full flex-col items-start rounded-2xl border p-4 text-left transition focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50',
                        selected?.id === s.id
                          ? 'border-primary bg-primary/10'
                          : 'hover:border-primary/50',
                      )}
                    >
                      <span className="flex items-center gap-1.5 font-serif text-xl font-semibold">
                        <Clock className="size-4 text-primary" aria-hidden />{' '}
                        {formatTime(s.startsAt, lang)}
                      </span>
                      <span className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Icon className="size-3.5" aria-hidden /> {t(`options.mode.${s.mode}`)}
                      </span>
                      <span className="mt-2 text-xs font-semibold">
                        {s.bookedByMe
                          ? t('dashboard.bookings.booked')
                          : s.remaining === 0
                            ? t('dashboard.bookings.full')
                            : t('dashboard.bookings.remaining', { count: s.remaining })}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {selected && (
              <div className="mt-5 space-y-3 rounded-2xl border border-primary/40 bg-primary/5 p-4">
                <p className="font-semibold">
                  {formatDay(selected.startsAt, lang)} · {formatTime(selected.startsAt, lang)} ·{' '}
                  {t(`options.mode.${selected.mode}`)}
                </p>
                <label htmlFor="bk-notes" className="block text-sm font-medium">
                  {t('dashboard.bookings.notes')}
                </label>
                <Textarea
                  id="bk-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={1000}
                />
                <Button onClick={confirm} disabled={book.isPending}>
                  <CalendarCheck />{' '}
                  {book.isPending ? t('auth.working') : t('dashboard.bookings.confirm')}
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="rounded-3xl border bg-card p-6" aria-labelledby="my-bk">
        <h2 id="my-bk" className="font-sans text-lg font-semibold">
          {t('dashboard.bookings.mine')}
        </h2>
        {bookings.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">{t('dashboard.bookings.none')}</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {bookings.map((b) => {
              const canCancel =
                (b.status === 'pending' || b.status === 'confirmed') &&
                new Date(b.slot.startsAt) > new Date();
              return (
                <li key={b.id} className="flex flex-wrap items-center gap-3 rounded-2xl border p-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">
                      {formatDay(b.slot.startsAt, lang)} · {formatTime(b.slot.startsAt, lang)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t(`options.mode.${b.slot.mode}`)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-xs font-semibold',
                      STATUS_TONE[b.status],
                    )}
                  >
                    {t(`dashboard.bookings.status.${b.status}`)}
                  </span>
                  {canCancel && (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={cancel.isPending}
                      onClick={() =>
                        window.confirm(t('dashboard.bookings.confirmCancel')) &&
                        cancel.mutate(b.id, {
                          onSuccess: () => toast(t('dashboard.bookings.cancelled')),
                        })
                      }
                    >
                      <X /> {t('dashboard.bookings.cancel')}
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
