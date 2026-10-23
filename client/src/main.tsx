import '@fontsource-variable/inter';
import '@fontsource-variable/source-serif-4';
import '@fontsource-variable/source-serif-4/wght-italic.css';
import '@fontsource-variable/noto-sans-tamil';
import '@fontsource-variable/noto-serif-tamil';
import './index.css';
import './i18n';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AppToaster } from './components/layout/AppToaster';
import { ChoiceListSync } from './features/auth/ChoiceListSync';
import { BookingProvider } from './features/booking/BookingProvider';
import { ThemeProvider } from './providers/ThemeProvider';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false } },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {/* "user" = honour the OS reduced-motion setting for every Framer Motion animation. */}
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <BookingProvider>
              <App />
              <ChoiceListSync />
            </BookingProvider>
          </BrowserRouter>
          <AppToaster />
        </MotionConfig>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
