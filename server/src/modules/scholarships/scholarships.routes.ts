import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { isEligible } from './scholarships.js';

export const scholarshipsRouter = Router();

const query = z.object({
  classLevel: z.enum(['class10', 'class11', 'class12']).optional(),
  community: z.enum(['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST']).optional(),
  income: z.coerce.number().int().min(0).max(1_00_00_000).optional(),
  gender: z.enum(['female', 'male']).optional(),
  stream: z.enum(['science', 'commerce', 'arts', 'vocational']).optional(),
});

scholarshipsRouter.get('/', async (req, res) => {
  const criteria = query.parse(req.query);
  // Small table (tens of rows) and list-valued JSON columns — filtering in code keeps the
  // query portable across Postgres and MySQL.
  const all = await prisma.scholarship.findMany({ orderBy: { name: 'asc' } });
  const matches = all
    .filter((s) => isEligible(s, criteria))
    .map(({ needsReview: _review, ...s }) => s);
  res.json({ total: all.length, isSample: matches.some((s) => s.isSample), items: matches });
});
