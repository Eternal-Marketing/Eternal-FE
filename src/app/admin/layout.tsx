import type { Metadata } from "next";

/**
 * 관리자 영역 레이아웃
 * - Header/Footer 없이 독립적인 로그인 화면
 */
export const metadata: Metadata = {
  title: "관리자 로그인 | Eternal Marketing",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
