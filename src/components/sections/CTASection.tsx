'use client';
/**
 * CTA 섹션 (서비스 페이지 하단 등)
 * - 배경 이미지 좌우 펼침 + 문구 + AI 진단 버튼 + 실시간 건수 카운트업
 */
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDailyDiagnosticCount } from '@/lib/api';
import { useIsMobile } from '@/hooks/useIsMobile';

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
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
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ScaleIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

interface CTASectionProps {
  imageSrc?: string;
}

export default function CTASection({ imageSrc = "/images/about-page/last-background.svg" }: CTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [bgExpanded, setBgExpanded] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBgExpanded(true);
          getDailyDiagnosticCount()
            .then(setDailyCount)
            .catch(() => {});
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden w-full">

      {/* 모바일: DiagnosisSection과 동일한 구성 */}
      {isMobile && (
      <div className="relative w-full" style={{ minHeight: '100vh' }}>
        {/* 배경 */}
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
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
            />
          </div>
        </div>
        {/* 컨텐츠 */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col"
          style={{
            opacity: bgExpanded ? 1 : 0,
            transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.6s',
          }}
        >
          <div className="w-full flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-20 relative">
            <FadeIn>
              <div className="text-center mb-8">
                <h2 className="mb-2 font-sans text-[24px] font-bold leading-normal text-white text-center">
                  정답은 이미 여기 있습니다
                </h2>
                <h2 className="font-sans text-[24px] font-bold leading-normal text-white text-center">
                  이제 확인만 남았습니다
                </h2>
              </div>
            </FadeIn>
            <ScaleIn delay={200}>
              <div className="text-center mb-12">
                <Link href="/ai-diagnosis" className="diagnosis-cta-btn inline-block no-underline">
                  AI 진단 받기
                </Link>
                <div className="flex justify-end -mt-2 translate-x-[80px]">
                  <Image
                    src="/images/Group 86.svg"
                    alt="진단 참여만으로 실무용 AI 세팅 가이드 받아보세요"
                    width={140}
                    height={60}
                    className="w-[120px] h-auto animate-bubble-bounce"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScaleIn>
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full px-4 text-center">
              <FadeIn delay={400} className="inline-block">
                <div className="font-sans text-[16px] font-semibold text-white flex flex-wrap items-center justify-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <span>당일 기준 누적 진단 진행</span>
                  <span className="font-sans text-[32px] font-semibold text-white tabular-nums">
                    <CountUp end={dailyCount} duration={2000} />
                  </span>
                  <span>건</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* 데스크탑: 기존 가로형 레이아웃 */}
      {!isMobile && (
      <div className="relative w-full min-h-[160px] overflow-hidden bg-[#0a0a1a]">
        <div
          className="absolute inset-0"
          style={{
            transform: bgExpanded ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
            transformOrigin: 'center',
          }}
        >
          <Image src={imageSrc} alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div
          className="relative z-10 h-full"
          style={{
            opacity: bgExpanded ? 1 : 0,
            transition: 'opacity 0.6s ease-out 0.5s',
          }}
        >
          <div className="w-full max-w-[1163px] mx-auto px-6 h-full min-h-[160px] flex flex-row items-center justify-between gap-6 py-0">
            <div className="font-sans flex flex-row items-center gap-6">
              <div className="text-white">
                <p className="m-0 text-[18px] lg:text-[20px] font-semibold">정답은 이미 여기 있습니다</p>
                <p className="m-0 text-[18px] lg:text-[20px] font-semibold">이제 확인만 남았습니다</p>
              </div>
              <a
                href="/ai-diagnosis"
                className="group relative flex-shrink-0 inline-block bg-primary text-white text-[14px] font-medium px-5 py-2.5 rounded-full no-underline overflow-hidden shadow-[0_8px_20px_-5px_rgba(99,102,241,0.5)] hover:-translate-y-[2px] hover:shadow-[0_12px_25px_-5px_rgba(99,102,241,0.6)] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
                <span className="relative z-10">AI 진단 받기</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Image src="/images/about-page/infinity.svg" alt="" width={40} height={40} className="w-10 h-auto opacity-40 shrink-0 object-contain" />
              <div className="text-white/80 text-[15px] lg:text-[14px]">
                <span>당일 기준 누적 진단 진행</span>
                <span className="ml-2 text-[20px] font-bold text-white"><CountUp end={dailyCount} duration={1500} /></span>
                <span className="ml-1">건</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

    </div>
  );
}
