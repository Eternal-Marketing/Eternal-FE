import type { Metadata } from 'next';
import { siteOgImage } from '@/lib/siteOgImage';
import ServicePageClient from './ServicePageClient';

const serviceTitle = '맘카페·블로그·플레이스 마케팅 대행 서비스';
const serviceDescription =
  '맘카페·블로그·플레이스·인스타그램 마케팅 대행 서비스 소개. 블로그 상위노출, 플레이스 광고, 인스타 계정 관리, 바이럴 마케팅 업체 추천.';

export const metadata: Metadata = {
  title: serviceTitle,
  description: serviceDescription,
  alternates: { canonical: "/service" },
  openGraph: {
    title: `${serviceTitle} | 이터널마케팅`,
    description: serviceDescription,
    url: '/service',
    images: [siteOgImage],
  },
  twitter: {
    title: `${serviceTitle} | 이터널마케팅`,
    description: serviceDescription,
    images: [siteOgImage.url],
  },
};

export default function ServicePage() {
  return <ServicePageClient />;
}

