// SAMPLE DATA ONLY. College names are real; every cutoff below is generated for development
// and is NOT official TNEA data. Rows are flagged `isSample` and the UI labels them.
// Replace via the admin CSV import before launch.
import type { CollegeType, Community } from '@prisma/client';

export const branches = [
  {
    code: 'CS',
    name: 'Computer Science and Engineering',
    nameTa: 'கணினி அறிவியல் பொறியியல்',
    offset: 0,
  },
  {
    code: 'AD',
    name: 'Artificial Intelligence and Data Science',
    nameTa: 'செயற்கை நுண்ணறிவு & தரவு அறிவியல்',
    offset: 0.6,
  },
  { code: 'IT', name: 'Information Technology', nameTa: 'தகவல் தொழில்நுட்பம்', offset: 1 },
  {
    code: 'EC',
    name: 'Electronics and Communication Engineering',
    nameTa: 'மின்னணு & தொடர்பு பொறியியல்',
    offset: 1.4,
  },
  {
    code: 'EE',
    name: 'Electrical and Electronics Engineering',
    nameTa: 'மின் & மின்னணு பொறியியல்',
    offset: 4,
  },
  { code: 'ME', name: 'Mechanical Engineering', nameTa: 'இயந்திரவியல் பொறியியல்', offset: 6 },
  { code: 'CE', name: 'Civil Engineering', nameTa: 'கட்டிடவியல் பொறியியல்', offset: 9 },
];

// Closing-cutoff gap below OC for each community (scaled per college tier).
const communityGap: Record<Community, number> = {
  OC: 0,
  BC: 1,
  BCM: 2,
  MBC: 2.5,
  SC: 7,
  SCA: 11,
  ST: 14,
};

export const sampleYears = [2023, 2024, 2025];

type SampleCollege = {
  name: string;
  shortName: string;
  district: string;
  type: CollegeType;
  /** Approx. OC closing cutoff for CSE — drives every other generated number */
  top: number;
};

