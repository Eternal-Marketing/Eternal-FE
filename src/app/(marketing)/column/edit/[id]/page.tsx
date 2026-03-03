'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { getColumnById, updateColumn, ApiClientError, uploadMedia } from '@/lib/api';
import type { Column, UpdateColumnPayload, ColumnCategoryCode } from '@/lib/api';
import { hasTokens } from '@/lib/auth/token';
import CategorySelect from '@/components/shared/CategorySelect';

/** 제목에서 URL용 슬러그 자동 생성 */
function slugFromTitle(title: string): string {
  const trimmed = title.trim();
  if (!trimmed) return `column-${Date.now()}`;
  const slug = trimmed
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return slug || `column-${Date.now()}`;
}

export default function ColumnEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [mounted, setMounted] = useState(false);
  const [column, setColumn] = useState<Column | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<UpdateColumnPayload>({});
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !hasTokens()) {
      router.replace('/admin');
      return;
    }
    if (!mounted || !id) return;
    getColumnById(id, false, true)
      .then((c) => {
        setColumn(c);
        if (c) {
          setForm({
            title: c.title,
            slug: c.slug,
            content: c.content,
            excerpt: c.excerpt,
            thumbnailUrl: c.thumbnailUrl,
            status: c.status,
            categoryId: c.categoryId,
            categoryCode: (c as unknown as { categoryCode?: ColumnCategoryCode }).categoryCode ?? 'VIRAL_MARKETING',
          });
        }
      })
      .catch(() => setColumn(null))
      .finally(() => setLoading(false));
  }, [mounted, id, router]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (thumbnailPreview && thumbnailPreview.startsWith('blob:')) URL.revokeObjectURL(thumbnailPreview);
    if (!file) {
      setThumbnailFile(null);
      setThumbnailPreview(null);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 올려 주세요.');
      return;
    }
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
    setError('');
  };

  const removeThumbnail = () => {
    if (thumbnailPreview && thumbnailPreview.startsWith('blob:')) URL.revokeObjectURL(thumbnailPreview);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setForm((p) => ({ ...p, thumbnailUrl: '' }));
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!column) return;
    setError('');
    setSuccess(false);
    setSubmitting(true);
    try {
      let thumbnailUrl = form.thumbnailUrl ?? column.thumbnailUrl;
      if (thumbnailFile) {
        const media = await uploadMedia(thumbnailFile);
        thumbnailUrl = media.url;
      }
      const newSlug = form.title ? slugFromTitle(form.title) : (form.slug ?? column.slug);
      const updated = await updateColumn(column.id, {
        title: form.title ?? column.title,
        slug: newSlug,
        content: form.content ?? column.content,
        excerpt: form.excerpt ?? column.excerpt,
        thumbnailUrl: thumbnailUrl || '/images/column/column-background.svg',
        status: 'PUBLISHED',
        categoryId: form.categoryId ?? column.categoryId ?? undefined,
        categoryCode: (form.categoryId ?? column.categoryId) ? undefined : (form.categoryCode ?? 'VIRAL_MARKETING'),
      });
      setSuccess(true);
      setTimeout(() => router.push(`/column/id/${updated.id}`), 1500);
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : '칼럼 수정에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;
  if (!hasTokens()) return null;
  if (loading) return <div className="min-h-screen flex items-center justify-center text-main">로딩 중...</div>;
  if (!column) return <div className="min-h-screen flex items-center justify-center text-main">칼럼을 찾을 수 없습니다.</div>;

  const currentThumbnail = thumbnailPreview || column.thumbnailUrl;
  const showThumbnailPreview = thumbnailPreview || (column.thumbnailUrl && !thumbnailFile);

  return (
    <main className="min-h-screen bg-bg text-main">
      <section className="w-full max-w-[720px] mx-auto px-4 py-8 sm:py-12">
        <p className="font-sans text-[14px] font-thin text-main mb-6">
          <Link href="/" className="text-main no-underline hover:text-primary transition-colors">홈</Link>
          <span className="mx-3 text-sub3">|</span>
          <Link href="/column" className="text-main no-underline hover:text-primary transition-colors">칼럼</Link>
          <span className="mx-3 text-sub3">|</span>
          <span className="font-normal">칼럼 수정</span>
        </p>

        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-main mb-8">칼럼 수정하기</h1>

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30 text-primary font-sans text-[14px]">
            칼럼이 수정되었습니다. 상세 페이지로 이동합니다.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 font-sans text-[14px]" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block font-sans text-[13px] font-medium text-main mb-1.5">제목 *</label>
            <input
              id="title"
              type="text"
              required
              value={(form.title ?? column.title) ?? ''}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-[#ddd] bg-white text-main font-sans text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block font-sans text-[13px] font-medium text-main mb-1.5">요약</label>
            <input
              id="excerpt"
              type="text"
              value={(form.excerpt ?? column.excerpt) ?? ''}
              onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-[#ddd] bg-white text-main font-sans text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block font-sans text-[13px] font-medium text-main mb-1.5">썸네일 이미지</label>
            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleThumbnailChange}
              className="hidden"
              id="thumbnail-upload"
            />
            {showThumbnailPreview && currentThumbnail ? (
              <div className="space-y-2">
                <div className="relative w-full max-w-[320px] aspect-video rounded-lg border border-[#ddd] bg-[#f5f5f5] overflow-hidden">
                  <Image
                    src={currentThumbnail}
                    alt="썸네일"
                    fill
                    className="object-contain"
                    unoptimized={currentThumbnail.startsWith('http') || currentThumbnail.startsWith('blob:')}
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white text-sm hover:bg-black/70 transition-colors"
                    aria-label="이미지 제거"
                  >
                    ×
                  </button>
                </div>
                <p className="font-sans text-[12px] text-sub2">{thumbnailFile?.name ?? '현재 썸네일'}</p>
              </div>
            ) : (
              <label
                htmlFor="thumbnail-upload"
                className="flex flex-col items-center justify-center w-full max-w-[320px] h-[160px] rounded-lg border-2 border-dashed border-[#ddd] bg-[#fafafa] cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <span className="font-sans text-[14px] text-sub2">이미지를 선택하거나 여기에 올려 두세요</span>
                <span className="mt-1 font-sans text-[12px] text-sub3">JPG, PNG, WebP, GIF (최대 5MB)</span>
              </label>
            )}
          </div>

          <div>
            <label htmlFor="content" className="block font-sans text-[13px] font-medium text-main mb-1.5">본문 *</label>
            <textarea
              id="content"
              required
              rows={10}
              value={(form.content ?? column.content) ?? ''}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-[#ddd] bg-white text-main font-sans text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-y"
            />
          </div>

          <div>
            <label htmlFor="category" className="block font-sans text-[13px] font-medium text-main mb-1.5">카테고리</label>
            <CategorySelect
              id="category"
              value={{
                categoryId: form.categoryId ?? column.categoryId,
                categoryCode: form.categoryCode ?? ((column as unknown as { categoryCode?: ColumnCategoryCode }).categoryCode ?? 'VIRAL_MARKETING'),
              }}
              onChange={(v) => setForm((p) => ({ ...p, categoryId: v.categoryId, categoryCode: v.categoryCode }))}
              className="w-full max-w-[320px] px-4 py-3 rounded-lg border border-[#ddd] bg-white text-main font-sans text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-lg bg-primary text-white font-sans text-[14px] font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? '수정 중...' : '칼럼 수정'}
            </button>
            <Link href={`/column/id/${column.id}`} className="font-sans text-[14px] text-sub2 hover:text-primary transition-colors no-underline">
              취소
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
