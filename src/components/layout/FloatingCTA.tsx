'use client';

import Link from "next/link";

/**
 * FloatingCTA - 오른쪽 하단 고정 CTA 버튼
 * 스크롤해도 항상 오른쪽 하단에 위치
 */
export default function FloatingCTA() {
  return (
    <Link
      href="/ai-diagnosis"
      className="group fixed bottom-6 right-6 z-50 w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      aria-label="AI 진단 받기"
    >
      <img 
        src="/images/CTA.svg" 
        alt="AI 진단 받기" 
        className="w-full h-full"
      />
    </Link>
  );
}
