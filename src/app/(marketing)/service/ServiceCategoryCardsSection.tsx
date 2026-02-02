'use client';

import { useRef, useEffect, useState } from 'react';

type Card = {
  title: string;
  subtitle: string;
  imageSrc: string;
  /** 호버 시 카드 위에 표시할 설명 (줄바꿈은 \n) */
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

  return (
    <section ref={sectionRef} className={`${backgroundClassName} w-full`}>
      <div className="w-full max-w-[1163px] mx-auto px-4 py-[90px]">
        <h2
          className={`m-0 font-sans text-[28px] md:text-[32px] font-semibold leading-normal text-center ${titleColorClassName}`}
        >
          {title}
        </h2>

        {/* category line */}
        <div className="mt-8 text-center font-sans text-[16px] text-sub1">
          {categories.map((c, idx) => (
            <span key={c}>
              {c}
              {idx < categories.length - 1 ? <span className="mx-4 text-sub3">|</span> : null}
            </span>
          ))}
        </div>

        <div
          className={`mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${visible ? 'service-category-cards-visible' : ''}`}
        >
          {cards.map((card, idx) => (
            <div
              key={card.title}
              className={`service-category-card flex flex-col items-center group ${idx % 2 === 1 ? 'lg:mt-[56px]' : ''}`}
            >
              <div className="service-category-card-inner relative w-full max-w-[260px] aspect-square flex items-center justify-center overflow-hidden rounded-2xl">
                <img
                  src={card.imageSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain"
                />
                {card.description ? (
                  <div
                    className="absolute top-0.5 bottom-0.5 left-5 right-5 flex items-center justify-center rounded-[5px] bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-5"
                    aria-hidden
                  >
                    <p className="font-sans text-[14px] leading-relaxed text-white text-center whitespace-pre-line">
                      {card.description}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="mt-4 w-full max-w-[260px] text-left pl-[17px]">
                <p className="m-0 font-sans text-[16px] font-medium text-black">
                  {card.title}
                </p>
                <p className="m-0 mt-1 font-sans text-[16px] font-thin text-sub1">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


