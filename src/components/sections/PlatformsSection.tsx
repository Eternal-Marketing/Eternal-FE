'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * 플랫폼 섹션 (홈)
 * - 다양한 마케팅 채널 로고를 페이드인/스케일인으로 표시
 */
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
    <section id="platforms" className="overflow-hidden relative z-30 w-full bg-[#F6F6F6] min-h-screen flex flex-col justify-center py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 desktop:px-[60px]">
        <FadeIn delay={200}>
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 desktop:mb-[80px]">
            <h2 className="mb-2 font-sans text-[22px] sm:text-[28px] md:text-[34px] lg:text-[44px] font-semibold leading-tight text-main text-center">
              수많은 실전 결과를 통해 검증된
            </h2>
            <p className="font-sans text-[22px] sm:text-[28px] md:text-[34px] lg:text-[44px] font-semibold leading-tight text-main text-center">
              <span className="inline-block bg-gradient-to-r from-[#1a4fd6] to-[#3273ff] text-white px-3 py-0.5 sm:px-4 sm:py-1 md:px-5 rounded-lg sm:rounded-xl shadow-md shadow-[#1a4fd6]/15">
                마케팅
              </span>{" "}
              의 핵심 영역
            </p>
          </div>
        </FadeIn>

        <ScaleIn delay={400}>
          <div className="overflow-hidden w-full">
            <div className="platform-scroll">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center flex-shrink-0 gap-8 sm:gap-10 md:gap-14 lg:gap-20 px-4 sm:px-6 md:px-8 lg:px-10">
                  {platforms.map((platform, index) => (
                    <div
                      key={`${setIndex}-${platform.name}-${index}`}
                      className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-[120px] md:h-[120px] lg:w-[160px] lg:h-[160px] desktop:w-[180px] desktop:h-[180px] flex-shrink-0"
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

