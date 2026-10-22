import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import type { TKey } from '@/config/navigation';
import { ComingSoonPage } from '@/pages/ComingSoonPage';

const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Routes still to be built: [path, page-title key, phase that builds it].
const upcoming: [string, TKey, string][] = [
  ['/about', 'pages.about', '4'],
  ['/careers', 'pages.careers', '4'],
  ['/careers/:slug', 'pages.careerDetail', '4'],
  ['/programs/career-tuner', 'pages.careerTuner', '4'],
  ['/programs/studentpreneur', 'pages.studentpreneur', '4'],
  ['/programs/abroad', 'pages.abroad', '4'],
  ['/programs/class-11-12', 'pages.class1112', '4'],
  ['/programs/class-10', 'pages.class10', '4'],
  ['/media', 'pages.media', '4'],
  ['/blog', 'pages.blog', '4'],
  ['/blog/:slug', 'pages.blogPost', '4'],
  ['/contact', 'pages.contact', '4'],
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
