# Agamathikalvi — Rebuild Plan

Status: **draft, awaiting approval before Phase 1.**

---

## 1. What I found

### 1.1 Old site (agamathikalvi.com) — content to carry over

**Brand**

- Name: Agamathikalvi / Agamathi Educational Consultancy. Tagline: "Tamilnadu's No.1 Educational Helpline".
- Logo: a yellow mark with black "AGAMATHI / EDUCATIONAL CONSULTANCY" lettering (`Agamathi_logo-01k3h.png`, 180×34). There is also a light version (`logoo-light.png`, 221×41). Both are small PNGs, so we need an SVG or larger version of the logo (see open questions).
- The old site is a static Bootstrap template, © 2021. Login points to `dashboard.agamathikalvi.com`.

**Home**

- Hero: "CHOOSE YOUR DREAM WITH US." / "We help you to spread your wings by designing a perfect career path."
- How it works, "Admission in 3 simple steps": 01 awareness session by industry and education experts → 02 1-to-1 counselling with student and parents → 03 Admissions and onboarding. Intro paragraph covers 200+ career choices, 100+ scholarships, 100+ job options, and says all data comes from the R&D team.
- Programs: Career Tuner 2.0, Students Level Entrepreneur, Abroad Studies, For Class 11 & 12. The old site has no Class 10 page; the "Abroad Studies" card text actually talks about options after Class 10.
- Why Agamathi: Career Guidance · Find the best college & admission · Identify Talents.
- Latest Technology: Gaze Stars with James (PDF), Neuralink's New Tech (PDF titled "Elon Musk.pdf"), The Human 2.0 (AI), Future of food processing, The World of Tomorrow. The last three say "Coming soon".
- "Trusted by over 150+ colleges": 7 logos in `assets/img/colleges/`.
- Testimonials: 7 real quotes (Subithra – Erode, Harshini – Salem, Bharath Srinivasan – Kotagiri, Chidambaram – Trichy, S. Rahul – Trichy, Sujini – Ooty, Krishna – Ooty), each with an avatar. I'll copy them word for word and fix only obvious typos ("addmission", "carrier").
- App coming soon (App Store / Google Play), Invite-us-to-your-school form.

**About**

- 10+ years of experience · ~1 lakh students guided · 300+ school programs · 21 of 38 districts covered.
- "What we do" paragraph, plus a founder's message from **Yuvaraj** (Founder & MD, working with students since 2012). Goals: create 100+ leaders and reach 1,000+ schools.
- Team: Sabari Raja (CFO), Panneer (CTO), Karthick (Mentor), Boobalan (Chief Consultant), and Mayakannan, Ajith, Krishna (Consultants). All have photos.

**Media**

- Themes: #Team_up, "Listen, Learn and Deliver", "Success and Happiness", "Our Recent Clicks", "Any doubts or plans?". About 14 event photos in `assets/img/media/1–5/`.
- A lot of this page is still lorem-ipsum placeholder text. I'll drop that text.

**Career Tuner 2.0** — YouTube channel `UCowIzeqP1biqg7AwNjnhJaA` and a local `career-tuner-2.0.mp4`.

**Students Level Entrepreneur** — "StudentPreneur 2.0": gigs and part-time jobs, "Knowledge + Income", "Learn, Earn and Give", plus communication and sales training.

**Contact**

- Address: No. 25/1, 2nd Floor, Vinayagar Koil Street, Salem, Tamil Nadu.
- Phone: +91 97892 88421, +91 95973 05959.
- Email: helpdesk@agamathikalvi.com, support@agamathikalvi.com.
- Social: facebook.com/agamathikalvi · instagram.com/agamathi_educationals · YouTube channel above.

**Content gaps:** there is no FAQ, no blog article text, no Abroad Studies page and no Class 10 page. I'll write first-draft copy for these and mark it **DRAFT** so you can review it in the admin panel.

### 1.2 Reference site (nextblock-dun.vercel.app) — design direction only

The site is a client-rendered React SPA built with Tailwind, Three.js, Framer Motion and Lucide. I studied its bundle, CSS and visible strings.

- **Look:** light slate page (`#F8FAFC`) with deep-navy sections (`#020617`, `#0f172a`, `#172554`). Accent gradients go blue → indigo → cyan, with emerald for "safe" states. Glassmorphism uses backdrop blur, and there are very large blurred colour blobs (120–160px blur).
- **Type:** Plus Jakarta Sans for headings, Inter for body text. Headings are big, uppercase and two-line (e.g. "THE RIGHT BLOCK." / "ONE BLOCK AT A TIME.").
- **Section order:** navbar with a mega-list → hero with an interactive 3D scene ("drag to rotate", floating info labels) and two CTAs → live search bar with "Popular" chips → trust stats (450+ colleges, 12,500+ students…) → 6-step framework (Discover → Achieve) → mid-page cutoff CTA band → featured colleges → placements leaderboard → CTA band → explore by district (38 districts) → **cutoff simulator** (marks → /200 → Dream / Target / Safe) → college directory with filters and compare (up to 4) → careers blueprint → "why us" six pillars → services → **branch quiz** (4-step diagnostic) → glowing "journey path" roadmap → success stories with stats → **for parents** section with helpline → scholarships and a **fee-concession estimator** → knowledge base / blog → FAQ → big closing CTA → footer with regional hub links and a newsletter signup.
- **Conversion devices:** a CTA after almost every section, a **3-step booking modal** (details → cutoff and targets → slot and mode) that ends with a pre-filled WhatsApp message, toasts, and a saved colleges / shortlist feature.

