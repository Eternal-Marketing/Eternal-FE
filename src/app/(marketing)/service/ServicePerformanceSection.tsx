'use client';
/**
 * 퍼포먼스 마케팅 섹션
 * - RWD(반응형 홈페이지), SEO(검색광고) 2열 카드
 * - 카드 호버 시 검은 오버레이 + 설명 문구, 뷰포트 진입 시 그리드 등장
 */

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export default function ServicePerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<'rwd' | 'seo' | null>(null);

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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white w-full">
      <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-[90px]">
        <h2 className="m-0 font-sans text-[22px] sm:text-[26px] font-semibold leading-normal text-center text-primary">
          PERFORMANCE MARKETING
        </h2>

        {/* RWD | SEO 라벨 */}
        <div className="mt-4 sm:mt-6 text-center font-sans text-[13px] sm:text-[14px] text-sub1">
          <span>Responsive Web Design</span>
          <span className="mx-4 text-sub3">|</span>
          <span>Search Engine Optimization</span>
        </div>

        {/* 2열 카드: 모바일 1열 세로, sm 이상 2열 가로 */}
        <div
          className={`mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 ${visible ? 'service-category-cards-visible' : ''}`}
        >
          <div className="service-category-card flex flex-col items-start group">
            <div
              className="service-category-card-inner relative w-full max-w-[520px] sm:max-w-none aspect-[4/3] sm:min-h-[260px] sm:aspect-auto flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer"
              onClick={() => setActiveCard((prev) => (prev === 'rwd' ? null : 'rwd'))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveCard((prev) => (prev === 'rwd' ? null : 'rwd'))}
            >
              <Image
                src="/images/service-page/service-responsive.png"
                alt=""
                fill
                quality={90}
                className="object-contain"
                sizes="(max-width: 640px) 50vw, 560px"
              />
              <div
                className={`absolute top-[21.5px] right-0 bottom-[21.5px] left-0 sm:top-[21.5px] sm:right-0 sm:bottom-[21.5px] sm:left-0 lg:top-[21.5px] lg:bottom-[21.5px] lg:left-[65px] lg:right-[65px] rounded-xl sm:rounded-2xl lg:rounded-[5px] flex items-center justify-center bg-black/50 opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-300 px-4 py-5 ${activeCard === 'rwd' ? '!opacity-100' : ''}`}
                aria-hidden
              >
                <p className="font-sans text-[14px] sm:text-[16px] font-bold leading-relaxed text-white text-center whitespace-pre-line tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  브랜드DNA 기반 디자인과{'\n'}탑티어급 SEO 최적화 세팅
                </p>
              </div>
              {activeCard !== 'rwd' && (
                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full lg:hidden tap-hint-badge z-10">
                  <span className="relative z-10 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11l5-5 5 5"/><path d="M12 6v12"/></svg>
                    TAP
                  </span>
                </span>
              )}
            </div>
            <div className="mt-2 sm:mt-3 w-full max-w-[520px] text-left pl-0 sm:pl-[17px]">
              <p className="m-0 font-sans text-[14px] sm:text-[16px] font-medium text-black">Responsive Web Design</p>
              <p className="m-0 mt-0.5 sm:mt-1 font-sans text-[13px] sm:text-[16px] font-thin text-sub1">반응형 홈페이지 개발</p>
            </div>
          </div>

          <div className="service-category-card flex flex-col items-start group">
            <div
              className="service-category-card-inner relative w-full max-w-[520px] sm:max-w-none aspect-[4/3] sm:min-h-[260px] sm:aspect-auto flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer"
              onClick={() => setActiveCard((prev) => (prev === 'seo' ? null : 'seo'))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveCard((prev) => (prev === 'seo' ? null : 'seo'))}
            >
              <Image
                src="/images/service-page/seo.svg"
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 640px) 50vw, 560px"
              />
              <div
                className={`absolute top-[21.5px] right-0 bottom-[21.5px] left-0 sm:top-[21.5px] sm:right-0 sm:bottom-[21.5px] sm:left-0 lg:top-[21.5px] lg:bottom-[21.5px] lg:left-[65px] lg:right-[65px] rounded-xl sm:rounded-2xl lg:rounded-[5px] flex items-center justify-center bg-black/50 opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-300 px-4 py-5 ${activeCard === 'seo' ? '!opacity-100' : ''}`}
                aria-hidden
              >
                <p className="font-sans text-[14px] sm:text-[16px] font-bold leading-relaxed text-white text-center whitespace-pre-line tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  대표 플랫폼 상위노출{'\n'}최고효율 운영
                </p>
              </div>
              {activeCard !== 'seo' && (
                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full lg:hidden tap-hint-badge z-10">
                  <span className="relative z-10 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11l5-5 5 5"/><path d="M12 6v12"/></svg>
                    TAP
                  </span>
                </span>
              )}
            </div>
            <div className="mt-2 sm:mt-3 w-full max-w-[520px] text-left pl-0 sm:pl-[17px]">
              <p className="m-0 font-sans text-[14px] sm:text-[16px] font-medium text-black">Search Engine Optimization (SEO)</p>
              <p className="m-0 mt-0.5 sm:mt-1 font-sans text-[13px] sm:text-[16px] font-thin text-sub1">검색광고 (구글, 네이버)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

