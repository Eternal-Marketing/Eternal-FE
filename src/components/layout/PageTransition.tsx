"use client";

import { usePathname } from "next/navigation";

/**
 * 페이지 전환 진입 애니메이션
 * - pathname이 바뀔 때마다 key로 리마운트 → animate-page-enter(페이드인 + 위로) 적용
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-page-enter">
      {children}
    </div>
  );
}