**What I'll borrow:** the structure, the dark/light section rhythm, the bold two-line headings, tool cards near the top, frequent CTAs, the multi-step booking flow with WhatsApp handoff, Dream / Target / Safe grouping and the parents section.

**What I won't use:** its code, text, names, numbers or brand.

### 1.3 Design direction for Agamathikalvi

| Token                | Value                                                                    | Use                                           |
| -------------------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| `--brand`            | Agamathi yellow ≈ `#FFC20E` (exact value taken from the logo in Phase 2) | CTAs, highlights, glow                        |
| `--ink`              | `#0B0B0F` / navy `#0B1530`                                               | dark sections, text                           |
| `--accent`           | warm orange `#FF7A1A`                                                    | gradients with yellow                         |
| `--sky`              | `#3B82F6`                                                                | info, links, the predictor's "moderate" group |
| `--safe` / `--dream` | emerald / rose                                                           | predictor groups                              |

- Yellow on black gives a warm, youthful feel that is clearly different from NextBlock's blue.
- Light and dark mode both come from the same tokens.
- Fonts: Plus Jakarta Sans for headings, Inter for body, Noto Sans Tamil for Tamil text. Fonts are self-hosted with `font-display: swap`.

---

## 2. Page map

```
/                         Home
/about                    About Us (story, mission, vision, founder, team, milestones)
/careers                  Career Guidance hub (filter by stream / class, search)
/careers/:slug            Career detail
/programs/career-tuner    Career Tuner 2.0
/programs/studentpreneur  Students Level Entrepreneur
/programs/abroad          Abroad Studies (+ 3D globe)
/programs/class-11-12     For Class 11 & 12
/programs/class-10        For Class 10 (stream selection)
/tools                    Tools hub
/tools/cutoff-calculator  TNEA cutoff calculator
/tools/college-predictor  College predictor (+ 3D TN map on results)
/tools/choice-list        Choice list builder (save requires login)
/tools/career-quiz        Career interest quiz
/tools/scholarships       Scholarship finder
/media                    Gallery (photos + YouTube, filter by year / type)
/blog, /blog/:slug        Latest Technology / Blog
/contact                  Contact
/login, /signup           Auth
/dashboard/*              Student: profile, saved results, choice lists, bookings, resources
/admin/*                  Admin / counsellor: dashboard, leads, slots, bookings, CMS, users
/privacy, /terms, /disclaimer
```

The booking modal (3 steps → WhatsApp) can be opened from every CTA.

---

## 3. Database schema (Prisma, PostgreSQL)

**Enums:** `Role(student, counsellor, admin)`, `LeadType(school_invite, contact, counselling)`, `LeadStatus(new, contacted, converted, closed)`, `BookingStatus(pending, confirmed, completed, cancelled)`, `BookingMode(phone, video, office)`, `Community(OC, BC, BCM, MBC, SC, SCA, ST)`, `StreamKind(science, commerce, arts, vocational)`, `ClassLevel(class10, class11, class12)`, `CollegeType(government, aided, autonomous, self_financing, deemed)`, `MediaType(photo, video, press)`, `ContentStatus(draft, published)`.

| Model                       | Key fields                                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User                        | id, email (unique), passwordHash, name, phone, role, createdAt / updatedAt                                                                                    |
| StudentProfile              | userId (1:1), classLevel, school, district, community, marks (JSON), interests[]                                                                              |
| Lead                        | type, status, name, phone, email?, schoolName?, classLevel?, district?, message?, preferredTime?, notes, assignedToId → User; index (type, status, createdAt) |
| CounsellingSlot             | startsAt, endsAt, mode, capacity, counsellorId                                                                                                                |
| Booking                     | slotId, userId?, leadId?, status, cutoff?, notes                                                                                                              |
| Stream                      | name, kind, slug                                                                                                                                              |
| Career                      | slug, title, titleTa, streamId, afterClass, overview, eligibility, exams[], salaryMin / Max, scope, status                                                    |
| Scholarship                 | name, provider, classLevels[], communities[], incomeMax?, gender?, streams[], amount, link, deadline?                                                         |
| College                     | tneaCode (unique), name, district, type, website, logoUrl; index (district)                                                                                   |
| Branch                      | code, name                                                                                                                                                    |
| CollegeBranch               | collegeId + branchId (unique), intake                                                                                                                         |
| CutoffHistory               | collegeBranchId, year, round, community, closingCutoff, closingRank?, isSample; index (community, year, closingCutoff)                                        |
| ChoiceList / ChoiceListItem | userId, name / listId, collegeBranchId, position                                                                                                              |
| QuizQuestion / QuizResult   | text, textTa, options (JSON → cluster weights), order / userId?, answers, topClusters                                                                         |
| BlogCategory / BlogPost     | slug, name / slug, title, excerpt, body (rich JSON), coverUrl, pdfUrl?, readingMins, publishedAt, status                                                      |
| Testimonial                 | name, town, quote, quoteTa?, avatarUrl, order, published                                                                                                      |
| TeamMember                  | name, role, bio, photoUrl, order                                                                                                                              |
| MediaItem                   | type, title, url / youtubeId, year, event?, order                                                                                                             |
| PartnerLogo                 | name, logoUrl, order                                                                                                                                          |
| Faq                         | question, questionTa, answer, answerTa, order                                                                                                                 |
| SiteSetting                 | key (unique), value (JSON) for stats, contact details, socials and WhatsApp number                                                                            |

