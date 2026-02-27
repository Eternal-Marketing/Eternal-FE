'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import DiagnosisSection from '@/components/sections/DiagnosisSection';

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

export default function AboutPageClient() {
  const storySectionRef = useRef<HTMLElement>(null);
  const whyEternalSectionRef = useRef<HTMLElement>(null);
  const intelligenceSectionRef = useRef<HTMLElement>(null);
  const teamSectionRef = useRef<HTMLElement>(null);
  const [storyVisible, setStoryVisible] = useState(false);
  const [whyEternalVisible, setWhyEternalVisible] = useState(false);
  const [intelligenceVisible, setIntelligenceVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);

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
        <div className="absolute inset-0 hidden sm:block">
          <Image src="/images/about-page/firstimage.svg" alt="" fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 sm:hidden">
          <Image src="/images/about-page/about_mobile.svg" alt="" fill className="object-contain object-top" sizes="100vw" priority />
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
            className="w-[70px] h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] sm:hidden"
          />
          <div className="font-sans text-[18px] sm:text-[14px] leading-relaxed text-white text-center sm:absolute sm:bottom-6 sm:left-0 sm:right-0 sm:px-4">
            <p className="m-0 font-sans font-extralight">마케팅을 얼마나 진지하게 다루는지,</p>
            <p className="m-0 font-sans font-extralight">그리고 왜 결과가 다른지</p>
            <p className="m-0 font-sans font-extrabold text-[20px] sm:text-[16px]">기준에서 드러납니다</p>
          </div>
        </div>
      </section>

      <section ref={storySectionRef} className="w-full bg-[#ffffff]">
        <div className="w-full max-w-[1163px] mx-auto px-6 sm:px-6 py-12 sm:py-14 lg:py-[100px]">
          <FadeIn>
            <h2 className="m-0 font-sans text-[28px] sm:text-[28px] lg:text-[40px] font-bold leading-normal text-primary text-center sm:text-left">Our Story &amp; Philosophy</h2>
          </FadeIn>
          <div className="mt-8 sm:mt-8 lg:mt-[46px] flex flex-col lg:flex-row gap-8 lg:gap-10 items-center sm:items-start">
            <SlideInLeft delay={200}>
              <div className="w-full lg:w-[680px]">
                <Image src="/images/about-page/ourstory.svg" alt="" width={680} height={400} className="w-full h-auto" sizes="(max-width: 1024px) 100vw, 680px" />
              </div>
            </SlideInLeft>
            <div className={`flex-1 flex flex-col sm:block items-center sm:items-start text-center sm:text-left ${storyVisible ? 'about-story-animate' : ''}`}>
              <h3 className="about-story-line about-story-delay-0 m-0 font-sans text-[24px] sm:text-[24px] lg:text-[30px] font-bold leading-normal text-main">왜 결과는 항상 같을까요?</h3>
              <div className="mt-4 sm:mt-[10px] font-sans text-[18px] sm:text-[16px] lg:text-[20px] leading-[2] sm:leading-relaxed text-main sm:text-main" style={{color: undefined}}>
                <p className="about-story-line about-story-delay-1 m-0 text-gray-600 sm:text-main">마케팅은 늘 진행되고 있었지만</p>
                <p className="about-story-line about-story-delay-2 m-0 text-gray-600 sm:text-main">정작 '왜 이걸 하는지'는 설명되지 않았습니다</p>
                <p className="about-story-line about-story-delay-3 m-0 text-gray-600 sm:text-main">실행은 많았지만</p>
                <p className="about-story-line about-story-delay-4 m-0 text-gray-600 sm:text-main">판단은 없었고,</p>
                <p className="about-story-line about-story-delay-5 m-0 text-gray-600 sm:text-main">성과는 남지 않았습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExpandBackground>
        <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-24 sm:py-10 lg:py-[60px] text-center">
          {/* 모바일 전용 */}
          <div className="sm:hidden">
            <p className="m-0 font-sans font-semibold leading-snug">
              <span className="text-white text-[28px]">이터널마케팅</span>
              <span className="text-white/80 text-[24px]">은 이 비효율적인 구조에</span>
            </p>
            <p className="m-0 font-sans font-semibold leading-snug mt-2">
              <span className="text-white text-[28px]">질문</span>
              <span className="text-white/80 text-[24px]">을 던지는 것에서 시작했습니다</span>
            </p>
          </div>
          {/* 데스크탑 전용 */}
          <div className="hidden sm:block">
            <p className="m-0 font-sans font-semibold leading-[38px]">
              <span className="text-white text-[28px] lg:text-[40px]">이터널마케팅</span>
              <span className="text-white/80 text-[22px] lg:text-[30px]">은 이 비효율적인 구조에 </span>
              <span className="text-white text-[28px] lg:text-[40px]">질문</span>
              <span className="text-white/80 text-[22px] lg:text-[30px]">을 던지는 것에서 시작했습니다</span>
            </p>
          </div>
        </div>
      </ExpandBackground>

      <section ref={whyEternalSectionRef} className="w-full bg-bg min-h-[900px] sm:min-h-0 flex items-center sm:block">
        <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-20 sm:py-16 lg:py-[200px] relative">

          {/* 모바일 레이아웃 */}
          <div className={`sm:hidden ${whyEternalVisible ? 'about-story-animate' : ''}`}>
            <h2 className="about-story-line about-story-delay-0 m-0 -mt-10 font-sans text-[32px] font-bold leading-normal text-main text-center">
              <span className="text-primary">이터널</span>이 기준이 되는 이유
            </h2>

            <SlideInRight delay={200}>
              <div className="relative w-full max-w-[220px] mx-auto mt-16 mb-8">
                <Image src="/images/about-page/infinity.svg" alt="" width={300} height={225} className="w-full h-auto" sizes="300px" />
                <span className="absolute top-[-16px] left-[14%] text-[11px] text-main">구조 재설계</span>
                <span className="absolute top-[-16px] right-[10%] text-[11px] text-main">세밀 분석</span>
                <span className="absolute top-[50%] left-[-24px] -translate-y-1/2 text-[11px] text-main">최적화</span>
                <span className="absolute top-[50%] right-[-24px] -translate-y-1/2 text-[11px] text-main">최적화</span>
                <span className="absolute bottom-[-16px] right-[10%] text-[11px] text-main">정밀 판단</span>
                <span className="absolute bottom-[-16px] left-[14%] text-[11px] text-main">고효율 실행</span>
              </div>
            </SlideInRight>

            <div className="font-sans text-[17px] font-extralight leading-[1.6] text-main mt-20 text-left w-fit mx-auto">
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

          {/* 데스크탑 레이아웃 */}
          <div className={`hidden sm:flex flex-col lg:flex-row gap-8 lg:gap-10 items-center ${whyEternalVisible ? 'about-story-animate' : ''}`}>
            <div className="flex-1 pl-0 lg:pl-[80px]">
              <h2 className="about-story-line about-story-delay-0 m-0 font-sans text-[28px] lg:text-[40px] font-bold leading-normal text-main">
                <span className="text-primary">이터널</span>이 기준이 되는 이유
              </h2>
              <div className="mt-4 font-sans text-[16px] lg:text-[20px] font-extralight leading-relaxed text-main">
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

            <SlideInRight delay={400}>
              <div className="relative w-full max-w-[360px] lg:max-w-none lg:w-[400px] flex-shrink-0 lg:ml-[120px] mx-auto lg:mx-0">
                <Image src="/images/about-page/infinity.svg" alt="" width={400} height={300} className="w-full h-auto" sizes="(max-width: 1024px) 100vw, 400px" />
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

      <section ref={intelligenceSectionRef} className="relative w-full min-h-[500px] sm:min-h-[520px] lg:h-[720px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/about-page/puzzle-background.svg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/20" />

        <div className={`relative z-10 w-full max-w-[1163px] mx-auto px-4 sm:px-6 h-full min-h-[420px] sm:min-h-[520px] lg:min-h-0 ${intelligenceVisible ? 'about-story-animate' : ''}`}>
          <h2 className="about-story-line about-story-delay-0 m-0 pt-24 sm:pt-24 lg:pt-[200px] font-sans text-[26px] sm:text-[26px] lg:text-[40px] font-bold leading-normal text-white text-right">
            마케팅의 정답을 가려내는{' '}
            <span className="bg-primary px-2 sm:px-3 py-0.5 sm:py-1">인텔리전스</span>
          </h2>

          <div className="absolute right-4 sm:right-6 left-4 sm:left-auto top-[160px] sm:top-[220px] lg:top-[300px] text-right font-sans text-[17px] sm:text-[16px] lg:text-[20px] leading-relaxed lg:leading-[36px] text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
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

      <section ref={teamSectionRef} className="w-full bg-[#f6f6f6] min-h-screen sm:min-h-0">
        <div className={`w-full max-w-[1163px] mx-auto px-4 sm:px-6 pt-16 pb-12 sm:py-16 lg:py-[100px] ${teamVisible ? 'about-story-animate' : ''}`}>
          <h2 className="about-story-line about-story-delay-0 m-0 font-sans text-[24px] sm:text-[28px] font-bold leading-normal text-primary pl-4 sm:pl-0">Our Team</h2>
          <div className="mt-4 sm:mt-[10px] font-sans text-[18px] sm:text-[16px] font-semibold sm:font-medium leading-[2.5] sm:leading-relaxed text-main pl-4 sm:pl-0">
            <p className="about-story-line about-story-delay-1 m-0">이터널마케팅은</p>
            <p className="about-story-line about-story-delay-2 m-0">판단–설계–실행–관리까지</p>
            <p className="about-story-line about-story-delay-3 m-0">역할이 분리된 전문 조직 체계로 운영됩니다.</p>
          </div>

          <div className="about-story-line about-story-delay-4 mt-6 sm:mt-8 w-full overflow-hidden">
            <img
              src="/images/about-page/our%20team.svg"
              alt="이터널마케팅 조직 구조 - 판단 설계 실행 관리"
              className="hidden sm:block w-full h-auto max-w-[720px] mx-auto"
            />
            <img
              src="/images/about-page/our_team_mobile.svg"
              alt="이터널마케팅 조직 구조 - 판단 설계 실행 관리"
              className="block sm:hidden w-[80%] h-auto mx-auto"
            />
          </div>
        </div>
      </section>

      <DiagnosisSection />
    </main>
  );
}

