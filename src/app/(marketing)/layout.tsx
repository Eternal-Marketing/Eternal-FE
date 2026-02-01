import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";

/**
 * Marketing Layout - 공통 레이아웃
 * 모든 페이지에 Header와 Footer를 자동으로 포함
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <Header />
      {children}
      <Footer />
      <FloatingCTA />
    </div>
  );
}
