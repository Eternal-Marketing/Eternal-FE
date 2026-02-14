import type { Metadata } from "next";
import "./globals.css";

/**
 * 루트 레이아웃
 * - 전역 메타데이터(제목, 설명, OG, 트위터, 파비콘)
 * - body 기본 폰트·배경
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eternalmarketing.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "이터널 마케팅 (Eternal Marketing)",
  description:
    "막막했던 마케팅, 이터널의 기준과 데이터로 모두 공개합니다. 바이럴, 퍼포먼스, SNS 마케팅.",
  openGraph: {
    title: "이터널 마케팅 (Eternal Marketing)",
    description:
      "막막했던 마케팅, 이터널의 기준과 데이터로 모두 공개합니다. 바이럴, 퍼포먼스, SNS 마케팅.",
    url: siteUrl,
    siteName: "이터널 마케팅",
    images: [
      {
        url: "/images/big-logo.svg",
        width: 174,
        height: 100,
        alt: "이터널 마케팅 로고",
      },
    ],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "이터널 마케팅 (Eternal Marketing)",
    description:
      "막막했던 마케팅, 이터널의 기준과 데이터로 모두 공개합니다. 바이럴, 퍼포먼스, SNS 마케팅.",
    images: ["/images/big-logo.svg"],
  },
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* Spline 3D 첫 진입 시 끊김 방지: 연결 미리 수립 */}
        <link rel="preconnect" href="https://my.spline.design" />
        <link rel="dns-prefetch" href="https://my.spline.design" />
      </head>
      <body className="antialiased font-sans bg-bg text-main" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
