'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/api';
import type { Category } from '@/lib/api';

/** 카테고리 목록 조회 (includeInactive: true 시 비활성 포함) */
export function useCategories(includeInactive = false) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories({ includeInactive })
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, [includeInactive]);

  return { categories, loading };
}
