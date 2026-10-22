import type { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import type { CreateLeadInput } from './leads.schema.js';

/** Maps a validated form submission onto the Lead table. */
export function toLeadData(input: CreateLeadInput): Prisma.LeadCreateInput {
  const common = { name: input.name, phone: input.phone, source: input.source };

  switch (input.type) {
    case 'school_invite':
      return {
        ...common,
        type: 'school_invite',
        schoolName: input.schoolName,
        classLevel: input.classLevel,
        district: input.district,
      };
    case 'contact':
      return {
        ...common,
        type: 'contact',
        email: input.email,
        classLevel: input.classLevel,
        message: input.message,
        preferredTime: input.preferredTime,
      };
    case 'counselling':
      return {
        ...common,
        type: 'counselling',
        email: input.email,
        district: input.district,
        classLevel: input.classLevel,
        message: input.message,
        preferredTime: input.preferredTime,
        meta: { interest: input.interest, cutoff: input.cutoff, mode: input.mode },
      };
  }
}

export async function createLead(input: CreateLeadInput) {
  return prisma.lead.create({ data: toLeadData(input), select: { id: true, type: true } });
}
