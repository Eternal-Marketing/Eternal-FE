'use client';
/**
 * CTA 배너
 * - 좌·우 절반씩 파란 배경이 중앙으로 퍼지는 CSS 애니메이션 (뷰포트 진입 시)
 * - 문구 + 악수 이미지
 */

import { useRef, useEffect, useState } from 'react';

export default function ServiceCTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-14 sm:py-18 lg:py-24 px-4 sm:px-6 bg-white ${visible ? 'cta-banner-spread is-visible' : 'cta-banner-spread'}`}
    >
      {/* 좌·우 절반 배경 (cta-banner-spread 애니메이션으로 중앙까지 퍼짐) */}
      <div className="cta-banner-spread-left absolute inset-y-0 left-0 w-1/2 bg-[#07276c]" aria-hidden />
      <div className="cta-banner-spread-right absolute inset-y-0 right-0 w-1/2 bg-[#07276c]" aria-hidden />
      {/* 문구 + 악수 이미지 */}
      <div className="cta-banner-content relative z-10 max-w-[900px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-24">
        <div className="font-sans text-[18px] sm:text-[22px] lg:text-[26px] font-medium leading-relaxed text-white text-center lg:text-left">
          <p>복잡한 마케팅은 맡겨주세요</p>
          <p>기획부터 실행, 관리까지 이터널이 정답입니다</p>
        </div>
        <img
          src="/images/service-page/handshake.svg"
          alt=""
          className="w-[180px] sm:w-[220px] lg:w-[260px] h-auto"
        />
      </div>
    </section>
  );
}