Every model gets `createdAt` and `updatedAt`. `seed.ts` loads all of the old site's content above, plus about 40 sample colleges with 3 years of sample cutoffs per community. Sample rows are flagged `isSample = true` and shown in the UI with a "Sample data" badge.

---

## 4. Build phases

| #   | Phase                                                    | Output you can see                                                                                                                                                                                                                                                                                                                            |
| --- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Setup**                                                | Monorepo (`client/`, `server/`, npm workspaces), Vite + React + TS, Express + TS, PostgreSQL on Neon, Prisma schema + migration + seed, `.env.example`, README, ESLint + Prettier. `npm run dev` starts both apps; `/api/health` and seeded data respond.                                                                                     |
| 2   | **Design system + layout**                               | Tokens, shadcn/ui setup, fonts, navbar (with EN / தமிழ் toggle and dark mode), footer, WhatsApp button, mobile booking button, page transitions.                                                                                                                                                                                              |
| 3   | **Home page**                                            | All 15 sections wired to the API (testimonials, stats, blog, logos, FAQ from the DB; invite form saves a Lead).                                                                                                                                                                                                                               |
| 3b  | **3D and motion pass**                                   | R3F hero (cap, book, globe, particles, bloom, mouse and gyro tilt, scroll camera), GSAP "how it works" path, tilt and flip cards, testimonial ring, logo marquee, magnetic buttons, cursor glow, loader, confetti. All of it lazy-loaded with a static fallback, a reduced-motion check and adaptive DPR. Tested at 360px with throttled CPU. |
| 4   | **Content pages**                                        | About, careers hub + detail, 5 program pages (with globe), Media, Blog, Contact.                                                                                                                                                                                                                                                              |
| 5   | **Tools**                                                | Cutoff calculator, college predictor (+ 3D TN map), choice list builder (drag to reorder, PDF), career quiz, scholarship finder.                                                                                                                                                                                                              |
| 6   | **Auth + dashboard**                                     | JWT in httpOnly cookies, roles, signup / login, profile, saved results, 3-step booking against real slots. Phone OTP is left as an interface for later.                                                                                                                                                                                       |
| 7   | **Admin panel**                                          | Lead dashboard and pipeline, CSV export, slots and bookings, CRUD for all content, CSV cutoff import, user and role management.                                                                                                                                                                                                               |
| 8   | **SEO, performance, accessibility, tests, deploy guide** | Meta, OG and JSON-LD, sitemap and robots, GA4, Lighthouse pass, Vitest + Supertest tests, deploy guide for Vercel (client) and Render / Railway (API + Postgres).                                                                                                                                                                             |

After each phase I'll run type-check, lint and the app, then send you a short summary with how to view the result.

---

## 5. Open questions / things I need from you

1. **Logo:** do you have an SVG or high-resolution version? The site PNGs are only 180px wide. This also affects the 3D loader animation.
2. **Address:** the contact page gives pincode **603001**, which is a Chengalpattu code, not Salem (Salem codes are 636xxx). What is the correct address and pincode?
3. **WhatsApp number:** should it be +91 97892 88421 or +91 95973 05959?
4. **Stats:** the old site uses several sets of numbers: 200+ / 100+ / 100+ / 150+ on Home and 10+ years / 1 lakh students / 300+ schools / 21 districts on About. Should Home show both sets? They will be editable in admin either way.
5. **Tamil copy:** I'll draft Tamil translations myself. Will someone fluent review them before launch?
6. **3D assets:** I'll build the cap, book and globe from code and low-poly primitives, so there's no cost and they stay light. Do you want commissioned or Spline models instead?
7. **Old dashboard users:** do existing accounts at `dashboard.agamathikalvi.com` need to be migrated, or do we start fresh?
8. **Scope note:** the 3D list in the brief is long. To protect performance on mid-range Android phones, I'll run 3D only in the hero, the globe and the TN map on phones. Tilt and flip cards and the testimonial ring will use cheap CSS 3D instead of WebGL.
