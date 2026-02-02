'use client';
/**
 * 케이스 스터디 섹션
 * - 슬라이드별 고객 사례(제목 2줄 + 카드 여러 개)
 * - 이전/다음 버튼 + 터치 스와이프, 진입 시 콘텐츠 페이드인
 */

import { useMemo, useState, useRef, useEffect } from 'react';

const SWIPE_THRESHOLD = 50;

type Card = {
  id: string;
  title: string;
  caption: React.ReactNode;
  lines: string[];
};

type Slide = {
  titleLines: [string, string];
  cards: Card[];
};

export default function ServiceCaseStudySection() {
  // 슬라이드 데이터: S패션/K외식/Y의료 등 고객 유형별 카드 목록
  const slides = useMemo((): Slide[] => {
    return [
      {
        titleLines: ['S 패션 브랜드 D2C 쇼핑몰', 'D2C 쇼핑몰'],
        cards: [
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
        ],
      },
      {
        titleLines: ['K', '육류 전문 외식업체'],
        cards: [
          {
            id: 'catering-setting',
            title: '요식업 전문 세팅',
            caption: '각 플랫폼별 브랜드 스토리 기반 계정 디자인 통일화',
            lines: [
              '검색광고 엔진 시간대, 요일, 상권별 특화 노출 전략 세팅',
              '(비용대비 최대의 성과로 최적의 효율을 도출합니다)',
            ],
          },
          {
            id: 'naver-marketing',
            title: '네이버 마케팅',
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
            id: 'meta-search-ads',
            title: '메타 검색 광고',
            caption: (
              <>
                지역 상권 내에서 인지도와 신뢰를 자연스럽게 구축해
                <br />
                친숙한 브랜드 인식을 형성하고 실제 방문으로 이어지도록 설계합니다.
              </>
            ),
            lines: [
              '지역·검색 기반 AI정답키워드 확립',
              '광고 계정 전용 세팅',
              '문구 기획 운영 가이드 제공',
            ],
          },
        ],
      },
      {
        titleLines: ['Y', '의료 서비스 전문 기관'],
        cards: [
          {
            id: 'branding-unify',
            title: '브랜딩 획일화',
            caption: (
              <>
                브랜드별 이미지·비주얼을 기획·적용하여
                <br />
                전문적인 인상 구축과 신뢰 강화를 이룹니다.
              </>
            ),
            lines: [
              '네이버, 인스타그램, 카카오톡 등 플랫폼별 브랜드 디자인 스킨 제작',
              '브랜드 전문가 칼럼 콘텐츠 제작',
              '플랫폼별 설정에 따른 고객 문의 최적화',
            ],
          },
          {
            id: 'naver-momcafe',
            title: '네이버 맘카페 커뮤니티 마케팅',
            caption: (
              <>
                지역 상권 내에서 인지도와 신뢰를 자연스럽게 구축해
                <br />
                친숙한 브랜드 인식을 형성하고 실제 방문·전환으로 이어지도록 설계합니다.
              </>
            ),
            lines: [
              '브랜드 특화 자연 노출·신뢰 축적형 후기 구조',
              '후기 콘텐츠 기획 및 운영',
            ],
          },
        ],
      },
    ];
  }, []);

  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0); // 1: 다음, -1: 이전 (애니 클래스용)
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);

  const canPrev = idx > 0;
  const canNext = idx < slides.length - 1;
  const currentSlide = slides[idx];
  const cards = currentSlide.cards;

  // 섹션 진입 시 isInView → 콘텐츠 opacity 전환 (CSS)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 터치 스와이프: 일정 거리 이상이면 이전/다음 슬라이드
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchStartX.current;
    if (diff < -SWIPE_THRESHOLD) goNext();
    else if (diff > SWIPE_THRESHOLD) goPrev();
  };

  const goPrev = () => {
    if (!canPrev) return;
    setDirection(-1);
    setIdx((v) => v - 1);
  };
  const goNext = () => {
    if (!canNext) return;
    setDirection(1);
    setIdx((v) => v + 1);
  };

  const slideAnimationClass =
    direction === 1
      ? 'animate-slide-in-from-right'
      : direction === -1
        ? 'animate-slide-in-from-left'
        : 'animate-fade-in-up';

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${isInView ? 'case-study-in-view' : ''}`}
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <img
          src="/images/service-page/d2c-background.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="case-study-content relative z-10 w-full max-w-[1163px] mx-auto px-4 py-[180px] opacity-0">
        {/* 현재 슬라이드 제목 2줄 */}
        <h2 className="m-0 font-sans text-[20px] md:text-[24px] font-semibold text-white text-center leading-tight">
          {currentSlide.titleLines[0]}
          <br />
          {currentSlide.titleLines[1]}
        </h2>

        {/* 이전 버튼 + 카드 그리드 + 다음 버튼 (스와이프 지원) */}
        <div
          className="mt-20 flex items-center justify-center gap-4 lg:gap-6 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            className={`group flex-shrink-0 p-2 disabled:opacity-40 ${canPrev ? 'case-study-swipe-hint-left' : ''}`}
            aria-label="Previous"
          >
            <svg
              width="28"
              height="50"
              viewBox="0 0 30 53"
              fill="none"
              className="-scale-x-100 [&_path]:transition-[fill] [&_path]:duration-300 [&_path]:fill-white/70 group-hover:[&_path]:fill-white"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.09835 1.10219C2.56282 -0.367397 4.93718 -0.367397 6.40165 1.10219L28.9017 23.6809C30.3661 25.1505 30.3661 27.5331 28.9017 29.0027L6.40165 51.5814C4.93718 53.051 2.56282 53.051 1.09835 51.5814C-0.366117 50.1118 -0.366117 47.7292 1.09835 46.2596L20.9467 26.3418L1.09835 6.42404C-0.366117 4.95445 -0.366117 2.57178 1.09835 1.10219Z"
              />
            </svg>
          </button>

          {/* 현재 슬라이드 카드들 (2열 또는 3열, 방향에 따라 슬라이드 애니메이션) */}
          <div
            key={idx}
            className={`grid grid-cols-1 gap-4 lg:gap-5 max-w-[900px] ${cards.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} ${slideAnimationClass}`}
          >
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
            onClick={goNext}
            disabled={!canNext}
            className={`group flex-shrink-0 p-2 disabled:opacity-40 ${canNext ? 'case-study-swipe-hint-right' : ''}`}
            aria-label="Next"
          >
            <svg
              width="28"
              height="50"
              viewBox="0 0 30 53"
              fill="none"
              className="[&_path]:transition-[fill] [&_path]:duration-300 [&_path]:fill-white/70 group-hover:[&_path]:fill-white"
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

