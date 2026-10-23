// Dates are always shown in India time, whatever the device's timezone.
const TZ = 'Asia/Kolkata';
const locale = (lang: string) => (lang === 'ta' ? 'ta-IN' : 'en-IN');

export const formatDay = (iso: string, lang: string) =>
  new Date(iso).toLocaleDateString(locale(lang), {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: TZ,
  });

export const formatTime = (iso: string, lang: string) =>
  new Date(iso).toLocaleTimeString(locale(lang), {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: TZ,
  });

export const dayKey = (iso: string) => new Date(iso).toLocaleDateString('en-CA', { timeZone: TZ });
