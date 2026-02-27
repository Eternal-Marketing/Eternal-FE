'use client';
/**
 * 칼럼 목록/카테고리 공통 콘텐츠
 * - 히어로 → 브레드크럼 → 카테고리 탭 (API categories 또는 고정 목록) → 픽처드 아티클 → 아티클 그리드
 * - activeCategorySlug로 현재 카테고리 결정, 탭 클릭 시 /column 또는 /column/category/:slug 이동
 * - GET /api/columns 연동 (categoryId 또는 categoryCode, status=PUBLISHED)
 */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getColumns } from '@/lib/api';
import type { Column } from '@/lib/api';
import { hasTokens } from '@/lib/auth/token';
import { useCategories } from '@/hooks/useCategories';
import { CATEGORY_SLUGS, getCategoryCode, getCategoryIndex } from './categorySlug';

export const FALLBACK_CATEGORIES = [
  { name: '바이럴 마케팅', slug: 'bayiral' },
  { name: '퍼포먼스 마케팅', slug: 'performance' },
  { name: 'SNS 마케팅', slug: 'sns' },
  { name: '영상 콘텐츠 마케팅', slug: 'video' },
];

export { CATEGORY_SLUGS };
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

const PLACEHOLDER_IMAGE = '/images/column/column-background.svg';
const DEFAULT_LIMIT = 10;

function formatColumnDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return isoString;
  }
}

