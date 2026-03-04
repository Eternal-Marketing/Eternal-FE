'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * 프로세스(무한대) 섹션 (홈)
 * - 중앙 무한대 루프 + 4단계 STEP(판단·설계·실행·관리) 플로우
 */
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
  const stepCardClass = 'relative step-card rounded-xl';
  const stepCardInner = 'p-4 sm:p-5 lg:p-6';
  const stepTitleClass = 'font-sans text-[18px] sm:text-[16px] lg:text-[18px] font-bold leading-normal text-main text-center sm:text-left';
  const stepDescClass = 'font-sans text-[13px] sm:text-[13px] lg:text-[14px] font-medium leading-relaxed text-sub1 text-center sm:text-left';

  return (
    <section 
      id="infinite" 
      className="relative overflow-hidden z-30 w-full bg-[#F6F6F6] min-h-0 py-10 sm:py-14 lg:h-[1000px] lg:py-[80px]"
      >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[40px] desktop:px-[60px] relative z-10">
        {/* 섹션 제목 - 모바일만 반응형, lg 이상은 원래 값 */}
        <FadeIn>
          <div className="text-center mt-8 sm:mt-10 mb-4 sm:mb-5 lg:mt-[60px] lg:mb-5">
          <div className="w-full px-4 sm:px-6 py-3 sm:py-4 lg:px-8 lg:py-6">
            <h2 
              className="mb-1 sm:mb-2 font-sans text-[22px] sm:text-[26px] font-bold leading-normal text-main text-center lg:mb-2 lg:text-[34px]"
            >
              결과가 왜 다를까요?
            </h2>
            <h2 
              className="font-sans text-[22px] sm:text-[26px] font-bold leading-normal text-main text-center lg:text-[34px]"
            >
              이터널은{" "}
              <span className="inline-block bg-gradient-to-r from-[#1a4fd6] to-[#3273ff] text-white px-2 sm:px-3 py-0.5 rounded-lg shadow-md shadow-[#1a4fd6]/15">
                시작
              </span>
              이 다릅니다
            </h2>
          </div>
        </div>
        </FadeIn>

        {/* 메인 콘텐츠: 모바일은 세로 배치, lg 이상은 기존 절대 위치 */}
        <div className="relative w-full flex flex-col gap-4 sm:gap-6 lg:block lg:min-h-[750px]">
          {/* 중앙 무한대 루프 아이콘 */}
          <ScaleIn 
            delay={200} 
            className="order-first w-full max-w-[320px] sm:max-w-[320px] mx-auto aspect-[480/230] my-8 sm:my-0 lg:absolute lg:top-[35%] lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[480px] lg:max-w-none lg:aspect-auto lg:h-[230px] z-10 shrink-0 lg:order-none lg:my-0"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/reviewSection/infinite.svg"
                alt="Infinite Loop"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 320px, 480px"
              />
              {/* 01 - 왼쪽 상단 */}
              <div className="absolute text-white font-bold text-[10px] sm:text-[12px]" style={{ top: '10%', left: '21%' }}>
                01
              </div>
              {/* 03 - 오른쪽 상단 */}
              <div className="absolute text-white font-bold text-[10px] sm:text-[12px]" style={{ top: '10%', right: '21%' }}>
                03
              </div>
              {/* 04 - 왼쪽 하단 */}
              <div className="absolute text-white font-bold text-[10px] sm:text-[12px]" style={{ bottom: '11%', left: '25%' }}>
                04
              </div>
              {/* 02 - 오른쪽 하단 */}
              <div className="absolute text-white font-bold text-[10px] sm:text-[12px]" style={{ bottom: '11%', right: '25%' }}>
                02
              </div>
            </div>
          </ScaleIn>

          {/* STEP 01 */}
            <SlideInLeft 
              delay={400} 
              className="order-1 w-full mx-auto lg:mx-0 lg:absolute lg:left-[4%] lg:z-20 lg:w-[320px] lg:top-[calc(35%-250px)] lg:left-[13%]"
            >
              <div className="sm:hidden border-b border-black/8 py-6 flex flex-col items-center text-center">
                <Image src="/images/reviewSection/Magnifier.svg" alt="Magnifier Icon" width={40} height={40} className="w-10 h-10 object-contain mb-3" />
                <h3 className={stepTitleClass}>STEP 01</h3>
                <p className={`${stepDescClass} mt-2`}>
                  AI 진단 문진표를 기반으로<br />
                  대표님의 업체를 분석하고<br />
                  문제 지점을 데이터로 구조화합니다.
                </p>
              </div>
              <div className={`hidden sm:block ${stepCardClass}`}>
                <div className={stepCardInner}>
                  <div className="flex items-center mb-1">
                    <Image src="/images/reviewSection/Magnifier.svg" alt="Magnifier Icon" width={18} height={17} className="w-4 h-[17px] sm:w-[18px] flex-shrink-0 mr-1.5 sm:mr-[6px] object-contain" />
                    <h3 className={stepTitleClass}>STEP 01</h3>
                  </div>
                  <p className={`${stepDescClass} ml-5 sm:ml-6`}>
                    AI 진단 문진표를 기반으로<br />
                    대표님의 업체를 분석하고<br />
                    문제 지점을 데이터로 구조화합니다.
                  </p>
                </div>
              </div>
            </SlideInLeft>

          {/* STEP 02 */}
            <SlideInRight 
              delay={500} 
              className="order-2 w-full mx-auto lg:mx-0 lg:absolute lg:right-[4%] lg:z-20 lg:w-[320px] lg:top-[calc(35%+150px)] lg:right-[13%]"
            >
              <div className="sm:hidden border-b border-black/8 py-6 flex flex-col items-center text-center">
                <Image src="/images/reviewSection/people.svg" alt="People Icon" width={40} height={40} className="w-10 h-10 object-contain mb-3" />
                <h3 className={stepTitleClass}>STEP 02</h3>
                <p className={`${stepDescClass} mt-2`}>
                  분석 결과를 바탕으로 업종과 목표에 맞는<br />
                  전문 담당 팀을 구성합니다.
                </p>
              </div>
              <div className={`hidden sm:block ${stepCardClass}`}>
                <div className={stepCardInner}>
                  <div className="flex items-center mb-1">
                    <Image src="/images/reviewSection/people.svg" alt="People Icon" width={22} height={22} className="w-5 h-5 sm:w-[22px] sm:h-[22px] flex-shrink-0 mr-1.5 sm:mr-[6px] object-contain" />
                    <h3 className={stepTitleClass}>STEP 02</h3>
                  </div>
                  <p className={`${stepDescClass} ml-5 sm:ml-7`}>
                    분석 결과를 바탕으로 업종과 목표에 맞는<br />
                    전문 담당 팀을 구성합니다.
                  </p>
                </div>
              </div>
            </SlideInRight>

          {/* STEP 03 */}
            <SlideInRight 
              delay={600} 
              className="order-4 w-full mx-auto lg:mx-0 lg:absolute lg:right-[4%] lg:z-20 lg:w-[320px] lg:top-[calc(35%-250px)] lg:right-[13%]"
            >
              <div className="sm:hidden border-b border-black/8 py-6 flex flex-col items-center text-center">
                <Image src="/images/reviewSection/arrows.svg" alt="Arrow Icon" width={40} height={40} className="w-10 h-10 object-contain mb-3" />
                <h3 className={stepTitleClass}>STEP 03</h3>
                <p className={`${stepDescClass} mt-2`}>
                  대표님의 상황과 목표에 맞춰 가장 효율적인<br />
                  전략으로 실행합니다.
                </p>
              </div>
              <div className={`hidden sm:block ${stepCardClass}`}>
                <div className={stepCardInner}>
                  <div className="flex items-center mb-1">
                    <Image src="/images/reviewSection/arrows.svg" alt="Arrow Icon" width={28} height={22} className="w-6 h-5 sm:w-7 sm:h-[22px] flex-shrink-0 mr-1.5 sm:mr-[6px] object-contain" />
                    <h3 className={stepTitleClass}>STEP 03</h3>
                  </div>
                  <p className={`${stepDescClass} ml-6 sm:ml-8`}>
                    대표님의 상황과 목표에 맞춰 가장 효율적인<br />
                    전략으로 실행합니다.
                  </p>
                </div>
              </div>
            </SlideInRight>

          {/* STEP 04 */}
            <SlideInLeft 
              delay={700} 
              className="order-5 w-full mx-auto lg:mx-0 lg:absolute lg:left-[4%] lg:z-20 lg:w-[320px] lg:top-[calc(35%+150px)] lg:left-[13%]"
            >
              <div className="sm:hidden py-6 flex flex-col items-center text-center">
                <Image src="/images/reviewSection/pen.svg" alt="Pen Icon" width={40} height={40} className="w-10 h-10 object-contain mb-3" />
                <h3 className={stepTitleClass}>STEP 04</h3>
                <p className={`${stepDescClass} mt-2`}>
                  AI 세밀 분석 리포트로 성과를<br />
                  상시 관리하고 상세히 보고합니다.
                </p>
              </div>
              <div className={`hidden sm:block ${stepCardClass}`}>
                <div className={stepCardInner}>
                  <div className="flex items-center mb-1">
                    <Image src="/images/reviewSection/pen.svg" alt="Pen Icon" width={22} height={22} className="w-5 h-5 sm:w-[22px] sm:h-[22px] flex-shrink-0 mr-1.5 sm:mr-[6px] object-contain" />
                    <h3 className={stepTitleClass}>STEP 04</h3>
                  </div>
                  <p className={`${stepDescClass} ml-5 sm:ml-7`}>
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

