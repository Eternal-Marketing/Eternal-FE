import type { Metadata } from 'next';
import ServicePageClient from './ServicePageClient';

const serviceTitle = '맘카페·블로그·플레이스·인스타 마케팅 대행';
const serviceDescription =
  '맘카페 광고·맘카페 홍보·맘카페 바이럴, 블로그 마케팅·블로그 상위노출·블로그 관리 대행, 네이버 플레이스 광고·플레이스 상위노출, 인스타그램 마케팅·인스타그램 계정 관리·릴스 마케팅, 커뮤니티 마케팅·카페 침투 마케팅. 바이럴 마케팅 업체, 마케팅 대행사 추천.';

export const metadata: Metadata = {
  title: serviceTitle,
  description: serviceDescription,
  alternates: { canonical: "/service" },
  openGraph: {
    title: `이터널마케팅 | ${serviceTitle}`,
    description: serviceDescription,
    url: '/service',
    images: ['/images/big-logo.svg'],
  },
  twitter: {
    title: `이터널마케팅 | ${serviceTitle}`,
    description: serviceDescription,
    images: ['/images/big-logo.svg'],
  },
};

export default function ServicePage() {
  return <ServicePageClient />;
}

