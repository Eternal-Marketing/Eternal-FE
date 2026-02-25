import ColumnPageContent from '../../ColumnPageContent';

/**
 * 칼럼 카테고리 페이지 (/column/category/:categorySlug)
 * - URL slug로 카테고리 지정, API categories 또는 기본 slug 사용
 */
type Props = { params: Promise<{ categorySlug: string }> };

export default async function ColumnCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  return <ColumnPageContent activeCategorySlug={categorySlug} />;
}