export default function ColumnPageContent({ activeCategorySlug }: { activeCategorySlug?: string }) {
  const { categories } = useCategories(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const useApiCategories = categories.length > 0;
  const resolvedSlug = activeCategorySlug ?? (useApiCategories ? categories[0]?.slug : FALLBACK_CATEGORIES[0]?.slug) ?? 'bayiral';
  const activeCategory = useApiCategories
    ? categories.find((c) => c.slug === resolvedSlug) ?? categories[0]
    : null;
  const effectiveSlug = useApiCategories ? (activeCategory?.slug ?? categories[0]?.slug ?? '') : resolvedSlug;
  const effectiveName = useApiCategories ? (activeCategory?.name ?? categories[0]?.name ?? '') : (FALLBACK_CATEGORIES.find((c) => c.slug === resolvedSlug)?.name ?? FALLBACK_CATEGORIES[0].name);
  const tabList = useApiCategories
    ? categories.map((c) => ({ name: c.name, slug: c.slug }))
    : FALLBACK_CATEGORIES;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = useApiCategories && activeCategory
      ? { page: 1, limit: DEFAULT_LIMIT, status: 'PUBLISHED' as const, categoryId: activeCategory.id, orderBy: 'publishedAt' as const, orderDirection: 'desc' as const }
      : { page: 1, limit: DEFAULT_LIMIT, status: 'PUBLISHED' as const, categoryCode: getCategoryCode(getCategoryIndex(resolvedSlug)), orderBy: 'publishedAt' as const, orderDirection: 'desc' as const };
    getColumns(params)
      .then((data) => setColumns(data.columns ?? []))
      .catch((err) => setError(err?.message ?? '칼럼을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [resolvedSlug, useApiCategories, activeCategory?.id]);

  const featured = columns[0];
  const listColumns = columns.slice(1);
  const categorySlug = effectiveSlug;

  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      <section className="relative w-full min-h-[280px] sm:min-h-[320px] lg:h-[420px] overflow-hidden" data-node-id="804:486">
        <div className="absolute inset-0">
          <Image
            src="/images/column/column-background.svg"
            alt=""
            fill
            className="object-cover animate-fade-in-up"
            sizes="100vw"
            priority
            style={{ animationDuration: '0.6s', animationFillMode: 'both' }}
          />
        </div>
        <div className="relative z-10 h-full min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center text-center px-4 gap-6 sm:gap-8">
          <h1 className="m-0 font-sans text-[26px] sm:text-[32px] lg:text-[40px] font-bold leading-normal animate-fade-in-up" data-node-id="804:497" style={{ animationDelay: '0.2s', animationFillMode: 'both', animationDuration: '0.6s' }}>
            <span className="text-white/80">ETERNAL MARKETING</span> <span className="text-[#6d94ff]">COLUMN</span>
          </h1>
          <Image src="/images/logo.svg" alt="Eternal Marketing Logo" width={80} height={46} className="w-[70px] sm:w-[84px] lg:w-[110px] h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both', animationDuration: '0.6s' }} />
          <div className="font-sans text-[12px] sm:text-[14px] leading-snug text-white animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both', animationDuration: '0.6s' }}>
            <p className="m-0 font-sans font-extralight">막막했던 마케팅,</p>
            <p className="m-0 font-sans font-extralight">이터널의 기준과 데이터로 모두 공개합니다</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f6f6f6]" data-node-id="804:499">
        <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-[60px]">
          <p
            className="font-sans text-[14px] font-thin text-main mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.5s', animationFillMode: 'both', animationDuration: '0.5s' }}
          >
            <Link href="/" className="text-main no-underline hover:text-primary transition-colors">
              홈
            </Link>
            <span className="mx-3 text-sub3">|</span>
            <Link href="/column" className="text-main no-underline hover:text-primary transition-colors">
              칼럼
            </Link>
            <span className="mx-3 text-sub3">|</span>
            <span className="font-normal">{effectiveName}</span>
          </p>

          <div
            className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8 sm:mb-10 animate-fade-in-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'both', animationDuration: '0.5s' }}
          >
            {tabList.map((cat, idx) => (
              <Link
                key={cat.slug}
                href={idx === 0 ? '/column' : `/column/category/${cat.slug}`}
                className={`py-1 px-0 font-sans text-[14px] sm:text-[16px] transition-all duration-200 border-0 bg-transparent cursor-pointer no-underline border-b-2 hover:text-primary hover:border-primary ${
                  effectiveSlug === cat.slug
                    ? 'font-medium text-primary border-primary'
                    : 'font-light text-main border-transparent'
                }`}
                data-node-id={`804:${500 + idx}`}
              >
                {cat.name}
              </Link>
            ))}
            {mounted && hasTokens() && (
              <Link
                href="/column/new"
                className="ml-auto py-2 px-4 font-sans text-[14px] font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors no-underline"
              >
                칼럼 생성하기
              </Link>
            )}
          </div>

          {error && (
            <p className="font-sans text-[14px] text-sub1 mb-6" role="alert">
              {error}
            </p>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-sub2 font-sans text-[14px]">
              칼럼을 불러오는 중입니다.
            </div>
          ) : (
            <>
              {featured && (
                <Link
                  href={`/column/${featured.slug}?category=${categorySlug}`}
                  className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-10 sm:mb-12 no-underline group animate-fade-in-up"
                  style={{ animationDelay: '0.7s', animationFillMode: 'both', animationDuration: '0.5s' }}
                >
                  <div
                    className="w-full lg:w-[686px] min-h-[200px] sm:min-h-[260px] h-[240px] sm:h-[300px] lg:h-[387px] bg-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden flex-shrink-0 rounded-lg lg:rounded-none relative"
                    data-node-id="804:542"
                  >
                    <Image
                      src={featured.thumbnailUrl || PLACEHOLDER_IMAGE}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 1024px) 100vw, 686px"
                      unoptimized={featured.thumbnailUrl?.startsWith('http') === true}
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h2
                      className="m-0 font-sans text-[24px] sm:text-[28px] font-bold leading-normal text-main mb-3 sm:mb-6 group-hover:text-primary transition-colors"
                      data-node-id="804:539"
                    >
                      {featured.title}
                    </h2>
                    <p
                      className="m-0 font-sans text-[16px] sm:text-[18px] font-light leading-relaxed text-main mb-4 sm:mb-6 max-w-[439px] line-clamp-3"
                      data-node-id="804:541"
                    >
                      {featured.excerpt || featured.title}
                    </p>
                    <p className="m-0 font-sans text-[12px] sm:text-[14px] font-thin text-main" data-node-id="804:540">
                      {formatColumnDate(featured.publishedAt)}
                    </p>
                  </div>
                </Link>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {listColumns.map((column, idx) => (
                  <ArticleCard
                    key={column.id}
                    column={column}
                    nodeId={`804:${508 + idx * 5}`}
                    categorySlug={categorySlug}
                    style={{ animationDelay: `${0.85 + idx * 0.08}s`, animationFillMode: 'both', animationDuration: '0.5s' }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function ArticleCard({
  column,
  nodeId,
  categorySlug,
  style: animationStyle,
}: {
  column: Column;
  nodeId: string;
  categorySlug: string;
  style?: React.CSSProperties;
}) {
  const thumbSrc = column.thumbnailUrl || PLACEHOLDER_IMAGE;
  return (
    <Link
      href={`/column/${column.slug}?category=${categorySlug}`}
      className="flex flex-col cursor-pointer group no-underline animate-fade-in-up"
      data-node-id={nodeId}
      style={animationStyle}
    >
      <div className="w-full min-h-[160px] sm:min-h-[200px] h-[180px] sm:h-[233px] bg-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] mb-2 overflow-hidden rounded-lg relative">
        <Image
          src={thumbSrc}
          alt=""
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={column.thumbnailUrl?.startsWith('http') === true}
        />
      </div>

      <h3 className="m-0 mt-2 font-sans text-[15px] sm:text-[18px] font-medium leading-normal text-main">{column.title}</h3>
      <p className="m-0 mt-1 font-sans text-[12px] sm:text-[14px] font-light leading-relaxed text-main line-clamp-2">
        {column.excerpt || column.title}
      </p>
      <p className="m-0 mt-2 font-sans text-[10px] font-thin text-main">{formatColumnDate(column.publishedAt)}</p>
    </Link>
  );
}
