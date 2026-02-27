import type { Metadata } from 'next';
import ColumnPageContent from './ColumnPageContent';

/**
 * 칼럼 목록 페이지 (/column)
 * - activeCategorySlug 미지정 시 첫 카테고리 사용 (API 또는 기본 목록)
 */
export const metadata: Metadata = {
  title: '마케팅 칼럼 | 이터널마케팅',
  description: '맘카페·블로그·커뮤니티·바이럴·SNS 마케팅 전략과 사례를 칼럼으로 정리했습니다.',
};

export default function ColumnPage() {
  return <ColumnPageContent />;
}
