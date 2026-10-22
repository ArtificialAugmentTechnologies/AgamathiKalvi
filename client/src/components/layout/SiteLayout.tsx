import { motion } from 'framer-motion';
import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { FloatingActions } from './FloatingActions';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function SiteLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  useScrollToTopOnNavigate(pathname);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="fixed top-2 left-2 z-[60] -translate-y-20 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0"
      >
        {t('common.skipToContent')}
      </a>
      <Navbar />
      {/* Enter-only transition keeps route changes snappy; MotionConfig disables it for reduced motion. */}
      <motion.main
        id="main"
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </motion.main>
      <Footer />
      {/* Spacer so the mobile booking bar never covers the footer. */}
      <div className="h-[4.75rem] bg-ink lg:hidden" aria-hidden />
      <FloatingActions />
    </div>
  );
}

function PageFallback() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center" aria-busy>
      <span className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

function useScrollToTopOnNavigate(pathname: string) {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
}
