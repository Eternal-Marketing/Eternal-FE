'use client';
/**
 * 어바웃 페이지
 * - 히어로 → Our Story & Philosophy → 파란 문구 스트립 → 이터널이 기준이 되는 이유 → 인텔리전스 → Our Team → CTA(진단 받기)
 * - FadeIn/SlideIn/CountUp/ExpandBackground 등 뷰포트 진입 애니메이션
 */
import { useRef, useEffect, useState } from 'react';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {children}
    </div>
  );
}

function SlideInLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {children}
    </div>
  );
}

function SlideInRight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {children}
    </div>
  );
}

// 카운트업 애니메이션
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

// CTA 배경 좌우 펼침 애니메이션
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

function ExpandBackground({ children }: { children: React.ReactNode }) {
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
    <div ref={ref} className="relative w-full overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-primary"
        style={{
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'center',
        }}
      />
      <div
        className="relative z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out 0.4s',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const storySectionRef = useRef<HTMLElement>(null);
  const whyEternalSectionRef = useRef<HTMLElement>(null);
  const intelligenceSectionRef = useRef<HTMLElement>(null);
  const [storyVisible, setStoryVisible] = useState(false);
  const [whyEternalVisible, setWhyEternalVisible] = useState(false);
  const [intelligenceVisible, setIntelligenceVisible] = useState(false);

  useEffect(() => {
    const el = storySectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStoryVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = whyEternalSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWhyEternalVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = intelligenceSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntelligenceVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      {/* 히어로: 배경 이미지 + ABOUT 타이틀, 하단 문구 */}
      <section className="relative w-full h-[420px] overflow-hidden">
        <img
          src="/images/about-page/firstimage.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 h-full flex flex-col items-center text-center px-4">
          <h1 className="m-0 mt-[100px] font-sans text-[40px] font-bold leading-normal">
            <span className="text-white/80">ABOUT</span> <span className="text-[#6d94ff]">ETERNAL MARKETING</span>
          </h1>
          <div className="absolute bottom-[40px] font-sans text-[16px] leading-normal text-white">
            <p className="m-0 font-sans font-extralight">마케팅을 얼마나 진지하게 다루는지,</p>
            <p className="m-0 font-sans font-extralight">그리고 왜 결과가 다른지</p>
            <p className="m-0 font-sans font-extrabold text-[18px]">기준에서 드러납니다</p>
          </div>
        </div>
      </section>

      {/* Our Story & Philosophy: 스토리 이미지 + "왜 결과는 항상 같을까요?" 문단 */}
      <section ref={storySectionRef} className="w-full bg-[#ffffff]">
        <div className="w-full max-w-[1163px] mx-auto px-4 py-[100px]">
          <FadeIn>
            <h2 className="m-0 font-sans text-[40px] font-bold leading-normal text-primary">Our Story &amp; Philosophy</h2>
          </FadeIn>
          <div className="mt-[46px] flex flex-col lg:flex-row gap-10 items-start">
            <SlideInLeft delay={200}>
              <div className="w-full lg:w-[680px]">
                <img src="/images/about-page/ourstory.svg" alt="" className="w-full h-auto" />
              </div>
            </SlideInLeft>
            <div className={`flex-1 ${storyVisible ? 'about-story-animate' : ''}`}>
              <h3 className="about-story-line about-story-delay-0 m-0 font-sans text-[30px] font-bold leading-normal text-main">왜 결과는 항상 같을까요?</h3>
              <div className="mt-[10px] font-sans text-[20px] leading-[42px] text-main">
                <p className="about-story-line about-story-delay-1 m-0">마케팅은 늘 진행되고 있었지만</p>
                <p className="about-story-line about-story-delay-2 m-0">정작 '왜 이걸 하는지'는 설명되지 않았습니다</p>
                <p className="about-story-line about-story-delay-3 m-0">실행은 많았지만</p>
                <p className="about-story-line about-story-delay-4 m-0">판단은 없었고,</p>
                <p className="about-story-line about-story-delay-5 m-0">성과는 남지 않았습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 파란 배경 스트립: "이터널마케팅은 ... 질문을 던지는 것에서 시작했습니다" */}
      <ExpandBackground>
        <div className="w-full max-w-[1163px] mx-auto px-4 py-[60px] text-center">
          <p className="m-0 font-sans font-semibold leading-[50px]">
            <span className="text-white text-[40px]">이터널마케팅</span>
            <span className="text-white/80 text-[30px]">은 </span>
          </p>
          <p className="m-0 font-sans font-semibold leading-[50px]">
            <span className="text-white/80 text-[30px]">이 비효율적인 구조에 </span>
            <span className="text-white text-[40px]">질문</span>
            <span className="text-white/80 text-[30px]">을 던지는 것에서 시작했습니다</span>
          </p>
        </div>
      </ExpandBackground>

      {/* 이터널이 기준이 되는 이유: 왼쪽 문단 + 오른쪽 인피니티 다이어그램 */}
      <section ref={whyEternalSectionRef} className="w-full bg-bg">
        <div className="w-full max-w-[1163px] mx-auto px-4 py-[200px] relative">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* 왼쪽: 텍스트 */}
            <div className={`flex-1 pl-[80px] ${whyEternalVisible ? 'about-story-animate' : ''}`}>
              <h2 className="about-story-line about-story-delay-0 m-0 font-sans text-[40px] font-bold leading-normal text-main">
                <span className="text-primary">이터널</span>이 기준이 되는 이유
              </h2>
              <div className="mt-[18px] font-sans text-[20px] font-extralight leading-[28px] text-main">
                <p className="about-story-line about-story-delay-1 m-0">이터널은 '일단 해보는 마케팅'이 아니라 될 가능성이 있는</p>
                <p className="about-story-line about-story-delay-2 m-0">선택만 남기는 마케팅을 설계합니다. 성과로 검증된 데이터와</p>
                <p className="about-story-line about-story-delay-3 m-0">실제 운영 결과를 토대로 불필요한 시도는 배제하고, 매출로</p>
                <p className="about-story-line about-story-delay-4 m-0">이어질 수 있는 흐름만 구조화합니다.</p>
                <p className="about-story-line about-story-delay-5 m-0">&nbsp;</p>
                <p className="about-story-line about-story-delay-6 m-0">그리고 그 구조는 마케팅 전용으로 설계된 인텔리전스와</p>
                <p className="about-story-line about-story-delay-7 m-0">현장을 완벽하게 이해하고 있는 전문 마케터의 판단을 통해</p>
                <p className="about-story-line about-story-delay-8 m-0">결정됩니다.</p>
              </div>
            </div>
            
            {/* 오른쪽: 인피니티 */}
            <SlideInRight delay={400}>
              <div className="w-full lg:w-[400px] relative flex-shrink-0 lg:ml-[120px]">
                <img src="/images/about-page/infinity.svg" alt="" className="w-full h-auto" />
                <span className="absolute top-[-20px] left-[75px] text-body-sm text-main">구조 재설계</span>
                <span className="absolute top-[-20px] left-[255px] text-body-sm text-main">세밀 분석</span>
                <span className="absolute top-[50%] left-[-44px] -translate-y-1/2 text-body-sm text-main">최적화</span>
                <span className="absolute top-[50%] right-[-44px] -translate-y-1/2 text-body-sm text-main">최적화</span>
                <span className="absolute bottom-[-20px] left-[255px] text-body-sm text-main">정밀 판단</span>
                <span className="absolute bottom-[-20px] left-[75px] text-body-sm text-main">고효율 실행</span>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* 인텔리전스: 퍼즐 배경 + "마케팅의 정답을 가려내는 인텔리전스" 문구 */}
      <section ref={intelligenceSectionRef} className="relative w-full h-[720px] overflow-hidden">
        <img src="/images/about-page/puzzle-background.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />

        <div className={`relative z-10 w-full max-w-[1163px] mx-auto px-4 h-full ${intelligenceVisible ? 'about-story-animate' : ''}`}>
          <h2 className="about-story-line about-story-delay-0 m-0 pt-[200px] font-sans text-[40px] font-bold leading-normal text-white text-right">
            마케팅의 정답을 가려내는{" "}
            <span className="bg-primary px-3 py-1">인텔리전스</span>
          </h2>

          <div className="absolute right-4 top-[300px] text-right font-sans text-[20px] leading-[36px] text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <p className="about-story-line about-story-delay-1 m-0">마케팅 인텔리전스는</p>
            <p className="about-story-line about-story-delay-2 m-0">AI 기술 전문가와 업계 최상위 마케터가 함께 설계한</p>
            <p className="about-story-line about-story-delay-3 m-0">
              <span className="font-bold">결과 중심 판단 시스템</span>입니다.
            </p>
            <p className="about-story-line about-story-delay-4 m-0">수년간 축적된 마케팅 성과와 실패 사례,</p>
            <p className="about-story-line about-story-delay-5 m-0">채널별 운영 결과 데이터를 기반으로</p>
            <p className="about-story-line about-story-delay-6 m-0">
              대표님에게 <span className="font-bold">가장 가능성 높은 선택</span>만 도출하도록 만들어졌습니다
            </p>
          </div>
        </div>
      </section>

      {/* Our Team: 조직 구조 이미지 */}
      <section className="w-full bg-[#f6f6f6]">
        <div className="w-full max-w-[1163px] mx-auto px-4 py-[100px]">
          <FadeIn>
            <h2 className="m-0 font-sans text-[28px] md:text-[32px] font-bold leading-normal text-primary">Our Team</h2>
            <div className="mt-[10px] font-sans text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[26px] text-main">
              <p className="m-0">이터널마케팅은</p>
              <p className="m-0">판단–설계–실행–관리까지</p>
              <p className="m-0">역할이 분리된 전문 조직 체계로 운영됩니다.</p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-[40px] w-full overflow-hidden rounded-2xl bg-white/80 shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
              <img
                src="/images/about-page/our%20team.svg"
                alt="이터널마케팅 조직 구조 - 판단 설계 실행 관리"
                className="w-full h-auto max-w-[720px] mx-auto block"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA: 배경 이미지 좌우 펼침 + "정답은 이미 여기 있습니다" + AI 진단 버튼 + 실시간 진단 건수 */}
      <ExpandCTABackground imageSrc="/images/about-page/last-background.svg">
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
    </main>
  );
}
