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
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
      }`}
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
              <div className="flex flex-col items-center flex-shrink-0" data-node-id="127:914">
                <p className="font-sans text-[12px] sm:text-[14px] font-bold text-sub1 text-center mb-3 sm:mb-4" data-node-id="127:916">
                  AI 마케팅 인텔리전스
                </p>
                <div className="w-[180px] h-[164px] lg:w-[260px] lg:h-[236px] relative" data-node-id="127:917">
                  <Image alt="Laptop" fill className="object-contain" src="/images/laptop.svg" sizes="260px" />
                </div>
              </div>

              <div className="text-center lg:text-left mt-6 sm:mt-8 lg:mt-0 lg:ml-6 whitespace-nowrap" data-node-id="58:95">
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

        <div className="relative mb-12 sm:mb-16 lg:mb-24 desktop:mb-[120px]">
          <div className="flex flex-col lg:flex-col lg:items-center lg:justify-center gap-6 sm:gap-8 lg:gap-8">
            <SlideIn direction="right" delay={400} className="flex-shrink-0">
              <div className="flex flex-col items-center" data-node-id="158:25">
                <p className="font-sans text-[12px] sm:text-[14px] font-bold text-sub1 text-center mb-3 sm:mb-4" data-node-id="127:912">
                  업종별 최상위 전문 마케터
                </p>
                <div className="w-[140px] h-[120px] sm:w-[160px] sm:h-[136px] lg:w-[280px] lg:h-[238px] relative">
                  <Image alt="Graph" fill className="object-contain" src="/images/graph.svg" sizes="280px" />
                </div>
              </div>
            </SlideIn>

            <FadeIn delay={600}>
              <div className="text-center" data-node-id="58:96">
                <div className="mb-6 sm:mb-8 whitespace-nowrap">
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
            </FadeIn>
          </div>
        </div>

        <div className="relative pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-20 desktop:pb-24">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 sm:gap-3 lg:gap-16 lg:ml-32 xl:ml-64">
            <SlideIn direction="left" delay={700} className="flex-shrink-0">
              <div className="flex flex-col items-center" data-node-id="127:918">
                <p className="font-sans text-[12px] sm:text-[14px] font-bold text-sub1 text-center mb-3 sm:mb-4 whitespace-nowrap shrink-0" data-node-id="127:936">
                  업종별 전문 인력으로 전담 팀 구성
                </p>
                <div className="w-[240px] h-[210px] sm:w-[300px] sm:h-[260px] lg:w-[460px] lg:h-[400px] relative">
                  <Image alt="Team Structure" fill className="object-contain" src="/images/wave1.svg" sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 460px" />
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right" delay={800} className="lg:-ml-8">
              <div className="text-center lg:text-left" data-node-id="58:97">
                <p className="font-sans text-[14px] sm:text-[16px] lg:text-[20px] font-bold text-main leading-tight mb-2">
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
