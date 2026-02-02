'use client';
/**
 * 서비스 인트로 섹션
 * - "정답만 선택하시면 됩니다" 문구 + 체크 아이콘
 * - 뷰포트 진입 시 라인별·아이콘 애니메이션 (IntersectionObserver)
 */

import { useRef, useEffect, useState } from 'react';

export default function ServiceIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // 섹션이 화면에 15% 이상 보이면 visible → CSS 애니메이션 트리거
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white min-h-[671px] py-[80px] px-4 flex items-center"
    >
      <div className={`max-w-[1163px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 ${visible ? 'service-intro-animate' : ''}`}>
        {/* 왼쪽: 타이틀 2줄 + 본문 문단 (라인별 delay 적용) */}
        <div className="flex-1">
          <h2 className="font-sans text-[24px] md:text-[32px] font-bold leading-tight text-main mb-6 space-y-2">
            <span className="service-intro-line service-intro-delay-0 block">무분별한 마케팅은 그만,</span>
            <span className="service-intro-line service-intro-delay-1 block">
              <span className="text-primary">정답</span>만 선택하시면 됩니다
            </span>
          </h2>
          <div className="font-sans text-[16px] md:text-[20px] font-light leading-[28px] text-main space-y-1">
            <p className="service-intro-line service-intro-delay-2">유입 경로가 많다고 매출이 함께 늘어나는 것은 아닙니다.</p>
            <p className="service-intro-line service-intro-delay-3">선택이 늘어날수록 비용은 새고, 성과는 명확해지지 않습니다.</p>
            <p className="service-intro-line service-intro-delay-4 font-semibold mt-4">효율적인 마케팅은 많이 하는 일이 아니라</p>
            <p className="service-intro-line service-intro-delay-5 font-semibold">정답을 고르는 일입니다.</p>
          </div>
        </div>
        {/* 오른쪽: 체크 아이콘 (진입 시 등장 애니메이션) */}
        <div className="flex-shrink-0 service-intro-icon">
          <img
            src="/images/service-page/checked.svg"
            alt=""
            className="w-[180px] md:w-[260px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
