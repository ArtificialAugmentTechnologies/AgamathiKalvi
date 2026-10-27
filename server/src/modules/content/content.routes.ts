import { Router } from 'express';
import { z } from 'zod';
import { notFound } from '../../lib/http-error.js';
import { prisma } from '../../lib/prisma.js';

// Public, read-only site content used by the Home and About pages.
export const contentRouter = Router();

contentRouter.get('/settings', async (_req, res) => {
  const rows = await prisma.siteSetting.findMany();
  res.json(Object.fromEntries(rows.map((r) => [r.key, r.value])));
});

contentRouter.get('/testimonials', async (_req, res) => {
  res.json(
    await prisma.testimonial.findMany({ where: { published: true }, orderBy: { order: 'asc' } }),
  );
});

contentRouter.get('/team', async (_req, res) => {
  res.json(
    await prisma.teamMember.findMany({ where: { published: true }, orderBy: { order: 'asc' } }),
  );
});

contentRouter.get('/faqs', async (_req, res) => {
  res.json(await prisma.faq.findMany({ where: { published: true }, orderBy: { order: 'asc' } }));
});

contentRouter.get('/partners', async (_req, res) => {
  res.json(await prisma.partnerLogo.findMany({ orderBy: { order: 'asc' } }));
});

contentRouter.get('/blog', async (_req, res) => {
  res.json(
    await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        titleTa: true,
        titleHi: true,
        excerpt: true,
        coverUrl: true,
        pdfUrl: true,
        readingMins: true,
        comingSoon: true,
        publishedAt: true,
        category: { select: { slug: true, name: true, nameTa: true, nameHi: true } },
      },
    }),
  );
});

contentRouter.get('/blog/:slug', async (req, res) => {
  const post = await prisma.blogPost.findFirst({
    where: { slug: req.params.slug, status: 'published' },
    include: { category: { select: { slug: true, name: true, nameTa: true, nameHi: true } } },
  });
  if (!post) throw notFound('Article');
  const { needsReview: _review, categoryId: _categoryId, ...publicFields } = post;
  res.json(publicFields);
});

const mediaQuery = z.object({
  type: z.enum(['photo', 'video', 'press']).optional(),
  year: z.coerce.number().int().min(2000).max(2100).optional(),
});

contentRouter.get('/media', async (req, res) => {
  const { type, year } = mediaQuery.parse(req.query);
  res.json(
    await prisma.mediaItem.findMany({
      where: { type, year },
      orderBy: [{ year: 'desc' }, { order: 'asc' }],
    }),
  );
});
