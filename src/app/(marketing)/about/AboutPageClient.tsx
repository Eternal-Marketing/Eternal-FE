'use client';

import { createContext, useContext, useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import DiagnosisSection from '@/components/sections/DiagnosisSection';
import OurTeamChart from './OurTeamChart';
import { useIsMobile } from '@/hooks/useIsMobile';

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

const ExpandBackgroundContext = createContext(false);

function ExpandHighlight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const visible = useContext(ExpandBackgroundContext);
  return (
    <span className="relative inline-block">
      <span
        className="absolute inset-0 rounded-lg bg-[linear-gradient(90deg,rgba(255,255,255,0.26),rgba(255,244,214,0.34),rgba(255,255,255,0.22))] shadow-[0_10px_26px_rgba(0,0,0,0.22)] ring-1 ring-white/28"
        style={{
          transformOrigin: 'left',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          transitionDelay: `${delay}ms`,
          zIndex: 0,
        }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-x-2 bottom-1 h-px rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,236,184,0.9),rgba(255,255,255,0))] opacity-80"
        aria-hidden
      />
      <span className="relative z-10 text-white font-extrabold px-2.5 py-0.5 tracking-[-0.02em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.38)]">
        {children}
      </span>
    </span>
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
    <ExpandBackgroundContext.Provider value={isVisible}>
      <div ref={ref} className="relative w-full overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1a3a6e] via-[#184BBA] to-[#2d2466]"
          style={{
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transformOrigin: 'center',
          }}
        />
        {/* 그라데이션 · 블러 오버레이 */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400/[0.08] via-transparent to-indigo-400/[0.1]" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-400/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-sky-400/12 blur-3xl" />
          {/* 하이라이트와 톤을 묶어주는 웜 글로우 */}
          <div className="absolute left-1/2 top-1/2 h-[240px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/10 blur-3xl" />
        </div>
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
    </ExpandBackgroundContext.Provider>
  );
}

