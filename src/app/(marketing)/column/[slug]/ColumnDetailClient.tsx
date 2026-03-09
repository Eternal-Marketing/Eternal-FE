'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getColumnById, getColumnBySlug, getColumns } from '@/lib/api';
import type { Column, ColumnCategoryCode } from '@/lib/api';
import AdminColumnActions from '@/components/column/AdminColumnActions';
import { getCategoryCode, getCategoryIndex } from '../categorySlug';

const DEFAULT_THUMBNAIL = '/images/column-background2.png';

export default function ColumnDetailClient({ slug }: { slug: string }) {
  const [column, setColumn] = useState<Column | null>(null);
  const [relatedColumns, setRelatedColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setImgError(false);

    const looksLikeUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slug);

    const fetcher = looksLikeUuid
      ? getColumnById(slug, true, false)
      : getColumnBySlug(slug, true);

    fetcher
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setNotFound(true);
          setColumn(null);
          return;
        }
        setColumn(data);
        setImgError(false);
      })
      .catch(() => {
        if (cancelled) return;
        // 기존 API 유틸이 에러를 null로 삼키는 경우가 있어서 여기선 '없음'으로 처리
        setNotFound(true);
        setColumn(null);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!column) return;
    const categoryId = column.categoryId;
    const categoryCode: ColumnCategoryCode | undefined = column.category?.slug
      ? getCategoryCode(getCategoryIndex(column.category.slug))
      : undefined;
    getColumns({
      limit: 6,
      status: 'PUBLISHED',
      categoryId: categoryId || undefined,
      categoryCode: categoryId ? undefined : (categoryCode ?? 'VIRAL_MARKETING'),
      orderBy: 'publishedAt',
      orderDirection: 'desc',
    })
      .then(({ columns }) => {
        const filtered = columns.filter((c) => c.id !== column.id).slice(0, 3);
        setRelatedColumns(filtered);
      })
      .catch(() => setRelatedColumns([]));
  }, [column]);

  const categoryName = useMemo(() => column?.category?.name ?? '칼럼', [column]);
  const thumbnailSrc = useMemo(() => {
    if (imgError || !column?.thumbnailUrl?.trim()) return DEFAULT_THUMBNAIL;
    return column.thumbnailUrl;
  }, [column, imgError]);
  if (loading) {
    return (
      <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
        <div className="w-full pt-[74px]">
          <div className="w-full max-w-[1163px] mx-auto px-4 py-6">
            <p className="font-sans text-[14px] font-thin text-main">
              <Link href="/" className="text-main no-underline hover:text-primary transition-colors">홈</Link>
              <span className="mx-3 text-sub3">|</span>
              <Link href="/column" className="text-main no-underline hover:text-primary transition-colors">칼럼</Link>
            </p>
            <div className="mt-10 rounded-xl bg-white p-6 shadow-sm">
              <p className="m-0 font-sans text-[14px] font-light text-sub1">칼럼을 불러오는 중입니다.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !column) {
    return (
      <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
        <div className="w-full pt-[74px]">
          <div className="w-full max-w-[1163px] mx-auto px-4 py-6">
            <p className="font-sans text-[14px] font-thin text-main">
              <Link href="/" className="text-main no-underline hover:text-primary transition-colors">홈</Link>
              <span className="mx-3 text-sub3">|</span>
              <Link href="/column" className="text-main no-underline hover:text-primary transition-colors">칼럼</Link>
            </p>
            <div className="mt-10 rounded-xl bg-white p-6 shadow-sm">
              <h1 className="m-0 font-sans text-[18px] font-semibold text-main">해당 칼럼을 찾을 수 없습니다.</h1>
              <p className="mt-2 mb-0 font-sans text-[14px] font-light text-sub1">
                주소가 잘못되었거나 삭제된 칼럼일 수 있습니다.
              </p>
              <div className="mt-4">
                <Link
                  href="/column"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 font-sans text-[14px] font-medium text-white no-underline hover:bg-primary/90 transition-colors"
                >
                  칼럼 목록으로
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
        <div className="inline-flex items-center justify-center px-[6px] py-[2px] bg-[#f6f6f6] rounded-[3px] mb-6" data-node-id="804:792">
          <span className="font-sans text-[12px] font-light text-sub1" data-node-id="804:793">
            {categoryName}
          </span>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <h1 className="m-0 font-sans text-[32px] font-semibold leading-normal text-main mb-4 flex-1 min-w-0" data-node-id="804:794">
            {column.title}
          </h1>
          <AdminColumnActions columnId={column.id} columnSlug={column.slug} />
        </div>

        {column.excerpt && (
          <p className="m-0 font-sans text-[14px] font-normal leading-relaxed text-sub1 mb-2" data-node-id="804:796">
            {column.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <a href="https://open.kakao.com/me/eternalmarketing" target="_blank" rel="noreferrer" aria-label="카카오톡 오픈채팅">
              <img src="/images/footer/kakao.svg" alt="" className="w-[10px] h-[9px]" />
            </a>
            <a href="https://www.instagram.com/eternal__marketing?igsh=MWVhNHF2dXBiYmU0dw%3D%3D" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/images/footer/Instagram.svg" alt="" className="w-[13px] h-[13px]" />
            </a>
          </div>
        </div>

        <div className="w-full h-[280px] mb-10 overflow-hidden bg-[#e5e5e5]" data-node-id="804:803">
          <img
            src={thumbnailSrc}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>

        {column.content && (
          <div
            className="column-body font-sans text-[17px] font-normal leading-[1.75] text-main mb-10"
            dangerouslySetInnerHTML={{ __html: column.content }}
          />
        )}

        <div className="mt-12 mb-16">
          <p className="m-0 font-sans text-[18px] font-medium leading-normal text-main mb-4" data-node-id="804:799">
            Share article
          </p>
          <div className="flex items-center gap-3">
            <a href="https://open.kakao.com/me/eternalmarketing" target="_blank" rel="noreferrer" aria-label="카카오톡 오픈채팅">
              <img src="/images/footer/kakao.svg" alt="" className="w-[18px] h-[18px]" data-node-id="804:804" />
            </a>
            <a href="https://www.instagram.com/eternal__marketing?igsh=MWVhNHF2dXBiYmU0dw%3D%3D" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/images/footer/Instagram.svg" alt="" className="w-[24px] h-[24px]" data-node-id="804:805" />
            </a>
          </div>
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="m-0 font-sans text-[22px] font-semibold leading-normal text-main">더 많은 칼럼</h3>
            <Link
              href="/column"
              className="font-sans text-[12px] font-light text-main no-underline hover:text-primary transition-colors"
            >
              See more posts &gt;
            </Link>
          </div>
          <div className="w-full h-[1px] bg-sub3/50 mb-6" />
          {relatedColumns.length > 0 ? (
            <div className="space-y-0 divide-y divide-[#eee]">
              {relatedColumns.map((c) => (
                <Link
                  key={c.id}
                  href={`/column/${c.slug}`}
                  className="flex gap-4 py-5 first:pt-0 last:pb-0 no-underline text-main hover:opacity-90 transition-opacity"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="m-0 font-sans text-[16px] font-semibold leading-snug text-main mb-1 line-clamp-2">
                      {c.title}
                    </h4>
                    {c.excerpt && (
                      <p className="m-0 font-sans text-[14px] font-normal leading-relaxed text-main line-clamp-2 mb-2">
                        {c.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-[120px] h-[80px] rounded overflow-hidden bg-[#e5e5e5]">
                    <Image
                      src={c.thumbnailUrl || DEFAULT_THUMBNAIL}
                      alt=""
                      width={120}
                      height={80}
                      className="w-full h-full object-cover"
                      unoptimized={c.thumbnailUrl?.startsWith('http')}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_THUMBNAIL;
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="font-sans text-[14px] text-sub2 py-4">다른 칼럼이 없습니다.</p>
          )}
        </section>
      </article>
    </main>
  );
}

