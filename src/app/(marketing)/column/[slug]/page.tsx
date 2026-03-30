import type { Metadata } from "next";
import { siteOgImage } from "@/lib/siteOgImage";
import ColumnDetailClient from "./ColumnDetailClient";

/**
 * 칼럼 상세 페이지 (/column/:slug)
 * - GET /api/columns/slug/:slug 연동
 * - searchParams.category로 카테고리명 보정
 */

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = "마케팅 칼럼";
  const description =
    "맘카페·블로그·커뮤니티·바이럴·SNS 마케팅 전략과 사례를 칼럼으로 정리했습니다.";

  return {
    title,
    description,
    openGraph: {
      title: `이터널마케팅 | ${title}`,
      description,
      url: `/column/${slug}`,
      type: "article",
      images: [siteOgImage],
    },
    twitter: {
      title: `이터널마케팅 | ${title}`,
      description,
      images: [siteOgImage.url],
    },
  };
}

export default async function ColumnDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  await searchParams;

  return <ColumnDetailClient slug={slug} />;
}
