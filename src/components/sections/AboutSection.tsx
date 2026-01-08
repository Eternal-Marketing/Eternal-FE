'use client';

import { useState, useEffect, useRef } from 'react';

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

// Fade-in 애니메이션 컴포넌트
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

// Slide-in 애니메이션 컴포넌트
function SlideIn({ children, direction = 'left', delay = 0, className = '', style }: { children: React.ReactNode; direction?: 'left' | 'right' | 'up' | 'down'; delay?: number; className?: string; style?: React.CSSProperties }) {
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
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#fdfeff] overflow-hidden relative z-30" data-node-id="176:48">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[32px] lg:px-[40px] desktop:px-[60px] pt-12 pb-12 md:pt-[60px] md:pb-[60px] lg:pt-[80px] lg:pb-[80px] desktop:pt-[120px] desktop:pb-[120px]">
        {/* 메인 제목 */}
        <FadeIn>
          <div className="text-center mb-10 md:mb-[40px] lg:mb-[60px] desktop:mb-[27px] desktop:mt-[114px]" data-node-id="176:49">
          <h2 
            className="mb-4"
            style={{
              color: '#000',
              fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal'
            }}
          >
            정답은 이미 <span 
              className="bg-clip-text"
              style={{ 
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontSize: '48px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
                backgroundImage: 'linear-gradient(90deg, #1E3A8A 0%, #3273FF 33.65%, #1E40AF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}
            >데이터</span> 속에 존재합니다.
          </h2>
          <p 
            className="leading-normal"
            style={{
              color: '#000',
              fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal'
            }}
          >
            문제는 그것을 보지 않는 선택입니다.
          </p>
          </div>
        </FadeIn>

        {/* 서브텍스트 */}
        <FadeIn delay={200}>
          <div className="text-center mb-12 md:mb-[60px] lg:mb-[80px] desktop:mb-[100px]" data-node-id="176:50">
          <p 
            className="mb-2 leading-normal"
            style={{
              color: '#000',
              textAlign: 'center',
              fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal'
            }}
          >
            수많은 대행사의 결과물 및 서비스 구조를 담은 <span className="text-[#134bc4]">AI</span>와
          </p>
          <p 
            className="leading-normal"
            style={{
              color: '#000',
              textAlign: 'center',
              fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal'
            }}
          >
            다년간의 실무 경험을 축적한 <span className="text-[#134bc4]">전문 마케터</span>가 함께 판단합니다.
          </p>
          </div>
        </FadeIn>

        {/* AI 마케팅 인텔리전스 및 데이터 결과 */}
        <div className="relative mb-12 md:mb-[60px] lg:mb-[80px] desktop:mb-[100px]" data-node-id="176:51">
          {/* 왼쪽: AI 마케팅 인텔리전스 */}
          <SlideIn direction="left" delay={300}>
            <div className="text-center desktop:pl-[170px] desktop:text-left relative" data-node-id="176:51">
            <div className="relative desktop:inline-block">
              <h3 
                className="mb-0 desktop:mb-0 absolute desktop:top-[12px] desktop:left-1/2 desktop:-translate-x-1/2 desktop:w-[374px] desktop:text-center desktop:mb-2" 
                style={{
                  color: '#505050',
                  fontSize: '24px'
                }}
                data-node-id="176:52"
              >
                AI 마케팅 인텔리전스
              </h3>
              <div className="w-full max-w-[280px] h-[254px] md:w-full md:max-w-[280px] md:h-[254px] lg:w-[320px] lg:h-[290px] desktop:w-[374px] desktop:h-[340.154px] desktop:ml-0 desktop:mt-[24px] mx-auto desktop:mx-0 relative" data-name="laptop" data-node-id="176:53">
                <img alt="Laptop" className="w-full h-full object-contain" src="/images/laptop.svg" />
              </div>
            </div>
            </div>
          </SlideIn>

          {/* 오른쪽: 데이터 결과 - 랩톱 이미지 오른쪽 끝에서 약간 왼쪽, 이미지 중간 높이에 위치 */}
          {/* 이미지 기준 위치: 부모(relative) 기준으로 pl(170px) + 이미지 너비(374px) - 40px = 504px */}
          <SlideIn direction="right" delay={500} className="desktop:absolute desktop:top-[160px] desktop:-translate-y-[50%]" style={{left: 'calc(170px + 374px - 40px)'}}>
            <div 
              className="text-center md:text-right" 
              data-node-id="176:74"
            >
              <p className="mb-2 leading-normal">
                <span 
                  style={{
                    color: 'var(--Brand-Color, #184BBA)',
                    fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                    fontSize: '64px',
                    fontStyle: 'normal',
                    fontWeight: 800,
                    lineHeight: 'normal'
                  }}
                >
                  <CountUpNumber end={1200000} duration={2000} />
                </span>
              <span 
                style={{
                  color: 'var(--Brand-Color, #184BBA)',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '64px',
                  fontStyle: 'normal',
                  fontWeight: 800,
                  lineHeight: 'normal'
                }}
              >건+ </span>
              <span 
                style={{
                  color: 'var(--Font-Color, #111)',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '36px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal'
                }}
              >이상의</span>
            </p>
            <p 
              className="desktop:text-left"
              style={{
                color: 'var(--Font-Color, #111)',
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontSize: '36px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
                textAlign: 'left'
              }}
            >데이터 결과 기반</p>
            </div>
          </SlideIn>
        </div>

        {/* 통계 데이터 및 실무 경험 보유자 - 하나의 div로 묶기 */}
        <div className="relative mb-12 md:mb-[60px] lg:mb-[80px] desktop:mb-[100px] desktop:min-h-[500px]">
          {/* 통계 데이터 텍스트 */}
          <FadeIn delay={400}>
            <div className="text-center md:text-right desktop:text-right desktop:absolute desktop:top-[96px] desktop:left-[450px]" data-node-id="176:72">
            <p 
              style={{
                color: 'var(--Font-Color, #111)',
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontSize: '36px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
                marginBottom: '8px'
              }}
            >프로젝트 평균 매출 성장률</p>
            <p style={{ marginBottom: '16px' }}>
              <span 
                style={{
                  color: 'var(--Brand-Color, #184BBA)',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '64px',
                  fontStyle: 'normal',
                  fontWeight: 800,
                  lineHeight: 'normal'
                }}
              >
                <CountUpNumber end={188} duration={2000} suffix="%" />
              </span>
              <span 
                style={{
                  color: 'var(--Font-Color, #111)',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '36px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal'
                }}
              > 이상</span>
            </p>
            <div style={{ marginTop: '43px' }}>
              <p 
                style={{
                  color: 'var(--Font-Color, #111)',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '36px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal',
                  marginBottom: '8px'
                }}
                data-node-id="176:73"
              >장기 파트너십 유지율</p>
              <p>
                <span 
                  style={{
                    color: 'var(--Brand-Color, #184BBA)',
                    fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                    fontSize: '64px',
                    fontStyle: 'normal',
                    fontWeight: 800,
                    lineHeight: 'normal'
                  }}
                >
                  <CountUpNumber end={98} duration={2000} suffix="%" />
                </span>
                <span 
                  style={{
                    color: 'var(--Font-Color, #111)',
                    fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                    fontSize: '36px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal'
                  }}
                > 이상</span>
              </p>
            </div>
            </div>
          </FadeIn>

          {/* 이미지 및 이미지 밑 텍스트 */}
          <SlideIn direction="right" delay={600} className="desktop:absolute desktop:right-[64px] desktop:top-0">
            <div className="flex flex-col items-center" data-node-id="176:82">
            <div 
              className="w-full max-w-[280px] h-[237px] md:w-full md:max-w-[350px] md:h-[296px] lg:w-[400px] lg:h-[340px] desktop:w-[465px] desktop:h-[394px] relative"
              style={{ 
                aspectRatio: '465/394'
              }}
            >
              <img alt="Graph" className="w-full h-full object-contain" src="/images/graph.svg" />
            </div>
            {/* 이미지 바로 밑에 위치 - 이미지 정중앙에 위치, AI 마케팅 인텔리전스와 동일한 형태 */}
            <p 
              className="text-center desktop:text-center desktop:mt-2 desktop:w-[465px]"
              style={{
                color: '#505050',
                fontSize: '24px',
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal'
              }}
              data-node-id="176:81"
            >
              다년간의 실무 경험 보유자
            </p>
            </div>
          </SlideIn>
        </div>

        {/* 팀 구조 및 전문 인력 섹션 */}
        <div className="mb-12 md:mb-[60px] lg:mb-[80px] desktop:mb-[100px]">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16 desktop:flex-row desktop:items-start desktop:justify-start desktop:gap-0 desktop:pl-[170px] desktop:pr-[60px]">
            {/* 왼쪽: 다이어그램 및 설명 텍스트 */}
            <SlideIn direction="left" delay={700}>
              <div className="flex flex-col items-center desktop:flex-shrink-0">
              <div 
                className="w-full max-w-[280px] md:max-w-[350px] lg:max-w-[400px] desktop:max-w-[700px] desktop:w-[700px] h-auto relative"
                style={{ 
                  aspectRatio: '700/auto'
                }}
              >
                <img alt="Team Structure" className="w-full h-full object-contain" src="/images/wave1.svg" />
              </div>
              {/* 이미지 바로 밑에 위치 - 이미지 정중앙에 위치 */}
              <p 
                className="text-center desktop:text-center desktop:-mt-[100px] desktop:w-[700px]"
                style={{
                  color: '#505050',
                  fontSize: '24px',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal'
                }}
              >
                업종별 전문 인력으로 전담 팀 구성
              </p>
              </div>
            </SlideIn>

            {/* 오른쪽: 전문 인력 텍스트 */}
            <SlideIn direction="right" delay={800}>
              <div className="flex flex-col items-center md:items-start md:text-left desktop:items-start desktop:justify-start desktop:-ml-[300px] desktop:flex-shrink-0">
              <p 
                className="mb-2 leading-normal text-center md:text-left desktop:text-left desktop:ml-[150px]"
                style={{
                  color: 'var(--Font-Color, #111)',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '36px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal'
                }}
              >
                분야별 <span style={{ 
                  color: 'var(--Brand-Color, #184BBA)',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '64px',
                  fontStyle: 'normal',
                  fontWeight: 800,
                  lineHeight: 'normal'
                }}>전문 인력</span>을 보유하고,
              </p>
              <p 
                className="leading-normal text-center md:text-left desktop:text-left desktop:ml-[150px]"
                style={{
                  color: 'var(--Font-Color, #111)',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '36px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal'
                }}
              >
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

