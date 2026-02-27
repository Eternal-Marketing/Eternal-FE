/**
 * 홈 페이지
 * - 히어로 → 회사소개 → 플랫폼 → 리뷰/상장 → 프로세스(무한대) → AI 진단 CTA
 */
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PlatformsSection from "@/components/sections/PlatformsSection";
import ReviewSection from "@/components/sections/ReviewSection";
import InfiniteSection from "@/components/sections/InfiniteSection";
import DiagnosisSection from "@/components/sections/DiagnosisSection";

export const metadata: Metadata = {
  title: "맘카페·블로그·바이럴 마케팅 전문",
  description:
    "맘카페·블로그·커뮤니티·인스타그램을 활용한 실전 바이럴 홍보 마케팅. 마케팅 컨설팅부터 콘텐츠/커뮤니티 운영까지, 이터널마케팅이 데이터 기반으로 설계합니다.",
  openGraph: {
    title: "이터널마케팅 | 맘카페·블로그·바이럴 마케팅 전문",
    description:
      "맘카페·블로그·커뮤니티·인스타그램을 활용한 실전 바이럴 홍보 마케팅. 마케팅 컨설팅부터 콘텐츠/커뮤니티 운영까지, 이터널마케팅이 데이터 기반으로 설계합니다.",
    url: "/",
    images: ["/images/big-logo.svg"],
  },
  twitter: {
    title: "이터널마케팅 | 맘카페·블로그·바이럴 마케팅 전문",
    description:
      "맘카페·블로그·커뮤니티·인스타그램을 활용한 실전 바이럴 홍보 마케팅. 마케팅 컨설팅부터 콘텐츠/커뮤니티 운영까지, 이터널마케팅이 데이터 기반으로 설계합니다.",
    images: ["/images/big-logo.svg"],
  },
};

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

