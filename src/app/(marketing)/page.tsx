/**
 * 홈 페이지
 * - 히어로 → 회사소개 → 플랫폼 → 리뷰/상장 → 프로세스(무한대) → AI 진단 CTA
 */
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PlatformsSection from "@/components/sections/PlatformsSection";
import ReviewSection from "@/components/sections/ReviewSection";
import InfiniteSection from "@/components/sections/InfiniteSection";
import DiagnosisSection from "@/components/sections/DiagnosisSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PlatformsSection />
      <ReviewSection />
      <InfiniteSection />
      <DiagnosisSection />
    </main>
  );
}
