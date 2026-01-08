'use client';

import { useState, useEffect, useRef } from 'react';

// Fade-in 애니메이션 컴포넌트
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
    { image: '/images/reviewSection/reward3.svg' },
  ];

  return (
    <section id="review" className="relative overflow-hidden z-30 w-full">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/reviewSection/section.svg" 
          alt="Review Section Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-[32px] lg:px-[40px] desktop:px-[60px] pt-12 pb-12 md:pt-[60px] md:pb-[60px] lg:pt-[80px] lg:pb-[80px] desktop:pt-[120px] desktop:pb-[120px]">
        {/* 제목 */}
        <FadeIn>
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
              고객 만족도와
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
              검증된 성과
            </p>
          </div>
        </FadeIn>

        {/* 리뷰 그리드 */}
        <FadeIn delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-[60px] lg:mb-[80px]">
            {reviews.map((review, index) => (
              <div 
                key={index}
                className="flex items-center justify-center"
              >
                <img 
                  src={review.image} 
                  alt={`Review ${index + 1}`}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* 보상/상 이미지 */}
        <FadeIn delay={400}>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
            {rewards.map((reward, index) => (
              <div 
                key={index}
                className="flex items-center justify-center"
              >
                <img 
                  src={reward.image} 
                  alt={`Reward ${index + 1}`}
                  className="w-full h-auto object-contain max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

