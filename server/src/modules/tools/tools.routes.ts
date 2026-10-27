import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { TN_DISTRICTS } from '../../lib/tamil-nadu.js';
import { predict } from './predictor.js';

export const toolsRouter = Router();

const COMMUNITIES = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST'] as const;

/** "CS,EC" or ["CS","EC"] → string[] */
const csv = (max: number) =>
  z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) =>
      (Array.isArray(v) ? v : (v ?? '').split(','))
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, max),
    );

const predictQuery = z.object({
  cutoff: z.coerce.number().min(0).max(200),
  community: z.enum(COMMUNITIES),
  branches: csv(10),
  districts: csv(38).pipe(z.array(z.enum(TN_DISTRICTS))),
});

const collegeBranchInclude = {
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
} as const;

toolsRouter.get('/branches', async (_req, res) => {
  res.json(
    await prisma.branch.findMany({
      orderBy: { name: 'asc' },
      select: { code: true, name: true, nameTa: true, nameHi: true },
    }),
  );
});

toolsRouter.get('/predict', async (req, res) => {
  const { cutoff, community, branches, districts } = predictQuery.parse(req.query);

  const rows = await prisma.collegeBranch.findMany({
    where: {
      branch: branches.length ? { code: { in: branches } } : undefined,
      college: districts.length ? { district: { in: districts } } : undefined,
    },
    include: {
      ...collegeBranchInclude,
      cutoffs: {
        where: { community },
        orderBy: { year: 'asc' },
        select: { year: true, closingCutoff: true, isSample: true },
      },
    },
  });

  const candidates = rows.map(({ cutoffs, ...cb }) => ({
    id: cb.id,
    college: cb.college,
    branch: cb.branch,
    history: cutoffs.map(({ year, closingCutoff }) => ({ year, closingCutoff })),
  }));
  const groups = predict(cutoff, candidates);

  // How many matching options sit in each district (powers the district overview).
  const districtCounts: Record<string, number> = {};
  for (const item of [...groups.safe, ...groups.moderate, ...groups.dream]) {
    districtCounts[item.college.district] = (districtCounts[item.college.district] ?? 0) + 1;
  }

  res.json({
    input: { cutoff, community, branches, districts },
    isSample: rows.some((r) => r.college.isSample || r.cutoffs.some((c) => c.isSample)),
    groups,
    districtCounts,
  });
});

const optionsQuery = z.object({
  q: z.string().trim().max(60).optional(),
  branch: z.string().trim().max(10).optional(),
  district: z.enum(TN_DISTRICTS).optional(),
});

/** College + branch combinations for the choice list builder's search box. */
toolsRouter.get('/college-options', async (req, res) => {
  const { q, branch, district } = optionsQuery.parse(req.query);
  const rows = await prisma.collegeBranch.findMany({
    where: {
      branch: branch ? { code: branch } : undefined,
      college: {
        district,
        OR: q
          ? [
              { name: { contains: q, mode: 'insensitive' } },
              { shortName: { contains: q, mode: 'insensitive' } },
              { district: { contains: q, mode: 'insensitive' } },
            ]
          : undefined,
      },
    },
    include: collegeBranchInclude,
    orderBy: [{ college: { name: 'asc' } }, { branch: { name: 'asc' } }],
    take: 60,
  });
  res.json(rows.map((r) => ({ id: r.id, college: r.college, branch: r.branch })));
});
