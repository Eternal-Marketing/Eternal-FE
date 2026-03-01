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
    title: '모든 계약, 약정 없는 운영 원칙',
    desc: (
      <>상품·기간 등 모든 진행 과정에서<br />고객을 계약 조건으로 제한하지 않습니다</>
    ),
  },
  {
    src: '/images/service-page/2.svg',
    title: '경쟁 분석부터 대응까지, 하나의 시스템으로',
    desc: (
      <>시장과 경쟁사 흐름을 실시간으로<br />분석하고 상황별 대응 전략을 수립해<br />성과 변화를 리포트로 체계화합니다</>
    ),
  },
  {
    src: '/images/service-page/3.svg',
    title: '최고 효율을 설계하는 정답 키워드 AI 세팅',
    desc: (
      <>모든 플랫폼의 타겟별 알고리즘을<br />상시 분석·해석해 성과 가능성이<br />검증된 핵심 키워드를 선별하고<br />각 채널에 최적화된 구조로 적용합니다</>
    ),
  },
  {
    src: '/images/service-page/4.svg',
    title: '브랜드 DNA 정밀 파악',
    desc: (
      <>브랜드의 정체성과 스토리, 시장의 위치,<br />대표님의 목표를 실행 이전에 먼저<br />완벽히 판단하고 설계합니다</>
    ),
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
      {/* 파란 배경 스트립 - 가운데서 좌우로 펼쳐지는 애니메이션 */}
      <div
        className="absolute left-1/2 right-auto bg-[#e7ebff] transition-all duration-700 ease-out"
        style={{
          top: '44%',
          transform: 'translateY(-50%)',
          height: '180px',
          width: animated ? '100%' : '0%',
          left: animated ? '0%' : '50%',
        }}
      />

      <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-[130px]">
        <h2 className="m-0 font-sans text-[22px] sm:text-[26px] font-semibold leading-normal text-center text-main">
          마케팅의 새로운 기준, 기본부터 다릅니다.
        </h2>

        {/* 4열 원칙 카드 */}
        <div className="mt-6 sm:mt-8 relative">
          <div className="relative w-full max-w-[1163px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-10 items-start justify-items-center">
            {cards.map((card, i) => (
              <div
                key={i}
                className="text-center max-w-[280px] mx-auto transition-all duration-700 ease-out"
                style={{
                  transitionDelay: `${300 + i * 150}ms`,
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateY(0)' : 'translateY(40px)',
                }}
              >
                <Image
                  src={card.src}
                  alt=""
                  width={228}
                  height={240}
                  className="w-[180px] h-auto sm:w-[228px] mx-auto relative z-10"
                />
                <p className="m-0 mt-4 sm:mt-6 font-sans text-[14px] sm:text-[16px] font-semibold text-sub1">
                  {card.title}
                </p>
                <p className="m-0 mt-2 sm:mt-3 font-sans text-[12px] sm:text-[13px] font-light text-sub2 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

