import { CallToAction } from '@/components/common/CallToAction';
import { AppComingSoon } from '@/features/home/AppComingSoon';
import { BlogSection } from '@/features/home/BlogSection';
import { FaqSection } from '@/features/home/FaqSection';
import { HeroBanner, HeroSection } from '@/features/home/HeroSection';
import { HowItWorks } from '@/features/home/HowItWorks';
import { InviteSchoolSection } from '@/features/home/InviteSchoolSection';
import { PartnersMarquee } from '@/features/home/PartnersMarquee';
import { ProgramsSection } from '@/features/home/ProgramsSection';
import { StatsBar } from '@/features/home/StatsBar';
import { TestimonialsSection } from '@/features/home/TestimonialsSection';
import { ToolsSection } from '@/features/home/ToolsSection';
import { WhyAgamathi } from '@/features/home/WhyAgamathi';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function HomePage() {
  usePageMeta();

  return (
    <>
      <HeroSection />
      <HeroBanner />
      <StatsBar />
      <HowItWorks />
      <ToolsSection />
      <ProgramsSection />
      <WhyAgamathi />
      <BlogSection />
      <PartnersMarquee />
      <TestimonialsSection />
      <InviteSchoolSection />
      <AppComingSoon />
      <FaqSection />
      <CallToAction />
    </>
  );
}
