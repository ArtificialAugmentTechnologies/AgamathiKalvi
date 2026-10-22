// First-draft career and scholarship content written for the rebuild.
// Everything here is `needsReview: true` — Agamathi's R&D team should verify before launch.
import type { CareerEntry, ClassLevel, Community, Gender, StreamKind } from '@prisma/client';

export const streams: { slug: string; name: string; nameTa: string; kind: StreamKind }[] = [
  { slug: 'science', name: 'Science', nameTa: 'அறிவியல்', kind: 'science' },
  { slug: 'commerce', name: 'Commerce', nameTa: 'வணிகவியல்', kind: 'commerce' },
  { slug: 'arts', name: 'Arts & Humanities', nameTa: 'கலை & மனிதவியல்', kind: 'arts' },
  {
    slug: 'vocational',
    name: 'Vocational & Diploma',
    nameTa: 'தொழிற்கல்வி & டிப்ளமோ',
    kind: 'vocational',
  },
];

type CareerSeed = {
  slug: string;
  title: string;
  titleTa: string;
  stream: string;
  entry: CareerEntry;
  cluster: string;
  summary: string;
  overview: string;
  eligibility: string;
  exams: string[];
  topColleges: string[];
  salaryMin: number;
  salaryMax: number;
  futureScope: string;
};

