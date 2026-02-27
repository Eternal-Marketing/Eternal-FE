import type { Metadata } from 'next';
import ColumnPageContent from '../../ColumnPageContent';
import { CATEGORY_NAMES, getCategoryIndex } from '../../categorySlug';

/**
 * 칼럼 카테고리 페이지 (/column/category/:categorySlug)
 * - URL slug로 카테고리 지정, API categories 또는 기본 slug 사용
 */
type Props = { params: Promise<{ categorySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const idx = getCategoryIndex(categorySlug);
  const categoryName = CATEGORY_NAMES[idx] ?? '마케팅';
  return {
    title: `${categoryName} 칼럼`,
    description: `${categoryName} 관련 전략과 사례를 모았습니다. 맘카페·블로그·커뮤니티·바이럴·SNS 마케팅 인사이트를 확인해 보세요.`,
    openGraph: {
      title: `이터널마케팅 | ${categoryName} 칼럼`,
      description: `${categoryName} 관련 전략과 사례를 모았습니다. 맘카페·블로그·커뮤니티·바이럴·SNS 마케팅 인사이트를 확인해 보세요.`,
      url: `/column/category/${categorySlug}`,
      images: ['/images/big-logo.svg'],
    },
    twitter: {
      title: `이터널마케팅 | ${categoryName} 칼럼`,
      description: `${categoryName} 관련 전략과 사례를 모았습니다. 맘카페·블로그·커뮤니티·바이럴·SNS 마케팅 인사이트를 확인해 보세요.`,
      images: ['/images/big-logo.svg'],
    },
  };
}

export default async function ColumnCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  return <ColumnPageContent activeCategorySlug={categorySlug} />;
}
