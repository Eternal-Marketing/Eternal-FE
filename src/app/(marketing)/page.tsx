/**
 * 홈 페이지
 * - 히어로 → 회사소개 → 플랫폼 → 리뷰/상장 → 프로세스(무한대) → AI 진단 CTA
 * - 하단 섹션은 dynamic import로 코드스플릿해 모바일 초기 로딩 경량화
 */
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PlatformsSection from "@/components/sections/PlatformsSection";

const ReviewSection = dynamic(
  () => import("@/components/sections/ReviewSection"),
  { ssr: true }
);

const InfiniteSection = dynamic(
  () => import("@/components/sections/InfiniteSection"),
  { ssr: true }
);

const DiagnosisSection = dynamic(
  () => import("@/components/sections/DiagnosisSection"),
  { ssr: true }
);

const homeTitle = "이터널마케팅 | 맘카페·블로그·플레이스·SNS 마케팅 대행사";
const homeDescription =
  "맘카페 광고·홍보, 블로그 상위노출·관리 대행, 네이버 플레이스 상위노출, 인스타그램 마케팅·계정 관리, 커뮤니티 바이럴. 서울·경기·인천·부산 마케팅 업체, 온라인 마케팅·광고 대행사 추천. AI 마케팅·퍼포먼스 마케팅 전문.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    images: ["/images/big-logo.svg"],
  },
  twitter: {
    title: homeTitle,
    description: homeDescription,
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

