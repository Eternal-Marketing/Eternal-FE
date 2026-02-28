'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getColumnById, getColumnBySlug } from '@/lib/api';
import type { Column } from '@/lib/api';
import AdminColumnActions from '@/components/column/AdminColumnActions';

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return isoString;
  }
}

export default function ColumnDetailClient({ slug }: { slug: string }) {
  const [column, setColumn] = useState<Column | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

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

  const categoryName = useMemo(() => column?.category?.name ?? '칼럼', [column]);
  const thumbnailSrc = useMemo(
    () => column?.thumbnailUrl || '/images/column/column-background.svg',
    [column],
  );
  const publishedDate = useMemo(() => (column?.publishedAt ? formatDate(column.publishedAt) : ''), [column]);

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

        <div className="w-full h-[280px] mb-10 overflow-hidden" data-node-id="804:803">
          <img src={thumbnailSrc} alt="" className="w-full h-full object-cover" />
        </div>

        {column.content && (
          <div
            className="font-sans text-[14px] font-normal leading-relaxed text-main mb-10"
            dangerouslySetInnerHTML={{ __html: column.content }}
          />
        )}

        <div className="mt-12 mb-16">
          <p className="m-0 font-sans text-[18px] font-medium leading-normal text-main mb-4" data-node-id="804:799">
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

        <section className="mt-10" data-node-id="804:806">
          <div className="flex items-center justify-between mb-4">
            <h3 className="m-0 font-sans text-[22px] font-semibold leading-normal text-main">더 많은 칼럼</h3>
            <Link
              href="/column"
              className="font-sans text-[12px] font-light text-main no-underline hover:text-primary transition-colors"
              data-node-id="804:808"
            >
              See more posts &gt;
            </Link>
          </div>
          <div className="w-full h-[1px] bg-sub3/50 mb-6" data-node-id="804:807" />
        </section>
      </article>
    </main>
  );
}

