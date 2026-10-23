import { Router } from 'express';
import { z } from 'zod';
import { notFound } from '../../lib/http-error.js';
import { prisma } from '../../lib/prisma.js';

export const careersRouter = Router();

const listQuery = z.object({
  stream: z.string().trim().max(40).optional(),
  entry: z.enum(['after10', 'after12']).optional(),
  q: z.string().trim().max(80).optional(),
  cluster: z.string().trim().max(40).optional(),
});

const streamSelect = { select: { slug: true, name: true, nameTa: true, kind: true } } as const;

careersRouter.get('/streams', async (_req, res) => {
  res.json(
    await prisma.stream.findMany({
      orderBy: { order: 'asc' },
      select: {
        slug: true,
        name: true,
        nameTa: true,
        kind: true,
        _count: { select: { careers: true } },
      },
    }),
  );
});

careersRouter.get('/', async (req, res) => {
  const { stream, entry, q, cluster } = listQuery.parse(req.query);
  res.json(
    await prisma.career.findMany({
      where: {
        status: 'published',
        entry,
        cluster,
        stream: stream ? { slug: stream } : undefined,
        OR: q
          ? [
              { title: { contains: q, mode: 'insensitive' } },
              { titleTa: { contains: q, mode: 'insensitive' } },
              { summary: { contains: q, mode: 'insensitive' } },
            ]
          : undefined,
      },
      orderBy: { title: 'asc' },
      select: {
        slug: true,
        title: true,
        titleTa: true,
        summary: true,
        entry: true,
        cluster: true,
        salaryMin: true,
        salaryMax: true,
        stream: streamSelect,
      },
    }),
  );
});

careersRouter.get('/:slug', async (req, res) => {
  const career = await prisma.career.findFirst({
    where: { slug: req.params.slug, status: 'published' },
    include: { stream: streamSelect },
  });
  if (!career) throw notFound('Career');
  const { needsReview: _review, streamId: _streamId, ...publicFields } = career;
  res.json(publicFields);
});
