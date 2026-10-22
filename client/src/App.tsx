import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import type { TKey } from '@/config/navigation';
import { ComingSoonPage } from '@/pages/ComingSoonPage';

// Every page is its own chunk, downloaded on first visit.
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const CareersPage = lazy(() => import('@/pages/CareersPage'));
const CareerDetailPage = lazy(() => import('@/pages/CareerDetailPage'));
const CareerTunerPage = lazy(() => import('@/pages/programs/CareerTunerPage'));
const StudentpreneurPage = lazy(() => import('@/pages/programs/StudentpreneurPage'));
const AbroadPage = lazy(() => import('@/pages/programs/AbroadPage'));
const Class1112Page = lazy(() => import('@/pages/programs/Class1112Page'));
const Class10Page = lazy(() => import('@/pages/programs/Class10Page'));
const MediaPage = lazy(() => import('@/pages/MediaPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Routes still to be built: [path, page-title key, phase that builds it].
const upcoming: [string, TKey, string][] = [
  ['/tools', 'pages.tools', '5'],
  ['/tools/cutoff-calculator', 'pages.cutoff', '5'],
  ['/tools/college-predictor', 'pages.predictor', '5'],
  ['/tools/choice-list', 'pages.choiceList', '5'],
  ['/tools/career-quiz', 'pages.quiz', '5'],
  ['/tools/scholarships', 'pages.scholarships', '5'],
  ['/login', 'pages.login', '6'],
  ['/signup', 'pages.signup', '6'],
  ['/dashboard/*', 'pages.dashboard', '6'],
  ['/admin/*', 'pages.admin', '7'],
  ['/privacy', 'pages.privacy', '8'],
  ['/terms', 'pages.terms', '8'],
  ['/disclaimer', 'pages.disclaimer', '8'],
];

export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="careers/:slug" element={<CareerDetailPage />} />
        <Route path="programs/career-tuner" element={<CareerTunerPage />} />
        <Route path="programs/studentpreneur" element={<StudentpreneurPage />} />
        <Route path="programs/abroad" element={<AbroadPage />} />
        <Route path="programs/class-11-12" element={<Class1112Page />} />
        <Route path="programs/class-10" element={<Class10Page />} />
        <Route path="media" element={<MediaPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="contact" element={<ContactPage />} />
        {upcoming.map(([path, titleKey, phase]) => (
          <Route
            key={path}
            path={path}
            element={<ComingSoonPage titleKey={titleKey} phase={phase} />}
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
