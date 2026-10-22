// Content carried over from the old site (agamathikalvi.com, © 2021).
// Items written fresh for the rebuild are flagged `needsReview: true`.

export const siteSettings: Record<string, unknown> = {
  stats_home: [
    {
      key: 'careers',
      value: 200,
      suffix: '+',
      label: 'Career choices',
      labelTa: 'தொழில் வாய்ப்புகள்',
    },
    {
      key: 'scholarships',
      value: 100,
      suffix: '+',
      label: 'Scholarships',
      labelTa: 'உதவித்தொகைகள்',
    },
    { key: 'jobs', value: 100, suffix: '+', label: 'Job options', labelTa: 'வேலை வாய்ப்புகள்' },
    {
      key: 'colleges',
      value: 150,
      suffix: '+',
      label: 'Partner colleges',
      labelTa: 'கூட்டாளர் கல்லூரிகள்',
    },
  ],
  stats_about: [
    {
      key: 'years',
      value: 10,
      suffix: '+',
      label: 'Years of experience',
      labelTa: 'ஆண்டு அனுபவம்',
    },
    {
      key: 'students',
      value: 100000,
      suffix: '+',
      display: '1 Lakh+',
      label: 'Students guided',
      labelTa: 'வழிகாட்டப்பட்ட மாணவர்கள்',
    },
    {
      key: 'schools',
      value: 300,
      suffix: '+',
      label: 'School programs conducted',
      labelTa: 'பள்ளி நிகழ்ச்சிகள்',
    },
    {
      key: 'districts',
      value: 21,
      suffix: '/38',
      label: 'Districts covered',
      labelTa: 'மாவட்டங்கள்',
    },
  ],
  contact: {
    addressLines: ['No. 25/1, 2nd Floor', 'Vinayagar Koil Street', 'Salem, Tamil Nadu'],
    // Old site listed 603001, which is not a Salem pincode — confirm before launch.
    pincode: null,
    phones: ['+91 97892 88421', '+91 95973 05959'],
    emails: ['helpdesk@agamathikalvi.com', 'support@agamathikalvi.com'],
    whatsapp: '919789288421',
    hours: 'Mon – Sat, 9:00 AM – 7:00 PM',
    mapQuery: 'Vinayagar Koil Street, Salem, Tamil Nadu',
  },
  socials: {
    facebook: 'https://www.facebook.com/agamathikalvi/',
    instagram: 'https://www.instagram.com/agamathi_educationals/',
    youtube: 'https://www.youtube.com/channel/UCowIzeqP1biqg7AwNjnhJaA/videos',
  },
  youtube: { channelId: 'UCowIzeqP1biqg7AwNjnhJaA' },
};

export const testimonials = [
  {
    name: 'S. Subithra',
    town: 'Erode',
    avatarUrl: '/images/testimonials/subithra.webp',
    quote:
      'I was in a confusion what to pursue after my schooling, at that time you guys showed me clear path in choosing my career which is technologically developing and scopeful.',
  },
  {
    name: 'Harshini',
    town: 'Salem',
    avatarUrl: '/images/testimonials/harshini.webp',
    quote:
      'I really got worthful guidance & mentor, I received help from you at correct time, it worths a lot. Thank you so much. I would like to suggest all to trust and go for it.',
  },
  {
    name: 'Bharath Srinivasan',
    town: 'Kotagiri',
    avatarUrl: '/images/testimonials/bharath.webp',
    quote:
      'Got the awareness about the latest courses with career options and best guidance. It helped me to achieve the first step in my life.',
  },
  {
    name: 'Chidambaram',
    town: 'Trichy',
    avatarUrl: '/images/testimonials/chidambaram.webp',
    quote:
      'It is my pleasure meeting you people as my guide! The course you helped me to take is the best step which I have moved in my career!',
  },
  {
    name: 'S. Rahul',
    town: 'Trichy',
    avatarUrl: '/images/testimonials/rahul.webp',
    quote:
      'Agamathi made me choose a perfect path for my life. They helped me in clearing all the confusions that I had and made me confident.',
  },
  {
    name: 'Sujini',
    town: 'Ooty',
    avatarUrl: '/images/testimonials/sujini.webp',
    quote:
      'Got a very good guidance and came to know about the new age courses and their future prospects.',
  },
  {
    name: 'Krishna',
    town: 'Ooty',
    avatarUrl: '/images/testimonials/krishna.webp',
    quote: 'It was very much useful to choose my course. I hope it will be useful to others too.',
  },
];

