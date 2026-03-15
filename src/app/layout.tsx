import type { Metadata } from "next";
import Script from "next/script";
import HealthLogger from "@/components/layout/HealthLogger";
import "./globals.css";

/**
 * 루트 레이아웃
 * - 전역 메타데이터(제목, 설명, OG, 트위터, 파비콘)
 * - body 기본 폰트·배경
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eternalmarketing.co.kr";
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const naverSiteVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

const defaultTitle = "이터널마케팅 | 맘카페·블로그·바이럴 마케팅 전문";
const defaultDescription =
  "맘카페·블로그·커뮤니티·인스타그램을 활용한 실전 바이럴 홍보 마케팅. 마케팅 컨설팅부터 콘텐츠/커뮤니티 운영까지, 이터널마케팅이 데이터 기반으로 설계합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | 이터널마케팅",
  },
  description: defaultDescription,
  ...(googleSiteVerification || naverSiteVerification
    ? {
        verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
        other: naverSiteVerification ? { "naver-site-verification": naverSiteVerification } : undefined,
      }
    : {}),
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: "이터널마케팅",
    type: "website",
    images: [
      {
        url: "/images/big-logo.svg",
        width: 174,
        height: 100,
        alt: "이터널마케팅",
      },
    ],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/big-logo.svg"],
  },
  icons: {
    icon: "/images/service-page/google-logo.svg",
  },
  keywords: [
    "이터널마케팅",
    "맘카페 마케팅",
    "맘카페 홍보",
    "맘카페 광고",
    "커뮤니티 마케팅",
    "카페 침투 마케팅",
    "블로그 관리 대행",
    "브랜드 블로그",
    "바이럴 마케팅 대행",
    "온라인 마케팅 대행",
    "마케팅 외주",
    "인스타그램 광고",
    "AI 마케팅",
  ],
};

/** 모바일: 뷰포트·세이프영역 통일 → iPhone/갤럭시 표시 차이 완화 */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const canonicalUrl = siteUrl.replace(/\/$/, "");
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "이터널마케팅",
    url: canonicalUrl,
    logo: `${canonicalUrl}/images/logo.svg`,
  };

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "이터널마케팅",
    url: canonicalUrl,
  };

  return (
    <html lang="ko">
      <head>
        <Script id="jsonld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLdOrganization)}
        </Script>
        <Script id="jsonld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLdWebsite)}
        </Script>

        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className="antialiased font-sans bg-bg text-main" suppressHydrationWarning>
        <HealthLogger />
        {children}
      </body>
    </html>
  );
}
