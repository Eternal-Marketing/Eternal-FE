'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * 운영 원칙 섹션
 * - 연한 보라 배경 스트립 안에 4열: 약정 없음 / 경쟁분석 / 키워드 AI / 브랜드 DNA
 * - 각 항목: SVG 아이콘(1~4.svg) + 제목 + 설명
 */

const cards = [
  {
    src: '/images/service-page/1.svg',
    srcMobile: '/images/service-page/Key-mobile.svg',
    badge: 'NO LOCK-IN',
    title: <>모든 계약,{' '}<span className="text-primary">약정 없는</span>{' '}운영 원칙</>,
    desc: (
      <>상품·기간 등 모든 진행 과정에서<br />고객을 계약 조건으로 제한하지 않습니다</>
    ),
    tags: ['약정 없음', '자유로운 해지', '투명한 운영'],
  },
  {
    src: '/images/service-page/2.svg',
    srcMobile: '/images/service-page/headphone-mobile.svg',
    badge: 'REAL-TIME',
    title: <>경쟁 분석부터 대응까지,{' '}<span className="text-primary">하나의 시스템</span>으로</>,
    desc: (
      <>시장과 경쟁사 흐름을 실시간으로<br />분석하고 상황별 대응 전략을 수립해<br />성과 변화를 리포트로 체계화합니다</>
    ),
    tags: ['경쟁사 분석', '실시간 대응', '성과 리포트'],
  },
  {
    src: '/images/service-page/3.svg',
    srcMobile: '/images/service-page/Avatar-mobile.svg',
    badge: 'AI POWERED',
    title: <>정답 키워드{' '}<span className="text-primary">AI 세팅</span></>,
    desc: (
      <>모든 플랫폼의 타겟별 알고리즘을<br />상시 분석·해석해 성과 가능성이<br />검증된 핵심 키워드를 선별하고<br />각 채널에 최적화된 구조로 적용합니다</>
    ),
    tags: ['AI 분석', '키워드 최적화', '채널별 전략'],
  },
  {
    src: '/images/service-page/4.svg',
    srcMobile: '/images/service-page/dna-mobile.svg',
    badge: 'BRAND DNA',
    title: <>브랜드 DNA{' '}<span className="text-primary">정밀 파악</span></>,
    desc: (
      <>브랜드의 정체성과 스토리, 시장의 위치,<br />대표님의 목표를 실행 이전에 먼저<br />완벽히 판단하고 설계합니다</>
    ),
    tags: ['브랜드 분석', '목표 설계', '맞춤 전략'],
  },
];

export default function ServicePrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white w-full relative overflow-hidden">
      <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-[180px]">
        <h2 className="m-0 font-sans text-[22px] sm:text-[26px] font-semibold leading-normal text-center text-main">
          마케팅의 새로운 기준,{' '}
          <span className="relative inline-block">
            <span className="relative z-10">기본부터 다릅니다.</span>
            <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary/20 rounded-sm" />
          </span>
        </h2>

        {/* 4열 원칙 카드 */}
        <div className="mt-6 sm:mt-8 relative">
          <div className="relative w-full max-w-[1163px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-4 gap-14 sm:gap-10 items-start justify-items-center">
            {cards.map((card, i) => (
              <div key={i} className="text-center max-w-[280px] mx-auto">
                {/* 뱃지 - 가장 먼저 */}
                <span
                  className="inline-block mb-3 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-sans text-[10px] sm:text-[11px] font-semibold tracking-widest transition-all duration-500 ease-out"
                  style={{
                    transitionDelay: `${200 + i * 120}ms`,
                    opacity: animated ? 1 : 0,
                    transform: animated ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.9)',
                  }}
                >
                  {card.badge}
                </span>

                {/* 이미지 */}
                <div
                  className="transition-all duration-700 ease-out"
                  style={{
                    transitionDelay: `${350 + i * 120}ms`,
                    opacity: animated ? 1 : 0,
                    transform: animated ? 'translateY(0)' : 'translateY(30px)',
                  }}
                >
                  <Image
                    src={card.srcMobile}
                    alt=""
                    width={228}
                    height={240}
                    className="sm:hidden w-[110px] h-auto mx-auto relative z-10"
                  />
                  <Image
                    src={card.src}
                    alt=""
                    width={228}
                    height={240}
                    className="hidden sm:block w-[150px] h-auto mx-auto relative z-10"
                  />
                </div>

                {/* 타이틀 */}
                <p
                  className="m-0 mt-4 sm:mt-6 font-sans text-[14px] sm:text-[16px] font-semibold text-sub1 transition-all duration-600 ease-out"
                  style={{
                    transitionDelay: `${520 + i * 120}ms`,
                    opacity: animated ? 1 : 0,
                    transform: animated ? 'translateY(0)' : 'translateY(16px)',
                  }}
                >
                  {card.title}
                </p>

                {/* 설명 */}
                <p
                  className="m-0 mt-2 sm:mt-3 font-sans text-[12px] sm:text-[13px] font-light text-sub2 leading-relaxed transition-all duration-600 ease-out"
                  style={{
                    transitionDelay: `${640 + i * 120}ms`,
                    opacity: animated ? 1 : 0,
                    transform: animated ? 'translateY(0)' : 'translateY(12px)',
                  }}
                >
                  {card.desc}
                </p>

                {/* 태그 - 마지막에 하나씩 */}
                <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-1.5">
                  {card.tags.map((tag, ti) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full border border-primary/30 text-primary font-sans text-[10px] sm:text-[11px] font-medium transition-all duration-500 ease-out"
                      style={{
                        transitionDelay: `${760 + i * 120 + ti * 80}ms`,
                        opacity: animated ? 1 : 0,
                        transform: animated ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.92)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

