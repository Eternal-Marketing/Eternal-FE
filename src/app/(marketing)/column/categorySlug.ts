import type { ColumnCategoryCode } from '@/lib/api';

/**
 * 칼럼 카테고리 slug·한글명·인덱스 유틸
 * - CATEGORY_SLUGS: URL용 slug 목록
 * - CATEGORY_NAMES: 브레드크럼·뱃지용 한글명
 * - CATEGORY_CODES: API categoryCode (인덱스 순서)
 * - getCategoryIndex(slug): slug → 0~3 인덱스
 * - getCategoryCode(index): 인덱스 → API categoryCode
 * - getArticleCategoryIndex(articleSlug): 글 slug → 카테고리 인덱스 (featured→0, 숫자→N-1)
 */
export const CATEGORY_SLUGS = ['bayiral', 'performance', 'sns', 'video'] as const;

export const CATEGORY_NAMES = ['바이럴 마케팅', '퍼포먼스 마케팅', 'SNS 마케팅', '영상 콘텐츠 마케팅'] as const;

/** API categoryCode (인덱스 0~4) */
export const CATEGORY_CODES: ColumnCategoryCode[] = [
  'VIRAL_MARKETING',
  'PERFORMANCE_MARKETING',
  'SNS_MARKETING',
  'VIDEO_CONTENT_MARKETING',
  'ETERNAL_MARKETING',
];

export function getCategoryCode(index: number): ColumnCategoryCode {
  return (CATEGORY_CODES[index] ?? CATEGORY_CODES[0]) as ColumnCategoryCode;
}

export function getCategoryIndex(slug: string): number {
  const s = (slug || '').toLowerCase().trim();
  const idx = CATEGORY_SLUGS.indexOf(s as (typeof CATEGORY_SLUGS)[number]);
  if (idx >= 0) return idx;
  // API가 반환할 수 있는 slug 형식 매핑 (viral-marketing, performance 등)
  if (/viral|bayiral/.test(s)) return 0;
  if (/performance/.test(s)) return 1;
  if (/sns/.test(s)) return 2;
  if (/video|영상/.test(s)) return 3;
  if (/eternal/.test(s)) return 4;
  return 0;
}

export function getArticleCategoryIndex(articleSlug: string): number {
  if (articleSlug === 'featured') return 0;
  const n = parseInt(articleSlug, 10);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n - 1, 3));
}
