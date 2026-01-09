import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PlatformsSection from "@/components/sections/PlatformsSection";
import ReviewSection from "@/components/sections/ReviewSection";
import InfiniteSection from "@/components/sections/InfiniteSection";
import DiagnosisSection from "@/components/sections/DiagnosisSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PlatformsSection />
      <ReviewSection />
      <InfiniteSection />
      <DiagnosisSection />
      <FooterSection />
    </main>
  );
}
