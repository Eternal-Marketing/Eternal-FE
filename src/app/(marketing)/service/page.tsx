import type { Metadata } from 'next';
import ServicePageClient from './ServicePageClient';

export const metadata: Metadata = {
  title: '맘카페·블로그·바이럴 마케팅 대행 | 이터널마케팅',
  description:
    '맘카페 홍보, 블로그 관리 대행, 커뮤니티 바이럴, SNS 마케팅까지. 브랜드 맞춤형 마케팅 전략과 실행을 제공합니다.',
};

export default function ServicePage() {
  return <ServicePageClient />;
}

