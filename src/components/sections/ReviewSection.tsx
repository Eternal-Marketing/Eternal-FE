'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * 리뷰·상장 섹션 (홈)
 * - 고객 리뷰 카드, 수상 상장 이미지, 페이드인/스케일인
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

  const cardW = 'min-w-[340px] w-[340px] sm:min-w-[320px] sm:w-[320px] lg:min-w-[420px] lg:w-[420px]';
  const cardH = 'h-[280px] sm:h-[250px] lg:h-[328px]';

  return (
    <section id="review" className="relative overflow-hidden z-30 w-full min-h-[880px] sm:min-h-[1200px] lg:min-h-[1600px] xl:min-h-[1687px]">
      <div className="absolute inset-0 w-full h-full">
        <Image src="/images/reviewSection/section.svg" alt="Review Section Background" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="absolute inset-0 w-full h-full flex flex-col">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 desktop:px-[60px] flex-1 flex flex-col">
          <FadeIn>
            <div className="text-center pt-16 sm:pt-24 lg:pt-[241px] pb-10 sm:pb-14 lg:pb-[114px]">
              <h2
                className="font-sans text-[23px] sm:text-[24px] lg:text-[36px] font-bold leading-normal text-inverse text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              >
                판단은 이미 증명되어 있었고,<br />
                AI는 그 판단을 정교하게 만들었습니다
              </h2>
            </div>
          </FadeIn>

          <ScaleIn delay={200}>
            <div className="flex justify-center items-center pb-12 sm:pb-16 lg:pb-[200px]">
              <div className="overflow-hidden w-full">
                <div className="review-scroll">
                  {[...Array(2)].map((_, repeatIndex) => (
                    <div key={repeatIndex} className="flex items-center flex-shrink-0">
                      {reviews.map((review, index) => (
                        <div
                          key={`${repeatIndex}-${index}`}
                          className={`flex items-center justify-center flex-shrink-0 mx-1.5 sm:mx-2 overflow-hidden relative ${cardW} ${cardH}`}
                        >
                          <Image src={review.image} alt={`Review ${index + 1}`} fill className="object-contain" sizes="360px" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScaleIn>

          <ScaleIn delay={300}>
            <div className="text-center mb-8 sm:mb-10 lg:mb-[60px]">
              <h3 className="font-sans text-[20px] sm:text-[24px] lg:text-[32px] font-bold leading-normal text-inverse text-center">
                이미 기준이 된 이터널의 판단
              </h3>
            </div>
          </ScaleIn>

          <div className="flex justify-center items-center flex-nowrap gap-2 sm:gap-3 sm:flex-wrap lg:gap-4 desktop:flex-nowrap">
            <SlideInLeft delay={400}>
              <div className="flex-shrink-0 animate-float-1 w-[112px] h-[168px] sm:w-[200px] sm:h-[300px] lg:w-[264px] lg:h-[396px] overflow-hidden relative isolation-isolate">
                <Image src="/images/reviewSection/reward1.png" alt="Reward 1" fill className="object-cover object-center" sizes="264px" />
              </div>
            </SlideInLeft>
            <ScaleIn delay={500}>
              <div className="flex-shrink-0 animate-float-2 w-[112px] h-[168px] sm:w-[200px] sm:h-[300px] lg:w-[264px] lg:h-[396px] overflow-hidden relative isolation-isolate">
                <Image src="/images/reviewSection/reward2.png" alt="Reward 2" fill className="object-cover object-center" sizes="264px" />
              </div>
            </ScaleIn>
            <SlideInRight delay={600}>
              <div className="flex-shrink-0 animate-float-3 w-[112px] h-[168px] sm:w-[190px] sm:h-[285px] lg:w-[252px] lg:h-[378px] overflow-hidden relative flex items-center justify-center">
                <Image src="/images/reviewSection/reward3.png" alt="Reward 3" fill className="object-cover object-center" sizes="252px" />
              </div>
            </SlideInRight>
          </div>
        </div>
      </div>
    </section>
  );
}

