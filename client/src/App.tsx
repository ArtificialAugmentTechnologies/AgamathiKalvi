import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import type { TKey } from '@/config/navigation';
import { RequireAuth } from '@/features/auth/RequireAuth';
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
const ToolsPage = lazy(() => import('@/pages/tools/ToolsPage'));
const CutoffCalculatorPage = lazy(() => import('@/pages/tools/CutoffCalculatorPage'));
const PredictorPage = lazy(() => import('@/pages/tools/PredictorPage'));
const ChoiceListPage = lazy(() => import('@/pages/tools/ChoiceListPage'));
const QuizPage = lazy(() => import('@/pages/tools/QuizPage'));
const ScholarshipsPage = lazy(() => import('@/pages/tools/ScholarshipsPage'));
const LoginPage = lazy(() => import('@/pages/account/LoginPage'));
const SignupPage = lazy(() => import('@/pages/account/SignupPage'));
const DashboardPage = lazy(() => import('@/pages/account/DashboardPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Routes still to be built: [path, page-title key, phase that builds it].
const upcoming: [string, TKey, string][] = [
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
        <Route path="tools" element={<ToolsPage />} />
        <Route path="tools/cutoff-calculator" element={<CutoffCalculatorPage />} />
        <Route path="tools/college-predictor" element={<PredictorPage />} />
        <Route path="tools/choice-list" element={<ChoiceListPage />} />
        <Route path="tools/career-quiz" element={<QuizPage />} />
        <Route path="tools/scholarships" element={<ScholarshipsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route
          path="dashboard/:tab?"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
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