export const team = [
  {
    name: 'Yuvaraj',
    role: 'Founder & Managing Director',
    roleTa: 'நிறுவனர் & நிர்வாக இயக்குநர்',
    photoUrl: null,
    bio: [
      'Hi all! I am Yuvaraj, the founder and managing director of Agamathi Kalvi — and a sports and body-building enthusiast. I have been helping the student community choose their dream course in elite institutions since 2012. In almost 10 years in the educational field I have guided nearly 1 lakh students. I love interacting with students, so I visit schools and colleges regularly to conduct career guidance sessions and share knowledge about diverse courses, colleges and career options. I love clearing the doubts of students and parents, helping them choose their dream course with 100% confidence.',
      'My long-term goal is to create 100+ leaders who can help students from under-privileged and rural backgrounds by giving them proper guidance to choose their dream — changing their lives forever. My team is planning to reach 1000+ schools in the coming years through school programs, to impact the lives of as many students as possible.',
    ].join('\n\n'),
  },
  { name: 'Sabari Raja', role: 'C.F.O', photoUrl: '/images/team/sabari.webp' },
  { name: 'Panneer', role: 'C.T.O', photoUrl: '/images/team/panner.webp' },
  { name: 'Karthick', role: 'Mentor', photoUrl: '/images/team/t1.webp' },
  { name: 'Boobalan', role: 'Chief Consultant', photoUrl: '/images/team/bhoopalan.webp' },
  { name: 'Mayakannan', role: 'Consultant', photoUrl: '/images/team/mayakannan.webp' },
  { name: 'Ajith', role: 'Consultant', photoUrl: '/images/team/ajith.webp' },
  { name: 'Krishna', role: 'Consultant', photoUrl: '/images/team/krishna-post-1.webp' },
];

// Names read from the logo artwork on the old site.
export const partnerLogos = [
  { n: 1, name: 'K.S. Rangasamy College of Technology' },
  { n: 2, name: 'KIT – Kalaignarkarunanidhi Institute of Technology, Coimbatore' },
  { n: 4, name: 'Study World College of Engineering' },
  { n: 5, name: 'Mahendra Educational Institutions' },
  { n: 6, name: 'Dr. N.G.P. Educational Institutions' },
  { n: 7, name: 'Rathinam Group of Institutions' },
  { n: 8, name: 'KPR Institute of Engineering and Technology' },
].map(({ n, name }) => ({ name, logoUrl: `/images/partners/partner-${n}.webp` }));

// Old media page groups. Years were not on the old site — adjust in admin.
const mediaGroups: { event: string; files: string[] }[] = [
  { event: 'Team up — shaping the future', files: ['1-1', '1-2', '1-3'] },
  { event: 'Listen, Learn and Deliver', files: ['2-1', '2-2', '2-3'] },
  { event: 'Success and Happiness', files: ['3-1_full', '3-2', '3-3'] },
  { event: 'Our recent clicks — school sessions', files: ['4-1', '4-2', '4-3-crop'] },
  { event: 'Knock our doors', files: ['5-1', '5-2'] },
];

export const mediaItems = mediaGroups.flatMap((g) =>
  g.files.map((f, i) => ({
    type: 'photo' as const,
    title: `${g.event} (${i + 1})`,
    url: `/images/media/${f}.webp`,
    year: 2022,
    event: g.event,
  })),
);

export const blogCategory = {
  slug: 'latest-technology',
  name: 'Latest Technology',
  nameTa: 'புதிய தொழில்நுட்பம்',
};

export const blogPosts = [
  {
    slug: 'gaze-stars-with-james',
    title: 'Gaze Stars with James',
    excerpt:
      'The James Webb Space Telescope is showing us the universe as never before — and opening new careers in space science.',
    body: '## Gaze Stars with James\n\nThe James Webb Space Telescope (JWST) is the most powerful space telescope ever built. Download our full research note below to learn how it works and which careers it is creating in astronomy, optics and space engineering.',
    coverUrl: '/images/blog/webb-telescope.webp',
    pdfUrl: '/files/james-webb.pdf',
    readingMins: 4,
    comingSoon: false,
  },
  {
    slug: 'neuralinks-new-tech',
    title: "Neuralink's New Tech",
    excerpt:
      'Brain–computer interfaces are moving from science fiction to clinical trials. What does it mean for future engineers and doctors?',
    body: "## Neuralink's New Tech\n\nNeuralink is developing implantable brain–computer interfaces. Download our full research note below to understand the technology and the biomedical and neuro-engineering careers around it.",
    coverUrl: '/images/blog/neuralink.webp',
    pdfUrl: '/files/neuralink.pdf',
    readingMins: 4,
    comingSoon: false,
  },
  {
    slug: 'the-human-2-0-ai',
    title: 'The Human 2.0 (AI)',
    excerpt: 'How artificial intelligence is reshaping every career — and how to prepare for it.',
    body: '## The Human 2.0 (AI)\n\nComing soon.',
    coverUrl: '/images/blog/artifical-inteliggence.webp',
    readingMins: 5,
    comingSoon: true,
  },
  {
    slug: 'future-of-food-processing',
    title: 'Future of Food Processing',
    excerpt: 'Food technology is one of the fastest-growing fields in India. Here is why.',
    body: '## Future of Food Processing\n\nComing soon.',
    coverUrl: '/images/blog/food-technology.webp',
    readingMins: 5,
    comingSoon: true,
  },
  {
    slug: 'the-world-of-tomorrow',
    title: 'The World of Tomorrow',
    excerpt: 'Virtual reality, the metaverse and the careers that will exist ten years from now.',
    body: '## The World of Tomorrow\n\nComing soon.',
    coverUrl: '/images/blog/virtual-reality.webp',
    readingMins: 5,
    comingSoon: true,
  },
];

