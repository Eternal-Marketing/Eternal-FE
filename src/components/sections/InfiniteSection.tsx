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
      className="relative overflow-hidden z-30 w-full" 
      style={{ 
        backgroundColor: '#F6F6F6',
        width: '1440px',
        height: '1253px',
        maxWidth: '100%',
        padding: '120px 0',
        position: 'relative'
      }}
      >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[32px] lg:px-[40px] desktop:px-[60px] relative z-10">
        {/* 섹션 제목 */}
        <FadeIn>
          <div className="text-center" style={{ marginBottom: '20px' }}>
          <div 
            style={{ 
              padding: '24px 32px',
              display: 'inline-block'
            }}
          >
            <h2 
              style={{
                color: '#000',
                textAlign: 'center',
                fontFamily: 'Freesentation',
                fontSize: '48px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
                marginBottom: '8px'
              }}
            >
              결과가 왜 다를까요?
            </h2>
            <h2 
              style={{
                color: '#000',
                textAlign: 'center',
                fontFamily: 'Freesentation',
                fontSize: '48px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal'
              }}
            >
              이터널은 <span style={{ color: '#FFF', backgroundColor: '#184BBA', padding: '4px 8px', display: 'inline-block' }}>시작</span>이 다릅니다
            </h2>
          </div>
        </div>
        </FadeIn>

        {/* 메인 콘텐츠: 중앙 무한대 루프와 4개 STEP */}
        <div className="relative w-full" style={{ minHeight: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {/* 중앙 무한대 루프 아이콘 */}
          <ScaleIn delay={200} className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ width: '671px', height: '326px' }}>
            <img 
              src="/images/reviewSection/infinite.svg" 
              alt="Infinite Loop"
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </ScaleIn>

          {/* STEP 01: AI 진단 및 분석 */}
            <SlideInLeft delay={400} className="absolute left-[18%] md:left-[23%] z-20" style={{ maxWidth: '360px', width: '100%', top: 'calc(35% - 295px)' }}>
              <div className="relative">
                <div style={{ padding: '24px' }}>
                  <div className="flex items-center mb-1">
                    <img 
                      src="/images/reviewSection/Magnifier.svg" 
                      alt="Magnifier Icon"
                      style={{ width: '25.956px', height: '25.019px', flexShrink: 0, marginRight: '7px' }}
                    />
                    <h3 
                      style={{
                        color: '#000',
                        textAlign: 'left',
                        fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: 'normal'
                      }}
                    >
                      STEP 01
                    </h3>
                  </div>
                  <p 
                    style={{
                      color: '#505050',
                      fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      marginLeft: '32.956px'
                    }}
                  >
                    AI 진단 문진표를 기반으로<br />
                    대표님의 업체를 분석하고<br />
                    문제 지점을 데이터로 구조화합니다.
                  </p>
                </div>
              </div>
            </SlideInLeft>

          {/* STEP 02: 전문 담당 팀 구성 */}
            <SlideInRight delay={500} className="absolute right-[10%] md:right-[15%] z-20" style={{ maxWidth: '360px', width: '100%', top: 'calc(35% + 163px + 30px)' }}>
              <div className="relative">
                <div style={{ padding: '24px' }}>
                  <div className="flex items-center mb-1">
                    <img 
                      src="/images/reviewSection/people.svg" 
                      alt="People Icon"
                      style={{ width: '33.929px', height: '33.328px', flexShrink: 0, marginRight: '7px' }}
                    />
                    <h3 
                      style={{
                        color: '#000',
                        textAlign: 'left',
                        fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: 'normal'
                      }}
                    >
                      STEP 02
                    </h3>
                  </div>
                  <p 
                    style={{
                      color: '#505050',
                      fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      marginLeft: '40.929px'
                    }}
                  >
                    분석 결과를 바탕으로 업종과 목표에 맞는<br />
                    전문 담당 팀을 구성합니다.
                  </p>
                </div>
              </div>
            </SlideInRight>

          {/* STEP 03: 전략 실행 */}
            <SlideInRight delay={600} className="absolute right-[10%] md:right-[15%] z-20" style={{ maxWidth: '360px', width: '100%', top: 'calc(35% - 295px)' }}>
              <div className="relative">
                <div style={{ padding: '24px' }}>
                  <div className="flex items-center mb-1">
                    <img 
                      src="/images/reviewSection/arrows.svg" 
                      alt="Arrow Icon"
                      style={{ width: '51px', height: '38.088px', flexShrink: 0, marginRight: '7px' }}
                    />
                    <h3 
                      style={{
                        color: '#000',
                        textAlign: 'left',
                        fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: 'normal'
                      }}
                    >
                      STEP 03
                    </h3>
                  </div>
                  <p 
                    style={{
                      color: '#505050',
                      fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      marginLeft: '58px'
                    }}
                  >
                    대표님의 상황과 목표에 맞춰 가장 효율적인<br />
                    전략으로 실행합니다.
                  </p>
                </div>
              </div>
            </SlideInRight>

          {/* STEP 04: 성과 관리 및 보고 */}
            <SlideInLeft delay={700} className="absolute left-[18%] md:left-[23%] z-20" style={{ maxWidth: '360px', width: '100%', top: 'calc(35% + 163px + 30px)' }}>
              <div className="relative">
                <div style={{ padding: '24px' }}>
                  <div className="flex items-center mb-1">
                    <img 
                      src="/images/reviewSection/pen.svg" 
                      alt="Pen Icon"
                      style={{ width: '36px', height: '34.28px', flexShrink: 0, marginRight: '7px' }}
                    />
                    <h3 
                      style={{
                        color: '#000',
                        textAlign: 'left',
                        fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: 'normal'
                      }}
                    >
                      STEP 04
                    </h3>
                  </div>
                  <p 
                    style={{
                      color: '#505050',
                      fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      marginLeft: '43px'
                    }}
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

