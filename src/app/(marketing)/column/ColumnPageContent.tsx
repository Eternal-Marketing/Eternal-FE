'use client';
/**
 * 칼럼 목록/카테고리 공통 콘텐츠
 * - 히어로 → 브레드크럼 → 카테고리 탭(바이럴/퍼포먼스/SNS/영상) → 픽처드 아티클 → 아티클 그리드
 * - activeCategoryIndex로 현재 카테고리 결정, 탭 클릭 시 /column 또는 /column/category/:slug 이동
 */
import Link from 'next/link';

export const CATEGORIES = [
  '바이럴 마케팅',
  '퍼포먼스 마케팅',
  'SNS 마케팅',
  '영상 콘텐츠 마케팅',
];

import { CATEGORY_SLUGS } from './categorySlug';

export { CATEGORY_SLUGS };
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

const FEATURED_ARTICLE = {
  title: '제목',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  date: 'Dec 03, 2025',
  image: '/images/column/column-background.svg',
};

const ARTICLES = Array(6).fill(null).map((_, i) => ({
  id: i + 1,
  title: '제목',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  date: 'Dec 03, 2025',
}));

export default function ColumnPageContent({ activeCategoryIndex }: { activeCategoryIndex: number }) {
  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      <section className="relative w-full min-h-[240px] sm:min-h-[280px] md:h-[340px] lg:h-[386px] overflow-hidden" data-node-id="804:486">
        <img src="/images/column/column-background.svg" alt="" className="absolute inset-0 w-full h-full object-cover animate-fade-in-up" style={{ animationDuration: '0.6s', animationFillMode: 'both' }} />
        <div className="relative z-10 h-full min-h-[240px] sm:min-h-[280px] md:min-h-0 flex flex-col items-center justify-center text-center px-4 py-10 sm:py-14">
          <h1 className="m-0 font-sans text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-normal text-white animate-fade-in-up" data-node-id="804:497" style={{ animationDelay: '0.2s', animationFillMode: 'both', animationDuration: '0.6s' }}>
            이터널 마케팅 칼럼
          </h1>
          <p className="m-0 mt-3 sm:mt-4 font-sans text-[14px] sm:text-[16px] md:text-[18px] font-medium leading-normal text-white animate-fade-in-up" data-node-id="804:498" style={{ animationDelay: '0.4s', animationFillMode: 'both', animationDuration: '0.6s' }}>
            막막했던 마케팅, 이터널의 기준과 데이터로 모두 공개합니다
          </p>
        </div>
      </section>

      <section className="w-full bg-[#f6f6f6]" data-node-id="804:499">
        <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:py-[60px]">
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
            <span className="font-normal">{CATEGORIES[activeCategoryIndex]}</span>
          </p>

          <div
            className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8 sm:mb-10 animate-fade-in-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'both', animationDuration: '0.5s' }}
          >
            {CATEGORIES.map((cat, idx) => (
              <Link
                key={cat}
                href={idx === 0 ? '/column' : `/column/category/${CATEGORY_SLUGS[idx]}`}
                className={`py-1 px-0 font-sans text-[14px] sm:text-[16px] md:text-[18px] transition-all duration-200 border-0 bg-transparent cursor-pointer no-underline border-b-2 hover:text-primary hover:border-primary ${
                  activeCategoryIndex === idx
                    ? 'font-medium text-primary border-primary'
                    : 'font-light text-main border-transparent'
                }`}
                data-node-id={`804:${500 + idx}`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <Link
            href={`/column/featured?category=${CATEGORY_SLUGS[activeCategoryIndex]}`}
            className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16 no-underline group animate-fade-in-up"
            style={{ animationDelay: '0.7s', animationFillMode: 'both', animationDuration: '0.5s' }}
          >
            <div
              className="w-full lg:w-[686px] min-h-[200px] sm:min-h-[260px] h-[240px] sm:h-[300px] lg:h-[387px] bg-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden flex-shrink-0 rounded-lg lg:rounded-none"
              data-node-id="804:542"
            >
              <img
                src={FEATURED_ARTICLE.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h2
                className="m-0 font-sans text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-normal text-main mb-3 sm:mb-6 group-hover:text-primary transition-colors"
                data-node-id="804:539"
              >
                {FEATURED_ARTICLE.title}
              </h2>
              <p
                className="m-0 font-sans text-[16px] sm:text-[18px] md:text-[20px] font-light leading-relaxed text-main mb-4 sm:mb-6 md:mb-8 max-w-[439px]"
                data-node-id="804:541"
              >
                {FEATURED_ARTICLE.description}
              </p>
              <p className="m-0 font-sans text-[12px] sm:text-[14px] font-thin text-main" data-node-id="804:540">
                {FEATURED_ARTICLE.date}
              </p>
            </div>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {ARTICLES.map((article, idx) => (
              <ArticleCard
                key={article.id}
                article={article}
                nodeId={`804:${508 + idx * 5}`}
                categorySlug={CATEGORY_SLUGS[activeCategoryIndex]}
                style={{ animationDelay: `${0.85 + idx * 0.08}s`, animationFillMode: 'both', animationDuration: '0.5s' }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ArticleCard({
  article,
  nodeId,
  categorySlug,
  style: animationStyle,
}: {
  article: { id: number; title: string; description: string; date: string };
  nodeId: string;
  categorySlug: string;
  style?: React.CSSProperties;
}) {
  return (
    <Link
      href={`/column/${article.id}?category=${categorySlug}`}
      className="flex flex-col cursor-pointer group no-underline animate-fade-in-up"
      data-node-id={nodeId}
      style={animationStyle}
    >
      <div className="w-full min-h-[160px] sm:min-h-[200px] h-[180px] sm:h-[233px] bg-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] mb-2 overflow-hidden rounded-lg">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-300" />
      </div>

      <h3 className="m-0 mt-2 font-sans text-[15px] sm:text-[18px] font-medium leading-normal text-main">{article.title}</h3>
      <p className="m-0 mt-1 font-sans text-[12px] sm:text-[14px] font-light leading-relaxed text-main line-clamp-2">
        {article.description}
      </p>
      <p className="m-0 mt-2 font-sans text-[10px] font-thin text-main">{article.date}</p>
    </Link>
  );
}
