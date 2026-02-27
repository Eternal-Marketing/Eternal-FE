import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: '회사 소개 | 이터널마케팅',
  description: '이터널마케팅의 스토리와 철학, 인텔리전스, 전문 조직 체계를 소개합니다.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
