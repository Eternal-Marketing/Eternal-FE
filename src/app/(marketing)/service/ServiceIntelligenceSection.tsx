'use client';
/**
 * 인텔리전스 배너
 * - 좌·우 절반 회색 배경이 중앙으로 퍼지는 애니메이션 (뷰포트 진입 시)
 * - 텍스트 줄별 페이드업 + 형광 하이라이트 스윽 칠해지는 애니메이션
 */

import { useRef, useEffect, useState } from 'react';

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
          transition: `transform 0.5s cubic-bezier(0.4,0,0.2,1)`,
          transitionDelay: `${delay}ms`,
          zIndex: 0,
        }}
        aria-hidden
      />
      <span className="relative z-10 text-black font-semibold px-1">{children}</span>
    </span>
  );
}

export default function ServiceIntelligenceSection() {
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
      className={`relative overflow-hidden py-12 sm:py-16 lg:py-[90px] px-4 sm:px-6 bg-white ${visible ? 'cta-banner-spread is-visible' : 'cta-banner-spread'}`}
    >
      {/* 좌·우 스프레드 배경 */}
      <div className="cta-banner-spread-left absolute inset-y-0 left-0 w-1/2 bg-[#191919]" aria-hidden />
      <div className="cta-banner-spread-right absolute inset-y-0 right-0 w-1/2 bg-[#191919]" aria-hidden />

      <div className="cta-banner-content relative z-10 w-full max-w-[1163px] mx-auto text-center text-white">
        <p className="m-0 font-sans text-[13px] sm:text-[15px] lg:text-[16px] font-light leading-loose space-y-1">
          <AnimLine delay={200} visible={visible}>
            <span className="text-[19px] sm:text-[22px] lg:text-[24px]">
              결과가 정해져 있는{' '}
              <span className="font-semibold text-white/50 line-through decoration-[#e53935] decoration-2">패키지 마케팅</span>은 그만
            </span>
          </AnimLine>
          <AnimLine delay={400} visible={visible}>
            이터널은 변화하는{' '}
            <Highlight delay={600} visible={visible}>알고리즘과 사업 조건</Highlight>에 맞춰
          </AnimLine>
          <AnimLine delay={600} visible={visible}>
            업체별 <Highlight delay={800} visible={visible}>전용 전략</Highlight>을 설계합니다
          </AnimLine>
          <AnimLine delay={800} visible={visible}>
            패키지가 아닌,{' '}
            <span
              className="font-semibold transition-colors duration-700"
              style={{ color: visible ? '#b6ff4e' : 'transparent', transitionDelay: '1000ms' }}
            >
              AI 인텔리전스 기반 솔루션
            </span>으로
          </AnimLine>
        </p>

        <div
          className="m-0 mt-6 sm:mt-8 font-sans text-[20px] sm:text-[24px] lg:text-[28px] font-bold transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '1100ms',
          }}
        >
          <span className="relative inline-block mr-2">
            <span
              className="absolute inset-0 rounded"
              style={{
                background: '#b6ff4e',
                transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                transitionDelay: '1300ms',
              }}
              aria-hidden
            />
            <span className="relative z-10 text-black px-2 py-0.5">마케팅 인텔리전스 AI</span>
          </span>
          <span className="text-white">전용 맞춤 솔루션</span>
        </div>
      </div>
    </section>
  );
}
