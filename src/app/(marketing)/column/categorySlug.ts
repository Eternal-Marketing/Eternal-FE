/**
 * 칼럼 카테고리 slug·한글명·인덱스 유틸
 * - CATEGORY_SLUGS: URL용 slug 목록
 * - CATEGORY_NAMES: 브레드크럼·뱃지용 한글명
 * - getCategoryIndex(slug): slug → 0~3 인덱스
 * - getArticleCategoryIndex(articleSlug): 글 slug → 카테고리 인덱스 (featured→0, 숫자→N-1)
 */
export const CATEGORY_SLUGS = ['bayiral', 'performance', 'sns', 'video'] as const;

export const CATEGORY_NAMES = ['바이럴 마케팅', '퍼포먼스 마케팅', 'SNS 마케팅', '영상 콘텐츠 마케팅'] as const;

export function getCategoryIndex(slug: string): number {
  const idx = CATEGORY_SLUGS.indexOf(slug as (typeof CATEGORY_SLUGS)[number]);
  return idx >= 0 ? idx : 0;
}

export function getArticleCategoryIndex(articleSlug: string): number {
  if (articleSlug === 'featured') return 0;
  const n = parseInt(articleSlug, 10);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n - 1, 3));
}
