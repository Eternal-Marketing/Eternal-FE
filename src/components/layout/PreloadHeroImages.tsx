'use client';

import { useEffect } from 'react';

/**
 * About / Column / Service 페이지 히어로 이미지 preload
 * - 마케팅 레이아웃 마운트 시 head에 preload 링크 추가
 * - 해당 페이지 진입 시 이미 캐시되어 끊김 없이 표시
 */
const HERO_IMAGE_URLS = [
  '/images/about-page/firstimage.svg',
  '/images/column/column-background.svg',
  '/images/service-page/service-background.svg',
] as const;

/** 홈 히어로 Spline 3D 페이지 prefetch → 홈 진입 시 끊김 없이 재생 */
const SPLINE_PREFETCH_URL = 'https://my.spline.design/motiontrails-7nu0l9wGTzn5nWxGtrBcWZHT/';

export default function PreloadHeroImages() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    HERO_IMAGE_URLS.forEach((href) => {
      const existing = document.querySelector(`link[rel="preload"][href="${href}"]`);
      if (existing) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
    });

    const existingPrefetch = document.querySelector(`link[rel="prefetch"][href="${SPLINE_PREFETCH_URL}"]`);
    if (!existingPrefetch) {
      const prefetch = document.createElement('link');
      prefetch.rel = 'prefetch';
      prefetch.href = SPLINE_PREFETCH_URL;
      document.head.appendChild(prefetch);
    }
  }, []);

  return null;
}
