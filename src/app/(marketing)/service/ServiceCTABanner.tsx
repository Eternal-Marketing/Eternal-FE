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
        <div className="text-center lg:text-left">
          <div
            className="font-sans leading-relaxed text-white transition-all duration-700 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '300ms' }}
          >
            <p className="m-0 text-[16px] sm:text-[20px] lg:text-[22px] font-light text-white/70 tracking-wide">
              복잡한 마케팅은 맡겨주세요
            </p>
            <p className="m-0 mt-3 text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-tight tracking-tight">
              기획부터 실행, 관리까지
              <br />
              <span className="relative inline-block mt-1">
                <span className="relative z-10">
                  이터널이{' '}
                  <span
                    className="relative inline-block px-2 transition-all duration-700"
                    style={{
                      transitionDelay: '800ms',
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-md bg-white/20 transition-transform duration-700 origin-left"
                      style={{ transform: visible ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: '800ms' }}
                    />
                    <span className="relative z-10">정답입니다</span>
                  </span>
                </span>
              </span>
            </p>
          </div>

        </div>
        <img
          src="/images/service-page/handshake.svg"
          alt=""
          className="w-[180px] sm:w-[220px] lg:w-[260px] h-auto"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.85)', transition: 'all 0.7s ease-out', transitionDelay: '600ms' }}
        />
      </div>
    </section>
  );
}