export const careers: CareerSeed[] = [
  {
    slug: 'computer-science-engineering',
    title: 'Computer Science Engineering',
    titleTa: 'கணினி அறிவியல் பொறியியல்',
    stream: 'science',
    entry: 'after12',
    cluster: 'technology',
    summary: 'Design software, apps, AI systems and the networks that run the modern world.',
    overview:
      'A 4-year B.E./B.Tech programme covering programming, data structures, databases, operating systems, networks and artificial intelligence.',
    eligibility: 'Class 12 with Physics, Chemistry and Mathematics.',
    exams: ['TNEA (marks based)', 'JEE Main', 'JEE Advanced'],
    topColleges: [
      'College of Engineering, Guindy',
      'PSG College of Technology',
      'SSN College of Engineering',
    ],
    salaryMin: 350000,
    salaryMax: 2500000,
    futureScope:
      'Strong demand in AI, cloud, cybersecurity and product companies across India and abroad.',
  },
  {
    slug: 'mbbs-doctor',
    title: 'Medicine (MBBS)',
    titleTa: 'மருத்துவம் (MBBS)',
    stream: 'science',
    entry: 'after12',
    cluster: 'healthcare',
    summary: 'Diagnose and treat patients — one of the most respected careers in India.',
    overview:
      'A 5.5-year programme (including a 1-year internship) covering anatomy, physiology, pathology, pharmacology, medicine and surgery.',
    eligibility: 'Class 12 with Physics, Chemistry and Biology; qualify NEET UG.',
    exams: ['NEET UG'],
    topColleges: [
      'Madras Medical College',
      'Stanley Medical College',
      'Coimbatore Medical College',
    ],
    salaryMin: 600000,
    salaryMax: 3000000,
    futureScope:
      'Specialisation (MD/MS) opens high-demand roles in hospitals, research and public health.',
  },
  {
    slug: 'nursing',
    title: 'Nursing (B.Sc)',
    titleTa: 'செவிலியர் (B.Sc)',
    stream: 'science',
    entry: 'after12',
    cluster: 'healthcare',
    summary: 'Care for patients in hospitals and communities, in India and abroad.',
    overview:
      'A 4-year programme in medical-surgical, community, paediatric and mental-health nursing.',
    eligibility: 'Class 12 with Physics, Chemistry and Biology.',
    exams: ['NEET UG (for some institutions)', 'State counselling'],
    topColleges: ['College of Nursing, Madras Medical College', 'CMC Vellore College of Nursing'],
    salaryMin: 250000,
    salaryMax: 1200000,
    futureScope: 'Very high global demand, especially in the UK, Gulf countries and Australia.',
  },
  {
    slug: 'agriculture',
    title: 'Agriculture (B.Sc)',
    titleTa: 'வேளாண்மை (B.Sc)',
    stream: 'science',
    entry: 'after12',
    cluster: 'agriculture',
    summary: 'Use science and technology to grow more food sustainably.',
    overview:
      'A 4-year programme in agronomy, soil science, plant breeding, horticulture and agri-business.',
    eligibility: 'Class 12 with Physics, Chemistry and Biology or Mathematics.',
    exams: ['TNAU admission (marks based)', 'ICAR AIEEA'],
    topColleges: ['Tamil Nadu Agricultural University, Coimbatore'],
    salaryMin: 300000,
    salaryMax: 1200000,
    futureScope: 'Govt jobs, agri-tech start-ups, food processing and research.',
  },
  {
    slug: 'chartered-accountant',
    title: 'Chartered Accountant (CA)',
    titleTa: 'பட்டயக் கணக்காளர் (CA)',
    stream: 'commerce',
    entry: 'after12',
    cluster: 'finance',
    summary: 'Become an expert in accounts, audit and tax for companies.',
    overview:
      'A professional course by ICAI with Foundation, Intermediate and Final levels plus articleship.',
    eligibility: 'Class 12 (any stream; commerce preferred) to register for CA Foundation.',
    exams: ['CA Foundation', 'CA Intermediate', 'CA Final'],
    topColleges: ['ICAI (self-study + coaching)'],
    salaryMin: 700000,
    salaryMax: 3000000,
    futureScope: 'Audit firms, corporate finance, taxation and own practice.',
  },
  {
    slug: 'law',
    title: 'Law (5-year integrated)',
    titleTa: 'சட்டம் (5 ஆண்டு ஒருங்கிணைந்த)',
    stream: 'arts',
    entry: 'after12',
    cluster: 'law-public',
    summary: 'Argue cases, advise companies or serve as a judge.',
    overview: 'A 5-year integrated BA LLB / BBA LLB programme.',
    eligibility: 'Class 12 in any stream.',
    exams: ['CLAT', 'TNDALU admission'],
    topColleges: ['School of Excellence in Law (TNDALU)', 'Government Law Colleges, Tamil Nadu'],
    salaryMin: 300000,
    salaryMax: 2000000,
    futureScope: 'Corporate law firms, litigation, judiciary and policy roles.',
  },
  {
    slug: 'journalism-media',
    title: 'Journalism & Mass Media',
    titleTa: 'இதழியல் & ஊடகம்',
    stream: 'arts',
    entry: 'after12',
    cluster: 'creative',
    summary: 'Tell stories that matter — on TV, digital media and print.',
    overview: 'A 3-year degree in reporting, editing, video production and digital media.',
    eligibility: 'Class 12 in any stream.',
    exams: ['College-level admission', 'CUET UG (central universities)'],
    topColleges: ['Madras Christian College', 'Loyola College, Chennai'],
    salaryMin: 250000,
    salaryMax: 1200000,
    futureScope: 'News, content creation, PR and digital marketing.',
  },
  {
    slug: 'design',
    title: 'Design (Fashion / Product / UX)',
    titleTa: 'வடிவமைப்பு',
    stream: 'arts',
    entry: 'after12',
    cluster: 'creative',
    summary: 'Create products, clothes and digital experiences people love.',
    overview: 'A 4-year B.Des programme in fashion, product, communication or interaction design.',
    eligibility: 'Class 12 in any stream.',
    exams: ['NID DAT', 'NIFT entrance', 'UCEED'],
    topColleges: ['NIFT Chennai', 'NID (Ahmedabad / Bengaluru)'],
    salaryMin: 350000,
    salaryMax: 2000000,
    futureScope: 'UX design is one of the fastest-growing careers in tech.',
  },
  {
    slug: 'hotel-management',
    title: 'Hotel Management',
    titleTa: 'விடுதி மேலாண்மை',
    stream: 'vocational',
    entry: 'after12',
    cluster: 'hospitality',
    summary: 'Run hotels, resorts, cruise lines and restaurants.',
    overview:
      'A 3–4 year programme in food production, front office, housekeeping and hospitality management.',
    eligibility: 'Class 12 in any stream.',
    exams: ['NCHM JEE'],
    topColleges: ['IHM Chennai'],
    salaryMin: 250000,
    salaryMax: 1000000,
    futureScope: 'Hotels, airlines, cruise ships and own food business — in India and abroad.',
  },
  {
    slug: 'polytechnic-diploma',
    title: 'Polytechnic Diploma',
    titleTa: 'பாலிடெக்னிக் டிப்ளமோ',
    stream: 'vocational',
    entry: 'after10',
    cluster: 'technology',
    summary: 'Start engineering right after Class 10 with a practical 3-year diploma.',
    overview:
      'A 3-year diploma in mechanical, electrical, civil, computer or electronics engineering, with lateral entry into 2nd-year B.E.',
    eligibility: 'Class 10 pass.',
    exams: ['DOTE polytechnic admission (marks based)'],
    topColleges: ['Central Polytechnic College, Chennai', 'PSG Polytechnic College, Coimbatore'],
    salaryMin: 180000,
    salaryMax: 600000,
    futureScope: 'Early jobs in industry, or lateral entry into B.E. for higher roles.',
  },
];

