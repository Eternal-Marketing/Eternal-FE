'use client';

import { useRef, useEffect, useState } from 'react';

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
      className="bg-white min-h-[671px] py-[80px] px-4 flex items-center"
    >
      <div className={`max-w-[1163px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 ${visible ? 'service-intro-animate' : ''}`}>
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
