'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * ReviewSection - 리뷰 및 상장 섹션 컴포넌트
 * 고객 리뷰 카드와 수상 상장 이미지를 표시
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
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// 왼쪽에서 슬라이드인 애니메이션 컴포넌트
function SlideInLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// 오른쪽에서 슬라이드인 애니메이션 컴포넌트
function SlideInRight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function ReviewSection() {
  const reviews = [
    { image: '/images/reviewSection/review1.svg' },
    { image: '/images/reviewSection/review2.svg' },
    { image: '/images/reviewSection/review3.svg' },
    { image: '/images/reviewSection/review4.svg' },
    { image: '/images/reviewSection/review5.svg' },
    { image: '/images/reviewSection/review6.svg' },
    { image: '/images/reviewSection/review7.svg' },
    { image: '/images/reviewSection/review8.svg' },
  ];

  const rewards = [
    { image: '/images/reviewSection/reward1.svg' },
    { image: '/images/reviewSection/reward2.svg' },
    { image: '/images/reviewSection/reward4.svg' },
  ];

  return (
    <section id="review" className="relative overflow-hidden z-30 w-full" style={{ height: '1687px', position: 'relative' }}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/reviewSection/section.svg" 
          alt="Review Section Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="absolute inset-0 w-full h-full flex flex-col">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[32px] lg:px-[40px] desktop:px-[60px] flex-1 flex flex-col">
          {/* 섹션 제목 */}
          <FadeIn>
            <div className="text-center" style={{ marginTop: '241px', marginBottom: '114px' }}>
              <h2 
                style={{
                  color: '#FFF',
                  textAlign: 'center',
                  textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '48px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal'
                }}
              >
                판단은 이미 증명되어 있었고,<br />
                AI는 그 판단을 정교하게 만들었습니다
              </h2>
            </div>
          </FadeIn>

          {/* 고객 리뷰 카드 스크롤 영역 */}
          <ScaleIn delay={200}>
            <div className="flex justify-center items-center" style={{ marginBottom: '200px' }}>
              <div className="overflow-hidden w-full">
                <div className="flex items-center review-scroll">
                  {/* 리뷰 카드들 (8개) */}
                  {[...Array(3)].map((_, repeatIndex) => (
                    <div key={repeatIndex} className="flex items-center gap-[16px] flex-shrink-0">
                      {reviews.map((review, index) => (
                        <div 
                          key={`${repeatIndex}-${index}`}
                          className="flex items-center justify-center flex-shrink-0"
                          style={{
                            width: '371px',
                            height: '250px',
                            minWidth: '371px',
                            maxWidth: '371px',
                            minHeight: '250px',
                            maxHeight: '250px',
                            overflow: 'hidden'
                          }}
                        >
                          <img 
                            src={review.image} 
                            alt={`Review ${index + 1}`}
                            style={{
                              width: '371px',
                              height: '250px',
                              objectFit: 'cover',
                              objectPosition: 'center',
                              display: 'block'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScaleIn>

          {/* 중간 안내 텍스트 */}
          <ScaleIn delay={300}>
            <div className="text-center" style={{ marginTop: '0', marginBottom: '60px' }}>
              <h3 
                style={{
                  color: '#FFF',
                  textAlign: 'center',
                  fontFamily: 'Freesentation, Arial, Helvetica, sans-serif',
                  fontSize: '48px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal'
                }}
              >
                그 판단은 결과로 이미 증명 되었습니다
              </h3>
            </div>
          </ScaleIn>

          {/* 수상 상장 이미지들 (3개) */}
          <div className="flex justify-center items-center desktop:flex-nowrap flex-wrap" style={{ gap: '16px' }}>
            {/* 첫 번째 상장 */}
            <SlideInLeft delay={400}>
              <div 
                className="flex-shrink-0"
                style={{ 
                  width: '369px', 
                  height: '554px',
                  minWidth: '369px',
                  maxWidth: '369px',
                  minHeight: '554px',
                  maxHeight: '554px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxSizing: 'border-box',
                  padding: 0,
                  margin: 0,
                  isolation: 'isolate'
                }}
              >
                <img 
                  src="/images/reviewSection/reward1.png" 
                  alt="Reward 1"
                  style={{
                    width: '369px',
                    height: '554px',
                    minWidth: '369px',
                    maxWidth: '369px',
                    minHeight: '554px',
                    maxHeight: '554px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </SlideInLeft>

            {/* 두 번째 상장 */}
            <ScaleIn delay={500}>
              <div 
                className="flex-shrink-0"
                style={{ 
                  width: '369px', 
                  height: '554px',
                  minWidth: '369px',
                  maxWidth: '369px',
                  minHeight: '554px',
                  maxHeight: '554px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxSizing: 'border-box',
                  padding: 0,
                  margin: 0,
                  isolation: 'isolate'
                }}
              >
                <img 
                  src="/images/reviewSection/reward2.png" 
                  alt="Reward 2"
                  style={{
                    width: '369px',
                    height: '554px',
                    minWidth: '369px',
                    maxWidth: '369px',
                    minHeight: '554px',
                    maxHeight: '554px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </ScaleIn>

            {/* 세 번째 상장 */}
            <SlideInRight delay={600}>
              <div 
                className="flex-shrink-0"
                style={{ 
                  width: '369px', 
                  height: '554px',
                  minWidth: '369px',
                  maxWidth: '369px',
                  minHeight: '554px',
                  maxHeight: '554px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxSizing: 'border-box',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                  src="/images/reviewSection/reward3.png" 
                  alt="Reward 3"
                  style={{
                    width: '369px',
                    height: '554px',
                    minWidth: '369px',
                    maxWidth: '369px',
                    minHeight: '554px',
                    maxHeight: '554px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                    transform: 'scale(0.95)',
                    transformOrigin: 'center'
                  }}
                />
              </div>
            </SlideInRight>
          </div>
        </div>
      </div>
    </section>
  );
}

