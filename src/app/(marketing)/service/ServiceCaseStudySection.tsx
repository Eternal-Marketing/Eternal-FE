'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

const SLIDES = [
  {
    category: '패션 브랜드 D2C 쇼핑몰',
    title: '숏폼 마케팅',
    description: '알고리즘 변화를 지속적으로 반영해 트렌드를 선제적으로 반영하고,\n고객의 기억에 각인되는 숏폼 콘텐츠로 기획·운영합니다',
    images: ['/images/service-page/service-1.png', '/images/service-page/service-2.png'],
    tags: ['유투브숏츠', '인스타릴스', '틱톡인피드', '플랫폼별맞춤기획', '알고리즘분석', '노출값극대화', 'AI정답키워드세팅'],
  },
];

export default function ServiceCaseStudySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
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

  const fade = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
  });

  const slide = SLIDES[current];

  return (
    <section ref={sectionRef} className="w-full bg-[#f6f6f6] overflow-hidden">
      <div className="w-full max-w-[1163px] mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-[60px]">

        {/* 상단 텍스트 — 중앙 정렬 */}
        <div className="text-center">
          <p className="m-0 font-sans text-[12px] sm:text-[13px] font-semibold text-primary tracking-[0.12em] uppercase" style={fade(0)}>
            {slide.category}
          </p>
          <h2 className="m-0 mt-2 font-sans text-[26px] sm:text-[32px] lg:text-[38px] font-bold text-main leading-tight" style={fade(80)}>
            {slide.title}
          </h2>
          <p className="m-0 mt-4 font-sans text-[13px] sm:text-[15px] font-light text-sub1 leading-[1.85] max-w-[500px] mx-auto whitespace-pre-line text-left" style={fade(160)}>
            {slide.description}
          </p>
        </div>

        {/* 화살표 + 폰 목업 */}
        <div className="mt-12 sm:mt-16 relative flex items-end justify-center gap-5 sm:gap-8 lg:gap-10">

          {/* 왼쪽 화살표 */}
          <button
            onClick={() => setCurrent((c) => (c - 1 + total) % total)}
            disabled={total <= 1}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#555555] hover:text-[#222222] transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed z-10"
            aria-label="이전"
          >
            <svg width="32" height="54" viewBox="0 0 28 48" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 4 6 24 22 44" />
            </svg>
          </button>

          {/* 왼쪽 폰 — 살짝 아래 */}
          <div
            className="relative w-[145px] sm:w-[195px] lg:w-[245px] aspect-[271/574]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(32px)' : 'translateY(60px)',
              transition: 'opacity 0.75s ease-out 300ms, transform 0.75s ease-out 300ms',
            }}
          >
            <Image
              src={slide.images[0]}
              alt={`${slide.title} 예시 1`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 145px, (max-width: 1024px) 195px, 245px"
            />
          </div>

          {/* 오른쪽 폰 — 위에 */}
          <div
            className="relative w-[145px] sm:w-[195px] lg:w-[245px] aspect-[271/574]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(60px)',
              transition: 'opacity 0.75s ease-out 430ms, transform 0.75s ease-out 430ms',
            }}
          >
            <Image
              src={slide.images[1]}
              alt={`${slide.title} 예시 2`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 145px, (max-width: 1024px) 195px, 245px"
            />
          </div>

          {/* 오른쪽 화살표 */}
          <button
            onClick={() => setCurrent((c) => (c + 1) % total)}
            disabled={total <= 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#555555] hover:text-[#222222] transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed z-10"
            aria-label="다음"
          >
            <svg width="32" height="54" viewBox="0 0 28 48" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 4 22 24 6 44" />
            </svg>
          </button>
        </div>

        {/* 페이지 인디케이터 */}
        {total > 1 && (
          <div className="mt-6 flex justify-center gap-1.5" style={fade(400)}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-1.5 bg-sub2' : 'w-1.5 h-1.5 bg-sub3/50'}`}
                aria-label={`슬라이드 ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* 하단 해시태그 목록 */}
        <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-2 sm:gap-2.5" style={fade(520)}>
          {slide.tags.map((tag, i) => (
            <span
              key={tag}
              className="font-sans text-[12px] sm:text-[13px] font-medium text-primary/80 hover:text-primary transition-colors duration-200 cursor-default"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.5s ease-out ${520 + i * 60}ms, transform 0.5s ease-out ${520 + i * 60}ms`,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
