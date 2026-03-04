'use client';

import Image from 'next/image';
import { useRef, useEffect, useState, useCallback } from 'react';

type SlideLayout = 'phones' | 'single' | 'cards';

interface Slide {
  category: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  layout?: SlideLayout;
  imageCaption?: string;
  imageLabels?: [string, string];
}

const SLIDES: Slide[] = [
  {
    category: '패션 브랜드 D2C 쇼핑몰',
    title: '숏폼 마케팅',
    description: '알고리즘 변화를 지속적으로 반영해 트렌드를 선제적으로 반영하고,\n고객의 기억에 각인되는 숏폼 콘텐츠로 기획·운영합니다',
    images: ['/images/service-page/service-1.png', '/images/service-page/service-2.png'],
    tags: ['유투브숏츠', '인스타릴스', '틱톡인피드', '플랫폼별맞춤기획', '알고리즘분석', '노출값극대화', 'AI정답키워드세팅'],
    layout: 'phones',
  },
  {
    category: '의료 서비스 전문 기관',
    title: '네이버 카페 커뮤니티 마케팅',
    description: '광고성 글이 아닌 자연스러운 리뷰 구조로\n지역상권 중심적으로 신뢰를 쌓고 실제 방문 전환을 강화하며,\n브랜드 특화 전용 자연노출형 및 신뢰 축적형 리뷰 컨텐츠를 기획 후 운영합니다',
    images: ['/images/service-page/service-3.png', '/images/service-page/service-4.png'],
    tags: ['네이버카페', '맘카페마케팅', '지역상권', '자연노출형리뷰', '신뢰축적형컨텐츠', '방문전환강화', '커뮤니티바이럴'],
    layout: 'phones',
  },
  {
    category: '육류 전문 외식업체',
    title: '플레이스 프리미엄 솔루션',
    description: '플레이스의 모든 세팅 요소를 정밀 분석·최적화해\n지도 검색 노출을 안정적으로 확보하고\n실제 방문 전환율을 증대시킵니다',
    images: ['/images/service-page/service-5.png'],
    tags: ['네이버플레이스', '지도검색최적화', '방문전환율', '플레이스세팅', '파워링크', '키워드노출', '리뷰관리'],
    layout: 'single',
  },
  {
    category: 'H헤어 디자인 전문 살롱',
    title: '인스타그램 매니지먼트',
    description: '인스타그램 계정을 사업 목적에 맞게 정밀 세팅해\n피드·하이라이트·소개글까지 전문적으로 구성하고\n브랜드 인식 개선과 매출 전환을 강화합니다',
    images: ['/images/service-page/service-6.png', '/images/service-page/service-7.png'],
    tags: ['인스타그램', '계정최적화', '피드디자인', '하이라이트구성', '브랜드이미지', '매출전환', '소개글세팅'],
    layout: 'phones',
    imageLabels: ['before', 'after'],
  },
  {
    category: '스킨케어 코스메틱 기업',
    title: '통합 마케팅 커맨드 시스템',
    description: '브랜드 전략 수립부터 콘텐츠 크리에이팅·마케팅 컨설팅\n퍼포먼스 운영까지\n전 영역을 통합 관리하며,\n각 업체만의 제품 특성과 타겟 니즈를 정교하게 반영하여\n광고 성과에 최적화된 랜딩 구조를 설계합니다',
    images: ['/images/service-page/service-8.png', '/images/service-page/service-9.png'],
    tags: ['통합마케팅', '브랜드전략', '콘텐츠크리에이팅', '퍼포먼스마케팅', '랜딩최적화', '광고성과', '컨설팅'],
    layout: 'cards',
  },
];

const SWIPE_THRESHOLD = 40;

