// Sample counselling slots for the next two weeks — counsellors manage real ones in the admin panel.
import type { BookingMode } from '@prisma/client';

const IST_OFFSET_MIN = 330; // UTC+5:30
const TIMES: { h: number; m: number; mode: BookingMode }[] = [
  { h: 10, m: 0, mode: 'phone' },
  { h: 12, m: 0, mode: 'office' },
  { h: 16, m: 0, mode: 'video' },
  { h: 18, m: 0, mode: 'phone' },
];

/** Mon–Sat slots at 10 AM, 12 PM, 4 PM and 6 PM IST, 45 minutes each, two places per slot. */
export function upcomingSlots(days = 14, from = new Date()) {
  const slots: { startsAt: Date; endsAt: Date; mode: BookingMode; capacity: number }[] = [];
  for (let d = 1; d <= days; d++) {
    // Midnight IST of the target day, expressed in UTC.
    const day = new Date(from);
    day.setUTCHours(0, 0, 0, 0);
    day.setUTCDate(day.getUTCDate() + d);
    const istWeekday = new Date(day.getTime() + IST_OFFSET_MIN * 60_000).getUTCDay();
    if (istWeekday === 0) continue; // closed on Sundays
    for (const { h, m, mode } of TIMES) {
      const startsAt = new Date(day.getTime() + (h * 60 + m - IST_OFFSET_MIN) * 60_000);
      slots.push({
        startsAt,
        endsAt: new Date(startsAt.getTime() + 45 * 60_000),
        mode,
        capacity: 2,
      });
    }
  }
  return slots;
}
