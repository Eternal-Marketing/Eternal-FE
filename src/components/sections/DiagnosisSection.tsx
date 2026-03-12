'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { getDailyDiagnosticCount } from '@/lib/api';

/**
 * AI 진단 CTA 섹션 (홈)
 * - AI 진단 받기 버튼, 실시간 진단 진행 건수(카운트업)
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
  const sectionRef = useRef<HTMLElement>(null);
  const [bgExpanded, setBgExpanded] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);

  useEffect(() => {
    getDailyDiagnosticCount()
      .then(setDailyCount)
      .catch(() => { /* 실패 시 0 유지 */ });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBgExpanded(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="diagnosis" 
      className="relative overflow-hidden z-30 w-full" 
      style={{ 
        position: 'relative',
        width: '100%',
        minHeight: '100vh'
      }}
    >
      {/* 배경 이미지 - 중앙에서 좌우로 열리는 클립 리빌 (세련된 이징) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: bgExpanded ? 'inset(0 0% 0 0%)' : 'inset(0 50% 0 50%)',
            transition: 'clip-path 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* 데스크탑 배경 - 원본 그대로 사용해 화질 유지 */}
          <Image
            src="/images/ai_diagnosis.png"
            alt=""
            fill
            className="object-cover hidden sm:block"
            sizes="100vw"
            unoptimized
          />
          {/* 모바일 배경 - 원본 그대로 사용해 화질 유지 */}
          <Image
            src="/images/ai_diagnosis-mobile.png"
            alt=""
            fill
            className="object-cover sm:hidden"
            sizes="100vw"
            unoptimized
          />
        </div>
      </div>

      {/* 콘텐츠 - 배경 열린 뒤 부드럽게 페이드인 */}
      <div 
        className="absolute inset-0 w-full h-full flex flex-col"
        style={{
          opacity: bgExpanded ? 1 : 0,
          transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.6s',
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 desktop:px-[60px] flex-1 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center relative pt-16 sm:pt-20 lg:pt-[120px] pb-20 sm:pb-24 lg:pb-[80px]">
            <FadeIn>
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="mb-2 font-sans text-[24px] sm:text-[30px] lg:text-[48px] font-bold leading-normal text-inverse text-center">
                  정답은 이미 여기 있습니다
                </h2>
                <h2 className="font-sans text-[24px] sm:text-[30px] lg:text-[48px] font-bold leading-normal text-inverse text-center">
                  이제 확인만 남았습니다
                </h2>
              </div>
            </FadeIn>

            <ScaleIn delay={200}>
              <div className="text-center mb-12 sm:mb-16 lg:mb-[96px]">
                <Link href="/ai-diagnosis" className="diagnosis-cta-btn inline-block no-underline">
                  AI 진단 받기
                </Link>
                {/* 유리 말풍선 */}
                <div className="flex flex-col items-center mt-3" style={{ animation: 'cta-pill-float 3.5s ease-in-out infinite' }}>
                  {/* 삼각형 꼭지 */}
                  <svg width="60" height="18" viewBox="0 0 60 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 0 L60 18 L0 18 Z" fill="rgba(255,255,255,0.15)" />
                  </svg>
                  {/* 유리 박스 */}
                  <div
                    className="relative text-center overflow-hidden"
                    style={{
                      padding: '14px 30px',
                      borderRadius: '18px',
                      background: 'linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)',
                    }}
                  >
                    {/* 유리 상단 광택 */}
                    <span className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />
                    {/* 유리 좌측 광택 */}
                    <span className="absolute top-0 bottom-0 left-0 w-[1px]" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.3), transparent)' }} />
                    <p className="m-0 text-white/90 text-[13px] sm:text-[14px] font-semibold leading-relaxed">
                      진단 참여만으로 실무용
                    </p>
                    <p className="m-0 text-white/90 text-[13px] sm:text-[14px] font-semibold leading-relaxed">
                      AI 세팅 가이드 받아보세요
                    </p>
                  </div>
                </div>
              </div>
            </ScaleIn>

            <div className="text-center absolute bottom-56 sm:bottom-60 lg:bottom-[120px] left-1/2 -translate-x-1/2 w-full px-4">
              <FadeIn delay={400} style={{ display: 'inline-block' }}>
                <div className="font-sans text-[16px] sm:text-[20px] lg:text-[24px] font-semibold leading-normal text-inverse text-center flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <span className="relative flex h-3 w-3 sm:h-4 sm:w-4 lg:h-3 lg:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 lg:h-3 lg:w-3 bg-green-500" />
                  </span>
                  <span>당일 기준 누적 진단 진행</span>
                  <span className="inline-block min-w-[3rem] sm:min-w-[4rem] lg:min-w-[60px] text-right tabular-nums font-sans text-[32px] sm:text-[40px] lg:text-[48px] font-semibold leading-normal text-inverse">
                    <CountUpNumber end={dailyCount} duration={2000} />
                  </span>
                  <span>건</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

