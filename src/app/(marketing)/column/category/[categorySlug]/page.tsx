import ColumnPageContent from '../../ColumnPageContent';
import { getCategoryIndex } from '../../categorySlug';

/**
 * 칼럼 카테고리 페이지 (/column/category/:categorySlug)
 * - URL slug로 카테고리 인덱스 계산 후 ColumnPageContent에 전달
 */
type Props = { params: Promise<{ categorySlug: string }> };

export default async function ColumnCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const activeCategoryIndex = getCategoryIndex(categorySlug);
  return <ColumnPageContent activeCategoryIndex={activeCategoryIndex} />;
}