export default function ServiceCaseStudySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const swipeAreaRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const currentRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  currentRef.current = current;
  const [animating, setAnimating] = useState(false);
  const [slideVisible, setSlideVisible] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const total = SLIDES.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((idx: number, direction: 'next' | 'prev') => {
    if (animating || idx === current) return;
    setAnimating(true);
    setSlideDirection(direction);
    setSlideVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      requestAnimationFrame(() => {
        setSlideVisible(true);
        setTimeout(() => setAnimating(false), 450);
      });
    }, 350);
  }, [animating, current]);

  const prev = () => goTo((current - 1 + total) % total, 'prev');
  const next = () => goTo((current + 1) % total, 'next');

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  useEffect(() => {
    const el = swipeAreaRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
      const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
      if (dx > dy && dx > 15) e.preventDefault();
    };
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', onTouchMove);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const curr = currentRef.current;
    if (deltaX > SWIPE_THRESHOLD) goTo((curr - 1 + total) % total, 'prev');
    else if (deltaX < -SWIPE_THRESHOLD) goTo((curr + 1) % total, 'next');
  }, [total, goTo]);

  const fade = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
  });

  const slide = SLIDES[current];
  const layout = slide.layout || (slide.images.length === 1 ? 'single' : 'phones');

  const slideOffset = slideDirection === 'next' ? 48 : -48;
  const slideTransition: React.CSSProperties = {
    opacity: slideVisible ? 1 : 0,
    transform: slideVisible
      ? 'translate(0, 0) scale(1)'
      : `translate(${slideOffset}px, 8px) scale(0.97)`,
    transition: 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#f6f6f6] overflow-hidden">
      <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-14 lg:py-[72px]">

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20 gap-12 sm:gap-10" style={slideTransition}>

          {/* ── 왼쪽: 텍스트 + 태그 ── */}
          <div className="flex-shrink-0 lg:w-[300px] xl:w-[340px] flex flex-col justify-between lg:py-6">
            <div>
              <span
                className="inline-block mb-2 sm:mb-3 px-3 py-1 rounded-full bg-primary/8 text-primary font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.08em]"
                style={fade(0)}
              >
                {slide.category}
              </span>
              <h2
                className="m-0 font-sans text-[24px] sm:text-[32px] lg:text-[38px] font-bold text-main leading-[1.2]"
                style={fade(100)}
              >
                {slide.title}
              </h2>
              <p
                className="m-0 mt-4 sm:mt-5 font-sans text-[13px] sm:text-[14px] font-light text-sub1 leading-[1.85] whitespace-pre-line"
                style={fade(200)}
              >
                {slide.description}
              </p>
            </div>

            <div
              className="hidden lg:flex flex-wrap gap-2 mt-8"
              style={fade(350)}
            >
              {slide.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white text-sub2 font-sans text-[12px] font-medium ring-1 ring-black/[0.06] hover:ring-primary/30 hover:text-primary transition-all duration-250 cursor-default"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.96)',
                    transition: `all 0.4s ease-out ${400 + i * 40}ms`,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── 오른쪽: 이미지 영역 ── */}
          <div className="flex-1 relative">

            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(109,148,255,0.10) 0%, rgba(109,148,255,0.03) 50%, transparent 70%)',
                opacity: visible ? 1 : 0,
                transition: 'opacity 1s ease-out 200ms',
              }}
              aria-hidden
            />

            <div
              ref={swipeAreaRef}
              className="relative flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 sm:gap-5 lg:gap-6 min-h-[280px] sm:min-h-[460px] lg:min-h-[520px] -mt-8 sm:mt-0 select-none"
              style={{ touchAction: 'pan-y' }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >

              {/* 왼쪽 화살표 - 모바일에서 숨김 */}
              <button
                onClick={prev}
                disabled={animating}
                className="hidden sm:flex absolute -left-10 top-1/2 -translate-y-1/2 items-center justify-center text-[#555555] hover:text-[#222222] transition-colors duration-200 z-10 disabled:pointer-events-none"
                aria-label="이전"
              >
                <svg className="w-7 h-12" viewBox="0 0 28 48" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 4 6 24 22 44" />
                </svg>
              </button>

              {/* --- 레이아웃별 이미지 렌더링 --- */}

              {layout === 'single' && (
                <div
                  className="relative w-full max-w-[600px] lg:max-w-[680px] aspect-[16/10] z-[1] self-center"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'opacity 0.75s ease-out 300ms, transform 0.75s ease-out 300ms',
                  }}
                >
                  <Image
                    src={slide.images[0]}
                    alt={`${slide.title} 예시`}
                    fill
                    quality={90}
                    className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, 680px"
                  />
                </div>
              )}

              {layout === 'phones' && (
                <>
                  <div className="flex flex-col items-center z-[1]">
                    {slide.imageLabels?.[0] && (
                      <span
                        className="mb-1 sm:mb-2 mt-0 sm:mt-12 font-sans text-[11px] sm:text-[15px] lg:text-[17px] font-light tracking-[0.12em] sm:tracking-[0.18em] text-sub2"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? 'translateY(0)' : 'translateY(8px)',
                          transition: 'opacity 0.5s ease-out 200ms, transform 0.5s ease-out 200ms',
                        }}
                      >
                        {slide.imageLabels[0]}
                      </span>
                    )}
                    <div
                      className="relative w-[200px] sm:w-[250px] lg:w-[260px] xl:w-[280px] aspect-[271/574]"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(8px) sm:translateY(32px)' : 'translateY(30px) sm:translateY(60px)',
                        transition: 'opacity 0.75s ease-out 300ms, transform 0.75s ease-out 300ms',
                      }}
                    >
                      <Image
                        src={slide.images[0]}
                        alt={`${slide.title} 예시 1`}
                        fill
                        quality={90}
                        className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                        sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 280px"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center z-[2]">
                    {slide.imageLabels?.[1] && (
                      <span
                        className="mb-1 sm:mb-2 mt-2 sm:mt-12 font-sans text-[11px] sm:text-[15px] lg:text-[17px] font-light tracking-[0.12em] sm:tracking-[0.18em] text-sub2"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? 'translateY(0)' : 'translateY(8px)',
                          transition: 'opacity 0.5s ease-out 330ms, transform 0.5s ease-out 330ms',
                        }}
                      >
                        {slide.imageLabels[1]}
                      </span>
                    )}
                    <div
                      className="relative w-[200px] sm:w-[250px] lg:w-[260px] xl:w-[280px] aspect-[271/574]"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(30px) sm:translateY(60px)',
                        transition: 'opacity 0.75s ease-out 430ms, transform 0.75s ease-out 430ms',
                      }}
                    >
                      <Image
                        src={slide.images[1]}
                        alt={`${slide.title} 예시 2`}
                        fill
                        quality={90}
                        className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                        sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 280px"
                      />
                    </div>
                  </div>
                </>
              )}

              {layout === 'cards' && (
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-8 sm:gap-10 self-center">
                  {/* 카드 1 — 가로형 (아래쪽 배치) */}
                  <div className="flex flex-col">
                    <div
                      className="relative w-[210px] sm:w-[270px] lg:w-[300px] xl:w-[340px] aspect-[870/660] z-[1] rounded-lg overflow-hidden"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(20px)' : 'translateY(50px)',
                        transition: 'opacity 0.75s ease-out 300ms, transform 0.75s ease-out 300ms',
                      }}
                    >
                      <Image
                        src={slide.images[0]}
                        alt={`${slide.title} 예시 1`}
                        fill
                        quality={90}
                        className="object-cover drop-shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
                        sizes="(max-width: 640px) 210px, (max-width: 1024px) 270px, 340px"
                      />
                    </div>
                  </div>

                  {/* 카드 2 — 정사각 (위쪽 배치) + 캡션 */}
                  <div className="flex flex-col gap-3">
                    {slide.imageCaption && (
                      <p
                        className="m-0 font-sans text-[11px] sm:text-[12px] lg:text-[13px] font-light text-sub2 leading-[1.7] whitespace-pre-line"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? 'translateY(0)' : 'translateY(10px)',
                          transition: 'opacity 0.65s ease-out 350ms, transform 0.65s ease-out 350ms',
                        }}
                      >
                        {slide.imageCaption}
                      </p>
                    )}
                    <div
                      className="relative w-[210px] sm:w-[270px] lg:w-[300px] xl:w-[340px] aspect-square z-[2] rounded-lg overflow-hidden"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(50px)',
                        transition: 'opacity 0.75s ease-out 430ms, transform 0.75s ease-out 430ms',
                      }}
                    >
                      <Image
                        src={slide.images[1]}
                        alt={`${slide.title} 예시 2`}
                        fill
                        quality={90}
                        className="object-cover drop-shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
                        sizes="(max-width: 640px) 210px, (max-width: 1024px) 270px, 340px"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 오른쪽 화살표 - 모바일에서 숨김 */}
              <button
                onClick={next}
                disabled={animating}
                className="hidden sm:flex absolute -right-10 top-1/2 -translate-y-1/2 items-center justify-center text-[#555555] hover:text-[#222222] transition-colors duration-200 z-10 disabled:pointer-events-none"
                aria-label="다음"
              >
                <svg className="w-7 h-12" viewBox="0 0 28 48" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 4 22 24 6 44" />
                </svg>
              </button>
            </div>

            {/* 태그 - 모바일에서만 목업 아래 표시 */}
            <div
              className="flex lg:hidden flex-wrap justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8"
              style={fade(350)}
            >
              {slide.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-white text-sub2 font-sans text-[10px] sm:text-[12px] font-medium ring-1 ring-black/[0.06]"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.96)',
                    transition: `all 0.4s ease-out ${400 + i * 40}ms`,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* 페이지 인디케이터 */}
            <div className="mt-5 sm:mt-6 flex justify-center gap-1.5" style={fade(400)}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  disabled={animating}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-1.5 bg-sub2' : 'w-1.5 h-1.5 bg-sub3/50'}`}
                  aria-label={`슬라이드 ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
