'use client';
/**
 * CTA 섹션 (서비스 페이지 하단 등)
 * - 배경 이미지 좌우 펼침 + 문구 + AI 진단 버튼 + 실시간 건수 카운트업
 */
import { useRef, useEffect, useState } from 'react';

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
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count}</span>;
}

function ExpandCTABackground({ children, imageSrc }: { children: React.ReactNode; imageSrc: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full h-[180px] overflow-hidden bg-[#0a0a1a]">
      {/* 배경 이미지가 좌우로 퍼지는 효과 */}
      <div
        className="absolute inset-0"
        style={{
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'center',
        }}
      >
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {/* 컨텐츠 */}
      <div
        className="relative z-10 h-full"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.6s ease-out 0.5s',
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface CTASectionProps {
  imageSrc?: string;
}

export default function CTASection({ imageSrc = "/images/about-page/last-background.svg" }: CTASectionProps) {
  return (
    <ExpandCTABackground imageSrc={imageSrc}>
      <div className="w-full max-w-[1163px] mx-auto px-8 h-full flex items-center justify-between">
        {/* 왼쪽: 메인 문구 + 버튼 */}
        <div className="font-sans flex items-center gap-10">
          <div className="text-white">
            <p className="m-0 text-[20px] font-semibold">정답은 이미 여기 있습니다</p>
            <p className="m-0 text-[20px] font-semibold">이제 확인만 남았습니다</p>
          </div>
          <a
            href="/ai-diagnosis"
            className="group relative flex-shrink-0 inline-block bg-primary text-white text-[14px] font-medium px-6 py-2.5 rounded-full no-underline overflow-hidden shadow-[0_8px_20px_-5px_rgba(99,102,241,0.5)] hover:-translate-y-[2px] hover:shadow-[0_12px_25px_-5px_rgba(99,102,241,0.6)] transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
            <span className="relative z-10">AI 진단 받기</span>
          </a>
        </div>
        {/* 오른쪽: 실시간 수치 */}
        <div className="flex items-center gap-3">
          <img src="/images/about-page/infinity.svg" alt="" className="w-[40px] h-auto opacity-40" />
          <div className="text-white/80 text-[14px]">
            <span>실시간 진단 진행 중</span>
            <span className="ml-2 text-[20px] font-bold text-white"><CountUp end={124} duration={1500} /></span>
            <span className="ml-1">건</span>
          </div>
        </div>
      </div>
    </ExpandCTABackground>
  );
}
