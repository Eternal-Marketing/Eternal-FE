import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import PageTransition from "@/components/layout/PageTransition";

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
