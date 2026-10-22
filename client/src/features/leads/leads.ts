import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { CLASS_OPTIONS, DISTRICT_OPTIONS, INTEREST_OPTIONS } from '@/config/tamil-nadu';
import { api, ApiError } from '@/lib/api';

// Error messages are i18n keys, translated where they are shown.
const required = 'forms.errors.required';

export const nameField = z.string().trim().min(2, 'forms.errors.name').max(80);
export const mobileField = z
  .string()
  .trim()
  .refine(
    (v) => /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '')),
    'forms.errors.mobile',
  );
const selectOf = <T extends readonly [string, ...string[]]>(values: T) =>
  z.enum(values, { errorMap: () => ({ message: required }) });

export const districtField = selectOf(DISTRICT_OPTIONS);
export const classField = selectOf(CLASS_OPTIONS);
export const interestField = selectOf(INTEREST_OPTIONS);

export const schoolInviteForm = z.object({
  name: nameField,
  schoolName: z.string().trim().min(2, required).max(120),
  classLevel: classField,
  phone: mobileField,
  district: districtField,
  website: z.string().optional(),
});
export type SchoolInviteForm = z.infer<typeof schoolInviteForm>;

export type LeadPayload =
  | ({ type: 'school_invite'; source?: string } & SchoolInviteForm)
  | {
      type: 'contact';
      source?: string;
      name: string;
      phone: string;
      email?: string;
      classLevel?: string;
      message: string;
      preferredTime?: string;
      website?: string;
    }
  | {
      type: 'counselling';
      source?: string;
      name: string;
      phone: string;
      email?: string;
      district: string;
      classLevel: string;
      interest?: string;
      cutoff?: number;
      mode: 'phone' | 'video' | 'office';
      preferredTime?: 'morning' | 'afternoon' | 'evening';
      message?: string;
      website?: string;
    };

export function useCreateLead() {
  return useMutation({
    mutationFn: (payload: LeadPayload) =>
      api<{ id: string; type: string }>('/leads', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
  });
}

/** i18n key for a failed submission. */
export const leadErrorKey = (err: unknown) =>
  err instanceof ApiError && err.status === 429
    ? 'forms.errors.rateLimited'
    : 'forms.errors.generic';
