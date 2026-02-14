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

export default function PreloadHeroImages() {
  useEffect(() => {
    HERO_IMAGE_URLS.forEach((href) => {
      if (typeof document === 'undefined') return;
      const existing = document.querySelector(`link[rel="preload"][href="${href}"]`);
      if (existing) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);

  return null;
}
