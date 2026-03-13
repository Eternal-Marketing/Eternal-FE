'use client';
/**
 * 카테고리 카드 섹션 (네이버 마케팅 / SNS 마케팅 등 재사용)
 * - title, titleColorClassName, categories(라벨 목록), cards(이미지·설명)
 * - 4열 그리드, 호버 시 카드 위에 description 오버레이, 뷰포트 진입 시 카드 등장
 */

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

type Card = {
  title: string;
  subtitle: string;
  imageSrc: string;
  description?: string;
};

export default function ServiceCategoryCardsSection({
  title,
  titleColorClassName,
  categories,
  cards,
  backgroundClassName = 'bg-[#f6f6f6]',
}: {
  title: string;
  titleColorClassName: string;
  categories: string[];
  cards: Card[];
  backgroundClassName?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);

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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hoverMql = window.matchMedia?.('(hover: hover) and (pointer: fine)');
    const desktopWidthMql = window.matchMedia?.('(min-width: 1024px)');

    const compute = () => {
      // "모바일일 때"는 뷰포트 기준으로 탭 토글만 동작하게 (DevTools 모바일 에뮬레이션 포함)
      const hoverCapable = hoverMql?.matches ?? false;
      const isDesktopWidth = desktopWidthMql?.matches ?? false;
      const next = hoverCapable && isDesktopWidth;
      setCanHover(next);
      if (!next) setHoveredCard(null);
    };

    compute();
    const onResize = () => compute();
    window.addEventListener('resize', onResize);
    hoverMql?.addEventListener?.('change', compute);
    desktopWidthMql?.addEventListener?.('change', compute);
    return () => {
      window.removeEventListener('resize', onResize);
      hoverMql?.removeEventListener?.('change', compute);
      desktopWidthMql?.removeEventListener?.('change', compute);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${backgroundClassName} w-full`}>
      <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-[90px]">
        <h2
          className={`m-0 font-sans text-[22px] sm:text-[26px] font-semibold leading-normal text-center ${titleColorClassName}`}
        >
          {title}
        </h2>

        {/* 카테고리 라벨 (| 구분) */}
        <div className="mt-4 sm:mt-6 text-center font-sans text-[10px] sm:text-[14px] text-sub1">
          {categories.map((c, idx) => (
            <span key={c}>
              {c}
              {idx < categories.length - 1 ? <span className="mx-2 sm:mx-4 text-sub3">|</span> : null}
            </span>
          ))}
        </div>

        {/* 카드 그리드: 모바일 2열 나란히, sm 2열, lg 4열 */}
        <div
          className={`mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 ${visible ? 'service-category-cards-visible' : ''}`}
        >
          {cards.map((card, idx) => {
            const isActive = activeCard === card.title;
            const showOverlay = isActive || (canHover && hoveredCard === card.title);
            return (
              <div
                key={card.title}
                className={`service-category-card flex flex-col items-center group ${idx % 2 === 1 ? 'lg:mt-[56px]' : ''}`}
              >
                <div
                  className="service-category-card-inner relative w-full max-w-full sm:max-w-[260px] aspect-square flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer touch-manipulation select-none"
                  onClick={() => setActiveCard((prev) => (prev === card.title ? null : card.title))}
                  onMouseEnter={() => {
                    if (canHover) setHoveredCard(card.title);
                  }}
                  onMouseLeave={() => {
                    if (canHover) setHoveredCard((prev) => (prev === card.title ? null : prev));
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveCard((prev) => (prev === card.title ? null : card.title));
                    }
                  }}
                  aria-pressed={isActive}
                  aria-label={card.subtitle}
                >
                  <Image src={card.imageSrc} alt="" fill quality={90} className="object-cover pointer-events-none" sizes="(max-width: 640px) 50vw, 260px" />
                  {card.description ? (
                    <>
                      <div
                        className={`absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[5px] bg-black/50 transition-opacity duration-150 px-3 py-4 sm:px-4 sm:py-5 pointer-events-none ${
                          showOverlay ? 'opacity-100' : 'opacity-0'
                        }`}
                        aria-hidden
                      >
                        <p className="font-sans text-[14px] sm:text-[16px] font-bold leading-relaxed text-white text-center whitespace-pre-line tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                          {card.description}
                        </p>
                        {isActive && (
                          <span className="text-white/80 text-[10px] font-medium mt-2 shrink-0 lg:hidden">
                            탭하여 닫기
                          </span>
                        )}
                      </div>
                      {!isActive && (
                        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full lg:hidden tap-hint-badge z-10">
                          <span className="relative z-10 flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11l5-5 5 5"/><path d="M12 6v12"/></svg>
                            TAP
                          </span>
                        </span>
                      )}
                    </>
                  ) : null}
                </div>
                <div className="mt-2 sm:mt-4 w-full max-w-full sm:max-w-[260px] text-left pl-1 sm:pl-[17px] mx-auto sm:mx-0">
                  <p className="m-0 font-sans text-[14px] sm:text-[16px] font-medium text-black">
                    {card.title}
                  </p>
                  <p className="m-0 mt-0.5 sm:mt-1 font-sans text-[13px] sm:text-[16px] font-thin text-sub1">
                    {card.subtitle}
                  </p>
                </div>
                </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