type ScholarshipSeed = {
  slug: string;
  name: string;
  provider: string;
  description: string;
  amount: string;
  classLevels: ClassLevel[];
  communities: Community[];
  incomeMax: number | null;
  gender: Gender;
  streams: StreamKind[];
  link: string | null;
};

// SAMPLE — amounts and limits change often; verify each against the official source.
export const scholarships: ScholarshipSeed[] = [
  {
    slug: 'post-matric-sc-st',
    name: 'Post-Matric Scholarship (SC / SCA / ST)',
    provider: 'Adi Dravidar & Tribal Welfare Dept., Govt. of Tamil Nadu',
    description:
      'Covers tuition and maintenance for SC, SCA and ST students studying after Class 10.',
    amount: 'Tuition fee + maintenance allowance',
    classLevels: ['class11', 'class12'],
    communities: ['SC', 'SCA', 'ST'],
    incomeMax: 250000,
    gender: 'any',
    streams: [],
    link: 'https://tnadtwscholarship.tn.gov.in/',
  },
  {
    slug: 'post-matric-bc-mbc',
    name: 'Post-Matric Scholarship (BC / MBC / DNC)',
    provider: 'BC, MBC & Minorities Welfare Dept., Govt. of Tamil Nadu',
    description: 'Fee and maintenance support for BC, MBC and DNC students after Class 10.',
    amount: 'Tuition fee + maintenance allowance',
    classLevels: ['class11', 'class12'],
    communities: ['BC', 'BCM', 'MBC'],
    incomeMax: 250000,
    gender: 'any',
    streams: [],
    link: null,
  },
  {
    slug: 'first-graduate-concession',
    name: 'First Graduate Tuition Fee Concession',
    provider: 'Govt. of Tamil Nadu',
    description:
      'Tuition fee concession for students who are the first in their family to take up a degree, when admitted through single-window counselling.',
    amount: 'Tuition fee waiver',
    classLevels: ['class12'],
    communities: [],
    incomeMax: null,
    gender: 'any',
    streams: [],
    link: null,
  },
  {
    slug: 'govt-school-7-5-quota',
    name: '7.5% Reservation for Government School Students',
    provider: 'Govt. of Tamil Nadu',
    description:
      'Reserved seats in professional courses for students who studied Class 6–12 in government schools; fees are paid by the government.',
    amount: 'Full tuition, hostel & other fees',
    classLevels: ['class12'],
    communities: [],
    incomeMax: null,
    gender: 'any',
    streams: ['science'],
    link: null,
  },
  {
    slug: 'pudhumai-penn',
    name: 'Pudhumai Penn Scheme',
    provider: 'Govt. of Tamil Nadu',
    description:
      'Monthly support for girls who studied Class 6–12 in government schools and join higher education.',
    amount: '₹1,000 per month',
    classLevels: ['class12'],
    communities: [],
    incomeMax: null,
    gender: 'female',
    streams: [],
    link: 'https://www.pudhumaipenn.tn.gov.in/',
  },
  {
    slug: 'tamil-pudhalvan',
    name: 'Tamil Pudhalvan Scheme',
    provider: 'Govt. of Tamil Nadu',
    description:
      'Monthly support for boys who studied Class 6–12 in government schools and join higher education.',
    amount: '₹1,000 per month',
    classLevels: ['class12'],
    communities: [],
    incomeMax: null,
    gender: 'male',
    streams: [],
    link: null,
  },
  {
    slug: 'central-sector-scholarship',
    name: 'Central Sector Scheme of Scholarship',
    provider: 'Ministry of Education, Govt. of India (NSP)',
    description:
      'For students above the 80th percentile in Class 12 who join a regular degree course.',
    amount: 'Up to ₹20,000 per year',
    classLevels: ['class12'],
    communities: [],
    incomeMax: 450000,
    gender: 'any',
    streams: [],
    link: 'https://scholarships.gov.in/',
  },
  {
    slug: 'nmms',
    name: 'National Means-cum-Merit Scholarship (NMMS)',
    provider: 'Ministry of Education, Govt. of India',
    description:
      'For meritorious students from economically weaker families, selected through an exam in Class 8.',
    amount: '₹12,000 per year (Class 9–12)',
    classLevels: ['class10', 'class11', 'class12'],
    communities: [],
    incomeMax: 350000,
    gender: 'any',
    streams: [],
    link: 'https://scholarships.gov.in/',
  },
];
