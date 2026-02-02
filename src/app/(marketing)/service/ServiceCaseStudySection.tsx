'use client';

import { useMemo, useState } from 'react';

type Card = {
  id: string;
  title: string;
  caption: React.ReactNode;
  lines: string[];
};

const CASE_TITLE = ['S 패션 브랜드 D2C 쇼핑몰', 'D2C 쇼핑몰'];

export default function ServiceCaseStudySection() {
  const slides = useMemo(() => {
    const cards: Card[] = [
      {
        id: 'base-setup',
        title: '기초 사업자 세팅',
        caption: '초기사업자분들이 놓치기 쉬운 손실 요인을 사전에 차단합니다',
        lines: [
          '카카오페이, 쿠팡, 필수AI 사업자 세팅',
          '플랫폼 별 통합 정리',
          '업종별 최적화 AI 기본 세팅',
        ],
      },
      {
        id: 'brand-web-seo',
        title: '기초 사업자 세팅',
        caption: (
          <>
            브랜드의 고유한 특성과 대표님의 목적을 정밀하게 분석하여
            <br />
            기획 및 디자인을 진행하며 매출 전환에 필요한 모든 기능이
            <br />
            구현 가능하도록 개발합니다
          </>
        ),
        lines: [
          '브랜드 아이덴티티 기반 스토리 기획',
          '브랜드 장르를 반영한 웹 디자인 설계',
          '검색 알고리즘 분석 기반 SEO 최적화 개발',
        ],
      },
      {
        id: 'shortform-ops',
        title: '기초 사업자 세팅',
        caption: (
          <>
            알고리즘을 변화를 지속적으로 반영해 트렌드를 선제적으로 반영하고,
            <br />
            고객의 기억에 각인되는 숏폼 콘텐츠로 기획·운영합니다
          </>
        ),
        lines: [
          '유투브 숏츠, 인스타 릴스, 틱톡 인피드',
          '플랫폼별 맞춤 기획',
          '알고리즘 분석 및 최신화',
          '노출값 극대화',
          'AI정답 키워드 세팅',
        ],
      },
    ];
    return [cards];
  }, []);

  const [idx, setIdx] = useState(0);
  const canPrev = idx > 0;
  const canNext = idx < slides.length - 1;
  const cards = slides[idx];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/service-page/d2c-background.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1163px] mx-auto px-4 py-[180px]">
        <h2 className="m-0 font-sans text-[20px] md:text-[24px] font-semibold text-white text-center leading-tight">
          {CASE_TITLE[0]}
          <br />
          {CASE_TITLE[1]}
        </h2>

        <div className="mt-20 flex items-center justify-center gap-4 lg:gap-6">
          <button
            type="button"
            onClick={() => (canPrev ? setIdx((v) => v - 1) : null)}
            disabled={!canPrev}
            className="group flex-shrink-0 p-2 disabled:opacity-40"
            aria-label="Previous"
          >
            <svg
              width="28"
              height="50"
              viewBox="0 0 30 53"
              fill="none"
              className="-scale-x-100 [&_path]:transition-[fill] [&_path]:duration-300 group-hover:[&_path]:fill-white [&_path]:fill-white/70"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.09835 1.10219C2.56282 -0.367397 4.93718 -0.367397 6.40165 1.10219L28.9017 23.6809C30.3661 25.1505 30.3661 27.5331 28.9017 29.0027L6.40165 51.5814C4.93718 53.051 2.56282 53.051 1.09835 51.5814C-0.366117 50.1118 -0.366117 47.7292 1.09835 46.2596L20.9467 26.3418L1.09835 6.42404C-0.366117 4.95445 -0.366117 2.57178 1.09835 1.10219Z"
              />
            </svg>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 max-w-[900px]">
            {cards.map((c) => (
              <div
                key={c.id}
                className="rounded-[5px] bg-white/85 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 py-5"
              >
                <p className="m-0 font-sans text-[18px] font-medium text-main">{c.title}</p>
                <p className="m-0 mt-3 font-sans text-[10px] font-light text-sub1 leading-relaxed">
                  {c.caption}
                </p>
                <div className="mt-4 font-sans text-[13px] text-main leading-relaxed">
                  {c.lines.map((line) => (
                    <p key={line} className="m-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => (canNext ? setIdx((v) => v + 1) : null)}
            disabled={!canNext}
            className="group flex-shrink-0 p-2 disabled:opacity-40"
            aria-label="Next"
          >
            <svg
              width="28"
              height="50"
              viewBox="0 0 30 53"
              fill="none"
              className="[&_path]:transition-[fill] [&_path]:duration-300 group-hover:[&_path]:fill-white [&_path]:fill-white/70"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.09835 1.10219C2.56282 -0.367397 4.93718 -0.367397 6.40165 1.10219L28.9017 23.6809C30.3661 25.1505 30.3661 27.5331 28.9017 29.0027L6.40165 51.5814C4.93718 53.051 2.56282 53.051 1.09835 51.5814C-0.366117 50.1118 -0.366117 47.7292 1.09835 46.2596L20.9467 26.3418L1.09835 6.42404C-0.366117 4.95445 -0.366117 2.57178 1.09835 1.10219Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

