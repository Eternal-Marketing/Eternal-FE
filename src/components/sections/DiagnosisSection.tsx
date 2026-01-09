'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * DiagnosisSection - AI 진단 섹션 컴포넌트
 * AI 진단 받기 버튼과 실시간 진단 진행 현황을 표시
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
function FadeIn({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
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
      style={{ 
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
        ...style
      }}
    >
      {children}
    </div>
  );
}

// 스케일인 애니메이션 컴포넌트
function ScaleIn({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
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
      style={{ 
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default function DiagnosisSection() {
  return (
    <section 
      id="diagnosis" 
      className="relative overflow-hidden z-30 w-full" 
      style={{ 
        position: 'relative',
        width: '100%',
        minHeight: '100vh'
      }}
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/diagnosisSection/diagnosisSection.svg" 
          alt="Diagnosis Section Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="absolute inset-0 w-full h-full flex flex-col">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[32px] lg:px-[40px] desktop:px-[60px] flex-1 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center relative" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            {/* 섹션 제목 */}
            <FadeIn>
              <div className="text-center mb-10 md:mb-14">
              <h2 
                style={{
                  color: '#FFF',
                  textAlign: 'center',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '48px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal',
                  marginBottom: '8px'
                }}
              >
                정답은 이미 여기 있습니다
              </h2>
              <h2 
                style={{
                  color: '#FFF',
                  textAlign: 'center',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '48px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal'
                }}
              >
                이제 확인만 남았습니다
              </h2>
            </div>
            </FadeIn>

            {/* AI 진단 받기 버튼 */}
            <ScaleIn delay={200}>
              <div className="text-center" style={{ marginBottom: '96px' }}>
                <button
                className="button-glow"
                style={{
                  backgroundColor: '#184BBA',
                  color: '#FFF',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '24px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  padding: '16px 32px',
                  borderRadius: '15px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 25px 5px rgba(24, 75, 186, 0.5), 0 4px 20px 0 rgba(24, 75, 186, 0.4), 0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'translateY(0) scale(1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#003CFF';
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 16px 40px 0 rgba(24, 75, 186, 0.6), 0 8px 16px 0 rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.animation = 'none';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#184BBA';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 25px 5px rgba(24, 75, 186, 0.5), 0 4px 20px 0 rgba(24, 75, 186, 0.4), 0 4px 4px 0 rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.animation = 'button-glow 2s ease-in-out infinite';
                }}
              >
                AI 진단 받기
                </button>
              </div>
            </ScaleIn>

            {/* 하단: 실시간 진단 진행 현황 */}
            <div className="text-center absolute" style={{ bottom: '180px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
              <FadeIn delay={400} style={{ display: 'inline-block' }}>
                <p 
                  style={{
                    color: '#FFF',
                    textAlign: 'center',
                    fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                    fontSize: '24px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal',
                    whiteSpace: 'nowrap'
                  }}
                >
                  실시간 진단 진행 중 <span style={{ color: '#FFF', fontFamily: 'Freesentation, Arial, Helvetica, sans-serif', fontSize: '48px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', display: 'inline-block', minWidth: '60px', textAlign: 'left' }}><CountUpNumber end={124} duration={2000} /></span> 건
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

