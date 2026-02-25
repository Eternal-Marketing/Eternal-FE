import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_NAMES, getCategoryIndex } from "../categorySlug";
import { getColumnBySlug } from "@/lib/api";
import AdminColumnActions from "@/components/column/AdminColumnActions";

/**
 * 칼럼 상세 페이지 (/column/:slug)
 * - GET /api/columns/slug/:slug 연동
 * - searchParams.category로 카테고리명 보정
 */

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const column = await getColumnBySlug(slug);
  return {
    title: column ? `${column.title} | Eternal Marketing` : "칼럼 | Eternal Marketing",
    description: column?.excerpt ?? undefined,
  };
}

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return isoString;
  }
}

export default async function ColumnDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { category: categoryFromQuery } = await searchParams;

  const column = await getColumnBySlug(slug, true);
  if (!column) notFound();

  const categoryIndex = categoryFromQuery ? getCategoryIndex(categoryFromQuery) : 0;
  const categoryName = CATEGORY_NAMES[categoryIndex];
  const thumbnailSrc = column.thumbnailUrl || "/images/column/column-background.svg";
  const publishedDate = formatDate(column.publishedAt);

  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      <div className="w-full pt-[74px]">
        <div className="w-full max-w-[1163px] mx-auto px-4 py-4">
          <p className="font-sans text-[14px] font-thin text-main" data-node-id="804:836">
            <Link href="/" className="text-main no-underline hover:text-primary transition-colors">홈</Link>
            <span className="mx-3 text-sub3">|</span>
            <Link href="/column" className="text-main no-underline hover:text-primary transition-colors">칼럼</Link>
            <span className="mx-3 text-sub3">|</span>
            <span className="font-normal">{categoryName}</span>
          </p>
        </div>
      </div>

      <article className="w-full max-w-[603px] mx-auto px-4 pb-[80px]" data-node-id="804:791">
        <div
          className="inline-flex items-center justify-center px-[6px] py-[2px] bg-[#f6f6f6] rounded-[3px] mb-6"
          data-node-id="804:792"
        >
          <span className="font-sans text-[12px] font-light text-sub1" data-node-id="804:793">
            {categoryName}
          </span>
        </div>

        <div className="flex items-start gap-4 mb-4">
        <h1
          className="m-0 font-sans text-[32px] font-semibold leading-normal text-main mb-4 flex-1 min-w-0"
          data-node-id="804:794"
        >
          {column.title}
        </h1>

        <AdminColumnActions columnId={column.id} columnSlug={column.slug} />
        </div>

        {column.excerpt && (
          <p
            className="m-0 font-sans text-[14px] font-normal leading-relaxed text-sub1 mb-2"
            data-node-id="804:796"
          >
            {column.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 mb-6">
          <span className="font-sans text-[10px] font-thin text-main" data-node-id="804:800">
            {publishedDate}
          </span>
          <div className="flex items-center gap-2">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/images/footer/Instagram.svg" alt="" className="w-[13px] h-[13px]" />
            </a>
            <a href="https://www.kakaocorp.com" target="_blank" rel="noreferrer" aria-label="Kakao">
              <img src="/images/footer/kakao.svg" alt="" className="w-[10px] h-[9px]" />
            </a>
          </div>
        </div>

        <div
          className="w-full h-[280px] md:h-[314px] mb-10 overflow-hidden"
          data-node-id="804:803"
        >
          <img
            src={thumbnailSrc}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* 본문 */}
        {column.content && (
          <div
            className="font-sans text-[14px] font-normal leading-relaxed text-main mb-10"
            dangerouslySetInnerHTML={{ __html: column.content }}
          />
        )}

        {/* Share Article (Figma 804:799, 804:804~805) */}
        <div className="mt-12 mb-16">
          <p 
            className="m-0 font-sans text-[18px] font-medium leading-normal text-main mb-4"
            data-node-id="804:799"
          >
            Share article
          </p>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/images/footer/Instagram.svg" alt="" className="w-[24px] h-[24px]" data-node-id="804:805" />
            </a>
            <a href="https://www.kakaocorp.com" target="_blank" rel="noreferrer" aria-label="Kakao">
              <img src="/images/footer/kakao.svg" alt="" className="w-[18px] h-[18px]" data-node-id="804:804" />
            </a>
          </div>
        </div>

        {/* More Columns Section (Figma 804:806~) */}
        <section className="mt-10" data-node-id="804:806">
          <div className="flex items-center justify-between mb-4">
            <h3 className="m-0 font-sans text-[22px] font-semibold leading-normal text-main">
              더 많은 칼럼
            </h3>
            <Link 
              href="/column" 
              className="font-sans text-[12px] font-light text-main no-underline hover:text-primary transition-colors"
              data-node-id="804:808"
            >
              See more posts &gt;
            </Link>
          </div>

          {/* Divider (Figma 804:807) */}
          <div className="w-full h-[1px] bg-sub3/50 mb-6" data-node-id="804:807" />

          {/* 관련 칼럼: 추후 API 연동 예정 */}
        </section>
      </article>
    </main>
  );
}
