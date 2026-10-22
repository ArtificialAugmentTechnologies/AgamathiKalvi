import { z } from 'zod';
import { CLASS_OPTIONS, DISTRICT_OPTIONS } from '../../lib/tamil-nadu.js';

/** Indian mobile number: optional +91 / 0 prefix, 10 digits starting 6–9. Normalised to +91XXXXXXXXXX. */
export const indianMobile = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, ''))
  .refine((v) => /^[6-9]\d{9}$/.test(v), 'Enter a valid 10-digit mobile number')
  .transform((v) => `+91${v}`);

const name = z.string().trim().min(2, 'Name is too short').max(80);
const optionalEmail = z
  .string()
  .trim()
  .email('Enter a valid email')
  .max(120)
  .optional()
  .or(z.literal('').transform(() => undefined));
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => v || undefined);

const base = {
  name,
  phone: indianMobile,
  /** Honeypot — real users never see or fill this field. */
  website: z.string().max(200).optional(),
  source: optionalText(40),
};

export const schoolInviteSchema = z.object({
  type: z.literal('school_invite'),
  ...base,
  schoolName: z.string().trim().min(2, 'Enter the school name').max(120),
  classLevel: z.enum(CLASS_OPTIONS),
  district: z.enum(DISTRICT_OPTIONS),
});

export const contactSchema = z.object({
  type: z.literal('contact'),
  ...base,
  email: optionalEmail,
  classLevel: z.enum(CLASS_OPTIONS).optional(),
  message: z.string().trim().min(5, 'Message is too short').max(2000),
  preferredTime: optionalText(40),
});

export const counsellingSchema = z.object({
  type: z.literal('counselling'),
  ...base,
  email: optionalEmail,
  district: z.enum(DISTRICT_OPTIONS),
  classLevel: z.enum(CLASS_OPTIONS),
  interest: optionalText(60),
  cutoff: z.coerce.number().min(0).max(200).optional(),
  mode: z.enum(['phone', 'video', 'office']).default('phone'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening']).optional(),
  message: optionalText(1000),
});

export const createLeadSchema = z.discriminatedUnion('type', [
  schoolInviteSchema,
  contactSchema,
  counsellingSchema,
]);

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
