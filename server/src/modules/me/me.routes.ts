import { Prisma } from '@prisma/client';
import { Router } from 'express';
import { z } from 'zod';
import { notFound } from '../../lib/http-error.js';
import { prisma } from '../../lib/prisma.js';
import { TN_DISTRICTS } from '../../lib/tamil-nadu.js';
import { requireAuth } from '../../middleware/auth.js';
import { indianMobile } from '../leads/leads.schema.js';

/** Everything under /api/me belongs to the signed-in student. */
export const meRouter = Router();
meRouter.use(requireAuth);

const DEFAULT_LIST = 'My TNEA choices';
const mark = z.coerce.number().min(0).max(100);

const profileSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  phone: indianMobile.optional().or(z.literal('').transform(() => null)),
  classLevel: z.enum(['class10', 'class11', 'class12']).nullable().optional(),
  school: z.string().trim().max(120).nullable().optional(),
  district: z.enum(TN_DISTRICTS).nullable().optional(),
  community: z.enum(['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST']).nullable().optional(),
  marks: z.object({ maths: mark, physics: mark, chemistry: mark }).partial().nullable().optional(),
  interests: z.array(z.string().trim().max(40)).max(10).nullable().optional(),
});

meRouter.get('/profile', async (req, res) => {
  const profile = await prisma.studentProfile.findUnique({ where: { userId: req.user!.id } });
  res.json({ user: req.user, profile });
});

meRouter.put('/profile', async (req, res) => {
  const { name, phone, marks, interests, ...rest } = profileSchema.parse(req.body);
  // Json columns need Prisma.JsonNull (not plain null) to be cleared.
  const json = (v: unknown) => (v === null ? Prisma.JsonNull : (v as Prisma.InputJsonValue));
  const data = {
    ...rest,
    ...(marks !== undefined && { marks: json(marks) }),
    ...(interests !== undefined && { interests: json(interests) }),
  };
  const [user, profile] = await prisma.$transaction([
    prisma.user.update({
      where: { id: req.user!.id },
      data: { ...(name && { name }), ...(phone !== undefined && { phone }) },
      select: { id: true, email: true, name: true, phone: true, role: true },
    }),
    prisma.studentProfile.upsert({
      where: { userId: req.user!.id },
      update: data,
      create: { userId: req.user!.id, ...data },
    }),
  ]);
  res.json({ user, profile });
});

// ── Saved tool results ──

const resultSchema = z.object({
  tool: z.enum(['cutoff', 'predictor', 'quiz', 'scholarship']),
  title: z.string().trim().max(120).optional(),
  input: z.record(z.unknown()),
  output: z.record(z.unknown()),
});

meRouter.get('/results', async (req, res) => {
  res.json(
    await prisma.savedResult.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    }),
  );
});

meRouter.post('/results', async (req, res) => {
  const { tool, title, input, output } = resultSchema.parse(req.body);
  const saved = await prisma.savedResult.create({
    data: {
      userId: req.user!.id,
      tool,
      title,
      input: input as Prisma.InputJsonValue,
      output: output as Prisma.InputJsonValue,
    },
  });
  res.status(201).json(saved);
});

meRouter.delete('/results/:id', async (req, res) => {
  const { count } = await prisma.savedResult.deleteMany({
    where: { id: req.params.id, userId: req.user!.id },
  });
  if (!count) throw notFound('Saved result');
  res.status(204).end();
});

// ── Choice list (one default list per student) ──

const choiceInclude = {
  items: {
    orderBy: { position: 'asc' },
    include: {
      collegeBranch: {
        include: {
          college: {
            select: {
              id: true,
              name: true,
              shortName: true,
              district: true,
              type: true,
              website: true,
              isSample: true,
            },
          },
          branch: { select: { code: true, name: true, nameTa: true, nameHi: true } },
        },
      },
    },
  },
} as const;

const toChoices = (list: Prisma.ChoiceListGetPayload<{ include: typeof choiceInclude }> | null) =>
  (list?.items ?? []).map((i) => ({
    id: i.collegeBranch.id,
    college: i.collegeBranch.college,
    branch: i.collegeBranch.branch,
  }));

meRouter.get('/choice-list', async (req, res) => {
  const list = await prisma.choiceList.findFirst({
    where: { userId: req.user!.id },
    include: choiceInclude,
  });
  res.json({ items: toChoices(list), updatedAt: list?.updatedAt ?? null });
});

const choiceSchema = z.object({ items: z.array(z.string().min(1).max(40)).max(300) });

/** Replaces the whole list in the given order (the browser keeps the working copy). */
meRouter.put('/choice-list', async (req, res) => {
  const ids = [...new Set(choiceSchema.parse(req.body).items)];
  const userId = req.user!.id;
  // Ignore ids that no longer exist (e.g. sample colleges re-seeded).
  const valid = new Set(
    (await prisma.collegeBranch.findMany({ where: { id: { in: ids } }, select: { id: true } })).map(
      (c) => c.id,
    ),
  );
  const ordered = ids.filter((id) => valid.has(id));

  const existing = await prisma.choiceList.findFirst({ where: { userId }, select: { id: true } });
  const list = await prisma.$transaction(async (tx) => {
    const l = existing ?? (await tx.choiceList.create({ data: { userId, name: DEFAULT_LIST } }));
    await tx.choiceListItem.deleteMany({ where: { listId: l.id } });
    await tx.choiceListItem.createMany({
      data: ordered.map((collegeBranchId, position) => ({
        listId: l.id,
        collegeBranchId,
        position,
      })),
    });
    await tx.choiceList.update({ where: { id: l.id }, data: { updatedAt: new Date() } });
    return tx.choiceList.findUnique({ where: { id: l.id }, include: choiceInclude });
  });
  res.json({ items: toChoices(list), updatedAt: list?.updatedAt ?? null });
});

// ── Bookings ──

meRouter.get('/bookings', async (req, res) => {
  res.json(
    await prisma.booking.findMany({
      where: { userId: req.user!.id },
      orderBy: { slot: { startsAt: 'desc' } },
      include: { slot: { select: { startsAt: true, endsAt: true, mode: true } } },
    }),
  );
});
