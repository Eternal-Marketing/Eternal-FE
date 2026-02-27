'use client';
/**
 * 퍼포먼스 마케팅 섹션
 * - RWD(반응형 홈페이지), SEO(검색광고) 2열 카드
 * - 카드 호버 시 검은 오버레이 + 설명 문구, 뷰포트 진입 시 그리드 등장
 */

import { useRef, useEffect, useState } from 'react';

export default function ServicePerformanceSection() {
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

        {/* 2열 카드: 모바일부터 나란히 2열 */}
        <div
          className={`mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-6 ${visible ? 'service-category-cards-visible' : ''}`}
        >
          <div className="service-category-card flex flex-col items-center group">
            <div className="service-category-card-inner relative w-full min-h-[220px] sm:min-h-[260px] flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl">
              <img
                src="/images/service-page/responsive.svg"
                alt=""
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl lg:top-0.5 lg:bottom-0.5 lg:left-11 lg:right-11 lg:rounded-[5px] flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-5"
                aria-hidden
              >
                <p className="font-sans text-[12px] sm:text-[14px] leading-relaxed text-white text-center whitespace-pre-line">
                  브랜드DNA 기반 디자인과{'\n'}탑티어급 SEO 최적화 세팅
                </p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 w-full max-w-[420px] text-left pl-2 sm:pl-[17px] mx-auto lg:mx-0">
              <p className="m-0 font-sans text-[14px] sm:text-[16px] font-medium text-black">Responsive Web Design</p>
              <p className="m-0 mt-0.5 sm:mt-1 font-sans text-[13px] sm:text-[16px] font-thin text-sub1">반응형 홈페이지 개발</p>
            </div>
          </div>

          <div className="service-category-card flex flex-col items-center group">
            <div className="service-category-card-inner relative w-full min-h-[220px] sm:min-h-[260px] flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl">
              <img
                src="/images/service-page/seo.svg"
                alt=""
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl lg:top-0.5 lg:bottom-0.5 lg:left-11 lg:right-11 lg:rounded-[5px] flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-5"
                aria-hidden
              >
                <p className="font-sans text-[12px] sm:text-[14px] leading-relaxed text-white text-center whitespace-pre-line">
                  대표 플랫폼 상위노출{'\n'}최고효율 운영
                </p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 w-full max-w-[420px] text-left pl-2 sm:pl-[17px] mx-auto lg:mx-0">
              <p className="m-0 font-sans text-[14px] sm:text-[16px] font-medium text-black">Search Engine Optimization (SEO)</p>
              <p className="m-0 mt-0.5 sm:mt-1 font-sans text-[13px] sm:text-[16px] font-thin text-sub1">검색광고 (구글, 네이버)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

