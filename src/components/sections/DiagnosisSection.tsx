'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

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
          <Image 
            src="/images/diagnosisSection/diagnosisSection.svg" 
            alt="Diagnosis Section Background"
            fill
            className="object-cover"
            sizes="100vw"
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
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 desktop:px-[60px] flex-1 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center relative pt-16 sm:pt-20 md:pt-24 lg:pt-[120px] pb-20 sm:pb-24 md:pb-28 lg:pb-[80px]">
            <FadeIn>
              <div className="text-center mb-8 sm:mb-10 md:mb-14">
                <h2 className="mb-2 font-sans text-[24px] sm:text-[30px] md:text-[38px] lg:text-[48px] font-bold leading-normal text-inverse text-center">
                  정답은 이미 여기 있습니다
                </h2>
                <h2 className="font-sans text-[24px] sm:text-[30px] md:text-[38px] lg:text-[48px] font-bold leading-normal text-inverse text-center">
                  이제 확인만 남았습니다
                </h2>
              </div>
            </FadeIn>

            <ScaleIn delay={200}>
              <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-[96px]">
                <Link href="/ai-diagnosis" className="diagnosis-cta-btn inline-block no-underline">
                  AI 진단 받기
                </Link>
              </div>
            </ScaleIn>

            <div className="text-center absolute bottom-56 sm:bottom-60 md:bottom-72 lg:bottom-[120px] left-1/2 -translate-x-1/2 w-full px-4">
              <FadeIn delay={400} style={{ display: 'inline-block' }}>
                <div className="font-sans text-[16px] sm:text-[20px] md:text-[24px] lg:text-[24px] font-semibold leading-normal text-inverse text-center flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <span className="relative flex h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-3 lg:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-3 lg:w-3 bg-green-500" />
                  </span>
                  <span>실시간 진단 진행 중</span>
                  <span className="inline-block min-w-[3rem] sm:min-w-[4rem] md:min-w-[3.5rem] lg:min-w-[60px] text-left font-sans text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] font-semibold leading-normal text-inverse">
                    <CountUpNumber end={124} duration={2000} />
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

