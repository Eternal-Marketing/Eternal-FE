/** 서버/클라이언트 공용 - 카테고리 slug → index */
export const CATEGORY_SLUGS = ['bayiral', 'performance', 'sns', 'video'] as const;

/** 카테고리 한글명 (브레드크럼·뱃지용) */
export const CATEGORY_NAMES = ['바이럴 마케팅', '퍼포먼스 마케팅', 'SNS 마케팅', '영상 콘텐츠 마케팅'] as const;

export function getCategoryIndex(slug: string): number {
  const idx = CATEGORY_SLUGS.indexOf(slug as (typeof CATEGORY_SLUGS)[number]);
  return idx >= 0 ? idx : 0;
}

/** 상세 페이지 slug(글 id 등) → 카테고리 index (더미: 1→0, 2→1, 3→2, 4→3, featured→0) */
export function getArticleCategoryIndex(articleSlug: string): number {
  if (articleSlug === 'featured') return 0;
  const n = parseInt(articleSlug, 10);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n - 1, 3));
}
