import type { Metadata } from 'next';
import { siteOgImage } from '@/lib/siteOgImage';
import AboutPageClient from './AboutPageClient';

const aboutDescription =
  '이터널마케팅 소개. 데이터 기반 마케팅 파트너, 스토리·철학·전문 조직을 소개합니다. 맘카페·블로그·플레이스·SNS 마케팅 대행사.';

export const metadata: Metadata = {
  title: '회사 소개',
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: '이터널마케팅 | 회사 소개',
    description: aboutDescription,
    url: '/about',
    images: [siteOgImage],
  },
  twitter: {
    title: '이터널마케팅 | 회사 소개',
    description: aboutDescription,
    images: [siteOgImage.url],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