// The old site had no FAQ — first drafts, flagged for review.
export const faqs = [
  {
    question: 'Is the first counselling session really free?',
    questionTa: 'முதல் ஆலோசனை அமர்வு உண்மையில் இலவசமா?',
    answer:
      'Yes. Your first 1-to-1 counselling session with an Agamathi expert is free for the student and parents. We listen to your interests and marks and suggest the right courses and colleges.',
    answerTa:
      'ஆம். அகமதி நிபுணருடன் உங்கள் முதல் தனிப்பட்ட ஆலோசனை அமர்வு மாணவருக்கும் பெற்றோருக்கும் இலவசம். உங்கள் விருப்பங்களையும் மதிப்பெண்களையும் கேட்டு, சரியான படிப்புகளையும் கல்லூரிகளையும் பரிந்துரைக்கிறோம்.',
  },
  {
    question: 'Which classes do you guide?',
    questionTa: 'எந்த வகுப்பு மாணவர்களுக்கு வழிகாட்டுகிறீர்கள்?',
    answer:
      'We guide Class 10 students on choosing the right stream, and Class 11 and 12 students on courses, entrance exams, colleges and admissions — including engineering, medicine, arts, science, commerce and studies abroad.',
    answerTa:
      '10ஆம் வகுப்பு மாணவர்களுக்கு சரியான பிரிவைத் தேர்ந்தெடுக்கவும், 11 மற்றும் 12ஆம் வகுப்பு மாணவர்களுக்கு படிப்புகள், நுழைவுத் தேர்வுகள், கல்லூரிகள் மற்றும் சேர்க்கை குறித்தும் வழிகாட்டுகிறோம்.',
  },
  {
    question: 'How is the TNEA cutoff calculated?',
    questionTa: 'TNEA கட்ஆஃப் எவ்வாறு கணக்கிடப்படுகிறது?',
    answer:
      'TNEA cutoff (out of 200) = Mathematics + Physics ÷ 2 + Chemistry ÷ 2, using your Class 12 marks out of 100 in each subject. Try our free cutoff calculator to see yours instantly.',
    answerTa:
      'TNEA கட்ஆஃப் (200க்கு) = கணிதம் + இயற்பியல் ÷ 2 + வேதியியல் ÷ 2. எங்கள் இலவச கட்ஆஃப் கணிப்பானில் உங்கள் மதிப்பெண்ணை உடனே பாருங்கள்.',
  },
  {
    question: 'Do you help with the admission process too?',
    questionTa: 'சேர்க்கை நடைமுறையிலும் உதவுகிறீர்களா?',
    answer:
      'Yes. Once the course and college are finalised, our admission team guides the student through applications, documents and counselling rounds until they are onboarded at their chosen institution.',
    answerTa:
      'ஆம். படிப்பும் கல்லூரியும் முடிவானதும், விண்ணப்பம், ஆவணங்கள் மற்றும் கலந்தாய்வு சுற்றுகள் வழியாக மாணவர் தேர்ந்தெடுத்த கல்வி நிறுவனத்தில் சேரும் வரை எங்கள் சேர்க்கைக் குழு வழிகாட்டுகிறது.',
  },
  {
    question: 'Can you conduct a career guidance session at our school?',
    questionTa: 'எங்கள் பள்ளியில் தொழில் வழிகாட்டுதல் நிகழ்ச்சி நடத்த முடியுமா?',
    answer:
      'Absolutely — we have conducted 300+ school programs across Tamil Nadu. Fill the "Invite us to your school" form and our team will get in touch with you.',
    answerTa:
      'நிச்சயமாக — தமிழ்நாடு முழுவதும் 300க்கும் மேற்பட்ட பள்ளி நிகழ்ச்சிகளை நடத்தியுள்ளோம். "உங்கள் பள்ளிக்கு அழைக்கவும்" படிவத்தை நிரப்புங்கள், எங்கள் குழு உங்களைத் தொடர்பு கொள்ளும்.',
  },
  {
    question: 'Is the college predictor result guaranteed?',
    questionTa: 'கல்லூரி கணிப்பு முடிவு உறுதியானதா?',
    answer:
      'No. The predictor is an estimate based on previous years’ closing cutoffs. Actual cutoffs change every year, so book a counselling session to build a safe, balanced choice list.',
    answerTa:
      'இல்லை. கணிப்பு முந்தைய ஆண்டுகளின் இறுதி கட்ஆஃப் அடிப்படையிலான மதிப்பீடு மட்டுமே. ஒவ்வொரு ஆண்டும் கட்ஆஃப் மாறும், எனவே பாதுகாப்பான தேர்வுப் பட்டியலுக்கு ஆலோசனை அமர்வை முன்பதிவு செய்யுங்கள்.',
  },
];
