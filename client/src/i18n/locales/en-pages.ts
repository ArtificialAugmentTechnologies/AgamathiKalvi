// English copy for the content pages (About, Careers, Programs, Media, Blog, Contact).
// Text marked "draft" was written for the rebuild — the old site had no copy for it.

export const enPages = {
  about: {
    eyebrow: 'About us',
    title: "Guiding Tamil Nadu's students since 2012",
    intro:
      'Agamathi Kalvi transforms the lives of deserving students in urban and rural areas alike. Through school programs we provide career guidance, then guide students through admissions so they choose the right course at the right institution — one that offers quality education, continuous skill development, real-world exposure, placement readiness, entrepreneurial skills and the values to become a better person. We have already helped around 1 lakh students choose their dream with 100% confidence.',
    impact: 'Our impact',
    mission: {
      title: 'Our mission',
      body: 'Guide every student — in a city or a village — to the right course at the right institution, with 100% confidence.',
    },
    vision: {
      title: 'Our vision',
      body: 'Create 100+ leaders who guide students from under-privileged and rural backgrounds, and reach 1,000+ schools across Tamil Nadu.',
    },
    founder: { eyebrow: "Founder's message" },
    team: {
      eyebrow: 'Meet our team',
      title: 'Think unique and be innovative',
      subtitle: 'Save your time and money by choosing our professional team.',
    },
    rnd: {
      title: 'Built on research',
      body: 'Every course, career and scholarship detail we share is crafted after careful research by our R&D team, so families can decide with facts, not guesswork.',
    },
    journey: {
      eyebrow: 'Our journey',
      title: 'From one mentor to a statewide helpline',
      items: {
        start: {
          label: '2012',
          title: 'The first step',
          body: 'Started guiding students into elite institutions.',
        },
        schools: {
          label: 'Schools',
          title: '300+ school programs',
          body: 'Career guidance sessions in schools across Tamil Nadu.',
        },
        students: {
          label: 'Students',
          title: '1 lakh+ students guided',
          body: 'Helping each choose their dream with confidence.',
        },
        districts: {
          label: 'Reach',
          title: '21 of 38 districts',
          body: 'From Chennai to the Nilgiris, and growing.',
        },
        programs: {
          label: 'Programs',
          title: 'AI Career Discovery & StudentPreneur',
          body: 'Video guidance and earn-while-you-learn programs.',
        },
        next: {
          label: 'Next',
          title: '1,000+ schools and our app',
          body: 'Bringing guidance to every student’s pocket.',
        },
      },
    },
  },

  careersHub: {
    eyebrow: 'Career guidance',
    title: 'Explore careers that fit you',
    subtitle:
      'Browse careers by stream and class. Each one shows eligibility, entrance exams, top colleges in Tamil Nadu, salary and future scope.',
    search: 'Search careers — e.g. doctor, design, CA',
    allStreams: 'All streams',
    entry: { all: 'Any class', after10: 'After 10th', after12: 'After 12th' },
    count: '{{count}} careers',
    empty: 'No careers match your filters.',
    reset: 'Clear filters',
    salary: 'Starting salary',
    view: 'View career',
  },

  careerDetail: {
    back: 'All careers',
    overview: 'Overview',
    eligibility: 'Eligibility',
    exams: 'Entrance exams',
    topColleges: 'Top colleges in Tamil Nadu',
    scholarships: 'Scholarships',
    salary: 'Salary range',
    salaryRange: '₹{{min}} – ₹{{max}} per year',
    futureScope: 'Future scope',
    ctaTitle: 'Is this the right career for you?',
    ctaBody:
      'Talk to an Agamathi counsellor — we will map your marks and interests to the right course and college.',
    notFound: 'We could not find that career.',
  },

  programPages: {
    careerTuner: {
      eyebrow: 'Our updates',
      lead: 'A goal without a plan is just a wish.',
      body: "Each of us has a dream and our own goals, but we don't always know the right path to reach them. Our YouTube channel explains every course, where it leads in today's world and why it matters — in short videos. It helps students who are searching for the right path to their goals.",
      shortsTitle: 'Watch our Shorts',
      shortTitle: 'Career discovery short {{n}}',
      subscribe: 'Subscribe on YouTube',
      follow: 'Follow on Instagram',
      entrepreneur: {
        eyebrow: 'Our support',
        title: 'From Student to Entrepreneur',
        tagline: "Have a business idea? Let's turn it into an opportunity.",
        body: 'We help aspiring student entrepreneurs explore their ideas, develop essential business skills, and take the first steps towards building their own ventures.',
        supportTitle: 'Our Entrepreneurship Support',
        items: {
          idea: {
            title: 'Business Idea Development',
            body: 'Discover your strengths, explore business opportunities, and learn how to shape your ideas into a business concept.',
          },
          mentorship: {
            title: 'Startup Mentorship',
            body: 'Get guidance on business planning, market research, and understanding your target customers.',
          },
          skills: {
            title: 'Skills & Business Development',
            body: 'Build essential skills in communication, marketing, financial planning, and entrepreneurship.',
          },
          digital: {
            title: 'Digital Business Support',
            body: 'Learn about websites, digital marketing, e-commerce, and online business opportunities.',
          },
          resources: {
            title: 'Startup Resources',
            body: 'Explore useful resources for business registration, startup schemes, and funding opportunities where eligible.',
          },
        },
        ctaTitle: 'Have a Business Idea?',
        ctaBody: 'Take the first step towards your entrepreneurial journey.',
        cta: 'Explore Entrepreneurship Support',
      },
    },
    studentpreneur: {
      eyebrow: '#Responsible_Employment',
      title: 'StudentPreneur 2.0',
      lead: 'At Agamathi, we encourage students to enrol and reach sky high through gigs and part-time jobs.',
      join: 'Join StudentPreneur',
      features: {
        knowledge: {
          tag: 'Knowledge + Income',
          title: 'Smart Student',
          body: 'Gain knowledge with a stipend — that is our motto. Beyond earning, you learn the skills that matter.',
        },
        growth: {
          tag: '#Gateway_To_Success',
          title: 'Growth and Success',
          body: 'We train you to work with your peers and build communication skills, sales knowledge and more.',
        },
        creators: {
          tag: '#Path_To_Future',
          title: "Nex'Gen Creators",
          body: 'You are the one to start a revolution — helping fellow students stay true to their interests through career guidance.',
        },
        give: {
          tag: 'Learn, Earn and Give',
          title: 'Future Artists',
          body: 'Like a sculptor, shape the new era with like-minded people on the right track. Learn, earn, and give back to society.',
        },
      },
    },
    abroad: {
      eyebrow: 'Our service',
      title: 'Study abroad, the right way',
      lead: 'Choosing a country, course and university is a big decision. We help you plan it step by step — from your first question to your flight.',
      tapHint: 'Hover or tap a country to spin the globe to it.',
      countriesTitle: 'Popular study destinations',
      countries: {
        usa: { name: 'USA', note: 'World-leading universities, especially for STEM and research.' },
        uk: {
          name: 'United Kingdom',
          note: 'Shorter degrees, including one-year master’s programmes.',
        },
        canada: {
          name: 'Canada',
          note: 'Co-op programmes that mix study with paid work experience.',
        },
        germany: { name: 'Germany', note: 'Strong engineering and low-cost public universities.' },
        australia: {
          name: 'Australia',
          note: 'High quality of life and a large student community.',
        },
      },
      stepsTitle: 'How we help',
      steps: {
        profile: {
          title: 'Profile & goals',
          body: 'Understand your marks, interests, budget and career goals.',
        },
        shortlist: {
          title: 'Country & course shortlist',
          body: 'Match you to the countries, courses and universities that fit.',
        },
        tests: {
          title: 'Entrance & language tests',
          body: 'Plan for IELTS, TOEFL, GRE, SAT or others as needed.',
        },
        apply: {
          title: 'Applications',
          body: 'Guide your applications, documents and statement of purpose.',
        },
        visa: { title: 'Visa & departure', body: 'Help with visa steps and getting ready to fly.' },
      },
    },
    class1112: {
      eyebrow: 'For Class 11 & 12',
      title: 'Plan your college life now',
      lead: 'Confused about college life? No worries. Explore the career paths, entrance exams and colleges that suit you best — and start preparing early.',
      pathsTitle: 'Popular paths after Class 12',
      paths: {
        engineering: {
          title: 'Engineering',
          body: 'B.E./B.Tech through TNEA, JEE and university admissions.',
        },
        medical: {
          title: 'Medicine & health',
          body: 'MBBS, BDS, nursing, pharmacy and allied health through NEET and state counselling.',
        },
        artsScience: {
          title: 'Arts & science',
          body: 'B.Sc, B.A and integrated programmes in hundreds of subjects.',
        },
        commerce: { title: 'Commerce & finance', body: 'B.Com, BBA, CA, CMA and banking careers.' },
        law: {
          title: 'Law',
          body: 'Five-year integrated law through CLAT and state law universities.',
        },
        design: {
          title: 'Design & media',
          body: 'Fashion, product and communication design, journalism and more.',
        },
      },
      examsTitle: 'Entrance exams to know',
      exams: {
        tnea: {
          title: 'TNEA',
          body: 'Tamil Nadu engineering admissions, based on Class 12 marks.',
        },
        neet: { title: 'NEET UG', body: 'Required for MBBS, BDS and most medical courses.' },
        jee: {
          title: 'JEE Main / Advanced',
          body: 'For NITs, IITs and other national institutes.',
        },
        clat: { title: 'CLAT', body: 'For national law universities.' },
        cuet: { title: 'CUET UG', body: 'For central universities and many others.' },
        design: { title: 'NIFT / NID / UCEED', body: 'For top design institutes.' },
      },
      toolsTitle: 'Start with our free tools',
    },
    class10: {
      eyebrow: 'For Class 10',
      title: 'Choose the right stream after Class 10',
      lead: 'The stream you choose now opens the doors you can walk through later. Here is what each stream leads to — and how to choose.',
      streamsTitle: 'The four main streams',
      subjects: 'Key subjects',
      leadsTo: 'Leads to',
      streams: {
        science: {
          title: 'Science',
          subjects: 'Physics, Chemistry, Maths / Biology, Computer Science',
          careers: 'Engineering, medicine, research, technology',
        },
        commerce: {
          title: 'Commerce',
          subjects: 'Accountancy, Commerce, Economics, Business Maths',
          careers: 'CA, banking, business, finance',
        },
        arts: {
          title: 'Arts & humanities',
          subjects: 'History, Economics, Political Science, languages',
          careers: 'Law, civil services, media, teaching, design',
        },
        vocational: {
          title: 'Vocational & diploma',
          subjects: 'Polytechnic diploma, ITI, vocational courses',
          careers: 'Technician roles, lateral entry to B.E., own business',
        },
      },
      howTitle: 'How to choose',
      how: {
        interest: {
          title: 'Interest',
          body: 'Which subjects do you enjoy and lose track of time in?',
        },
        aptitude: {
          title: 'Aptitude',
          body: 'What are you naturally good at — numbers, words, people, building?',
        },
        marks: { title: 'Marks', body: 'Your Class 10 marks show where you are strong today.' },
        future: {
          title: 'Future scope',
          body: 'Which careers will be in demand when you graduate?',
        },
      },
      quizCta: 'Take the career interest quiz',
    },
  },

  mediaPage: {
    eyebrow: 'Media',
    title: 'Moments from our school programs',
    subtitle:
      'We are glad to share the best and most overwhelming moments from career guidance sessions in schools.',
    all: 'All',
    open: 'Open photo: {{title}}',
    close: 'Close',
    prev: 'Previous photo',
    next: 'Next photo',
    position: '{{current}} of {{total}}',
    videosTitle: 'Watch our videos',
    videosBody: 'Career guidance videos, school sessions and more on our YouTube channel.',
    videosCta: 'Open YouTube channel',
    values: {
      teamUp: {
        tag: '#Team_up',
        title: 'To shape the future',
        body: 'Agamathi is on a mission to shape the future of India and its leaders. Students are the backbone of the next generation — we help them understand their interests and guide them on the right path.',
      },
      listen: {
        tag: '#Step_by_step_process',
        title: 'Listen, Learn and Deliver',
        body: 'We sit alongside students, listen to them, learn their strengths and interests, and deliver the career guidance they need.',
      },
      success: {
        tag: '#Goals_and_Target',
        title: 'Success and Happiness',
        body: 'We work round the clock with students to guide them along a better, more feasible path to success.',
      },
      doors: {
        tag: '#Knock_Our_Doors',
        title: 'Any doubts or plans?',
        body: 'Our doors are always open for students. Our goal is simple: help students taste success without any hassle.',
      },
    },
  },

  blogPage: {
    eyebrow: 'Latest technology',
    title: 'Stay updated and inspired',
    subtitle: "Articles from our R&D team on the technology shaping tomorrow's careers.",
    search: 'Search articles',
    all: 'All',
    empty: 'No articles match your search.',
    back: 'All articles',
    share: 'Share',
    copyLink: 'Copy link',
    copied: 'Link copied',
    shareWhatsapp: 'Share on WhatsApp',
    shareFacebook: 'Share on Facebook',
    download: 'Download the full article (PDF)',
    comingSoonBody:
      'This article is still being written. Follow us on Instagram or YouTube to know when it is published.',
    published: 'Published {{date}}',
    notFound: 'We could not find that article.',
  },

  contactPage: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    subtitle:
      'Reach out using the form and we will get back to you shortly — or chat with us on WhatsApp.',
    formTitle: 'Drop us a line',
    preferredTime: 'Preferred time to call (optional)',
    submit: 'Send message',
    success: 'Thank you! Our team will call you back shortly.',
    address: 'Office',
    phone: 'Phone',
    email: 'Email',
    hours: 'Working hours',
    whatsapp: 'Chat on WhatsApp',
    directions: 'Get directions',
    mapTitle: 'Agamathi office location on Google Maps',
  },
};
