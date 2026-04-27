import type { Metadata } from 'next';
import { getColumnById } from '@/lib/api';
import { columnSeoMetadata } from '@/lib/seo';
import { siteOgImage } from '@/lib/siteOgImage';
import ColumnDetailClient from '../../[slug]/ColumnDetailClient';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const column = await getColumnById(id, false, false);
  if (column?.slug) {
    return {
      ...columnSeoMetadata(column, `/column/${column.slug}`),
      robots: { index: false, follow: true },
    };
  }

  const title = '마케팅 칼럼';
  const description =
    '맘카페·블로그·커뮤니티·바이럴·SNS 마케팅 전략과 사례를 칼럼으로 정리했습니다.';

  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: {
      title: `이터널마케팅 | ${title}`,
      description,
      url: `/column/id/${id}`,
      type: 'article',
      images: [siteOgImage],
    },
    twitter: {
      title: `이터널마케팅 | ${title}`,
      description,
      images: [siteOgImage.url],
    },
  };
}

export default async function ColumnDetailByIdPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  await searchParams;
  // ColumnDetailClient는 slug로 fetch하지만, 여기서는 id를 slug 자리에 넣어
  // 아래에서 id 기반으로 fetch하도록 ColumnDetailClient를 확장한다.
  return <ColumnDetailClient slug={id} />;
}

