'use client';
/**
 * 인텔리전스 배너
 * - 좌·우 절반 회색 배경이 중앙으로 퍼지는 애니메이션 (뷰포트 진입 시)
 * - 패키지 마케팅 거부 + AI 맞춤 솔루션 문구
 */

import { useRef, useEffect, useState } from 'react';

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
      className={`relative overflow-hidden py-[70px] px-4 bg-white ${visible ? 'cta-banner-spread is-visible' : 'cta-banner-spread'}`}
    >
      {/* 좌·우 스프레드 배경 (cta-banner-spread 재사용) */}
      <div className="cta-banner-spread-left absolute inset-y-0 left-0 w-1/2 bg-[#404040]" aria-hidden />
      <div className="cta-banner-spread-right absolute inset-y-0 right-0 w-1/2 bg-[#404040]" aria-hidden />
      {/* AI 맞춤 솔루션 문구 */}
      <div className="cta-banner-content relative z-10 w-full max-w-[1163px] mx-auto text-center text-white">
        <p className="m-0 font-sans text-[16px] font-light leading-relaxed">
          결과가 정해져 있는 패키지 마케팅은 그만
          <br />
          이터널은 변화하는 알고리즘과 사업 조건에 맞춰
          <br />
          업체별 전용 전략을 설계합니다
          <br />
          패키지가 아닌, AI 인텔리전스 기반 솔루션으로
        </p>
        <p className="m-0 mt-8 font-sans text-[18px] md:text-[20px] font-semibold">
          마케팅 인텔리전스 AI 전용 맞춤 솔루션
        </p>
      </div>
    </section>
  );
}
