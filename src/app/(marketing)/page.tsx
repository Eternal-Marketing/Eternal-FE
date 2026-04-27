/**
 * 홈 페이지
 * - 히어로 → 회사소개 → 플랫폼 → 리뷰/상장 → 프로세스(무한대) → AI 진단 CTA
 * - 하단 섹션은 dynamic import로 코드스플릿해 모바일 초기 로딩 경량화
 */
import type { Metadata } from "next";
import { siteOgImage } from "@/lib/siteOgImage";
import { defaultDescription, defaultTitle } from "@/lib/seo";
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

const homeTitle = defaultTitle;
const homeDescription = defaultDescription;

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    images: [siteOgImage],
  },
  twitter: {
    title: homeTitle,
    description: homeDescription,
    images: [siteOgImage.url],
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

