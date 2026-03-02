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
      className="bg-white min-h-0 py-16 sm:py-20 lg:min-h-[700px] lg:py-[120px] px-4 sm:px-6 flex items-center"
    >
      <div className={`max-w-[1163px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-12 lg:gap-24 ${visible ? 'service-intro-animate' : ''}`}>
        {/* 왼쪽: 타이틀 + 본문 */}
        <div className="flex-1 w-full">
          {/* 상단 레이블 */}
          <span
            className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary font-sans text-[11px] sm:text-[12px] font-semibold tracking-widest transition-all duration-500"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-10px)', transitionDelay: '100ms' }}
          >
            ETERNAL INTELLIGENCE
          </span>

          <h2 className="font-sans text-[28px] sm:text-[36px] font-bold leading-tight text-main mb-4 sm:mb-6 space-y-2">
            <span className="service-intro-line service-intro-delay-0 block">
              무분별한 마케팅은{' '}
              <span className="relative inline-block">
                <span className="relative z-10">그만,</span>
                <span className="absolute bottom-0 left-0 right-0 h-[6px] bg-primary/20 rounded-sm" />
              </span>
            </span>
            <span className="service-intro-line service-intro-delay-1 block">
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">정답</span>
                <span
                  className="absolute inset-0 rounded-sm bg-primary/10 transition-transform duration-700 origin-left"
                  style={{ transform: visible ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '600ms' }}
                />
              </span>
              만 선택하시면 됩니다
            </span>
          </h2>

          <div className="font-sans text-[15px] sm:text-[17px] font-light leading-relaxed text-sub1 space-y-2">
            <p className="service-intro-line service-intro-delay-2">유입 경로가 많다고 매출이 함께 늘어나는 것은 아닙니다.</p>
            <p className="service-intro-line service-intro-delay-3">선택이 늘어날수록 비용은 새고, 성과는 명확해지지 않습니다.</p>
            <p className="service-intro-line service-intro-delay-4 font-semibold text-main mt-4">효율적인 마케팅은 많이 하는 일이 아니라</p>
            <p className="service-intro-line service-intro-delay-5 font-bold text-[17px] sm:text-[20px] text-primary">정답을 고르는 일입니다.</p>
          </div>

        </div>

        {/* 오른쪽: 체크 아이콘 */}
        <div className="flex-shrink-0 service-intro-icon">
          <img
            src="/images/service-page/checked.svg"
            alt=""
            className="w-[220px] sm:w-[280px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