export const colleges: SampleCollege[] = [
  {
    name: 'College of Engineering, Guindy',
    shortName: 'CEG',
    district: 'Chennai',
    type: 'government',
    top: 199.5,
  },
  {
    name: 'Madras Institute of Technology',
    shortName: 'MIT',
    district: 'Chengalpattu',
    type: 'government',
    top: 198.5,
  },
  {
    name: 'Alagappa College of Technology',
    shortName: 'ACT',
    district: 'Chennai',
    type: 'government',
    top: 196,
  },
  {
    name: 'PSG College of Technology',
    shortName: 'PSG Tech',
    district: 'Coimbatore',
    type: 'aided',
    top: 199,
  },
  {
    name: 'Coimbatore Institute of Technology',
    shortName: 'CIT',
    district: 'Coimbatore',
    type: 'aided',
    top: 198.5,
  },
  {
    name: 'Government College of Technology, Coimbatore',
    shortName: 'GCT',
    district: 'Coimbatore',
    type: 'government',
    top: 197.5,
  },
  {
    name: 'Thiagarajar College of Engineering',
    shortName: 'TCE',
    district: 'Madurai',
    type: 'aided',
    top: 197,
  },
  {
    name: 'Sri Sivasubramaniya Nadar College of Engineering',
    shortName: 'SSN',
    district: 'Chengalpattu',
    type: 'autonomous',
    top: 198.5,
  },
  {
    name: 'Kumaraguru College of Technology',
    shortName: 'KCT',
    district: 'Coimbatore',
    type: 'autonomous',
    top: 196,
  },
  {
    name: 'Sri Krishna College of Engineering and Technology',
    shortName: 'SKCET',
    district: 'Coimbatore',
    type: 'autonomous',
    top: 194,
  },
  {
    name: 'Kongu Engineering College',
    shortName: 'KEC',
    district: 'Erode',
    type: 'autonomous',
    top: 194,
  },
  {
    name: 'Bannari Amman Institute of Technology',
    shortName: 'BIT',
    district: 'Erode',
    type: 'autonomous',
    top: 194.5,
  },
  {
    name: 'Government College of Engineering, Erode',
    shortName: 'GCE Erode',
    district: 'Erode',
    type: 'government',
    top: 190,
  },
  {
    name: 'Rajalakshmi Engineering College',
    shortName: 'REC',
    district: 'Kancheepuram',
    type: 'autonomous',
    top: 194,
  },
  {
    name: 'Sri Venkateswara College of Engineering',
    shortName: 'SVCE',
    district: 'Kancheepuram',
    type: 'autonomous',
    top: 194,
  },
  {
    name: 'Government College of Engineering, Salem',
    shortName: 'GCE Salem',
    district: 'Salem',
    type: 'government',
    top: 195,
  },
  {
    name: 'Sona College of Technology',
    shortName: 'Sona',
    district: 'Salem',
    type: 'autonomous',
    top: 188,
  },
  {
    name: 'K.S. Rangasamy College of Technology',
    shortName: 'KSRCT',
    district: 'Namakkal',
    type: 'autonomous',
    top: 184,
  },
  {
    name: 'M. Kumarasamy College of Engineering',
    shortName: 'MKCE',
    district: 'Karur',
    type: 'autonomous',
    top: 182,
  },
  {
    name: 'Mepco Schlenk Engineering College',
    shortName: 'Mepco',
    district: 'Virudhunagar',
    type: 'autonomous',
    top: 192,
  },
  {
    name: 'Kamaraj College of Engineering and Technology',
    shortName: 'KCET',
    district: 'Virudhunagar',
    type: 'autonomous',
    top: 180,
  },
  {
    name: 'Sethu Institute of Technology',
    shortName: 'SIT',
    district: 'Virudhunagar',
    type: 'autonomous',
    top: 172,
  },
  {
    name: 'National Engineering College',
    shortName: 'NEC',
    district: 'Thoothukudi',
    type: 'autonomous',
    top: 186,
  },
  {
    name: 'Government College of Engineering, Tirunelveli',
    shortName: 'GCE Tirunelveli',
    district: 'Tirunelveli',
    type: 'government',
    top: 191,
  },
  {
    name: 'Francis Xavier Engineering College',
    shortName: 'FXEC',
    district: 'Tirunelveli',
    type: 'autonomous',
    top: 176,
  },
  {
    name: "St. Xavier's Catholic College of Engineering",
    shortName: 'SXCCE',
    district: 'Kanniyakumari',
    type: 'autonomous',
    top: 178,
  },
  {
    name: 'Saranathan College of Engineering',
    shortName: 'SCE',
    district: 'Tiruchirappalli',
    type: 'self_financing',
    top: 185,
  },
  {
    name: 'K. Ramakrishnan College of Engineering',
    shortName: 'KRCE',
    district: 'Tiruchirappalli',
    type: 'autonomous',
    top: 178,
  },
  {
    name: 'Velammal Engineering College',
    shortName: 'VEC',
    district: 'Chennai',
    type: 'autonomous',
    top: 187,
  },
  {
    name: "St. Joseph's College of Engineering",
    shortName: 'SJCE',
    district: 'Chennai',
    type: 'autonomous',
    top: 192,
  },
  {
    name: 'Panimalar Engineering College',
    shortName: 'PEC',
    district: 'Tiruvallur',
    type: 'autonomous',
    top: 189,
  },
  {
    name: 'Sri Sairam Engineering College',
    shortName: 'Sairam',
    district: 'Chengalpattu',
    type: 'autonomous',
    top: 190,
  },
  {
    name: 'Government College of Engineering, Bargur',
    shortName: 'GCE Bargur',
    district: 'Krishnagiri',
    type: 'government',
    top: 186,
  },
  {
    name: 'Adhiyamaan College of Engineering',
    shortName: 'ACE',
    district: 'Krishnagiri',
    type: 'autonomous',
    top: 172,
  },
  {
    name: 'Thanthai Periyar Government Institute of Technology',
    shortName: 'TPGIT',
    district: 'Vellore',
    type: 'government',
    top: 187,
  },
  {
    name: 'Government College of Engineering, Thanjavur',
    shortName: 'GCE Thanjavur',
    district: 'Thanjavur',
    type: 'government',
    top: 184,
  },
  {
    name: 'PSNA College of Engineering and Technology',
    shortName: 'PSNA',
    district: 'Dindigul',
    type: 'autonomous',
    top: 180,
  },
  {
    name: 'Dr. Mahalingam College of Engineering and Technology',
    shortName: 'MCET',
    district: 'Coimbatore',
    type: 'autonomous',
    top: 184,
  },
  {
    name: 'CSI College of Engineering',
    shortName: 'CSICE',
    district: 'Nilgiris',
    type: 'self_financing',
    top: 150,
  },
  {
    name: 'E.G.S. Pillay Engineering College',
    shortName: 'EGSPEC',
    district: 'Nagapattinam',
    type: 'autonomous',
    top: 165,
  },
  {
    name: 'IFET College of Engineering',
    shortName: 'IFET',
    district: 'Villupuram',
    type: 'autonomous',
    top: 160,
  },
  {
    name: 'Anjalai Ammal Mahalingam Engineering College',
    shortName: 'AAMEC',
    district: 'Tiruvarur',
    type: 'self_financing',
    top: 150,
  },
];

/** Deterministic pseudo-random in [-1, 1] so re-seeding gives identical numbers. */
function jitter(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return ((h >>> 0) % 2001) / 1000 - 1;
}

const roundHalf = (n: number) => Math.round(n * 2) / 2;

export function sampleCutoff(
  college: SampleCollege,
  branchCode: string,
  branchOffset: number,
  community: Community,
  year: number,
): number {
  // Lower-tier colleges have wider spreads between branches and communities.
  const spread = 1 + (200 - college.top) / 25;
  const yearDrift =
    (year - 2024) * 0.4 + jitter(`${college.shortName}|${branchCode}|${year}`) * 0.8;
  const value = college.top - branchOffset * spread - communityGap[community] * spread + yearDrift;
  return Math.min(200, Math.max(77.5, roundHalf(value)));
}
