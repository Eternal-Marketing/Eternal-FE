'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * InfiniteSection - 프로세스 섹션 컴포넌트
 * 중앙 무한대 루프와 4개의 STEP으로 구성된 프로세스 플로우를 표시
 */

// 페이드인 애니메이션 컴포넌트
function FadeIn({ children, delay = 0, className = '', style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

// 스케일인 애니메이션 컴포넌트
function ScaleIn({ children, delay = 0, className = '', style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

// 왼쪽에서 슬라이드인 애니메이션 컴포넌트
function SlideInLeft({ children, delay = 0, className = '', style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

// 오른쪽에서 슬라이드인 애니메이션 컴포넌트
function SlideInRight({ children, delay = 0, className = '', style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

export default function InfiniteSection() {
  return (
    <section 
      id="infinite" 
      className="relative overflow-hidden z-30 w-full bg-[#F6F6F6] h-[1000px] py-[80px]"
      >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[32px] lg:px-[40px] desktop:px-[60px] relative z-10">
        {/* 섹션 제목 */}
        <FadeIn>
          <div className="text-center" style={{ marginTop: '60px', marginBottom: '20px' }}>
          <div 
            style={{ 
              padding: '24px 32px',
              display: 'inline-block'
            }}
          >
            <h2 
              className="mb-2 font-sans text-[26px] md:text-[30px] lg:text-[34px] font-bold leading-normal text-main text-center"
            >
              결과가 왜 다를까요?
            </h2>
            <h2 
              className="font-sans text-[26px] md:text-[30px] lg:text-[34px] font-bold leading-normal text-main text-center"
            >
              이터널은{" "}
              <span className="inline-block bg-gradient-to-r from-[#1a4fd6] to-[#3273ff] text-white px-3 py-0.5 rounded-lg shadow-md shadow-[#1a4fd6]/15">
                시작
              </span>
              이 다릅니다
            </h2>
          </div>
        </div>
        </FadeIn>

        {/* 메인 콘텐츠: 중앙 무한대 루프와 4개 STEP */}
        <div className="relative w-full" style={{ minHeight: '750px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {/* 중앙 무한대 루프 아이콘 */}
          <ScaleIn delay={200} className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ width: '480px', height: '230px' }}>
            <div className="relative w-full h-full">
              <img 
                src="/images/reviewSection/infinite.svg" 
                alt="Infinite Loop"
                style={{ 
                  width: '100%', 
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
              {/* 01 - 왼쪽 상단 */}
              <div className="absolute text-white font-bold text-[14px]" style={{ top: '10%', left: '21%' }}>
                01
              </div>
              {/* 03 - 오른쪽 상단 */}
              <div className="absolute text-white font-bold text-[14px]" style={{ top: '10%', right: '21%' }}>
                03
              </div>
              {/* 04 - 왼쪽 하단 */}
              <div className="absolute text-white font-bold text-[14px]" style={{ bottom: '11%', left: '25%' }}>
                04
              </div>
              {/* 02 - 오른쪽 하단 */}
              <div className="absolute text-white font-bold text-[14px]" style={{ bottom: '11%', right: '25%' }}>
                02
              </div>
            </div>
          </ScaleIn>

          {/* STEP 01: AI 진단 및 분석 */}
            <SlideInLeft delay={400} className="absolute left-[12%] md:left-[15%] z-20" style={{ maxWidth: '280px', width: '100%', top: 'calc(35% - 250px)' }}>
              <div className="relative step-card rounded-xl">
                <div style={{ padding: '16px' }}>
                  <div className="flex items-center mb-1">
                    <img 
                      src="/images/reviewSection/Magnifier.svg" 
                      alt="Magnifier Icon"
                      style={{ width: '18px', height: '17px', flexShrink: 0, marginRight: '6px' }}
                    />
                    <h3 
                      className="font-sans text-[14px] md:text-[16px] font-semibold leading-normal text-main text-left"
                    >
                      STEP 01
                    </h3>
                  </div>
                  <p 
                    className="font-sans text-[12px] md:text-[13px] font-medium leading-normal text-sub1"
                    style={{ marginLeft: '24px' }}
                  >
                    AI 진단 문진표를 기반으로<br />
                    대표님의 업체를 분석하고<br />
                    문제 지점을 데이터로 구조화합니다.
                  </p>
                </div>
              </div>
            </SlideInLeft>

          {/* STEP 02: 전문 담당 팀 구성 */}
            <SlideInRight delay={500} className="absolute right-[12%] md:right-[15%] z-20" style={{ maxWidth: '280px', width: '100%', top: 'calc(35% + 150px)' }}>
              <div className="relative step-card rounded-xl">
                <div style={{ padding: '16px' }}>
                  <div className="flex items-center mb-1">
                    <img 
                      src="/images/reviewSection/people.svg" 
                      alt="People Icon"
                      style={{ width: '22px', height: '22px', flexShrink: 0, marginRight: '6px' }}
                    />
                    <h3 
                      className="font-sans text-[14px] md:text-[16px] font-semibold leading-normal text-main text-left"
                    >
                      STEP 02
                    </h3>
                  </div>
                  <p 
                    className="font-sans text-[12px] md:text-[13px] font-medium leading-normal text-sub1"
                    style={{ marginLeft: '28px' }}
                  >
                    분석 결과를 바탕으로 업종과 목표에 맞는<br />
                    전문 담당 팀을 구성합니다.
                  </p>
                </div>
              </div>
            </SlideInRight>

          {/* STEP 03: 전략 실행 */}
            <SlideInRight delay={600} className="absolute right-[12%] md:right-[15%] z-20" style={{ maxWidth: '280px', width: '100%', top: 'calc(35% - 250px)' }}>
              <div className="relative step-card rounded-xl">
                <div style={{ padding: '16px' }}>
                  <div className="flex items-center mb-1">
                    <img 
                      src="/images/reviewSection/arrows.svg" 
                      alt="Arrow Icon"
                      style={{ width: '28px', height: '22px', flexShrink: 0, marginRight: '6px' }}
                    />
                    <h3 
                      className="font-sans text-[14px] md:text-[16px] font-semibold leading-normal text-main text-left"
                    >
                      STEP 03
                    </h3>
                  </div>
                  <p 
                    className="font-sans text-[12px] md:text-[13px] font-medium leading-normal text-sub1"
                    style={{ marginLeft: '34px' }}
                  >
                    대표님의 상황과 목표에 맞춰 가장 효율적인<br />
                    전략으로 실행합니다.
                  </p>
                </div>
              </div>
            </SlideInRight>

          {/* STEP 04: 성과 관리 및 보고 */}
            <SlideInLeft delay={700} className="absolute left-[12%] md:left-[15%] z-20" style={{ maxWidth: '280px', width: '100%', top: 'calc(35% + 150px)' }}>
              <div className="relative step-card rounded-xl">
                <div style={{ padding: '16px' }}>
                  <div className="flex items-center mb-1">
                    <img 
                      src="/images/reviewSection/pen.svg" 
                      alt="Pen Icon"
                      style={{ width: '22px', height: '22px', flexShrink: 0, marginRight: '6px' }}
                    />
                    <h3 
                      className="font-sans text-[14px] md:text-[16px] font-semibold leading-normal text-main text-left"
                    >
                      STEP 04
                    </h3>
                  </div>
                  <p 
                    className="font-sans text-[12px] md:text-[13px] font-medium leading-normal text-sub1"
                    style={{ marginLeft: '28px' }}
                  >
                    AI 세밀 분석 리포트로 성과를<br />
                    상시 관리하고 상세히 보고합니다.
                  </p>
                </div>
              </div>
            </SlideInLeft>
        </div>
      </div>
    </section>
  );
}

