'use client';
/**
 * 칼럼 목록/카테고리 공통 콘텐츠
 * - 히어로 섹션은 React.memo로 마운트 후 리렌더링 없음
 * - 탭 클릭 시 URL 변경 없이 state로 카테고리 전환 → 히어로 유지
 */
import { useEffect, useState, memo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

const PLACEHOLDER_IMAGE = '/images/column-background2.png';
const DEFAULT_LIMIT = 10;

/* ─────────────────────────────────────────────
   히어로 섹션 - memo로 감싸 절대 리렌더링 안 됨
───────────────────────────────────────────── */
const ColumnHero = memo(function ColumnHero() {
  return (
    <section className="relative w-full min-h-[726px] sm:min-h-[320px] lg:h-[420px] overflow-hidden" data-node-id="804:486">
      {/* 데스크탑 배경 */}
      <div className="absolute inset-0 hidden sm:block">
        <Image
          src="/images/column-background2.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          loading="eager"
        />
      </div>
      {/* 모바일 배경 */}
      <div className="absolute inset-0 sm:hidden">
        <Image
          src="/images/pngs/column-mobile-png.png"
          alt=""
          fill
          className="object-contain object-top"
          sizes="100vw"
          priority
        />
      </div>
      <div className="relative z-10 h-full min-h-[726px] sm:min-h-[320px] flex flex-col items-center text-center px-4 pt-0 sm:pt-16 pb-[200px] sm:pb-16 lg:pt-14 lg:pb-20 gap-6 sm:gap-0 justify-center sm:justify-start">
        <h1
          className="m-0 mt-0 sm:mt-12 lg:mt-12 font-sans text-[32px] sm:text-[32px] lg:text-[40px] font-bold leading-normal text-center"
          data-node-id="804:497"
        >
          <span className="text-[#6d94ff] block sm:inline">ETERNAL MARKETING</span>
          <span className="text-white/80 block sm:inline sm:ml-2">COLUMN</span>
        </h1>
        <Image
          src="/images/logo.svg"
          alt="Eternal Marketing Logo"
          width={80}
          height={46}
          className="w-[70px] sm:w-[80px] h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] sm:mt-6"
        />
        <div className="font-sans text-[18px] sm:text-[14px] leading-relaxed text-white text-center sm:mt-8 sm:px-4">
          <p className="m-0 font-sans font-extralight">막막했던 마케팅,</p>
          <p className="m-0 font-sans font-extrabold text-[20px] sm:text-[16px]">이터널의 기준과 데이터로 모두 공개합니다</p>
        </div>
      </div>
    </section>
  );
});

/* ─────────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────────── */
export default function ColumnPageContent({ activeCategorySlug }: { activeCategorySlug?: string }) {
  const router = useRouter();
  const { categories } = useCategories(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // 현재 선택된 카테고리 slug를 state로 관리 (URL 변경 없이 전환)
  const useApiCategories = categories.length > 0;
  const defaultSlug = useApiCategories ? (categories[0]?.slug ?? '') : (FALLBACK_CATEGORIES[0]?.slug ?? 'bayiral');
  const [activeSlug, setActiveSlug] = useState<string>(activeCategorySlug ?? defaultSlug);

  // categories 로드 후 초기 slug 보정
  useEffect(() => {
    if (categories.length > 0 && !activeCategorySlug) {
      setActiveSlug(categories[0].slug);
    }
    if (activeCategorySlug) {
      setActiveSlug(activeCategorySlug);
    }
  }, [categories, activeCategorySlug]);

  const activeCategory = useApiCategories
    ? categories.find((c) => c.slug === activeSlug) ?? categories[0]
    : null;
  const effectiveName = useApiCategories
    ? (activeCategory?.name ?? categories[0]?.name ?? '')
    : (FALLBACK_CATEGORIES.find((c) => c.slug === activeSlug)?.name ?? FALLBACK_CATEGORIES[0].name);
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
      : { page: 1, limit: DEFAULT_LIMIT, status: 'PUBLISHED' as const, categoryCode: getCategoryCode(getCategoryIndex(activeSlug)), orderBy: 'publishedAt' as const, orderDirection: 'desc' as const };
    getColumns(params)
      .then((data) => setColumns(data.columns ?? []))
      .catch((err) => setError(err?.message ?? '칼럼을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [activeSlug, useApiCategories, activeCategory?.id]);

  // 탭 클릭: state만 변경 (URL 변경 없음 → 히어로 리렌더링 없음)
  const handleTabClick = useCallback((slug: string, isFirst: boolean) => {
    setActiveSlug(slug);
    // URL도 함께 업데이트 (뒤로가기 등을 위해) - replace로 히스토리 스택 유지
    router.replace(isFirst ? '/column' : `/column/category/${slug}`, { scroll: false });
  }, [router]);

  const featured = columns[0];
  const listColumns = columns.slice(1);

  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      {/* 히어로: memo로 감싸져 있어 탭 전환 시 리렌더링 안 됨 */}
      <ColumnHero />

      <section className="w-full bg-[#f6f6f6]" data-node-id="804:499">
        <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-[60px]">
          <p
            className="font-sans text-[14px] font-thin text-main mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.5s', animationFillMode: 'both', animationDuration: '0.5s' }}
          >
            <Link href="/" className="text-main no-underline hover:text-primary transition-colors">홈</Link>
            <span className="mx-3 text-sub3">|</span>
            <Link href="/column" className="text-main no-underline hover:text-primary transition-colors">칼럼</Link>
            <span className="mx-3 text-sub3">|</span>
            <span className="font-normal">{effectiveName}</span>
          </p>

          <div
            className="animate-fade-in-up mb-8 sm:mb-10"
            style={{ animationDelay: '0.6s', animationFillMode: 'both', animationDuration: '0.5s' }}
          >
            {/* 탭 목록 + 데스크탑에서만 칼럼생성하기 같은 줄 */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              {tabList.map((cat) => {
                const globalIdx = tabList.indexOf(cat);
                const isFirst = globalIdx === 0;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleTabClick(cat.slug, isFirst)}
                    className={`py-1 px-0 font-sans text-[14px] sm:text-[16px] transition-all duration-200 border-0 bg-transparent cursor-pointer border-b-2 hover:text-primary hover:border-primary ${
                      activeSlug === cat.slug
                        ? 'font-medium text-primary border-primary'
                        : 'font-light text-main border-gray-300'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
              {/* 데스크탑: 칼럼 생성하기 탭과 같은 줄 오른쪽 */}
              {mounted && hasTokens() && (
                <Link
                  href={`/column/new?categorySlug=${encodeURIComponent(activeSlug)}`}
                  className="hidden sm:inline-block ml-auto py-2 px-4 font-sans text-[14px] font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors no-underline"
                >
                  칼럼 생성하기
                </Link>
              )}
            </div>

            {/* 모바일: 칼럼 생성하기 별도 줄 */}
            {mounted && hasTokens() && (
              <div className="sm:hidden mt-3">
                <Link
                  href={`/column/new?categorySlug=${encodeURIComponent(activeSlug)}`}
                  className="inline-block py-2 px-4 font-sans text-[14px] font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors no-underline"
                >
                  칼럼 생성하기
                </Link>
              </div>
            )}
          </div>

          {error && (
            <p className="font-sans text-[14px] text-sub1 mb-6" role="alert">{error}</p>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-sub2 font-sans text-[14px]">
              칼럼을 불러오는 중입니다.
            </div>
          ) : (
            <>
              {featured && (
                <Link
                  href={`/column/id/${featured.id}`}
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
                  </div>
                </Link>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {listColumns.map((column, idx) => (
                  <ArticleCard
                    key={column.id}
                    column={column}
                    nodeId={`804:${508 + idx * 5}`}
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

/* ─────────────────────────────────────────────
   아티클 카드
───────────────────────────────────────────── */
function ArticleCard({
  column,
  nodeId,
  style: animationStyle,
}: {
  column: Column;
  nodeId: string;
  style?: React.CSSProperties;
}) {
  const thumbSrc = column.thumbnailUrl || PLACEHOLDER_IMAGE;
  return (
    <Link
      href={`/column/id/${column.id}`}
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
    </Link>
  );
}
