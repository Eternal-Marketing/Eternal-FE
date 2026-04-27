import type { Metadata } from "next";
import { siteOgImage } from "@/lib/siteOgImage";
import type { Column } from "@/lib/api";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://eternalmarketing.co.kr").replace(/\/$/, "");

export const defaultTitle = "이터널마케팅 공식 홈페이지 | 맘카페·블로그·플레이스·SNS 마케팅 대행사";

export const defaultDescription =
  "이터널마케팅 공식 홈페이지. 맘카페 광고·홍보, 블로그 상위노출·관리 대행, 네이버 플레이스 상위노출, 인스타그램 마케팅·계정 관리, 커뮤니티 바이럴을 지원합니다.";

export function toSiteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function cleanSeoText(value: string | null | undefined, fallback: string, maxLength = 155): string {
  const text = (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return fallback;
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trim()}…` : text;
}

export function columnSeoMetadata(column: Column, path: string): Metadata {
  const title = column.title || "마케팅 칼럼";
  const description = cleanSeoText(
    column.excerpt || column.content,
    "맘카페·블로그·커뮤니티·바이럴·SNS 마케팅 전략과 사례를 칼럼으로 정리했습니다.",
  );
  const image = column.thumbnailUrl?.trim() || siteOgImage.url;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `이터널마케팅 | ${title}`,
      description,
      url: path,
      type: "article",
      images: [{ url: image, alt: title }],
      publishedTime: column.publishedAt,
      modifiedTime: column.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `이터널마케팅 | ${title}`,
      description,
      images: [image],
    },
  };
}
