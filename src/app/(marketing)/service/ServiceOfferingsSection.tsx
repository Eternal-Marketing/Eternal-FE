'use client';
/**
 * 제공 서비스 섹션
 * - 채널별 아이콘 + 이름 카드 그리드 (2~5열 반응형)
 * - 뷰포트 진입 시 제목·카드 페이드업 (reveal-fade-up, delay 순차)
 */

import { useRef, useEffect, useState } from 'react';

const SERVICES = [
  { name: '네이버 카페', icon: '/images/service-page/naver-2.png' },
  { name: '네이버 블로그', icon: '/images/service-page/naver-3.png' },
  { name: '네이버 플레이스', icon: '/images/service-page/naver-1.png' },
  { name: '인스타그램 관리', icon: '/images/service-page/sns3.png' },
  { name: 'SEO', icon: '/images/service-page/performance-2.png' },
  { name: '숏폼 콘텐츠', icon: '/images/service-page/sns2.png' },
  { name: '인앱 광고', icon: '/images/service-page/sns-1.png' },
  { name: '홈페이지·브랜드·블로그', icon: '/images/service-page/homepagebrandblog.svg' },
  { name: '반응형 광고', icon: '/images/service-page/responsive.svg' },
  { name: '핫딜 마케팅', icon: '/images/service-page/hot-deal.svg' },
];

export default function ServiceOfferingsSection() {
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f6f6f6] py-[80px] px-4"
    >
      <div className="max-w-[1163px] mx-auto">
        {/* 섹션 제목 + 부제 (진입 시 페이드업) */}
        <div className={`reveal-fade-up mb-12 ${visible ? 'is-visible' : ''}`}>
          <h2 className="font-sans text-[28px] font-bold leading-tight text-main mb-4">
            우리가 제공하는 <span className="text-primary">마케팅 서비스</span>
          </h2>
          <p className="font-sans text-[16px] font-light leading-relaxed text-sub1">
            채널별 최적화부터 전환까지, 이터널이 정답을 찾아드립니다.
          </p>
        </div>

        {/* 채널별 카드 그리드 (카드별 delay로 순차 등장) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {SERVICES.map((service, idx) => (
            <div
              key={service.name}
              className={`reveal-fade-up bg-white rounded-lg border border-black/5 px-6 py-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 ${
                visible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="w-[80px] h-[80px] flex items-center justify-center mb-4">
                <img
                  src={service.icon}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="font-sans text-[14px] font-medium text-main">
                {service.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
