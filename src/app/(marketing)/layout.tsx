import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import PageTransition from "@/components/layout/PageTransition";

/**
 * 마케팅 레이아웃
 * - 모든 마케팅 페이지에 Header, Footer, 페이지 전환(PageTransition), FloatingCTA 공통 적용
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