export default function AboutPageClient() {
  const storySectionRef = useRef<HTMLElement>(null);
  const whyEternalSectionRef = useRef<HTMLElement>(null);
  const intelligenceSectionRef = useRef<HTMLElement>(null);
  const teamSectionRef = useRef<HTMLElement>(null);
  const [storyVisible, setStoryVisible] = useState(false);
  const [whyEternalVisible, setWhyEternalVisible] = useState(false);
  const [intelligenceVisible, setIntelligenceVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);
  const isMobile = useIsMobile();

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

  useEffect(() => {
    const el = teamSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTeamVisible(true);
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
      <section className="relative w-full min-h-[726px] sm:min-h-[320px] lg:h-[420px] overflow-hidden">
        <div className="absolute inset-0">
          {isMobile ? (
            <Image src="/images/pngs/about-mobile-png.png" alt="" fill className="object-contain object-top" sizes="100vw" priority />
          ) : (
            <Image src="/images/about-background-desktop.png" alt="" fill className="object-cover" sizes="100vw" loading="eager" />
          )}
        </div>
        <div className="relative z-10 h-full min-h-[726px] sm:min-h-[320px] flex flex-col items-center text-center px-4 pt-0 sm:pt-16 pb-[200px] sm:pb-16 lg:pt-14 lg:pb-20 gap-6 sm:gap-0 justify-center sm:justify-start">
          <h1 className="m-0 mt-0 sm:mt-12 lg:mt-12 font-sans text-[32px] sm:text-[32px] lg:text-[40px] font-bold leading-normal text-center">
            <span className="text-white/80 block sm:inline">ABOUT</span>
            <span className="text-[#6d94ff] block sm:inline sm:ml-2">ETERNAL MARKETING</span>
          </h1>
          <Image
            src="/images/logo.svg"
            alt="Eternal Marketing Logo"
            width={80}
            height={46}
            className="w-[70px] sm:w-[80px] h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] sm:mt-6"
          />
          <div className="font-sans text-[18px] sm:text-[16px] lg:text-[18px] leading-relaxed text-white text-center sm:mt-8 sm:px-4">
            <p className="m-0 font-sans font-extralight">마케팅을 얼마나 진지하게 다루는지,</p>
            <p className="m-0 font-sans font-extralight">그리고 왜 결과가 다른지</p>
            <p className="m-0 font-sans font-extrabold text-[22px] sm:text-[20px] lg:text-[22px]">기준에서 드러납니다</p>
          </div>
        </div>
      </section>

      <section ref={storySectionRef} className="w-full bg-white">
        <div className="w-full max-w-[1163px] mx-auto px-6 sm:px-6 py-14 sm:py-16 lg:py-[100px]">
          <FadeIn>
            <div className="flex items-center gap-3">
              <span className="relative block h-8 w-[6px] overflow-hidden rounded-full bg-primary/12">
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(24,75,186,1)_0%,rgba(24,75,186,0.45)_100%)]" />
              </span>
              <span className="font-sans text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] text-primary uppercase">Our Story &amp; Philosophy</span>
            </div>
          </FadeIn>
          <div className="mt-8 sm:mt-10 lg:mt-[46px] flex flex-col lg:flex-row gap-10 lg:gap-12 items-center lg:items-start">
            <SlideInLeft delay={200}>
              <div className="w-full lg:w-[660px]">
                <Image src="/images/about-page/about-svg.png" alt="" width={680} height={400} className="w-full h-auto" sizes="(max-width: 1024px) 100vw, 680px" loading="lazy" />
              </div>
            </SlideInLeft>
            <div className={`flex-1 w-full max-w-[520px] lg:pt-12 ${storyVisible ? 'about-story-animate' : ''}`}>
              <h3 className="about-story-line about-story-delay-0 m-0 font-sans text-[30px] sm:text-[32px] lg:text-[40px] font-bold leading-[1.22] tracking-[-0.03em] text-main text-left">
                왜 결과는 항상 같을까요?
              </h3>
              <div className="about-story-line about-story-delay-1 mt-6 sm:mt-7">
                <p className="m-0 font-sans text-[19px] sm:text-[20px] lg:text-[22px] font-medium leading-[1.85] tracking-[-0.02em] text-main">
                  마케팅은 늘 진행되고 있었지만
                  <br />
                  정작 <span className="text-primary font-semibold">&lsquo;왜 이걸 하는지&rsquo;</span>는 설명되지 않았습니다.
                </p>
              </div>
              <div className="about-story-line about-story-delay-2 mt-3 sm:mt-4">
                <p className="m-0 font-sans text-[18px] sm:text-[19px] lg:text-[21px] font-medium leading-[2] text-main">
                  실행은 많았지만
                </p>
                <p className="m-0 mt-2 font-sans text-[19px] sm:text-[20px] lg:text-[22px] font-semibold leading-[1.8] text-main">
                  판단은 없었고,
                </p>
                <p className="m-0 mt-1 font-sans text-[19px] sm:text-[20px] lg:text-[22px] font-semibold leading-[1.8] text-main">
                  성과는 남지 않았습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExpandBackground>
        <div className="relative w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-24 sm:py-10 lg:py-[60px] text-center">
          {/* 상단 디바이더 */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[92%] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.28),rgba(255,255,255,0))]" aria-hidden />

          {/* 문구 주변 장식 (카드 없이) */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2" aria-hidden>
            {/* 스포트라이트 */}
            <div className="absolute left-1/2 top-1/2 h-[210px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.07)_40%,rgba(255,255,255,0)_70%)] blur-xl" />
            {/* 사선 라인 패턴 */}
            <div className="absolute left-1/2 top-1/2 h-[170px] w-[860px] -translate-x-1/2 -translate-y-1/2 opacity-[0.26] [mask-image:radial-gradient(circle,black_40%,transparent_72%)] bg-[linear-gradient(135deg,rgba(255,255,255,0.26)_0,rgba(255,255,255,0.26)_1px,transparent_1px,transparent_14px)] [background-size:18px_18px]" />
            {/* 얇은 라이트 스트릭 */}
            <div className="absolute -top-6 right-[-80px] h-[140px] w-[260px] rotate-[16deg] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.14),rgba(255,255,255,0))] blur-xl" />
          </div>

          <div className="relative mx-auto w-full max-w-[980px]">
            {/* 모바일 전용 */}
            <div className="sm:hidden">
              <p className="m-0 font-sans font-semibold leading-snug text-[24px]">
                <ExpandHighlight delay={600}>이터널마케팅</ExpandHighlight>
                <span className="text-white/80">은 이 비효율적인 구조에</span>
              </p>
              <p className="m-0 font-sans font-semibold leading-snug mt-2 text-[24px]">
                <ExpandHighlight delay={1000}>질문</ExpandHighlight>
                <span className="text-white/80">을 던지는 것에서 시작했습니다</span>
              </p>
            </div>
            {/* 데스크탑 전용 */}
            <div className="hidden sm:block text-center">
              <p className="m-0 font-sans font-semibold text-[28px] lg:text-[36px] leading-relaxed">
                <ExpandHighlight delay={600}>이터널마케팅</ExpandHighlight>
                <span className="text-white/70">은</span>
              </p>
              <p className="m-0 mt-2 font-sans font-semibold text-[24px] lg:text-[32px] leading-relaxed">
                <span className="text-white/70">이 비효율적인 구조에 </span>
                <ExpandHighlight delay={1000}>질문</ExpandHighlight>
                <span className="text-white/70">을 던지는 것에서 시작했습니다</span>
              </p>
            </div>
          </div>

          {/* 하단 디바이더 */}
          <div className="pointer-events-none absolute left-1/2 bottom-0 h-px w-[92%] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.22),rgba(255,255,255,0))]" aria-hidden />
        </div>
      </ExpandBackground>

      <section ref={whyEternalSectionRef} className="relative w-full overflow-hidden bg-[#f7f8fc]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(24,75,186,0.08),transparent_28%),radial-gradient(circle_at_82%_28%,rgba(24,75,186,0.06),transparent_24%),linear-gradient(180deg,#f9fbff_0%,#f7f8fc_100%)]" aria-hidden />
        <div className="relative w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-20 sm:py-18 lg:py-[120px]">
          <div className={`flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-18 ${whyEternalVisible ? 'about-story-animate' : ''}`}>
            <div className="flex-1 lg:max-w-[560px]">
              <div className="about-story-line about-story-delay-0 flex items-center gap-3">
                <span className="relative block h-8 w-[6px] overflow-hidden rounded-full bg-primary/12">
                  <span className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(24,75,186,1)_0%,rgba(24,75,186,0.45)_100%)]" />
                </span>
                <span className="font-sans text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] text-primary uppercase">Why Eternal</span>
              </div>

              <h2 className="about-story-line about-story-delay-0 m-0 mt-5 font-sans text-[34px] sm:text-[40px] lg:text-[52px] font-bold leading-[1.16] tracking-[-0.03em] text-main text-left">
                <span className="text-primary">이터널</span>이
                <br className="sm:hidden" /> 기준이 되는 이유
              </h2>

              <div className="about-story-line about-story-delay-1 mt-8 sm:mt-9">
                <p className="m-0 font-sans text-[18px] sm:text-[20px] lg:text-[24px] font-medium leading-[1.7] tracking-[-0.02em] text-main">
                  이터널은 <span className="text-sub2 line-through decoration-red-500 decoration-2">&lsquo;일단 해보는 마케팅&rsquo;</span>이 아니라
                  <br className="hidden sm:block" />
                  될 가능성이 있는 <span className="text-primary font-bold">선택만 남기는 마케팅</span>을 설계합니다.
                </p>
              </div>

              <div className="about-story-line about-story-delay-2 mt-7 sm:mt-8 pl-4 sm:pl-5">
                <p className="m-0 font-sans text-[15px] sm:text-[16px] lg:text-[18px] font-light leading-[2] text-sub1">
                  성과로 검증된 데이터와 실제 운영 결과를 토대로 불필요한 시도는 배제하고,
                  <br className="hidden sm:block" />
                  매출로 이어질 수 있는 흐름만 구조화합니다.
                </p>
              </div>

              <div className="about-story-line about-story-delay-3 mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl bg-white/72 backdrop-blur-sm px-4 py-4 shadow-[0_10px_30px_rgba(17,17,17,0.04)] ring-1 ring-black/[0.04]">
                  <p className="m-0 font-sans text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">Intelligence</p>
                  <p className="m-0 mt-2 font-sans text-[15px] sm:text-[16px] font-medium leading-[1.7] text-main">마케팅 전용으로 설계된 인텔리전스</p>
                </div>
                <div className="rounded-2xl bg-white/72 backdrop-blur-sm px-4 py-4 shadow-[0_10px_30px_rgba(17,17,17,0.04)] ring-1 ring-black/[0.04]">
                  <p className="m-0 font-sans text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">Decision</p>
                  <p className="m-0 mt-2 font-sans text-[15px] sm:text-[16px] font-medium leading-[1.7] text-main">현장을 이해하는 전문 마케터의 판단</p>
                </div>
              </div>

              <p className="about-story-line about-story-delay-4 m-0 mt-6 sm:mt-7 font-sans text-[17px] sm:text-[19px] lg:text-[22px] font-semibold leading-[1.75] tracking-[-0.02em] text-[#1a1d26] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                그리고 그 구조는 <span className="text-primary/90 font-bold">위 두 기준</span>을 통해 결정됩니다.
              </p>
            </div>

            <SlideInRight delay={350}>
              <div className="relative w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[440px] mx-auto lg:mx-0 flex-shrink-0">
                <div className="absolute inset-0 scale-[1.12] rounded-full bg-[radial-gradient(circle,rgba(24,75,186,0.14)_0%,rgba(24,75,186,0.06)_42%,transparent_72%)] blur-2xl pointer-events-none" aria-hidden />
                <div className="relative p-4">
                  <Image src="/images/about-page/about-infinite.png" alt="" width={440} height={320} className="w-full h-auto drop-shadow-[0_18px_40px_rgba(24,75,186,0.14)]" sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 440px" loading="lazy" />
                  <span className="absolute top-0 left-[18%] -translate-y-[calc(50%+0.5rem)] px-3 py-1 rounded-full bg-white/88 backdrop-blur-sm shadow-[0_8px_20px_rgba(17,17,17,0.06)] text-primary text-[11px] sm:text-[12px] font-semibold">구조 재설계</span>
                  <span className="absolute top-0 right-[18%] -translate-y-[calc(50%+0.5rem)] px-3 py-1 rounded-full bg-white/88 backdrop-blur-sm shadow-[0_8px_20px_rgba(17,17,17,0.06)] text-primary text-[11px] sm:text-[12px] font-semibold">세밀 분석</span>
                  <span className="absolute top-1/2 -left-6 sm:-left-8 -translate-y-1/2 px-3 py-1 rounded-full bg-white/88 backdrop-blur-sm shadow-[0_8px_20px_rgba(17,17,17,0.06)] text-primary text-[11px] sm:text-[12px] font-semibold">최적화</span>
                  <span className="absolute top-1/2 -right-6 sm:-right-8 -translate-y-1/2 px-3 py-1 rounded-full bg-white/88 backdrop-blur-sm shadow-[0_8px_20px_rgba(17,17,17,0.06)] text-primary text-[11px] sm:text-[12px] font-semibold">최적화</span>
                  <span className="absolute bottom-0 right-[18%] translate-y-[calc(50%+0.5rem)] px-3 py-1 rounded-full bg-white/88 backdrop-blur-sm shadow-[0_8px_20px_rgba(17,17,17,0.06)] text-primary text-[11px] sm:text-[12px] font-semibold">정밀 판단</span>
                  <span className="absolute bottom-0 left-[18%] translate-y-[calc(50%+0.5rem)] px-3 py-1 rounded-full bg-white/88 backdrop-blur-sm shadow-[0_8px_20px_rgba(17,17,17,0.06)] text-primary text-[11px] sm:text-[12px] font-semibold">고효율 실행</span>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      <section ref={intelligenceSectionRef} className="relative w-full min-h-[560px] sm:min-h-[620px] lg:h-[760px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/about-page/about-puzzlebackground.png" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,15,0.18)_0%,rgba(3,6,15,0.36)_38%,rgba(3,6,15,0.76)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_38%,rgba(53,96,214,0.22),transparent_28%)]" />

        <div className={`relative z-10 w-full max-w-[1163px] mx-auto px-4 sm:px-6 h-full min-h-[560px] sm:min-h-[620px] lg:min-h-0 flex items-center justify-end ${intelligenceVisible ? 'about-story-animate' : ''}`}>
          <div className="w-full lg:max-w-[560px] ml-auto pt-24 sm:pt-28 lg:pt-0">
            <div className="about-story-line about-story-delay-0 flex items-center justify-end gap-3">
              <span className="relative block h-8 w-[6px] overflow-hidden rounded-full bg-white/12">
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(138,173,255,0.65)_100%)]" />
              </span>
              <span className="font-sans text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] text-white/80 uppercase">Marketing Intelligence</span>
            </div>

            <h2 className="about-story-line about-story-delay-1 m-0 mt-5 font-sans text-[30px] sm:text-[36px] lg:text-[48px] font-bold leading-[1.18] tracking-[-0.04em] text-white text-right">
              마케팅의 정답을 가려내는{' '}
              <span className="relative inline-block align-middle">
                <span
                  className="absolute inset-0 rounded-[14px] border border-white/20 bg-primary/90 shadow-[0_12px_30px_rgba(53,96,214,0.45)]"
                  style={{
                    transformOrigin: 'left',
                    transform: intelligenceVisible ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                    transitionDelay: '400ms',
                    zIndex: 0,
                  }}
                  aria-hidden
                />
                <span className="relative z-10 px-3 sm:px-4 py-1 sm:py-1.5 text-white">인텔리전스</span>
              </span>
            </h2>

            <div className="about-story-line about-story-delay-2 mt-7 rounded-[28px] border border-white/12 bg-white/[0.08] px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-9 backdrop-blur-xl shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
              <div className="text-right font-sans text-[16px] sm:text-[17px] lg:text-[20px] leading-[1.9] lg:leading-[2] text-white drop-shadow-[0px_4px_14px_rgba(0,0,0,0.22)]">
                <p className="about-story-line about-story-delay-3 m-0 text-white/88">마케팅 인텔리전스는</p>
                <p className="about-story-line about-story-delay-4 m-0 text-white/88">AI 기술 전문가와 업계 최상위 마케터가 함께 설계한</p>
                <p className="about-story-line about-story-delay-5 m-0">
                  <span className="relative inline-block font-semibold">
                    <span
                      className="absolute inset-0 rounded-lg bg-primary/35"
                      style={{
                        transformOrigin: 'left',
                        transform: intelligenceVisible ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                        transitionDelay: '700ms',
                        zIndex: 0,
                      }}
                      aria-hidden
                    />
                    <span className="relative z-10 px-1.5 text-white">결과 중심 판단 시스템</span>
                  </span>
                  입니다.
                </p>
                <p className="about-story-line about-story-delay-6 m-0 mt-4 text-white/78">수년간 축적된 마케팅 성과와 실패 사례,</p>
                <p className="about-story-line about-story-delay-6 m-0 text-white/78">채널별 운영 결과 데이터를 기반으로</p>
                <p className="about-story-line about-story-delay-6 m-0">
                  대표님에게{' '}
                  <span className="relative inline-block font-semibold">
                    <span
                      className="absolute inset-0 rounded-lg bg-primary/35"
                      style={{
                        transformOrigin: 'left',
                        transform: intelligenceVisible ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                        transitionDelay: '1000ms',
                        zIndex: 0,
                      }}
                      aria-hidden
                    />
                    <span className="relative z-10 px-1.5 text-white">가장 가능성 높은 선택</span>
                  </span>
                  만 도출하도록 만들어졌습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={teamSectionRef} className="w-full bg-[#f6f6f6] min-h-screen sm:min-h-0">
        <div className={`w-full max-w-[1163px] mx-auto px-4 sm:px-6 pt-16 pb-12 sm:py-16 lg:py-[100px] ${teamVisible ? 'about-story-animate' : ''}`}>
          <div className="max-w-[820px]">
            <div className="about-story-line about-story-delay-0 flex items-center gap-3">
              <span className="relative block h-8 w-[6px] overflow-hidden rounded-full bg-primary/12">
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(24,75,186,1)_0%,rgba(24,75,186,0.45)_100%)]" />
              </span>
              <span className="font-sans text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] text-primary uppercase">Our Team</span>
            </div>

            <div className="mt-4 sm:mt-5">
              <p className="about-story-line about-story-delay-1 m-0 font-sans text-[28px] sm:text-[34px] lg:text-[42px] font-bold leading-[1.24] tracking-[-0.03em] text-main">
                이터널마케팅은
              </p>
              <p className="about-story-line about-story-delay-2 m-0 mt-1 font-sans text-[28px] sm:text-[34px] lg:text-[42px] font-bold leading-[1.24] tracking-[-0.03em] text-main">
                <span className="relative inline-block rounded-lg bg-primary/[0.08] px-3 py-1.5 text-primary">
                  판단-설계-실행-관리
                </span>
                까지
              </p>
              <p className="about-story-line about-story-delay-3 m-0 mt-3 sm:mt-4 font-sans text-[18px] sm:text-[21px] lg:text-[23px] font-medium leading-[1.75] tracking-[-0.02em] text-sub2">
                역할이 분리된 전문 조직 체계로 운영됩니다.
              </p>
            </div>
          </div>

          <div className="about-story-line about-story-delay-4 mt-6 sm:mt-8 w-full overflow-hidden">
            <OurTeamChart visible={teamVisible} />
          </div>
        </div>
      </section>

      <DiagnosisSection />
    </main>
  );
}

