'use client';
/**
 * CTA 배너
 * - 좌·우 절반씩 파란 배경이 중앙으로 퍼지는 CSS 애니메이션 (뷰포트 진입 시)
 * - 모바일: 배경 즉시 표시 (observer 미동작 시 로드 안 됨 방지)
 */

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';

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

function Highlight({ children, delay = 0, visible, color = '#b6ff4e', textColor = 'text-black' }: { children: React.ReactNode; delay?: number; visible: boolean; color?: string; textColor?: string }) {
  return (
    <span className="relative inline-block">
      <span
        className="absolute inset-0 rounded-sm"
        style={{
          background: color,
          transformOrigin: 'left',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform 0.5s cubic-bezier(0.4,0,0.2,1)`,
          transitionDelay: `${delay}ms`,
          zIndex: 0,
        }}
        aria-hidden
      />
      <span className={`relative z-10 font-semibold px-1 ${textColor}`}>{children}</span>
    </span>
  );
}

export default function ServiceCTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const showVisible = visible || isMobile;

  useEffect(() => {
    if (isMobile) return;
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
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-14 sm:py-18 lg:py-24 px-4 sm:px-6 bg-white ${showVisible ? 'cta-banner-spread is-visible' : 'cta-banner-spread'}`}
    >
      {/* 좌·우 절반 배경 (cta-banner-spread 애니메이션으로 중앙까지 퍼짐) */}
      <div className="cta-banner-spread-left absolute inset-y-0 left-0 w-1/2 bg-[#07276c]" aria-hidden />
      <div className="cta-banner-spread-right absolute inset-y-0 right-0 w-1/2 bg-[#07276c]" aria-hidden />
      {/* 문구 + 악수 이미지 */}
      <div className="cta-banner-content relative z-10 max-w-[900px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-24">
        <div className="text-center lg:text-left">
          <div className="font-sans leading-relaxed text-white">
            <p className="m-0 text-[16px] sm:text-[20px] lg:text-[22px] font-light leading-loose space-y-1">
              <AnimLine delay={200} visible={showVisible}>
                <span className="text-white/60">복잡한 마케팅</span>은 맡겨주세요
              </AnimLine>
            </p>
            <p className="m-0 mt-3 text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight tracking-tight space-y-1">
              <AnimLine delay={400} visible={showVisible}>
                <Highlight delay={600} visible={showVisible} color="rgba(255,255,255,0.15)" textColor="text-white">기획부터 실행, 관리까지</Highlight>
              </AnimLine>
              <AnimLine delay={600} visible={showVisible}>
                이터널이{' '}
                <span className="relative inline-block">
                  <span
                    className="absolute inset-0 rounded-md bg-white/20 transition-transform duration-700 origin-left"
                    style={{ transform: showVisible ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '900ms' }}
                  />
                  <span className="relative z-10 px-2">정답입니다</span>
                </span>
              </AnimLine>
            </p>
          </div>
        </div>
        <div
          className="relative w-[180px] sm:w-[220px] lg:w-[260px] flex-shrink-0"
          style={{ opacity: showVisible ? 1 : 0, transform: showVisible ? 'scale(1)' : 'scale(0.85)', transition: 'all 0.7s ease-out', transitionDelay: '600ms' }}
        >
          <Image
            src="/images/pngs/about-handshake-1.png"
            alt=""
            width={260}
            height={260}
            className="w-full h-auto object-contain"
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 260px"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
