import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

const aboutDescription =
  '맘카페·블로그·플레이스·SNS 마케팅 대행사 이터널마케팅. 바이럴 마케팅 업체, 온라인 마케팅·광고 대행사. 서울·경기·인천·부산 마케팅 업체 추천. 스토리와 철학, 인텔리전스, 전문 조직 체계를 소개합니다.';

export const metadata: Metadata = {
  title: '회사 소개',
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: '이터널마케팅 | 회사 소개',
    description: aboutDescription,
    url: '/about',
    images: ['/images/service-page/background-logo.svg'],
  },
  twitter: {
    title: '이터널마케팅 | 회사 소개',
    description: aboutDescription,
    images: ['/images/service-page/background-logo.svg'],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
