import { Router } from 'express';
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
        excerpt: true,
        coverUrl: true,
        pdfUrl: true,
        readingMins: true,
        comingSoon: true,
        publishedAt: true,
        category: { select: { slug: true, name: true, nameTa: true } },
      },
    }),
  );
});
