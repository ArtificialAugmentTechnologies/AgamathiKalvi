/**
 * Seed script. Safe to re-run:
 *  - settings and the admin user are created only if missing (admin edits survive);
 *  - CMS tables are filled only when empty;
 *  - sample colleges/cutoffs (isSample = true) are rebuilt every run.
 */
import { PrismaClient, type Community, type Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { careers, scholarships, streams } from './seed/careers.js';
import { quizQuestions } from './seed/quiz.js';
import { upcomingSlots } from './seed/slots.js';
import { branches, colleges, sampleCutoff, sampleYears } from './seed/colleges.js';
import {
  blogCategory,
  blogPosts,
  faqs,
  mediaItems,
  partnerLogos,
  siteSettings,
  team,
  testimonials,
} from './seed/content.js';

const prisma = new PrismaClient();
const communities: Community[] = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST'];

const withOrder = <T>(rows: T[]) => rows.map((r, i) => ({ ...r, order: i + 1 }));

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('  ! SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — skipping admin user');
    return;
  }
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Agamathi Admin',
      role: 'admin',
      passwordHash: await bcrypt.hash(password, 12),
    },
  });
  console.log(`  ✓ admin user ${email}`);
}

async function seedSettings() {
  for (const [key, value] of Object.entries(siteSettings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value: value as Prisma.InputJsonValue },
    });
  }
  console.log(`  ✓ ${Object.keys(siteSettings).length} site settings`);
}

/** Inserts rows only when the table is empty, so admin edits are never overwritten. */
async function seedIfEmpty(
  label: string,
  count: () => Promise<number>,
  create: () => Promise<unknown>,
) {
  if ((await count()) > 0) {
    console.log(`  - ${label}: already has data, skipped`);
    return;
  }
  await create();
  console.log(`  ✓ ${label}`);
}

async function seedContent() {
  await seedIfEmpty(
    'testimonials',
    () => prisma.testimonial.count(),
    () => prisma.testimonial.createMany({ data: withOrder(testimonials) }),
  );
  await seedIfEmpty(
    'team members',
    () => prisma.teamMember.count(),
    () => prisma.teamMember.createMany({ data: withOrder(team) }),
  );
  await seedIfEmpty(
    'partner logos',
    () => prisma.partnerLogo.count(),
    () => prisma.partnerLogo.createMany({ data: withOrder(partnerLogos) }),
  );
  await seedIfEmpty(
    'media items',
    () => prisma.mediaItem.count(),
    () => prisma.mediaItem.createMany({ data: withOrder(mediaItems) }),
  );
  await seedIfEmpty(
    'FAQs (draft copy)',
    () => prisma.faq.count(),
    () =>
      prisma.faq.createMany({ data: withOrder(faqs).map((f) => ({ ...f, needsReview: true })) }),
  );
  await seedIfEmpty(
    'blog posts',
    () => prisma.blogPost.count(),
    async () => {
      const category = await prisma.blogCategory.upsert({
        where: { slug: blogCategory.slug },
        update: {},
        create: blogCategory,
      });
      // Stagger publish dates so ordering matches the old site.
      const now = Date.now();
      await prisma.blogPost.createMany({
        data: blogPosts.map((p, i) => ({
          ...p,
          categoryId: category.id,
          status: 'published' as const,
          needsReview: true,
          publishedAt: new Date(now - i * 86_400_000),
        })),
      });
    },
  );
}

async function seedQuiz() {
  await seedIfEmpty(
    'quiz questions (draft copy)',
    () => prisma.quizQuestion.count(),
    () =>
      prisma.quizQuestion.createMany({
        data: quizQuestions.map((q, i) => ({ ...q, order: i + 1 })),
      }),
  );
}

/** Sample slots only when none are upcoming — never touches real or booked slots. */
async function seedSlots() {
  const upcoming = await prisma.counsellingSlot.count({ where: { startsAt: { gt: new Date() } } });
  if (upcoming > 0) {
    console.log('  - counselling slots: upcoming slots exist, skipped');
    return;
  }
  const slots = upcomingSlots();
  await prisma.counsellingSlot.createMany({ data: slots });
  console.log(`  ✓ ${slots.length} sample counselling slots (next 14 days)`);
}

async function seedCareers() {
  const streamIds = new Map<string, string>();
  for (const [i, s] of streams.entries()) {
    const row = await prisma.stream.upsert({
      where: { slug: s.slug },
      update: {},
      create: { ...s, order: i + 1 },
    });
    streamIds.set(s.slug, row.id);
  }
  await seedIfEmpty(
    'careers (draft copy)',
    () => prisma.career.count(),
    () =>
      prisma.career.createMany({
        data: careers.map(({ stream, ...c }) => ({
          ...c,
          streamId: streamIds.get(stream)!,
          needsReview: true,
        })),
      }),
  );
  await seedIfEmpty(
    'scholarships (sample)',
    () => prisma.scholarship.count(),
    () =>
      prisma.scholarship.createMany({
        data: scholarships.map((s) => ({ ...s, isSample: true, needsReview: true })),
      }),
  );
}

async function seedSampleColleges() {
  const branchIds = new Map<string, string>();
  for (const { offset: _offset, ...b } of branches) {
    const row = await prisma.branch.upsert({ where: { code: b.code }, update: {}, create: b });
    branchIds.set(b.code, row.id);
  }

  // Cascades to CollegeBranch → CutoffHistory / ChoiceListItem.
  await prisma.college.deleteMany({ where: { isSample: true } });

  let cutoffRows = 0;
  for (const college of colleges) {
    const { top: _top, ...data } = college;
    const created = await prisma.college.create({
      data: {
        ...data,
        isSample: true,
        branches: {
          create: branches.map((b) => ({ branchId: branchIds.get(b.code)!, intake: 60 })),
        },
      },
      include: { branches: { include: { branch: true } } },
    });

    const rows: Prisma.CutoffHistoryCreateManyInput[] = [];
    for (const cb of created.branches) {
      const offset = branches.find((b) => b.code === cb.branch.code)!.offset;
      for (const year of sampleYears) {
        for (const community of communities) {
          rows.push({
            collegeBranchId: cb.id,
            year,
            round: 1,
            community,
            closingCutoff: sampleCutoff(college, cb.branch.code, offset, community, year),
            isSample: true,
          });
        }
      }
    }
    await prisma.cutoffHistory.createMany({ data: rows });
    cutoffRows += rows.length;
  }
  console.log(`  ✓ ${colleges.length} sample colleges, ${cutoffRows} sample cutoff rows`);
}

async function main() {
  console.log('Seeding Agamathi database…');
  await seedAdmin();
  await seedSettings();
  await seedContent();
  await seedCareers();
  await seedQuiz();
  await seedSlots();
  await seedSampleColleges();
  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
