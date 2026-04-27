import type { Metadata } from 'next';
import { siteOgImage } from '@/lib/siteOgImage';
import ColumnPageContent from './ColumnPageContent';

/**
 * 칼럼 목록 페이지 (/column)
 * - activeCategorySlug 미지정 시 첫 카테고리 사용 (API 또는 기본 목록)
 */
const columnDescription =
  '맘카페, 블로그, 플레이스, SNS 마케팅 운영 전략과 실제 인사이트를 정리한 이터널마케팅 칼럼입니다.';

export const metadata: Metadata = {
  title: '마케팅 칼럼',
  description: columnDescription,
  alternates: { canonical: "/column" },
  openGraph: {
    title: '이터널마케팅 | 마케팅 칼럼',
    description: columnDescription,
    url: '/column',
    images: [siteOgImage],
  },
  twitter: {
    title: '이터널마케팅 | 마케팅 칼럼',
    description: columnDescription,
    images: [siteOgImage.url],
  },
};

export default function ColumnPage() {
  return <ColumnPageContent />;
}
