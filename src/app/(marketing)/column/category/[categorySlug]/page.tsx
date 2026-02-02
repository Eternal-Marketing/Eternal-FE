import ColumnPageContent from '../../ColumnPageContent';
import { getCategoryIndex } from '../../categorySlug';

type Props = { params: Promise<{ categorySlug: string }> };

export default async function ColumnCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const activeCategoryIndex = getCategoryIndex(categorySlug);
  return <ColumnPageContent activeCategoryIndex={activeCategoryIndex} />;
}
