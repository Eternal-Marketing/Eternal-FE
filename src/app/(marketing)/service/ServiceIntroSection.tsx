'use client';
/**
 * 서비스 인트로 섹션
 * - "정답만 선택하시면 됩니다" 문구 + 체크 아이콘
 * - 뷰포트 진입 시 라인별·아이콘 애니메이션 (IntersectionObserver)
 */

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

function AnimLine({ children, delay = 0, visible }: { children: React.ReactNode; delay?: number; visible: boolean }) {
  return (
    <span
      className="block transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </span>
  );
}

function Highlight({ children, delay = 0, visible }: { children: React.ReactNode; delay?: number; visible: boolean }) {
  return (
    <span className="relative inline-block">
      <span
        className="absolute inset-0 rounded-sm"
        style={{
          background: '#b6ff4e',
          transformOrigin: 'left',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          transitionDelay: `${delay}ms`,
          zIndex: 0,
        }}
        aria-hidden
      />
      <span className="relative z-10 text-black font-semibold px-1">{children}</span>
    </span>
  );
}

export default function ServiceIntroSection() {
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

          <h2 className="font-sans text-[26px] sm:text-[36px] font-bold leading-tight text-main mb-4 sm:mb-6 space-y-2">
            <AnimLine delay={200} visible={visible}>
              무분별한 마케팅은 그만,
            </AnimLine>
            <AnimLine delay={400} visible={visible}>
              <span className="text-primary">정답</span>만 선택하시면 됩니다
            </AnimLine>
          </h2>

          <div className="font-sans text-[16px] sm:text-[17px] font-light leading-relaxed text-sub1 space-y-2">
            <AnimLine delay={600} visible={visible}>
              유입 경로가 많다고 매출이 함께 늘어나는 것은 아닙니다.
            </AnimLine>
            <AnimLine delay={800} visible={visible}>
              선택이 늘어날수록 <span className="font-semibold text-main">비용은 새고</span>, 성과는 명확해지지 않습니다.
            </AnimLine>
            <AnimLine delay={1000} visible={visible}>
              <span className="font-semibold text-main">효율적인 마케팅은 많이 하는 일이 아니라</span>
            </AnimLine>
            <AnimLine delay={1200} visible={visible}>
              <span className="font-bold text-[18px] sm:text-[20px] text-primary">정답을 고르는 일입니다.</span>
            </AnimLine>
          </div>
        </div>

        {/* 오른쪽: 체크 아이콘 */}
        <div className="flex-shrink-0 service-intro-icon relative w-[160px] sm:w-[220px] lg:w-[280px]">
          <Image
            src="/images/pngs/about-checked-1.png"
            alt=""
            width={280}
            height={280}
            className="w-full h-auto object-contain"
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 220px, 280px"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
