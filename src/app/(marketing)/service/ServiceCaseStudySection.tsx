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
    images: ['/images/service-page/service-1-1.png', '/images/service-page/service-1-2.png'],
    tags: ['유투브숏츠', '인스타릴스', '틱톡인피드', '플랫폼별맞춤기획', '알고리즘분석', '노출값극대화', 'AI정답키워드세팅'],
    layout: 'phones',
  },
  {
    category: '의료 서비스 전문 기관',
    title: '네이버 카페 커뮤니티 마케팅',
    description: '광고성 글이 아닌 자연스러운 리뷰 구조로\n지역상권 중심적으로 신뢰를 쌓고 실제 방문 전환을 강화하며,\n브랜드 특화 전용 자연노출형 및 신뢰 축적형 리뷰 컨텐츠를 기획 후 운영합니다',
    images: ['/images/service-page/service-2-1.png', '/images/service-page/service-2-2.png'],
    tags: ['네이버카페', '맘카페마케팅', '지역상권', '자연노출형리뷰', '신뢰축적형컨텐츠', '방문전환강화', '커뮤니티바이럴'],
    layout: 'phones',
  },
  {
    category: '육류 전문 외식업체',
    title: '플레이스 프리미엄 솔루션',
    description: '플레이스의 모든 세팅 요소를 정밀 분석·최적화하여\n지도 검색 노출을 안정적으로 확보하고\n실제 방문 전환율을 증대시킵니다',
    images: ['/images/service-page/service-5.png'],
    tags: ['네이버플레이스', '지도검색최적화', '방문전환율', '플레이스세팅', '파워링크', '키워드노출', '리뷰관리'],
    layout: 'single',
  },
  {
    category: 'H헤어 디자인 전문 살롱',
    title: '인스타그램 매니지먼트',
    description: '인스타그램 계정을 사업 목적에 맞게 정밀 세팅하여\n피드·하이라이트·소개글까지 전문적으로 구성하고\n브랜드 인식 개선과 매출 전환을 강화합니다',
    images: ['/images/service-page/service-6.png', '/images/service-blur1.png'],
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

export default function ServiceCaseStudySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
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
    setNextIndex(idx);
    setTimeout(() => {
      setCurrent(idx);
      setNextIndex(null);
      setAnimating(false);
    }, 500);
  }, [animating, current]);

  const prev = () => goTo((current - 1 + total) % total, 'prev');
  const next = () => goTo((current + 1) % total, 'next');

  const fade = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
  });

  // 전환 후에도 메인 카드를 재마운트하지 않도록 → 이미지 깜빡임 방지
  const displayIndex = nextIndex ?? current;
  const slide = SLIDES[displayIndex];
  const layout = slide.layout || (slide.images.length === 1 ? 'single' : 'phones');

  const isFlipping = animating && nextIndex !== null;
  const flipFade = () => ({ opacity: 1, transform: 'translateY(0)' });
  const flipTagStyle = { opacity: 1, transform: 'translateY(0) scale(1)', transition: 'none' as const };

  const renderSlideCard = (s: Slide, isFlip: boolean, activeDotIndex: number = current) => {
    const l = s.layout || (s.images.length === 1 ? 'single' : 'phones');
    const f = isFlip ? flipFade : fade;
    const v = isFlip || visible;
    const tagStyle = (i: number) => isFlip ? flipTagStyle : { opacity: v ? 1 : 0, transform: v ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.96)', transition: `all 0.4s ease-out ${400 + i * 40}ms` };
    const blobStyle = { background: 'radial-gradient(circle, rgba(109,148,255,0.10) 0%, rgba(109,148,255,0.03) 50%, transparent 70%)', opacity: v ? 1 : 0, transition: isFlip ? 'none' : 'opacity 1s ease-out 200ms' };
    const imgBase = (delay: string) => ({ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(40px)', transition: isFlip ? 'none' : `opacity 0.75s ease-out ${delay}, transform 0.75s ease-out ${delay}` });
    return (
      <div key={s.title} className="flex flex-col lg:flex-row lg:items-start lg:gap-12 gap-8 sm:gap-8 w-full">
        <div className="flex-shrink-0 lg:w-[300px] xl:w-[340px] flex flex-col justify-between lg:py-6 text-center lg:text-left items-center lg:items-start">
          <div className="w-full">
            <span className="inline-block mb-2 sm:mb-3 px-3 py-1 rounded-full bg-primary/8 text-primary font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.08em]" style={f(0)}>{s.category}</span>
            <h2 className="m-0 font-sans text-[24px] sm:text-[32px] lg:text-[38px] font-bold text-main leading-[1.2]" style={f(100)}>{s.title}</h2>
            <p className="m-0 mt-4 sm:mt-5 font-sans text-[13px] sm:text-[14px] font-light text-sub1 leading-[1.85] whitespace-pre-line" style={f(200)}>{s.description}</p>
          </div>
          <div className="hidden lg:flex flex-wrap gap-2 mt-8" style={f(350)}>
            {s.tags.map((tag, i) => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-sans text-[10px] font-semibold tracking-wide border border-primary/15 hover:bg-primary/15 transition-all duration-300 cursor-default" style={tagStyle(i)}>#{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex-1 relative overflow-visible">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] rounded-full pointer-events-none" style={blobStyle} aria-hidden />
          {/* 이미지 영역: 화살표가 이 영역 세로 중앙에 고정 */}
          <div className="relative min-h-[240px] sm:min-h-[380px] lg:min-h-[440px] -mt-6 sm:mt-0">
            {/* 이미지 컨텐츠는 터치를 받지 않게 해서, 어떤 슬라이드에서도 화살표/클릭영역을 가리지 않도록 함 */}
            <div className="relative flex flex-row items-center sm:items-end justify-center gap-2 sm:gap-3 lg:gap-4 min-h-[240px] sm:min-h-[380px] lg:min-h-[440px] select-none pointer-events-none">
            {l === 'single' && (
              <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] aspect-[16/10] z-[1] self-center" style={imgBase('300ms')}>
                <Image src={s.images[0]} alt={`${s.title} 예시`} fill quality={90} className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.10)]" sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px" />
              </div>
            )}
            {l === 'phones' && (
              <div className="flex flex-row items-end justify-center gap-1.5 sm:gap-3 z-[1]">
                <div className="flex flex-col items-center">
                  {s.imageLabels?.[0] && <span className="mb-1 sm:mb-1.5 mt-0 sm:mt-8 font-sans text-[11px] sm:text-[14px] lg:text-[15px] font-light tracking-[0.12em] sm:tracking-[0.18em] text-sub2" style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(8px)', transition: isFlip ? 'none' : 'opacity 0.5s ease-out 200ms, transform 0.5s ease-out 200ms' }}>{s.imageLabels[0]}</span>}
                  <div className="relative w-[110px] sm:w-[200px] lg:w-[220px] xl:w-[240px] aspect-[271/574] shrink-0" style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(8px) sm:translateY(24px)' : 'translateY(30px) sm:translateY(60px)', transition: isFlip ? 'none' : 'opacity 0.75s ease-out 300ms, transform 0.75s ease-out 300ms' }}>
                    <Image src={s.images[0]} alt={`${s.title} 예시 1`} fill quality={90} className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.12)]" sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 240px" />
                  </div>
                </div>
                <div className="flex flex-col items-center z-[2]">
                  {s.imageLabels?.[1] && <span className="mb-1 sm:mb-1.5 mt-1.5 sm:mt-8 font-sans text-[11px] sm:text-[14px] lg:text-[15px] font-light tracking-[0.12em] sm:tracking-[0.18em] text-sub2" style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(8px)', transition: isFlip ? 'none' : 'opacity 0.5s ease-out 330ms, transform 0.5s ease-out 330ms' }}>{s.imageLabels[1]}</span>}
                  <div className="relative w-[110px] sm:w-[200px] lg:w-[220px] xl:w-[240px] aspect-[271/574] shrink-0" style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(30px) sm:translateY(60px)', transition: isFlip ? 'none' : 'opacity 0.75s ease-out 430ms, transform 0.75s ease-out 430ms' }}>
                    <Image src={s.images[1]} alt={`${s.title} 예시 2`} fill quality={90} className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.12)]" sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 240px" />
                  </div>
                </div>
              </div>
            )}
            {l === 'cards' && (
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 sm:gap-6 self-center">
                <div className="flex flex-col">
                  <div className="relative w-[180px] sm:w-[220px] lg:w-[250px] xl:w-[270px] aspect-[870/660] z-[1] rounded-lg overflow-hidden" style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(20px)' : 'translateY(50px)', transition: isFlip ? 'none' : 'opacity 0.75s ease-out 300ms, transform 0.75s ease-out 300ms' }}>
                    <Image src={s.images[0]} alt={`${s.title} 예시 1`} fill quality={90} className="object-cover drop-shadow-[0_8px_30px_rgba(0,0,0,0.10)]" sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 270px" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {s.imageCaption && <p className="m-0 font-sans text-[11px] sm:text-[12px] lg:text-[13px] font-light text-sub2 leading-[1.7] whitespace-pre-line" style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(10px)', transition: isFlip ? 'none' : 'opacity 0.65s ease-out 350ms, transform 0.65s ease-out 350ms' }}>{s.imageCaption}</p>}
                  <div className="relative w-[180px] sm:w-[220px] lg:w-[250px] xl:w-[270px] aspect-square z-[2] rounded-lg overflow-hidden" style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(50px)', transition: isFlip ? 'none' : 'opacity 0.75s ease-out 430ms, transform 0.75s ease-out 430ms' }}>
                    <Image src={s.images[1]} alt={`${s.title} 예시 2`} fill quality={90} className="object-cover drop-shadow-[0_8px_30px_rgba(0,0,0,0.10)]" sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 270px" />
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
          {!isFlipping && (
            <div className="flex lg:hidden flex-wrap justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8" style={fade(350)}>
              {s.tags.map((tag, i) => (
                <span key={tag} className="px-2 py-1 rounded-full bg-primary/10 text-primary font-sans text-[9px] sm:text-[10px] font-semibold tracking-wide border border-primary/15" style={tagStyle(i)}>#{tag}</span>
              ))}
            </div>
          )}
          {!isFlipping && (
            <div className="mt-5 sm:mt-6 flex justify-center gap-1.5" style={fade(400)}>
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => goTo(i, i > current ? 'next' : 'prev')} disabled={animating} className={`rounded-full transition-all duration-300 ${i === activeDotIndex ? 'w-5 h-1.5 bg-sub2' : 'w-1.5 h-1.5 bg-sub3/50'}`} aria-label={`슬라이드 ${i + 1}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="w-full min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] bg-[#f6f6f6] -my-8 sm:my-0 py-8 sm:py-0 overflow-visible">
      <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-14 lg:py-[72px] overflow-visible">
        {/* 모바일·데스크톱 모두 고정 높이로 슬라이드 바꿔도 화살표 위치 동일 */}
        <div className="relative h-[560px] sm:h-[600px] lg:h-[640px] overflow-visible">
          {/* 메인 카드는 항상 한 개만 유지. 전환 중엔 새 슬라이드를 미리 표시하고 나가는 슬라이드만 오버레이로 제거 → 전환 후 이미지 재마운트 없어 깜빡임 방지 */}
          <div className={`relative w-full min-h-[560px] sm:min-h-[600px] overflow-visible ${isFlipping ? 'pointer-events-none' : ''}`}>
            <div className={`w-full ${isFlipping ? (slideDirection === 'next' ? 'slide-flip-in-next' : 'slide-flip-in-prev') : ''}`}>
              {renderSlideCard(slide, isFlipping, displayIndex)}
            </div>
          </div>
          {isFlipping && nextIndex !== null && (
            <div className={`absolute inset-0 w-full z-10 pointer-events-none ${slideDirection === 'next' ? 'slide-flip-out-next' : 'slide-flip-out-prev'}`}>
              {renderSlideCard(SLIDES[current], true, current)}
            </div>
          )}
          {/* 화살표·클릭 영역 */}
          <div className="absolute inset-0 z-[100]" aria-hidden>
            <button
              type="button"
              onClick={prev}
              disabled={animating}
              className="flex absolute left-0 lg:left-[380px] xl:left-[420px] top-0 bottom-0 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-full w-1/3 sm:w-auto sm:min-w-[44px] min-h-[44px] lg:min-w-[44px] items-center justify-start sm:justify-center pl-4 sm:pl-0 p-2 text-primary hover:opacity-80 lg:text-primary/40 lg:hover:text-primary lg:hover:opacity-100 active:scale-95 transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 touch-manipulation"
              aria-label="이전 슬라이드"
            >
              <span className="inline-block case-study-swipe-hint-left pointer-events-none">
                <svg className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </span>
            </button>
            <button
              type="button"
              onClick={next}
              disabled={animating}
              className="flex absolute right-0 top-0 bottom-0 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 items-center justify-end sm:justify-center pr-4 sm:pr-0 p-2 w-1/3 sm:w-auto sm:min-w-[44px] min-h-[44px] lg:min-w-[44px] text-primary hover:opacity-80 lg:text-primary/40 lg:hover:text-primary lg:hover:opacity-100 active:scale-95 transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 touch-manipulation translate-x-0 sm:translate-x-4 lg:translate-x-8 xl:translate-x-10"
              aria-label="다음 슬라이드"
            >
              <span className="inline-block case-study-swipe-hint-right pointer-events-none">
                <svg className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
