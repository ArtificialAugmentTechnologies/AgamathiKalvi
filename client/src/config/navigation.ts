import type { ParseKeys } from 'i18next';
import {
  BookOpen,
  Calculator,
  Compass,
  GraduationCap,
  Globe2,
  ListOrdered,
  Music2,
  Rocket,
  School,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react';

export type TKey = ParseKeys;

export type NavChild = { to: string; title: TKey; desc: TKey; icon: LucideIcon };

export const careerLinks: NavChild[] = [
  {
    to: '/careers',
    title: 'nav.careerItems.explore.title',
    desc: 'nav.careerItems.explore.desc',
    icon: Compass,
  },
  {
    to: '/programs/career-tuner',
    title: 'nav.careerItems.careerTuner.title',
    desc: 'nav.careerItems.careerTuner.desc',
    icon: Music2,
  },
  {
    to: '/programs/studentpreneur',
    title: 'nav.careerItems.studentpreneur.title',
    desc: 'nav.careerItems.studentpreneur.desc',
    icon: Rocket,
  },
  {
    to: '/programs/abroad',
    title: 'nav.careerItems.abroad.title',
    desc: 'nav.careerItems.abroad.desc',
    icon: Globe2,
  },
  {
    to: '/programs/class-11-12',
    title: 'nav.careerItems.class1112.title',
    desc: 'nav.careerItems.class1112.desc',
    icon: GraduationCap,
  },
  {
    to: '/programs/class-10',
    title: 'nav.careerItems.class10.title',
    desc: 'nav.careerItems.class10.desc',
    icon: School,
  },
];

export const toolLinks: NavChild[] = [
  {
    to: '/tools/cutoff-calculator',
    title: 'nav.toolItems.cutoff.title',
    desc: 'nav.toolItems.cutoff.desc',
    icon: Calculator,
  },
  {
    to: '/tools/college-predictor',
    title: 'nav.toolItems.predictor.title',
    desc: 'nav.toolItems.predictor.desc',
    icon: Target,
  },
  {
    to: '/tools/choice-list',
    title: 'nav.toolItems.choiceList.title',
    desc: 'nav.toolItems.choiceList.desc',
    icon: ListOrdered,
  },
  {
    to: '/tools/career-quiz',
    title: 'nav.toolItems.quiz.title',
    desc: 'nav.toolItems.quiz.desc',
    icon: Sparkles,
  },
  {
    to: '/tools/scholarships',
    title: 'nav.toolItems.scholarships.title',
    desc: 'nav.toolItems.scholarships.desc',
    icon: BookOpen,
  },
];

export type NavItem =
  | { kind: 'link'; to: string; label: TKey }
  | { kind: 'menu'; id: string; label: TKey; heading: TKey; children: NavChild[] };

export const mainNav: NavItem[] = [
  { kind: 'link', to: '/', label: 'nav.home' },
  { kind: 'link', to: '/about', label: 'nav.about' },
  {
    kind: 'menu',
    id: 'careers',
    label: 'nav.careers',
    heading: 'nav.careersHeading',
    children: careerLinks,
  },
  {
    kind: 'menu',
    id: 'tools',
    label: 'nav.tools',
    heading: 'nav.toolsHeading',
    children: toolLinks,
  },
  { kind: 'link', to: '/media', label: 'nav.media' },
  { kind: 'link', to: '/contact', label: 'nav.contact' },
];

export const footerQuickLinks: { to: string; label: TKey }[] = [
  { to: '/', label: 'nav.home' },
  { to: '/about', label: 'nav.about' },
  { to: '/careers', label: 'nav.careers' },
  { to: '/media', label: 'nav.media' },
  { to: '/blog', label: 'nav.blog' },
  { to: '/contact', label: 'nav.contact' },
];
