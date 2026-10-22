// Shapes returned by the public /api/content endpoints.

export type Stat = {
  key: string;
  value: number;
  suffix?: string;
  display?: string;
  label: string;
  labelTa?: string;
};

export type ContactSettings = {
  addressLines: string[];
  pincode: string | null;
  phones: string[];
  emails: string[];
  whatsapp: string;
  hours?: string;
  mapQuery?: string;
};

export type SocialSettings = { facebook?: string; instagram?: string; youtube?: string };

export type SiteSettings = {
  stats_home?: Stat[];
  stats_about?: Stat[];
  contact?: ContactSettings;
  socials?: SocialSettings;
  youtube?: { channelId: string };
};

export type Testimonial = {
  id: string;
  name: string;
  town: string;
  quote: string;
  quoteTa: string | null;
  avatarUrl: string | null;
};

export type BlogCard = {
  id: string;
  slug: string;
  title: string;
  titleTa: string | null;
  excerpt: string;
  coverUrl: string | null;
  pdfUrl: string | null;
  readingMins: number;
  comingSoon: boolean;
  publishedAt: string | null;
  category: { slug: string; name: string; nameTa: string | null } | null;
};

export type PartnerLogo = { id: string; name: string; logoUrl: string };

export type Faq = {
  id: string;
  question: string;
  questionTa: string | null;
  answer: string;
  answerTa: string | null;
};
