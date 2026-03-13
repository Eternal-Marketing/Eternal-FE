'use client';

import { useEffect } from 'react';

/**
 * About / Column / Service 페이지 히어로 이미지 preload
 * - 데스크탑(sm: 640px+)에서만 데스크탑 이미지 프리로드
 * - 모바일에서는 모바일 전용 이미지만 프리로드 (불필요한 대용량 다운로드 방지)
 */
const DESKTOP_IMAGE_URLS = [
  '/images/about-background-desktop.png',
  '/images/column-background2.png',
  '/images/service-background.png',
];

const MOBILE_IMAGE_URLS = [
  '/images/pngs/about-mobile-png.png',
  '/images/pngs/column-mobile-png.png',
  '/images/pngs/service-mobile-png.png',
];

const SPLINE_PREFETCH_URL = 'https://my.spline.design/motiontrails-7nu0l9wGTzn5nWxGtrBcWZHT/';

export default function PreloadHeroImages() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const isDesktop = window.matchMedia('(min-width: 640px)').matches;
    const urls = isDesktop ? DESKTOP_IMAGE_URLS : MOBILE_IMAGE_URLS;

    urls.forEach((href) => {
      const existing = document.querySelector(`link[rel="preload"][href="${href}"]`);
      if (existing) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
    });

    // Spline 3D 프리페치는 데스크탑에서만
    if (isDesktop) {
      const existingPrefetch = document.querySelector(`link[rel="prefetch"][href="${SPLINE_PREFETCH_URL}"]`);
      if (!existingPrefetch) {
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = SPLINE_PREFETCH_URL;
        document.head.appendChild(prefetch);
      }
    }
  }, []);

  return null;
}
