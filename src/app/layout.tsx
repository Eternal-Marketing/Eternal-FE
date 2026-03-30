import type { Metadata } from "next";
import Script from "next/script";
import HealthLogger from "@/components/layout/HealthLogger";
import { siteOgImage } from "@/lib/siteOgImage";
import "./globals.css";

/**
 * 루트 레이아웃
 * - 전역 메타데이터(제목, 설명, OG, 트위터, 파비콘)
 * - body 기본 폰트·배경
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eternalmarketing.co.kr";
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const naverSiteVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

const defaultTitle = "이터널마케팅 | 맘카페·블로그·플레이스·SNS 마케팅 대행사";
const defaultDescription =
  "맘카페 광고·홍보, 블로그 상위노출·관리 대행, 네이버 플레이스 상위노출, 인스타그램 마케팅·계정 관리, 커뮤니티 바이럴. 서울·경기·인천·부산 마케팅 업체, 온라인 마케팅·광고 대행사 추천. AI 마케팅·퍼포먼스 마케팅 전문.";

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
    images: [siteOgImage],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [siteOgImage.url],
  },
  icons: {
    icon: "/images/og/favi.png",
    apple: "/images/og/favi.png",
  },
  keywords: [
    "이터널마케팅",
    "맘카페 마케팅",
    "맘카페 홍보",
    "맘카페 광고",
    "맘카페 바이럴",
    "커뮤니티 마케팅",
    "커뮤니티 바이럴",
    "카페 침투 마케팅",
    "블로그 마케팅",
    "블로그 상위노출",
    "블로그 광고",
    "블로그 홍보",
    "블로그 체험단",
    "블로그 기자단",
    "브랜드 블로그 관리",
    "블로그 관리 대행",
    "AI 마케팅",
    "네이버 플레이스 광고",
    "네이버 플레이스 상위노출",
    "스마트 플레이스 광고",
    "플레이스 마케팅",
    "인스타그램 마케팅",
    "인스타그램 광고",
    "인스타그램 홍보",
    "인스타그램 계정 관리",
    "인플루언서 마케팅",
    "릴스 마케팅",
    "바이럴 마케팅 업체",
    "마케팅 대행사 추천",
    "온라인 마케팅 업체",
    "광고 대행사 추천",
    "블로그 마케팅 업체",
    "맘카페 광고 업체",
    "SNS 마케팅 업체",
    "퍼포먼스 마케팅 업체",
    "디지털 마케팅 회사",
    "인천 마케팅 업체",
    "부산 마케팅 업체",
    "경기 마케팅 업체",
    "서울 마케팅 업체",
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
    description: defaultDescription,
    inLanguage: "ko-KR",
    publisher: { "@id": `${canonicalUrl}/#organization` },
    sameAs: [
      "https://blog.naver.com/eternal_marketing",
      "https://www.instagram.com/eternal__marketing",
      "https://open.kakao.com/me/eternalmarketing",
    ],
  };

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonicalUrl}/#localbusiness`,
    name: "이터널마케팅",
    description:
      "맘카페 광고·홍보, 블로그 상위노출·관리 대행, 네이버 플레이스 상위노출, 인스타그램 마케팅·계정 관리, 커뮤니티 바이럴. 서울·경기·인천·부산 마케팅 업체, 온라인 마케팅·광고 대행사.",
    url: canonicalUrl,
    logo: `${canonicalUrl}/images/logo.svg`,
    address: {
      "@type": "PostalAddress",
      addressRegion: "경기",
      addressLocality: "부천시",
      streetAddress: "원미구 소향로13번길 14-22, 8층 802-라54호 (상동, 금호프라자)",
      addressCountry: "KR",
    },
    areaServed: [
      { "@type": "City", name: "서울특별시" },
      { "@type": "State", name: "경기도" },
      { "@type": "City", name: "인천광역시" },
      { "@type": "City", name: "부산광역시" },
    ],
    sameAs: jsonLdWebsite.sameAs,
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
        <Script id="jsonld-localbusiness" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLdLocalBusiness)}
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
