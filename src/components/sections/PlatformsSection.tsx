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
    <section id="platforms" className="overflow-hidden relative z-30 w-full" style={{ backgroundColor: '#F6F6F6', height: '100vh' }}>
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[32px] lg:px-[40px] desktop:px-[60px] pt-12 pb-12 md:pt-[60px] md:pb-[60px] lg:pt-[80px] lg:pb-[80px] desktop:pt-[120px] desktop:pb-[120px] h-full flex flex-col justify-center">
        {/* 섹션 제목 */}
        <FadeIn delay={200}>
          <div className="text-center mb-10 md:mb-[40px] lg:mb-[60px] desktop:mb-[80px]">
            <h2 
              className="mb-4"
              style={{
                color: '#000',
                textAlign: 'center',
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontSize: '52px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 'normal'
              }}
            >
              수 년 간 현장에서 다뤄 온
            </h2>
            <p 
              className="leading-normal"
              style={{
                color: '#000',
                textAlign: 'center',
                fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                fontSize: '52px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 'normal'
              }}
            >
              <span 
                style={{ 
                  color: '#F5F5F5',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '52px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  backgroundColor: '#184BBA',
                  padding: '4px 16px',
                  display: 'inline-block'
                }}
              >마케팅</span>  전문 영역
            </p>
          </div>
        </FadeIn>

        {/* 플랫폼 로고 스크롤 영역 */}
        <ScaleIn delay={400}>
          <div className="overflow-hidden w-full">
            <div className="flex items-center platform-scroll">
            {/* 플랫폼 로고들 (Naver, Google, TikTok, YouTube, Instagram) */}
            {[...Array(4)].map((_, repeatIndex) => (
              <div key={repeatIndex} className="flex items-center gap-[31px] flex-shrink-0">
                {platforms.map((platform, index) => (
                  <div 
                    key={`${repeatIndex}-${platform.name}-${index}`}
                    className="flex items-center justify-center w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] desktop:w-[200px] desktop:h-[200px] flex-shrink-0"
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

