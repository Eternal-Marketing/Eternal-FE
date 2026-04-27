import type { MetadataRoute } from 'next';
import { getColumns } from '@/lib/api';
import { CATEGORY_SLUGS } from '@/app/(marketing)/column/categorySlug';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eternalmarketing.co.kr').replace(/\/$/, '');

function toUrl(path: string): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

function isoDate(d: Date): string {
  return d.toISOString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = isoDate(new Date());

  const staticEntries: MetadataRoute.Sitemap = [
    { url: toUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: toUrl('/service'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: toUrl('/column'), lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: toUrl('/ai-diagnosis'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
    ...CATEGORY_SLUGS.map((slug) => ({
      url: toUrl(`/column/category/${slug}`),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
  ];

  // 동적(칼럼) URL: API 사용 가능할 때만 추가. 실패해도 sitemap은 정상적으로 반환.
  try {
    const data = await getColumns({
      page: 1,
      limit: 200,
      status: 'PUBLISHED',
      orderBy: 'publishedAt',
      orderDirection: 'desc',
    });
    const columnEntries: MetadataRoute.Sitemap = (data.columns ?? [])
      .filter((c) => Boolean(c?.slug))
      .map((c) => ({
        url: toUrl(`/column/${c.slug}`),
        lastModified: c.updatedAt ? c.updatedAt : c.publishedAt ? c.publishedAt : lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));

    return [...staticEntries, ...columnEntries];
  } catch {
    return staticEntries;
  }
}

