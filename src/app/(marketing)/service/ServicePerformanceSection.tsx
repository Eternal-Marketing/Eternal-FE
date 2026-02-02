'use client';

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
      <div className="w-full max-w-[1163px] mx-auto px-4 py-[90px]">
        <h2 className="m-0 font-sans text-[28px] md:text-[32px] font-semibold leading-normal text-center text-primary">
          PERFORMANCE MARKETING
        </h2>

        <div className="mt-8 text-center font-sans text-[16px] text-sub1">
          <span>Responsive Web Design</span>
          <span className="mx-4 text-sub3">|</span>
          <span>Search Engine Optimization</span>
        </div>

        <div
          className={`mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 ${visible ? 'service-category-cards-visible' : ''}`}
        >
          <div className="service-category-card flex flex-col items-center">
            <div className="service-category-card-inner w-full h-[293px] flex items-center justify-center overflow-hidden">
              <img
                src="/images/service-page/responsive.svg"
                alt=""
                className="w-[420px] max-w-full h-auto object-contain"
              />
            </div>
            <div className="mt-4 w-[420px] max-w-full text-left pl-[17px]">
              <p className="m-0 font-sans text-[16px] font-medium text-black">Responsive Web Design</p>
              <p className="m-0 mt-1 font-sans text-[16px] font-thin text-sub1">반응형 홈페이지 개발</p>
            </div>
          </div>

          <div className="service-category-card flex flex-col items-center">
            <div className="service-category-card-inner w-full h-[293px] flex items-center justify-center overflow-hidden">
              <img
                src="/images/service-page/seo.svg"
                alt=""
                className="w-[420px] max-w-full h-auto object-contain"
              />
            </div>
            <div className="mt-4 w-[420px] max-w-full text-left pl-[17px]">
              <p className="m-0 font-sans text-[16px] font-medium text-black">Search Engine Optimization (SEO)</p>
              <p className="m-0 mt-1 font-sans text-[16px] font-thin text-sub1">검색광고 (구글, 네이버)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

