'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * AboutSection - 회사 소개 섹션 컴포넌트
 * AI 마케팅 인텔리전스, 데이터 결과, 통계, 전문 인력 정보를 표시
 */

// 숫자 카운팅 애니메이션 컴포넌트
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
    <section id="about" className="bg-[#fdfeff] overflow-hidden relative z-30 rounded-t-[80px]" data-node-id="127:907">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[32px] lg:px-[40px] desktop:px-[60px] pt-[80px] pb-[80px] md:pt-[100px] md:pb-[100px] lg:pt-[120px] lg:pb-[120px]">
        
        {/* 메인 제목: 정답은 이미 데이터 속에 존재합니다 */}
        <FadeIn>
          <div className="text-center mb-6" data-node-id="127:908">
            <h2 className="font-sans text-[20px] md:text-[24px] lg:text-[28px] font-bold leading-tight text-main">
              정답은 이미{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#000d2a] via-[#3273ff] to-black">
                데이터
              </span>{" "}
              속에 존재합니다.
            </h2>
            <p className="font-sans text-[20px] md:text-[24px] lg:text-[28px] font-bold leading-tight text-main">
              문제는 그것을 보지 않는 선택입니다.
            </p>
          </div>
        </FadeIn>

        {/* 서브 텍스트: AI와 전문 마케터 설명 */}
        <FadeIn delay={200}>
          <div className="text-center mb-[80px] md:mb-[100px] lg:mb-[120px]" data-node-id="127:909">
            <p className="font-sans text-[12px] md:text-[13px] lg:text-[13px] font-medium leading-relaxed text-main">
              수많은 대행사의 결과물 및 서비스 구조를 담은{" "}
              <span className="text-[#134bc4]">AI</span>와
            </p>
            <p className="font-sans text-[12px] md:text-[13px] lg:text-[13px] font-medium leading-relaxed text-main">
              다년간의 실무 경험을 축적한{" "}
              <span className="text-[#134bc4]">전문 마케터</span>가 함께 판단합니다.
            </p>
          </div>
        </FadeIn>

        {/* 첫 번째 영역: AI 마케팅 인텔리전스 + 1200000건+ */}
        <div className="relative mb-[60px] md:mb-[80px] lg:mb-[100px]">
          <FadeIn delay={300}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:-ml-8">
              {/* 왼쪽: AI 마케팅 인텔리전스 */}
              <div className="flex flex-col items-center flex-shrink-0" data-node-id="127:914">
                <p className="font-sans text-[14px] md:text-[16px] font-bold text-sub1 text-center mb-4" data-node-id="127:916">
                  AI 마케팅 인텔리전스
                </p>
                <div className="w-[180px] h-[164px] md:w-[220px] md:h-[200px] lg:w-[260px] lg:h-[236px] relative" data-node-id="127:917">
                  <img 
                    alt="Laptop" 
                    className="w-full h-full object-contain" 
                    src="/images/laptop.svg" 
                  />
                </div>
              </div>

              {/* 오른쪽: 데이터 결과 통계 */}
              <div className="text-center lg:text-left mt-8 lg:mt-0 lg:ml-6" data-node-id="58:95">
                <p className="leading-tight">
                  <span className="font-sans text-[32px] md:text-[36px] lg:text-[40px] font-extrabold text-[#184bba]">
                    <CountUpNumber end={1200000} duration={2000} />건+
                  </span>
                  <span className="font-sans text-[18px] md:text-[20px] lg:text-[24px] font-bold text-main">
                    {" "}이상의
                  </span>
                </p>
                <p className="font-sans text-[18px] md:text-[20px] lg:text-[24px] font-bold text-main">
                  데이터 결과 기반
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 두 번째 영역: 통계 + 그래프 */}
        <div className="relative mb-[60px] md:mb-[80px] lg:mb-[100px]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8 lg:gap-8 lg:ml-12">
            {/* 왼쪽: 통계 데이터 */}
            <FadeIn delay={400}>
              <div className="text-center lg:text-right" data-node-id="58:96">
                {/* 매출 성장률 */}
                <div className="mb-8">
                  <p className="font-sans text-[16px] md:text-[18px] lg:text-[18px] font-bold text-main leading-tight">
                    프로젝트 연평균 매출 성장률
                  </p>
                  <p className="leading-tight">
                    <span className="font-sans text-[32px] md:text-[36px] lg:text-[40px] font-extrabold text-[#184bba]">
                      <CountUpNumber end={3} duration={1500} />배
                    </span>
                    <span className="font-sans text-[16px] md:text-[18px] lg:text-[18px] font-bold text-main">
                      {" "}이상
                    </span>
                  </p>
                </div>

                {/* 재계약률 */}
                <div data-node-id="127:939">
                  <p className="font-sans text-[16px] md:text-[18px] lg:text-[18px] font-bold text-main leading-tight">
                    12년간 재계약률
                  </p>
                  <p className="leading-tight">
                    <span className="font-sans text-[32px] md:text-[36px] lg:text-[40px] font-extrabold text-[#184bba]">
                      <CountUpNumber end={98} duration={2000} suffix="%" />
                    </span>
                    <span className="font-sans text-[16px] md:text-[18px] lg:text-[18px] font-bold text-main">
                      {" "}이상 유지중
                    </span>
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* 오른쪽: 그래프 + 업종별 최상위 전문 마케터 */}
            <SlideIn direction="right" delay={600} className="flex-shrink-0">
              <div className="flex flex-col items-center" data-node-id="158:25">
                <div className="w-[180px] h-[153px] md:w-[240px] md:h-[204px] lg:w-[280px] lg:h-[238px]">
                  <img 
                    alt="Graph" 
                    className="w-full h-full object-contain" 
                    src="/images/graph.svg" 
                  />
                </div>
                <p className="font-sans text-[14px] md:text-[16px] font-bold text-sub1 text-center mt-4" data-node-id="127:912">
                  업종별 최상위 전문 마케터
                </p>
              </div>
            </SlideIn>
          </div>
        </div>

        {/* 세 번째 영역: 팀 구성 + 전문 인력 */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 lg:ml-64">
            {/* 왼쪽: 팀 구조 다이어그램 */}
            <SlideIn direction="left" delay={700} className="flex-shrink-0">
              <div className="flex flex-col items-center" data-node-id="127:918">
                <div className="w-[240px] md:w-[300px] lg:w-[360px] h-auto relative">
                  <img 
                    alt="Team Structure" 
                    className="w-full h-auto object-contain" 
                    src="/images/wave1.svg" 
                  />
                </div>
                <p className="font-sans text-[14px] md:text-[16px] font-bold text-sub1 text-center -mt-[80px]" data-node-id="127:936">
                  업종별 전문 인력으로 전담 팀 구성
                </p>
              </div>
            </SlideIn>

            {/* 오른쪽: 전문 인력 설명 */}
            <SlideIn direction="right" delay={800} className="lg:mt-8 lg:-ml-8">
              <div className="text-center lg:text-left" data-node-id="58:97">
                <p className="font-sans text-[18px] md:text-[20px] lg:text-[20px] font-bold text-main leading-tight mb-2">
                  분야별{" "}
                  <span className="font-sans text-[32px] md:text-[36px] lg:text-[40px] font-extrabold text-[#184bba]">
                    전문 인력
                  </span>
                  을 보유하고,
                </p>
                <p className="font-sans text-[18px] md:text-[20px] lg:text-[20px] font-bold text-main leading-tight" data-node-id="127:943">
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
