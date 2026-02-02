"use client";

import { usePathname } from "next/navigation";

/**
 * 페이지 전환 시 공통 진입 애니메이션 (페이드인 + 살짝 위로)
 * (marketing) 레이아웃에서 children을 감싸서 사용
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
