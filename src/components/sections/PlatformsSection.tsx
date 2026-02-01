'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * PlatformsSection - 플랫폼 섹션 컴포넌트
 * 다양한 마케팅 플랫폼 로고를 스크롤 애니메이션으로 표시
 */

// 페이드인 애니메이션 컴포넌트
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// 스케일인 애니메이션 컴포넌트
function ScaleIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function PlatformsSection() {
  const platforms = [
    { name: 'Naver', image: '/images/naver1.svg' },
    { name: 'Google', image: '/images/google.svg' },
    { name: 'TikTok', image: '/images/tiktok.svg' },
    { name: 'YouTube', image: '/images/youtube.svg' },
    { name: 'Instagram', image: '/images/instagram.svg' },
  ];

  return (
    <section id="platforms" className="overflow-hidden relative z-30 w-full bg-[#F6F6F6] h-screen">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[32px] lg:px-[40px] desktop:px-[60px] pt-12 pb-12 md:pt-[60px] md:pb-[60px] lg:pt-[80px] lg:pb-[80px] desktop:pt-[120px] desktop:pb-[120px] h-full flex flex-col justify-center">
        {/* 섹션 제목 */}
        <FadeIn delay={200}>
          <div className="text-center mb-10 md:mb-[40px] lg:mb-[60px] desktop:mb-[80px]">
            <h2 
              className="mb-2 font-sans text-[36px] md:text-[40px] lg:text-[44px] font-semibold leading-tight text-main text-center"
            >
              수많은 실전 결과를 통해 검증된
            </h2>
            <p 
              className="font-sans text-[36px] md:text-[40px] lg:text-[44px] font-semibold leading-tight text-main text-center"
            >
              <span className="inline-block bg-gradient-to-r from-[#1a4fd6] to-[#3273ff] text-white px-5 py-1 rounded-xl shadow-md shadow-[#1a4fd6]/15">
                마케팅
              </span>{" "}
              의 핵심 영역
            </p>
          </div>
        </FadeIn>

        {/* 플랫폼 로고 스크롤 영역 - 컨베이어 스타일 */}
        <ScaleIn delay={400}>
          <div className="overflow-hidden w-full">
            <div className="platform-scroll">
              {/* 로고 2세트 (seamless 무한 스크롤) */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center flex-shrink-0 gap-12 md:gap-16 lg:gap-20 px-6 md:px-8 lg:px-10">
                  {platforms.map((platform, index) => (
                    <div 
                      key={`${setIndex}-${platform.name}-${index}`}
                      className="flex items-center justify-center w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[180px] lg:h-[180px] flex-shrink-0"
                    >
                      <img 
                        src={platform.image} 
                        alt={platform.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}

