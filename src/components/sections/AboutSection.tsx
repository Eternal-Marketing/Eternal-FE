'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

/**
 * 회사 소개 섹션 (홈)
 * - AI 마케팅 인텔리전스 소개, 데이터·통계(카운트업), 전문 인력 정보
 */
function CountUpNumber({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
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
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// 페이드인 애니메이션 컴포넌트
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// 슬라이드인 애니메이션 컴포넌트
function SlideIn({ children, direction = 'left', delay = 0, className = '' }: { children: React.ReactNode; direction?: 'left' | 'right' | 'up' | 'down'; delay?: number; className?: string }) {
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

  const directionClasses = {
    left: isVisible ? 'translate-x-0' : '-translate-x-12',
    right: isVisible ? 'translate-x-0' : 'translate-x-12',
    up: isVisible ? 'translate-y-0' : '-translate-y-12',
    down: isVisible ? 'translate-y-0' : 'translate-y-12',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${directionClasses[direction]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#fdfeff] overflow-hidden relative z-30 rounded-t-2xl sm:rounded-t-3xl lg:rounded-t-[80px]" data-node-id="127:907">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 desktop:px-[60px] pt-16 sm:pt-14 lg:pt-[100px] desktop:pt-[120px] pb-16 sm:pb-14 lg:pb-[100px] desktop:pb-[120px]">

        <FadeIn>
          <div className="text-center mb-8 sm:mb-10 lg:mb-12" data-node-id="127:908">
            <h2 className="font-sans text-[24px] sm:text-[30px] lg:text-[44px] font-bold leading-tight text-main">
              정답은 이미{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#000d2a] via-[#3273ff] to-black">
                데이터
              </span>{" "}
              속에 존재합니다.
            </h2>
            <p className="font-sans text-[24px] sm:text-[30px] lg:text-[44px] font-bold leading-tight text-main">
              문제는 그것을 보지 않는 선택입니다.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="text-center mb-12 sm:mb-16 lg:mb-[120px] desktop:mb-[140px]" data-node-id="127:909">
            <p className="font-sans text-[15px] sm:text-[17px] lg:text-[22px] font-medium leading-relaxed text-main text-center">
              수많은 대행사의 결과물 및 서비스 구조를 담은{" "}
              <span className="text-[#134bc4]">AI</span>와
            </p>
            <p className="font-sans text-[15px] sm:text-[17px] lg:text-[22px] font-medium leading-relaxed text-main text-center">
              다년간의 실무 경험을 축적한{" "}
              <span className="text-[#134bc4]">전문 마케터</span>가 함께 판단합니다.
            </p>
          </div>
        </FadeIn>

        <div className="relative mb-12 sm:mb-16 lg:mb-24 desktop:mb-[120px] py-4 sm:py-6 lg:py-8">
          <FadeIn delay={300}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:-ml-8">
              <div className="flex flex-col items-center flex-shrink-0 relative" data-node-id="127:914">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 z-10 lg:hidden">
                  <span className="inline-flex items-center justify-center font-sans text-[11px] sm:text-[13px] font-semibold text-primary bg-[#EFF1FF] border border-primary/15 px-4 py-1.5 rounded-full shadow-[0_1px_2px_rgba(24,75,186,0.08)] tracking-wide leading-tight" data-node-id="127:916">
                    AI 마케팅 인텔리전스
                  </span>
                </span>
                <div className="w-[220px] h-[200px] lg:w-[320px] lg:h-[290px] relative mt-10 lg:mt-0" data-node-id="127:917">
                  <Image alt="Data results" fill className="object-contain" src="/images/main-1-laptop.png" sizes="320px" />
                </div>
              </div>

              <div className="text-center lg:text-left mt-6 sm:mt-8 lg:mt-0 lg:ml-6 whitespace-nowrap flex flex-col items-center lg:items-start" data-node-id="58:95">
                <span className="hidden lg:inline-flex items-center justify-center font-sans text-[11px] sm:text-[13px] font-semibold text-primary bg-[#EFF1FF] border border-primary/15 px-4 py-1.5 rounded-full mb-3 sm:mb-4 shadow-[0_1px_2px_rgba(24,75,186,0.08)] tracking-wide leading-tight" data-node-id="127:916">
                  AI 마케팅 인텔리전스
                </span>
                <p className="leading-tight inline">
                  <span className="font-sans text-[26px] sm:text-[30px] lg:text-[40px] font-extrabold text-[#184bba]">
                    <CountUpNumber end={1200000} duration={2000} />건+
                  </span>
                  <span className="font-sans text-[14px] sm:text-[16px] lg:text-[24px] font-bold text-main">
                    {" "}이상의{" "}
                  </span>
                  <span className="font-sans text-[14px] sm:text-[16px] lg:text-[24px] font-bold text-main">
                    데이터 결과 기반
                  </span>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="relative mb-12 sm:mb-16 lg:mb-24 desktop:mb-[120px] lg:pl-40 xl:pl-64">
          <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-end gap-6 sm:gap-8">
            <div className="flex flex-col items-center lg:flex-row lg:items-center gap-6 sm:gap-8 lg:gap-10 lg:mr-48 xl:mr-64">
            {/* 모바일: 뱃지 → 이미지 위로 배치 */}
            <div className="flex lg:hidden justify-center order-0" data-node-id="127:912-mobile">
              <span className="inline-flex items-center justify-center font-sans text-[11px] sm:text-[13px] font-semibold text-primary bg-[#EFF1FF] border border-primary/15 px-4 py-1.5 rounded-full shadow-[0_1px_2px_rgba(24,75,186,0.08)] tracking-wide leading-tight">
                업종별 최상위 전문 마케터
              </span>
            </div>
            <FadeIn delay={600} className="order-2 lg:order-1 lg:flex-1 w-full lg:w-auto">
              <div className="flex flex-col items-center lg:items-start" data-node-id="158:25">
                <div className="hidden lg:flex items-center justify-start mb-3 lg:mb-4" data-node-id="127:912-wrap">
                  <span className="inline-flex items-center justify-center font-sans text-[11px] sm:text-[13px] font-semibold text-primary bg-[#EFF1FF] border border-primary/15 px-4 py-1.5 rounded-full shadow-[0_1px_2px_rgba(24,75,186,0.08)] tracking-wide leading-tight" data-node-id="127:912">
                    업종별 최상위 전문 마케터
                  </span>
                </div>
                <div className="text-center lg:text-left mt-0 lg:mt-0" data-node-id="58:96">
                  <div className="mb-2 sm:mb-3 whitespace-nowrap">
                    <p className="font-sans text-[13px] sm:text-[14px] lg:text-[18px] font-bold text-main leading-tight">
                      프로젝트 연평균 매출 성장률{" "}
                      <span className="font-sans text-[26px] sm:text-[30px] lg:text-[40px] font-extrabold text-[#184bba]">
                        <CountUpNumber end={3} duration={1500} />배
                      </span>
                      <span className="font-sans text-[13px] sm:text-[14px] lg:text-[18px] font-bold text-main">
                        {" "}이상
                      </span>
                    </p>
                  </div>
                  <div data-node-id="127:939" className="whitespace-nowrap">
                    <p className="font-sans text-[13px] sm:text-[14px] lg:text-[18px] font-bold text-main leading-tight">
                      12년간 재계약률{" "}
                      <span className="font-sans text-[26px] sm:text-[30px] lg:text-[40px] font-extrabold text-[#184bba]">
                        <CountUpNumber end={98} duration={2000} suffix="%" />
                      </span>
                      <span className="font-sans text-[13px] sm:text-[14px] lg:text-[18px] font-bold text-main">
                        {" "}이상 유지중
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <SlideIn direction="left" delay={400} className="flex-shrink-0 order-1 lg:order-2 flex justify-center lg:justify-start">
              <div className="w-[180px] h-[155px] sm:w-[200px] sm:h-[170px] lg:w-[340px] lg:h-[290px] relative mx-auto lg:mx-0">
                <Image alt="Recontract rate" fill className="object-contain" src="/images/main-2-graph.png" sizes="340px" />
              </div>
            </SlideIn>
            </div>
          </div>
        </div>

        <div className="relative pt-2 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-20 desktop:pb-24">
          <div className="flex flex-col items-center lg:flex-row lg:items-center gap-0 sm:gap-3 lg:gap-16 lg:ml-32 xl:ml-64">
            <SlideIn direction="left" delay={700} className="flex-shrink-0 flex justify-center lg:justify-start w-full lg:w-auto">
              <div className="flex flex-col items-center relative" data-node-id="127:918">
                {/* 모바일: 뱃지를 이미지 위에 배치 */}
                <span className="absolute top-0 left-1/2 -translate-x-1/2 z-10 lg:hidden">
                  <span className="inline-flex items-center justify-center font-sans text-[11px] sm:text-[13px] font-semibold text-primary bg-[#EFF1FF] border border-primary/15 px-4 py-1.5 rounded-full shadow-[0_1px_2px_rgba(24,75,186,0.08)] tracking-wide leading-tight whitespace-nowrap shrink-0" data-node-id="127:936">
                    업종별 전문 인력으로 전담 팀 구성
                  </span>
                </span>
                <div className="w-[300px] h-[260px] sm:w-[360px] sm:h-[310px] lg:w-[540px] lg:h-[470px] relative mt-1 sm:mt-10 lg:mt-0 mx-auto lg:mx-0">
                  <Image alt="Team Structure" fill className="object-contain" src="/images/main-3-puzzle.png" sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 540px" />
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right" delay={800} className="lg:-ml-8">
              <div className="text-center lg:text-left flex flex-col items-center lg:items-start" data-node-id="58:97">
                <span className="hidden lg:inline-flex items-center justify-center font-sans text-[11px] sm:text-[13px] font-semibold text-primary bg-[#EFF1FF] border border-primary/15 px-4 py-1.5 rounded-full mb-3 lg:mb-4 shadow-[0_1px_2px_rgba(24,75,186,0.08)] tracking-wide leading-tight whitespace-nowrap shrink-0" data-node-id="127:936">
                  업종별 전문 인력으로 전담 팀 구성
                </span>
                <p className="font-sans text-[14px] sm:text-[16px] lg:text-[20px] font-bold text-main leading-tight mb-0 lg:mb-2 sm:mb-2">
                  분야별{" "}
                  <span className="font-sans text-[26px] sm:text-[30px] lg:text-[40px] font-extrabold text-[#184bba]">
                    전문 인력
                  </span>
                  을 보유하고,
                </p>
                <p className="font-sans text-[14px] sm:text-[16px] lg:text-[20px] font-bold text-main leading-tight" data-node-id="127:943">
                  전담 팀 체계로 프로젝트 운영
                </p>
              </div>
            </SlideIn>
          </div>
        </div>

      </div>
    </section>
  );
}
