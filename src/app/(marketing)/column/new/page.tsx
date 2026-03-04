'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { createColumn, ApiClientError, uploadMedia } from '@/lib/api';
import type { CreateColumnPayload } from '@/lib/api';
import { hasTokens } from '@/lib/auth/token';
import CategorySelect from '@/components/shared/CategorySelect';
import ColumnEditor from '@/components/column/ColumnEditor';
import { useCategories } from '@/hooks/useCategories';
import { getCategoryCode, getCategoryIndex } from '../categorySlug';

/** 제목에서 URL용 슬러그 자동 생성 (영문·숫자·하이픈만 허용, 공백→하이픈) */
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

function ColumnNewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categorySlugFromUrl = searchParams.get('categorySlug');
  const [mounted, setMounted] = useState(false);
  const { categories } = useCategories(false);
  const [form, setForm] = useState<Omit<CreateColumnPayload, 'slug' | 'status'> & { slug?: string }>({
    title: '',
    content: '',
    excerpt: '',
    thumbnailUrl: '',
    categoryCode: undefined,
    categoryId: undefined,
  });
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
    }
  }, [mounted, router]);

  // API 카테고리가 로드되면 URL의 categorySlug에 맞는 카테고리로 설정, 없으면 categoryCode로 폴백
  useEffect(() => {
    if (categories.length > 0) {
      const target = categorySlugFromUrl
        ? categories.find((c) => c.slug === categorySlugFromUrl)
        : categories[0];
      const cat = target ?? categories[0];
      setForm((p) => ({ ...p, categoryId: cat.id, categoryCode: undefined }));
    } else if (categorySlugFromUrl) {
      const code = getCategoryCode(getCategoryIndex(categorySlugFromUrl));
      setForm((p) => ({ ...p, categoryId: undefined, categoryCode: code }));
    }
  }, [categories, categorySlugFromUrl]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
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
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
  };

  const uploadThumbnail = async (file: File): Promise<string> => {
    const media = await uploadMedia(file);
    return media.url;
  };

  const isEmptyContent = (html: string) => {
    const t = html?.replace(/<[^>]+>/g, '').trim() ?? '';
    return !t;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isEmptyContent(form.content)) {
      setError('본문을 입력해 주세요.');
      return;
    }
    setSuccess(false);
    setSubmitting(true);
    try {
      let thumbnailUrl = form.thumbnailUrl;
      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
      }
      const slug = slugFromTitle(form.title);
      await createColumn({
        ...form,
        slug,
        status: 'PUBLISHED',
        thumbnailUrl: thumbnailUrl || '/images/column/column-background.svg',
        categoryId: form.categoryId || undefined,
        categoryCode: form.categoryId ? undefined : form.categoryCode,
      });
      setSuccess(true);
      const redirectTo = categorySlugFromUrl && categorySlugFromUrl !== 'bayiral'
        ? `/column/category/${categorySlugFromUrl}`
        : '/column';
      setTimeout(() => router.push(redirectTo), 1500);
    } catch (err) {
      const raw = err instanceof ApiClientError ? err.message : '칼럼 생성에 실패했습니다.';
      const msg = /slug already exists/i.test(raw)
        ? '이미 같은 제목의 칼럼이 있습니다. 다른 제목으로 작성해 주세요.'
        : raw;
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;
  if (!hasTokens()) return null;

  return (
    <main className="min-h-screen bg-bg text-main">
      <section className="w-full max-w-[720px] mx-auto px-4 py-8 sm:py-12">
        <p className="font-sans text-[14px] font-thin text-main mb-6">
          <Link href="/" className="text-main no-underline hover:text-primary transition-colors">홈</Link>
          <span className="mx-3 text-sub3">|</span>
          <Link href="/column" className="text-main no-underline hover:text-primary transition-colors">칼럼</Link>
          <span className="mx-3 text-sub3">|</span>
          <span className="font-normal">칼럼 생성</span>
        </p>

        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-main mb-8">칼럼 생성하기</h1>

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
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-[#ddd] bg-white text-main font-sans text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="예: 병원 마케팅 전략"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block font-sans text-[13px] font-medium text-main mb-1.5">요약</label>
            <input
              id="excerpt"
              type="text"
              value={form.excerpt}
              onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-[#ddd] bg-white text-main font-sans text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="칼럼 요약"
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
            {thumbnailPreview ? (
              <div className="space-y-2">
                <div className="relative w-full max-w-[320px] aspect-video rounded-lg border border-[#ddd] bg-[#f5f5f5] overflow-hidden">
                  <Image
                    src={thumbnailPreview}
                    alt="썸네일 미리보기"
                    fill
                    className="object-contain"
                    unoptimized
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
                <p className="font-sans text-[12px] text-sub2">{thumbnailFile?.name}</p>
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
            <ColumnEditor
              value={form.content}
              onChange={(html) => setForm((p) => ({ ...p, content: html }))}
              placeholder="칼럼 본문 내용..."
              minHeight="320px"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block font-sans text-[13px] font-medium text-main mb-1.5">카테고리</label>
              <CategorySelect
                id="category"
                value={{ categoryId: form.categoryId, categoryCode: form.categoryCode }}
                onChange={(v) => setForm((p) => ({ ...p, categoryId: v.categoryId, categoryCode: v.categoryCode }))}
                className="w-full px-4 py-3 rounded-lg border border-[#ddd] bg-white text-main font-sans text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-lg bg-primary text-white font-sans text-[14px] font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? '생성 중...' : '칼럼 생성'}
            </button>
            <Link
              href="/column"
              className="font-sans text-[14px] text-sub2 hover:text-primary transition-colors no-underline"
            >
              목록으로
            </Link>
            {success && (
              <div className="w-full mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30 text-primary font-sans text-[14px]">
                칼럼이 생성되었습니다. 칼럼 목록으로 이동합니다.
              </div>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

export default function ColumnNewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-main">로딩 중...</div>}>
      <ColumnNewContent />
    </Suspense>
  );
}
