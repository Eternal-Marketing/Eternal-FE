import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import PageTransition from "@/components/layout/PageTransition";
import PreloadHeroImages from "@/components/layout/PreloadHeroImages";

/**
 * 마케팅 레이아웃
 * - 모든 마케팅 페이지에 Header, Footer, 페이지 전환(PageTransition), FloatingCTA 공통 적용
 * - About/Column/Service 히어로 이미지 preload로 진입 시 끊김 방지
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <PreloadHeroImages />
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
