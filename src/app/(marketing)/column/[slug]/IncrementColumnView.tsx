'use client';

import { useEffect } from 'react';
import { getColumnBySlug } from '@/lib/api';

export default function IncrementColumnView({ slug }: { slug: string }) {
  useEffect(() => {
    // 조회수 증가는 브라우저에서 실제로 페이지를 본 경우에만 수행
    getColumnBySlug(slug, true).catch(() => {});
  }, [slug]);

  return null;
}

