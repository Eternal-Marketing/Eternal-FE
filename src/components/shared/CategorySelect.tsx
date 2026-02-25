'use client';

import { useCategories } from '@/hooks/useCategories';
import type { ColumnCategoryCode } from '@/lib/api';

const FALLBACK_OPTIONS: { value: ColumnCategoryCode; label: string }[] = [
  { value: 'VIRAL_MARKETING', label: '바이럴 마케팅' },
  { value: 'PERFORMANCE_MARKETING', label: '퍼포먼스 마케팅' },
  { value: 'SNS_MARKETING', label: 'SNS 마케팅' },
  { value: 'VIDEO_CONTENT_MARKETING', label: '영상 콘텐츠 마케팅' },
  { value: 'ETERNAL_MARKETING', label: '이터널 마케팅' },
];

export interface CategorySelectValue {
  categoryId?: string;
  categoryCode?: ColumnCategoryCode;
}

interface CategorySelectProps {
  value: CategorySelectValue;
  onChange: (value: CategorySelectValue) => void;
  className?: string;
  id?: string;
}

/** 칼럼 폼용 카테고리 셀렉트 - API 카테고리 또는 고정 코드 목록 사용 */
export default function CategorySelect({ value, onChange, className = '', id = 'category' }: CategorySelectProps) {
  const { categories, loading } = useCategories(false);

  if (loading) {
    return (
      <p className={`font-sans text-[14px] text-sub2 py-2 ${className}`}>
        카테고리 불러오는 중...
      </p>
    );
  }

  if (categories.length > 0) {
    const selectedId = value.categoryId ?? categories[0]?.id ?? '';
    return (
      <select
        id={id}
        value={selectedId}
        onChange={(e) => onChange({ categoryId: e.target.value || undefined, categoryCode: undefined })}
        className={className}
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    );
  }

  const selectedCode = value.categoryCode ?? 'VIRAL_MARKETING';
  return (
    <select
      id={id}
      value={selectedCode}
      onChange={(e) => onChange({ categoryId: undefined, categoryCode: e.target.value as ColumnCategoryCode })}
      className={className}
    >
      {FALLBACK_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
